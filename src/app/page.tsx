import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";
import {
  categoryDescriptions,
  categoryLabels,
  getToolsByCategory,
  type ToolCategory,
} from "@/lib/tools";

export default function Home() {
  const toolsByCategory = getToolsByCategory();
  const categories = Object.keys(categoryLabels) as ToolCategory[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Free Online Tools
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A collection of fast, free utilities that run entirely in your browser.
          No sign-up required — just pick a tool and get started.
        </p>
      </section>

      <AdSlot className="mb-12" />

      <div className="space-y-14">
        {categories.map((category) => {
          const categoryTools = toolsByCategory[category];
          if (categoryTools.length === 0) return null;

          return (
            <section key={category}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {categoryLabels[category]}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {categoryDescriptions[category]}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
