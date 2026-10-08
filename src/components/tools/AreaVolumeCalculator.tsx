"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

export type AreaVolumeShape =
  | "circle"
  | "rectangle"
  | "triangle"
  | "trapezoid"
  | "sphere"
  | "cylinder"
  | "cone"
  | "cube"
  | "rectangular-prism"
  | "pyramid";

type FieldDef = { key: string; label: string };

const SHAPE_FIELDS: Record<AreaVolumeShape, FieldDef[]> = {
  circle: [{ key: "r", label: "Radius (r)" }],
  rectangle: [
    { key: "l", label: "Length (l)" },
    { key: "w", label: "Width (w)" },
  ],
  triangle: [
    { key: "b", label: "Base (b)" },
    { key: "h", label: "Height (h)" },
  ],
  trapezoid: [
    { key: "a", label: "Base a" },
    { key: "b", label: "Base b" },
    { key: "h", label: "Height (h)" },
  ],
  sphere: [{ key: "r", label: "Radius (r)" }],
  cylinder: [
    { key: "r", label: "Radius (r)" },
    { key: "h", label: "Height (h)" },
  ],
  cone: [
    { key: "r", label: "Radius (r)" },
    { key: "h", label: "Height (h)" },
  ],
  cube: [{ key: "s", label: "Side (s)" }],
  "rectangular-prism": [
    { key: "l", label: "Length (l)" },
    { key: "w", label: "Width (w)" },
    { key: "h", label: "Height (h)" },
  ],
  pyramid: [
    { key: "b", label: "Base area (B)" },
    { key: "h", label: "Height (h)" },
  ],
};

const SHAPE_TITLES: Record<AreaVolumeShape, string> = {
  circle: "Area of a circle",
  rectangle: "Area of a rectangle",
  triangle: "Area of a triangle",
  trapezoid: "Area of a trapezoid",
  sphere: "Volume of a sphere",
  cylinder: "Volume of a cylinder",
  cone: "Volume of a cone",
  cube: "Volume of a cube",
  "rectangular-prism": "Volume of a rectangular prism",
  pyramid: "Volume of a pyramid",
};

const FILL = "rgb(224 231 255)";
const STROKE = "rgb(79 70 229)";
const LABEL = "rgb(82 82 91)";

function formatDim(symbol: string, raw: string | undefined): string {
  const trimmed = raw?.trim() ?? "";
  if (!trimmed) return symbol;
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return `${symbol} = ${trimmed}`;
  const pretty = Number.isInteger(num)
    ? String(num)
    : String(Number(num.toPrecision(6)));
  return `${symbol} = ${pretty}`;
}

