"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function generateParagraphs(count: number): string {
  const sentences = LOREM.split(". ").map((s) => s.trim());
  const paragraphs: string[] = [];

  for (let i = 0; i < count; i++) {
    const len = 3 + Math.floor(Math.random() * 4);
    const parts: string[] = [];
    for (let j = 0; j < len; j++) {
      parts.push(sentences[Math.floor(Math.random() * sentences.length)]);
    }
    paragraphs.push(parts.join(". ") + ".");
  }

  return paragraphs.join("\n\n");
}

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");

  const generate = () => {
    setOutput(generateParagraphs(paragraphs));
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Settings">
        <label className="mb-2 block text-sm font-medium">Number of paragraphs</label>
        <input
          type="number"
          value={paragraphs}
          min={1}
          max={20}
          onChange={(e) => setParagraphs(Number(e.target.value))}
          className="mb-4 w-32 rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
        <button
          type="button"
          onClick={generate}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Generate
        </button>
      </ToolPanel>
      {output && (
        <ToolPanel title="Generated text">
          <textarea
            readOnly
            value={output}
            rows={12}
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
