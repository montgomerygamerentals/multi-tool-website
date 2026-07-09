"use client";

import { useCallback, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(
  length: number,
  options: Record<keyof typeof CHARSETS, boolean>,
): string {
  let charset = "";
  for (const [key, enabled] of Object.entries(options) as [keyof typeof CHARSETS, boolean][]) {
    if (enabled) charset += CHARSETS[key];
  }
  if (!charset) charset = CHARSETS.lowercase + CHARSETS.numbers;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => charset[n % charset.length]).join("");
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setPassword(generatePassword(length, options));
    setCopied(false);
  }, [length, options]);

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Generated Password">
        <div className="mb-4 flex items-center gap-3">
          <code className="flex-1 break-all rounded-lg bg-zinc-100 px-4 py-3 font-mono text-lg dark:bg-zinc-800">
            {password || "Click generate"}
          </code>
          <button
            type="button"
            onClick={copy}
            disabled={!password}
            className="shrink-0 rounded-lg border border-zinc-300 px-4 py-3 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <button
          type="button"
          onClick={generate}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Generate Password
        </button>
      </ToolPanel>
      <ToolPanel title="Options">
        <label className="mb-4 block text-sm font-medium">
          Length: {length}
        </label>
        <input
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mb-6 w-full accent-indigo-600"
        />
        <div className="space-y-3">
          {(Object.keys(CHARSETS) as (keyof typeof CHARSETS)[]).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm capitalize">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(e) =>
                  setOptions((o) => ({ ...o, [key]: e.target.checked }))
                }
                className="accent-indigo-600"
              />
              Include {key}
            </label>
          ))}
        </div>
      </ToolPanel>
    </div>
  );
}
