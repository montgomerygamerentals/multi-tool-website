import type { Metadata } from "next";
import Link from "next/link";
import {
  categoryDescriptions,
  categoryLabels,
  getCategoryPath,
  getToolsByCategory,
  tools,
  type ToolCategory,
} from "@/lib/tools";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Tools Directory",
  description: `Browse every free online tool on ${SITE_NAME} — image converters, calculators, text utilities, randomizers, and more. Fully interlinked directory for easy discovery.`,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/tools`,
    siteName: SITE_NAME,
    title: `All Tools Directory | ${SITE_NAME}`,
    description: `Browse every free online tool on ${SITE_NAME}. Image, text, calculator, and randomizer utilities that run in your browser.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `All Tools Directory | ${SITE_NAME}`,
    description: `Browse every free online tool on ${SITE_NAME}.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolsDirectoryPage() {
  const toolsByCategory = getToolsByCategory();
  const categories = Object.keys(categoryLabels) as ToolCategory[];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `All Tools Directory | ${SITE_NAME}`,
    description: `Complete directory of ${tools.length} free browser-based utility tools.`,
    url: `${SITE_URL}/tools`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${SITE_URL}/tools/${tool.slug}`,
        description: tool.description,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All Tools",
        item: `${SITE_URL}/tools`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-zinc-500 dark:text-zinc-400"
      >
        <Link
          href="/"
          className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-700 dark:text-zinc-300">All Tools</span>
      </nav>

      <header className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          All Tools Directory
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Explore all {tools.length} free utilities on {SITE_NAME}. Every tool
          runs in your browser — no sign-up required. Use this directory as the
          hub: each category links to every individual tool page so you (and
          search engines) can discover converters, calculators, text utilities,
          and randomizers in one place.
        </p>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Prefer a visual card layout? Visit the{" "}
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            home page
          </Link>{" "}
          for the same collection with larger previews. Jump to a category:
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category}>
              <a
                href={getCategoryPath(category)}
                className="inline-block rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
              >
                {categoryLabels[category]} (
                {toolsByCategory[category].length})
              </a>
            </li>
          ))}
        </ul>
      </header>

      <div className="space-y-14">
        {categories.map((category) => {
          const categoryTools = toolsByCategory[category];
          if (categoryTools.length === 0) return null;

          return (
            <section
              key={category}
              id={category}
              className="scroll-mt-24"
              aria-labelledby={`${category}-heading`}
            >
              <div className="mb-5 border-b border-zinc-200 pb-3 dark:border-zinc-800">
                <h2
                  id={`${category}-heading`}
                  className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50"
                >
                  {categoryLabels[category]}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {categoryDescriptions[category]} {categoryTools.length} tools
                  in this category.
                </p>
              </div>

              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {categoryTools.map((tool) => (
                  <li key={tool.slug} className="py-3 first:pt-0 last:pb-0">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="group flex gap-3 sm:items-start"
                    >
                      <span
                        className="mt-0.5 text-2xl"
                        role="img"
                        aria-hidden="true"
                      >
                        {tool.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-50 dark:group-hover:text-indigo-400">
                          {tool.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {tool.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <aside className="mt-14 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          About this directory
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          This page lists every public tool URL on {SITE_NAME} in one crawlable
          hub. Individual tool pages include how-to steps, use cases, privacy
          notes, and FAQ schema so each utility can be understood and indexed on
          its own. If you landed here from search, pick any tool above — or
          return to the{" "}
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            homepage
          </Link>{" "}
          to browse by category cards.
        </p>
      </aside>
    </div>
  );
}
