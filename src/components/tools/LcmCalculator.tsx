"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";
import { sanitizeIntegerList } from "@/lib/numeric-input";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

function parseNumbers(raw: string): number[] | null {
  const parts = raw
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return null;
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isInteger(n) || n === 0)) return null;
  return nums.map((n) => Math.abs(n));
}

function primeFactors(n: number): Map<number, number> {
  const map = new Map<number, number>();
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    while (x % p === 0) {
      map.set(p, (map.get(p) ?? 0) + 1);
      x = Math.floor(x / p);
    }
  }
  if (x > 1) map.set(x, (map.get(x) ?? 0) + 1);
  return map;
}

function formatFactorization(map: Map<number, number>): string {
  if (map.size === 0) return "1";
  return [...map.entries()]
    .map(([p, e]) => (e === 1 ? String(p) : `${p}^${e}`))
    .join(" × ");
}

function lcmFromFactors(factorMaps: Map<number, number>[], steps: string[]): number {
  const combined = new Map<number, number>();
  for (const m of factorMaps) {
    for (const [p, e] of m) {
      combined.set(p, Math.max(combined.get(p) ?? 0, e));
    }
  }
  steps.push(`Take the highest power of each prime: ${formatFactorization(combined)}`);
  let lcm = 1;
  for (const [p, e] of combined) {
    lcm *= p ** e;
  }
  return lcm;
}

export default function LcmCalculator() {
  const [input, setInput] = useState("4, 6, 10");

  const result = useMemo(() => {
    const nums = parseNumbers(input);
    if (!nums) return null;
    const steps: string[] = [`Find LCM of ${nums.join(", ")} using prime factorization.`];
    const maps = nums.map((n) => {
      const m = primeFactors(n);
      steps.push(`${n} = ${formatFactorization(m)}`);
      return m;
    });
    const lcm = lcmFromFactors(maps, steps);
    steps.push(`LCM = ${lcm}`);
    return { lcm, steps };
  }, [input]);

  const clearInputs = () => setInput("");

  return (
    <div className="space-y-6">
      <ToolPanel title="LCM calculator" onClear={clearInputs}>
        <label className="mb-1 block text-sm font-medium">
          Integers (comma-separated, 2 or more)
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(sanitizeIntegerList(e.target.value))}
          className={inputClass}
          placeholder="e.g. 4, 6, 8"
        />
        {result && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Least common multiple</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.lcm}
            </p>
          </div>
        )}
      </ToolPanel>
      {result && <StepsList title="Prime factor steps" steps={result.steps} />}
    </div>
  );
}
