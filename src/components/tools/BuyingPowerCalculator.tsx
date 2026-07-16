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
  formatPct,
  parseAmount,
} from "@/lib/finance";
import {
  CPI_MAX_YEAR,
  CPI_MIN_YEAR,
  CPI_SOURCE_NOTE,
  CPI_YEARS,
  convertBuyingPower,
  getCpi,
} from "@/lib/us-cpi";

export default function BuyingPowerCalculator() {
  const [amount, setAmount] = useState("100");
  const [fromYear, setFromYear] = useState("1990");
  const [toYear, setToYear] = useState(String(CPI_MAX_YEAR));

  const result = useMemo(() => {
    const amt = parseAmount(amount);
    const from = parseInt(fromYear, 10);
    const to = parseInt(toYear, 10);
    if (amt === null || amt < 0) return null;
    if (!Number.isFinite(from) || !Number.isFinite(to)) return null;

    const equivalent = convertBuyingPower(amt, from, to);
    const fromCpi = getCpi(from);
    const toCpi = getCpi(to);
    if (equivalent === null || fromCpi == null || toCpi == null) return null;

    const changePct = ((equivalent / amt) - 1) * 100;
    const years = to - from;
    const annualized =
      years !== 0 ? (Math.pow(equivalent / amt, 1 / Math.abs(years)) - 1) * 100 : 0;

    return {
      amount: amt,
      from,
      to,
      equivalent,
      changePct,
      years,
      annualized,
      fromCpi,
      toCpi,
    };
  }, [amount, fromYear, toYear]);

  const yearOptions = CPI_YEARS;

  return (
    <div className="space-y-6">
      <ToolPanel title="Dollar buying power">
        <p className="mb-4 text-sm text-zinc-500">
          Find out how much money from one year is worth in another using historical U.S.
          inflation (CPI) data — e.g. what $100 in 1990 buys in {CPI_MAX_YEAR}.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <FinanceField label="Amount ($)">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="In this year">
            <select
              value={fromYear}
              onChange={(e) => setFromYear(e.target.value)}
              className={financeInputClass}
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </FinanceField>
          <FinanceField label="Is worth this much in">
            <select
              value={toYear}
              onChange={(e) => setToYear(e.target.value)}
              className={financeInputClass}
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </FinanceField>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setFromYear(String(CPI_MAX_YEAR));
              setToYear("1990");
            }}
            className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            Today → 1990
          </button>
          <button
            type="button"
            onClick={() => {
              setFromYear("1980");
              setToYear(String(CPI_MAX_YEAR));
            }}
            className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            1980 → today
          </button>
          <button
            type="button"
            onClick={() => {
              setFromYear("2000");
              setToYear(String(CPI_MAX_YEAR));
            }}
            className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            2000 → today
          </button>
        </div>
        <FinanceDisclaimer>
          {CPI_SOURCE_NOTE} Coverage: {CPI_MIN_YEAR}–{CPI_MAX_YEAR}. Not financial advice.
        </FinanceDisclaimer>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero
            label={`${formatUsd(result.amount)} in ${result.from} ≈`}
            value={formatUsd(result.equivalent)}
            hint={`in ${result.to} dollars`}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat
              label="Price level change"
              value={formatPct(result.changePct)}
            />
            <ResultStat
              label="Years apart"
              value={String(Math.abs(result.years))}
            />
            <ResultStat
              label="Avg. annual change"
              value={result.years === 0 ? "—" : formatPct(result.annualized)}
            />
          </div>
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            {formatUsd(result.amount)} in {result.from} had about the same buying power as{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {formatUsd(result.equivalent)}
            </span>{" "}
            in {result.to}.
          </p>
        </div>
      )}
    </div>
  );
}
