import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_ALTERNATE_NAME,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE_NAME} (${SITE_ALTERNATE_NAME}) is a free collection of browser-based utilities operated by ${SITE_LEGAL_NAME}. Learn who we are and how the tools work.`,
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        About {SITE_NAME}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {SITE_NAME} is the public name of {SITE_ALTERNATE_NAME} (
        <a
          href={SITE_URL}
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          fastfreetools.net
        </a>
        ), a site of {tools.length} small utilities that run in your web
        browser. It is operated by {SITE_LEGAL_NAME}.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Why these pages exist
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
        Each tool is a real working widget plus a short explanation, worked
        examples, and the inputs it accepts. We do not generate filler articles
        to occupy search results. If a calculator has a formula, we show it. If
        an image tool never uploads your file, we say so.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        How processing works
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
        Almost every tool keeps your files, lists, and numbers in this browser
        session. A few calculators (for example live currency rates) call a
        public API for market data only — never your balances. Details are on
        each tool page and in the{" "}
        <Link
          href="/privacy"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          privacy policy
        </Link>
        .
      </p>
      <p className="mt-6">
        <Link
          href="/tools"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Browse all tools →
        </Link>
      </p>
    </div>
  );
}
