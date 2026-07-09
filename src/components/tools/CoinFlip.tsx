"use client";

import { useState } from "react";

export default function CoinFlip() {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<("heads" | "tails")[]>([]);

  const flip = () => {
    setFlipping(true);
    setResult(null);

    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.random() < 0.5 ? "heads" : "tails");
      count++;
      if (count >= 10) {
        clearInterval(interval);
        const final = Math.random() < 0.5 ? "heads" : "tails";
        setResult(final);
        setHistory((h) => [final, ...h].slice(0, 10) as ("heads" | "tails")[]);
        setFlipping(false);
      }
    }, 80);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div
        className={`flex h-40 w-40 items-center justify-center rounded-full border-4 border-yellow-400 bg-gradient-to-br from-yellow-300 to-yellow-500 text-6xl shadow-lg transition-transform duration-300 ${
          flipping ? "animate-bounce" : ""
        }`}
      >
        {result === "heads" ? "👑" : result === "tails" ? "🦅" : "🪙"}
      </div>
      {result && !flipping && (
        <p className="text-3xl font-bold capitalize text-zinc-900 dark:text-zinc-50">
          {result}!
        </p>
      )}
      <button
        type="button"
        onClick={flip}
        disabled={flipping}
        className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {flipping ? "Flipping…" : "Flip Coin"}
      </button>
      {history.length > 0 && (
        <div className="text-center">
          <p className="mb-2 text-sm text-zinc-500">Recent flips</p>
          <div className="flex flex-wrap justify-center gap-2">
            {history.map((h, i) => (
              <span
                key={i}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm capitalize dark:bg-zinc-800"
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
