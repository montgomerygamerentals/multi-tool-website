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
  formatPct,
  formatUsd,
  parseAmount,
} from "@/lib/finance";

type Mode = "discount" | "markup" | "margin";

const MODE_LABELS: Record<Mode, string> = {
  discount: "Discount",
  markup: "Markup",
  margin: "Margin",
};

export default function DiscountMarkupCalculator() {
  const [mode, setMode] = useState<Mode>("discount");
  const [valueA, setValueA] = useState("100");
  const [valueB, setValueB] = useState("20");

  const result = useMemo(() => {
    const a = parseAmount(valueA);
    const b = parseAmount(valueB);

    if (a === null || a < 0 || b === null || b < 0) return null;

    switch (mode) {
      case "discount": {
        if (b > 100) return { error: "Discount cannot exceed 100%." };
        const savings = a * (b / 100);
        const salePrice = a - savings;
        return {
          primary: salePrice,
          primaryLabel: "Sale price",
          stats: [
            { label: "Original price", value: formatUsd(a) },
            { label: "Discount", value: formatPct(b, 1) },
            { label: "You save", value: formatUsd(savings) },
          ],
        };
      }
      case "markup": {
        const sellPrice = a * (1 + b / 100);
        const profit = sellPrice - a;
        return {
          primary: sellPrice,
          primaryLabel: "Sell price",
          stats: [
            { label: "Cost", value: formatUsd(a) },
            { label: "Markup", value: formatPct(b, 1) },
            { label: "Profit per unit", value: formatUsd(profit) },
          ],
        };
      }
      case "margin": {
        if (b >= 100) return { error: "Margin must be less than 100%." };
        const sellPrice = a / (1 - b / 100);
        const profit = sellPrice - a;
        return {
          primary: sellPrice,
          primaryLabel: "Sell price",
          stats: [
            { label: "Cost", value: formatUsd(a) },
            { label: "Desired margin", value: formatPct(b, 1) },
            { label: "Profit per unit", value: formatUsd(profit) },
          ],
        };
      }
    }
  }, [mode, valueA, valueB]);

  const fieldLabels: Record<Mode, { a: string; b: string }> = {
    discount: { a: "Original price ($)", b: "Discount (% off)" },
    markup: { a: "Cost ($)", b: "Markup (%)" },
    margin: { a: "Cost ($)", b: "Desired margin (%)" },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              mode === m
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <ToolPanel title={`${MODE_LABELS[mode]} calculator`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label={fieldLabels[mode].a}>
            <input
              type="number"
              min="0"
              step="0.01"
              value={valueA}
              onChange={(e) => setValueA(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label={fieldLabels[mode].b}>
            <input
              type="number"
              min="0"
              step="0.01"
              value={valueB}
              onChange={(e) => setValueB(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>

        {mode === "margin" && (
          <p className="mt-3 text-sm text-zinc-500">
            Margin is profit as a percentage of selling price: (sell − cost) ÷
            sell.
          </p>
        )}
      </ToolPanel>

      {result && "error" in result && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {result.error}
        </div>
      )}

      {result && !("error" in result) && (
        <>
          <ResultHero
            label={result.primaryLabel}
            value={formatUsd(result.primary)}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {result.stats.map((stat) => (
              <ResultStat key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
