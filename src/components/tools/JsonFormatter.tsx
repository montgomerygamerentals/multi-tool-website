"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Mode = "format" | "minify" | "validate";

const activeBtn =
  "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700";
const idleBtn =
  "rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<Mode | null>(null);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const format = () => {
    setMode("format");
    setError(null);
    setValid(null);
    setCopied(false);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => {
    setMode("minify");
    setError(null);
    setValid(null);
    setCopied(false);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const validate = () => {
    setMode("validate");
    setError(null);
    setOutput("");
    setCopied(false);
    try {
      JSON.parse(input);
      setValid(true);
    } catch (e) {
      setValid(false);
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        placeholder='Paste JSON here, e.g. {"key": "value"}'
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={format}
          className={mode === "format" ? activeBtn : idleBtn}
        >
          Format (Pretty)
        </button>
        <button
          type="button"
          onClick={minify}
          className={mode === "minify" ? activeBtn : idleBtn}
        >
          Minify
        </button>
        <button
          type="button"
          onClick={validate}
          className={mode === "validate" ? activeBtn : idleBtn}
        >
          Validate
        </button>
      </div>
      {valid === true && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
          Valid JSON
        </p>
      )}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}
      {output && (
        <ToolPanel title="Output">
          <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-4 font-mono text-sm dark:bg-zinc-800">
            {output}
          </pre>
          <button
            type="button"
            onClick={copy}
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </ToolPanel>
      )}
    </div>
  );
}
