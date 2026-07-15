"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Mode = "decimal-to-fraction" | "fraction-to-decimal";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function simplify(numerator: number, denominator: number) {
  if (denominator === 0) return null;
  const sign = numerator < 0 !== denominator < 0 ? -1 : 1;
  const n = Math.abs(numerator);
  const d = Math.abs(denominator);
  const g = gcd(n, d);
  return { numerator: sign * (n / g), denominator: d / g };
}

/** Convert a decimal string to a simplified fraction (exact for terminating decimals). */
function decimalStringToFraction(input: string): {
  numerator: number;
  denominator: number;
} | null {
  const trimmed = input.trim().replace(/\s+/g, "");
  if (!trimmed || trimmed === "-" || trimmed === "+" || trimmed === ".") return null;

  const match = trimmed.match(/^([+-])?(\d*)(?:\.(\d+))?$/);
  if (!match) return null;

  const sign = match[1] === "-" ? -1 : 1;
  const whole = match[2] || "0";
  const frac = match[3] || "";

  if (!match[2] && !match[3]) return null;

  const denominator = frac ? 10 ** frac.length : 1;
  const numerator = sign * (Number(whole) * denominator + Number(frac || "0"));

  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) return null;
  return simplify(numerator, denominator);
}

/** Best rational approximation via continued fractions (for non-terminating floats). */
function approximateFraction(
  value: number,
  maxDenominator = 100000,
): { numerator: number; denominator: number } | null {
  if (!Number.isFinite(value)) return null;

  const sign = value < 0 ? -1 : 1;
  let x = Math.abs(value);

  let a = Math.floor(x);
  let h1 = 1;
  let k1 = 0;
  let h = a;
  let k = 1;

  while (x - a > 1e-12) {
    x = 1 / (x - a);
    a = Math.floor(x);
    const h2 = h1;
    const k2 = k1;
    h1 = h;
    k1 = k;
    h = h2 + a * h1;
    k = k2 + a * k1;
    if (k > maxDenominator) {
      h = h1;
      k = k1;
      break;
    }
    if (Math.abs(value - (sign * h) / k) < 1e-12) break;
  }

  return simplify(sign * h, k);
}

function formatMixed(
  numerator: number,
  denominator: number,
): string | null {
  if (denominator === 0) return null;
  const absN = Math.abs(numerator);
  if (absN < denominator) return null;
  const whole = Math.trunc(numerator / denominator);
  const rem = absN % denominator;
  if (rem === 0) return String(whole);
  const sign = numerator < 0 && whole === 0 ? "-" : "";
  return `${sign}${whole} ${rem}/${denominator}`;
}

function parseFractionParts(
  whole: string,
  numerator: string,
  denominator: string,
): { numerator: number; denominator: number } | null {
  const w = whole.trim() === "" ? 0 : Number(whole);
  const n = numerator.trim() === "" ? 0 : Number(numerator);
  const d = Number(denominator);

  if (!Number.isFinite(w) || !Number.isFinite(n) || !Number.isFinite(d)) return null;
  if (!Number.isInteger(w) || !Number.isInteger(n) || !Number.isInteger(d)) return null;
  if (d === 0) return null;
  if (numerator.trim() === "" && whole.trim() === "") return null;

  const sign = w < 0 || (w === 0 && n < 0) ? -1 : 1;
  const improper = Math.abs(w) * Math.abs(d) + Math.abs(n);
  return simplify(sign * improper, Math.abs(d));
}

