"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Mode = "percent-of" | "what-percent" | "percent-change";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("percent-of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const result = useMemo(() => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return null;

    switch (mode) {
      case "percent-of":
        return ((numA / 100) * numB).toLocaleString(undefined, {
          maximumFractionDigits: 4,
        });
      case "what-percent":
        return numB === 0
          ? "—"
          : ((numA / numB) * 100).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }) + "%";
      case "percent-change":
        return numA === 0
          ? "—"
          : (((numB - numA) / numA) * 100).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }) + "%";
    }
  }, [mode, a, b]);

  const labels: Record<Mode, { title: string; a: string; b: string; result: string }> = {
    "percent-of": {
      title: "What is X% of Y?",
      a: "Percentage (%)",
      b: "Value",
      result: "Result",
    },
    "what-percent": {
      title: "X is what % of Y?",
      a: "Value (X)",
      b: "Total (Y)",
      result: "Percentage",
    },
    "percent-change": {
      title: "% change from X to Y",
      a: "Original value",
      b: "New value",
      result: "Change",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(labels) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              mode === m
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {labels[m].title}
          </button>
        ))}
      </div>
      <ToolPanel title={labels[mode].title}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">{labels[mode].a}</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{labels[mode].b}</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>
        {result !== null && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">{labels[mode].result}</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {result}
            </p>
          </div>
        )}
      </ToolPanel>
    </div>
  );
}
