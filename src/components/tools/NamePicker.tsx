"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WHEEL_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
];

const DEFAULT_NAMES = ["Alice", "Bob", "Charlie", "Diana", "Eve"];

interface WheelEntry {
  id: string;
  name: string;
  color: string;
}

function createId(): string {
  return crypto.randomUUID();
}

function defaultColor(index: number): string {
  return WHEEL_COLORS[index % WHEEL_COLORS.length];
}

function createDefaultEntries(): WheelEntry[] {
  return DEFAULT_NAMES.map((name, i) => ({
    id: createId(),
    name,
    color: defaultColor(i),
  }));
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#18181b" : "#ffffff";
}

export default function NamePicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<WheelEntry[]>(createDefaultEntries);
  const [nameInput, setNameInput] = useState("");
  const [newColor, setNewColor] = useState(WHEEL_COLORS[DEFAULT_NAMES.length % WHEEL_COLORS.length]);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<WheelEntry | null>(null);
  const animationRef = useRef<number | null>(null);

  const drawWheel = useCallback(
    (currentRotation: number) => {
      const canvas = canvasRef.current;
      if (!canvas || entries.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const size = canvas.width;
      const center = size / 2;
      const radius = center - 10;
      const sliceAngle = (2 * Math.PI) / entries.length;

      ctx.clearRect(0, 0, size, size);

      entries.forEach((entry, i) => {
        const startAngle = currentRotation + i * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = entry.color;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = getContrastColor(entry.color);
        ctx.font = `bold ${Math.min(16, radius / entries.length + 8)}px sans-serif`;
        ctx.fillText(entry.name, radius - 16, 5);
        ctx.restore();
      });

      ctx.beginPath();
      ctx.arc(center, center, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#e4e4e7";
      ctx.lineWidth = 3;
      ctx.stroke();
    },
    [entries],
  );

  useEffect(() => {
    drawWheel(rotation);
  }, [entries, rotation, drawWheel]);

  const addName = useCallback(() => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;

    setEntries((prev) => [
      ...prev,
      { id: createId(), name: trimmed, color: newColor },
    ]);
    setNameInput("");
    setNewColor(defaultColor(entries.length + 1));
    setWinner(null);
    inputRef.current?.focus();
  }, [nameInput, newColor, entries.length]);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setWinner(null);
  }, []);

  const updateColor = useCallback((id: string, color: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, color } : e)),
    );
  }, []);

  const clearAllNames = useCallback(() => {
    setEntries([]);
    setWinner(null);
    setRotation(0);
    setNewColor(defaultColor(0));
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || entries.length < 2) return;

    setIsSpinning(true);
    setWinner(null);

    const extraSpins = 5 + Math.random() * 3;
    const randomOffset = Math.random() * 2 * Math.PI;
    const targetRotation = rotation + extraSpins * 2 * Math.PI + randomOffset;

    const startRotation = rotation;
    const duration = 4000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startRotation + (targetRotation - startRotation) * eased;

      setRotation(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);

        const normalized =
          ((2 * Math.PI - (current % (2 * Math.PI))) % (2 * Math.PI)) +
          Math.PI / 2;
        const sliceAngle = (2 * Math.PI) / entries.length;
        const winnerIndex =
          Math.floor(normalized / sliceAngle) % entries.length;
        setWinner(entries[winnerIndex]);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [isSpinning, entries, rotation]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const removeWinner = useCallback(() => {
    if (!winner) return;
    setEntries((prev) => prev.filter((e) => e.id !== winner.id));
    setWinner(null);
    setRotation(0);
  }, [winner]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addName();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
        <div className="relative shrink-0">
          <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
            <div className="h-0 w-0 border-x-[14px] border-t-[24px] border-x-transparent border-t-red-500 drop-shadow-md" />
          </div>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="rounded-full shadow-lg"
          />
          {entries.length < 2 && (
            <p className="mt-3 text-center text-sm text-zinc-500">
              Add at least 2 names to spin
            </p>
          )}
        </div>

        <div className="w-full flex-1 space-y-4">
          <div>
            <label
              htmlFor="name-input"
              className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Add a name
            </label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                id="name-input"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={isSpinning}
                placeholder="Type a name…"
                className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                disabled={isSpinning}
                title="Color for new name"
                className="h-[42px] w-12 shrink-0 cursor-pointer rounded-lg border border-zinc-300 bg-white p-1 disabled:opacity-50 dark:border-zinc-700"
              />
              <button
                type="button"
                onClick={addName}
                disabled={isSpinning || !nameInput.trim()}
                className="shrink-0 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Names on the wheel
              </p>
              <p className="text-xs text-zinc-500">
                {entries.length} name{entries.length !== 1 ? "s" : ""}
              </p>
            </div>
            {entries.length > 0 ? (
              <ul className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2 py-2 dark:bg-zinc-800"
                  >
                    <input
                      type="color"
                      value={entry.color}
                      onChange={(e) => updateColor(entry.id, e.target.value)}
                      disabled={isSpinning}
                      title={`Change color for ${entry.name}`}
                      className="h-9 w-9 shrink-0 cursor-pointer rounded-md border border-zinc-300 bg-white p-0.5 disabled:opacity-50 dark:border-zinc-600"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm text-zinc-800 dark:text-zinc-100">
                      {entry.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEntry(entry.id)}
                      disabled={isSpinning}
                      className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-red-600 disabled:opacity-50 dark:hover:bg-zinc-700 dark:hover:text-red-400"
                      aria-label={`Remove ${entry.name}`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
                No names yet. Add at least two to spin the wheel.
              </div>
            )}
            {entries.length > 0 && (
              <button
                type="button"
                onClick={clearAllNames}
                disabled={isSpinning}
                className="mt-2 text-xs font-medium text-zinc-500 transition-colors hover:text-red-600 disabled:opacity-50 dark:hover:text-red-400"
              >
                Clear all names
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={spin}
            disabled={isSpinning || entries.length < 2}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSpinning ? "Spinning…" : "Spin the Wheel!"}
          </button>
        </div>
      </div>

      {winner && (
        <div
          className="rounded-xl border p-6 text-center"
          style={{
            borderColor: winner.color,
            backgroundColor: `${winner.color}18`,
          }}
        >
          <p className="mb-1 text-sm font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
            Winner
          </p>
          <p
            className="text-3xl font-bold"
            style={{ color: winner.color }}
          >
            {winner.name}
          </p>
          <button
            type="button"
            onClick={removeWinner}
            className="mt-4 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Remove winner & spin again
          </button>
        </div>
      )}
    </div>
  );
}
