export type ToolCategory =
  | "image-media"
  | "randomizers"
  | "text-writing"
  | "calculators";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
}

export const categoryLabels: Record<ToolCategory, string> = {
  "image-media": "Image & Media",
  randomizers: "Randomizers & Games",
  "text-writing": "Text & Writing",
  calculators: "Calculators",
};

export const categoryDescriptions: Record<ToolCategory, string> = {
  "image-media": "Convert, resize, and edit images right in your browser.",
  randomizers: "Pick winners, shuffle lists, and roll the dice.",
  "text-writing": "Format, count, and transform text.",
  calculators: "Quick math and unit conversion tools.",
};

export const tools: Tool[] = [
  // Image & Media
  {
    slug: "image-converter",
    name: "Image Converter",
    description:
      "Convert images between PNG, JPEG, and WebP formats instantly in your browser.",
    category: "image-media",
    icon: "🖼️",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description:
      "Reduce image file size without uploading. Adjust quality and compare savings.",
    category: "image-media",
    icon: "🗜️",
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description:
      "Resize images to exact pixel dimensions or a percentage of the original size.",
    category: "image-media",
    icon: "📐",
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    description:
      "Crop images to a custom region. Perfect for profile photos and thumbnails.",
    category: "image-media",
    icon: "✂️",
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    description:
      "Create favicons from images, text, or emoji. Download a complete package with ICO, PNG, Apple Touch Icon, Android icons, and web manifest.",
    category: "image-media",
    icon: "🔖",
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    description:
      "Convert JPEG images to PNG format with transparency support.",
    category: "image-media",
    icon: "🔄",
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    description:
      "Convert PNG images to JPEG format and reduce file size.",
    category: "image-media",
    icon: "🔄",
  },
  {
    slug: "png-to-webp",
    name: "PNG to WebP Converter",
    description: "Convert PNG images to modern WebP format for faster loading.",
    category: "image-media",
    icon: "🔄",
  },
  {
    slug: "webp-to-png",
    name: "WebP to PNG Converter",
    description: "Convert WebP images to universally compatible PNG format.",
    category: "image-media",
    icon: "🔄",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description:
      "Create QR codes for URLs, text, WiFi, and more. Download as PNG.",
    category: "image-media",
    icon: "📱",
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description:
      "Convert between HEX, RGB, and HSL color formats with a live preview.",
    category: "image-media",
    icon: "🎨",
  },
  // Text & Writing
  {
    slug: "word-counter",
    name: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs. Includes reading time.",
    category: "text-writing",
    icon: "📝",
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case, sentence case, and more.",
    category: "text-writing",
    icon: "🔤",
  },
  {
    slug: "remove-duplicates",
    name: "Remove Duplicate Lines",
    description:
      "Remove duplicate lines from any list. Optionally sort alphabetically.",
    category: "text-writing",
    icon: "🧹",
  },
  {
    slug: "text-diff",
    name: "Text Diff Compare",
    description:
      "Compare two blocks of text side by side and highlight the differences.",
    category: "text-writing",
    icon: "⚖️",
  },
  {
    slug: "code-comparison",
    name: "Code Comparison",
    description:
      "Compare two code snippets side by side with line numbers and highlighted additions and removals.",
    category: "text-writing",
    icon: "💻",
  },

  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description:
      "Generate placeholder text for designs, mockups, and prototypes.",
    category: "text-writing",
    icon: "📄",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description:
      "Format, validate, and minify JSON. Syntax highlighting for easy reading.",
    category: "text-writing",
    icon: "{ }",
  },
  {
    slug: "json-generator",
    name: "JSON Generator",
    description:
      "Generate mock JSON data from a custom schema. Perfect for APIs, prototypes, and testing.",
    category: "text-writing",
    icon: "{+}",
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    description:
      "Encode text to Base64 or decode Base64 strings back to plain text.",
    category: "text-writing",
    icon: "🔐",
  },
  // Calculators
  {
    slug: "password-generator",
    name: "Password Generator",
    description:
      "Generate strong, random passwords with customizable length and characters.",
    category: "calculators",
    icon: "🔑",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description:
      "Convert length, weight, temperature, and volume between common units.",
    category: "calculators",
    icon: "📏",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description:
      "Calculate your Body Mass Index from height and weight in metric or imperial.",
    category: "calculators",
    icon: "⚕️",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description:
      "Calculate your exact age in years, months, and days from your birthdate.",
    category: "calculators",
    icon: "🎂",
  },
  {
    slug: "days-between-dates",
    name: "Days Between Dates",
    description:
      "Calculate the number of days, weeks, and months between two dates.",
    category: "calculators",
    icon: "📅",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description:
      "Find percentages, calculate increases/decreases, and solve percent problems.",
    category: "calculators",
    icon: "％",
  },
  {
    slug: "fraction-decimal-converter",
    name: "Fraction ↔ Decimal Converter",
    description:
      "Convert decimals to simplified fractions and fractions to decimals. Supports mixed numbers.",
    category: "calculators",
    icon: "½",
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description:
      "Calculate tip amount and split the bill between multiple people.",
    category: "calculators",
    icon: "🍽️",
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    description:
      "Calculate monthly payments, total interest, and amortization for loans.",
    category: "calculators",
    icon: "🏦",
  },
  {
    slug: "debt-payoff-calculator",
    name: "Debt Payoff Calculator",
    description:
      "Plan payoff for multiple debts with the avalanche method, extra payments, and a fixed or shrinking monthly budget.",
    category: "calculators",
    icon: "💳",
  },
  // Randomizers
  {
    slug: "name-picker",
    name: "Random Name Picker",
    description:
      "Spin the wheel to randomly pick a name or winner from your list.",
    category: "randomizers",
    icon: "🎡",
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    description:
      "Generate random numbers within a custom range. Pick one or many at once.",
    category: "randomizers",
    icon: "🔢",
  },
  {
    slug: "coin-flip",
    name: "Coin Flip",
    description:
      "Flip a virtual coin — heads or tails. Fast, fair, and fun.",
    category: "randomizers",
    icon: "💰",
  },
  {
    slug: "dice-roller",
    name: "Dice Roller",
    description:
      "Roll virtual dice — choose how many dice and sides. Perfect for games.",
    category: "randomizers",
    icon: "🎲",
  },
  {
    slug: "list-shuffler",
    name: "List Shuffler",
    description: "Randomly shuffle any list into a new order.",
    category: "randomizers",
    icon: "🔀",
  },
  {
    slug: "team-splitter",
    name: "Split into Teams",
    description:
      "Randomly divide a list of names or items into balanced teams.",
    category: "randomizers",
    icon: "👥",
  },
  {
    slug: "yes-no-picker",
    name: "Yes or No Picker",
    description:
      "Can't decide? Let fate choose yes or no for you with one click.",
    category: "randomizers",
    icon: "❓",
  },
  {
    slug: "sudoku",
    name: "Sudoku",
    description:
      "Play classic Sudoku with easy, medium, and hard puzzles. Notes, conflict highlights, and keyboard support.",
    category: "randomizers",
    icon: "9️⃣",
  },
  {
    slug: "wordle",
    name: "Wordle",
    description:
      "Guess the 5-letter word in six tries. Green means correct, yellow means wrong spot.",
    category: "randomizers",
    icon: "🟩",
  },
];

export function getToolsByCategory(): Record<ToolCategory, Tool[]> {
  const grouped = {} as Record<ToolCategory, Tool[]>;

  for (const category of Object.keys(categoryLabels) as ToolCategory[]) {
    grouped[category] = tools.filter((tool) => tool.category === category);
  }

  return grouped;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function searchTools(query: string): Tool[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const terms = normalized.split(/\s+/).filter(Boolean);

  return tools.filter((tool) => {
    const haystack = [
      tool.name,
      tool.description,
      tool.slug.replace(/-/g, " "),
      categoryLabels[tool.category],
    ]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}
