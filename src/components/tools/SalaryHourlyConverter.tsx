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

type LastEdited = "annual" | "hourly";

export default function SalaryHourlyConverter() {
  const [annual, setAnnual] = useState("52000");
  const [hourly, setHourly] = useState("25");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [lastEdited, setLastEdited] = useState<LastEdited>("annual");

  const result = useMemo(() => {
    const hpw = parseAmount(hoursPerWeek);
    const wpy = parseAmount(weeksPerYear);
    if (hpw === null || wpy === null || hpw <= 0 || wpy <= 0) return null;

    const hoursPerYear = hpw * wpy;
    let annualSalary: number;

    if (lastEdited === "hourly") {
      const h = parseAmount(hourly);
      if (h === null || h < 0) return null;
      annualSalary = h * hoursPerYear;
    } else {
      const a = parseAmount(annual);
      if (a === null || a < 0) return null;
      annualSalary = a;
    }

    const hourlyWage = annualSalary / hoursPerYear;

    return {
      annual: annualSalary,
      monthly: annualSalary / 12,
      biweekly: annualSalary / 26,
      weekly: annualSalary / wpy,
      hourly: hourlyWage,
    };
  }, [annual, hourly, hoursPerWeek, weeksPerYear, lastEdited]);

  const handleAnnualChange = (value: string) => {
    setAnnual(value);
    setLastEdited("annual");
    const a = parseAmount(value);
    const hpw = parseAmount(hoursPerWeek);
    const wpy = parseAmount(weeksPerYear);
    if (a !== null && hpw !== null && wpy !== null && hpw > 0 && wpy > 0) {
      setHourly((a / (hpw * wpy)).toFixed(2));
    }
  };

  const handleHourlyChange = (value: string) => {
    setHourly(value);
    setLastEdited("hourly");
    const h = parseAmount(value);
    const hpw = parseAmount(hoursPerWeek);
    const wpy = parseAmount(weeksPerYear);
    if (h !== null && hpw !== null && wpy !== null && hpw > 0 && wpy > 0) {
      setAnnual(String(Math.round(h * hpw * wpy)));
    }
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Salary & hourly wage">
        <p className="mb-4 text-sm text-zinc-500">
          Enter either annual salary or hourly wage — the other updates automatically.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FinanceField label="Annual salary ($)">
            <input
              type="text"
              inputMode="decimal"
              value={annual}
              onChange={(e) => handleAnnualChange(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Hourly wage ($)">
            <input
              type="text"
              inputMode="decimal"
              value={hourly}
              onChange={(e) => handleHourlyChange(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Hours per week">
            <input
              type="number"
              min={1}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
          <FinanceField label="Weeks per year">
            <input
              type="number"
              min={1}
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
              className={financeInputClass}
            />
          </FinanceField>
        </div>
      </ToolPanel>

      {result && (
        <div className="space-y-4">
          <ResultHero label="Annual salary" value={formatUsd(result.annual, 0)} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultStat label="Monthly" value={formatUsd(result.monthly)} />
            <ResultStat label="Biweekly" value={formatUsd(result.biweekly)} />
            <ResultStat label="Weekly" value={formatUsd(result.weekly)} />
            <ResultStat label="Hourly" value={formatUsd(result.hourly)} />
          </div>
        </div>
      )}
    </div>
  );
}
