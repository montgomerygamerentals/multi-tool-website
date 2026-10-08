"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";
import {
  sanitizeTimeInput,
  sanitizeUnsignedInteger,
} from "@/lib/numeric-input";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

interface DayRow {
  id: string;
  label: string;
  start: string;
  end: string;
  breakMin: string;
}

let dayId = 0;
function newDay(label: string): DayRow {
  return { id: `d-${++dayId}`, label, start: "09:00", end: "17:00", breakMin: "30" };
}

function parseTimeToMinutes(t: string): number | null {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

function formatHours(h: number): string {
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  return `${hours}h ${mins}m (${h.toFixed(2)} hours)`;
}

export default function TimeCardCalculator() {
  const [rows, setRows] = useState<DayRow[]>([
    newDay("Mon"),
    newDay("Tue"),
    newDay("Wed"),
    newDay("Thu"),
    newDay("Fri"),
  ]);

  const result = useMemo(() => {
    const steps: string[] = [];
    let totalMinutes = 0;
    for (const row of rows) {
      const start = parseTimeToMinutes(row.start);
      const end = parseTimeToMinutes(row.end);
      const br = Number(row.breakMin);
      if (start === null || end === null || !Number.isFinite(br) || br < 0) continue;
      let worked = end - start - br;
      if (worked < 0) worked += 24 * 60;
      if (worked < 0) continue;
      totalMinutes += worked;
      steps.push(
        `${row.label}: ${row.start}–${row.end}, break ${br} min → ${(worked / 60).toFixed(2)} h`,
      );
    }
    if (steps.length === 0) return null;
    const totalHours = totalMinutes / 60;
    steps.push(`Total: ${totalMinutes} minutes = ${totalHours.toFixed(2)} hours`);
    return { totalHours, steps };
  }, [rows]);

  function clearInputs() {
    setRows([{ id: `d-${++dayId}`, label: "", start: "", end: "", breakMin: "" }]);
  }

  return (
    <div className="space-y-6">
      <ToolPanel title="Time card / hours worked" onClear={clearInputs}>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={row.id} className="grid gap-2 sm:grid-cols-[0.6fr_1fr_1fr_0.8fr_auto]">
              <Field
                label={i === 0 ? "Day" : ""}
                value={row.label}
                onChange={(v) =>
                  setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, label: v } : r)))
                }
              />
              <Field
                label={i === 0 ? "Start (HH:MM)" : ""}
                value={row.start}
                sanitize="time"
                onChange={(v) =>
                  setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, start: v } : r)))
                }
              />
              <Field
                label={i === 0 ? "End (HH:MM)" : ""}
                value={row.end}
                sanitize="time"
                onChange={(v) =>
                  setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, end: v } : r)))
                }
              />
              <Field
                label={i === 0 ? "Break (min)" : ""}
                value={row.breakMin}
                sanitize="unsigned"
                onChange={(v) =>
                  setRows((prev) =>
                    prev.map((r) => (r.id === row.id ? { ...r, breakMin: v } : r)),
                  )
                }
              />
              <button
                type="button"
                className="self-end text-sm text-zinc-500"
                onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setRows((prev) => [...prev, newDay("Day")])}
            className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium dark:bg-zinc-800"
          >
            Add day
          </button>
        </div>
        {result && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Total hours</p>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {formatHours(result.totalHours)}
            </p>
          </div>
        )}
      </ToolPanel>
      {result && <StepsList steps={result.steps} />}
    </div>
  );
}

type FieldSanitize = "text" | "time" | "unsigned";

function Field({
  label,
  value,
  onChange,
  sanitize = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  sanitize?: FieldSanitize;
}) {
  const handleChange = (raw: string) => {
    if (sanitize === "time") onChange(sanitizeTimeInput(raw));
    else if (sanitize === "unsigned") onChange(sanitizeUnsignedInteger(raw));
    else onChange(raw);
  };

  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}
