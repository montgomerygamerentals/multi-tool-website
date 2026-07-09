"use client";

const D6_PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 1],
    [0, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
};

const DIE_STYLES: Record<number, { bg: string; text: string; label: string }> = {
  4: {
    bg: "from-rose-500 to-rose-700",
    text: "text-white",
    label: "D4",
  },
  6: {
    bg: "from-zinc-50 to-zinc-200",
    text: "text-zinc-900",
    label: "D6",
  },
  8: {
    bg: "from-orange-400 to-orange-600",
    text: "text-white",
    label: "D8",
  },
  10: {
    bg: "from-amber-400 to-amber-600",
    text: "text-white",
    label: "D10",
  },
  12: {
    bg: "from-emerald-500 to-emerald-700",
    text: "text-white",
    label: "D12",
  },
  20: {
    bg: "from-indigo-500 to-violet-700",
    text: "text-white",
    label: "D20",
  },
};

interface DiceFaceProps {
  value: number;
  sides: number;
  phase: "idle" | "rolling" | "settling";
}

function PipGrid({ value }: { value: number }) {
  const pips = D6_PIPS[value] ?? D6_PIPS[1];

  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-1 p-3">
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const hasPip = pips.some(([r, c]) => r === row && c === col);
        return (
          <div key={i} className="flex items-center justify-center">
            {hasPip && (
              <span className="h-3.5 w-3.5 rounded-full bg-zinc-800 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DiceFace({
  value,
  sides,
  phase,
}: DiceFaceProps) {
  const style = DIE_STYLES[sides] ?? {
    bg: "from-slate-500 to-slate-700",
    text: "text-white",
    label: `D${sides}`,
  };
  const isD6 = sides === 6;
  const clampedValue = Math.max(1, Math.min(value, sides));

  return (
    <div
      className={`die-wrapper ${phase === "rolling" ? "die-tumbling" : ""} ${phase === "settling" ? "die-settled" : ""}`}
    >
      <div
        className={`die-cube relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg ${
          isD6
            ? "border border-zinc-300 from-white to-zinc-200 shadow-zinc-400/40 dark:border-zinc-500 dark:from-zinc-100 dark:to-zinc-300"
            : `${style.bg} ${style.text} shadow-black/30`
        }`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-black/10" />
        {isD6 ? (
          <PipGrid value={clampedValue <= 6 ? clampedValue : ((clampedValue - 1) % 6) + 1} />
        ) : (
          <span
            className={`relative z-10 font-bold tabular-nums ${
              sides >= 20 ? "text-2xl" : sides >= 10 ? "text-3xl" : "text-4xl"
            }`}
          >
            {clampedValue}
          </span>
        )}
        {!isD6 && (
          <span className="absolute bottom-1.5 right-2 text-[10px] font-semibold uppercase tracking-wide opacity-60">
            {style.label}
          </span>
        )}
      </div>
    </div>
  );
}
