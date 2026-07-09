import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";
import type { Tool } from "@/lib/tools";

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
  relatedTools?: Tool[];
}

export default function ToolPageLayout({
  tool,
  children,
  relatedTools = [],
}: ToolPageLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <AdSlot position="banner" className="mb-8" />

      <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          All Tools
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-700 dark:text-zinc-300">{tool.name}</span>
      </nav>

      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-4xl" role="img" aria-hidden="true">
            {tool.icon}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {tool.name}
          </h1>
        </div>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {tool.description}
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">{children}</div>
        <aside className="hidden shrink-0 lg:block">
          <AdSlot position="sidebar" />
        </aside>
      </div>

      <AdSlot position="inline" className="mt-8 lg:hidden" />

      {relatedTools.length > 0 && (
        <section className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Related tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((related) => (
              <ToolCard key={related.slug} tool={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
