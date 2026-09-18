import Link from "next/link";
import {
  categoryLabels,
  getCategoryPath,
  getToolsByCategory,
  type ToolCategory,
} from "@/lib/tools";

export default function Footer() {
  const toolsByCategory = getToolsByCategory();
  const categories = Object.keys(categoryLabels) as ToolCategory[];

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              ToolBox
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Fast Free Tools — browser utilities from Ferrari Group LLC. No
              sign-up required. Files and numbers you enter stay on your device
              unless a page says otherwise.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Browse all tools →
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryTools = toolsByCategory[category];
            return (
              <div key={category}>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <Link
                    href={getCategoryPath(category)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {categoryLabels[category]}
                  </Link>
                </p>
                <ul className="mt-3 space-y-2">
                  {categoryTools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-sm text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <nav
          aria-label="About this site"
          className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
        >
          <Link
            href="/about"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contact
          </Link>
          <Link
            href="/tools"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            All tools
          </Link>
        </nav>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} Ferrari Group LLC. Free online
          utilities for everyone.
        </p>
      </div>
    </footer>
  );
}
