export const SITE_URL = "https://www.fastfreetools.net";
/** Dominant brand. Every title tag uses this spelling — not a second product name. */
export const SITE_NAME = "FastFreeTools";
export const SITE_LEGAL_NAME = "Ferrari Group LLC";
/** Spaced reading of the same brand, for schema only. Do not use in titles or UI. */
export const SITE_ALTERNATE_NAME = "Fast Free Tools";
export const HOME_TITLE = `${SITE_NAME} — Free Online Utilities`;
export const SITE_DESCRIPTION =
  "Free online utility tools — image converters, random name pickers, and more. Fast, private, and runs in your browser.";
/** Real content revision date for sitemaps and modified metadata. Do not use Date.now(). */
export const CONTENT_UPDATED = new Date("2026-10-23T00:00:00.000Z");

/** Full document title. Page-specific text first, then the one brand name. */
export function brandedTitle(pageTitle: string): string {
  const suffix = ` | ${SITE_NAME}`;
  if (pageTitle === SITE_NAME || pageTitle.endsWith(suffix)) return pageTitle;
  return `${pageTitle}${suffix}`;
}
