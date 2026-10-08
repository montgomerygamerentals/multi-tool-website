"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

type GradeMode = "final" | "weighted" | "test";

interface Row {
  id: string;
  score: string;
  weight: string;
}

let rowId = 0;
function newRow(): Row {
  return { id: `r-${++rowId}`, score: "", weight: "" };
}

export default function GradeCalculator({ mode }: { mode: GradeMode }) {
  const [current, setCurrent] = useState("85");
  const [currentWeight, setCurrentWeight] = useState("70");
  const [finalWeight, setFinalWeight] = useState("30");
  const [desired, setDesired] = useState("90");

  const [rows, setRows] = useState<Row[]>([
    { id: "1", score: "92", weight: "40" },
    { id: "2", score: "78", weight: "35" },
    { id: "3", score: "88", weight: "25" },
  ]);

  const [testCurrent, setTestCurrent] = useState("82");
  const [testWeightSoFar, setTestWeightSoFar] = useState("75");
  const [testWeight, setTestWeight] = useState("25");
  const [testTarget, setTestTarget] = useState("85");

  const result = useMemo(() => {
    const steps: string[] = [];

    if (mode === "final") {
      const cur = Number(current);
      const wCur = Number(currentWeight);
      const wFin = Number(finalWeight);
      const target = Number(desired);
      if ([cur, wCur, wFin, target].some((n) => !Number.isFinite(n))) return null;
      if (wCur + wFin !== 100) {
        return { error: "Current and final weights should sum to 100%.", steps: [] as string[] };
      }
      if (wFin === 0) return { error: "Final weight must be greater than 0.", steps: [] as string[] };
      steps.push(
        `Weighted average: (${wCur}% × ${cur}) + (${wFin}% × final) = ${target}% overall.`,
      );
      const needed = (target - (wCur / 100) * cur) / (wFin / 100);
      steps.push(`Solve for final exam score: final = (${target} − ${wCur}%×${cur}) / ${wFin}% = ${needed.toFixed(2)}.`);
      return { label: "Score needed on final", value: needed, steps, error: null as string | null };
    }

    if (mode === "weighted") {
      let totalWeight = 0;
      let weightedSum = 0;
      for (const row of rows) {
        const s = Number(row.score);
        const w = Number(row.weight);
        if (!Number.isFinite(s) || !Number.isFinite(w)) continue;
        totalWeight += w;
        weightedSum += s * w;
        steps.push(`Add ${s}% × weight ${w} = ${(s * w).toFixed(2)}`);
      }
      if (totalWeight === 0) return null;
      const grade = weightedSum / totalWeight;
      steps.push(`Sum of weights = ${totalWeight}. Grade = ${weightedSum.toFixed(2)} / ${totalWeight} = ${grade.toFixed(2)}%.`);
      return { label: "Weighted grade", value: grade, steps, error: null as string | null };
    }

    const cur = Number(testCurrent);
    const wSoFar = Number(testWeightSoFar);
    const wTest = Number(testWeight);
    const target = Number(testTarget);
    if ([cur, wSoFar, wTest, target].some((n) => !Number.isFinite(n))) return null;
    if (wSoFar + wTest !== 100) {
      return { error: "Completed weight and test weight should sum to 100%.", steps: [] as string[] };
    }
    if (wTest === 0) return { error: "Test weight must be greater than 0.", steps: [] as string[] };
    steps.push(`Target ${target}% with ${wSoFar}% at ${cur}% and ${wTest}% on the next test.`);
    const needed = (target - (wSoFar / 100) * cur) / (wTest / 100);
    steps.push(`Next test score needed = (${target} − ${wSoFar}%×${cur}) / ${wTest}% = ${needed.toFixed(2)}.`);
    return { label: "Score needed on next test", value: needed, steps, error: null as string | null };
  }, [mode, current, currentWeight, finalWeight, desired, rows, testCurrent, testWeightSoFar, testWeight, testTarget]);

  const titles: Record<GradeMode, string> = {
    final: "Final exam grade needed",
    weighted: "Weighted course grade",
    test: "Next test score needed",
  };

  const clearInputs = () => {
    setCurrent("");
    setCurrentWeight("");
    setFinalWeight("");
    setDesired("");
    setRows([{ id: crypto.randomUUID(), score: "", weight: "" }]);
    setTestCurrent("");
    setTestWeightSoFar("");
    setTestWeight("");
    setTestTarget("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title={titles[mode]} onClear={clearInputs}>
        {mode === "final" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Current grade (%)" value={current} onChange={setCurrent} />
            <Field label="Current portion weight (%)" value={currentWeight} onChange={setCurrentWeight} />
            <Field label="Final exam weight (%)" value={finalWeight} onChange={setFinalWeight} />
            <Field label="Desired overall grade (%)" value={desired} onChange={setDesired} />
          </div>
        )}

        {mode === "weighted" && (
          <div className="space-y-3">
            {rows.map((row, i) => (
              <div key={row.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <Field
                  label={i === 0 ? "Score (%)" : ""}
                  value={row.score}
                  onChange={(v) =>
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, score: v } : r)))
                  }
                />
                <Field
                  label={i === 0 ? "Weight" : ""}
                  value={row.weight}
                  onChange={(v) =>
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, weight: v } : r)))
                  }
                />
                <button
                  type="button"
                  className="self-end rounded-lg px-2 py-2 text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
                  disabled={rows.length <= 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setRows((prev) => [...prev, newRow()])}
              className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium dark:bg-zinc-800"
            >
              Add row
            </button>
          </div>
        )}

        {mode === "test" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Current average (%)" value={testCurrent} onChange={setTestCurrent} />
            <Field label="Weight completed (%)" value={testWeightSoFar} onChange={setTestWeightSoFar} />
            <Field label="Next test weight (%)" value={testWeight} onChange={setTestWeight} />
            <Field label="Target course grade (%)" value={testTarget} onChange={setTestTarget} />
          </div>
        )}

        {result?.error && (
          <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{result.error}</p>
        )}
        {result && !result.error && result.value !== undefined && Number.isFinite(result.value) && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">{result.label}</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              %
            </p>
          </div>
        )}
      </ToolPanel>
      {result?.steps && result.steps.length > 0 && <StepsList steps={result.steps} />}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}
