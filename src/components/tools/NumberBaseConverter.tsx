"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";
import { sanitizeRadixDigits } from "@/lib/numeric-input";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

export type NumberBase = 2 | 8 | 10 | 16 | "text";

const BASE_LABELS: Record<Exclude<NumberBase, "text">, string> = {
  2: "Binary (base 2)",
  8: "Octal (base 8)",
  10: "Decimal (base 10)",
  16: "Hexadecimal (base 16)",
};

function textToBinaryString(text: string): string {
  return [...new TextEncoder().encode(text)]
    .map((b) => b.toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryStringToText(bits: string): string | null {
  const parts = bits.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  const bytes: number[] = [];
  for (const p of parts) {
    if (!/^[01]+$/.test(p)) return null;
    const v = parseInt(p, 2);
    if (v < 0 || v > 255) return null;
    bytes.push(v);
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
  } catch {
    return null;
  }
}

function parseToBigInt(value: string, from: NumberBase, to?: NumberBase): bigint | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (from === "text") {
    if (to === 2) return null;
    const bytes = new TextEncoder().encode(trimmed);
    if (bytes.length === 0) return null;
    let n = BigInt(0);
    for (const b of bytes) n = (n << BigInt(8)) + BigInt(b);
    return n;
  }
  try {
    if (from === 16) {
      if (!/^[0-9a-fA-F]+$/.test(trimmed)) return null;
      return BigInt("0x" + trimmed);
    }
    const re = from === 2 ? /^[01]+$/ : from === 8 ? /^[0-7]+$/ : /^[0-9]+$/;
    if (!re.test(trimmed)) return null;
    return BigInt(parseInt(trimmed, from));
  } catch {
    return null;
  }
}

function formatFromBigInt(n: bigint, to: NumberBase, from?: NumberBase, rawInput?: string): string | null {
  if (to === "text") {
    if (from === 2 && rawInput) return binaryStringToText(rawInput);
    const hex = n.toString(16);
    const padded = hex.length % 2 === 0 ? hex : "0" + hex;
    const bytes: number[] = [];
    for (let i = 0; i < padded.length; i += 2) {
      bytes.push(parseInt(padded.slice(i, i + 2), 16));
    }
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
    } catch {
      return null;
    }
  }
  if (to === 16) return n.toString(16).toUpperCase();
  return n.toString(to);
}

function conversionSteps(value: string, from: NumberBase, to: NumberBase, out: string): string[] {
  const steps: string[] = [];
  steps.push(`Input (${from === "text" ? "text/UTF-8 bytes" : `base ${from}`}): ${value}`);
  if (from !== "text" && to !== "text") {
    steps.push(`Convert via decimal: parse in base ${from}, then express in base ${to}.`);
  } else if (from === "text") {
    steps.push("Encode text to UTF-8 bytes, concatenate as one big integer, then format.");
  } else {
    steps.push("Parse number, then decode byte groups as UTF-8 text.");
  }
  steps.push(`Result (${to === "text" ? "text" : `base ${to}`}): ${out}`);
  return steps;
}

export default function NumberBaseConverter({
  fromBase,
  toBase,
}: {
  fromBase?: NumberBase;
  toBase?: NumberBase;
}) {
  const locked = fromBase !== undefined && toBase !== undefined;
  const [from, setFrom] = useState<NumberBase>(fromBase ?? 10);
  const [to, setTo] = useState<NumberBase>(toBase ?? 2);
  const [input, setInput] = useState("42");

  const effectiveFrom = locked ? fromBase! : from;
  const effectiveTo = locked ? toBase! : to;

  const result = useMemo(() => {
    if (effectiveFrom === "text" && effectiveTo === 2) {
      const out = textToBinaryString(input);
      if (!input.trim()) return null;
      const steps = conversionSteps(input, effectiveFrom, effectiveTo, out);
      return { out, steps, error: null as string | null };
    }
    if (effectiveFrom === 2 && effectiveTo === "text") {
      const out = binaryStringToText(input);
      if (out === null) {
        return {
          error: "Use space-separated 8-bit binary bytes (e.g. 01001000 01101001).",
          steps: [] as string[],
        };
      }
      const steps = conversionSteps(input, effectiveFrom, effectiveTo, out);
      return { out, steps, error: null as string | null };
    }
    const n = parseToBigInt(input, effectiveFrom, effectiveTo);
    if (n === null) return null;
    const out = formatFromBigInt(n, effectiveTo, effectiveFrom, input);
    if (out === null) return { error: "Could not decode as valid UTF-8 text.", steps: [] as string[] };
    const steps = conversionSteps(input, effectiveFrom, effectiveTo, out);
    return { out, steps, error: null as string | null };
  }, [input, effectiveFrom, effectiveTo]);

  const bases: NumberBase[] = [2, 8, 10, 16, "text"];

  const clearInputs = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Number base converter" onClear={clearInputs}>
        {!locked && (
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">From</label>
              <select
                value={String(from)}
                onChange={(e) => setFrom(parseBaseOption(e.target.value))}
                className={inputClass}
              >
                {bases.map((b) => (
                  <option key={String(b)} value={String(b)}>
                    {b === "text" ? "Text (UTF-8)" : BASE_LABELS[b]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">To</label>
              <select
                value={String(to)}
                onChange={(e) => setTo(parseBaseOption(e.target.value))}
                className={inputClass}
              >
                {bases.map((b) => (
                  <option key={String(b)} value={String(b)}>
                    {b === "text" ? "Text (UTF-8)" : BASE_LABELS[b]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {locked && (
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Converting from {labelBase(effectiveFrom)} to {labelBase(effectiveTo)}.
          </p>
        )}
        <label className="mb-1 block text-sm font-medium">Value</label>
        <input
          type="text"
          value={input}
          onChange={(e) =>
            setInput(
              effectiveFrom === "text"
                ? e.target.value
                : sanitizeRadixDigits(e.target.value, effectiveFrom),
            )
          }
          className={inputClass}
          spellCheck={effectiveFrom === "text"}
        />
        {result?.error && (
          <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{result.error}</p>
        )}
        {result && !result.error && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Converted value</p>
            <p className="break-all text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.out}
            </p>
          </div>
        )}
      </ToolPanel>
      {result?.steps && result.steps.length > 0 && !result.error && (
        <StepsList steps={result.steps} />
      )}
    </div>
  );
}

function parseBaseOption(v: string): NumberBase {
  if (v === "text") return "text";
  return Number(v) as 2 | 8 | 10 | 16;
}

function labelBase(b: NumberBase): string {
  if (b === "text") return "text";
  return BASE_LABELS[b];
}
