import Link from "next/link";
import {
  categoryLabels,
  getCategoryPath,
  getToolsByCategory,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

interface RelatedToolsProps {
  tool: Tool;
  limit?: number;
}

export default function RelatedTools({ tool, limit = 6 }: RelatedToolsProps) {
  const toolsByCategory = getToolsByCategory();
  const related = toolsByCategory[tool.category]
    .filter((t) => t.slug !== tool.slug)
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <section
      aria-label="Related tools"
      className="mt-12 border-t border-zinc-200 pt-10 dark:border-zinc-800"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Related {categoryLabels[tool.category as ToolCategory]} tools
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            More free utilities in the same category — each page is linked from
            our{" "}
            <Link
              href="/tools"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              All Tools directory
            </Link>
            .
          </p>
        </div>
        <Link
          href={getCategoryPath(tool.category)}
          className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          View full category →
        </Link>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/tools/${item.slug}`}
              className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
            >
              <span className="mr-2" aria-hidden="true">
                {item.icon}
              </span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {item.name}
              </span>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
