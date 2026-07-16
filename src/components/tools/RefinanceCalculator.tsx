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
  monthlyLoanPayment,
  buildAmortizationSchedule,
} from "@/lib/finance";

export default function RefinanceCalculator() {
  const [balance, setBalance] = useState("250000");
  const [currentRate, setCurrentRate] = useState("7");
  const [remainingMonths, setRemainingMonths] = useState("300");
  const [currentPayment, setCurrentPayment] = useState("");
  const [paymentManual, setPaymentManual] = useState(false);
  const [newRate, setNewRate] = useState("5.5");
  const [newTermYears, setNewTermYears] = useState("30");
  const [closingCosts, setClosingCosts] = useState("4000");

  const autoPayment = useMemo(() => {
    const b = parseAmount(balance);
    const r = parseAmount(currentRate);
    const m = parseInt(remainingMonths, 10);
    if (b === null || r === null || !Number.isFinite(m) || b <= 0 || m <= 0) return null;
    return monthlyLoanPayment(b, r, m);
  }, [balance, currentRate, remainingMonths]);

  const effectiveCurrentPayment = paymentManual
    ? parseAmount(currentPayment)
    : autoPayment;

  const result = useMemo(() => {
    const b = parseAmount(balance);
    const curRate = parseAmount(currentRate);
    const remMonths = parseInt(remainingMonths, 10);
    const nRate = parseAmount(newRate);
    const termYears = parseAmount(newTermYears);
    const costs = parseAmount(closingCosts) ?? 0;
    const curPay = effectiveCurrentPayment;

    if (
      b === null ||
      curRate === null ||
      nRate === null ||
      termYears === null ||
      !Number.isFinite(remMonths) ||
      curPay === null ||
      b <= 0 ||
      remMonths <= 0 ||
      termYears <= 0 ||
      curPay <= 0
    ) {
      return null;
    }

    const newTermMonths = Math.round(termYears * 12);
    const newPayment = monthlyLoanPayment(b, nRate, newTermMonths);
    const monthlySavings = curPay - newPayment;

    const currentSchedule = buildAmortizationSchedule(b, curRate, remMonths);
    const currentInterestRemaining = currentSchedule.reduce((sum, row) => sum + row.interest, 0);

    const newSchedule = buildAmortizationSchedule(b, nRate, newTermMonths);
    const newTotalInterest = newSchedule.reduce((sum, row) => sum + row.interest, 0);

    const netSavings = currentInterestRemaining - newTotalInterest - costs;
    const breakEvenMonths =
      monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : null;

    return {
      currentPayment: curPay,
      newPayment,
      monthlySavings,
      currentInterestRemaining,
      newTotalInterest,
      closingCosts: costs,
      netSavings,
      breakEvenMonths,
      savesMoney: netSavings > 0,
    };
  }, [
    balance,
    currentRate,
    remainingMonths,
    effectiveCurrentPayment,
    newRate,
    newTermYears,
    closingCosts,
  ]);

  const handlePaymentChange = (value: string) => {
    setCurrentPayment(value);
    setPaymentManual(true);
  };

  const resetToAuto = () => {
    setPaymentManual(false);
    if (autoPayment !== null) {
      setCurrentPayment(autoPayment.toFixed(2));
    }
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Current loan">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Remaining balance ($)">
            <input
              type="text"
              inputMode="decimal"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Interest rate (%)">
            <input
              type="text"
              inputMode="decimal"
              value={currentRate}
              onChange={(e) => setCurrentRate(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Remaining months">
            <input
              type="number"
              min={1}
              value={remainingMonths}
              onChange={(e) => setRemainingMonths(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Current monthly payment ($)">
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={paymentManual ? currentPayment : (autoPayment?.toFixed(2) ?? "")}
                onChange={(e) => handlePaymentChange(e.target.value)}
                placeholder="Auto-calculated"
                className={financeInputClass}
              />
              {paymentManual && (
                <button
                  type="button"
                  onClick={resetToAuto}
                  className="shrink-0 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Auto
                </button>
              )}
            </div>
          </FinanceField>
        </div>
      </ToolPanel>

      <ToolPanel title="New loan">
        <div className="grid gap-4 sm:grid-cols-3">
          <FinanceField label="New interest rate (%)">
            <input
              type="text"
              inputMode="decimal"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="New term (years)">
            <input
              type="text"
              inputMode="decimal"
              value={newTermYears}
              onChange={(e) => setNewTermYears(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Closing costs ($)">
            <input
              type="text"
              inputMode="decimal"
              value={closingCosts}
              onChange={(e) => setClosingCosts(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero
            label={result.savesMoney ? "Refinance saves money" : "Refinance may not save"}
            value={formatUsd(Math.abs(result.netSavings))}
            hint={
              result.savesMoney
                ? `Net savings after closing costs`
                : `Net cost after closing costs`
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultStat label="Current payment" value={formatUsd(result.currentPayment)} />
            <ResultStat label="New payment" value={formatUsd(result.newPayment)} />
            <ResultStat
              label="Monthly savings"
              value={formatUsd(result.monthlySavings)}
            />
            <ResultStat
              label="Break-even"
              value={
                result.breakEvenMonths !== null
                  ? `${result.breakEvenMonths} mo`
                  : "—"
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat
              label="Interest remaining (current)"
              value={formatUsd(result.currentInterestRemaining)}
            />
            <ResultStat
              label="Total interest (new loan)"
              value={formatUsd(result.newTotalInterest)}
            />
            <ResultStat label="Closing costs" value={formatUsd(result.closingCosts)} />
          </div>

          <FinanceDisclaimer>
            Compares remaining interest on your current loan vs total interest on a new loan,
            minus closing costs. Break-even = closing costs ÷ monthly payment savings.
          </FinanceDisclaimer>
        </div>
      )}
    </div>
  );
}
