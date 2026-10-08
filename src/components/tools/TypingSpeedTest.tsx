"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Variant = "standard" | "numbers";

const STANDARD_PROMPTS = [
  "the quick brown fox jumps over the lazy dog while typing practice keeps your fingers moving smoothly across the keyboard every day",
  "practice makes progress when you focus on accuracy first then gradually increase your speed without looking down at the keys",
  "a calm steady rhythm helps you type longer passages with fewer mistakes and better endurance during timed writing sessions",
];

const NUMBER_PROMPTS = [
  "48291 70356 19482 65730 91847 20365 57481 83602 14957 62038 39174 85026",
  "10293 84756 56473 92810 37465 81920 45678 23109 67584 39012 74856 10293",
  "90817 26354 71540 38296 54018 72963 18457 60392 47581 92630 15847 20369",
];

function pickPrompt(variant: Variant): string {
  const list = variant === "numbers" ? NUMBER_PROMPTS : STANDARD_PROMPTS;
  return list[Math.floor(Math.random() * list.length)];
}

interface TypingSpeedTestProps {
  variant?: Variant;
  durationSec?: number;
}

export default function TypingSpeedTest({
  variant = "standard",
  durationSec = 60,
}: TypingSpeedTestProps) {
  const [prompt, setPrompt] = useState(() => pickPrompt(variant));
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(durationSec);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setPrompt(pickPrompt(variant));
    setInput("");
    setStartedAt(null);
    setSecondsLeft(durationSec);
    setFinished(false);
  }, [variant, durationSec]);

  useEffect(() => {
    if (startedAt === null || finished) return;
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setFinished(true);
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [startedAt, finished]);

  const stats = useMemo(() => {
    const typed = input;
    let correctChars = 0;
    for (let i = 0; i < typed.length; i += 1) {
      if (typed[i] === prompt[i]) correctChars += 1;
    }
    const elapsedMin =
      startedAt === null
        ? 0
        : Math.max((durationSec - secondsLeft) / 60, 1 / 60);
    const wpm = finished || startedAt
      ? Math.round(correctChars / 5 / elapsedMin)
      : 0;
    const accuracy =
      typed.length === 0 ? 100 : Math.round((correctChars / typed.length) * 100);
    return { wpm, accuracy, correctChars };
  }, [input, prompt, startedAt, secondsLeft, finished, durationSec]);

  const reset = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setPrompt(pickPrompt(variant));
    setInput("");
    setStartedAt(null);
    setSecondsLeft(durationSec);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">Time left</p>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {secondsLeft}s
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">WPM</p>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {stats.wpm}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">Accuracy</p>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {stats.accuracy}%
          </p>
        </div>
      </div>

      <ToolPanel title="Passage" onClear={reset}>
        <p className="mb-4 font-mono text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {prompt}
        </p>
        <textarea
          value={input}
          disabled={finished}
          onChange={(e) => {
            if (startedAt === null) setStartedAt(Date.now());
            setInput(e.target.value);
          }}
          rows={4}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
          placeholder="Start typing here…"
        />
      </ToolPanel>
    </div>
  );
}
