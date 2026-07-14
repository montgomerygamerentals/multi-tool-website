"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Mode = "stopwatch" | "countdown";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatMs(ms: number) {
  const total = Math.max(0, Math.floor(ms / 10));
  const centiseconds = total % 100;
  const totalSeconds = Math.floor(total / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function parseField(value: string) {
  if (value.trim() === "") return 0;
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

function msFromInputs(minutes: string, seconds: string) {
  return parseField(minutes) * 60_000 + parseField(seconds) * 1000;
}

export default function TimerTool() {
  const [mode, setMode] = useState<Mode>("stopwatch");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [countdownMs, setCountdownMs] = useState(5 * 60 * 1000);
  const [remaining, setRemaining] = useState(5 * 60 * 1000);
  const [minutesInput, setMinutesInput] = useState("5");
  const [secondsInput, setSecondsInput] = useState("0");
  const [laps, setLaps] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const startedAt = useRef<number | null>(null);
  const baseElapsed = useRef(0);
  const frameRef = useRef<number | null>(null);

  const clearFrame = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const tick = useCallback(() => {
    if (startedAt.current === null) return;
    const delta = performance.now() - startedAt.current;

    if (mode === "stopwatch") {
      setElapsed(baseElapsed.current + delta);
    } else {
      const next = Math.max(0, countdownMs - (baseElapsed.current + delta));
      setRemaining(next);
      if (next <= 0) {
        setRunning(false);
        setDone(true);
        startedAt.current = null;
        clearFrame();
        return;
      }
    }

    frameRef.current = requestAnimationFrame(tick);
  }, [countdownMs, mode]);

  useEffect(() => {
    if (!running) {
      clearFrame();
      return;
    }
    startedAt.current = performance.now();
    frameRef.current = requestAnimationFrame(tick);
    return clearFrame;
  }, [running, tick]);

  const reset = () => {
    setRunning(false);
    setDone(false);
    startedAt.current = null;
    baseElapsed.current = 0;
    setElapsed(0);
    const ms = msFromInputs(minutesInput, secondsInput);
    setCountdownMs(ms);
    setRemaining(ms);
    setLaps([]);
    clearFrame();
  };

  const setCountdownFromInputs = (minutes: string, seconds: string) => {
    const cleanMinutes =
      minutes === "" || /^\d*$/.test(minutes) ? minutes : minutesInput;
    let cleanSeconds =
      seconds === "" || /^\d*$/.test(seconds) ? seconds : secondsInput;

    if (cleanSeconds !== "" && Number(cleanSeconds) > 59) {
      cleanSeconds = "59";
    }

    const ms = msFromInputs(cleanMinutes, cleanSeconds);
    setMinutesInput(cleanMinutes);
    setSecondsInput(cleanSeconds);
    setCountdownMs(ms);
    setRemaining(ms);
    setDone(false);
    setRunning(false);
    baseElapsed.current = 0;
    startedAt.current = null;
    clearFrame();
  };

  const display = mode === "stopwatch" ? elapsed : remaining;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["stopwatch", "countdown"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setMode(id);
              reset();
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
              mode === id
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      <ToolPanel>
        <p
          className={`mb-6 text-center font-mono text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl ${
            done ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-900 dark:text-zinc-50"
          }`}
        >
          {formatMs(display)}
        </p>

        {mode === "countdown" && (
          <div className="mb-4 grid grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="mb-1 block font-medium">Minutes</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={minutesInput}
                disabled={running}
                onChange={(e) =>
                  setCountdownFromInputs(e.target.value, secondsInput)
                }
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Seconds</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={secondsInput}
                disabled={running}
                onChange={(e) =>
                  setCountdownFromInputs(minutesInput, e.target.value)
                }
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800"
              />
            </label>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (running) {
                if (startedAt.current !== null) {
                  baseElapsed.current += performance.now() - startedAt.current;
                }
                startedAt.current = null;
                setRunning(false);
              } else {
                if (mode === "countdown" && remaining <= 0) return;
                setDone(false);
                setRunning(true);
              }
            }}
            disabled={mode === "countdown" && remaining <= 0 && !running}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            Reset
          </button>
          {mode === "stopwatch" && (
            <button
              type="button"
              onClick={() => setLaps((prev) => [elapsed, ...prev].slice(0, 20))}
              disabled={!running && elapsed === 0}
              className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              Lap
            </button>
          )}
        </div>

        {done && (
          <p className="mt-4 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Time’s up!
          </p>
        )}
      </ToolPanel>

      {mode === "stopwatch" && laps.length > 0 && (
        <ToolPanel title="Laps">
          <ul className="space-y-2">
            {laps.map((lap, i) => (
              <li
                key={`${lap}-${i}`}
                className="flex justify-between font-mono text-sm text-zinc-700 dark:text-zinc-300"
              >
                <span>Lap {laps.length - i}</span>
                <span>{formatMs(lap)}</span>
              </li>
            ))}
          </ul>
        </ToolPanel>
      )}
    </div>
  );
}
