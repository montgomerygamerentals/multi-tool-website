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
  monthlyLoanPayment,
  parseAmount,
} from "@/lib/finance";

function presentValueOfPayments(
  payment: number,
  monthlyRate: number,
  termMonths: number,
): number {
  if (termMonths <= 0 || payment <= 0) return 0;
  if (monthlyRate === 0) return payment * termMonths;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (payment * (factor - 1)) / (monthlyRate * factor);
}

function solveApr(
  netProceeds: number,
  payment: number,
  termMonths: number,
): number | null {
  if (netProceeds <= 0 || payment <= 0 || termMonths <= 0) return null;

  const pvAtZero = payment * termMonths;
  if (netProceeds >= pvAtZero) return 0;

  let lo = 0;
  let hi = 0.001;
  while (presentValueOfPayments(payment, hi, termMonths) > netProceeds) {
    hi *= 2;
    if (hi > 0.5) return null;
  }

  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const pv = presentValueOfPayments(payment, mid, termMonths);
    if (pv > netProceeds) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return ((lo + hi) / 2) * 12 * 100;
}

export default function AprCalculator() {
  const [loanAmount, setLoanAmount] = useState("200000");
  const [fees, setFees] = useState("3000");
  const [statedRate, setStatedRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");

  const result = useMemo(() => {
    const principal = parseAmount(loanAmount);
    const upfrontFees = parseAmount(fees) ?? 0;
    const rate = parseAmount(statedRate);
    const years = parseAmount(termYears);

    if (
      principal === null ||
      principal <= 0 ||
      rate === null ||
      rate < 0 ||
      years === null ||
      years <= 0
    ) {
      return null;
    }

    const termMonths = Math.round(years * 12);
    const monthlyPayment = monthlyLoanPayment(principal, rate, termMonths);
    const totalPaid = monthlyPayment * termMonths;
    const totalInterest = totalPaid - principal;
    const netProceeds = Math.max(0, principal - upfrontFees);
    const apr = solveApr(netProceeds, monthlyPayment, termMonths);

    return {
      monthlyPayment,
      totalInterest,
      apr,
      netProceeds,
      upfrontFees,
    };
  }, [loanAmount, fees, statedRate, termYears]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Loan details">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Loan amount ($)">
            <input
              type="number"
              min="0"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Upfront fees / points ($)">
            <input
              type="number"
              min="0"
              step="100"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Stated interest rate (%)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={statedRate}
              onChange={(e) => setStatedRate(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Term (years)">
            <input
              type="number"
              min="1"
              step="1"
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
        <p className="mt-3 text-sm text-zinc-500">
          Fees reduce net proceeds. APR is the rate that equates the present
          value of payments to the amount you actually receive.
        </p>
      </ToolPanel>

      {result && (
        <>
          <ResultHero
            label="Estimated APR"
            value={
              result.apr !== null ? formatPct(result.apr, 3) : "—"
            }
            hint={`Stated rate: ${formatPct(parseAmount(statedRate) ?? 0, 2)}`}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat
              label="Monthly payment"
              value={formatUsd(result.monthlyPayment)}
            />
            <ResultStat
              label="Total interest (stated rate)"
              value={formatUsd(result.totalInterest)}
            />
            <ResultStat
              label="Net proceeds after fees"
              value={formatUsd(result.netProceeds)}
            />
          </div>
        </>
      )}

      <FinanceDisclaimer>
        APR is an approximate estimate using standard amortization and upfront
        fees. Actual APR may differ based on compounding, payment timing,
        insurance, and lender-specific charges.
      </FinanceDisclaimer>
    </div>
  );
}
