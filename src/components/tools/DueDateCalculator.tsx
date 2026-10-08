"use client";

import { useMemo, useState } from "react";
import StepsList from "@/components/tools/shared/StepsList";
import ToolPanel from "@/components/ui/ToolPanel";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function format(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DueDateCalculator() {
  const [mode, setMode] = useState<"lmp" | "conception">("lmp");
  const [date, setDate] = useState("");

  const result = useMemo(() => {
    if (!date) return null;
    const start = new Date(`${date}T00:00:00`);
    if (Number.isNaN(start.getTime())) return null;
    const due = mode === "lmp" ? addDays(start, 280) : addDays(start, 266);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const conception = mode === "lmp" ? addDays(start, 14) : start;
    const daysPregnant = Math.floor(
      (today.getTime() - conception.getTime()) / (1000 * 60 * 60 * 24),
    );
    const weeks = Math.max(0, Math.floor(daysPregnant / 7));
    const dayRem = Math.max(0, daysPregnant % 7);
    return {
      due,
      weeks,
      dayRem,
      steps: [
        mode === "lmp"
          ? "Naegele’s rule: due date ≈ first day of last menstrual period + 280 days (40 weeks)."
          : "From conception date, add about 266 days (38 weeks) for an estimated due date.",
        `Estimated due date: ${format(due)}.`,
        daysPregnant >= 0
          ? `Approximate gestation from conception: ${weeks} weeks + ${dayRem} days.`
          : "Selected date is in the future relative to today.",
      ],
    };
  }, [mode, date]);

  const clearInputs = () => {
    setDate("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Pregnancy dating" onClear={clearInputs}>
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("lmp")}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${mode === "lmp" ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800"}`}
          >
            Last period (LMP)
          </button>
          <button
            type="button"
            onClick={() => setMode("conception")}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${mode === "conception" ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800"}`}
          >
            Conception date
          </button>
        </div>
        <label className="mb-1 block text-sm font-medium">
          {mode === "lmp" ? "First day of last period" : "Conception date"}
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
        <p className="mt-2 text-xs text-zinc-500">
          Educational estimate only — not medical advice. Confirm with a clinician.
        </p>
      </ToolPanel>
      {result && (
        <>
          <div className="rounded-xl bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Estimated due date</p>
            <p className="text-2xl font-bold text-indigo-600">{format(result.due)}</p>
            <p className="mt-2 text-sm text-zinc-600">
              ~{result.weeks}w {result.dayRem}d from conception estimate
            </p>
          </div>
          <StepsList steps={result.steps} />
        </>
      )}
    </div>
  );
}
