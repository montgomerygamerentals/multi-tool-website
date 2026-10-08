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
  if (nums.some((n) => !Number.isInteger(n))) return null;
  return nums.map((n) => Math.abs(n));
}

function gcdTwo(a: number, b: number, steps: string[]): number {
  let x = a;
  let y = b;
  steps.push(`Euclidean algorithm for ${a} and ${b}:`);
  while (y !== 0) {
    const r = x % y;
    steps.push(`${x} ÷ ${y} = ${Math.floor(x / y)} remainder ${r}`);
    x = y;
    y = r;
  }
  steps.push(`GCD = ${x}`);
  return x;
}

function gcdAll(nums: number[], steps: string[]): number {
  let g = nums[0];
  steps.push(`Find GCF of: ${nums.join(", ")}`);
  for (let i = 1; i < nums.length; i++) {
    steps.push(`---`);
    g = gcdTwo(g, nums[i], steps);
  }
  return g;
}

export default function GcfCalculator() {
  const [input, setInput] = useState("24, 36, 60");

  const result = useMemo(() => {
    const nums = parseNumbers(input);
    if (!nums) return null;
    const steps: string[] = [];
    const gcf = gcdAll(nums, steps);
    return { gcf, steps };
  }, [input]);

  const clearInputs = () => setInput("");

  return (
    <div className="space-y-6">
      <ToolPanel title="GCF / GCD calculator" onClear={clearInputs}>
        <label className="mb-1 block text-sm font-medium">
          Integers (comma-separated, 2 or more)
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(sanitizeIntegerList(e.target.value))}
          className={inputClass}
          placeholder="e.g. 12, 18, 30"
        />
        {result && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Greatest common factor</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.gcf}
            </p>
          </div>
        )}
      </ToolPanel>
      {result && <StepsList title="Euclidean steps" steps={result.steps} />}
    </div>
  );
}
