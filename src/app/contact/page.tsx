import type { Metadata } from "next";
import {
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} (${SITE_LEGAL_NAME}) about the free tools on fastfreetools.net.`,
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Contact
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
        {SITE_NAME} is operated by {SITE_LEGAL_NAME}. For questions about a
        tool, privacy, or this website, email{" "}
        <a
          href="mailto:hello@fastfreetools.net"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          hello@fastfreetools.net
        </a>
        .
      </p>
      <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
        We do not provide financial, tax, medical, or legal advice. Calculator
        results are educational estimates. If a tool failed on a specific file,
        include the tool URL and what you expected to happen — not the private
        file itself.
      </p>
    </div>
  );
}
