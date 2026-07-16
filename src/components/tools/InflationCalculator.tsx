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
  formatUsd,
  parseAmount,
} from "@/lib/finance";

const CURRENT_YEAR = new Date().getFullYear();

export default function InflationCalculator() {
  const [amount, setAmount] = useState("100");
  const [startYear, setStartYear] = useState(String(CURRENT_YEAR - 10));
  const [endYear, setEndYear] = useState(String(CURRENT_YEAR));
  const [inflationRate, setInflationRate] = useState("3.75");

  const result = useMemo(() => {
    const amt = parseAmount(amount);
    const start = parseInt(startYear, 10);
    const end = parseInt(endYear, 10);
    const rate = parseAmount(inflationRate);

    if (amt === null || amt < 0 || !Number.isFinite(start) || !Number.isFinite(end)) {
      return null;
    }
    if (rate === null || rate < 0) return null;

    const years = end - start;
    const r = rate / 100;
    const adjusted = amt * Math.pow(1 + r, years);

    return {
      adjusted,
      years,
      direction: years >= 0 ? "inflate" : "deflate",
      start,
      end,
    };
  }, [amount, startYear, endYear, inflationRate]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Inflation calculator">
        <p className="mb-4 text-sm text-zinc-500">
          Compound purchasing power using an average annual inflation rate. If the end year is
          before the start year, the amount is deflated.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Amount ($)">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Average annual inflation rate (%)">
            <input
              type="text"
              inputMode="decimal"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Start year">
            <input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="End year">
            <input
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
        <FinanceDisclaimer>
          Formula: amount × (1 + rate)^(end − start). Uses a single average rate for the entire
          period.
        </FinanceDisclaimer>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero
            label={
              result.direction === "inflate"
                ? `Purchasing power in ${result.end}`
                : `Equivalent value in ${result.end}`
            }
            value={formatUsd(result.adjusted)}
            hint={
              result.years === 0
                ? "Same year — no adjustment"
                : `${Math.abs(result.years)} year${Math.abs(result.years) === 1 ? "" : "s"} at ${inflationRate}% average`
            }
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat label={`Amount in ${result.start}`} value={formatUsd(parseAmount(amount)!)} />
            <ResultStat
              label={`Adjusted (${result.end})`}
              value={formatUsd(result.adjusted)}
            />
            <ResultStat
              label="Change"
              value={
                result.years === 0
                  ? "—"
                  : `${(((result.adjusted / parseAmount(amount)!) - 1) * 100).toFixed(1)}%`
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
