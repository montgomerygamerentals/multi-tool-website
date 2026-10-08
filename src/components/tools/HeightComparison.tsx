"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Unit = "imperial" | "metric";

function toCm(feet: number, inches: number): number {
  return feet * 30.48 + inches * 2.54;
}

function fromCm(cm: number): { ft: number; in: number } {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inches = Math.round(totalIn - ft * 12);
  return { ft, in: inches === 12 ? 0 : inches };
}

function formatHeight(cm: number, unit: Unit): string {
  if (unit === "metric") return `${cm.toFixed(1)} cm`;
  const { ft, in: inch } = fromCm(cm);
  return `${ft}' ${inch}"`;
}

export default function HeightComparison() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [aFt, setAFt] = useState("");
  const [aIn, setAIn] = useState("");
  const [aCm, setACm] = useState("");
  const [bFt, setBFt] = useState("");
  const [bIn, setBIn] = useState("");
  const [bCm, setBCm] = useState("");

  const cmA =
    unit === "imperial"
      ? toCm(Number(aFt) || 0, Number(aIn) || 0)
      : Number(aCm) || 0;
  const cmB =
    unit === "imperial"
      ? toCm(Number(bFt) || 0, Number(bIn) || 0)
      : Number(bCm) || 0;
  const maxCm = Math.max(cmA, cmB, 1);
  const diff = Math.abs(cmA - cmB);

  const summary = useMemo(() => {
    if (cmA === cmB) return "Same height";
    const taller = cmA > cmB ? "Person A" : "Person B";
    return `${taller} is ${formatHeight(diff, unit)} taller`;
  }, [cmA, cmB, diff, unit]);

  const clearInputs = () => {
    setAFt("");
    setAIn("");
    setACm("");
    setBFt("");
    setBIn("");
    setBCm("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["imperial", "metric"] as Unit[]).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUnit(u)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              unit === u
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {u === "imperial" ? "Feet & inches" : "Centimeters"}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ToolPanel title="Person A" onClear={clearInputs}>
          {unit === "imperial" ? (
            <div className="flex gap-3">
              <label className="flex-1 text-sm">
                Feet
                <input
                  type="number"
                  min={0}
                  max={8}
                  value={aFt}
                  onChange={(e) => setAFt(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>
              <label className="flex-1 text-sm">
                Inches
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={aIn}
                  onChange={(e) => setAIn(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>
            </div>
          ) : (
            <label className="block text-sm">
              Height (cm)
              <input
                type="number"
                min={50}
                max={250}
                value={aCm}
                onChange={(e) => setACm(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
          )}
          <p className="mt-2 text-sm text-zinc-500">{formatHeight(cmA, unit)}</p>
        </ToolPanel>

        <ToolPanel title="Person B">
          {unit === "imperial" ? (
            <div className="flex gap-3">
              <label className="flex-1 text-sm">
                Feet
                <input
                  type="number"
                  min={0}
                  max={8}
                  value={bFt}
                  onChange={(e) => setBFt(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>
              <label className="flex-1 text-sm">
                Inches
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={bIn}
                  onChange={(e) => setBIn(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>
            </div>
          ) : (
            <label className="block text-sm">
              Height (cm)
              <input
                type="number"
                min={50}
                max={250}
                value={bCm}
                onChange={(e) => setBCm(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
          )}
          <p className="mt-2 text-sm text-zinc-500">{formatHeight(cmB, unit)}</p>
        </ToolPanel>
      </div>

      <ToolPanel title="Visual comparison">
        <p className="mb-4 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
          {summary}
        </p>
        <div className="flex items-end justify-center gap-12 px-4">
          {[
            { label: "A", cm: cmA, color: "bg-indigo-500" },
            { label: "B", cm: cmB, color: "bg-violet-500" },
          ].map(({ label, cm, color }) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className={`w-16 rounded-t-lg ${color} transition-all`}
                style={{ height: `${Math.max(40, (cm / maxCm) * 220)}px` }}
                aria-hidden
              />
              <span className="mt-2 text-sm font-semibold">{label}</span>
              <span className="text-xs text-zinc-500">{formatHeight(cm, unit)}</span>
            </div>
          ))}
        </div>
      </ToolPanel>
    </div>
  );
}
