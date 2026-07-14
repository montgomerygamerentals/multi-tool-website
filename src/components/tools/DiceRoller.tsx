"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import DiceFace from "@/components/tools/DiceFace";

const ROLL_DURATION_MS = 1000;
const EMOJI_RAIN_MS = 3200;

function rollDie(sides: number): number {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return (bytes[0] % sides) + 1;
}

type RollPhase = "idle" | "rolling" | "settling";

interface RollRecord {
  id: number;
  values: number[];
  sides: number;
  total: number;
}

interface RainEmoji {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  drift: number;
  size: number;
}

const MAX_HISTORY = 12;

function createEmojiRain(emojis: string[], count = 40): RainEmoji[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    emoji: emojis[id % emojis.length],
    left: Math.random() * 100,
    delay: Math.random() * 0.45,
    duration: 1.8 + Math.random() * 1.6,
    drift: (Math.random() - 0.5) * 220,
    size: 18 + Math.random() * 16,
  }));
}

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(2);
  const [sides, setSides] = useState(6);
  const [displayValues, setDisplayValues] = useState<number[]>(() =>
    Array.from({ length: 2 }, () => 1),
  );
  const [finalValues, setFinalValues] = useState<number[]>([]);
  const [phase, setPhase] = useState<RollPhase>("idle");
  const [history, setHistory] = useState<RollRecord[]>([]);
  const [rain, setRain] = useState<RainEmoji[]>([]);
  const historyIdRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rainTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const triggerEmojiRain = useCallback((emojis: string[]) => {
    if (rainTimeoutRef.current) clearTimeout(rainTimeoutRef.current);
    setRain(createEmojiRain(emojis));
    rainTimeoutRef.current = setTimeout(() => {
      setRain([]);
      rainTimeoutRef.current = null;
    }, EMOJI_RAIN_MS);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    return () => {
      if (rainTimeoutRef.current) clearTimeout(rainTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setDisplayValues((prev) =>
      Array.from({ length: diceCount }, (_, i) => {
        const value = prev[i] ?? 1;
        return Math.min(value, sides);
      }),
    );
    setFinalValues([]);
  }, [diceCount, sides]);

  const roll = useCallback(() => {
    clearTimers();

    const final = Array.from({ length: diceCount }, () => rollDie(sides));
    const rollSides = sides;

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

      historyIdRef.current += 1;
      setHistory((prev) =>
        [
          {
            id: historyIdRef.current,
            values: final,
            sides: rollSides,
            total: final.reduce((a, b) => a + b, 0),
          },
          ...prev,
        ].slice(0, MAX_HISTORY),
      );

      const doubles = final.length === 2 && final[0] === final[1];
      if (doubles) {
        triggerEmojiRain(
          final[0] === 1 ? ["🐍", "🐍", "✨"] : ["🎲", "🎉", "✨"],
        );
      }

      const idleTimeout = setTimeout(() => setPhase("idle"), 550);
      timeoutRefs.current.push(idleTimeout);
    }, ROLL_DURATION_MS);
    timeoutRefs.current.push(revealTimeout);
  }, [clearTimers, diceCount, sides, triggerEmojiRain]);

  const total = finalValues.reduce((a, b) => a + b, 0);
  const isRolling = phase === "rolling";
  const showResult = finalValues.length > 0 && phase === "idle";
  const isDoubles =
    showResult &&
    finalValues.length === 2 &&
    finalValues[0] === finalValues[1];
  const isSnakeEyes = isDoubles && finalValues[0] === 1;

  return (
    <div className="space-y-6">
      {rain.length > 0 && (
        <div
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
          aria-hidden="true"
        >
          {rain.map((piece) => (
            <span
              key={piece.id}
              className="emoji-rain-piece absolute top-0"
              style={
                {
                  left: `${piece.left}%`,
                  fontSize: piece.size,
                  "--emoji-duration": `${piece.duration}s`,
                  "--emoji-delay": `${piece.delay}s`,
                  "--emoji-drift": `${piece.drift}px`,
                } as React.CSSProperties
              }
            >
              {piece.emoji}
            </span>
          ))}
        </div>
      )}

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
          {displayValues.length > 1 && (
            <div
              className={
                showResult && finalValues.length > 1 ? "visible" : "invisible"
              }
              aria-hidden={!(showResult && finalValues.length > 1)}
            >
              {(isSnakeEyes || isDoubles) && (
                <p
                  className={`mb-2 text-xl font-bold tracking-tight ${
                    isSnakeEyes
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {isSnakeEyes ? (
                    <>
                      <span aria-hidden="true">🐍</span> Snake eyes!
                    </>
                  ) : (
                    "Doubles!"
                  )}
                </p>
              )}
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                Total: {finalValues.length > 1 ? total : 0}
              </p>
            </div>
          )}
        </div>
      </div>

      <ToolPanel title="Recent Rolls">
        {history.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Your last {MAX_HISTORY} rolls will show up here.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs text-zinc-400">Newest at the top</p>
              <button
                type="button"
                onClick={() => setHistory([])}
                className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                Clear
              </button>
            </div>
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {history.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      {entry.values.map((value, i) => (
                        <DiceFace
                          key={`${entry.id}-${i}`}
                          value={value}
                          sides={entry.sides}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">
                    {entry.values.length > 1 ? `Total ${entry.total}` : entry.total}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ToolPanel>
    </div>
  );
}
