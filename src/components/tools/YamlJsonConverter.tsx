"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function YamlJsonConverter() {
  const [mode, setMode] = useState<"yaml-json" | "json-yaml">("yaml-json");
  const [input, setInput] = useState("name: Ada\nage: 36\ntags:\n  - math\n  - code");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);

  const clearInputs = () => {
    setInput("");
    setResult("");
    setError(null);
  };

  const convert = async () => {
    try {
      const yaml = await import("js-yaml");
      if (mode === "yaml-json") {
        const data = yaml.load(input);
        setResult(JSON.stringify(data, null, 2));
      } else {
        const data = JSON.parse(input) as unknown;
        setResult(yaml.dump(data));
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setResult("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("yaml-json")}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${mode === "yaml-json" ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800"}`}
        >
          YAML → JSON
        </button>
        <button
          type="button"
          onClick={() => setMode("json-yaml")}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${mode === "json-yaml" ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800"}`}
        >
          JSON → YAML
        </button>
      </div>
      <ToolPanel title="Input" onClear={clearInputs}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800"
        />
        <button
          type="button"
          onClick={convert}
          className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          Convert
        </button>
      </ToolPanel>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result && (
        <ToolPanel title="Output">
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-xs">
            {result}
          </pre>
        </ToolPanel>
      )}
    </div>
  );
}
