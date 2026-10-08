"use client";

import { useMemo, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";

export type PaletteMode = "palette" | "contrast" | "gradient";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function relLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(a: string, b: string): number | null {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  if (!A || !B) return null;
  const L1 = relLuminance(A);
  const L2 = relLuminance(B);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

async function samplePalette(file: File): Promise<string[]> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not load image"));
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return [];
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    const buckets = new Map<string, number>();
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] - (data[i] % 32);
      const g = data[i + 1] - (data[i + 1] % 32);
      const b = data[i + 2] - (data[i + 2] % 32);
      const key = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    return [...buckets.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([hex]) => hex);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function ColorPaletteGenerator({
  mode = "palette",
}: {
  mode?: PaletteMode;
}) {
  const [colors, setColors] = useState<string[]>([
    "#4f46e5",
    "#ec4899",
    "#22c55e",
    "#f59e0b",
    "#0ea5e9",
  ]);
  const [fg, setFg] = useState("#111827");
  const [bg, setBg] = useState("#ffffff");
  const [g1, setG1] = useState("#4f46e5");
  const [g2, setG2] = useState("#ec4899");
  const [angle, setAngle] = useState("90");
  const [paletteDropKey, setPaletteDropKey] = useState(0);

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);

  const clearPaletteInputs = () => {
    setColors([]);
    setPaletteDropKey((k) => k + 1);
  };

  const clearContrastInputs = () => {
    setFg("#000000");
    setBg("#000000");
  };

  const clearGradientInputs = () => {
    setG1("#000000");
    setG2("#000000");
    setAngle("");
  };

  if (mode === "contrast") {
    return (
      <div className="space-y-6">
        <ToolPanel title="Contrast checker" onClear={clearContrastInputs}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Foreground</label>
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-full" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Background</label>
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-full" />
            </div>
          </div>
          {ratio && (
            <div className="mt-4 rounded-lg p-6 text-center" style={{ background: bg, color: fg }}>
              <p className="text-2xl font-bold">{ratio.toFixed(2)}:1</p>
              <p className="text-sm">
                AA normal {ratio >= 4.5 ? "pass" : "fail"} · AAA {ratio >= 7 ? "pass" : "fail"}
              </p>
            </div>
          )}
        </ToolPanel>
      </div>
    );
  }

  if (mode === "gradient") {
    const css = `linear-gradient(${angle}deg, ${g1}, ${g2})`;
    return (
      <div className="space-y-6">
        <ToolPanel title="Gradient generator" onClear={clearGradientInputs}>
          <div className="grid gap-4 sm:grid-cols-3">
            <input type="color" value={g1} onChange={(e) => setG1(e.target.value)} className="h-10 w-full" />
            <input type="color" value={g2} onChange={(e) => setG2(e.target.value)} className="h-10 w-full" />
            <input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div className="mt-4 h-40 rounded-xl" style={{ background: css }} />
          <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-800">{css}</pre>
        </ToolPanel>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToolPanel title="Palette from image" onClear={clearPaletteInputs}>
        <ImageDropzone
          key={paletteDropKey}
          previewUrl={null}
          fileName={null}
          onFileSelect={async (file) => {
            if (!file) return;
            setColors(await samplePalette(file));
          }}
          accept="image/*"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => navigator.clipboard.writeText(c)}
              className="flex flex-col items-center gap-1"
              title="Copy"
            >
              <span className="h-14 w-14 rounded-lg border border-zinc-200" style={{ background: c }} />
              <span className="text-xs font-mono">{c}</span>
            </button>
          ))}
        </div>
      </ToolPanel>
    </div>
  );
}
