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

function projectRetirementBalance(
  currentSavings: number,
  monthlyContribution: number,
  annualReturnPct: number,
  years: number,
): number {
  const monthlyRate = annualReturnPct / 100 / 12;
  const months = years * 12;

  let balance = currentSavings;
  for (let i = 0; i < months; i++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
  }
  return balance;
}

export default function RetirementCalculator() {
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [years, setYears] = useState("30");

  const result = useMemo(() => {
    const savings = parseAmount(currentSavings);
    const monthly = parseAmount(monthlyContribution) ?? 0;
    const returnPct = parseAmount(annualReturn);
    const y = parseAmount(years);

    if (savings === null || returnPct === null || y === null || savings < 0 || y <= 0) {
      return null;
    }

    const projectedBalance = projectRetirementBalance(
      savings,
      monthly,
      returnPct,
      y,
    );
    const totalContributions = savings + monthly * 12 * y;
    const growth = projectedBalance - totalContributions;

    return { projectedBalance, totalContributions, growth };
  }, [currentSavings, monthlyContribution, annualReturn, years]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Retirement plan">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Current savings ($)">
            <input
              type="number"
              min={0}
              step={1000}
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Monthly contribution ($)">
            <input
              type="number"
              min={0}
              step={50}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Expected annual return (%)">
            <input
              type="number"
              min={0}
              step={0.1}
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Years until retirement">
            <input
              type="number"
              min={1}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero
            label="Projected balance at retirement"
            value={formatUsd(result.projectedBalance)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultStat
              label="Total contributions"
              value={formatUsd(result.totalContributions)}
            />
            <ResultStat label="Investment growth" value={formatUsd(result.growth)} />
          </div>
        </div>
      )}
    </div>
  );
}
