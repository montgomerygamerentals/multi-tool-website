import type { ToolGuide as ToolGuideContent } from "@/lib/tool-guide-types";

interface ToolGuideProps {
  toolName: string;
  guide: ToolGuideContent;
}

export default function ToolGuide({ toolName, guide }: ToolGuideProps) {
  const examples = guide.examples ?? [];

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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${toolName}`,
    description: guide.whatItDoes.slice(0, 300),
    step: guide.howToUse.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text.replace(/\.$/, ""),
      text,
    })),
  };

  return (
    <article
      aria-label={`About ${toolName}`}
      className="mt-12 space-y-10 border-t border-zinc-200 pt-10 dark:border-zinc-800"
    >
      {guide.faqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {examples.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Worked examples
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-500 dark:text-zinc-400">
            Concrete numbers and cases you can check against the tool above.
          </p>
          <div className="mt-4 max-w-3xl space-y-5">
            {examples.map((example) => (
              <div
                key={example.title}
                className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {example.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {example.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          When to use {toolName}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.whyUse}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          How to use {toolName}
        </h2>
        <ol className="mt-3 max-w-3xl list-decimal space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.howToUse.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Common use cases
        </h2>
        <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      </div>

      {guide.supportedFormats.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Inputs and outputs
          </h2>
          <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {guide.supportedFormats.map((format) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Privacy
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.privacy}
        </p>
      </div>

      {guide.faqs.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Frequently asked questions
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
      ) : null}
    </article>
  );
}
