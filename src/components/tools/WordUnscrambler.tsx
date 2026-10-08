"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function normalizeLetters(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function sortedKey(word: string): string {
  return [...word].sort().join("");
}

function matchesFilters(
  word: string,
  opts: {
    minLen: number;
    maxLen: number;
    starts: string;
    ends: string;
    contains: string;
  },
): boolean {
  if (word.length < opts.minLen || word.length > opts.maxLen) return false;
  if (opts.starts && !word.startsWith(opts.starts)) return false;
  if (opts.ends && !word.endsWith(opts.ends)) return false;
  if (opts.contains && !word.includes(opts.contains)) return false;
  return true;
}

export default function WordUnscrambler() {
  const [letters, setLetters] = useState("listen");
  const [minLen, setMinLen] = useState("3");
  const [maxLen, setMaxLen] = useState("12");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [contains, setContains] = useState("");
  const [wordList, setWordList] = useState<string[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    import("@/lib/word-list")
      .then((mod) => {
        if (!cancelled) setWordList(mod.WORD_LIST);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Could not load the word list.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const solve = useCallback(() => {
    if (!wordList) return;
    const pool = normalizeLetters(letters);
    if (pool.length < 2) {
      setResults([]);
      return;
    }
    const poolKey = sortedKey(pool);
    const poolCounts = new Map<string, number>();
    for (const ch of pool) {
      poolCounts.set(ch, (poolCounts.get(ch) ?? 0) + 1);
    }

    const min = Math.max(1, parseInt(minLen, 10) || 1);
    const max = Math.max(min, parseInt(maxLen, 10) || pool.length);
    const filterOpts = {
      minLen: min,
      maxLen: Math.min(max, pool.length),
      starts: normalizeLetters(starts),
      ends: normalizeLetters(ends),
      contains: normalizeLetters(contains),
    };

    startTransition(() => {
      const found: string[] = [];
      for (const word of wordList) {
        if (!matchesFilters(word, filterOpts)) continue;
        if (word.length === pool.length) {
          if (sortedKey(word) !== poolKey) continue;
        } else {
          const counts = new Map(poolCounts);
          let ok = true;
          for (const ch of word) {
            const left = counts.get(ch) ?? 0;
            if (left <= 0) {
              ok = false;
              break;
            }
            counts.set(ch, left - 1);
          }
          if (!ok) continue;
        }
        found.push(word);
        if (found.length >= 500) break;
      }
      found.sort((a, b) => b.length - a.length || a.localeCompare(b));
      setResults(found);
    });
  }, [wordList, letters, minLen, maxLen, starts, ends, contains]);

  const clearInputs = () => {
    setLetters("");
    setMinLen("");
    setMaxLen("");
    setStarts("");
    setEnds("");
    setContains("");
  };

  const status = useMemo(() => {
    if (loadError) return loadError;
    if (!wordList) return "Loading word list…";
    return `${wordList.length.toLocaleString()} words ready`;
  }, [wordList, loadError]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Letters and filters" onClear={clearInputs}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Scrambled letters</label>
            <input
              value={letters}
              onChange={(e) => setLetters(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
            <p className="mt-1 text-xs text-zinc-500">{status}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Min length</label>
              <input
                type="number"
                min="1"
                value={minLen}
                onChange={(e) => setMinLen(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Max length</label>
              <input
                type="number"
                min="1"
                value={maxLen}
                onChange={(e) => setMaxLen(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Starts with</label>
              <input
                value={starts}
                onChange={(e) => setStarts(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Ends with</label>
              <input
                value={ends}
                onChange={(e) => setEnds(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Contains</label>
            <input
              value={contains}
              onChange={(e) => setContains(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <button
            type="button"
            disabled={!wordList || isPending}
            onClick={solve}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {isPending ? "Solving…" : "Unscramble"}
          </button>
        </div>
      </ToolPanel>

      {results.length > 0 && (
        <ToolPanel title={`${results.length} match${results.length === 1 ? "" : "es"}`}>
          <ul className="flex flex-wrap gap-2">
            {results.map((word) => (
              <li
                key={word}
                className="rounded-md bg-zinc-100 px-2.5 py-1 text-sm dark:bg-zinc-800"
              >
                {word}
              </li>
            ))}
          </ul>
        </ToolPanel>
      )}
    </div>
  );
}
