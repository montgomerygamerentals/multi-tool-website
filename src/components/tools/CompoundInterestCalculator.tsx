"use client";

import { useMemo, useState } from "react";
import {
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

const COMPOUND_PRESETS = [1, 2, 4, 12, 365];

function futureValueWithContributions(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear: number,
  monthlyContribution: number,
): number {
  const r = annualRatePct / 100;
  const n = compoundsPerYear;
  const t = years;
  const periods = n * t;
  const ratePerPeriod = r / n;

  const principalFv =
    ratePerPeriod === 0
      ? principal
      : principal * Math.pow(1 + ratePerPeriod, periods);

  if (monthlyContribution <= 0) return principalFv;

  const pmtPerPeriod = monthlyContribution * (12 / n);
  let contributionFv: number;
  if (ratePerPeriod === 0) {
    contributionFv = pmtPerPeriod * periods;
  } else {
    contributionFv =
      pmtPerPeriod *
      ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod);
  }

  return principalFv + contributionFv;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compoundsPerYear, setCompoundsPerYear] = useState(12);
  const [monthlyContribution, setMonthlyContribution] = useState("");

  const result = useMemo(() => {
    const p = parseAmount(principal);
    const annualRate = parseAmount(rate);
    const y = parseAmount(years);
    const pmt = parseAmount(monthlyContribution) ?? 0;

    if (p === null || annualRate === null || y === null || p < 0 || y <= 0) {
      return null;
    }

    const futureValue = futureValueWithContributions(
      p,
      annualRate,
      y,
      compoundsPerYear,
      pmt,
    );
    const totalContributions = p + pmt * 12 * y;
    const interestEarned = futureValue - totalContributions;

    return { futureValue, totalContributions, interestEarned };
  }, [principal, rate, years, compoundsPerYear, monthlyContribution]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Investment details">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Principal ($)">
            <input
              type="number"
              min={0}
              step={100}
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Annual interest rate (%)">
            <input
              type="number"
              min={0}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Time (years)">
            <input
              type="number"
              min={1}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Monthly contribution ($, optional)">
            <input
              type="number"
              min={0}
              step={50}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="0"
              className={financeInputClass}
            />
          </FinanceField>
        </div>
        <FinanceField label="Compounds per year" className="mt-4">
          <div className="flex flex-wrap gap-2">
            {COMPOUND_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setCompoundsPerYear(preset)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  compoundsPerYear === preset
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {preset === 1 ? "Annual" : preset === 12 ? "Monthly" : preset === 365 ? "Daily" : preset}
              </button>
            ))}
          </div>
        </FinanceField>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero label="Future value" value={formatUsd(result.futureValue)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultStat
              label="Total contributions"
              value={formatUsd(result.totalContributions)}
            />
            <ResultStat
              label="Interest earned"
              value={formatUsd(result.interestEarned)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
