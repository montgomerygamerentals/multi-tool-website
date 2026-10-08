"use client";

import { useCallback, useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type Token =
  | { type: "num"; value: number }
  | { type: "op"; value: string }
  | { type: "lparen" }
  | { type: "rparen" }
  | { type: "func"; name: string };

const FUNCS = ["sin", "cos", "tan", "log", "ln", "sqrt"] as const;

function tokenize(input: string): Token[] | { error: string } {
  const tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (ch === "(") {
      tokens.push({ type: "lparen" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "rparen" });
      i++;
      continue;
    }
    if ("+-*/^".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }
    const rest = input.slice(i).toLowerCase();
    let matchedFunc = false;
    for (const fn of FUNCS) {
      if (rest.startsWith(fn)) {
        tokens.push({ type: "func", name: fn });
        i += fn.length;
        matchedFunc = true;
        break;
      }
    }
    if (matchedFunc) continue;
    if (/[0-9.]/.test(ch)) {
      let j = i + 1;
      while (j < input.length && /[0-9.]/.test(input[j])) j++;
      const num = Number(input.slice(i, j));
      if (!Number.isFinite(num)) return { error: "Invalid number" };
      tokens.push({ type: "num", value: num });
      i = j;
      continue;
    }
    return { error: `Unexpected character: ${ch}` };
  }
  return tokens;
}

function parseExpression(tokens: Token[]): number | { error: string } {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }
  function consume() {
    return tokens[pos++];
  }

  function parseExpr(): number | { error: string } {
    return parseAddSub();
  }

  function parseAddSub(): number | { error: string } {
    let left = parseMulDiv();
    if (typeof left === "object") return left;
    while (peek()?.type === "op" && (peek() as { value: string }).value.match(/^[+-]$/)) {
      const op = (consume() as { type: "op"; value: string }).value;
      const right = parseMulDiv();
      if (typeof right === "object") return right;
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  function parseMulDiv(): number | { error: string } {
    let left = parsePower();
    if (typeof left === "object") return left;
    while (peek()?.type === "op" && (peek() as { value: string }).value.match(/^[*\/]$/)) {
      const op = (consume() as { type: "op"; value: string }).value;
      const right = parsePower();
      if (typeof right === "object") return right;
      if (op === "/" && right === 0) return { error: "Division by zero" };
      left = op === "*" ? left * right : left / right;
    }
    return left;
  }

  function parsePower(): number | { error: string } {
    let left = parseUnary();
    if (typeof left === "object") return left;
    if (peek()?.type === "op" && (peek() as { value: string }).value === "^") {
      consume();
      const right = parsePower();
      if (typeof right === "object") return right;
      left = Math.pow(left, right);
    }
    return left;
  }

  function parseUnary(): number | { error: string } {
    if (peek()?.type === "op") {
      const op = (peek() as { value: string }).value;
      if (op === "+" || op === "-") {
        consume();
        const v = parseUnary();
        if (typeof v === "object") return v;
        return op === "-" ? -v : v;
      }
    }
    return parsePrimary();
  }

  function parsePrimary(): number | { error: string } {
    const t = peek();
    if (!t) return { error: "Unexpected end of expression" };
    if (t.type === "num") {
      consume();
      return t.value;
    }
    if (t.type === "func") {
      const fn = (consume() as { type: "func"; name: string }).name;
      if (peek()?.type !== "lparen") return { error: `Expected ( after ${fn}` };
      consume();
      const inner = parseExpr();
      if (typeof inner === "object") return inner;
      if (peek()?.type !== "rparen") return { error: "Expected )" };
      consume();
      const rad = (deg: number) => (deg * Math.PI) / 180;
      switch (fn) {
        case "sin":
          return Math.sin(rad(inner));
        case "cos":
          return Math.cos(rad(inner));
        case "tan":
          return Math.tan(rad(inner));
        case "log":
          return inner <= 0 ? { error: "log domain error" } : Math.log10(inner);
        case "ln":
          return inner <= 0 ? { error: "ln domain error" } : Math.log(inner);
        case "sqrt":
          return inner < 0 ? { error: "sqrt domain error" } : Math.sqrt(inner);
        default:
          return { error: "Unknown function" };
      }
    }
    if (t.type === "lparen") {
      consume();
      const v = parseExpr();
      if (typeof v === "object") return v;
      if (peek()?.type !== "rparen") return { error: "Expected )" };
      consume();
      return v;
    }
    return { error: "Invalid syntax" };
  }

  const result = parseExpr();
  if (typeof result === "object") return result;
  if (pos < tokens.length) return { error: "Extra tokens at end" };
  return result;
}

function evaluateExpression(expr: string): number | { error: string } {
  const tokens = tokenize(expr);
  if ("error" in tokens) return tokens;
  if (tokens.length === 0) return { error: "Empty expression" };
  return parseExpression(tokens);
}

const BUTTONS = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "^",
  "+",
  "(",
  ")",
  "C",
  "=",
];

export default function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [angleNote] = useState("Trigonometry uses degrees.");

  const result = useMemo(() => {
    if (!expr.trim()) return null;
    const v = evaluateExpression(expr);
    if (typeof v === "object") return { error: v.error };
    return { value: v };
  }, [expr]);

  const append = useCallback((s: string) => {
    setExpr((prev) => prev + s);
  }, []);

  const insertFunc = useCallback((fn: string) => {
    setExpr((prev) => prev + fn + "(");
  }, []);

  const clearInputs = useCallback(() => setExpr(""), []);

  return (
    <div className="space-y-6">
      <ToolPanel title="Scientific calculator" onClear={clearInputs}>
        <p className="mb-3 text-xs text-zinc-500">{angleNote}</p>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          className="mb-3 w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
          aria-label="Expression"
        />
        <div className="mb-3 flex flex-wrap gap-2">
          {FUNCS.map((fn) => (
            <button
              key={fn}
              type="button"
              onClick={() => insertFunc(fn)}
              className="rounded-lg bg-zinc-100 px-2 py-1 text-xs font-medium dark:bg-zinc-800"
            >
              {fn}()
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {BUTTONS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => {
                if (b === "C") setExpr("");
                else if (b === "=") {
                  /* result updates via useMemo */
                } else append(b);
              }}
              className={`rounded-lg py-3 text-sm font-semibold ${
                b === "="
                  ? "col-span-2 bg-indigo-600 text-white"
                  : b === "C"
                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200"
                    : "bg-zinc-100 dark:bg-zinc-800"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        {result && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">Result</p>
            {"error" in result ? (
              <p className="text-lg font-medium text-rose-600 dark:text-rose-400">
                {result.error}
              </p>
            ) : (
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {result.value.toLocaleString(undefined, { maximumFractionDigits: 10 })}
              </p>
            )}
          </div>
        )}
      </ToolPanel>
    </div>
  );
}
