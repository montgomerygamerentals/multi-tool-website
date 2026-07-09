"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("200000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const annualRate = parseFloat(rate) / 100;
    const n = parseFloat(years) * 12;
    if (isNaN(p) || isNaN(annualRate) || isNaN(n) || p <= 0 || n <= 0) return null;

    const monthlyRate = annualRate / 12;
    let monthlyPayment: number;

    if (monthlyRate === 0) {
      monthlyPayment = p / n;
    } else {
      monthlyPayment =
        (p * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }

    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - p;

    return { monthlyPayment, totalPaid, totalInterest };
  }, [principal, rate, years]);

  const format = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD" });

  return (
    <div className="space-y-6">
      <ToolPanel title="Loan details">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Loan amount ($)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Interest rate (%)</label>
            <input
              type="number"
              value={rate}
              step={0.1}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Term (years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>
      </ToolPanel>
      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-800 dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Monthly payment</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {format(result.monthlyPayment)}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl font-bold">{format(result.totalPaid)}</p>
              <p className="text-sm text-zinc-500">Total amount paid</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl font-bold">{format(result.totalInterest)}</p>
              <p className="text-sm text-zinc-500">Total interest</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
