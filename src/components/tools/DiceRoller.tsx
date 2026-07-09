"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import DiceFace from "@/components/tools/DiceFace";

const ROLL_DURATION_MS = 1000;

function rollDie(sides: number): number {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return (bytes[0] % sides) + 1;
}

type RollPhase = "idle" | "rolling" | "settling";

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(2);
  const [sides, setSides] = useState(6);
  const [displayValues, setDisplayValues] = useState<number[]>([]);
  const [finalValues, setFinalValues] = useState<number[]>([]);
  const [phase, setPhase] = useState<RollPhase>("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const roll = useCallback(() => {
    clearTimers();

    const final = Array.from({ length: diceCount }, () => rollDie(sides));

    setPhase("rolling");
    setFinalValues([]);
    setDisplayValues(
      Array.from({ length: diceCount }, () => rollDie(sides)),
    );

    intervalRef.current = setInterval(() => {
      setDisplayValues(
        Array.from({ length: diceCount }, () => rollDie(sides)),
      );
    }, 80);

    const revealTimeout = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayValues(final);
      setFinalValues(final);
      setPhase("settling");

      const idleTimeout = setTimeout(() => setPhase("idle"), 550);
      timeoutRefs.current.push(idleTimeout);
    }, ROLL_DURATION_MS);
    timeoutRefs.current.push(revealTimeout);
  }, [clearTimers, diceCount, sides]);

  const total = finalValues.reduce((a, b) => a + b, 0);
  const showResults = displayValues.length > 0;
  const isRolling = phase === "rolling";

  return (
    <div className="space-y-6">
      <ToolPanel title="Settings">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Number of dice</label>
            <input
              type="number"
              value={diceCount}
              min={1}
              max={10}
              onChange={(e) => setDiceCount(Number(e.target.value))}
              disabled={isRolling}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Sides per die</label>
            <select
              value={sides}
              onChange={(e) => setSides(Number(e.target.value))}
              disabled={isRolling}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800"
            >
              {[4, 6, 8, 10, 12, 20].map((s) => (
                <option key={s} value={s}>
                  D{s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={roll}
          disabled={isRolling}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRolling ? "Rolling…" : "Roll Dice"}
        </button>
      </ToolPanel>

      <div className="min-h-[140px] rounded-2xl border border-zinc-200 bg-gradient-to-b from-zinc-100/80 to-zinc-50 p-8 dark:border-zinc-800 dark:from-zinc-900/80 dark:to-zinc-950">
        {showResults ? (
          <div className="text-center">
            <div className="mb-6 flex flex-wrap justify-center gap-5">
              {displayValues.map((value, i) => (
                <DiceFace
                  key={i}
                  value={value}
                  sides={sides}
                  phase={phase}
                />
              ))}
            </div>
            {finalValues.length > 1 && phase === "idle" && (
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                Total: {total}
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-sm text-zinc-500">
            Configure your dice and hit Roll to get started.
          </p>
        )}
      </div>
    </div>
  );
}
