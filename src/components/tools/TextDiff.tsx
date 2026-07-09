"use client";

import { useMemo, useState } from "react";

function diffLines(a: string, b: string): { type: "same" | "removed" | "added"; line: string }[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const result: { type: "same" | "removed" | "added"; line: string }[] = [];

  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    const lineA = linesA[i];
    const lineB = linesB[i];

    if (lineA === lineB) {
      if (lineA !== undefined) result.push({ type: "same", line: lineA });
    } else {
      if (lineA !== undefined) result.push({ type: "removed", line: lineA });
      if (lineB !== undefined) result.push({ type: "added", line: lineB });
    }
  }

  return result;
}

export default function TextDiff() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const diff = useMemo(() => diffLines(textA, textB), [textA, textB]);

  const lineClass = {
    same: "bg-transparent text-zinc-700 dark:text-zinc-300",
    removed: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300",
    added: "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300",
  };

  const prefix = { same: "  ", removed: "- ", added: "+ " };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Original text</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Changed text</label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      </div>

      {(textA || textB) && (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-3 text-sm font-medium text-zinc-500">Diff result</p>
          <pre className="font-mono text-sm leading-6">
            {diff.map((d, i) => (
              <div key={i} className={lineClass[d.type]}>
                {prefix[d.type]}
                {d.line || " "}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
