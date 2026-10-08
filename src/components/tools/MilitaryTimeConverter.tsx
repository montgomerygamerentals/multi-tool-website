"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";
import { sanitizeTimeInput } from "@/lib/numeric-input";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

type Mode = "12-to-24" | "24-to-12";

function parse12(time: string, ampm: "AM" | "PM"): { h: number; m: number } | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  let h = Number(match[1]);
  const m = Number(match[2]);
  if (h < 1 || h > 12 || m < 0 || m > 59) return null;
  if (ampm === "AM") {
    if (h === 12) h = 0;
  } else if (h !== 12) h += 12;
  return { h, m };
}

function parse24(time: string): { h: number; m: number } | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return { h, m };
}

function to24String(h: number, m: number) {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function to12String(h: number, m: number) {
  const ampm = h >= 12 ? "PM" : "AM";
  let hour = h % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function MilitaryTimeConverter() {
  const [mode, setMode] = useState<Mode>("12-to-24");
  const [time12, setTime12] = useState("2:30");
  const [ampm, setAmpm] = useState<"AM" | "PM">("PM");
  const [time24, setTime24] = useState("14:30");

  const result = useMemo(() => {
    const steps: string[] = [];
    if (mode === "12-to-24") {
      const parsed = parse12(time12, ampm);
      if (!parsed) return null;
      steps.push(`12-hour input: ${time12} ${ampm}`);
      if (ampm === "AM" && time12.startsWith("12")) steps.push("12 AM maps to 00:xx in 24-hour time.");
      if (ampm === "PM" && Number(time12.split(":")[0]) !== 12) {
        steps.push("Add 12 to hour for PM (except 12 PM).");
      }
      const out = to24String(parsed.h, parsed.m);
      steps.push(`24-hour time: ${out}`);
      return { out, steps, label: "24-hour (military) time" };
    }
    const parsed = parse24(time24);
    if (!parsed) return null;
    steps.push(`24-hour input: ${time24}`);
    const out = to12String(parsed.h, parsed.m);
    steps.push(`12-hour time: ${out}`);
    return { out, steps, label: "12-hour time" };
  }, [mode, time12, ampm, time24]);

  const clearInputs = () => {
    setTime12("");
    setTime24("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <ModeBtn active={mode === "12-to-24"} onClick={() => setMode("12-to-24")} label="12h → 24h" />
        <ModeBtn active={mode === "24-to-12"} onClick={() => setMode("24-to-12")} label="24h → 12h" />
      </div>
      <ToolPanel title="Military time converter" onClear={clearInputs}>
        {mode === "12-to-24" ? (
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <label className="mb-1 block text-sm font-medium">12-hour time</label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                spellCheck={false}
                value={time12}
                onChange={(e) => setTime12(sanitizeTimeInput(e.target.value))}
                placeholder="h:mm"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">AM/PM</label>
              <select
                value={ampm}
                onChange={(e) => setAmpm(e.target.value as "AM" | "PM")}
                className={inputClass}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-medium">24-hour time</label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              value={time24}
              onChange={(e) => setTime24(sanitizeTimeInput(e.target.value))}
              placeholder="HH:MM"
              className={inputClass}
            />
          </div>
        )}
        {result && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">{result.label}</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{result.out}</p>
          </div>
        )}
      </ToolPanel>
      {result && <StepsList steps={result.steps} />}
    </div>
  );
}

function ModeBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-medium ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      }`}
    >
      {label}
    </button>
  );
}
