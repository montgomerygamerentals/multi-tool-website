"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";

async function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
  return img;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

const KNOWN_RATIOS: { label: string; w: number; h: number }[] = [
  { label: "Square (1:1)", w: 1, h: 1 },
  { label: "Instagram Portrait (4:5)", w: 4, h: 5 },
  { label: "Classic Photo (3:2)", w: 3, h: 2 },
  { label: "Classic Photo (2:3)", w: 2, h: 3 },
  { label: "Standard (4:3)", w: 4, h: 3 },
  { label: "Standard Portrait (3:4)", w: 3, h: 4 },
  { label: "Widescreen (16:9)", w: 16, h: 9 },
  { label: "Vertical Video (9:16)", w: 9, h: 16 },
  { label: "Ultrawide (21:9)", w: 21, h: 9 },
  { label: "Cinema (2.39:1)", w: 239, h: 100 },
  { label: "Golden Ratio (~1.618:1)", w: 1618, h: 1000 },
];

function matchKnownRatio(width: number, height: number): string | null {
  const ratio = width / height;
  let best: { label: string; diff: number } | null = null;
  for (const known of KNOWN_RATIOS) {
    const knownRatio = known.w / known.h;
    const diff = Math.abs(ratio - knownRatio) / knownRatio;
    if (diff <= 0.02 && (!best || diff < best.diff)) {
      best = { label: known.label, diff };
    }
  }
  return best?.label ?? null;
}

export default function AspectRatioFinder() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);

  const handleFileSelect = useCallback(async (file: File | null) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    setError(null);

    if (!file) {
      setSourceFile(null);
      setPreviewUrl(null);
      previewRef.current = null;
      setSize({ w: 0, h: 0 });
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    const url = URL.createObjectURL(file);
    previewRef.current = url;
    setSourceFile(file);
    setPreviewUrl(url);

    try {
      const img = await loadImage(url);
      setSize({ w: img.naturalWidth, h: img.naturalHeight });
    } catch {
      setError("Failed to load image.");
      setSize({ w: 0, h: 0 });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  const analysis = useMemo(() => {
    if (size.w <= 0 || size.h <= 0) return null;
    const divisor = gcd(size.w, size.h);
    const rw = size.w / divisor;
    const rh = size.h / divisor;
    const decimal = size.w / size.h;
    const known = matchKnownRatio(size.w, size.h);
    const orientation =
      size.w === size.h ? "Square" : size.w > size.h ? "Landscape" : "Portrait";

    return {
      simplified: `${rw}:${rh}`,
      decimal: decimal.toFixed(4).replace(/\.?0+$/, ""),
      known,
      orientation,
      megapixels: (size.w * size.h) / 1_000_000,
    };
  }, [size]);

  return (
    <div className="space-y-6">
      <ImageDropzone
        previewUrl={previewUrl}
        fileName={sourceFile?.name ?? null}
        onFileSelect={handleFileSelect}
        hint="PNG, JPEG, WebP, GIF, and more"
      />

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      {analysis && (
        <ToolPanel title="Aspect ratio">
          <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-800 dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Aspect ratio</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {analysis.simplified}
            </p>
            {analysis.known && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Matches {analysis.known}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="text-lg font-semibold">
                {size.w} × {size.h}
              </p>
              <p className="text-sm text-zinc-500">Pixels</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="text-lg font-semibold">{analysis.decimal}</p>
              <p className="text-sm text-zinc-500">Decimal (W÷H)</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="text-lg font-semibold">{analysis.orientation}</p>
              <p className="text-sm text-zinc-500">Orientation</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="text-lg font-semibold">
                {analysis.megapixels.toFixed(2)} MP
              </p>
              <p className="text-sm text-zinc-500">Resolution</p>
            </div>
          </div>
        </ToolPanel>
      )}
    </div>
  );
}
