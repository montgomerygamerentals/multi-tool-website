import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageLayout from "@/components/ToolPageLayout";
import { toolComponents } from "@/lib/tool-components";
import { getRelatedTools, getToolBySlug, tools } from "@/lib/tools";

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

  return {
    title: tool.name,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const Component = toolComponents[slug];

  if (!tool || !Component) notFound();

  const related = getRelatedTools(slug);

  return (
    <ToolPageLayout tool={tool} relatedTools={related}>
      <Component />
    </ToolPageLayout>
  );
}
