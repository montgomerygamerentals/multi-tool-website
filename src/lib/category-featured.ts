import type { ToolCategory } from "@/lib/tools";

/** High-impression or hub tools surfaced near the top of each category page. */
export const featuredToolSlugsByCategory: Record<ToolCategory, string[]> = {
  calculators: [
    "roi-calculator",
    "down-payment-calculator",
    "budget-calculator",
    "buying-power-calculator",
    "sales-tax-calculator",
    "emergency-fund-calculator",
    "mortgage-calculator",
  ],
  "image-media": [
    "png-to-webp",
    "aspect-ratio-finder",
    "image-compressor",
    "image-cropper",
    "image-converter",
    "qr-code-generator",
  ],
  "text-writing": [
    "code-comparison",
    "json-formatter",
    "json-generator",
    "text-diff",
    "regex-tester",
    "word-counter",
  ],
  randomizers: [
    "random-number-generator",
    "team-splitter",
    "name-picker",
    "list-shuffler",
    "dice-roller",
    "coin-flip",
  ],
  health: [
    "tdee-calculator",
    "bmr-calculator",
    "macro-calculator",
    "due-date-calculator",
    "height-comparison",
  ],
  "home-diy": [
    "concrete-calculator",
    "square-footage-calculator",
    "paint-calculator",
    "tile-calculator",
    "fence-calculator",
  ],
  "audio-video": [
    "video-to-mp3",
    "video-compressor",
    "audio-cutter",
  ],
  generators: [
    "invoice-generator",
    "meme-generator",
    "signature-generator",
    "color-palette-generator",
    "printable-calendar",
  ],
};
