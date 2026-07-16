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

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("10000");
  const [variableCost, setVariableCost] = useState("15");
  const [pricePerUnit, setPricePerUnit] = useState("40");
  const [unitsSold, setUnitsSold] = useState("500");

  const result = useMemo(() => {
    const fixed = parseAmount(fixedCosts);
    const variable = parseAmount(variableCost);
    const price = parseAmount(pricePerUnit);
    const units = parseAmount(unitsSold);

    if (
      fixed === null ||
      fixed < 0 ||
      variable === null ||
      variable < 0 ||
      price === null ||
      price < 0
    ) {
      return null;
    }

    const contribution = price - variable;
    const cannotBreakEven = contribution <= 0;

    let breakEvenUnits: number | null = null;
    let breakEvenRevenue: number | null = null;

    if (!cannotBreakEven) {
      breakEvenUnits = fixed / contribution;
      breakEvenRevenue = breakEvenUnits * price;
    }

    let profitLoss: number | null = null;
    if (units !== null && units >= 0) {
      profitLoss = units * contribution - fixed;
    }

    return {
      contribution,
      cannotBreakEven,
      breakEvenUnits,
      breakEvenRevenue,
      profitLoss,
      units,
    };
  }, [fixedCosts, variableCost, pricePerUnit, unitsSold]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Cost structure">
        <div className="grid gap-4 sm:grid-cols-3">
          <FinanceField label="Fixed costs ($)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Variable cost per unit ($)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={variableCost}
              onChange={(e) => setVariableCost(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Price per unit ($)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      <ToolPanel title="Optional: units sold">
        <FinanceField label="Units sold">
          <input
            type="number"
            min="0"
            step="1"
            value={unitsSold}
            onChange={(e) => setUnitsSold(e.target.value)}
            className={financeInputClass}
          />
        </FinanceField>
      </ToolPanel>

      {result?.cannotBreakEven && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          Price per unit must be greater than variable cost per unit to reach
          break-even. Current contribution margin:{" "}
          {formatUsd(result.contribution)}.
        </div>
      )}

      {result && !result.cannotBreakEven && (
        <>
          <ResultHero
            label="Break-even units"
            value={result.breakEvenUnits!.toLocaleString(undefined, {
              maximumFractionDigits: 1,
            })}
            hint={`Revenue needed: ${formatUsd(result.breakEvenRevenue!)}`}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat
              label="Break-even revenue"
              value={formatUsd(result.breakEvenRevenue!)}
            />
            <ResultStat
              label="Contribution per unit"
              value={formatUsd(result.contribution)}
            />
            {result.profitLoss !== null && (
              <ResultStat
                label={
                  result.profitLoss >= 0 ? "Profit at units sold" : "Loss at units sold"
                }
                value={formatUsd(Math.abs(result.profitLoss))}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
