import type { Metadata } from "next";
import Link from "next/link";
import { SITE_LEGAL_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles data. Most tools process files and numbers in your browser. This policy covers cookies, ads, and the few network requests we make.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: September 18, 2026</p>
      <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
        {SITE_NAME} is operated by {SITE_LEGAL_NAME} (“we”). This site is
        designed so that most work happens on your device. We do not ask you to
        create an account.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        What stays in your browser
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
        Image converters, compressors, croppers, PDF helpers, text utilities,
        hashes, passwords, and most calculators process what you type or upload
        locally. Closing the tab discards that data unless a tool explicitly
        saves to this browser’s local storage (the notepad is one example). We
        do not receive those files on our servers.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Network requests
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
        The site itself is served from our hosting provider. Some pages may
        request public data such as exchange rates; those requests send currency
        codes, not your balances. Advertising (Google AdSense) and analytics
        (Vercel Analytics) load third-party scripts that may set cookies or
        collect standard usage data under those vendors’ policies.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Advertising
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
        Google AdSense may show ads and use cookies to serve and measure them.
        You can review Google’s advertising policies and opt-out tools on
        Google’s sites. We do not sell a list of the files you processed —
        because we never receive that list.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Contact
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
        Privacy questions: use the{" "}
        <Link
          href="/contact"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          contact page
        </Link>
        .
      </p>
    </div>
  );
}
