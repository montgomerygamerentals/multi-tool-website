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
  formatPct,
  formatUsd,
  parseAmount,
} from "@/lib/finance";

export default function Contribution401kCalculator() {
  const [salary, setSalary] = useState("75000");
  const [employeeDeferralPct, setEmployeeDeferralPct] = useState("8");
  const [matchRatePct, setMatchRatePct] = useState("50");
  const [matchLimitPct, setMatchLimitPct] = useState("6");
  const [expectedReturn, setExpectedReturn] = useState("7");
  const [years, setYears] = useState("25");
  const [showProjection, setShowProjection] = useState(true);

  const result = useMemo(() => {
    const annualSalary = parseAmount(salary);
    const deferralPct = parseAmount(employeeDeferralPct);
    const matchRate = parseAmount(matchRatePct);
    const matchLimit = parseAmount(matchLimitPct);
    const returnPct = parseAmount(expectedReturn);
    const numYears = parseAmount(years);

    if (
      annualSalary === null ||
      annualSalary <= 0 ||
      deferralPct === null ||
      deferralPct < 0 ||
      matchRate === null ||
      matchRate < 0 ||
      matchLimit === null ||
      matchLimit < 0
    ) {
      return null;
    }

    const employeeContrib = annualSalary * (deferralPct / 100);
    const matchableEmployee = Math.min(
      employeeContrib,
      annualSalary * (matchLimit / 100),
    );
    const employerContrib = matchableEmployee * (matchRate / 100);
    const totalAnnual = employeeContrib + employerContrib;

    let projectedBalance: number | null = null;
    if (
      showProjection &&
      returnPct !== null &&
      returnPct >= 0 &&
      numYears !== null &&
      numYears > 0
    ) {
      const r = returnPct / 100;
      if (r === 0) {
        projectedBalance = totalAnnual * numYears;
      } else {
        projectedBalance =
          totalAnnual * ((Math.pow(1 + r, numYears) - 1) / r);
      }
    }

    return {
      employeeContrib,
      employerContrib,
      totalAnnual,
      projectedBalance,
      deferralPct,
      matchRate,
      matchLimit,
    };
  }, [
    salary,
    employeeDeferralPct,
    matchRatePct,
    matchLimitPct,
    expectedReturn,
    years,
    showProjection,
  ]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Salary & contributions">
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Annual salary ($)">
            <input
              type="number"
              min="0"
              step="1000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Employee deferral (% of salary)">
            <input
              type="number"
              min="0"
              step="0.1"
              value={employeeDeferralPct}
              onChange={(e) => setEmployeeDeferralPct(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Employer match rate (%)">
            <input
              type="number"
              min="0"
              step="1"
              value={matchRatePct}
              onChange={(e) => setMatchRatePct(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Match limit (% of salary)">
            <input
              type="number"
              min="0"
              step="0.1"
              value={matchLimitPct}
              onChange={(e) => setMatchLimitPct(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
        <p className="mt-3 text-sm text-zinc-500">
          Example: a {matchRatePct}% match up to {matchLimitPct}% of salary means
          the employer contributes {matchRatePct}% of your deferrals on the
          first {matchLimitPct}% of pay you contribute.
        </p>
      </ToolPanel>

      <ToolPanel title="Optional projection">
        <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={showProjection}
            onChange={(e) => setShowProjection(e.target.checked)}
            className="rounded border-zinc-300 dark:border-zinc-600"
          />
          Show projected balance with yearly contributions
        </label>
        {showProjection && (
          <div className="grid gap-4 sm:grid-cols-2">
            <FinanceField label="Expected annual return (%)">
              <input
                type="number"
                min="0"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className={financeInputClass}
              />
            </FinanceField>
            <FinanceField label="Years contributing">
              <input
                type="number"
                min="1"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className={financeInputClass}
              />
            </FinanceField>
          </div>
        )}
      </ToolPanel>

      {result && (
        <>
          <ResultHero
            label="Total annual contribution"
            value={formatUsd(result.totalAnnual)}
            hint={`You: ${formatUsd(result.employeeContrib)} · Employer: ${formatUsd(result.employerContrib)}`}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <ResultStat
              label="Annual employee deferral"
              value={formatUsd(result.employeeContrib)}
            />
            <ResultStat
              label="Annual employer match"
              value={formatUsd(result.employerContrib)}
            />
          </div>

          {result.projectedBalance !== null && (
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultStat
                label={`Projected balance (${years} yrs @ ${formatPct(parseAmount(expectedReturn) ?? 0, 1)})`}
                value={formatUsd(result.projectedBalance, 0)}
              />
              <ResultStat
                label="Total contributed over period"
                value={formatUsd(result.totalAnnual * (parseAmount(years) ?? 0), 0)}
              />
            </div>
          )}
        </>
      )}

      <FinanceDisclaimer>
        This is a simplified estimate. IRS contribution limits, vesting schedules,
        catch-up contributions, Roth vs. traditional treatment, and plan-specific
        rules may differ. Consult your plan documents and a tax professional.
      </FinanceDisclaimer>
    </div>
  );
}
