"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type UnitType = "length" | "weight" | "temperature" | "volume";

const units: Record<
  UnitType,
  { label: string; units: { id: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }
> = {
  length: {
    label: "Length",
    units: [
      { id: "m", label: "Meters", toBase: (v) => v, fromBase: (v) => v },
      { id: "km", label: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "cm", label: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: "mm", label: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "mi", label: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: "ft", label: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "in", label: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  weight: {
    label: "Weight",
    units: [
      { id: "kg", label: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
      { id: "g", label: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "lb", label: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { id: "oz", label: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    ],
  },
  temperature: {
    label: "Temperature",
    units: [
      { id: "c", label: "Celsius", toBase: (v) => v, fromBase: (v) => v },
      { id: "f", label: "Fahrenheit", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      { id: "k", label: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  volume: {
    label: "Volume",
    units: [
      { id: "l", label: "Liters", toBase: (v) => v, fromBase: (v) => v },
      { id: "ml", label: "Milliliters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "gal", label: "Gallons (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { id: "cup", label: "Cups (US)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    ],
  },
};

export default function UnitConverter() {
  const [type, setType] = useState<UnitType>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [value, setValue] = useState("1");

  const typeUnits = units[type].units;

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return "—";
    const from = typeUnits.find((u) => u.id === fromUnit);
    const to = typeUnits.find((u) => u.id === toUnit);
    if (!from || !to) return "—";
    const converted = to.fromBase(from.toBase(num));
    return converted.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [value, fromUnit, toUnit, typeUnits]);

  const handleTypeChange = (t: UnitType) => {
    setType(t);
    const ids = units[t].units;
    setFromUnit(ids[0].id);
    setToUnit(ids[1]?.id ?? ids[0].id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(units) as UnitType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTypeChange(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              type === t
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {units[t].label}
          </button>
        ))}
      </div>
      <ToolPanel title="Convert">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="mb-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              {typeUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="mb-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              {typeUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-2xl font-bold text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-indigo-400">
              {result}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setFromUnit(toUnit);
            setToUnit(fromUnit);
            setValue(String(result === "—" ? "" : result.replace(/,/g, "")));
          }}
          className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          ⇄ Swap units
        </button>
      </ToolPanel>
    </div>
  );
}
