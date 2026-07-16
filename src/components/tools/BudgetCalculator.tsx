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

interface ExpenseRow {
  id: string;
  name: string;
  amount: string;
}

const DEFAULT_CATEGORIES = [
  "Housing",
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Other",
];

function createRow(name: string, amount = ""): ExpenseRow {
  return { id: crypto.randomUUID(), name, amount };
}

export default function BudgetCalculator() {
  const [income, setIncome] = useState("5000");
  const [expenses, setExpenses] = useState<ExpenseRow[]>(() =>
    DEFAULT_CATEGORIES.map((name) => createRow(name, "")),
  );

  const result = useMemo(() => {
    const monthlyIncome = parseAmount(income);
    if (monthlyIncome === null || monthlyIncome <= 0) return null;

    const breakdown = expenses
      .map((row) => ({
        id: row.id,
        name: row.name.trim() || "Unnamed",
        amount: parseAmount(row.amount) ?? 0,
      }))
      .filter((row) => row.amount > 0 || row.name !== "Unnamed");

    const totalExpenses = breakdown.reduce((sum, row) => sum + row.amount, 0);
    const remaining = monthlyIncome - totalExpenses;
    const percentSpent = (totalExpenses / monthlyIncome) * 100;

    return { monthlyIncome, totalExpenses, remaining, percentSpent, breakdown };
  }, [income, expenses]);

  const updateExpense = (id: string, field: keyof ExpenseRow, value: string) => {
    setExpenses((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const addExpense = () => {
    setExpenses((prev) => [...prev, createRow("")]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) =>
      prev.length <= 1 ? prev : prev.filter((row) => row.id !== id),
    );
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Monthly income">
        <FinanceField label="Income ($)">
          <input
            type="number"
            min={0}
            step={100}
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className={financeInputClass}
          />
        </FinanceField>
      </ToolPanel>

      <ToolPanel title="Expenses">
        <div className="space-y-3">
          {expenses.map((row) => (
            <div
              key={row.id}
              className="grid gap-2 sm:grid-cols-[2fr_1fr_auto] sm:items-end"
            >
              <FinanceField label="Category">
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => updateExpense(row.id, "name", e.target.value)}
                  placeholder="Category name"
                  className={financeInputClass}
                />
              </FinanceField>
              <FinanceField label="Amount ($)">
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={row.amount}
                  onChange={(e) => updateExpense(row.id, "amount", e.target.value)}
                  placeholder="0"
                  className={financeInputClass}
                />
              </FinanceField>
              <button
                type="button"
                onClick={() => removeExpense(row.id)}
                disabled={expenses.length <= 1}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-zinc-800 dark:hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addExpense}
          className="mt-4 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Add category
        </button>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero
            label="Remaining this month"
            value={formatUsd(result.remaining)}
            hint={`${formatPct(result.percentSpent)} of income spent`}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultStat label="Total expenses" value={formatUsd(result.totalExpenses)} />
            <ResultStat label="Monthly income" value={formatUsd(result.monthlyIncome)} />
          </div>

          {result.breakdown.length > 0 && (
            <ToolPanel title="Breakdown">
              <div className="space-y-2">
                {result.breakdown.map((row) => {
                  const share =
                    result.totalExpenses > 0
                      ? (row.amount / result.totalExpenses) * 100
                      : 0;
                  return (
                    <div
                      key={row.id}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {row.name}
                      </span>
                      <span className="text-zinc-500">
                        {formatUsd(row.amount)} ({formatPct(share, 1)})
                      </span>
                    </div>
                  );
                })}
              </div>
            </ToolPanel>
          )}
        </div>
      )}
    </div>
  );
}
