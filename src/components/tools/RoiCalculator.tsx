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

type ValueMode = "final" | "gain";

export default function RoiCalculator() {
  const [initial, setInitial] = useState("10000");
  const [valueMode, setValueMode] = useState<ValueMode>("final");
  const [finalOrGain, setFinalOrGain] = useState("15000");
  const [years, setYears] = useState("");

  const result = useMemo(() => {
    const initialAmount = parseAmount(initial);
    const inputValue = parseAmount(finalOrGain);
    const y = parseAmount(years);

    if (initialAmount === null || inputValue === null || initialAmount <= 0) {
      return null;
    }

    const finalValue =
      valueMode === "final" ? inputValue : initialAmount + inputValue;

    if (finalValue < 0) return null;

    const roiPct = ((finalValue - initialAmount) / initialAmount) * 100;
    const gain = finalValue - initialAmount;

    let annualizedRoiPct: number | null = null;
    if (y !== null && y > 0 && finalValue > 0) {
      annualizedRoiPct = (Math.pow(finalValue / initialAmount, 1 / y) - 1) * 100;
    }

    return { finalValue, gain, roiPct, annualizedRoiPct };
  }, [initial, valueMode, finalOrGain, years]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Investment details">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Initial investment ($)">
            <input
              type="number"
              min={0}
              step={100}
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Holding period (years, optional)">
            <input
              type="number"
              min={0}
              step={0.5}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="For annualized ROI"
              className={financeInputClass}
            />
          </FinanceField>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Enter as</p>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setValueMode("final")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                valueMode === "final"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              Final value
            </button>
            <button
              type="button"
              onClick={() => setValueMode("gain")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                valueMode === "gain"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              Gain amount
            </button>
          </div>
          <FinanceField
            label={valueMode === "final" ? "Final value ($)" : "Gain amount ($)"}
          >
            <input
              type="number"
              step={100}
              value={finalOrGain}
              onChange={(e) => setFinalOrGain(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero label="Return on investment" value={formatPct(result.roiPct)} />
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat label="Final value" value={formatUsd(result.finalValue)} />
            <ResultStat
              label="Total gain / loss"
              value={formatUsd(result.gain)}
            />
            <ResultStat
              label="Annualized ROI"
              value={
                result.annualizedRoiPct !== null
                  ? formatPct(result.annualizedRoiPct)
                  : "—"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