function DimLabel({
  x,
  y,
  children,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={LABEL}
      fontSize="11"
      fontWeight="600"
      fontFamily="system-ui, sans-serif"
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

function ShapeDiagram({
  shape,
  values,
}: {
  shape: AreaVolumeShape;
  values: Record<string, string>;
}) {
  const d = (key: string, symbol: string) => formatDim(symbol, values[key]);

  return (
    <div
      className="flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 160"
        className="h-40 w-full max-w-[220px]"
        role="img"
      >
        {shape === "circle" && (
          <>
            <circle cx="100" cy="80" r="52" fill={FILL} stroke={STROKE} strokeWidth="2.5" />
            <line x1="100" y1="80" x2="152" y2="80" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="100" cy="80" r="2.5" fill={STROKE} />
            <DimLabel x={118} y={74}>
              {d("r", "r")}
            </DimLabel>
          </>
        )}
        {shape === "rectangle" && (
          <>
            <rect x="40" y="40" width="120" height="80" rx="2" fill={FILL} stroke={STROKE} strokeWidth="2.5" />
            <DimLabel x={100} y={148} anchor="middle">
              {d("l", "l")}
            </DimLabel>
            <DimLabel x={6} y={84}>
              {d("w", "w")}
            </DimLabel>
            <line x1="40" y1="132" x2="160" y2="132" stroke={STROKE} strokeWidth="1.2" />
            <line x1="28" y1="40" x2="28" y2="120" stroke={STROKE} strokeWidth="1.2" />
          </>
        )}
        {shape === "triangle" && (
          <>
            <polygon
              points="100,28 36,128 164,128"
              fill={FILL}
              stroke={STROKE}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <line x1="100" y1="28" x2="100" y2="128" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 3" />
            <DimLabel x={108} y={84}>
              {d("h", "h")}
            </DimLabel>
            <DimLabel x={100} y={148} anchor="middle">
              {d("b", "b")}
            </DimLabel>
            <line x1="36" y1="138" x2="164" y2="138" stroke={STROKE} strokeWidth="1.2" />
          </>
        )}
        {shape === "trapezoid" && (
          <>
            <polygon
              points="70,36 130,36 170,124 30,124"
              fill={FILL}
              stroke={STROKE}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <line x1="100" y1="36" x2="100" y2="124" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 3" />
            <DimLabel x={108} y={84}>
              {d("h", "h")}
            </DimLabel>
            <DimLabel x={100} y={28} anchor="middle">
              {d("a", "a")}
            </DimLabel>
            <DimLabel x={100} y={146} anchor="middle">
              {d("b", "b")}
            </DimLabel>
            <line x1="70" y1="28" x2="130" y2="28" stroke={STROKE} strokeWidth="1.2" />
            <line x1="30" y1="136" x2="170" y2="136" stroke={STROKE} strokeWidth="1.2" />
          </>
        )}
        {shape === "sphere" && (
          <>
            <ellipse cx="100" cy="80" rx="54" ry="54" fill={FILL} stroke={STROKE} strokeWidth="2.5" />
            <ellipse
              cx="100"
              cy="80"
              rx="54"
              ry="18"
              fill="none"
              stroke={STROKE}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <line x1="100" y1="80" x2="154" y2="80" stroke={STROKE} strokeWidth="1.5" />
            <circle cx="100" cy="80" r="2.5" fill={STROKE} />
            <DimLabel x={118} y={74}>
              {d("r", "r")}
            </DimLabel>
          </>
        )}
        {shape === "cylinder" && (
          <>
            <ellipse cx="100" cy="36" rx="40" ry="12" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <path d="M60 36 V120" stroke={STROKE} strokeWidth="2.5" fill="none" />
            <path d="M140 36 V120" stroke={STROKE} strokeWidth="2.5" fill="none" />
            <ellipse cx="100" cy="120" rx="40" ry="12" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <line x1="100" y1="36" x2="100" y2="120" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 3" />
            <DimLabel x={108} y={84}>
              {d("h", "h")}
            </DimLabel>
            <line x1="100" y1="120" x2="140" y2="120" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 3" />
            <DimLabel x={112} y={136}>
              {d("r", "r")}
            </DimLabel>
          </>
        )}
        {shape === "cone" && (
          <>
            <polygon
              points="100,24 52,118 148,118"
              fill={FILL}
              stroke={STROKE}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <ellipse cx="100" cy="118" rx="48" ry="14" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <line x1="100" y1="24" x2="100" y2="118" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 3" />
            <DimLabel x={108} y={78}>
              {d("h", "h")}
            </DimLabel>
            <line x1="100" y1="118" x2="148" y2="118" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 3" />
            <DimLabel x={118} y={136}>
              {d("r", "r")}
            </DimLabel>
          </>
        )}
        {shape === "cube" && (
          <>
            <polygon points="55,55 115,55 115,115 55,115" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <polygon points="115,55 145,35 145,95 115,115" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <polygon points="55,55 85,35 145,35 115,55" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <DimLabel x={85} y={138} anchor="middle">
              {d("s", "s")}
            </DimLabel>
            <line x1="55" y1="126" x2="115" y2="126" stroke={STROKE} strokeWidth="1.2" />
          </>
        )}
        {shape === "rectangular-prism" && (
          <>
            <polygon points="40,55 120,55 120,120 40,120" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <polygon points="120,55 160,30 160,95 120,120" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <polygon points="40,55 80,30 160,30 120,55" fill={FILL} stroke={STROKE} strokeWidth="2" />
            <DimLabel x={80} y={142} anchor="middle">
              {d("l", "l")}
            </DimLabel>
            <DimLabel x={4} y={92}>
              {d("h", "h")}
            </DimLabel>
            <DimLabel x={148} y={70}>
              {d("w", "w")}
            </DimLabel>
            <line x1="40" y1="130" x2="120" y2="130" stroke={STROKE} strokeWidth="1.2" />
            <line x1="28" y1="55" x2="28" y2="120" stroke={STROKE} strokeWidth="1.2" />
          </>
        )}
        {shape === "pyramid" && (
          <>
            <polygon
              points="100,22 40,118 160,118"
              fill={FILL}
              stroke={STROKE}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points="40,118 100,130 160,118 100,90"
              fill={FILL}
              stroke={STROKE}
              strokeWidth="2"
              opacity="0.9"
            />
            <line x1="100" y1="22" x2="100" y2="118" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 3" />
            <DimLabel x={108} y={78}>
              {d("h", "h")}
            </DimLabel>
            <DimLabel x={100} y={148} anchor="middle">
              {d("b", "B")}
            </DimLabel>
          </>
        )}
      </svg>
    </div>
  );
}

function compute(
  shape: AreaVolumeShape,
  vals: Record<string, number>,
): { value: number; label: string; steps: string[] } | null {
  const steps: string[] = [];
  const n = (k: string) => vals[k];

  switch (shape) {
    case "circle": {
      const r = n("r");
      if (r === undefined || r < 0) return null;
      steps.push(`Formula: A = πr² = π × ${r}²`);
      const value = Math.PI * r * r;
      steps.push(`A = ${value.toFixed(4)} square units`);
      return { value, label: "Area", steps };
    }
    case "rectangle": {
      const l = n("l");
      const w = n("w");
      if (l === undefined || w === undefined || l < 0 || w < 0) return null;
      steps.push(`A = l × w = ${l} × ${w}`);
      const value = l * w;
      steps.push(`A = ${value} square units`);
      return { value, label: "Area", steps };
    }
    case "triangle": {
      const b = n("b");
      const h = n("h");
      if (b === undefined || h === undefined || b < 0 || h < 0) return null;
      steps.push(`A = ½ × b × h = ½ × ${b} × ${h}`);
      const value = 0.5 * b * h;
      steps.push(`A = ${value} square units`);
      return { value, label: "Area", steps };
    }
    case "trapezoid": {
      const a = n("a");
      const b = n("b");
      const h = n("h");
      if (a === undefined || b === undefined || h === undefined || h < 0) return null;
      steps.push(`A = ½(a + b)h = ½(${a} + ${b}) × ${h}`);
      const value = 0.5 * (a + b) * h;
      steps.push(`A = ${value} square units`);
      return { value, label: "Area", steps };
    }
    case "sphere": {
      const r = n("r");
      if (r === undefined || r < 0) return null;
      steps.push(`V = ⁴⁄₃πr³ = (4/3) × π × ${r}³`);
      const value = (4 / 3) * Math.PI * r ** 3;
      steps.push(`V = ${value.toFixed(4)} cubic units`);
      return { value, label: "Volume", steps };
    }
    case "cylinder": {
      const r = n("r");
      const h = n("h");
      if (r === undefined || h === undefined || r < 0 || h < 0) return null;
      steps.push(`V = πr²h = π × ${r}² × ${h}`);
      const value = Math.PI * r * r * h;
      steps.push(`V = ${value.toFixed(4)} cubic units`);
      return { value, label: "Volume", steps };
    }
    case "cone": {
      const r = n("r");
      const h = n("h");
      if (r === undefined || h === undefined || r < 0 || h < 0) return null;
      steps.push(`V = ⅓πr²h = (1/3) × π × ${r}² × ${h}`);
      const value = (1 / 3) * Math.PI * r * r * h;
      steps.push(`V = ${value.toFixed(4)} cubic units`);
      return { value, label: "Volume", steps };
    }
    case "cube": {
      const s = n("s");
      if (s === undefined || s < 0) return null;
      steps.push(`V = s³ = ${s}³`);
      const value = s ** 3;
      steps.push(`V = ${value} cubic units`);
      return { value, label: "Volume", steps };
    }
    case "rectangular-prism": {
      const l = n("l");
      const w = n("w");
      const h = n("h");
      if (l === undefined || w === undefined || h === undefined) return null;
      steps.push(`V = l × w × h = ${l} × ${w} × ${h}`);
      const value = l * w * h;
      steps.push(`V = ${value} cubic units`);
      return { value, label: "Volume", steps };
    }
    case "pyramid": {
      const B = n("b");
      const h = n("h");
      if (B === undefined || h === undefined || B < 0 || h < 0) return null;
      steps.push(`V = ⅓ × B × h = (1/3) × ${B} × ${h}`);
      const value = (1 / 3) * B * h;
      steps.push(`V = ${value.toFixed(4)} cubic units`);
      return { value, label: "Volume", steps };
    }
    default:
      return null;
  }
}

export default function AreaVolumeCalculator({ shape }: { shape: AreaVolumeShape }) {
  const fields = SHAPE_FIELDS[shape];
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, ""])),
  );

  const result = useMemo(() => {
    const nums: Record<string, number> = {};
    for (const f of fields) {
      const raw = values[f.key]?.trim();
      if (!raw) return null;
      const num = Number(raw);
      if (!Number.isFinite(num)) return null;
      nums[f.key] = num;
    }
    return compute(shape, nums);
  }, [shape, fields, values]);

  const clearInputs = () => {
    setValues(Object.fromEntries(fields.map((f) => [f.key, ""])));
  };

  return (
    <div className="space-y-6">
      <ToolPanel title={SHAPE_TITLES[shape]} onClear={clearInputs}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="mb-1 block text-sm font-medium">{f.label}</label>
                <input
                  type="number"
                  min={0}
                  value={values[f.key] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [f.key]: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
            ))}
          </div>
          <ShapeDiagram shape={shape} values={values} />
        </div>
        {result && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">{result.label}</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </p>
          </div>
        )}
      </ToolPanel>
      {result && <StepsList steps={result.steps} />}
    </div>
  );
}
