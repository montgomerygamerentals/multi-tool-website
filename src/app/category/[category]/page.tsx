import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  categoryDescriptions,
  categoryIntros,
  categoryLabels,
  getToolsByCategory,
  isToolCategory,
  type ToolCategory,
} from "@/lib/tools";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categories = Object.keys(categoryLabels) as ToolCategory[];

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isToolCategory(category)) return { title: "Category Not Found" };

  const label = categoryLabels[category];
  const description = `${categoryIntros[category]} Browse every ${label.toLowerCase()} tool on ${SITE_NAME}.`;
  const url = `${SITE_URL}/category/${category}`;

  return {
    title: label,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: `${label} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} | ${SITE_NAME}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isToolCategory(category)) notFound();

  const label = categoryLabels[category];
  const toolsInCategory = getToolsByCategory()[category];
  const url = `${SITE_URL}/category/${category}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} | ${SITE_NAME}`,
    description: categoryIntros[category],
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: toolsInCategory.length,
      itemListElement: toolsInCategory.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${SITE_URL}/tools/${tool.slug}`,
        description: tool.description,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-zinc-500 dark:text-zinc-400"
      >
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link
              href="/"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/tools"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              All Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-700 dark:text-zinc-300">{label}</li>
        </ol>
      </nav>

      <header className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {label}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {categoryIntros[category]}
        </p>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          {categoryDescriptions[category]} {toolsInCategory.length} tools in
          this category.
        </p>
      </header>

      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {toolsInCategory.map((tool) => (
          <li key={tool.slug} className="py-4 first:pt-0">
            <Link
              href={`/tools/${tool.slug}`}
              className="group flex gap-3 sm:items-start"
            >
              <span className="mt-0.5 text-2xl" role="img" aria-hidden="true">
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
    </div>
  );
}
