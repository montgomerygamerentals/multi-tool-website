"use client";

import { useMemo, useState } from "react";
import StepsList from "@/components/tools/shared/StepsList";
import ToolPanel from "@/components/ui/ToolPanel";

const SS_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
/** Approximate 2026 Social Security wage base (update yearly). */
const SS_WAGE_BASE = 176100;

function federalWithholdingAnnual(taxable: number): number {
  // Simplified 2025/2026 single brackets-style estimate on annual taxable pay
  const brackets = [
    { upTo: 11925, rate: 0.1 },
    { upTo: 48475, rate: 0.12 },
    { upTo: 103350, rate: 0.22 },
    { upTo: 197300, rate: 0.24 },
    { upTo: 250525, rate: 0.32 },
    { upTo: 626350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ];
  let remaining = Math.max(0, taxable);
  let prev = 0;
  let tax = 0;
  for (const b of brackets) {
    const slice = Math.min(remaining, b.upTo - prev);
    if (slice <= 0) break;
    tax += slice * b.rate;
    remaining -= slice;
    prev = b.upTo;
  }
  return tax;
}

export default function PaycheckCalculator() {
  const [gross, setGross] = useState("3000");
  const [frequency, setFrequency] = useState<"weekly" | "biweekly" | "semimonthly" | "monthly">("biweekly");
  const [stateRate, setStateRate] = useState("5");
  const [preTax, setPreTax] = useState("200");

  const periods: Record<typeof frequency, number> = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
  };

  const result = useMemo(() => {
    const g = Number(gross);
    const pretax = Number(preTax) || 0;
    const statePct = (Number(stateRate) || 0) / 100;
    if (!(g > 0)) return null;
    const n = periods[frequency];
    const annualGross = g * n;
    const annualPretax = pretax * n;
    const annualTaxable = Math.max(0, annualGross - annualPretax);
    const fedAnnual = federalWithholdingAnnual(annualTaxable);
    const fed = fedAnnual / n;
    const ssWages = Math.min(g, SS_WAGE_BASE / n);
    const ss = ssWages * SS_RATE;
    const medicare = g * MEDICARE_RATE;
    const state = Math.max(0, g - pretax) * statePct;
    const net = g - pretax - fed - ss - medicare - state;
    return {
      net,
      fed,
      ss,
      medicare,
      state,
      steps: [
        `Annualize gross: ${g} × ${n} = $${annualGross.toFixed(0)}.`,
        `Rough federal withholding from simplified brackets on taxable annual pay, then ÷ ${n}.`,
        `FICA: Social Security ${SS_RATE * 100}% (wage base ~$${SS_WAGE_BASE.toLocaleString()}) + Medicare ${MEDICARE_RATE * 100}%.`,
        `State tax modeled as flat ${stateRate}% of post-pretax wages — update rates yearly; not legal advice.`,
        `Net ≈ gross − pretax − federal − FICA − state.`,
      ],
    };
  }, [gross, frequency, stateRate, preTax]);

  function clearInputs() {
    setGross("");
    setStateRate("");
    setPreTax("");
  }

  return (
    <div className="space-y-6">
      <ToolPanel title="Pay inputs" onClear={clearInputs}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Gross pay per period ($)</label>
            <input type="number" value={gross} onChange={(e) => setGross(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Pay frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value as typeof frequency)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800">
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="semimonthly">Semi-monthly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Pre-tax deductions ($)</label>
            <input type="number" value={preTax} onChange={(e) => setPreTax(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">State tax flat % (approx)</label>
            <input type="number" value={stateRate} onChange={(e) => setStateRate(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Rough estimate for planning — not a payroll system. For annual tax liability see the Income Tax Estimator. Tables need yearly updates.
        </p>
      </ToolPanel>
      {result && (
        <>
          <div className="rounded-xl bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Estimated net pay</p>
            <p className="text-4xl font-bold text-indigo-600">${result.net.toFixed(2)}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Federal", result.fed],
              ["Social Security", result.ss],
              ["Medicare", result.medicare],
              ["State", result.state],
            ].map(([label, val]) => (
              <div key={label as string} className="rounded-xl border border-zinc-200 p-4 text-center dark:border-zinc-800">
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="text-lg font-semibold">${(val as number).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <StepsList steps={result.steps} />
        </>
      )}
    </div>
  );
}
