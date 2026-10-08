"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

type Field = "a" | "b" | "c" | "d";

export default function RatioProportionCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [unknown, setUnknown] = useState<Field>("d");

  const result = useMemo(() => {
    const vals: Record<Field, number | null> = {
      a: a.trim() === "" ? null : Number(a),
      b: b.trim() === "" ? null : Number(b),
      c: c.trim() === "" ? null : Number(c),
      d: d.trim() === "" ? null : Number(d),
    };

    for (const k of Object.keys(vals) as Field[]) {
      if (k !== unknown && (vals[k] === null || !Number.isFinite(vals[k]!))) {
        return null;
      }
    }
    const A = unknown === "a" ? null : vals.a!;
    const B = unknown === "b" ? null : vals.b!;
    const C = unknown === "c" ? null : vals.c!;
    const D = unknown === "d" ? null : vals.d!;

    const steps: string[] = [];
    steps.push(`Proportion: a/b = c/d with unknown ${unknown}.`);

    let value: number | null = null;

    switch (unknown) {
      case "a":
        if (B === 0 || D === 0) return { error: "b and d must be non-zero.", steps };
        value = (C! * B!) / D!;
        steps.push(`Cross-multiply: a × d = b × c → a × ${D} = ${B} × ${C}.`);
        steps.push(`a = (${B} × ${C}) / ${D} = ${value}.`);
        break;
      case "b":
        if (A === 0 || C === 0) return { error: "a and c must be non-zero.", steps };
        value = (A! * D!) / C!;
        steps.push(`Cross-multiply: b × c = a × d → b × ${C} = ${A} × ${D}.`);
        steps.push(`b = (${A} × ${D}) / ${C} = ${value}.`);
        break;
      case "c":
        if (A === 0 || B === 0) return { error: "a and b must be non-zero.", steps };
        value = (B! * D!) / A!;
        steps.push(`Cross-multiply: c × a = b × d → c × ${A} = ${B} × ${D}.`);
        steps.push(`c = (${B} × ${D}) / ${A} = ${value}.`);
        break;
      case "d":
        if (A === 0 || C === 0) return { error: "a and c must be non-zero.", steps };
        value = (A! * C!) / B!;
        steps.push(`Cross-multiply: d × c = b × a → d × ${C} = ${B} × ${A}.`);
        steps.push(`d = (${B} × ${A}) / ${C} = ${value}.`);
        break;
    }

    if (value === null || !Number.isFinite(value)) return null;
    return { value, steps, error: null as string | null };
  }, [a, b, c, d, unknown]);

  const fields: { key: Field; label: string; value: string; set: (v: string) => void }[] = [
    { key: "a", label: "a (numerator 1)", value: a, set: setA },
    { key: "b", label: "b (denominator 1)", value: b, set: setB },
    { key: "c", label: "c (numerator 2)", value: c, set: setC },
    { key: "d", label: "d (denominator 2)", value: d, set: setD },
  ];

  const clearInputs = () => {
    setA("");
    setB("");
    setC("");
    setD("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Ratio & proportion (a/b = c/d)" onClear={clearInputs}>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Enter three known values and choose which variable to solve for.
        </p>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Solve for</label>
          <select
            value={unknown}
            onChange={(e) => setUnknown(e.target.value as Field)}
            className={inputClass}
          >
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
            <option value="d">d</option>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-sm font-medium">{f.label}</label>
              <input
                type="number"
                value={f.key === unknown ? "" : f.value}
                onChange={(e) => f.set(e.target.value)}
                disabled={f.key === unknown}
                placeholder={f.key === unknown ? "?" : ""}
                className={`${inputClass} disabled:opacity-60`}
              />
            </div>
          ))}
        </div>
        {result && "error" in result && result.error && (
          <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{result.error}</p>
        )}
        {result && result.value !== undefined && !result.error && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">{unknown} =</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </p>
          </div>
        )}
      </ToolPanel>
      {result && result.steps && result.steps.length > 0 && (
        <StepsList steps={result.error ? result.steps : result.steps} />
      )}
    </div>
  );
}
