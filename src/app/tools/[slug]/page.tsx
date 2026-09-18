import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageLayout from "@/components/ToolPageLayout";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { toolComponents } from "@/lib/tool-components";
import { getToolSeo } from "@/lib/tool-seo";
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

  const seo = getToolSeo(tool);
  const url = `${SITE_URL}/tools/${tool.slug}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: `${seo.title} | ${SITE_NAME}`,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} | ${SITE_NAME}`,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const dynamicParams = false;

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
