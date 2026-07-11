"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { pickRandomWordleWord } from "@/lib/wordle-words";

const ROWS = 6;
const COLS = 5;

type LetterStatus = "correct" | "present" | "absent" | "empty" | "tbd";

interface EvaluatedGuess {
  word: string;
  statuses: LetterStatus[];
}

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

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

const STATUS_RANK: Record<LetterStatus, number> = {
  correct: 3,
  present: 2,
  absent: 1,
  tbd: 0,
  empty: 0,
};

const tileClass: Record<LetterStatus, string> = {
  empty: "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
  tbd: "border-zinc-400 bg-white text-zinc-900 dark:border-zinc-500 dark:bg-zinc-900 dark:text-zinc-50",
  correct: "border-emerald-600 bg-emerald-600 text-white",
  present: "border-amber-500 bg-amber-500 text-white",
  absent:
    "border-zinc-500 bg-zinc-500 text-white dark:border-zinc-600 dark:bg-zinc-600",
};

const keyClass: Record<LetterStatus, string> = {
  empty:
    "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600",
  tbd: "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600",
  correct: "bg-emerald-600 text-white hover:bg-emerald-600",
  present: "bg-amber-500 text-white hover:bg-amber-500",
  absent:
    "bg-zinc-800 text-zinc-400 hover:bg-zinc-800 dark:bg-zinc-950 dark:text-zinc-500 dark:hover:bg-zinc-950",
};

const CONFETTI_COLORS = [
  "#059669",
  "#10b981",
  "#f59e0b",
  "#f97316",
  "#6366f1",
  "#ec4899",
  "#eab308",
];

const WIN_TITLES: Record<number, string> = {
  1: "Genius!",
  2: "Magnificent!",
  3: "Impressive!",
  4: "Splendid!",
  5: "Great!",
  6: "Phew!",
};

function evaluateGuess(guess: string, answer: string): LetterStatus[] {
  const result: LetterStatus[] = Array(COLS).fill("absent");
  const remaining = answer.split("");

  for (let i = 0; i < COLS; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
      remaining[i] = "";
    }
  }

  for (let i = 0; i < COLS; i++) {
    if (result[i] === "correct") continue;
    const idx = remaining.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = "present";
      remaining[idx] = "";
    }
  }

  return result;
}

function mergeKeyStatus(
  current: LetterStatus | undefined,
  next: LetterStatus,
): LetterStatus {
  if (!current) return next;
  return STATUS_RANK[next] > STATUS_RANK[current] ? next : current;
}

