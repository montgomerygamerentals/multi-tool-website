import Link from "next/link";
import {
  categoryLabels,
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
              Free online utilities that run in your browser. No sign-up
              required.
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
            const categoryTools = toolsByCategory[category].slice(0, 6);
            return (
              <div key={category}>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <Link
                    href={`/tools#${category}`}
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
                  {toolsByCategory[category].length > 6 ? (
                    <li>
                      <Link
                        href={`/tools#${category}`}
                        className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        View all →
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} Ferrari Group LLC. Free online
          utilities for everyone.
        </p>
      </div>
    </footer>
  );
}
