"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState(1);

  const result = useMemo(() => {
    const billAmount = parseFloat(bill);
    if (isNaN(billAmount) || billAmount <= 0 || people < 1) return null;

    const tipAmount = billAmount * (tipPercent / 100);
    const total = billAmount + tipAmount;
    const perPerson = total / people;

    return { tipAmount, total, perPerson };
  }, [bill, tipPercent, people]);

  const presets = [10, 12, 15, 18, 20, 22, 25, 30];

  return (
    <div className="space-y-6">
      <ToolPanel title="Bill details">
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Bill amount ($)</label>
          <input
            type="number"
            value={bill}
            min={0}
            step={0.01}
            onChange={(e) => setBill(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Tip: {tipPercent}%
          </label>
          <div className="mb-2 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setTipPercent(p)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  tipPercent === p
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={tipPercent}
            onChange={(e) => setTipPercent(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Split between (people)</label>
          <input
            type="number"
            value={people}
            min={1}
            max={100}
            onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
        </div>
      </ToolPanel>
      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Tip amount", value: `$${result.tipAmount.toFixed(2)}` },
            { label: "Total", value: `$${result.total.toFixed(2)}` },
            { label: "Per person", value: `$${result.perPerson.toFixed(2)}` },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
