"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function allFactors(n: number): number[] {
  const abs = Math.abs(n);
  if (abs === 0) return [];
  const factors: number[] = [];
  for (let i = 1; i * i <= abs; i++) {
    if (abs % i === 0) {
      factors.push(i);
      if (i !== abs / i) factors.push(abs / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

function primeFactorization(n: number, steps: string[]): Map<number, number> {
  const map = new Map<number, number>();
  let x = Math.abs(n);
  if (x <= 1) {
    steps.push(`${n} has no prime factorization beyond trivial cases.`);
    return map;
  }
  steps.push(`Divide ${x} by the smallest prime factors:`);
  for (let p = 2; p * p <= x; p++) {
    while (x % p === 0) {
      map.set(p, (map.get(p) ?? 0) + 1);
      steps.push(`${x} ÷ ${p} = ${x / p}`);
      x = Math.floor(x / p);
    }
  }
  if (x > 1) {
    map.set(x, (map.get(x) ?? 0) + 1);
    steps.push(`Remaining prime factor: ${x}`);
  }
  return map;
}

function formatFactorization(map: Map<number, number>): string {
  if (map.size === 0) return "—";
  return [...map.entries()]
    .map(([p, e]) => (e === 1 ? String(p) : `${p}^${e}`))
    .join(" × ");
}

export default function PrimeFactorCalculator() {
  const [input, setInput] = useState("360");

  const result = useMemo(() => {
    const n = Number(input.trim());
    if (!Number.isInteger(n) || n === 0) return null;
    const steps: string[] = [];
    const prime = isPrime(Math.abs(n));
    steps.push(
      Math.abs(n) < 2
        ? `${n} is not considered a prime number.`
        : prime
          ? `${Math.abs(n)} is prime (only divisors are 1 and itself).`
          : `${Math.abs(n)} is composite.`,
    );
    const factors = allFactors(n);
    steps.push(`All positive factors: ${factors.join(", ")}`);
    const pf = primeFactorization(n, steps);
    const pfStr = formatFactorization(pf);
    if (pf.size > 0) steps.push(`Prime factorization: ${pfStr}`);
    return { prime, factors, pfStr, steps };
  }, [input]);

  const clearInputs = () => setInput("");

  return (
    <div className="space-y-6">
      <ToolPanel title="Prime check & factorization" onClear={clearInputs}>
        <label className="mb-1 block text-sm font-medium">Integer</label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={inputClass}
        />
        {result && (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-indigo-50 p-4 text-center dark:bg-indigo-950/30">
                <p className="text-sm text-zinc-500">Prime?</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {result.prime ? "Yes" : "No"}
                </p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-4 text-center dark:bg-indigo-950/30">
                <p className="text-sm text-zinc-500">Prime factorization</p>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {result.pfStr}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Factors: {result.factors.join(", ")}
            </p>
          </>
        )}
      </ToolPanel>
      {result && <StepsList steps={result.steps} />}
    </div>
  );
}
