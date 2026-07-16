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
  formatPct,
  parseAmount,
} from "@/lib/finance";

type Mode = "price-percent" | "price-amount" | "amount-percent";
type LastEdited = "price" | "percent" | "amount";

export default function DownPaymentCalculator() {
  const [mode, setMode] = useState<Mode>("price-percent");
  const [homePrice, setHomePrice] = useState("400000");
  const [downPercent, setDownPercent] = useState("20");
  const [downAmount, setDownAmount] = useState("80000");
  const [lastEdited, setLastEdited] = useState<LastEdited>("price");

  const syncFields = (
    field: LastEdited,
    price: string,
    percent: string,
    amount: string,
  ) => {
    const p = parseAmount(price);
    const pct = parseAmount(percent);
    const amt = parseAmount(amount);

    if (mode === "price-percent") {
      if (field === "price" || field === "percent") {
        if (p !== null && pct !== null) setDownAmount(String(p * (pct / 100)));
      } else if (p !== null && p > 0 && amt !== null) {
        setDownPercent(((amt / p) * 100).toFixed(2));
      }
    } else if (mode === "price-amount") {
      if (field === "price" || field === "amount") {
        if (p !== null && p > 0 && amt !== null) {
          setDownPercent(((amt / p) * 100).toFixed(2));
        }
      } else if (p !== null && pct !== null) {
        setDownAmount(String(p * (pct / 100)));
      }
    } else {
      if (field === "amount" || field === "percent") {
        if (amt !== null && pct !== null && pct > 0) {
          setHomePrice(String(amt / (pct / 100)));
        }
      } else if (p !== null && pct !== null) {
        setDownAmount(String(p * (pct / 100)));
      }
    }
  };

  const handlePriceChange = (value: string) => {
    setHomePrice(value);
    setLastEdited("price");
    syncFields("price", value, downPercent, downAmount);
  };

  const handlePercentChange = (value: string) => {
    setDownPercent(value);
    setLastEdited("percent");
    syncFields("percent", homePrice, value, downAmount);
  };

  const handleAmountChange = (value: string) => {
    setDownAmount(value);
    setLastEdited("amount");
    syncFields("amount", homePrice, downPercent, value);
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    syncFields(lastEdited, homePrice, downPercent, downAmount);
  };

  const result = useMemo(() => {
    const price = parseAmount(homePrice);
    const pct = parseAmount(downPercent);
    const down = parseAmount(downAmount);

    if (price === null || pct === null || down === null || price <= 0 || pct < 0 || down < 0) {
      return null;
    }

    return {
      homePrice: price,
      downPercent: pct,
      downAmount: down,
      loanAmount: Math.max(0, price - down),
    };
  }, [homePrice, downPercent, downAmount]);

  const modes: { id: Mode; label: string; hint: string }[] = [
    {
      id: "price-percent",
      label: "Price + %",
      hint: "Home price and down payment % → down $ and loan",
    },
    {
      id: "price-amount",
      label: "Price + $",
      hint: "Home price and down payment $ → down %",
    },
    {
      id: "amount-percent",
      label: "$ + %",
      hint: "Target down $ and % → affordable home price",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => handleModeChange(m.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              mode === m.id
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <ToolPanel title="Down payment">
        <p className="mb-4 text-sm text-zinc-500">
          {modes.find((m) => m.id === mode)?.hint}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <FinanceField label="Home price ($)">
            <input
              type="text"
              inputMode="decimal"
              value={homePrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Down payment (%)">
            <input
              type="text"
              inputMode="decimal"
              value={downPercent}
              onChange={(e) => handlePercentChange(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Down payment ($)">
            <input
              type="text"
              inputMode="decimal"
              value={downAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero label="Loan amount" value={formatUsd(result.loanAmount, 0)} />
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat label="Home price" value={formatUsd(result.homePrice, 0)} />
            <ResultStat label="Down payment" value={formatUsd(result.downAmount, 0)} />
            <ResultStat label="Down %" value={formatPct(result.downPercent)} />
          </div>
        </div>
      )}
    </div>
  );
}
