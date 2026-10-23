import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredToolSlugsByCategory } from "@/lib/category-featured";
import { categoryHubs } from "@/lib/category-hubs";
import { brandedTitle, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  categoryLabels,
  getToolBySlug,
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
  const hub = categoryHubs[category];
  const title = brandedTitle(`${label} — Free Online Tools`);
  const description = `${hub.summary} Part of ${SITE_NAME}.`;
  const url = `${SITE_URL}/category/${category}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
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
  const hub = categoryHubs[category];
  const toolsInCategory = getToolsByCategory()[category];
  const url = `${SITE_URL}/category/${category}`;
  const pageTitle = brandedTitle(`${label} — Free Online Tools`);
  const featured = (featuredToolSlugsByCategory[category] ?? [])
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: hub.lead,
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
          {hub.lead}
        </p>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {hub.supporting}
        </p>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          {toolsInCategory.length} tools in this category on {SITE_NAME}.
        </p>
      </header>

      <section className="mb-12 max-w-3xl" aria-labelledby="why-local-heading">
        <h2
          id="why-local-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {hub.whyHeading}
        </h2>
        {hub.why.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            {paragraph}
          </p>
        ))}
        <ul className="mt-6 space-y-5">
          {hub.points.map((point) => (
            <li key={point.title}>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                {point.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href="/privacy"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            How {SITE_NAME} handles files and data
          </Link>
        </p>
      </section>

      {featured.length > 0 ? (
        <section className="mb-12" aria-labelledby="featured-heading">
          <h2
            id="featured-heading"
            className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Popular in {label}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-500 dark:text-zinc-400">
            Start with these frequently used tools, then browse the full list
            below.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {featured.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
                >
                  <span className="mr-2" aria-hidden="true">
                    {tool.icon}
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">
                    {tool.name}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {tool.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        All {label} tools
      </h2>
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
