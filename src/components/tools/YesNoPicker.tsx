"use client";

import { useState } from "react";

export default function YesNoPicker() {
  const [result, setResult] = useState<"yes" | "no" | null>(null);
  const [picking, setPicking] = useState(false);
  const [history, setHistory] = useState<("yes" | "no")[]>([]);

  const pick = () => {
    setPicking(true);
    setResult(null);

    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.random() < 0.5 ? "yes" : "no");
      count++;
      if (count >= 12) {
        clearInterval(interval);
        const final = Math.random() < 0.5 ? "yes" : "no";
        setResult(final);
        setHistory((h) => [final, ...h].slice(0, 10) as ("yes" | "no")[]);
        setPicking(false);
      }
    }, 70);
  };

  const styles = {
    yes: "from-green-400 to-emerald-600 text-white",
    no: "from-red-400 to-rose-600 text-white",
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div
        className={`flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br text-4xl font-bold shadow-xl transition-all duration-300 ${
          result ? styles[result] : "from-zinc-200 to-zinc-300 text-zinc-500 dark:from-zinc-700 dark:to-zinc-800"
        } ${picking ? "scale-95 animate-pulse" : "scale-100"}`}
      >
        {result ? result.toUpperCase() : "?"}
      </div>
      <button
        type="button"
        onClick={pick}
        disabled={picking}
        className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {picking ? "Deciding…" : "Pick Yes or No"}
      </button>
      {history.length > 0 && (
        <div className="text-center">
          <p className="mb-2 text-sm text-zinc-500">History</p>
          <div className="flex flex-wrap justify-center gap-2">
            {history.map((h, i) => (
              <span
                key={i}
                className={`rounded-full px-3 py-1 text-sm font-medium uppercase ${
                  h === "yes"
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                }`}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
