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

type FilingStatus = "single" | "mfj";

interface TaxBracket {
  rate: number;
  min: number;
  max: number | null;
  label: string;
}

const BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.1, min: 0, max: 11925, label: "10%" },
    { rate: 0.12, min: 11925, max: 48475, label: "12%" },
    { rate: 0.22, min: 48475, max: 103350, label: "22%" },
    { rate: 0.24, min: 103350, max: 197300, label: "24%" },
    { rate: 0.32, min: 197300, max: 250525, label: "32%" },
    { rate: 0.35, min: 250525, max: 626350, label: "35%" },
    { rate: 0.37, min: 626350, max: null, label: "37%" },
  ],
  mfj: [
    { rate: 0.1, min: 0, max: 23850, label: "10%" },
    { rate: 0.12, min: 23850, max: 96950, label: "12%" },
    { rate: 0.22, min: 96950, max: 206700, label: "22%" },
    { rate: 0.24, min: 206700, max: 394600, label: "24%" },
    { rate: 0.32, min: 394600, max: 501050, label: "32%" },
    { rate: 0.35, min: 501050, max: 751600, label: "35%" },
    { rate: 0.37, min: 751600, max: null, label: "37%" },
  ],
};

function calculateFederalTax(income: number, status: FilingStatus) {
  const brackets = BRACKETS[status];
  let tax = 0;
  let marginalBracket = brackets[0].label;

  for (const bracket of brackets) {
    if (income <= bracket.min) break;

    const upper = bracket.max ?? Infinity;
    const taxableInBracket = Math.min(income, upper) - bracket.min;

    if (taxableInBracket > 0) {
      tax += taxableInBracket * bracket.rate;
      marginalBracket = bracket.label;
    }
  }

  const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

  return { tax, effectiveRate, marginalBracket };
}

export default function IncomeTaxEstimator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [taxableIncome, setTaxableIncome] = useState("75000");

  const result = useMemo(() => {
    const income = parseAmount(taxableIncome);
    if (income === null || income < 0) return null;

    return calculateFederalTax(income, filingStatus);
  }, [taxableIncome, filingStatus]);

  return (
    <div className="space-y-6">
      <FinanceDisclaimer>
        Estimate only — not tax advice. Uses simplified 2025 U.S. federal income
        tax brackets on taxable income you enter. Excludes state and local taxes,
        FICA/payroll taxes, deductions beyond what you reflect in taxable income,
        credits, AMT, and other adjustments. Consult a qualified tax professional
        for your situation.
      </FinanceDisclaimer>

      <ToolPanel title="Tax details">
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium">Filing status</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilingStatus("single")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                filingStatus === "single"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => setFilingStatus("mfj")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                filingStatus === "mfj"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              Married filing jointly
            </button>
          </div>
        </div>

        <FinanceField label="Annual taxable income ($)">
          <input
            type="number"
            min={0}
            step={1000}
            value={taxableIncome}
            onChange={(e) => setTaxableIncome(e.target.value)}
            className={financeInputClass}
          />
        </FinanceField>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero
            label="Estimated federal income tax"
            value={formatUsd(result.tax, 0)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultStat
              label="Effective tax rate"
              value={formatPct(result.effectiveRate)}
            />
            <ResultStat
              label="Marginal tax bracket"
              value={result.marginalBracket}
            />
          </div>
        </div>
      )}
    </div>
  );
}
