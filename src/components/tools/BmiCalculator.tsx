"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const result = useMemo(() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return null;

    let heightM: number;
    if (unit === "metric") {
      const h = parseFloat(height);
      if (isNaN(h) || h <= 0) return null;
      heightM = h / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalIn = ft * 12 + inches;
      if (totalIn <= 0) return null;
      heightM = totalIn * 0.0254;
    }

    const wKg = unit === "metric" ? w : w * 0.453592;
    const bmiValue = wKg / (heightM * heightM);

    let category = "";
    if (bmiValue < 18.5) category = "Underweight";
    else if (bmiValue < 25) category = "Normal weight";
    else if (bmiValue < 30) category = "Overweight";
    else category = "Obese";

    return { bmi: bmiValue.toFixed(1), category };
  }, [weight, height, heightFt, heightIn, unit]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["metric", "imperial"] as const).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUnit(u)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
              unit === u
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {u}
          </button>
        ))}
      </div>
      <ToolPanel title="Your measurements">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          {unit === "metric" ? (
            <div>
              <label className="mb-1 block text-sm font-medium">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Feet</label>
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Inches</label>
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}
        </div>
      </ToolPanel>
      {result && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-800 dark:bg-indigo-950/30">
          <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
            {result.bmi}
          </p>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">Your BMI</p>
          <p className="mt-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {result.category}
          </p>
        </div>
      )}
    </div>
  );
}
