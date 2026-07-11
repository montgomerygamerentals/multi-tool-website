"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { diffArrays, diffWordsWithSpace } from "diff";

type CellType = "same" | "removed" | "added" | "empty";

interface InlinePart {
  text: string;
  highlight: boolean;
}

interface DiffCell {
  lineNum: number | null;
  text: string;
  type: CellType;
  parts?: InlinePart[];
}

interface DiffRow {
  left: DiffCell;
  right: DiffCell;
}

function splitLines(text: string): string[] {
  if (!text) return [];
  const lines = text.split("\n");
  if (text.endsWith("\n")) lines.pop();
  return lines;
}

function stripWhitespace(line: string): string {
  return line.replace(/\s+/g, "");
}

function getInlineParts(
  left: string,
  right: string,
  ignoreWhitespace: boolean,
): { left: InlinePart[]; right: InlinePart[] } {
  const changes = diffWordsWithSpace(left, right, { ignoreWhitespace });
  const leftParts: InlinePart[] = [];
  const rightParts: InlinePart[] = [];

  for (const change of changes) {
    if (change.added) {
      rightParts.push({ text: change.value, highlight: true });
    } else if (change.removed) {
      leftParts.push({ text: change.value, highlight: true });
    } else {
      leftParts.push({ text: change.value, highlight: false });
      rightParts.push({ text: change.value, highlight: false });
    }
  }

  return { left: leftParts, right: rightParts };
}

function buildSideBySide(
  original: string,
  modified: string,
  ignoreWhitespace: boolean,
): DiffRow[] {
  const leftLines = splitLines(original);
  const rightLines = splitLines(modified);

  const changes = diffArrays(leftLines, rightLines, {
    comparator: ignoreWhitespace
      ? (a, b) => stripWhitespace(a) === stripWhitespace(b)
      : undefined,
  });

  const rows: DiffRow[] = [];
  let leftNum = 1;
  let rightNum = 1;
  let leftIdx = 0;
  let rightIdx = 0;
  let i = 0;

  while (i < changes.length) {
    const change = changes[i];

    if (!change.added && !change.removed) {
      for (let j = 0; j < change.value.length; j++) {
        rows.push({
          left: {
            lineNum: leftNum++,
            text: leftLines[leftIdx++] ?? "",
            type: "same",
          },
          right: {
            lineNum: rightNum++,
            text: rightLines[rightIdx++] ?? "",
            type: "same",
          },
        });
      }
      i += 1;
      continue;
    }

    if (change.removed) {
      const removedLines = change.value;
      const next = changes[i + 1];
      const addedLines = next?.added ? next.value : [];
      const max = Math.max(removedLines.length, addedLines.length);

      for (let j = 0; j < max; j++) {
        const hasLeft = j < removedLines.length;
        const hasRight = j < addedLines.length;
        const leftText = hasLeft ? (leftLines[leftIdx++] ?? "") : "";
        const rightText = hasRight ? (rightLines[rightIdx++] ?? "") : "";

        let leftParts: InlinePart[] | undefined;
        let rightParts: InlinePart[] | undefined;

        if (hasLeft && hasRight) {
          const inline = getInlineParts(leftText, rightText, ignoreWhitespace);
          leftParts = inline.left;
          rightParts = inline.right;
        }

        rows.push({
          left: hasLeft
            ? {
                lineNum: leftNum++,
                text: leftText,
                type: "removed",
                parts: leftParts,
              }
            : { lineNum: null, text: "", type: "empty" },
          right: hasRight
            ? {
                lineNum: rightNum++,
                text: rightText,
                type: "added",
                parts: rightParts,
              }
            : { lineNum: null, text: "", type: "empty" },
        });
      }

      i += next?.added ? 2 : 1;
      continue;
    }

    for (let j = 0; j < change.value.length; j++) {
      rows.push({
        left: { lineNum: null, text: "", type: "empty" },
        right: {
          lineNum: rightNum++,
          text: rightLines[rightIdx++] ?? "",
          type: "added",
        },
      });
    }
    i += 1;
  }

  return rows;
}

function getDiffHunks(rows: DiffRow[]): { start: number; end: number }[] {
  const hunks: { start: number; end: number }[] = [];
  let start: number | null = null;

  for (let i = 0; i < rows.length; i++) {
    const isDiff =
      rows[i].left.type !== "same" || rows[i].right.type !== "same";

    if (isDiff) {
      if (start === null) start = i;
    } else if (start !== null) {
      hunks.push({ start, end: i - 1 });
      start = null;
    }
  }

  if (start !== null) hunks.push({ start, end: rows.length - 1 });
  return hunks;
}

