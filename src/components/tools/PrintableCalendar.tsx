"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

interface PrintableCalendarProps {
  year?: number;
  month?: number; // 1-12
}

export default function PrintableCalendar({
  year: yearProp,
  month: monthProp,
}: PrintableCalendarProps) {
  const now = new Date();
  const [year, setYear] = useState(yearProp ?? now.getFullYear());
  const [month, setMonth] = useState(monthProp ?? now.getMonth() + 1);

  const clearInputs = () => {
    setYear(0);
    setMonth(0);
  };

  const cells = useMemo(() => {
    if (!year || !month) return [] as (number | null)[];
    const first = new Date(year, month - 1, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const grid: (number | null)[] = [];
    for (let i = 0; i < startPad; i++) grid.push(null);
    for (let d = 1; d <= daysInMonth; d++) grid.push(d);
    while (grid.length % 7 !== 0) grid.push(null);
    return grid;
  }, [year, month]);

  return (
    <div className="space-y-6">
      {!yearProp && (
        <ToolPanel title="Choose month" onClear={clearInputs}>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={year || ""}
              onChange={(e) => setYear(Number(e.target.value) || 0)}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="">Year</option>
              {[2025, 2026, 2027, 2028].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              value={month || ""}
              onChange={(e) => setMonth(Number(e.target.value) || 0)}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="">Month</option>
              {MONTHS.map((name, i) => (
                <option key={name} value={i + 1}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </ToolPanel>
      )}

      <div className="rounded-xl border border-zinc-200 bg-white p-4 print:border-0 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {year && month ? `${MONTHS[month - 1]} ${year}` : "Select month and year"}
          </h2>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white print:hidden"
          >
            Print
          </button>
        </div>
        <div className="grid grid-cols-7 gap-px bg-zinc-200 text-center text-xs font-medium dark:bg-zinc-700">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="bg-zinc-50 py-2 dark:bg-zinc-900">
              {d}
            </div>
          ))}
          {cells.map((day, i) => (
            <div
              key={i}
              className="min-h-16 bg-white p-2 text-left text-sm dark:bg-zinc-950"
            >
              {day ?? ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
