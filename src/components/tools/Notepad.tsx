"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

const STORAGE_KEY = "toolbox-notepad";

export default function Notepad() {
  const [text, setText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setText(stored);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, text);
        setSavedFlash(true);
        if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
        flashTimeoutRef.current = setTimeout(() => setSavedFlash(false), 1200);
      } catch {
        // ignore
      }
    }, 400);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [text, hydrated]);

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  }, []);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;

  const copy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }, [text]);

  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "notes.txt";
    link.click();
    URL.revokeObjectURL(url);
  }, [text]);

  const clear = useCallback(() => {
    setText("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="space-y-4">
      <ToolPanel>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Notes autosave in this browser.
            <span
              className={`ml-2 transition-opacity ${
                savedFlash ? "opacity-100" : "opacity-0"
              }`}
            >
              Saved
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copy}
              disabled={!text}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={download}
              disabled={!text}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Download .txt
            </button>
            <button
              type="button"
              onClick={clear}
              disabled={!text}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={18}
          placeholder="Start typing your notes…"
          spellCheck
          className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm leading-relaxed text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            {words} {words === 1 ? "word" : "words"}
          </span>
          <span>
            {characters} {characters === 1 ? "character" : "characters"}
          </span>
        </div>
      </ToolPanel>
    </div>
  );
}
