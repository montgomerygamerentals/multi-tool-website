"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

interface DebtInput {
  id: string;
  name: string;
  balance: string;
  payment: string;
  rate: string;
}

interface DebtResult {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
  payoffMonth: number;
  interestPaid: number;
  order: number;
}

interface PayoffSummary {
  debts: DebtResult[];
  months: number;
  totalInterest: number;
  totalPaid: number;
  totalBalance: number;
  error: string | null;
}

const MAX_MONTHS = 1200;
const MAX_DEBTS = 20;

const inputClassName =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

function createDebt(partial?: Partial<DebtInput>): DebtInput {
  return {
    id: crypto.randomUUID(),
    name: "",
    balance: "",
    payment: "",
    rate: "",
    ...partial,
  };
}

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function formatDuration(months: number) {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem} month${rem === 1 ? "" : "s"}`;
  if (rem === 0) return `${years} year${years === 1 ? "" : "s"}`;
  return `${years} year${years === 1 ? "" : "s"}, ${rem} month${rem === 1 ? "" : "s"}`;
}

function calculatePayoff(
  debts: DebtInput[],
  extraMonthly: number,
  extraYearly: number,
  oneTimeAmount: number,
  oneTimeMonth: number,
  fixedTotal: boolean,
): PayoffSummary {
  type WorkingDebt = {
    id: string;
    name: string;
    originalBalance: number;
    balance: number;
    payment: number;
    rate: number;
    interestPaid: number;
    payoffMonth: number;
  };

  const working: WorkingDebt[] = [];

  debts.forEach((debt, index) => {
    const balance = parseFloat(debt.balance);
    const payment = parseFloat(debt.payment);
    const rate = parseFloat(debt.rate);
    if (
      !Number.isFinite(balance) ||
      !Number.isFinite(payment) ||
      !Number.isFinite(rate) ||
      balance <= 0
    ) {
      return;
    }
    working.push({
      id: debt.id,
      name: debt.name.trim() || `Debt ${index + 1}`,
      originalBalance: balance,
      balance,
      payment: Math.max(0, payment),
      rate: Math.max(0, rate),
      interestPaid: 0,
      payoffMonth: 0,
    });
  });

  if (working.length === 0) {
    return {
      debts: [],
      months: 0,
      totalInterest: 0,
      totalPaid: 0,
      totalBalance: 0,
      error: null,
    };
  }

  const initialMinTotal = working.reduce((sum, debt) => sum + debt.payment, 0);
  const totalBalance = working.reduce(
    (sum, debt) => sum + debt.originalBalance,
    0,
  );
  const startingBudget = initialMinTotal + Math.max(0, extraMonthly);
  const startingInterest = working.reduce(
    (sum, debt) => sum + (debt.balance * debt.rate) / 100 / 12,
    0,
  );

  if (startingBudget + Math.max(0, extraYearly) / 12 <= startingInterest) {
    return {
      debts: [],
      months: 0,
      totalInterest: 0,
      totalPaid: 0,
      totalBalance,
      error:
        "Monthly payments are too low to cover interest. Increase payments or add extra payments.",
    };
  }

  const results: DebtResult[] = [];
  let month = 0;
  let totalPaid = 0;
  let order = 1;

  while (working.some((debt) => debt.balance > 0.005) && month < MAX_MONTHS) {
    month += 1;

    for (const debt of working) {
      if (debt.balance <= 0.005 || debt.payoffMonth > 0) continue;
      const interest = (debt.balance * debt.rate) / 100 / 12;
      debt.balance += interest;
      debt.interestPaid += interest;
    }

    const active = working.filter(
      (debt) => debt.balance > 0.005 && debt.payoffMonth === 0,
    );
    if (active.length === 0) break;

    let budget =
      (fixedTotal
        ? initialMinTotal
        : active.reduce((sum, debt) => sum + debt.payment, 0)) +
      Math.max(0, extraMonthly);

    if (extraYearly > 0 && month % 12 === 0) budget += extraYearly;
    if (oneTimeAmount > 0 && oneTimeMonth > 0 && month === oneTimeMonth) {
      budget += oneTimeAmount;
    }

    // Pay minimums first
    for (const debt of active) {
      const minPay = Math.min(debt.payment, debt.balance);
      debt.balance -= minPay;
      budget -= minPay;
      totalPaid += minPay;
    }

    // Avalanche surplus onto highest interest rates
    const stillOwed = active
      .filter((debt) => debt.balance > 0.005)
      .sort((a, b) => b.rate - a.rate || b.balance - a.balance);

    for (const debt of stillOwed) {
      if (budget <= 0.005) break;
      const pay = Math.min(budget, debt.balance);
      debt.balance -= pay;
      budget -= pay;
      totalPaid += pay;
    }

    for (const debt of working) {
      if (debt.payoffMonth === 0 && debt.balance <= 0.005) {
        debt.balance = 0;
        debt.payoffMonth = month;
        results.push({
          id: debt.id,
          name: debt.name,
          balance: debt.originalBalance,
          rate: debt.rate,
          minPayment: debt.payment,
          payoffMonth: month,
          interestPaid: debt.interestPaid,
          order: order++,
        });
      }
    }
  }

  if (month >= MAX_MONTHS && working.some((debt) => debt.payoffMonth === 0)) {
    return {
      debts: [],
      months: 0,
      totalInterest: 0,
      totalPaid: 0,
      totalBalance,
      error:
        "Could not pay off these debts within 100 years. Increase payments or lower balances.",
    };
  }

  const totalInterest = results.reduce((sum, debt) => sum + debt.interestPaid, 0);

  return {
    debts: results,
    months: month,
    totalInterest,
    totalPaid,
    totalBalance,
    error: null,
  };
}

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<DebtInput[]>([
    createDebt({
      name: "Credit Card",
      balance: "5000",
      payment: "150",
      rate: "19.9",
    }),
    createDebt({
      name: "Car Loan",
      balance: "12000",
      payment: "320",
      rate: "6.5",
    }),
    createDebt({
      name: "Personal Loan",
      balance: "3000",
      payment: "100",
      rate: "11",
    }),
  ]);
  const [extraMonthly, setExtraMonthly] = useState("100");
  const [extraYearly, setExtraYearly] = useState("");
  const [oneTimeAmount, setOneTimeAmount] = useState("");
  const [oneTimeMonth, setOneTimeMonth] = useState("1");
  const [fixedTotal, setFixedTotal] = useState(true);

  const summary = useMemo(() => {
    return calculatePayoff(
      debts,
      parseFloat(extraMonthly) || 0,
      parseFloat(extraYearly) || 0,
      parseFloat(oneTimeAmount) || 0,
      Math.max(1, Math.floor(parseFloat(oneTimeMonth) || 1)),
      fixedTotal,
    );
  }, [
    debts,
    extraMonthly,
    extraYearly,
    oneTimeAmount,
    oneTimeMonth,
    fixedTotal,
  ]);

  const updateDebt = (id: string, field: keyof DebtInput, value: string) => {
    setDebts((prev) =>
      prev.map((debt) => (debt.id === id ? { ...debt, [field]: value } : debt)),
    );
  };

  const addDebt = () => {
    if (debts.length >= MAX_DEBTS) return;
    setDebts((prev) => [...prev, createDebt()]);
  };

  const removeDebt = (id: string) => {
    setDebts((prev) =>
      prev.length <= 1 ? prev : prev.filter((debt) => debt.id !== id),
    );
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Your debts">
        <p className="mb-4 text-sm text-zinc-500">
          Uses the debt avalanche method (highest interest rate first) for the
          most cost-efficient payoff order.
        </p>

        <div className="space-y-3">
          <div className="hidden grid-cols-[2fr_1.2fr_1.2fr_1fr_auto] gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500 sm:grid">
            <span>Debt name</span>
            <span>Balance</span>
            <span>Min. payment</span>
            <span>Interest %</span>
            <span className="w-16" />
          </div>

          {debts.map((debt, index) => (
            <div
              key={debt.id}
              className="grid gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 sm:grid-cols-[2fr_1.2fr_1.2fr_1fr_auto] sm:items-end sm:border-0 sm:bg-transparent sm:p-0 dark:border-zinc-700 dark:bg-zinc-900/50 sm:dark:bg-transparent"
            >
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 sm:hidden">
                  Debt name
                </label>
                <input
                  type="text"
                  value={debt.name}
                  onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                  placeholder={`Debt ${index + 1}`}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 sm:hidden">
                  Remaining balance
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={debt.balance}
                  onChange={(e) =>
                    updateDebt(debt.id, "balance", e.target.value)
                  }
                  placeholder="0.00"
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 sm:hidden">
                  Monthly / min. payment
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={debt.payment}
                  onChange={(e) =>
                    updateDebt(debt.id, "payment", e.target.value)
                  }
                  placeholder="0.00"
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 sm:hidden">
                  Interest rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={debt.rate}
                  onChange={(e) => updateDebt(debt.id, "rate", e.target.value)}
                  placeholder="0"
                  className={inputClassName}
                />
              </div>
              <button
                type="button"
                onClick={() => removeDebt(debt.id)}
                disabled={debts.length <= 1}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-zinc-800 dark:hover:text-red-400"
                aria-label={`Remove ${debt.name || `debt ${index + 1}`}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {debts.length < MAX_DEBTS && (
          <button
            type="button"
            onClick={addDebt}
            className="mt-4 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Add another debt
          </button>
        )}
      </ToolPanel>

      <ToolPanel title="Extra payments">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="extra-monthly"
              className="mb-1 block text-sm font-medium"
            >
              Extra per month ($)
            </label>
            <input
              id="extra-monthly"
              type="number"
              min="0"
              step="0.01"
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(e.target.value)}
              className={inputClassName}
            />
          </div>
          <div>
            <label
              htmlFor="extra-yearly"
              className="mb-1 block text-sm font-medium"
            >
              Extra per year ($)
            </label>
            <input
              id="extra-yearly"
              type="number"
              min="0"
              step="0.01"
              value={extraYearly}
              onChange={(e) => setExtraYearly(e.target.value)}
              placeholder="0"
              className={inputClassName}
            />
          </div>
          <div className="grid grid-cols-[1fr_auto_auto] items-end gap-2">
            <div>
              <label
                htmlFor="one-time-amount"
                className="mb-1 block text-sm font-medium"
              >
                One-time payment ($)
              </label>
              <input
                id="one-time-amount"
                type="number"
                min="0"
                step="0.01"
                value={oneTimeAmount}
                onChange={(e) => setOneTimeAmount(e.target.value)}
                placeholder="0"
                className={inputClassName}
              />
            </div>
            <span className="pb-2 text-sm text-zinc-500">in month</span>
            <div>
              <label htmlFor="one-time-month" className="sr-only">
                Month number
              </label>
              <input
                id="one-time-month"
                type="number"
                min="1"
                value={oneTimeMonth}
                onChange={(e) => setOneTimeMonth(e.target.value)}
                className={`${inputClassName} w-20`}
              />
            </div>
          </div>
        </div>
      </ToolPanel>

      <ToolPanel title="Payment strategy">
        <p className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Keep total monthly payment fixed after a debt is paid off?
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFixedTotal(true)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              fixedTotal
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            Yes — roll payments forward
          </button>
          <button
            type="button"
            onClick={() => setFixedTotal(false)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              !fixedTotal
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            No — drop paid-off payments
          </button>
        </div>
        <p className="mt-3 text-sm text-zinc-500">
          {fixedTotal
            ? "When a debt is paid off, that payment amount is applied to the remaining highest-interest debts. Your total monthly outlay stays the same."
            : "When a debt is paid off, you stop making that payment. Your total monthly outlay decreases over time."}
        </p>
      </ToolPanel>

      {summary.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {summary.error}
        </div>
      )}

      {!summary.error && summary.debts.length > 0 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-800 dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Debt-free in</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {formatDuration(summary.months)}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {summary.months} month{summary.months === 1 ? "" : "s"}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl font-bold">
                {formatMoney(summary.totalBalance)}
              </p>
              <p className="text-sm text-zinc-500">Starting balance</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl font-bold">
                {formatMoney(summary.totalInterest)}
              </p>
              <p className="text-sm text-zinc-500">Total interest</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl font-bold">
                {formatMoney(summary.totalPaid)}
              </p>
              <p className="text-sm text-zinc-500">Total paid</p>
            </div>
          </div>

          <ToolPanel title="Payoff order (avalanche)">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-700">
                    <th className="px-2 py-2 font-medium">#</th>
                    <th className="px-2 py-2 font-medium">Debt</th>
                    <th className="px-2 py-2 font-medium">Balance</th>
                    <th className="px-2 py-2 font-medium">Rate</th>
                    <th className="px-2 py-2 font-medium">Paid off</th>
                    <th className="px-2 py-2 font-medium">Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.debts.map((debt) => (
                    <tr
                      key={debt.id}
                      className="border-b border-zinc-100 dark:border-zinc-800"
                    >
                      <td className="px-2 py-3 font-medium text-indigo-600 dark:text-indigo-400">
                        {debt.order}
                      </td>
                      <td className="px-2 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                        {debt.name}
                      </td>
                      <td className="px-2 py-3">{formatMoney(debt.balance)}</td>
                      <td className="px-2 py-3">{debt.rate.toFixed(2)}%</td>
                      <td className="px-2 py-3">
                        {formatDuration(debt.payoffMonth)}
                      </td>
                      <td className="px-2 py-3">
                        {formatMoney(debt.interestPaid)}
                      </td>
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
