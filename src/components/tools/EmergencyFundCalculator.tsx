"use client";

import { useMemo, useState } from "react";
import {
  FinanceDisclaimer,
  FinanceField,
  ResultHero,
  ResultStat,
  ToolPanel,
} from "@/components/tools/shared/FinanceUi";
import {
  financeInputClass,
  formatPct,
  formatUsd,
  parseAmount,
} from "@/lib/finance";

const MONTH_PRESETS = [3, 6, 9, 12] as const;

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState("3000");
  const [monthsCoverage, setMonthsCoverage] = useState("6");
  const [customMonths, setCustomMonths] = useState(false);
  const [currentSavings, setCurrentSavings] = useState("5000");

  const result = useMemo(() => {
    const expenses = parseAmount(monthlyExpenses);
    const months = parseAmount(monthsCoverage);
    const savings = parseAmount(currentSavings) ?? 0;

    if (expenses === null || expenses <= 0 || months === null || months <= 0) {
      return null;
    }

    const target = expenses * months;
    const stillNeeded = Math.max(0, target - savings);
    const progress = target > 0 ? Math.min(100, (savings / target) * 100) : 0;

    return { target, stillNeeded, progress, savings };
  }, [monthlyExpenses, monthsCoverage, currentSavings]);

  const selectPreset = (months: number) => {
    setCustomMonths(false);
    setMonthsCoverage(String(months));
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Emergency fund details">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Monthly essential expenses ($)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Current emergency savings ($)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Months of coverage desired</p>
          <div className="flex flex-wrap gap-2">
            {MONTH_PRESETS.map((months) => (
              <button
                key={months}
                type="button"
                onClick={() => selectPreset(months)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  !customMonths && monthsCoverage === String(months)
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {months} months
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCustomMonths(true)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                customMonths
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              Custom
            </button>
          </div>
          {customMonths && (
            <div className="mt-3 max-w-xs">
              <FinanceField label="Custom months">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={monthsCoverage}
                  onChange={(e) => setMonthsCoverage(e.target.value)}
                  className={financeInputClass}
                />
              </FinanceField>
            </div>
          )}
        </div>
      </ToolPanel>

      {result && (
        <>
          <ResultHero
            label="Target emergency fund"
            value={formatUsd(result.target)}
            hint={`${monthsCoverage} months of essential expenses`}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat
              label="Amount still needed"
              value={formatUsd(result.stillNeeded)}
            />
            <ResultStat
              label="Progress"
              value={formatPct(result.progress, 1)}
            />
            <ResultStat
              label="Current savings"
              value={formatUsd(result.savings)}
            />
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-500">Fund progress</span>
              <span className="font-medium">{formatPct(result.progress, 1)}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all dark:bg-indigo-500"
                style={{ width: `${result.progress}%` }}
              />
            </div>
          </div>
        </>
      )}

      <FinanceDisclaimer>
        Most advisors suggest 3–6 months of essential expenses; self-employed
        households often aim for 6–12 months. Adjust based on your job stability
        and obligations.
      </FinanceDisclaimer>
    </div>
  );
}
