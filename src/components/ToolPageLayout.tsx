import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";
import ToolGuide from "@/components/ToolGuide";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getToolGuide } from "@/lib/tool-guides";
import { categoryLabels } from "@/lib/tools";
import type { Tool } from "@/lib/tools";

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function ToolPageLayout({
  tool,
  children,
}: ToolPageLayoutProps) {
  const toolUrl = `${SITE_URL}/tools/${tool.slug}`;
  const guide = getToolGuide(tool.slug);
  const categoryLabel = categoryLabels[tool.category];

  const jsonLd = [
    {
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
        {
          "@type": "ListItem",
          position: 3,
          name: categoryLabel,
          item: `${SITE_URL}/tools#${tool.category}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: tool.name,
          item: toolUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      description: tool.description,
      url: toolUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-zinc-500 dark:text-zinc-400"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/tools"
              className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              All Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/tools#${tool.category}`}
              className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {categoryLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-700 dark:text-zinc-300">{tool.name}</li>
        </ol>
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

      <div className="min-w-0">{children}</div>

      {guide ? <ToolGuide toolName={tool.name} guide={guide} /> : null}

      <RelatedTools tool={tool} />
    </div>
  );
}
