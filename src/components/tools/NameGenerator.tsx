"use client";

import { useCallback, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export type NameGeneratorType =
  | "band"
  | "podcast"
  | "dnd"
  | "clan"
  | "gamer-tag"
  | "business"
  | "baby"
  | "pet";

const POOLS: Record<
  NameGeneratorType,
  { prefixes: string[]; cores: string[]; suffixes: string[] }
> = {
  band: {
    prefixes: ["Neon", "Midnight", "Velvet", "Static", "Golden", "Hollow"],
    cores: ["Wolves", "Echo", "Reverb", "Parade", "Circuit", "Horizon"],
    suffixes: ["Collective", "Club", "Theory", "Affair", "Syndicate", ""],
  },
  podcast: {
    prefixes: ["Deep", "Daily", "Honest", "Curious", "Late", "Open"],
    cores: ["Mic", "Thread", "Ledger", "Loop", "Brief", "Signal"],
    suffixes: [" Show", " Podcast", " Sessions", " Desk", ""],
  },
  dnd: {
    prefixes: ["Thorn", "Ash", "Grim", "Silver", "Storm", "Rune"],
    cores: ["vale", "hart", "wick", "moor", "fen", "gar"],
    suffixes: [" the Bold", " of Ember", " Ironhand", " Swiftblade", ""],
  },
  clan: {
    prefixes: ["Iron", "Shadow", "Blood", "Stone", "Sky", "Frost"],
    cores: ["fang", "claw", "guard", "born", "heart", "mark"],
    suffixes: [" Clan", " Legion", " Kin", " Pack", ""],
  },
  "gamer-tag": {
    prefixes: ["xX", "Cyber", "Nova", "Pixel", "Ghost", "Turbo"],
    cores: ["Snipe", "Vortex", "Blitz", "Rogue", "Ninja", "Drift"],
    suffixes: ["420", "99", "Xx", "_Pro", ""],
  },
  business: {
    prefixes: ["Bright", "Summit", "North", "Prime", "Clear", "Atlas"],
    cores: ["Path", "Works", "Logic", "Bridge", "Point", "Flow"],
    suffixes: [" LLC", " Co.", " Group", " Partners", ""],
  },
  baby: {
    prefixes: ["El", "Mar", "Ari", "Leo", "Sage", "Nova"],
    cores: ["ora", "iel", "ana", "vin", "lyn", "ren"],
    suffixes: ["", " James", " Rose", " Mae", " Grace"],
  },
  pet: {
    prefixes: ["Mr.", "Captain", "Lady", "Sir", "Tiny", "Big"],
    cores: ["Muffin", "Pepper", "Biscuit", "Noodle", "Pickles", "Waffles"],
    suffixes: ["", " McFloof", " the Brave", " Bean", " Pants"],
  },
};

const TYPE_LABELS: Record<NameGeneratorType, string> = {
  band: "Band name",
  podcast: "Podcast name",
  dnd: "D&D character",
  clan: "Clan name",
  "gamer-tag": "Gamer tag",
  business: "Business name",
  baby: "Baby name",
  pet: "Pet name",
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function generateOne(type: NameGeneratorType): string {
  const pool = POOLS[type];
  const parts = [pick(pool.prefixes), pick(pool.cores), pick(pool.suffixes)];
  let name = parts.join("").replace(/\s+/g, " ").trim();
  if (type === "gamer-tag" && Math.random() > 0.5) {
    name = name.replace(/\s/g, "");
  }
  return name;
}

interface NameGeneratorProps {
  type: NameGeneratorType;
  count?: number;
}

export default function NameGenerator({ type, count = 8 }: NameGeneratorProps) {
  const [names, setNames] = useState<string[]>(() =>
    Array.from({ length: count }, () => generateOne(type)),
  );

  const regenerate = useCallback(() => {
    setNames(Array.from({ length: count }, () => generateOne(type)));
  }, [type, count]);

  const copyAll = async () => {
    await navigator.clipboard.writeText(names.join("\n"));
  };

  const clearInputs = () => {
    setNames([]);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title={TYPE_LABELS[type]} onClear={clearInputs}>
        <ul className="space-y-2">
          {names.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-lg font-medium dark:border-zinc-700 dark:bg-zinc-800"
            >
              {name}
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(name)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={regenerate}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Regenerate
          </button>
          <button
            type="button"
            onClick={copyAll}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            Copy all
          </button>
        </div>
      </ToolPanel>
    </div>
  );
}
