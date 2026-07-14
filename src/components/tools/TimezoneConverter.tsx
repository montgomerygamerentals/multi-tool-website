"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const FALLBACK_ZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function getZones(): string[] {
  try {
    if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
      return (Intl as typeof Intl & { supportedValuesOf: (k: string) => string[] }).supportedValuesOf(
        "timeZone",
      );
    }
  } catch {
    // ignore
  }
  return FALLBACK_ZONES;
}

function formatInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(date);
}

export default function TimezoneConverter() {
  const zones = useMemo(() => getZones(), []);
  const localZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    [],
  );
  const [fromZone, setFromZone] = useState(localZone);
  const [toZone, setToZone] = useState("UTC");
  const [dateValue, setDateValue] = useState("");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: fromZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
    setDateValue(`${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`);
  }, [fromZone]);

  const converted = useMemo(() => {
    if (!dateValue) return null;
    try {
      const asLocal = new Date(dateValue);
      if (Number.isNaN(asLocal.getTime())) return null;

      // Interpret the inputted wall time as occurring in fromZone by
      // finding the UTC instant whose clock in fromZone matches dateValue.
      const guess = new Date(dateValue + ":00");
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: fromZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const target = dateValue.replace("T", " ") + ":00";
      let utc = guess.getTime();
      for (let i = 0; i < 3; i++) {
        const parts = formatter.formatToParts(new Date(utc));
        const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
        const wall = `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
        const wallDate = Date.parse(wall.replace(" ", "T") + "Z");
        const targetDate = Date.parse(target.replace(" ", "T") + "Z");
        utc += targetDate - wallDate;
      }
      return new Date(utc);
    } catch {
      return null;
    }
  }, [dateValue, fromZone]);

  const swap = () => {
    setFromZone(toZone);
    setToZone(fromZone);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Convert">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">From time zone</span>
            <select
              value={fromZone}
              onChange={(e) => setFromZone(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
            >
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">To time zone</span>
            <select
              value={toZone}
              onChange={(e) => setToZone(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
            >
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mb-4 block text-sm">
          <span className="mb-1 block font-medium">Date & time in source zone</span>
          <input
            type="datetime-local"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          />
        </label>

        <button
          type="button"
          onClick={swap}
          className="mb-4 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
        >
          Swap zones
        </button>

        <div className="rounded-xl bg-zinc-50 px-4 py-5 dark:bg-zinc-800">
          <p className="text-sm text-zinc-500">Result in {toZone}</p>
          <p className="mt-1 text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            {converted ? formatInZone(converted, toZone) : "—"}
          </p>
        </div>
      </ToolPanel>

      <ToolPanel title="Right Now">
        <div className="space-y-3">
          {[localZone, fromZone, toZone]
            .filter((zone, index, arr) => arr.indexOf(zone) === index)
            .map((zone) => (
              <div
                key={zone}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-100 pb-3 last:border-0 last:pb-0 dark:border-zinc-800"
              >
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{zone}</p>
                <p className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                  {formatInZone(now, zone)}
                </p>
              </div>
            ))}
        </div>
      </ToolPanel>
    </div>
  );
}
