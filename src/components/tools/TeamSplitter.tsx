"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const TEAM_COLORS = [
  "border-indigo-300 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/40",
  "border-violet-300 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/40",
  "border-pink-300 bg-pink-50 dark:border-pink-800 dark:bg-pink-950/40",
  "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40",
  "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40",
  "border-cyan-300 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/40",
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function parseItems(input: string): string[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function clampTeamCount(count: number, itemCount: number): number {
  if (itemCount < 2) return 2;
  return Math.min(20, Math.max(2, Math.min(count, itemCount)));
}

export default function TeamSplitter() {
  const [input, setInput] = useState("Alice\nBob\nCharlie\nDiana\nEve\nFrank");
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);
  const [copied, setCopied] = useState(false);

  const items = useMemo(() => parseItems(input), [input]);
  const maxTeams = Math.min(20, Math.max(2, items.length));
  const effectiveTeamCount = clampTeamCount(teamCount, items.length);
  const canGenerate = items.length >= 2 && effectiveTeamCount >= 2;
  const membersPerTeam = canGenerate
    ? Math.ceil(items.length / effectiveTeamCount)
    : 0;

  const setTeamsCount = (count: number) => {
    setTeamCount(clampTeamCount(count, items.length));
    setTeams([]);
    setCopied(false);
  };

  const generateTeams = () => {
    if (!canGenerate) return;

    const shuffledItems = shuffle(items);
    const nextTeams: string[][] = Array.from(
      { length: effectiveTeamCount },
      () => [],
    );
    shuffledItems.forEach((item, index) => {
      nextTeams[index % effectiveTeamCount].push(item);
    });
    setTeams(nextTeams);
    setCopied(false);
  };

  const copyTeams = async () => {
    if (teams.length === 0) return;

    const text = teams
      .map((team, index) => {
        const header = `Team ${index + 1}`;
        const members = team.map((member) => `- ${member}`).join("\n");
        return `${header}\n${members}`;
      })
      .join("\n\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearList = () => {
    setInput("");
    setTeams([]);
    setCopied(false);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Your list">
        <label htmlFor="team-splitter-input" className="mb-2 block text-sm text-zinc-600 dark:text-zinc-400">
          Enter one name per line.
        </label>
        <textarea
          id="team-splitter-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setTeams([]);
            setCopied(false);
          }}
          rows={8}
          placeholder={"Alice\nBob\nCharlie\nDiana"}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="text-zinc-500">
            {items.length} name{items.length !== 1 ? "s" : ""} ready
          </span>
          {input && (
            <button
              type="button"
              onClick={clearList}
              className="font-medium text-zinc-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              Clear list
            </button>
          )}
        </div>
        {items.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </ToolPanel>

      <ToolPanel title="Team settings">
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Choose how many teams to create. Names are shuffled first, then
          distributed evenly.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setTeamsCount(effectiveTeamCount - 1)}
            disabled={!canGenerate || effectiveTeamCount <= 2}
            aria-label="Fewer teams"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 text-lg font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            −
          </button>
          <div className="min-w-[4.5rem] text-center">
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {effectiveTeamCount}
            </p>
            <p className="text-xs text-zinc-500">teams</p>
          </div>
          <button
            type="button"
            onClick={() => setTeamsCount(effectiveTeamCount + 1)}
            disabled={!canGenerate || effectiveTeamCount >= maxTeams}
            aria-label="More teams"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 text-lg font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            +
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setTeamsCount(count)}
              disabled={items.length < count}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                effectiveTeamCount === count
                  ? "bg-indigo-600 text-white"
                  : "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {count} teams
            </button>
          ))}
        </div>

        {canGenerate && (
          <p className="mt-4 text-sm text-zinc-500">
            About {membersPerTeam} name{membersPerTeam !== 1 ? "s" : ""} per team
          </p>
        )}

        <button
          type="button"
          onClick={generateTeams}
          disabled={!canGenerate}
          className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {teams.length > 0 ? "Generate teams again" : "Generate teams"}
        </button>

        {!canGenerate && (
          <p className="mt-3 text-sm text-zinc-500">
            Add at least 2 names to split into teams.
          </p>
        )}
      </ToolPanel>

      {teams.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Teams
            </h2>
            <button
              type="button"
              onClick={copyTeams}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {copied ? "Copied!" : "Copy all teams"}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team, index) => (
              <div
                key={index}
                className={`rounded-xl border p-4 ${TEAM_COLORS[index % TEAM_COLORS.length]}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    Team {index + 1}
                  </h3>
                  <span className="text-xs font-medium text-zinc-500">
                    {team.length} member{team.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <ul className="space-y-2">
                  {team.map((member, memberIndex) => (
                    <li
                      key={`${member}-${memberIndex}`}
                      className="rounded-md bg-white/80 px-3 py-2 text-sm text-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100"
                    >
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
