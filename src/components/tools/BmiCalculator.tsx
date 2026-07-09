"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const BMI_CHART_MIN = 15;
const BMI_CHART_MAX = 40;

const BMI_CATEGORIES = [
  {
    label: "Underweight",
    from: 0,
    to: 18.5,
    color: "bg-sky-400",
    textColor: "text-sky-700 dark:text-sky-300",
  },
  {
    label: "Normal weight",
    from: 18.5,
    to: 25,
    color: "bg-emerald-400",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    label: "Overweight",
    from: 25,
    to: 30,
    color: "bg-amber-400",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  {
    label: "Obese",
    from: 30,
    to: 40,
    color: "bg-rose-400",
    textColor: "text-rose-700 dark:text-rose-300",
  },
] as const;

const BMI_TICKS = [15, 18.5, 25, 30, 35, 40];

function bmiToChartPercent(value: number) {
  const clamped = Math.max(BMI_CHART_MIN, Math.min(BMI_CHART_MAX, value));
  return ((clamped - BMI_CHART_MIN) / (BMI_CHART_MAX - BMI_CHART_MIN)) * 100;
}

function BmiChart({ bmi }: { bmi?: number }) {
  const markerPosition = bmi !== undefined ? bmiToChartPercent(bmi) : null;

  return (
    <ToolPanel title="BMI chart">
      <div className="space-y-4">
        <div className="relative pt-8">
          {markerPosition !== null && (
            <div
              className="absolute top-0 z-10 -translate-x-1/2"
              style={{ left: `${markerPosition}%` }}
            >
              <div className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                You: {bmi!.toFixed(1)}
              </div>
              <div className="mx-auto h-2 w-0.5 bg-indigo-600" />
            </div>
          )}

          <div className="flex h-8 overflow-hidden rounded-lg">
            {BMI_CATEGORIES.map((category) => {
              const segmentStart = Math.max(category.from, BMI_CHART_MIN);
              const segmentEnd = Math.min(category.to, BMI_CHART_MAX);
              if (segmentEnd <= segmentStart) return null;

              const width =
                ((segmentEnd - segmentStart) / (BMI_CHART_MAX - BMI_CHART_MIN)) * 100;

              return (
                <div
                  key={category.label}
                  className={`${category.color} h-full`}
                  style={{ width: `${width}%` }}
                  title={`${category.label}: ${category.from}–${category.to}`}
                />
              );
            })}
          </div>

          <div className="relative mt-2 h-4">
            {BMI_TICKS.map((tick) => (
              <span
                key={tick}
                className="absolute -translate-x-1/2 text-xs text-zinc-500"
                style={{ left: `${bmiToChartPercent(tick)}%` }}
              >
                {tick}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {BMI_CATEGORIES.map((category) => (
            <div key={category.label} className="flex items-center gap-2 text-sm">
              <span className={`h-3 w-3 shrink-0 rounded-sm ${category.color}`} />
              <span className="text-zinc-700 dark:text-zinc-300">
                <span className={`font-medium ${category.textColor}`}>
                  {category.label}
                </span>
                <span className="text-zinc-500">
                  {" "}
                  (
                  {category.from === 0
                    ? `<${category.to}`
                    : category.to === 40
                      ? `${category.from}+`
                      : `${category.from}–${category.to}`}
                  )
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </ToolPanel>
  );
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
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

    return { bmi: bmiValue.toFixed(1), bmiValue, category };
  }, [weight, height, heightFt, heightIn, unit]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["imperial", "metric"] as const).map((u) => (
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
      <BmiChart bmi={result?.bmiValue} />
    </div>
  );
}
