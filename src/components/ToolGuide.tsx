import type { ToolGuide as ToolGuideContent } from "@/lib/tool-guide-types";

interface ToolGuideProps {
  toolName: string;
  guide: ToolGuideContent;
}

function Prose({ children }: { children: string }) {
  return (
    <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
      {children}
    </h2>
  );
}

export default function ToolGuide({ toolName, guide }: ToolGuideProps) {
  const examples = guide.examples ?? [];
  const sections = guide.sections ?? [];

  const faqJsonLd =
    guide.faqs.length > 0
      ? {
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
        }
      : null;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${toolName}`,
    description: guide.whatItDoes.slice(0, 300),
    step: guide.howToUse.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text.replace(/\.$/, "").slice(0, 110),
      text,
    })),
  };

  return (
    <article
      aria-label={`About ${toolName}`}
      className="mt-12 space-y-10 border-t border-zinc-200 pt-10 dark:border-zinc-800"
    >
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {guide.whatIs ? (
        <section>
          <SectionHeading>What is {toolName}?</SectionHeading>
          <Prose>{guide.whatIs}</Prose>
        </section>
      ) : null}

      {guide.howItWorks ? (
        <section>
          <SectionHeading>How it works</SectionHeading>
          <Prose>{guide.howItWorks}</Prose>
        </section>
      ) : null}

      {guide.formula ? (
        <section>
          <SectionHeading>Formula</SectionHeading>
          <div className="mt-3 max-w-3xl whitespace-pre-wrap rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 font-mono text-sm leading-relaxed text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            {guide.formula}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeading>How to use {toolName}</SectionHeading>
        <ol className="mt-3 max-w-3xl list-decimal space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.howToUse.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {examples.length > 0 ? (
        <section>
          <SectionHeading>Worked examples</SectionHeading>
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
        </section>
      ) : null}

      {sections.map((section) => (
        <section key={section.heading}>
          <SectionHeading>{section.heading}</SectionHeading>
          <Prose>{section.body}</Prose>
        </section>
      ))}

      <section>
        <SectionHeading>When to use {toolName}</SectionHeading>
        <Prose>{guide.whyUse}</Prose>
      </section>

      <section>
        <SectionHeading>Common use cases</SectionHeading>
        <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide.useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      </section>

      {guide.supportedFormats.length > 0 ? (
        <section>
          <SectionHeading>Inputs and outputs</SectionHeading>
          <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {guide.supportedFormats.map((format) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <SectionHeading>Privacy</SectionHeading>
        <Prose>{guide.privacy}</Prose>
      </section>

      {guide.faqs.length > 0 ? (
        <section>
          <SectionHeading>Frequently asked questions</SectionHeading>
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
        </section>
      ) : null}
    </article>
  );
}
