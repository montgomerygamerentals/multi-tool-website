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
  monthlyLoanPayment,
  parseAmount,
} from "@/lib/finance";

const TERM_PRESETS = [15, 20, 30];

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");

  const result = useMemo(() => {
    const price = parseAmount(homePrice);
    const down = parseAmount(downPayment) ?? 0;
    const annualRate = parseAmount(rate);
    const termYears = parseAmount(years);
    const taxYearly = parseAmount(propertyTax) ?? 0;
    const insuranceYearly = parseAmount(insurance) ?? 0;

    if (
      price === null ||
      annualRate === null ||
      termYears === null ||
      price <= 0 ||
      down < 0 ||
      down >= price ||
      termYears <= 0
    ) {
      return null;
    }

    const loanAmount = price - down;
    const termMonths = termYears * 12;
    const monthlyPayment = monthlyLoanPayment(loanAmount, annualRate, termMonths);
    const totalPaid = monthlyPayment * termMonths;
    const totalInterest = totalPaid - loanAmount;
    const monthlyEscrow = (taxYearly + insuranceYearly) / 12;
    const estimatedMonthly = monthlyPayment + monthlyEscrow;

    return {
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalPaid,
      estimatedMonthly,
      hasEscrow: taxYearly > 0 || insuranceYearly > 0,
    };
  }, [homePrice, downPayment, rate, years, propertyTax, insurance]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Mortgage details">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Home price ($)">
            <input
              type="number"
              min={0}
              step={1000}
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Down payment ($)">
            <input
              type="number"
              min={0}
              step={1000}
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Interest rate (%)">
            <input
              type="number"
              min={0}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Loan term (years)">
            <div className="mb-2 flex flex-wrap gap-2">
              {TERM_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setYears(String(preset))}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                    years === String(preset)
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {preset} yr
                </button>
              ))}
            </div>
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

      <ToolPanel title="Taxes & insurance (optional)">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Property tax per year ($)">
            <input
              type="number"
              min={0}
              step={100}
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              placeholder="0"
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Home insurance per year ($)">
            <input
              type="number"
              min={0}
              step={100}
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              placeholder="0"
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero
            label="Monthly payment (P&I)"
            value={formatUsd(result.monthlyPayment)}
            hint={
              result.hasEscrow
                ? `Est. monthly with taxes/insurance: ${formatUsd(result.estimatedMonthly)}`
                : undefined
            }
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat label="Loan amount" value={formatUsd(result.loanAmount)} />
            <ResultStat label="Total interest" value={formatUsd(result.totalInterest)} />
            <ResultStat label="Total paid" value={formatUsd(result.totalPaid)} />
          </div>
        </div>
      )}
    </div>
  );
}
