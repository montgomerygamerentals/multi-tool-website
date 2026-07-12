"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

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
  const [message, setMessage] = useState("Fill the grid so every row, column, and box has 1–9");
  const [ready, setReady] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const generated = generateSudoku("easy");
    setPuzzle(generated.puzzle);
    setSolution(generated.solution);
    setBoard(cloneBoard(generated.puzzle));
    setReady(true);
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

  const newGame = useCallback(
    (nextDifficulty: Difficulty = difficulty) => {
      setReady(false);
      setMessage("Generating puzzle…");
      // Defer so the UI can show the loading state before heavy generation
      window.setTimeout(() => {
        const generated = generateSudoku(nextDifficulty);
        setDifficulty(nextDifficulty);
        setPuzzle(generated.puzzle);
        setSolution(generated.solution);
        setBoard(cloneBoard(generated.puzzle));
        setNotes(emptyNotes());
        setSelected([0, 0]);
        setWon(false);
        setMessage("Fill the grid so every row, column, and box has 1–9");
        setReady(true);
      }, 20);
    },
    [difficulty],
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
          setWon(true);
          setMessage("Puzzle complete — nice work!");
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
    [selected, won, given, notesMode, solution],
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
    setWon(false);
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
        setWon(true);
        setMessage("Puzzle complete — nice work!");
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
          <p
            className={`mb-4 text-sm ${
              won
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
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
