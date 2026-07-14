"use client";

import { useCallback, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function makeUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
}

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const format = useCallback(
    (value: string) => {
      let next = value;
      if (!hyphens) next = next.replace(/-/g, "");
      if (uppercase) next = next.toUpperCase();
      return next;
    },
    [hyphens, uppercase],
  );

  const generate = () => {
    const n = Math.min(100, Math.max(1, count));
    setUuids(Array.from({ length: n }, () => format(makeUuid())));
    setCopiedAll(false);
    setCopiedIndex(null);
  };

  const copyAll = async () => {
    if (!uuids.length) return;
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setCopiedIndex(null);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const copyOne = async (id: string, index: number) => {
    await navigator.clipboard.writeText(id);
    setCopiedIndex(index);
    setCopiedAll(false);
    setTimeout(() => {
      setCopiedIndex((current) => (current === index ? null : current));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Options">
        <label className="mb-4 block text-sm">
          <span className="mb-1 block font-medium">How many (1–100)</span>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          />
        </label>
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
            />
            Include hyphens
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={generate}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Generate UUID v4
          </button>
          <button
            type="button"
            onClick={copyAll}
            disabled={!uuids.length}
            className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            {copiedAll ? "Copied!" : "Copy all"}
          </button>
        </div>
      </ToolPanel>

      <ToolPanel title="Results">
        {uuids.length === 0 ? (
          <p className="text-sm text-zinc-500">Click generate to create UUIDs.</p>
        ) : (
          <ul className="space-y-2">
            {uuids.map((id, index) => (
              <li
                key={`${id}-${index}`}
                className="flex items-center gap-2"
              >
                <code className="min-w-0 flex-1 break-all rounded-lg bg-zinc-100 px-3 py-2 font-mono text-sm dark:bg-zinc-800">
                  {id}
                </code>
                <button
                  type="button"
                  onClick={() => copyOne(id, index)}
                  className="shrink-0 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </ToolPanel>
    </div>
  );
}
