"use client";

import { useEffect, useMemo, useState } from "react";

function normalizeHex(value: string): string | null {
  const raw = value.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(raw)) {
    return `#${raw
      .split("")
      .map((c) => c + c)
      .join("")
      .toLowerCase()}`;
  }
  if (/^[0-9a-f]{6}$/i.test(raw)) {
    return `#${raw.toLowerCase()}`;
  }
  return null;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function contrastText(hex: string): string {
  const n = normalizeHex(hex);
  if (!n) return "#111111";
  const r = parseInt(n.slice(1, 3), 16);
  const g = parseInt(n.slice(3, 5), 16);
  const b = parseInt(n.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#111111" : "#ffffff";
}

const HUE_STEPS = 16;
const LIGHT_STEPS = 10;

const SPECTRUM: string[] = [];
for (let li = 0; li < LIGHT_STEPS; li++) {
  for (let hi = 0; hi < HUE_STEPS; hi++) {
    const h = (hi / HUE_STEPS) * 360;
    const l = 92 - (li / (LIGHT_STEPS - 1)) * 74;
    SPECTRUM.push(hslToHex(h, 92, l));
  }
}

const GRAYSCALE = Array.from({ length: LIGHT_STEPS }, (_, i) => {
  const v = Math.round(255 - (i / (LIGHT_STEPS - 1)) * 255);
  return `#${v.toString(16).padStart(2, "0").repeat(3)}`;
});

interface HexColorPickerProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

export default function HexColorPicker({
  label,
  value,
  onChange,
}: HexColorPickerProps) {
  const [draft, setDraft] = useState(value.toUpperCase());
  const valid = useMemo(() => normalizeHex(value) ?? "#000000", [value]);

  useEffect(() => {
    setDraft(value.toUpperCase());
  }, [value]);

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <input
          type="text"
          value={draft}
          spellCheck={false}
          onChange={(e) => {
            const raw = e.target.value;
            setDraft(raw);
            const next = normalizeHex(raw);
            if (next) onChange(next);
          }}
          onBlur={() => {
            const next = normalizeHex(draft);
            if (next) {
              setDraft(next.toUpperCase());
              onChange(next);
            } else {
              setDraft(value.toUpperCase());
            }
          }}
          className="w-28 rounded border border-zinc-300 px-2 py-1 font-mono text-sm uppercase dark:border-zinc-600"
          style={{
            backgroundColor: valid,
            color: contrastText(valid),
          }}
        />
        <input
          type="color"
          value={valid}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          title="Open color picker"
          aria-label={`${label} color picker`}
          className="h-8 w-10 cursor-pointer rounded border border-zinc-300 bg-transparent p-0.5 dark:border-zinc-600"
        />
      </div>
      <div className="flex gap-1 rounded border border-zinc-200 bg-white p-1.5 dark:border-zinc-700 dark:bg-zinc-900">
        <div
          className="grid flex-1 gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${HUE_STEPS}, minmax(0, 1fr))`,
            gridAutoRows: "16px",
          }}
        >
          {SPECTRUM.map((color, index) => (
            <button
              key={`${color}-${index}`}
              type="button"
              title={color}
              onClick={() => onChange(color)}
              className={`rounded-[2px] ${
                valid.toLowerCase() === color.toLowerCase()
                  ? "ring-2 ring-indigo-500 ring-offset-1"
                  : "hover:ring-1 hover:ring-zinc-400"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div
          className="grid w-4 gap-0.5"
          style={{ gridTemplateRows: `repeat(${LIGHT_STEPS}, minmax(0, 1fr))` }}
        >
          {GRAYSCALE.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              onClick={() => onChange(color)}
              className={`rounded-[2px] ${
                valid.toLowerCase() === color.toLowerCase()
                  ? "ring-2 ring-indigo-500 ring-offset-1"
                  : "hover:ring-1 hover:ring-zinc-400"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
