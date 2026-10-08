"use client";

import { useMemo, useState } from "react";
import StepsList from "@/components/tools/shared/StepsList";
import ToolPanel from "@/components/ui/ToolPanel";

export default function MacroCalculator() {
  const [calories, setCalories] = useState("2200");
  const [proteinPct, setProteinPct] = useState("30");
  const [carbPct, setCarbPct] = useState("40");
  const [fatPct, setFatPct] = useState("30");

  const result = useMemo(() => {
    const cal = Number(calories);
    const p = Number(proteinPct);
    const c = Number(carbPct);
    const f = Number(fatPct);
    if (!(cal > 0) || p + c + f !== 100) {
      return { error: "Percents must add to 100 and calories must be positive." };
    }
    const proteinG = (cal * (p / 100)) / 4;
    const carbG = (cal * (c / 100)) / 4;
    const fatG = (cal * (f / 100)) / 9;
    return {
      proteinG,
      carbG,
      fatG,
      steps: [
        `Protein kcal = ${cal} × ${p}% = ${(cal * p) / 100}; grams = ÷ 4 → ${proteinG.toFixed(0)} g.`,
        `Carb kcal = ${cal} × ${c}% = ${(cal * c) / 100}; grams = ÷ 4 → ${carbG.toFixed(0)} g.`,
        `Fat kcal = ${cal} × ${f}% = ${(cal * f) / 100}; grams = ÷ 9 → ${fatG.toFixed(0)} g.`,
      ],
    };
  }, [calories, proteinPct, carbPct, fatPct]);

  const clearInputs = () => {
    setCalories("");
    setProteinPct("");
    setCarbPct("");
    setFatPct("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Calories and macro split" onClear={clearInputs}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Calories</label>
            <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Protein %</label>
            <input type="number" value={proteinPct} onChange={(e) => setProteinPct(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Carbs %</label>
            <input type="number" value={carbPct} onChange={(e) => setCarbPct(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Fat %</label>
            <input type="number" value={fatPct} onChange={(e) => setFatPct(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
        </div>
      </ToolPanel>
      {"error" in result ? (
        <p className="text-sm text-red-600">{result.error}</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Protein", result.proteinG],
              ["Carbs", result.carbG],
              ["Fat", result.fatG],
            ].map(([label, grams]) => (
              <div key={label as string} className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
                <p className="text-sm text-zinc-500">{label}</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {(grams as number).toFixed(0)}g
                </p>
              </div>
            ))}
          </div>
          <StepsList steps={result.steps} />
        </>
      )}
    </div>
  );
}
