"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Mode = "paragraphs" | "sentences" | "words";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "curabitur", "pretium",
  "tincidunt", "lacus", "suspendisse", "potenti", "mauris", "placerat", "lectus",
  "vitae", "ultricies", "congue", "integer", "nec", "odio", "praesent",
  "libero", "cursus", "ante", "dapibus", "diam", "nunc", "fermentum",
];

const CLASSIC_START =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

const MODE_LABELS: Record<
  Mode,
  { title: string; unit: string; min: number; max: number; defaultAmount: number }
> = {
  paragraphs: {
    title: "Paragraphs",
    unit: "paragraphs",
    min: 1,
    max: 20,
    defaultAmount: 3,
  },
  sentences: {
    title: "Sentences",
    unit: "sentences",
    min: 1,
    max: 50,
    defaultAmount: 5,
  },
  words: {
    title: "Words",
    unit: "words",
    min: 1,
    max: 200,
    defaultAmount: 50,
  },
};

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function makeSentence(wordCount?: number): string {
  const count = wordCount ?? 6 + Math.floor(Math.random() * 10);
  const words = Array.from({ length: count }, () => randomWord());
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return `${words.join(" ")}.`;
}

function makeParagraph(startWithClassic: boolean, isFirst: boolean): string {
  const sentenceCount = 3 + Math.floor(Math.random() * 4);
  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    if (startWithClassic && isFirst && i === 0) {
      sentences.push(`${CLASSIC_START}.`);
    } else {
      sentences.push(makeSentence());
    }
  }

  return sentences.join(" ");
}

function generateText(
  mode: Mode,
  amount: number,
  startWithClassic: boolean,
): string {
  const count = Math.max(1, amount);

  if (mode === "words") {
    const words: string[] = [];
    if (startWithClassic) {
      words.push(...CLASSIC_START.toLowerCase().split(" "));
    }
    while (words.length < count) {
      words.push(randomWord());
    }
    const trimmed = words.slice(0, count);
    trimmed[0] = trimmed[0].charAt(0).toUpperCase() + trimmed[0].slice(1);
    return `${trimmed.join(" ")}.`;
  }

  if (mode === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) {
      if (startWithClassic && i === 0) {
        sentences.push(`${CLASSIC_START}.`);
      } else {
        sentences.push(makeSentence());
      }
    }
    return sentences.join(" ");
  }

  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(makeParagraph(startWithClassic, i === 0));
  }
  return paragraphs.join("\n\n");
}

export default function LoremIpsum() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [amount, setAmount] = useState(MODE_LABELS.paragraphs.defaultAmount);
  const [startWithClassic, setStartWithClassic] = useState(true);
  const [revision, setRevision] = useState(0);
  const [copied, setCopied] = useState(false);

  const modeConfig = MODE_LABELS[mode];

  const output = useMemo(
    () => generateText(mode, amount, startWithClassic),
    // revision forces a new random sample when regenerating
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, amount, startWithClassic, revision],
  );

  useEffect(() => {
    setCopied(false);
  }, [output]);

  const handleModeChange = (next: Mode) => {
    setMode(next);
    setAmount(MODE_LABELS[next].defaultAmount);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      <ToolPanel title="How much text?">
        <div className="mb-5 flex flex-wrap gap-2">
          {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => handleModeChange(m)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                mode === m
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {MODE_LABELS[m].title}
            </button>
          ))}
        </div>

        <label
          htmlFor="lorem-amount"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {amount} {modeConfig.unit}
        </label>
        <input
          id="lorem-amount"
          type="range"
          min={modeConfig.min}
          max={modeConfig.max}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mb-2 w-full accent-indigo-600"
        />
        <div className="mb-5 flex justify-between text-xs text-zinc-400">
          <span>{modeConfig.min}</span>
          <span>{modeConfig.max}</span>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={startWithClassic}
            onChange={(e) => setStartWithClassic(e.target.checked)}
            className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
          />
          Start with “Lorem ipsum dolor sit amet…”
        </label>
      </ToolPanel>

      <ToolPanel title="Your placeholder text">
        <textarea
          readOnly
          value={output}
          rows={12}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            {wordCount} word{wordCount === 1 ? "" : "s"}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRevision((n) => n + 1)}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Regenerate
            </button>
            <button
              type="button"
              onClick={copy}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </ToolPanel>
    </div>
  );
}
