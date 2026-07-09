"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace("#", "").match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return null;
  let h = match[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");
  const [r, setR] = useState(99);
  const [g, setG] = useState(102);
  const [b, setB] = useState(241);

  const hsl = useMemo(() => rgbToHsl(r, g, b), [r, g, b]);

  const updateFromHex = (value: string) => {
    setHex(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setR(rgb.r);
      setG(rgb.g);
      setB(rgb.b);
    }
  };

  const updateFromRgb = (nr: number, ng: number, nb: number) => {
    setR(nr);
    setG(ng);
    setB(nb);
    setHex(rgbToHex(nr, ng, nb));
  };

  const values = [
    { label: "HEX", value: hex },
    { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  return (
    <div className="space-y-6">
      <div
        className="h-32 rounded-xl border border-zinc-200 shadow-inner dark:border-zinc-700"
        style={{ backgroundColor: hex }}
      />
      <ToolPanel title="HEX">
        <input
          type="text"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
        <input
          type="color"
          value={hex.length === 7 ? hex : "#6366f1"}
          onChange={(e) => updateFromHex(e.target.value)}
          className="mt-3 h-12 w-full cursor-pointer rounded-lg"
        />
      </ToolPanel>
      <ToolPanel title="RGB">
        <div className="grid grid-cols-3 gap-4">
          {(["r", "g", "b"] as const).map((channel, i) => {
            const val = [r, g, b][i];
            return (
              <div key={channel}>
                <label className="mb-1 block text-sm font-medium uppercase">
                  {channel}
                </label>
                <input
                  type="number"
                  min={0}
                  max={255}
                  value={val}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    const next = [r, g, b];
                    next[i] = n;
                    updateFromRgb(next[0], next[1], next[2]);
                  }}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
            );
          })}
        </div>
      </ToolPanel>
      <div className="grid gap-3 sm:grid-cols-3">
        {values.map((v) => (
          <button
            key={v.label}
            type="button"
            onClick={() => navigator.clipboard.writeText(v.value)}
            className="rounded-xl border border-zinc-200 bg-white p-4 text-left transition-colors hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-xs font-medium text-zinc-500">{v.label}</p>
            <p className="mt-1 truncate font-mono text-sm">{v.value}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
