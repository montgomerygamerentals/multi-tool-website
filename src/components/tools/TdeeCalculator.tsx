"use client";

import { useMemo, useState } from "react";
import StepsList from "@/components/tools/shared/StepsList";
import ToolPanel from "@/components/ui/ToolPanel";

const ACTIVITY: { label: string; factor: number }[] = [
  { label: "Sedentary (little exercise)", factor: 1.2 },
  { label: "Light (1–3 days/week)", factor: 1.375 },
  { label: "Moderate (3–5 days/week)", factor: 1.55 },
  { label: "Active (6–7 days/week)", factor: 1.725 },
  { label: "Very active (physical job)", factor: 1.9 },
];

export default function TdeeCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [weightLb, setWeightLb] = useState("180");
  const [heightIn, setHeightIn] = useState("70");
  const [activity, setActivity] = useState(1.55);

  const result = useMemo(() => {
    const a = Number(age);
    const kg = (Number(weightLb) || 0) * 0.453592;
    const cm = (Number(heightIn) || 0) * 2.54;
    if (!(a > 0 && kg > 0 && cm > 0)) return null;
    const bmr =
      sex === "male"
        ? 10 * kg + 6.25 * cm - 5 * a + 5
        : 10 * kg + 6.25 * cm - 5 * a - 161;
    const tdee = bmr * activity;
    return {
      bmr,
      tdee,
      steps: [
        `Convert weight to kg: ${kg.toFixed(1)} kg; height to cm: ${cm.toFixed(1)} cm.`,
        `Mifflin–St Jeor BMR (${sex}): ${bmr.toFixed(0)} kcal/day.`,
        `Multiply by activity factor ${activity}: TDEE ≈ ${tdee.toFixed(0)} kcal/day.`,
      ],
    };
  }, [sex, age, weightLb, heightIn, activity]);

  const clearInputs = () => {
    setAge("");
    setWeightLb("");
    setHeightIn("");
    setActivity(1.2);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Your stats" onClear={clearInputs}>
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
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Weight (lb)</label>
            <input
              type="number"
              value={weightLb}
              onChange={(e) => setWeightLb(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Height (in)</label>
            <input
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Activity</label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              {ACTIVITY.map((opt) => (
                <option key={opt.factor} value={opt.factor}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </ToolPanel>
      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
              <p className="text-sm text-zinc-500">BMR</p>
              <p className="text-3xl font-bold text-indigo-600">
                {result.bmr.toFixed(0)}
              </p>
              <p className="text-xs text-zinc-500">kcal/day</p>
            </div>
            <div className="rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
              <p className="text-sm text-zinc-500">TDEE</p>
              <p className="text-3xl font-bold text-indigo-600">
                {result.tdee.toFixed(0)}
              </p>
              <p className="text-xs text-zinc-500">kcal/day</p>
            </div>
          </div>
          <StepsList steps={result.steps} />
        </>
      )}
    </div>
  );
}
