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

type TaxMode = "add" | "remove";

export default function SalesTaxCalculator() {
  const [mode, setMode] = useState<TaxMode>("add");
  const [amount, setAmount] = useState("100");
  const [taxRate, setTaxRate] = useState("8.25");

  const result = useMemo(() => {
    const value = parseAmount(amount);
    const rate = parseAmount(taxRate);

    if (value === null || rate === null || value < 0 || rate < 0) return null;

    const rateDecimal = rate / 100;

    if (mode === "add") {
      const taxAmount = value * rateDecimal;
      const totalWithTax = value + taxAmount;
      return { taxAmount, subtotal: value, total: totalWithTax };
    }

    const subtotal = value / (1 + rateDecimal);
    const taxAmount = value - subtotal;
    return { taxAmount, subtotal, total: value };
  }, [mode, amount, taxRate]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Sales tax">
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium">Calculation mode</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode("add")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                mode === "add"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              Add tax to price
            </button>
            <button
              type="button"
              onClick={() => setMode("remove")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                mode === "remove"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              Remove tax from total
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField
            label={mode === "add" ? "Price before tax ($)" : "Total with tax ($)"}
          >
            <input
              type="number"
              min={0}
              step={0.01}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Tax rate (%)">
            <input
              type="number"
              min={0}
              step={0.01}
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero label="Tax amount" value={formatUsd(result.taxAmount)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultStat label="Subtotal (before tax)" value={formatUsd(result.subtotal)} />
            <ResultStat
              label={mode === "add" ? "Total with tax" : "Total paid (incl. tax)"}
              value={formatUsd(result.total)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
