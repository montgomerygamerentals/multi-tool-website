"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const encode = () => {
    setError(null);
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setError("Failed to encode text.");
    }
  };

  const decode = () => {
    setError(null);
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setError("Invalid Base64 string.");
      setOutput("");
    }
  };

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Enter text or Base64 string…"
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={encode}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Encode to Base64
        </button>
        <button
          type="button"
          onClick={decode}
          className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          Decode from Base64
        </button>
      </div>
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}
      {output && (
        <ToolPanel title="Result">
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Copy
          </button>
        </ToolPanel>
      )}
    </div>
  );
}
