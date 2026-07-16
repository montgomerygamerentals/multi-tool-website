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

const MAX_MONTHS = 600;

interface PayoffResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  error: string | null;
}

function simulatePayoff(
  balance: number,
  apr: number,
  monthlyPayment: number,
): PayoffResult {
  const monthlyRate = apr / 100 / 12;
  const firstMonthInterest = balance * monthlyRate;

  if (monthlyPayment <= firstMonthInterest) {
    return {
      months: 0,
      totalInterest: 0,
      totalPaid: 0,
      error:
        "Monthly payment does not cover the first month's interest. Increase your payment to pay off this balance.",
    };
  }

  let remaining = balance;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;

  while (remaining > 0.005 && month < MAX_MONTHS) {
    month += 1;
    const interest = remaining * monthlyRate;
    const principal = Math.min(monthlyPayment - interest, remaining);
    const payment = principal + interest;

    remaining -= principal;
    totalInterest += interest;
    totalPaid += payment;
  }

  if (month >= MAX_MONTHS && remaining > 0.005) {
    return {
      months: 0,
      totalInterest: 0,
      totalPaid: 0,
      error: "Balance could not be paid off within 50 years. Increase your monthly payment.",
    };
  }

  return { months: month, totalInterest, totalPaid, error: null };
}

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("19.99");
  const [monthlyPayment, setMonthlyPayment] = useState("200");

  const result = useMemo(() => {
    const b = parseAmount(balance);
    const rate = parseAmount(apr);
    const payment = parseAmount(monthlyPayment);

    if (b === null || rate === null || payment === null || b <= 0 || payment <= 0) {
      return null;
    }

    return simulatePayoff(b, Math.max(0, rate), payment);
  }, [balance, apr, monthlyPayment]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Credit card balance">
        <div className="grid gap-4 sm:grid-cols-3">
          <FinanceField label="Balance ($)">
            <input
              type="text"
              inputMode="decimal"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="APR (%)">
            <input
              type="text"
              inputMode="decimal"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Monthly payment ($)">
            <input
              type="text"
              inputMode="decimal"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result?.error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          {result.error}
        </div>
      )}

      {result && !result.error && (
        <div className="space-y-4">
          <ResultHero
            label="Paid off in"
            value={`${result.months} month${result.months === 1 ? "" : "s"}`}
            hint={
              result.months >= 12
                ? `${Math.floor(result.months / 12)} yr ${result.months % 12} mo`
                : undefined
            }
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat label="Months to pay off" value={String(result.months)} />
            <ResultStat label="Total interest" value={formatUsd(result.totalInterest)} />
            <ResultStat label="Total paid" value={formatUsd(result.totalPaid)} />
          </div>
          <FinanceDisclaimer>
            Simulates month-by-month payments with interest applied before principal. Minimum
            payment must exceed monthly interest to reduce the balance.
          </FinanceDisclaimer>
        </div>
      )}
    </div>
  );
}
