"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const FLAG_OPTIONS = [
  { id: "g", label: "global (g)" },
  { id: "i", label: "ignore case (i)" },
  { id: "m", label: "multiline (m)" },
  { id: "s", label: "dotAll (s)" },
  { id: "u", label: "unicode (u)" },
] as const;

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+\\b");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false });
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");

  const result = useMemo(() => {
    try {
      const flagStr = Object.entries(flags)
        .filter(([, on]) => on)
        .map(([id]) => id)
        .join("");
      const regex = new RegExp(pattern, flagStr);
      const matches: { match: string; index: number; groups: string[] }[] = [];

      if (flags.g) {
        let m: RegExpExecArray | null;
        const clone = new RegExp(pattern, flagStr);
        while ((m = clone.exec(text)) !== null) {
          matches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
          if (m[0].length === 0) clone.lastIndex++;
        }
      } else {
        const m = regex.exec(text);
        if (m) {
          matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        }
      }

      return { ok: true as const, matches, test: new RegExp(pattern, flagStr.replace("g", "")).test(text) };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Invalid regular expression",
      };
    }
  }, [flags, pattern, text]);

  const highlighted = useMemo(() => {
    if (!result.ok || result.matches.length === 0) return null;
    const parts: { text: string; hit: boolean }[] = [];
    let cursor = 0;
    const sorted = [...result.matches].sort((a, b) => a.index - b.index);
    for (const hit of sorted) {
      if (hit.index < cursor) continue;
      if (hit.index > cursor) {
        parts.push({ text: text.slice(cursor, hit.index), hit: false });
      }
      parts.push({ text: hit.match, hit: true });
      cursor = hit.index + hit.match.length;
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
    return parts;
  }, [result, text]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Pattern">
        <label className="mb-3 block text-sm">
          <span className="mb-1 block font-medium">Regular expression</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-zinc-400">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
              spellCheck={false}
            />
            <span className="font-mono text-zinc-400">/</span>
          </div>
        </label>
        <div className="flex flex-wrap gap-3">
          {FLAG_OPTIONS.map((flag) => (
            <label key={flag.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={flags[flag.id]}
                onChange={(e) =>
                  setFlags((prev) => ({ ...prev, [flag.id]: e.target.checked }))
                }
              />
              {flag.label}
            </label>
          ))}
        </div>
        {!result.ok && (
          <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {result.error}
          </p>
        )}
      </ToolPanel>

      <ToolPanel title="Test String">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
          spellCheck={false}
        />
      </ToolPanel>

      <ToolPanel title="Matches">
        {result.ok ? (
          <>
            <p className="mb-3 text-sm text-zinc-500">
              {result.matches.length} match{result.matches.length === 1 ? "" : "es"}
              {!flags.g && (
                <span className="ml-2">
                  · test(): {result.test ? "true" : "false"}
                </span>
              )}
            </p>
            {highlighted && (
              <pre className="mb-4 whitespace-pre-wrap break-words rounded-lg bg-zinc-50 p-4 font-mono text-sm dark:bg-zinc-800">
                {highlighted.map((part, i) =>
                  part.hit ? (
                    <mark
                      key={i}
                      className="rounded bg-amber-200 px-0.5 text-zinc-900 dark:bg-amber-500/40 dark:text-zinc-50"
                    >
                      {part.text}
                    </mark>
                  ) : (
                    <span key={i}>{part.text}</span>
                  ),
                )}
              </pre>
            )}
            {result.matches.length > 0 && (
              <ul className="space-y-2">
                {result.matches.map((m, i) => (
                  <li
                    key={`${m.index}-${i}`}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700"
                  >
                    <span className="font-mono font-medium">{m.match}</span>
                    <span className="ml-2 text-zinc-500">@ {m.index}</span>
                    {m.groups.length > 0 && (
                      <span className="ml-2 text-zinc-500">
                        groups: {m.groups.map((g) => JSON.stringify(g)).join(", ")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-sm text-zinc-500">Fix the pattern to see matches.</p>
        )}
      </ToolPanel>
    </div>
  );
}
