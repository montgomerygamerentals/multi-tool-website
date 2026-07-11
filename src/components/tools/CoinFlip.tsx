"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Side = "heads" | "tails";

const FLIP_MS = 2100;

function CoinFace({
  side,
  src,
  imageClassName,
}: {
  side: Side;
  src: string;
  imageClassName: string;
}) {
  return (
    <div
      className={`flip-coin-face relative overflow-hidden ${
        side === "tails" ? "flip-coin-tails" : ""
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="208px"
        className={imageClassName}
        priority
        draggable={false}
      />
    </div>
  );
}

export default function CoinFlip() {
  const [result, setResult] = useState<Side | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<Side[]>([]);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const flip = () => {
    if (flipping) return;

    const final: Side = Math.random() < 0.5 ? "heads" : "tails";
    const current = rotationRef.current;
    const currentMod = ((current % 360) + 360) % 360;
    const targetMod = final === "heads" ? 0 : 180;
    const spins = 6 + Math.floor(Math.random() * 3);
    const turn = (targetMod - currentMod + 360) % 360;
    const nextRotation = current + spins * 360 + turn;

    setFlipping(true);
    setResult(null);
    rotationRef.current = nextRotation;
    setRotation(nextRotation);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setResult(final);
      setHistory((h) => [final, ...h].slice(0, 10));
      setFlipping(false);
    }, FLIP_MS);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex flex-col items-center gap-5">
        <div className="flip-coin-scene">
          <div
            className="flip-coin h-44 w-44 sm:h-52 sm:w-52"
            style={{ transform: `rotateY(${rotation}deg)` }}
            aria-hidden="true"
          >
            <CoinFace
              side="heads"
              src="/coins/penny-heads.jpg"
              imageClassName="object-cover object-center"
            />
            <CoinFace
              side="tails"
              src="/coins/penny-tails.jpg"
              imageClassName="scale-[1.08] object-cover object-center"
            />
          </div>
        </div>
        <div
          className={`flip-coin-shadow ${flipping ? "flip-coin-shadow-flipping" : ""}`}
          aria-hidden="true"
        />
      </div>

      <div className="min-h-10 text-center" aria-live="polite">
        {flipping ? (
          <p className="text-sm font-medium tracking-wide text-zinc-500">
            The penny spins…
          </p>
        ) : result ? (
          <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {result === "heads" ? "Heads" : "Tails"}
          </p>
        ) : (
          <p className="text-sm text-zinc-500">Flip a classic U.S. penny</p>
        )}
      </div>

      <button
        type="button"
        onClick={flip}
        disabled={flipping}
        className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {flipping ? "Flipping…" : "Flip Coin"}
      </button>

      {history.length > 0 && (
        <div className="text-center">
          <p className="mb-1 text-sm text-zinc-500">Recent flips</p>
          <p className="mb-2 text-xs text-zinc-400">Newest → oldest</p>
          <div className="flex flex-wrap justify-center gap-2">
            {history.map((h, i) => (
              <span
                key={`${h}-${i}`}
                className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
                  h === "heads"
                    ? "bg-orange-100 text-orange-950 dark:bg-orange-950/40 dark:text-orange-200"
                    : "bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200"
                }`}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="max-w-md text-center text-[11px] leading-relaxed text-zinc-400">
        Penny images from Wikimedia Commons (U.S. coin designs are public
        domain).
      </p>
    </div>
  );
}
