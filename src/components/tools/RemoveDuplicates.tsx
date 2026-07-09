"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function RemoveDuplicates() {
  const [input, setInput] = useState("");
  const [sortAlpha, setSortAlpha] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);

  const output = useMemo(() => {
    const lines = input.split("\n");
    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }

    if (sortAlpha) {
      result.sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: caseSensitive ? "case" : "base" }),
      );
    }

    return result.join("\n");
  }, [input, sortAlpha, caseSensitive]);

  const removed = input.split("\n").length - output.split("\n").length;

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        placeholder="Paste your list, one item per line…"
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      <ToolPanel title="Options">
        <div className="mb-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={sortAlpha}
              onChange={(e) => setSortAlpha(e.target.checked)}
              className="accent-indigo-600"
            />
            Sort alphabetically
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="accent-indigo-600"
            />
            Case sensitive
          </label>
        </div>
        {input && (
          <p className="text-sm text-zinc-500">
            Removed {Math.max(0, removed)} duplicate line{removed !== 1 ? "s" : ""}
          </p>
        )}
      </ToolPanel>
      <ToolPanel title="Result">
        <textarea
          readOnly
          value={output}
          rows={10}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(output)}
          className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Copy result
        </button>
      </ToolPanel>
    </div>
  );
}