function isValidGuess(word: string): boolean {
  return /^[a-z]{5}$/.test(word.toLowerCase());
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

export default function WordleGame() {
  const [answer, setAnswer] = useState(() => pickRandomWordleWord());
  const [guesses, setGuesses] = useState<EvaluatedGuess[]>([]);
  const [current, setCurrent] = useState("");
  const [message, setMessage] = useState("Guess the 5-letter word");
  const [messageTone, setMessageTone] = useState<"normal" | "error" | "success">(
    "normal",
  );
  const [shake, setShake] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [winGuesses, setWinGuesses] = useState(0);
  const winModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const answerRef = useRef(answer);
  const guessesRef = useRef(guesses);
  const currentRef = useRef(current);

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);
  useEffect(() => {
    guessesRef.current = guesses;
  }, [guesses]);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const gameOver =
    guesses.length > 0 &&
    (guesses[guesses.length - 1]?.word === answer || guesses.length >= ROWS);
  const won = guesses.some((guess) => guess.word === answer);
  const winningRowIndex = won
    ? guesses.findIndex((guess) => guess.word === answer)
    : -1;

  const keyStatuses = useMemo(() => {
    const map: Record<string, LetterStatus> = {};
    for (const guess of guesses) {
      guess.word.split("").forEach((letter, i) => {
        map[letter] = mergeKeyStatus(map[letter], guess.statuses[i]);
      });
    }
    return map;
  }, [guesses]);

  const showError = useCallback((text: string) => {
    setMessage(text);
    setMessageTone("error");
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  }, []);

  const showStatus = useCallback(
    (text: string, tone: "normal" | "success" = "normal") => {
      setMessage(text);
      setMessageTone(tone);
    },
    [],
  );

  const triggerWin = useCallback((guessCount: number) => {
    const title = WIN_TITLES[guessCount] ?? "You win!";
    setWinGuesses(guessCount);
    setCelebrating(true);
    setShowWinModal(false);
    setConfetti(createConfetti());
    showStatus(title, "success");

    if (winModalTimeoutRef.current) clearTimeout(winModalTimeoutRef.current);
    winModalTimeoutRef.current = setTimeout(() => {
      setShowWinModal(true);
    }, 700);

    window.setTimeout(() => setConfetti([]), 3200);
  }, [showStatus]);

  useEffect(() => {
    return () => {
      if (winModalTimeoutRef.current) clearTimeout(winModalTimeoutRef.current);
    };
  }, []);

  const dismissWinModal = useCallback(() => {
    setShowWinModal(false);
  }, []);

  const submitGuess = useCallback(() => {
    const guess = currentRef.current.toLowerCase();
    const solution = answerRef.current;
    const prior = guessesRef.current;

    const alreadyOver =
      prior.length > 0 &&
      (prior[prior.length - 1]?.word === solution || prior.length >= ROWS);
    if (alreadyOver) return;

    if (guess.length !== COLS) {
      showError("Not enough letters");
      return;
    }

    if (!isValidGuess(guess)) {
      showError("Enter a 5-letter word");
      return;
    }

    const statuses = evaluateGuess(guess, solution);
    const nextGuesses = [...prior, { word: guess, statuses }];
    setGuesses(nextGuesses);
    setCurrent("");
    currentRef.current = "";

    if (guess === solution) {
      triggerWin(nextGuesses.length);
      return;
    }

    if (nextGuesses.length >= ROWS) {
      setCelebrating(false);
      showStatus(`The word was ${solution.toUpperCase()}`, "error");
      return;
    }

    const left = ROWS - nextGuesses.length;
    showStatus(`${left} guess${left === 1 ? "" : "es"} left`);
  }, [showError, showStatus, triggerWin]);

  const handleKey = useCallback(
    (key: string) => {
      const solution = answerRef.current;
      const prior = guessesRef.current;
      const alreadyOver =
        prior.length > 0 &&
        (prior[prior.length - 1]?.word === solution || prior.length >= ROWS);

      if (key === "ENTER") {
        submitGuess();
        return;
      }

      if (alreadyOver) return;

      if (key === "BACK" || key === "BACKSPACE") {
        setCurrent((value) => {
          const next = value.slice(0, -1);
          currentRef.current = next;
          return next;
        });
        return;
      }

      if (/^[A-Z]$/.test(key)) {
        setCurrent((value) => {
          if (value.length >= COLS) return value;
          const next = value + key.toLowerCase();
          currentRef.current = next;
          return next;
        });
      }
    },
    [submitGuess],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleKey("ENTER");
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        handleKey("BACK");
        return;
      }

      if (/^[a-zA-Z]$/.test(event.key)) {
        event.preventDefault();
        handleKey(event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  const previewWin = () => {
    const solution = answerRef.current;
    const winningGuess: EvaluatedGuess = {
      word: solution,
      statuses: Array(COLS).fill("correct") as LetterStatus[],
    };
    setGuesses([winningGuess]);
    guessesRef.current = [winningGuess];
    setCurrent("");
    currentRef.current = "";
    triggerWin(1);
  };

  const newGame = () => {
    if (winModalTimeoutRef.current) clearTimeout(winModalTimeoutRef.current);
    const next = pickRandomWordleWord();
    setAnswer(next);
    answerRef.current = next;
    setGuesses([]);
    guessesRef.current = [];
    setCurrent("");
    currentRef.current = "";
    setCelebrating(false);
    setShowWinModal(false);
    setConfetti([]);
    setWinGuesses(0);
    showStatus("Guess the 5-letter word");
  };

  useEffect(() => {
    if (!showWinModal) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismissWinModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismissWinModal, showWinModal]);

  const rows = Array.from({ length: ROWS }, (_, rowIndex) => {
    if (rowIndex < guesses.length) return guesses[rowIndex];
    if (rowIndex === guesses.length && !gameOver) {
      return {
        word: current.padEnd(COLS, " "),
        statuses: Array.from({ length: COLS }, (_, i) =>
          i < current.length ? "tbd" : "empty",
        ) as LetterStatus[],
      };
    }
    return {
      word: "     ",
      statuses: Array(COLS).fill("empty") as LetterStatus[],
    };
  });

  const messageClass =
    messageTone === "error"
      ? "text-red-600 dark:text-red-400"
      : messageTone === "success"
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-zinc-600 dark:text-zinc-300";

  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col items-center gap-6 overflow-hidden">
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
            aria-labelledby="wordle-win-title"
            className="wordle-win-banner relative z-10 w-full max-w-sm rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 px-6 py-8 text-center shadow-2xl dark:border-emerald-800 dark:from-emerald-950 dark:to-teal-950"
          >
            <p
              id="wordle-win-title"
              className="text-3xl font-bold tracking-tight text-emerald-700 dark:text-emerald-300"
            >
              {WIN_TITLES[winGuesses] ?? "You win!"}
            </p>
            <p className="mt-3 text-lg font-semibold tracking-wide text-emerald-800 dark:text-emerald-200">
              {answer.toUpperCase()}
            </p>
            <p className="mt-1 text-sm text-emerald-800/80 dark:text-emerald-200/80">
              Solved in {winGuesses} / {ROWS}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={newGame}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Play again
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

      <div className="w-full text-center">
        <p
          className={`min-h-6 text-sm font-semibold transition-all ${messageClass} ${
            celebrating ? "scale-110 text-base sm:text-lg" : ""
          }`}
        >
          {message}
        </p>
      </div>

      <div
        className={`grid gap-1.5 ${shake ? "animate-pulse" : ""}`}
        aria-label="Wordle board"
      >
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
            {row.statuses.map((status, colIndex) => {
              const letter = row.word[colIndex]?.trim() ?? "";
              const isWinningTile =
                celebrating && rowIndex === winningRowIndex;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex h-14 w-14 items-center justify-center rounded-md border-2 text-2xl font-bold uppercase transition-colors sm:h-16 sm:w-16 ${tileClass[status]} ${
                    isWinningTile ? "wordle-tile-win" : ""
                  }`}
                  style={
                    isWinningTile
                      ? { animationDelay: `${colIndex * 90}ms` }
                      : undefined
                  }
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        {KEYBOARD_ROWS.map((row) => (
          <div key={row.join("-")} className="flex justify-center gap-1.5">
            {row.map((key) => {
              const status =
                key.length === 1
                  ? (keyStatuses[key.toLowerCase()] ?? "empty")
                  : "empty";
              const label =
                key === "BACK" ? "⌫" : key === "ENTER" ? "Enter" : key;
              return (
                <button
                  key={key}
                  type="button"
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleKey(key)}
                  className={`rounded-md px-2 py-3 text-xs font-bold uppercase transition-colors sm:px-3 sm:text-sm ${
                    key === "ENTER" || key === "BACK"
                      ? "min-w-[3.25rem] sm:min-w-[4rem]"
                      : "min-w-[1.85rem] sm:min-w-[2.25rem]"
                  } ${keyClass[status]}`}
                  aria-label={key === "BACK" ? "Backspace" : key}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={newGame}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          New game
        </button>
        <button
          type="button"
          onClick={previewWin}
          className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Test win
        </button>
        {gameOver && !celebrating && (
          <p className="text-sm text-zinc-500">
            {won
              ? `Solved in ${guesses.length} / ${ROWS}`
              : `Answer: ${answer.toUpperCase()}`}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-emerald-600" /> Correct
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-amber-500" /> Wrong spot
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-zinc-500" /> Not in word
        </span>
      </div>
    </div>
  );
}
