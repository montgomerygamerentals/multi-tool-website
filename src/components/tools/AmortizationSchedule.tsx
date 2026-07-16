"use client";

import { useCallback, useMemo, useState } from "react";
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
  monthlyLoanPayment,
  buildAmortizationSchedule,
} from "@/lib/finance";

export default function AmortizationSchedule() {
  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");

  const result = useMemo(() => {
    const p = parseAmount(principal);
    const r = parseAmount(rate);
    const y = parseAmount(years);

    if (p === null || r === null || y === null || p <= 0 || y <= 0) return null;

    const termMonths = Math.round(y * 12);
    const payment = monthlyLoanPayment(p, r, termMonths);
    const schedule = buildAmortizationSchedule(p, r, termMonths);
    const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
    const totalPaid = schedule.reduce((sum, row) => sum + row.payment, 0);

    return { payment, schedule, totalInterest, totalPaid, termMonths };
  }, [principal, rate, years]);

  const downloadCsv = useCallback(() => {
    if (!result) return;

    const header = "Month,Payment,Principal,Interest,Balance";
    const rows = result.schedule.map(
      (row) =>
        `${row.month},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}`,
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amortization-schedule.csv";
    link.click();
    URL.revokeObjectURL(url);
  }, [result]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Loan details">
        <div className="grid gap-4 sm:grid-cols-3">
          <FinanceField label="Principal ($)">
            <input
              type="text"
              inputMode="decimal"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Interest rate (%)">
            <input
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Term (years)">
            <input
              type="text"
              inputMode="decimal"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero label="Monthly payment" value={formatUsd(result.payment)} />

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat label="Total interest" value={formatUsd(result.totalInterest)} />
            <ResultStat label="Total paid" value={formatUsd(result.totalPaid)} />
            <ResultStat label="Payments" value={String(result.termMonths)} />
          </div>

          <ToolPanel title="Amortization schedule">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={downloadCsv}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Download CSV
              </button>
            </div>
            <div className="max-h-96 overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-900">
                  <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-700">
                    <th className="px-3 py-2 font-medium">Month</th>
                    <th className="px-3 py-2 font-medium">Payment</th>
                    <th className="px-3 py-2 font-medium">Principal</th>
                    <th className="px-3 py-2 font-medium">Interest</th>
                    <th className="px-3 py-2 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr
                      key={row.month}
                      className="border-b border-zinc-100 dark:border-zinc-800"
                    >
                      <td className="px-3 py-2 font-medium">{row.month}</td>
                      <td className="px-3 py-2">{formatUsd(row.payment)}</td>
                      <td className="px-3 py-2">{formatUsd(row.principal)}</td>
                      <td className="px-3 py-2">{formatUsd(row.interest)}</td>
                      <td className="px-3 py-2">{formatUsd(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ToolPanel>
        </div>
      )}
    </div>
  );
}
