import type { ToolGuide as ToolGuideContent } from "@/lib/tool-guide-types";

interface ToolGuideProps {
  toolName: string;
  guide: ToolGuideContent;
}

export default function ToolGuide({ toolName, guide }: ToolGuideProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      aria-label={`About ${toolName}`}
      className="mt-12 space-y-10 border-t border-zinc-200 pt-10 dark:border-zinc-800"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          What the tool does
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.whatItDoes}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          How to use it
        </h2>
        <ol className="mt-3 max-w-3xl list-decimal space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.howToUse.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Supported formats
        </h2>
        <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.supportedFormats.map((format) => (
            <li key={format}>{format}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Privacy &amp; security
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.privacy}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          FAQs
        </h2>
        <dl className="mt-4 max-w-3xl space-y-6">
          {guide.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-medium text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
