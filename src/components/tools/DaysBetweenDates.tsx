"use client";

import { useMemo, useState } from "react";
import StepsList from "@/components/tools/shared/StepsList";
import ToolPanel from "@/components/ui/ToolPanel";

type Mode = "between" | "from-today";

function parseLocalDate(value: string): Date | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function toInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addCalendarDays(start: Date, days: number): Date {
  const next = new Date(start);
  next.setDate(next.getDate() + days);
  return next;
}

function addBusinessDays(start: Date, days: number): Date {
  const next = new Date(start);
  const step = days >= 0 ? 1 : -1;
  let remaining = Math.abs(days);
  while (remaining > 0) {
    next.setDate(next.getDate() + step);
    const day = next.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return next;
}

interface DaysBetweenDatesProps {
  initialMode?: Mode;
}

export default function DaysBetweenDates({
  initialMode = "between",
}: DaysBetweenDatesProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [offsetAmount, setOffsetAmount] = useState("30");
  const [offsetUnit, setOffsetUnit] = useState<"days" | "weeks" | "business-days">(
    "days",
  );
  const [direction, setDirection] = useState<"add" | "subtract">("add");

  const betweenResult = useMemo(() => {
    const start = parseLocalDate(startDate);
    const end = parseLocalDate(endDate);
    if (!start || !end) return null;

    const diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);

    return { days, weeks, months, years };
  }, [startDate, endDate]);

  const fromTodayResult = useMemo(() => {
    const amount = parseInt(offsetAmount, 10);
    if (Number.isNaN(amount) || amount < 0) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const signed =
      direction === "add" ? amount : -amount;
    let target: Date;
    let steps: string[];

    if (offsetUnit === "weeks") {
      const dayCount = signed * 7;
      target = addCalendarDays(today, dayCount);
      steps = [
        `Start from today (${formatDate(today)}).`,
        `${direction === "add" ? "Add" : "Subtract"} ${amount} week${amount === 1 ? "" : "s"} (${Math.abs(dayCount)} calendar days).`,
        `Result: ${formatDate(target)}.`,
      ];
    } else if (offsetUnit === "business-days") {
      target = addBusinessDays(today, signed);
      steps = [
        `Start from today (${formatDate(today)}).`,
        `${direction === "add" ? "Count forward" : "Count backward"} ${amount} business day${amount === 1 ? "" : "s"}, skipping Saturdays and Sundays.`,
        `Result: ${formatDate(target)} (${toInputValue(target)}).`,
      ];
    } else {
      target = addCalendarDays(today, signed);
      steps = [
        `Start from today (${formatDate(today)}).`,
        `${direction === "add" ? "Add" : "Subtract"} ${amount} calendar day${amount === 1 ? "" : "s"}.`,
        `Result: ${formatDate(target)}.`,
      ];
    }

    return { target, steps, iso: toInputValue(target) };
  }, [offsetAmount, offsetUnit, direction]);

  const clearInputs = () => {
    setStartDate("");
    setEndDate("");
    setOffsetAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["between", "Days between dates"],
            ["from-today", "X days from today"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              mode === value
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "between" ? (
        <>
          <ToolPanel title="Select dates" onClear={clearInputs}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Start date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">End date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
            </div>
          </ToolPanel>
          {betweenResult && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Days", value: betweenResult.days },
                { label: "Weeks", value: betweenResult.weeks },
                { label: "Months (approx)", value: betweenResult.months },
                { label: "Years (approx)", value: betweenResult.years },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {item.value.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <ToolPanel title="Add or subtract from today" onClear={clearInputs}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Direction</label>
                <select
                  value={direction}
                  onChange={(e) =>
                    setDirection(e.target.value as "add" | "subtract")
                  }
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <option value="add">Add (future)</option>
                  <option value="subtract">Subtract (past)</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  min="0"
                  value={offsetAmount}
                  onChange={(e) => setOffsetAmount(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Unit</label>
                <select
                  value={offsetUnit}
                  onChange={(e) =>
                    setOffsetUnit(
                      e.target.value as "days" | "weeks" | "business-days",
                    )
                  }
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <option value="days">Calendar days</option>
                  <option value="weeks">Weeks</option>
                  <option value="business-days">Business days</option>
                </select>
              </div>
            </div>
          </ToolPanel>
          {fromTodayResult && (
            <>
              <div className="rounded-xl border border-zinc-200 bg-indigo-50 p-6 text-center dark:border-zinc-800 dark:bg-indigo-950/30">
                <p className="text-sm text-zinc-500">Resulting date</p>
                <p className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {formatDate(fromTodayResult.target)}
                </p>
                <p className="mt-2 text-sm text-zinc-500">{fromTodayResult.iso}</p>
              </div>
              <StepsList steps={fromTodayResult.steps} />
            </>
          )}
        </>
      )}
    </div>
  );
}
