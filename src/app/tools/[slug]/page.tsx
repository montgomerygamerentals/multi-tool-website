import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageLayout from "@/components/ToolPageLayout";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { toolComponents } from "@/lib/tool-components";
import { getToolBySlug, tools } from "@/lib/tools";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) return { title: "Tool Not Found" };

  const title = tool.name;
  const description = tool.description;
  const url = `${SITE_URL}/tools/${tool.slug}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const Component = toolComponents[slug];

  if (!tool || !Component) notFound();

  return (
    <ToolPageLayout tool={tool}>
      <Component />
    </ToolPageLayout>
  );
}
