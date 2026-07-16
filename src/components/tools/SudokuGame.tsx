"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import {
  boardsEqual,
  cloneBoard,
  emptyBoard,
  generateSudoku,
  getConflicts,
  isComplete,
  type Board,
  type Difficulty,
} from "@/lib/sudoku";

type NotesGrid = Set<number>[][];

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
  width: number;
  height: number;
  radius: string;
}

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const CONFETTI_COLORS = [
  "#059669",
  "#10b981",
  "#f59e0b",
  "#f97316",
  "#6366f1",
  "#ec4899",
  "#eab308",
];

const WIN_TITLES: Record<Difficulty, string> = {
  easy: "Nice!",
  medium: "Great!",
  hard: "Brilliant!",
};

function emptyNotes(): NotesGrid {
  return Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set<number>()),
  );
}

function cloneNotes(notes: NotesGrid): NotesGrid {
  return notes.map((row) => row.map((cell) => new Set(cell)));
}

function cellKey(row: number, col: number): string {
  return `${row}-${col}`;
}

function createConfetti(count = 48): ConfettiPiece[] {
  return Array.from({ length: count }, (_, id) => {
    const size = 6 + Math.random() * 8;
    return {
      id,
      left: Math.random() * 100,
      delay: Math.random() * 0.35,
      duration: 1.6 + Math.random() * 1.4,
      drift: (Math.random() - 0.5) * 180,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      width: size,
      height: size * (Math.random() > 0.4 ? 0.45 : 1),
      radius: Math.random() > 0.5 ? "2px" : "999px",
    };
  });
}

const activeBtn =
  "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700";
const idleBtn =
  "rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700";

