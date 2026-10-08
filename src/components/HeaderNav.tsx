"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  categoryLabels,
  categoryNavLabels,
  getCategoryPath,
  getToolsByCategory,
  primaryNavCategories,
  secondaryNavCategories,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

const categories = Object.keys(categoryLabels) as ToolCategory[];
const toolsByCategory = getToolsByCategory();

const linkClassName =
  "block rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-indigo-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-indigo-400";

function ToolLinks({
  tools,
  onNavigate,
}: {
  tools: Tool[];
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {tools.map((tool) => (
        <li key={tool.slug}>
          <Link
            href={`/tools/${tool.slug}`}
            className={linkClassName}
            onClick={onNavigate}
          >
            <span className="mr-2" aria-hidden="true">
              {tool.icon}
            </span>
            {tool.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CategoryDropdown({
  category,
  onNavigate,
}: {
  category: ToolCategory;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    onNavigate?.();
  };

  const navLabel = categoryNavLabels[category];
  const fullLabel = categoryLabels[category];

  return (
    <div ref={ref} className="relative flex items-center gap-0.5">
      <Link
        href={getCategoryPath(category)}
        title={fullLabel}
        className="whitespace-nowrap text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        {navLabel}
      </Link>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={`Show ${fullLabel} tools`}
        className="flex items-center text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-72 max-w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <ToolLinks tools={toolsByCategory[category]} onNavigate={close} />
        </div>
      )}
    </div>
  );
}

function MoreCategoriesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="More tool categories"
        className="whitespace-nowrap text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        More
      </button>
      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {secondaryNavCategories.map((category) => (
            <div key={category} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
              <Link
                href={getCategoryPath(category)}
                className="block px-3 py-2 text-sm font-semibold text-zinc-800 hover:text-indigo-600 dark:text-zinc-200 dark:hover:text-indigo-400"
                onClick={() => setOpen(false)}
              >
                {categoryNavLabels[category]}
              </Link>
              <ToolLinks
                tools={toolsByCategory[category]}
                onNavigate={() => setOpen(false)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  return (
    <nav className="flex shrink-0 items-center gap-3 lg:gap-4">
      <Link
        href="/tools"
        className="hidden whitespace-nowrap text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-600 sm:inline dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        All Tools
      </Link>

      <div className="hidden items-center gap-2 xl:gap-3 lg:flex">
        {primaryNavCategories.map((category) => (
          <CategoryDropdown key={category} category={category} />
        ))}
        <MoreCategoriesMenu />
      </div>

      <div ref={mobileRef} className="relative lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-label="Browse tools"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Tools
        </button>

        {mobileOpen && (
          <div className="absolute right-0 z-50 mt-2 max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <Link
              href="/tools"
              className={`${linkClassName} mb-3 font-medium`}
              onClick={() => setMobileOpen(false)}
            >
              All Tools
            </Link>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category}>
                  <Link
                    href={getCategoryPath(category)}
                    className="mb-2 block px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 hover:text-indigo-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    {categoryLabels[category]}
                  </Link>
                  <ToolLinks
                    tools={toolsByCategory[category]}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
