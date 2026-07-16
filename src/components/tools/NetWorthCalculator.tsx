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

interface LineItem {
  id: string;
  name: string;
  amount: string;
}

function createItem(name: string, amount = ""): LineItem {
  return { id: crypto.randomUUID(), name, amount };
}

function sumItems(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + (parseAmount(item.amount) ?? 0), 0);
}

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<LineItem[]>([
    createItem("Cash"),
    createItem("Investments"),
    createItem("Home"),
    createItem("Other"),
  ]);
  const [liabilities, setLiabilities] = useState<LineItem[]>([
    createItem("Mortgage"),
    createItem("Student Loans"),
    createItem("Credit Cards"),
    createItem("Other"),
  ]);

  const result = useMemo(() => {
    const totalAssets = sumItems(assets);
    const totalLiabilities = sumItems(liabilities);
    return {
      totalAssets,
      totalLiabilities,
      netWorth: totalAssets - totalLiabilities,
    };
  }, [assets, liabilities]);

  const updateItem = (
    setList: (value: LineItem[] | ((prev: LineItem[]) => LineItem[])) => void,
    id: string,
    field: "name" | "amount",
    value: string,
  ) => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const addItem = (
    setList: (value: LineItem[] | ((prev: LineItem[]) => LineItem[])) => void,
  ) => {
    setList((prev) => [...prev, createItem("")]);
  };

  const removeItem = (
    list: LineItem[],
    setList: (value: LineItem[] | ((prev: LineItem[]) => LineItem[])) => void,
    id: string,
  ) => {
    if (list.length <= 1) return;
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const renderList = (
    title: string,
    items: LineItem[],
    setList: (value: LineItem[] | ((prev: LineItem[]) => LineItem[])) => void,
    total: number,
  ) => (
    <ToolPanel title={title}>
      <div className="space-y-3">
        <div className="hidden grid-cols-[2fr_1.2fr_auto] gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500 sm:grid">
          <span>Name</span>
          <span>Amount</span>
          <span className="w-16" />
        </div>

        {items.map((item, index) => (
          <div
            key={item.id}
            className="grid gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 sm:grid-cols-[2fr_1.2fr_auto] sm:items-end sm:border-0 sm:bg-transparent sm:p-0 dark:border-zinc-700 dark:bg-zinc-900/50 sm:dark:bg-transparent"
          >
            <FinanceField label={index === 0 ? "Name" : ""} className="sm:[&_label]:hidden">
              <input
                type="text"
                value={item.name}
                onChange={(e) =>
                  updateItem(setList, item.id, "name", e.target.value)
                }
                placeholder={`Item ${index + 1}`}
                className={financeInputClass}
              />
            </FinanceField>
            <FinanceField label={index === 0 ? "Amount ($)" : ""} className="sm:[&_label]:hidden">
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.amount}
                onChange={(e) =>
                  updateItem(setList, item.id, "amount", e.target.value)
                }
                placeholder="0.00"
                className={financeInputClass}
              />
            </FinanceField>
            <button
              type="button"
              onClick={() => removeItem(items, setList, item.id)}
              disabled={items.length <= 1}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-zinc-800 dark:hover:text-red-400"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-700">
        <button
          type="button"
          onClick={() => addItem(setList)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Add item
        </button>
        <p className="text-sm font-medium">
          Subtotal: <span className="text-lg">{formatUsd(total)}</span>
        </p>
      </div>
    </ToolPanel>
  );

  return (
    <div className="space-y-6">
      {renderList("Assets", assets, setAssets, result.totalAssets)}
      {renderList(
        "Liabilities",
        liabilities,
        setLiabilities,
        result.totalLiabilities,
      )}

      <ResultHero
        label="Net worth"
        value={formatUsd(result.netWorth)}
        hint="Total assets minus total liabilities"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultStat label="Total assets" value={formatUsd(result.totalAssets)} />
        <ResultStat
          label="Total liabilities"
          value={formatUsd(result.totalLiabilities)}
        />
      </div>

      <FinanceDisclaimer>
        Net worth is a snapshot estimate. Values may change with market
        conditions and should not be treated as financial advice.
      </FinanceDisclaimer>
    </div>
  );
}
