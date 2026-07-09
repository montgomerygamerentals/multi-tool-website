"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function ListShuffler() {
  const [input, setInput] = useState("Alice\nBob\nCharlie\nDiana\nEve\nFrank");
  const [teamCount, setTeamCount] = useState(2);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[][]>([]);
  const [mode, setMode] = useState<"shuffle" | "teams">("shuffle");

  const items = useMemo(
    () =>
      input
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
    [input],
  );

  const doShuffle = () => {
    setShuffled(shuffle(items));
    setTeams([]);
  };

  const doTeams = () => {
    const shuffledItems = shuffle(items);
    const t: string[][] = Array.from({ length: teamCount }, () => []);
    shuffledItems.forEach((item, i) => {
      t[i % teamCount].push(item);
    });
    setTeams(t);
    setShuffled([]);
  };

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="One item per line…"
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      <div className="flex gap-2">
        {(["shuffle", "teams"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
              mode === m
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {m === "teams" ? "Split into teams" : "Shuffle list"}
          </button>
        ))}
      </div>
      <ToolPanel title="Action">
        {mode === "teams" && (
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Number of teams</label>
            <input
              type="number"
              value={teamCount}
              min={2}
              max={20}
              onChange={(e) => setTeamCount(Number(e.target.value))}
              className="w-32 rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        )}
        <button
          type="button"
          onClick={mode === "shuffle" ? doShuffle : doTeams}
          disabled={items.length < 2}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {mode === "shuffle" ? "Shuffle!" : "Generate Teams"}
        </button>
      </ToolPanel>
      {shuffled.length > 0 && (
        <ToolPanel title="Shuffled">
          <ol className="list-inside list-decimal space-y-1 text-sm">
            {shuffled.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </ToolPanel>
      )}
      {teams.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <ToolPanel key={i} title={`Team ${i + 1}`}>
              <ul className="space-y-1 text-sm">
                {team.map((member, j) => (
                  <li key={j}>{member}</li>
                ))}
              </ul>
            </ToolPanel>
          ))}
        </div>
      )}
    </div>
  );
}
