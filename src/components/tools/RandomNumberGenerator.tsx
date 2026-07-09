"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [unique, setUnique] = useState(false);

  const generate = () => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const range = hi - lo + 1;

    if (unique && count > range) {
      setResults([]);
      return;
    }

    const nums: number[] = [];
    const used = new Set<number>();

    while (nums.length < count) {
      const n = Math.floor(Math.random() * range) + lo;
      if (unique) {
        if (!used.has(n)) {
          used.add(n);
          nums.push(n);
        }
      } else {
        nums.push(n);
      }
    }

    setResults(nums);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Settings">
        <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Min</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Max</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">How many</label>
            <input
              type="number"
              value={count}
              min={1}
              max={100}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={unique}
            onChange={(e) => setUnique(e.target.checked)}
            className="accent-indigo-600"
          />
          No duplicates
        </label>
        <button
          type="button"
          onClick={generate}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Generate
        </button>
      </ToolPanel>
      {results.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-3 text-sm font-medium text-zinc-500">Results</p>
          <p className="text-3xl font-bold tracking-wide text-indigo-600 dark:text-indigo-400">
            {results.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