export default function FractionDecimalConverter() {
  const [mode, setMode] = useState<Mode>("decimal-to-fraction");
  const [decimal, setDecimal] = useState("0.75");
  const [whole, setWhole] = useState("");
  const [numerator, setNumerator] = useState("3");
  const [denominator, setDenominator] = useState("4");

  const decimalResult = useMemo(() => {
    const exact = decimalStringToFraction(decimal);
    if (exact) {
      return {
        ...exact,
        mixed: formatMixed(exact.numerator, exact.denominator),
        error: null as string | null,
      };
    }

    const num = Number(decimal.trim());
    if (!Number.isFinite(num)) {
      return {
        numerator: 0,
        denominator: 1,
        mixed: null,
        error: decimal.trim() ? "Enter a valid decimal number." : null,
      };
    }

    const approx = approximateFraction(num);
    if (!approx) {
      return {
        numerator: 0,
        denominator: 1,
        mixed: null,
        error: "Could not convert that number.",
      };
    }

    return {
      ...approx,
      mixed: formatMixed(approx.numerator, approx.denominator),
      error: null,
    };
  }, [decimal]);

  const fractionResult = useMemo(() => {
    const parsed = parseFractionParts(whole, numerator, denominator);
    if (!parsed) {
      const hasInput =
        whole.trim() !== "" ||
        numerator.trim() !== "" ||
        denominator.trim() !== "";
      return {
        value: null as number | null,
        simplified: null as { numerator: number; denominator: number } | null,
        mixed: null as string | null,
        error: !hasInput
          ? null
          : Number(denominator) === 0
            ? "Denominator cannot be zero."
            : "Enter whole numbers for the fraction parts.",
      };
    }

    return {
      value: parsed.numerator / parsed.denominator,
      simplified: parsed,
      mixed: formatMixed(parsed.numerator, parsed.denominator),
      error: null,
    };
  }, [whole, numerator, denominator]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("decimal-to-fraction")}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            mode === "decimal-to-fraction"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Decimal → Fraction
        </button>
        <button
          type="button"
          onClick={() => setMode("fraction-to-decimal")}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            mode === "fraction-to-decimal"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Fraction → Decimal
        </button>
      </div>

      {mode === "decimal-to-fraction" ? (
        <ToolPanel title="Convert decimal to fraction">
          <div>
            <label
              htmlFor="decimal-input"
              className="mb-1 block text-sm font-medium"
            >
              Decimal
            </label>
            <input
              id="decimal-input"
              type="text"
              inputMode="decimal"
              value={decimal}
              onChange={(e) => setDecimal(e.target.value)}
              placeholder="e.g. 0.75 or 2.5"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          {decimalResult.error && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">
              {decimalResult.error}
            </p>
          )}

          {!decimalResult.error && decimal.trim() !== "" && (
            <div className="mt-6">
              <div className="rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
                {decimalResult.mixed ? (
                  <div className="flex flex-wrap items-start justify-center gap-x-16 gap-y-4">
                    <div>
                      <p className="text-sm text-zinc-500">Mixed number</p>
                      <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                        {decimalResult.mixed}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">Improper fraction</p>
                      <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                        {decimalResult.numerator}/{decimalResult.denominator}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-zinc-500">Simplified fraction</p>
                    <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {decimalResult.denominator === 1
                        ? decimalResult.numerator
                        : `${decimalResult.numerator}/${decimalResult.denominator}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </ToolPanel>
      ) : (
        <ToolPanel title="Convert fraction to decimal">
          <div className="flex flex-wrap items-center justify-center gap-4 py-6">
            <input
              id="fraction-whole"
              type="text"
              inputMode="numeric"
              value={whole}
              onChange={(e) => setWhole(e.target.value)}
              aria-label="Whole number (optional)"
              title="Whole number (optional)"
              className="h-14 w-16 rounded-lg border border-zinc-300 bg-white text-center text-3xl font-semibold tabular-nums dark:border-zinc-700 dark:bg-zinc-800"
            />

            <div className="flex flex-col items-center">
              <input
                id="fraction-numerator"
                type="text"
                inputMode="numeric"
                value={numerator}
                onChange={(e) => setNumerator(e.target.value)}
                aria-label="Numerator"
                title="Numerator"
                className="h-12 w-20 rounded-lg border border-zinc-300 bg-white text-center text-2xl font-semibold tabular-nums dark:border-zinc-700 dark:bg-zinc-800"
              />
              <div
                className="my-2.5 h-0.5 w-18 rounded-full bg-zinc-800 dark:bg-zinc-200"
                aria-hidden="true"
              />
              <input
                id="fraction-denominator"
                type="text"
                inputMode="numeric"
                value={denominator}
                onChange={(e) => setDenominator(e.target.value)}
                aria-label="Denominator"
                title="Denominator"
                className="h-12 w-20 rounded-lg border border-zinc-300 bg-white text-center text-2xl font-semibold tabular-nums dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
          </div>

          {fractionResult.error && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">
              {fractionResult.error}
            </p>
          )}

          {fractionResult.value !== null && fractionResult.simplified && (
            <div className="mt-6 space-y-3">
              <div className="rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
                <p className="text-sm text-zinc-500">Decimal</p>
                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  {fractionResult.value.toLocaleString(undefined, {
                    maximumFractionDigits: 12,
                  })}
                </p>
              </div>
              <p className="text-center text-sm text-zinc-500">
                Simplified:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {fractionResult.simplified.denominator === 1
                    ? fractionResult.simplified.numerator
                    : `${fractionResult.simplified.numerator}/${fractionResult.simplified.denominator}`}
                </span>
                {fractionResult.mixed && (
                  <>
                    {" · "}
                    Mixed:{" "}
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {fractionResult.mixed}
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
        </ToolPanel>
      )}
    </div>
  );
}
