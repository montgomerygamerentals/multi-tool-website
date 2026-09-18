/**
 * Disabled. The previous enrich pass appended identical boilerplate to every
 * tool page (scaled content). Google often crawls those URLs and then refuses
 * to index them.
 *
 * Edit unique copy in:
 * - src/lib/tool-guides.ts
 * - src/lib/tool-examples.ts
 * - src/lib/tool-seo.ts
 */
console.error(
  "scripts/enrich-tool-guides.mjs is disabled. Edit src/lib/tool-guides.ts, tool-examples.ts, and tool-seo.ts instead.",
);
process.exit(1);