export default function SudokuGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [puzzle, setPuzzle] = useState<Board>(() => emptyBoard());
  const [solution, setSolution] = useState<Board>(() => emptyBoard());
  const [board, setBoard] = useState<Board>(() => emptyBoard());
  const [notes, setNotes] = useState<NotesGrid>(() => emptyNotes());
  const [selected, setSelected] = useState<[number, number] | null>([0, 0]);
  const [notesMode, setNotesMode] = useState(false);
  const [showConflicts, setShowConflicts] = useState(true);
  const [won, setWon] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [message, setMessage] = useState("Fill the grid so every row, column, and box has 1–9");
  const [ready, setReady] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const winModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const generated = generateSudoku("easy");
    setPuzzle(generated.puzzle);
    setSolution(generated.solution);
    setBoard(cloneBoard(generated.puzzle));
    setReady(true);
  }, []);

  useEffect(() => {
    return () => {
      if (winModalTimeoutRef.current) clearTimeout(winModalTimeoutRef.current);
    };
  }, []);

  const given = useMemo(() => {
    const set = new Set<string>();
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (puzzle[r][c] !== 0) set.add(cellKey(r, c));
      }
    }
    return set;
  }, [puzzle]);

  const conflicts = useMemo(
    () => (showConflicts ? getConflicts(board) : new Set<string>()),
    [board, showConflicts],
  );

  const selectedValue =
    selected && board[selected[0]][selected[1]] !== 0
      ? board[selected[0]][selected[1]]
      : null;

  const difficultyLabel =
    DIFFICULTIES.find((d) => d.value === difficulty)?.label ?? difficulty;

  const dismissWinModal = useCallback(() => {
    setShowWinModal(false);
  }, []);

  const triggerWin = useCallback(() => {
    setWon(true);
    setShowWinModal(false);
    setConfetti(createConfetti());

    if (winModalTimeoutRef.current) clearTimeout(winModalTimeoutRef.current);
    winModalTimeoutRef.current = setTimeout(() => {
      setShowWinModal(true);
    }, 700);

    window.setTimeout(() => setConfetti([]), 3200);
  }, []);

  const resetWinUi = useCallback(() => {
    if (winModalTimeoutRef.current) clearTimeout(winModalTimeoutRef.current);
    setWon(false);
    setShowWinModal(false);
    setConfetti([]);
  }, []);

  const newGame = useCallback(
    (nextDifficulty: Difficulty = difficulty) => {
      setReady(false);
      setMessage("Generating puzzle…");
      resetWinUi();
      // Defer so the UI can show the loading state before heavy generation
      window.setTimeout(() => {
        const generated = generateSudoku(nextDifficulty);
        setDifficulty(nextDifficulty);
        setPuzzle(generated.puzzle);
        setSolution(generated.solution);
        setBoard(cloneBoard(generated.puzzle));
        setNotes(emptyNotes());
        setSelected([0, 0]);
        setMessage("Fill the grid so every row, column, and box has 1–9");
        setReady(true);
      }, 20);
    },
    [difficulty, resetWinUi],
  );

  const placeNumber = useCallback(
    (num: number) => {
      if (!selected || won) return;
      const [row, col] = selected;
      if (given.has(cellKey(row, col))) return;

      if (notesMode) {
        setNotes((prev) => {
          const next = cloneNotes(prev);
          if (next[row][col].has(num)) next[row][col].delete(num);
          else next[row][col].add(num);
          return next;
        });
        setBoard((prev) => {
          if (prev[row][col] === 0) return prev;
          const next = cloneBoard(prev);
          next[row][col] = 0;
          return next;
        });
        return;
      }

      setBoard((prev) => {
        const next = cloneBoard(prev);
        next[row][col] = num;
        if (isComplete(next) && boardsEqual(next, solution)) {
          triggerWin();
        } else {
          setWon(false);
          setMessage("Fill the grid so every row, column, and box has 1–9");
        }
        return next;
      });
      setNotes((prev) => {
        const next = cloneNotes(prev);
        next[row][col] = new Set();
        return next;
      });
    },
    [selected, won, given, notesMode, solution, triggerWin],
  );

  const erase = useCallback(() => {
    if (!selected || won) return;
    const [row, col] = selected;
    if (given.has(cellKey(row, col))) return;
    setBoard((prev) => {
      const next = cloneBoard(prev);
      next[row][col] = 0;
      return next;
    });
    setNotes((prev) => {
      const next = cloneNotes(prev);
      next[row][col] = new Set();
      return next;
    });
    setWon(false);
  }, [selected, won, given]);

  const clearBoard = () => {
    setBoard(cloneBoard(puzzle));
    setNotes(emptyNotes());
    resetWinUi();
    setMessage("Fill the grid so every row, column, and box has 1–9");
    setShowClearConfirm(false);
  };

  const checkPuzzle = () => {
    let mistakes = 0;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== 0 && board[r][c] !== solution[r][c]) mistakes++;
      }
    }
    if (mistakes === 0) {
      if (isComplete(board)) {
        if (!won) triggerWin();
      } else {
        setMessage("Looking good so far — keep going!");
      }
    } else {
      setMessage(
        `${mistakes} incorrect cell${mistakes === 1 ? "" : "s"}. Conflicts are highlighted.`,
      );
      setShowConflicts(true);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        placeNumber(Number(e.key));
        return;
      }
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        e.preventDefault();
        erase();
        return;
      }
      if (!selected) return;

      const [row, col] = selected;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected([Math.max(0, row - 1), col]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected([Math.min(8, row + 1), col]);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelected([row, Math.max(0, col - 1)]);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelected([row, Math.min(8, col + 1)]);
      } else if (e.key.toLowerCase() === "n") {
        setNotesMode((v) => !v);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, placeNumber, erase]);

  useEffect(() => {
    if (!showWinModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismissWinModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismissWinModal, showWinModal]);

  const borderClass = (row: number, col: number) => {
    const parts: string[] = [];
    if (col < 8) {
      parts.push(
        col % 3 === 2
          ? "border-r-2 border-r-zinc-800 dark:border-r-zinc-200"
          : "border-r border-r-zinc-300 dark:border-r-zinc-600",
      );
    }
    if (row < 8) {
      parts.push(
        row % 3 === 2
          ? "border-b-2 border-b-zinc-800 dark:border-b-zinc-200"
          : "border-b border-b-zinc-300 dark:border-b-zinc-600",
      );
    }
    return parts.join(" ");
  };

  return (
    <div className="relative space-y-6">
      {confetti.length > 0 && (
        <div
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          aria-hidden="true"
        >
          {confetti.map((piece) => (
            <span
              key={piece.id}
              className="wordle-confetti-piece absolute top-0"
              style={
                {
                  left: `${piece.left}%`,
                  width: piece.width,
                  height: piece.height,
                  backgroundColor: piece.color,
                  borderRadius: piece.radius,
                  animationDelay: `${piece.delay}s`,
                  "--wordle-duration": `${piece.duration}s`,
                  "--wordle-drift": `${piece.drift}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      {showWinModal && won && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/55 backdrop-blur-[2px]"
            aria-label="Close win dialog"
            onClick={dismissWinModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sudoku-win-title"
            className="wordle-win-banner relative z-10 w-full max-w-sm rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 px-6 py-8 text-center shadow-2xl dark:border-emerald-800 dark:from-emerald-950 dark:to-teal-950"
          >
            <p
              id="sudoku-win-title"
              className="text-3xl font-bold tracking-tight text-emerald-700 dark:text-emerald-300"
            >
              {WIN_TITLES[difficulty] ?? "You win!"}
            </p>
            <p className="mt-3 text-lg font-semibold tracking-wide text-emerald-800 dark:text-emerald-200">
              Puzzle complete
            </p>
            <p className="mt-1 text-sm text-emerald-800/80 dark:text-emerald-200/80">
              Solved on {difficultyLabel}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => newGame()}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                New puzzle
              </button>
              <button
                type="button"
                onClick={dismissWinModal}
                className="rounded-lg border border-emerald-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-white dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200 dark:hover:bg-emerald-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/55 backdrop-blur-[2px]"
            aria-label="Cancel clear"
            onClick={() => setShowClearConfirm(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sudoku-clear-title"
            className="relative z-10 w-full max-w-sm rounded-2xl border border-zinc-200 bg-white px-6 py-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
          >
            <p
              id="sudoku-clear-title"
              className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Clear the board?
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              This removes all your entries and notes. The puzzle clues stay.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={clearBoard}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Clear board
              </button>
            </div>
          </div>
        </div>
      )}

      <ToolPanel title="Difficulty">
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => newGame(d.value)}
              className={difficulty === d.value ? activeBtn : idleBtn}
            >
              {d.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => newGame()}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            New puzzle
          </button>
        </div>
      </ToolPanel>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <ToolPanel title="Board" className="flex-1">
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            {message}
          </p>

          {!ready ? (
            <p className="py-16 text-center text-sm text-zinc-500">Generating puzzle…</p>
          ) : (
          <div
            className="mx-auto grid aspect-square w-full max-w-md grid-cols-9 overflow-hidden rounded-lg border-2 border-zinc-800 dark:border-zinc-200"
            role="grid"
            aria-label="Sudoku board"
          >
            {board.map((row, r) =>
              row.map((value, c) => {
                const key = cellKey(r, c);
                const isGiven = given.has(key);
                const isSelected = selected?.[0] === r && selected?.[1] === c;
                const isConflict = conflicts.has(key);
                const inSameUnit =
                  selected &&
                  (selected[0] === r ||
                    selected[1] === c ||
                    (Math.floor(selected[0] / 3) === Math.floor(r / 3) &&
                      Math.floor(selected[1] / 3) === Math.floor(c / 3)));
                const isSameNumber =
                  selectedValue !== null && value === selectedValue;

                let bg = "bg-white dark:bg-zinc-900";
                if (isSelected) bg = "bg-indigo-100 dark:bg-indigo-950";
                else if (isSameNumber) bg = "bg-indigo-50 dark:bg-indigo-950/50";
                else if (inSameUnit) bg = "bg-zinc-50 dark:bg-zinc-800/80";

                return (
                  <button
                    key={key}
                    type="button"
                    role="gridcell"
                    aria-selected={isSelected}
                    onClick={() => setSelected([r, c])}
                    className={`relative flex aspect-square items-center justify-center text-lg font-semibold transition-colors sm:text-xl ${borderClass(r, c)} ${bg} ${
                      isGiven
                        ? "text-zinc-900 dark:text-zinc-50"
                        : isConflict
                          ? "text-red-600 dark:text-red-400"
                          : "text-indigo-700 dark:text-indigo-300"
                    }`}
                  >
                    {value !== 0 ? (
                      value
                    ) : notes[r][c].size > 0 ? (
                      <span className="grid grid-cols-3 gap-0 p-0.5 text-[0.55rem] font-normal leading-none text-zinc-400 sm:text-[0.65rem]">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <span key={n} className="flex h-2.5 items-center justify-center sm:h-3">
                            {notes[r][c].has(n) ? n : ""}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </button>
                );
              }),
            )}
          </div>
          )}
        </ToolPanel>

        <ToolPanel title="Controls" className="w-full lg:w-64">
          <div className="mb-4 grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => placeNumber(n)}
                className="rounded-lg bg-zinc-100 py-3 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                {n}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={erase}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Erase
            </button>
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Clear board
            </button>
            <button
              type="button"
              onClick={() => setNotesMode((v) => !v)}
              className={`w-full ${notesMode ? activeBtn : idleBtn}`}
            >
              Notes {notesMode ? "on" : "off"}
            </button>
            <button
              type="button"
              onClick={checkPuzzle}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Check
            </button>
            <label className="flex cursor-pointer items-center gap-2 pt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={showConflicts}
                onChange={(e) => setShowConflicts(e.target.checked)}
                className="rounded border-zinc-300 accent-indigo-600"
              />
              Highlight conflicts
            </label>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Keys: 1–9 place, arrows move, Delete erase, N toggle notes
          </p>
        </ToolPanel>
      </div>
    </div>
  );
}
