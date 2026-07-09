"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const converters = [
  { label: "UPPERCASE", fn: (t: string) => t.toUpperCase() },
  { label: "lowercase", fn: (t: string) => t.toLowerCase() },
  {
    label: "Title Case",
    fn: (t: string) =>
      t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    label: "Sentence case",
    fn: (t: string) =>
      t.toLowerCase().replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase()),
  },
  {
    label: "camelCase",
    fn: (t: string) =>
      t
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase()),
  },
  {
    label: "snake_case",
    fn: (t: string) =>
      t
        .trim()
        .replace(/\s+/g, "_")
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toLowerCase(),
  },
  {
    label: "kebab-case",
    fn: (t: string) =>
      t
        .trim()
        .replace(/\s+/g, "-")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase(),
  },
];

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = (fn: (t: string) => string) => {
    setOutput(fn(input));
  };

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        placeholder="Enter text to convert…"
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      <ToolPanel title="Convert to">
        <div className="flex flex-wrap gap-2">
          {converters.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => convert(c.fn)}
              className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-indigo-100 hover:text-indigo-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-indigo-950"
            >
              {c.label}
            </button>
          ))}
        </div>
      </ToolPanel>
      {output && (
        <ToolPanel title="Result">
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Copy to clipboard
          </button>
        </ToolPanel>
      )}
    </div>
  );
}