const cellBg: Record<CellType, string> = {
  same: "bg-transparent",
  removed: "bg-red-50 dark:bg-red-950/25",
  added: "bg-green-50 dark:bg-green-950/25",
  empty: "bg-zinc-50 dark:bg-zinc-900/60",
};

const cellText: Record<CellType, string> = {
  same: "text-zinc-800 dark:text-zinc-200",
  removed: "text-red-900 dark:text-red-200",
  added: "text-green-900 dark:text-green-200",
  empty: "text-transparent",
};

const gutterText: Record<CellType, string> = {
  same: "text-zinc-400",
  removed: "text-red-500/80 dark:text-red-400/80",
  added: "text-green-600/80 dark:text-green-400/80",
  empty: "text-zinc-300 dark:text-zinc-700",
};

const inlineHighlight: Record<"removed" | "added", string> = {
  removed: "rounded-sm bg-red-300/70 dark:bg-red-700/55",
  added: "rounded-sm bg-green-300/70 dark:bg-green-700/55",
};

function renderCellContent(cell: DiffCell) {
  if (!cell.parts || cell.parts.length === 0) {
    return cell.text || " ";
  }

  const highlightClass =
    cell.type === "removed" || cell.type === "added"
      ? inlineHighlight[cell.type]
      : "";

  return cell.parts.map((part, index) =>
    part.highlight ? (
      <span key={index} className={highlightClass}>
        {part.text}
      </span>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

function DiffPane({
  side,
  rows,
  scrollRef,
  onScroll,
  activeHunk,
  copyButton,
}: {
  side: "left" | "right";
  rows: DiffRow[];
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  activeHunk: { start: number; end: number } | null;
  copyButton: ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute top-2 right-8 z-10">{copyButton}</div>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="max-h-[28rem] overflow-auto"
      >
        <table className="w-full border-collapse font-mono text-xs leading-5 sm:text-sm sm:leading-6">
          <tbody>
            {rows.map((row, i) => {
              const cell = side === "left" ? row.left : row.right;
              const isActive =
                activeHunk !== null &&
                i >= activeHunk.start &&
                i <= activeHunk.end;

              return (
                <tr
                  key={`${side}-${i}`}
                  data-diff-row={i}
                  className={`${cellBg[cell.type]} ${
                    isActive
                      ? "outline outline-2 outline-offset-[-2px] outline-indigo-500 dark:outline-indigo-400"
                      : ""
                  }`}
                >
                  <td
                    className={`w-10 select-none border-r border-zinc-200 px-2 text-right align-top tabular-nums dark:border-zinc-700 ${gutterText[cell.type]}`}
                  >
                    {cell.lineNum ?? ""}
                  </td>
                  <td
                    className={`whitespace-pre-wrap break-all px-3 py-0 pr-14 align-top ${cellText[cell.type]}`}
                  >
                    {renderCellContent(cell)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CopyPaneButton({
  label,
  text,
  copied,
  onCopy,
}: {
  label: string;
  text: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      disabled={!text}
      aria-label={copied ? `${label} copied` : `Copy ${label} code`}
      title={copied ? "Copied!" : `Copy ${label}`}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/95 px-2.5 py-1.5 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-zinc-50 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900/95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5 text-emerald-500"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
          <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
        </svg>
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function CodeComparison() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [activeHunkIndex, setActiveHunkIndex] = useState(0);
  const [copiedSide, setCopiedSide] = useState<"original" | "modified" | null>(
    null,
  );
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  const { rows, added, removed, identical, hunks } = useMemo(() => {
    if (!original && !modified) {
      return {
        rows: [] as DiffRow[],
        added: 0,
        removed: 0,
        identical: false,
        hunks: [] as { start: number; end: number }[],
      };
    }

    const nextRows = buildSideBySide(original, modified, ignoreWhitespace);
    let addedCount = 0;
    let removedCount = 0;

    for (const row of nextRows) {
      if (row.left.type === "removed") removedCount += 1;
      if (row.right.type === "added") addedCount += 1;
    }

    return {
      rows: nextRows,
      added: addedCount,
      removed: removedCount,
      identical: addedCount === 0 && removedCount === 0,
      hunks: getDiffHunks(nextRows),
    };
  }, [original, modified, ignoreWhitespace]);

  useEffect(() => {
    setActiveHunkIndex(0);
  }, [original, modified, ignoreWhitespace]);

  const scrollToHunk = (hunkIndex: number) => {
    const hunk = hunks[hunkIndex];
    const left = leftScrollRef.current;
    if (!hunk || !left) return;

    const row = left.querySelector(
      `[data-diff-row="${hunk.start}"]`,
    ) as HTMLElement | null;
    if (!row) return;

    syncing.current = true;
    const top =
      row.offsetTop - left.clientHeight / 2 + row.offsetHeight / 2;
    left.scrollTop = Math.max(0, top);
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTop = left.scrollTop;
    }
    requestAnimationFrame(() => {
      syncing.current = false;
    });
  };

  const goToHunk = (index: number) => {
    if (hunks.length === 0) return;
    const next = ((index % hunks.length) + hunks.length) % hunks.length;
    setActiveHunkIndex(next);
    requestAnimationFrame(() => scrollToHunk(next));
  };

  const goToPrevDiff = () => goToHunk(activeHunkIndex - 1);
  const goToNextDiff = () => goToHunk(activeHunkIndex + 1);

  const syncScroll = (source: "left" | "right") => {
    if (syncing.current) return;
    const from =
      source === "left" ? leftScrollRef.current : rightScrollRef.current;
    const to =
      source === "left" ? rightScrollRef.current : leftScrollRef.current;
    if (!from || !to) return;

    syncing.current = true;
    to.scrollTop = from.scrollTop;
    to.scrollLeft = from.scrollLeft;
    requestAnimationFrame(() => {
      syncing.current = false;
    });
  };

  const swap = () => {
    setOriginal(modified);
    setModified(original);
  };

  const clear = () => {
    setOriginal("");
    setModified("");
  };

  const copySide = async (side: "original" | "modified") => {
    const text = side === "original" ? original : modified;
    if (!text) return;

    await navigator.clipboard.writeText(text);
    setCopiedSide(side);
    if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    copiedTimeoutRef.current = setTimeout(() => setCopiedSide(null), 2000);
  };

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    };
  }, []);

  const hasInput = Boolean(original || modified);
  const activeHunk = hunks[activeHunkIndex] ?? null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="code-original"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Original
          </label>
          <textarea
            id="code-original"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            rows={12}
            spellCheck={false}
            placeholder="Paste original code…"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label
            htmlFor="code-modified"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Modified
          </label>
          <textarea
            id="code-modified"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            rows={12}
            spellCheck={false}
            placeholder="Paste modified code…"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
          />
          Ignore whitespace differences
        </label>
        <button
          type="button"
          onClick={swap}
          disabled={!hasInput}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Swap sides
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={!hasInput}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Clear
        </button>
      </div>

      {hasInput && (
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/80">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Side-by-side comparison
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs text-zinc-500">
                <span className="text-green-600 dark:text-green-400">
                  +{added} added
                </span>
                <span className="mx-2 text-zinc-300 dark:text-zinc-600">
                  ·
                </span>
                <span className="text-red-600 dark:text-red-400">
                  −{removed} removed
                </span>
              </p>
              {!identical && hunks.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={goToPrevDiff}
                    className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    aria-label="Previous difference"
                  >
                    Prev
                  </button>
                  <span className="min-w-[4.5rem] text-center text-xs tabular-nums text-zinc-500">
                    {activeHunkIndex + 1} / {hunks.length}
                  </span>
                  <button
                    type="button"
                    onClick={goToNextDiff}
                    className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    aria-label="Next difference"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {identical ? (
            <p className="px-4 py-8 text-center text-sm text-zinc-500">
              {ignoreWhitespace
                ? "No differences (ignoring whitespace)."
                : "Both sides are identical."}
            </p>
          ) : (
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-zinc-200 dark:border-zinc-800 lg:border-b-0 lg:border-r">
                <div className="border-b border-zinc-200 bg-zinc-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50">
                  Original
                </div>
                <DiffPane
                  side="left"
                  rows={rows}
                  scrollRef={leftScrollRef}
                  onScroll={() => syncScroll("left")}
                  activeHunk={activeHunk}
                  copyButton={
                    <CopyPaneButton
                      label="original"
                      text={original}
                      copied={copiedSide === "original"}
                      onCopy={() => copySide("original")}
                    />
                  }
                />
              </div>
              <div>
                <div className="border-b border-zinc-200 bg-zinc-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50">
                  Modified
                </div>
                <DiffPane
                  side="right"
                  rows={rows}
                  scrollRef={rightScrollRef}
                  onScroll={() => syncScroll("right")}
                  activeHunk={activeHunk}
                  copyButton={
                    <CopyPaneButton
                      label="modified"
                      text={modified}
                      copied={copiedSide === "modified"}
                      onCopy={() => copySide("modified")}
                    />
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
