"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import StepsList from "@/components/tools/shared/StepsList";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

type Level = "hs" | "college";
type WeightMode = "unweighted" | "weighted";

interface CourseRow {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

const HS_UNWEIGHTED: Record<string, number> = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  F: 0,
};
const HS_WEIGHTED: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 1,
  F: 0,
};
const COLLEGE: Record<string, number> = {
  "A+": 4,
  A: 4,
  "A-": 3.7,
  "B+": 3.3,
  B: 3,
  "B-": 2.7,
  "C+": 2.3,
  C: 2,
  "C-": 1.7,
  "D+": 1.3,
  D: 1,
  "D-": 0.7,
  F: 0,
};

function normalizeGrade(g: string, level: Level): string {
  return g.trim().toUpperCase().replace(/\s+/g, "");
}

let courseId = 0;
function newCourse(): CourseRow {
  return { id: `c-${++courseId}`, name: "", credits: "1", grade: "A" };
}

export default function GpaCalculator() {
  const [level, setLevel] = useState<Level>("college");
  const [weightMode, setWeightMode] = useState<WeightMode>("unweighted");
  const [rows, setRows] = useState<CourseRow[]>([
    { id: "1", name: "English", credits: "3", grade: "A-" },
    { id: "2", name: "Math", credits: "4", grade: "B+" },
  ]);

  const gradeOptions = useMemo(() => {
    if (level === "college") return Object.keys(COLLEGE);
    return Object.keys(HS_UNWEIGHTED);
  }, [level]);

  const result = useMemo(() => {
    const steps: string[] = [];
    let points = 0;
    let credits = 0;
    for (const row of rows) {
      const cr = Number(row.credits);
      if (!Number.isFinite(cr) || cr <= 0) continue;
      const g = normalizeGrade(row.grade, level);
      let gp: number | undefined;
      if (level === "college") gp = COLLEGE[g];
      else gp = weightMode === "weighted" ? HS_WEIGHTED[g] : HS_UNWEIGHTED[g];
      if (gp === undefined) continue;
      points += gp * cr;
      credits += cr;
      steps.push(`${row.name || "Course"}: ${g} → ${gp} pts × ${cr} cr = ${(gp * cr).toFixed(2)}`);
    }
    if (credits === 0) return null;
    const gpa = points / credits;
    steps.push(`Total quality points = ${points.toFixed(2)}, credits = ${credits}`);
    steps.push(`GPA = ${points.toFixed(2)} / ${credits} = ${gpa.toFixed(3)}`);
    return { gpa, steps };
  }, [rows, level, weightMode]);

  const clearInputs = () => {
    setRows([{ id: crypto.randomUUID(), name: "", credits: "", grade: "" }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Toggle active={level === "hs"} onClick={() => setLevel("hs")} label="High school" />
        <Toggle active={level === "college"} onClick={() => setLevel("college")} label="College" />
        {level === "hs" && (
          <>
            <Toggle
              active={weightMode === "unweighted"}
              onClick={() => setWeightMode("unweighted")}
              label="Unweighted"
            />
            <Toggle
              active={weightMode === "weighted"}
              onClick={() => setWeightMode("weighted")}
              label="Weighted (AP/Honors)"
            />
          </>
        )}
      </div>

      <ToolPanel title="GPA calculator" onClear={clearInputs}>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={row.id} className="grid gap-2 sm:grid-cols-[1.2fr_0.6fr_0.8fr_auto]">
              <Field
                label={i === 0 ? "Course" : ""}
                value={row.name}
                onChange={(v) =>
                  setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, name: v } : r)))
                }
                text
              />
              <Field
                label={i === 0 ? "Credits" : ""}
                value={row.credits}
                onChange={(v) =>
                  setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, credits: v } : r)))
                }
              />
              <div>
                {i === 0 && <label className="mb-1 block text-sm font-medium">Grade</label>}
                <select
                  value={row.grade}
                  onChange={(e) =>
                    setRows((prev) =>
                      prev.map((r) => (r.id === row.id ? { ...r, grade: e.target.value } : r)),
                    )
                  }
                  className={inputClass}
                >
                  {gradeOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="self-end text-sm text-zinc-500 hover:underline"
                onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
                disabled={rows.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setRows((prev) => [...prev, newCourse()])}
            className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium dark:bg-zinc-800"
          >
            Add course
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">GPA</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.gpa.toFixed(3)}
            </p>
          </div>
        )}
      </ToolPanel>
      {result && <StepsList steps={result.steps} />}
    </div>
  );
}

function Toggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-medium ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  text,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  text?: boolean;
}) {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
      <input
        type={text ? "text" : "number"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}
