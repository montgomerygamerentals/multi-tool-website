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
  parseAmount,
} from "@/lib/finance";

const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "INR",
  "MXN",
] as const;

function formatCurrency(amount: number, code: string): string {
  const digits = code === "JPY" ? 0 : 2;
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: code,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rate, setRate] = useState("0.92");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const parsedAmount = parseAmount(amount);
  const parsedRate = parseAmount(rate);

  const converted = useMemo(() => {
    if (parsedAmount === null || parsedRate === null || parsedRate <= 0) return null;
    return parsedAmount * parsedRate;
  }, [parsedAmount, parsedRate]);

  const fetchRate = async () => {
    setFetchError(null);
    setFetching(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`,
      );
      if (!res.ok) throw new Error("Could not fetch exchange rate.");
      const data = (await res.json()) as { rates?: Record<string, number> };
      const fetched = data.rates?.[toCurrency];
      if (fetched === undefined) throw new Error("Rate not available for this pair.");
      setRate(String(fetched));
    } catch (err) {
      setFetchError(
        err instanceof Error ? err.message : "Failed to fetch rate. Use manual rate.",
      );
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Convert currency">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Amount">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label={`Exchange rate (${toCurrency} per 1 ${fromCurrency})`}>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className={financeInputClass}
              />
              <button
                type="button"
                onClick={fetchRate}
                disabled={fetching || fromCurrency === toCurrency}
                className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {fetching ? "Fetching…" : "Fetch rate"}
              </button>
            </div>
          </FinanceField>
          <FinanceField label="From">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className={financeInputClass}
            >
              {CURRENCIES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </FinanceField>
          <FinanceField label="To">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className={financeInputClass}
            >
              {CURRENCIES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </FinanceField>
        </div>

        {fetchError && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{fetchError}</p>
        )}

        <FinanceDisclaimer>
          Exchange rates may be delayed. Frankfurter uses ECB reference rates (fiat only, no
          crypto).
        </FinanceDisclaimer>
      </ToolPanel>

      {converted !== null && (
        <div className="space-y-4">
          <ResultHero
            label={`${amount} ${fromCurrency} equals`}
            value={formatCurrency(converted, toCurrency)}
            hint={`Rate: 1 ${fromCurrency} = ${parsedRate} ${toCurrency}`}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultStat label="Original amount" value={formatCurrency(parsedAmount!, fromCurrency)} />
            <ResultStat label="Converted amount" value={formatCurrency(converted, toCurrency)} />
          </div>
        </div>
      )}
    </div>
  );
}
