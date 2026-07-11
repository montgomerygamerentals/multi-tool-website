"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { categoryLabels, searchTools } from "@/lib/tools";

export default function ToolSearch() {
  const router = useRouter();
  const inputId = useId();
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchTools(query), [query]);
  const showResults = open && query.trim().length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!showResults) return;

    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showResults]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const goToTool = (slug: string) => {
    close();
    router.push(`/tools/${slug}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (query) {
        setQuery("");
        setActiveIndex(0);
      } else {
        setOpen(false);
        inputRef.current?.blur();
      }
      return;
    }

    if (!showResults || results.length === 0) {
      if (event.key === "ArrowDown" && query.trim()) {
        setOpen(true);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const tool = results[activeIndex];
      if (tool) goToTool(tool.slug);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <label htmlFor={inputId} className="sr-only">
        Search tools
      </label>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            showResults && results[activeIndex]
              ? `${listboxId}-${results[activeIndex].slug}`
              : undefined
          }
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search tools…"
          autoComplete="off"
          className="w-full rounded-lg border border-zinc-300 bg-white py-2 pr-3 pl-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>

      {showResults && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="absolute top-full right-0 left-0 z-50 mt-2 max-h-[min(24rem,70vh)] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        >
          {results.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-zinc-500">
              No tools match “{query.trim()}”
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((tool, index) => {
                const active = index === activeIndex;
                return (
                  <li key={tool.slug} role="option" aria-selected={active}>
                    <Link
                      id={`${listboxId}-${tool.slug}`}
                      href={`/tools/${tool.slug}`}
                      onClick={close}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                        active
                          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span className="mt-0.5 text-base" aria-hidden="true">
                        {tool.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {tool.name}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {categoryLabels[tool.category]}
                          {" · "}
                          {tool.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
