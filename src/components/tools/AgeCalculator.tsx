"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function calculateAge(birthDate: Date): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
} {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return { years, months, days, totalDays };
}

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("");

  const age = useMemo(() => {
    if (!birthdate) return null;
    const date = new Date(birthdate + "T00:00:00");
    if (isNaN(date.getTime()) || date > new Date()) return null;
    return calculateAge(date);
  }, [birthdate]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Birthdate">
        <input
          type="date"
          value={birthdate}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
      </ToolPanel>
      {age && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Years", value: age.years },
            { label: "Months", value: age.months },
            { label: "Days", value: age.days },
            { label: "Total days", value: age.totalDays.toLocaleString() },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
