"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

const W = 320;
const H = 240;
const PAD = 28;

function toSvg(x: number, y: number, bounds: { minX: number; maxX: number; minY: number; maxY: number }) {
  const { minX, maxX, minY, maxY } = bounds;
  const sx = PAD + ((x - minX) / (maxX - minX)) * (W - 2 * PAD);
  const sy = H - PAD - ((y - minY) / (maxY - minY)) * (H - 2 * PAD);
  return { sx, sy };
}

export default function SlopeCalculator() {
  const [x1, setX1] = useState("1");
  const [y1, setY1] = useState("2");
  const [x2, setX2] = useState("4");
  const [y2, setY2] = useState("8");

  const result = useMemo(() => {
    const X1 = Number(x1);
    const Y1 = Number(y1);
    const X2 = Number(x2);
    const Y2 = Number(y2);
    if ([X1, Y1, X2, Y2].some((n) => !Number.isFinite(n))) return null;
    const steps: string[] = [];
    steps.push(`Points: (${X1}, ${Y1}) and (${X2}, ${Y2}).`);
    if (X1 === X2) {
      steps.push("Δx = 0 → slope is undefined (vertical line).");
      return {
        slope: null as number | null,
        equation: "x = " + X1,
        vertical: true,
        steps,
        bounds: null as null | { minX: number; maxX: number; minY: number; maxY: number },
      };
    }
    const m = (Y2 - Y1) / (X2 - X1);
    const b = Y1 - m * X1;
    steps.push(`Slope m = (y₂ − y₁) / (x₂ − x₁) = (${Y2} − ${Y1}) / (${X2} − ${X1}) = ${m}.`);
    steps.push(`y-intercept b = y₁ − m·x₁ = ${Y1} − ${m}×${X1} = ${b}.`);
    steps.push(`Equation: y = ${m}x ${b >= 0 ? "+ " + b : "− " + Math.abs(b)}.`);
    const xs = [X1, X2, 0];
    const ys = [Y1, Y2, b];
    const minX = Math.min(...xs) - 1;
    const maxX = Math.max(...xs) + 1;
    const minY = Math.min(...ys) - 1;
    const maxY = Math.max(...ys) + 1;
    return {
      slope: m,
      equation: `y = ${formatNum(m)}x ${b >= 0 ? "+ " + formatNum(b) : "− " + formatNum(Math.abs(b))}`,
      vertical: false,
      steps,
      bounds: { minX, maxX, minY, maxY },
      m,
      b,
      X1,
      Y1,
      X2,
      Y2,
    };
  }, [x1, y1, x2, y2]);

  const clearInputs = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Slope from two points" onClear={clearInputs}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="x₁" value={x1} onChange={setX1} />
          <Field label="y₁" value={y1} onChange={setY1} />
          <Field label="x₂" value={x2} onChange={setX2} />
          <Field label="y₂" value={y2} onChange={setY2} />
        </div>
        {result && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Slope & line equation</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.slope === null ? "Undefined" : formatNum(result.slope)}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{result.equation}</p>
          </div>
        )}
        {result?.bounds && (
          <div className="mt-6 flex justify-center">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="max-w-full rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
              role="img"
              aria-label="Line graph"
            >
              <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#a1a1aa" strokeWidth={1} />
              <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#a1a1aa" strokeWidth={1} />
              {(() => {
                const { minX, maxX, minY, maxY } = result.bounds!;
                const p1 = toSvg(result.X1!, result.Y1!, { minX, maxX, minY, maxY });
                const p2 = toSvg(result.X2!, result.Y2!, { minX, maxX, minY, maxY });
                const xA = minX;
                const yA = result.m! * xA + result.b!;
                const xB = maxX;
                const yB = result.m! * xB + result.b!;
                const la = toSvg(xA, yA, { minX, maxX, minY, maxY });
                const lb = toSvg(xB, yB, { minX, maxX, minY, maxY });
                return (
                  <>
                    <line
                      x1={la.sx}
                      y1={la.sy}
                      x2={lb.sx}
                      y2={lb.sy}
                      stroke="#4f46e5"
                      strokeWidth={2}
                    />
                    <circle cx={p1.sx} cy={p1.sy} r={5} fill="#4f46e5" />
                    <circle cx={p2.sx} cy={p2.sy} r={5} fill="#6366f1" />
                  </>
                );
              })()}
            </svg>
          </div>
        )}
      </ToolPanel>
      {result && <StepsList steps={result.steps} />}
    </div>
  );
}

function formatNum(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}
