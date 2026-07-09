"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function parseItems(input: string): string[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ListShuffler() {
  const [input, setInput] = useState("Alice\nBob\nCharlie\nDiana\nEve\nFrank");
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const items = useMemo(() => parseItems(input), [input]);
  const canShuffle = items.length >= 2;

  const doShuffle = () => {
    if (!canShuffle) return;
    setShuffled(shuffle(items));
    setCopied(false);
  };

  const copyResult = async () => {
    if (shuffled.length === 0) return;
    const text = shuffled.map((item, index) => `${index + 1}. ${item}`).join(", ");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearList = () => {
    setInput("");
    setShuffled([]);
    setCopied(false);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Your list">
        <label htmlFor="list-shuffler-input" className="mb-2 block text-sm text-zinc-600 dark:text-zinc-400">
          Enter one item per line.
        </label>
        <textarea
          id="list-shuffler-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShuffled([]);
            setCopied(false);
          }}
          rows={8}
          placeholder={"Alice\nBob\nCharlie\nDiana"}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="text-zinc-500">
            {items.length} item{items.length !== 1 ? "s" : ""} ready
          </span>
          {input && (
            <button
              type="button"
              onClick={clearList}
              className="font-medium text-zinc-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              Clear list
            </button>
          )}
        </div>
        {items.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </ToolPanel>

      <ToolPanel title="Shuffle">
        <button
          type="button"
          onClick={doShuffle}
          disabled={!canShuffle}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {shuffled.length > 0 ? "Shuffle again" : "Shuffle list"}
        </button>
        {!canShuffle && (
          <p className="mt-3 text-sm text-zinc-500">
            Add at least 2 items to shuffle the list.
          </p>
        )}
      </ToolPanel>

      {shuffled.length > 0 && (
        <ToolPanel title="Shuffled result">
          <ol className="space-y-2">
            {shuffled.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-800"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {index + 1}
                </span>
                <span className="text-zinc-800 dark:text-zinc-100">{item}</span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={copyResult}
            className="mt-4 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {copied ? "Copied!" : "Copy shuffled list"}
          </button>
        </ToolPanel>
      )}
    </div>
  );
}
