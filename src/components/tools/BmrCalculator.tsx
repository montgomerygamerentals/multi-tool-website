"use client";

import { useMemo, useState } from "react";
import StepsList from "@/components/tools/shared/StepsList";
import ToolPanel from "@/components/ui/ToolPanel";

export default function BmrCalculator() {
  const [sex, setSex] = useState<"male" | "female">("female");
  const [age, setAge] = useState("28");
  const [weightLb, setWeightLb] = useState("150");
  const [heightIn, setHeightIn] = useState("65");

  const result = useMemo(() => {
    const a = Number(age);
    const kg = (Number(weightLb) || 0) * 0.453592;
    const cm = (Number(heightIn) || 0) * 2.54;
    if (!(a > 0 && kg > 0 && cm > 0)) return null;
    const bmr =
      sex === "male"
        ? 10 * kg + 6.25 * cm - 5 * a + 5
        : 10 * kg + 6.25 * cm - 5 * a - 161;
    return {
      bmr,
      steps: [
        `kg = ${weightLb} × 0.453592 = ${kg.toFixed(2)}; cm = ${heightIn} × 2.54 = ${cm.toFixed(2)}.`,
        `Mifflin–St Jeor (${sex}): 10×kg + 6.25×cm − 5×age ${sex === "male" ? "+ 5" : "− 161"}.`,
        `BMR ≈ ${bmr.toFixed(0)} kcal/day at rest.`,
      ],
    };
  }, [sex, age, weightLb, heightIn]);

  const clearInputs = () => {
    setAge("");
    setWeightLb("");
    setHeightIn("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Inputs" onClear={clearInputs}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Sex</label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as "male" | "female")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Weight (lb)</label>
            <input type="number" value={weightLb} onChange={(e) => setWeightLb(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Height (in)</label>
            <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
        </div>
      </ToolPanel>
      {result && (
        <>
          <div className="rounded-xl bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">BMR</p>
            <p className="text-4xl font-bold text-indigo-600">{result.bmr.toFixed(0)}</p>
            <p className="text-xs text-zinc-500">kcal/day</p>
          </div>
          <StepsList steps={result.steps} />
        </>
      )}
    </div>
  );
}
