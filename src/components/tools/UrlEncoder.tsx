"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Mode = "component" | "uri";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("component");
  const [error, setError] = useState<string | null>(null);

  const encode = () => {
    setError(null);
    try {
      setOutput(mode === "component" ? encodeURIComponent(input) : encodeURI(input));
    } catch {
      setError("Encode failed.");
    }
  };

  const clearInputs = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const decode = () => {
    setError(null);
    try {
      setOutput(mode === "component" ? decodeURIComponent(input) : decodeURI(input));
    } catch {
      setError("Invalid encoded URL.");
      setOutput("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("component")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "component"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          URI component
        </button>
        <button
          type="button"
          onClick={() => setMode("uri")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "uri"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Full URI
        </button>
      </div>
      <ToolPanel title="Input" onClear={clearInputs}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder="Text or encoded URL…"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </ToolPanel>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={encode}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Encode
        </button>
        <button
          type="button"
          onClick={decode}
          className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          Decode
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
            rows={6}
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
