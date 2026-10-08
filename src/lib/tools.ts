export type ToolCategory =
  | "image-media"
  | "randomizers"
  | "text-writing"
  | "calculators"
  | "health"
  | "home-diy"
  | "audio-video"
  | "generators";

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
  "text-writing": "Text, Writing & Developer Tools",
  calculators: "Calculators & Converters",
  health: "Health & Fitness",
  "home-diy": "Home & DIY",
  "audio-video": "Audio & Video",
  generators: "Generators",
};

/** Compact labels for the header nav so the search field keeps usable width. */
export const categoryNavLabels: Record<ToolCategory, string> = {
  "image-media": "Images",
  randomizers: "Randomizers",
  "text-writing": "Text & Dev",
  calculators: "Calculators",
  health: "Health",
  "home-diy": "Home",
  "audio-video": "Audio/Video",
  generators: "Generators",
};

/** Primary nav categories shown inline; the rest fold into a More menu. */
export const primaryNavCategories: ToolCategory[] = [
  "image-media",
  "calculators",
  "text-writing",
  "randomizers",
];

export const secondaryNavCategories: ToolCategory[] = [
  "health",
  "home-diy",
  "audio-video",
  "generators",
];

export const categoryDescriptions: Record<ToolCategory, string> = {
  "image-media":
    "Convert formats, compress, crop, resize, and inspect images in your browser.",
  randomizers:
    "Pick winners, generate numbers, shuffle lists, and split teams fairly.",
  "text-writing":
    "Compare code, format JSON, test regex, count words, and transform text.",
  calculators:
    "Finance, tax, ROI, budget, mortgage, and everyday math calculators.",
  health:
    "Calorie, TDEE, BMR, macros, height comparison, and pregnancy due-date tools.",
  "home-diy":
    "Concrete, paint, tile, fence, deck, mulch, roof pitch, and square-footage calculators.",
  "audio-video":
    "Convert video to MP3, compress video, and trim audio for ringtones in your browser.",
  generators:
    "Invoices, signatures, memes, name ideas, calendars, and color palettes — built locally.",
};

export const categoryIntros: Record<ToolCategory, string> = {
  "image-media":
    "Free browser-based image tools for PNG/WebP/JPEG conversion, compression, cropping, aspect-ratio checks, EXIF inspection, favicons, and QR codes. Each converter and editor runs locally so your files are not uploaded to a remote farm. Start with the tool you need, then move to a related utility from the same category.",
  randomizers:
    "Fair randomizers for classrooms, giveaways, game nights, and workshops — name pickers, random number generators, dice, list shufflers, and team splitters. Paste your own list, generate a result, and keep names on this device.",
  "text-writing":
    "Text and developer utilities for code comparison, JSON formatting and mock data, regex testing, Markdown preview, hashes, UUIDs, Base64, word counts, and case conversion. Paste locally when drafts or configs should not leave your machine.",
  calculators:
    "Payment, tax, ROI, budget, down payment, mortgage, savings, and everyday math calculators. Each page shows how the math works, with worked examples you can verify before you rely on a result. No account required.",
  health:
    "Browser-based health calculators for daily calories and TDEE, BMR, macros, height comparison, and pregnancy due dates. Enter your numbers locally — nothing is stored on a server.",
  "home-diy":
    "Project estimators for concrete volume, square footage, roof pitch, decks, mulch, paint coverage, tile, and fencing. Use them to ballpark materials before you order — then confirm with a pro for structural work.",
  "audio-video":
    "Client-side audio and video utilities powered by your browser (and ffmpeg.wasm where needed). Convert video to MP3, compress clips, and cut ringtones without uploading files to a remote encoder.",
  generators:
    "Create invoices, quotes, receipts, e-signatures, email signatures, memes, printable calendars, name ideas, and color palettes. Exports and drafts stay on this device unless a page says otherwise.",
};

export function isToolCategory(value: string): value is ToolCategory {
  return Object.prototype.hasOwnProperty.call(categoryLabels, value);
}

export function getCategoryPath(category: ToolCategory): string {
  return `/category/${category}`;
}

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
      "Crop images to a custom rectangle or circle. Perfect for profile photos, thumbnails, and avatars.",
    category: "image-media",
    icon: "✂️",
  },
  {
    slug: "aspect-ratio-finder",
    name: "Aspect Ratio Finder",
    description:
      "Find an image’s aspect ratio from its width and height, plus orientation and the closest common ratio (16:9, 4:3, 1:1, and more).",
    category: "image-media",
    icon: "▣",
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    description:
      "Make solid or simple backgrounds transparent. Adjust tolerance, soft edges, and download a PNG.",
    category: "image-media",
    icon: "🪄",
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
    description:
      "Convert PNG images to WebP in your browser for smaller web assets — no upload required.",
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
  {
    slug: "pdf-tools",
    name: "PDF Tools",
    description:
      "Merge PDFs, extract pages, or turn images into a PDF — all in your browser.",
    category: "image-media",
    icon: "📎",
  },
  {
    slug: "exif-viewer",
    name: "EXIF Metadata Viewer",
    description:
      "Inspect image EXIF data and download a JPEG copy with metadata removed.",
    category: "image-media",
    icon: "🔎",
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
    slug: "notepad",
    name: "Notepad",
    description:
      "A simple notepad that autosaves in your browser. Copy or download your notes anytime.",
    category: "text-writing",
    icon: "🗒️",
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
    name: "Code Comparison Tool",
    description:
      "Compare two code snippets side by side — line numbers, added/removed highlighting, and optional whitespace-ignore diff.",
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
  {
    slug: "markdown-editor",
    name: "Markdown Editor",
    description:
      "Write Markdown and preview the rendered HTML side by side in your browser.",
    category: "text-writing",
    icon: "📑",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description:
      "Test regular expressions against sample text with live match highlighting.",
    category: "text-writing",
    icon: ".*",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description:
      "Generate MD5, SHA-1, SHA-256, and other hashes from text or files.",
    category: "text-writing",
    icon: "#",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description:
      "Generate random UUID v4 identifiers one at a time or in bulk.",
    category: "text-writing",
    icon: "🪪",
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
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    description:
      "Free mortgage payment calculator — estimate monthly P&I, total interest, and payments with taxes and insurance.",
    category: "calculators",
    icon: "🏠",
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description:
      "Calculate compound interest and future value with optional monthly contributions. Free online savings growth tool.",
    category: "calculators",
    icon: "📈",
  },
  {
    slug: "roi-calculator",
    name: "ROI Calculator",
    description:
      "Free online return on investment calculator — simple ROI and annualized ROI from cost and final value or gain.",
    category: "calculators",
    icon: "💹",
  },
  {
    slug: "retirement-calculator",
    name: "Retirement Savings Calculator",
    description:
      "Project your retirement nest egg from current savings, monthly contributions, and expected annual return.",
    category: "calculators",
    icon: "🌴",
  },
  {
    slug: "budget-calculator",
    name: "Budget Calculator",
    description:
      "Build a simple monthly budget — track income vs expenses and see how much you have left over.",
    category: "calculators",
    icon: "🧾",
  },
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    description:
      "Add or remove sales tax from a price. Instantly calculate tax amount and totals for any rate.",
    category: "calculators",
    icon: "🏷️",
  },
  {
    slug: "income-tax-estimator",
    name: "Income Tax Estimator",
    description:
      "Estimate U.S. federal income tax from taxable income using current tax brackets. Free rough calculator — not tax advice.",
    category: "calculators",
    icon: "🧮",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description:
      "Convert between world currencies with a live or manual exchange rate. Fast free FX calculator in your browser.",
    category: "calculators",
    icon: "💱",
  },
  {
    slug: "salary-hourly-converter",
    name: "Salary to Hourly Converter",
    description:
      "Convert annual salary to hourly wage (and back). See monthly, biweekly, weekly, and hourly pay instantly.",
    category: "calculators",
    icon: "💼",
  },
  {
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    description:
      "See how inflation changes purchasing power over time. Compare dollar values between years at any inflation rate.",
    category: "calculators",
    icon: "📉",
  },
  {
    slug: "buying-power-calculator",
    name: "Dollar Buying Power Calculator",
    description:
      "Find out how much money from one year is worth in another using historical U.S. CPI data — what a dollar was worth then vs now.",
    category: "calculators",
    icon: "💵",
  },
  {
    slug: "refinance-calculator",
    name: "Refinance Calculator",
    description:
      "Compare your current loan to a refinance offer — monthly savings, break-even time, and total interest.",
    category: "calculators",
    icon: "🔁",
  },
  {
    slug: "credit-card-payoff-calculator",
    name: "Credit Card Payoff Calculator",
    description:
      "Estimate how long to pay off a credit card balance and total interest at your monthly payment and APR.",
    category: "calculators",
    icon: "💳",
  },
  {
    slug: "down-payment-calculator",
    name: "Down Payment Calculator",
    description:
      "Calculate home down payment amount, percent, or purchase price — and see how down payment changes the loan amount.",
    category: "calculators",
    icon: "🏡",
  },
  {
    slug: "amortization-schedule",
    name: "Amortization Schedule Calculator",
    description:
      "Generate a full loan amortization schedule with monthly principal, interest, and balance. Download as CSV.",
    category: "calculators",
    icon: "📋",
  },
  {
    slug: "net-worth-calculator",
    name: "Net Worth Calculator",
    description:
      "Add up assets and liabilities to calculate your net worth. Free personal balance sheet tool — private in your browser.",
    category: "calculators",
    icon: "⚖️",
  },
  {
    slug: "emergency-fund-calculator",
    name: "Emergency Fund Calculator",
    description:
      "Find your emergency fund target from monthly expenses and months of coverage. Track how much you still need.",
    category: "calculators",
    icon: "🛟",
  },
  {
    slug: "401k-calculator",
    name: "401(k) Contribution Calculator",
    description:
      "Estimate employee and employer 401(k) contributions with match rules, plus optional growth projection.",
    category: "calculators",
    icon: "🏦",
  },
  {
    slug: "apr-calculator",
    name: "APR Calculator",
    description:
      "Estimate the true APR of a loan including fees and points — compare stated interest rate vs real cost.",
    category: "calculators",
    icon: "📊",
  },
  {
    slug: "discount-markup-calculator",
    name: "Discount & Markup Calculator",
    description:
      "Calculate sale price after a discount, markup from cost, or selling price from desired profit margin.",
    category: "calculators",
    icon: "🛍️",
  },
  {
    slug: "break-even-calculator",
    name: "Break-Even Calculator",
    description:
      "Find break-even units and revenue from fixed costs, variable cost per unit, and selling price.",
    category: "calculators",
    icon: "🎯",
  },
  {
    slug: "timezone-converter",
    name: "Timezone Converter",
    description:
      "Convert a date and time between time zones and check the time around the world.",
    category: "calculators",
    icon: "🌍",
  },
  {
    slug: "timer",
    name: "Stopwatch & Timer",
    description:
      "Run a stopwatch with laps or set a countdown timer — all in your browser.",
    category: "calculators",
    icon: "⏱️",
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
    name: "Team Splitter",
    description:
      "Randomly divide a list of names into balanced teams for games, classes, and workshops.",
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
  {
    slug: "spin-the-wheel",
    name: "Spin the Wheel",
    description:
      "Spin a customizable wheel to pick a random winner from your list of names or options.",
    category: "randomizers",
    icon: "🎡",
  },
  {
    slug: "days-from-today",
    name: "Days From Today",
    description:
      "Add or subtract days, weeks, or business days from today and see the resulting calendar date.",
    category: "calculators",
    icon: "📆",
  },
  {
    slug: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    description:
      "Calculate selling price from cost and desired profit margin — free online margin tool.",
    category: "calculators",
    icon: "📊",
  },
  {
    slug: "ratio-proportion-calculator",
    name: "Ratio & Proportion Calculator",
    description:
      "Solve for the missing value in a proportion a/b = c/d with clear step-by-step math.",
    category: "calculators",
    icon: "➗",
  },
  {
    slug: "lcm-calculator",
    name: "LCM Calculator",
    description:
      "Find the least common multiple of two or more integers and see the calculation steps.",
    category: "calculators",
    icon: "🔢",
  },
  {
    slug: "gcf-calculator",
    name: "GCF Calculator",
    description:
      "Find the greatest common factor (GCD) of numbers with Euclidean algorithm steps.",
    category: "calculators",
    icon: "🧩",
  },
  {
    slug: "final-grade-calculator",
    name: "Final Grade Calculator",
    description:
      "Find what score you need on the final exam to reach your target course grade.",
    category: "calculators",
    icon: "📝",
  },
  {
    slug: "weighted-grade-calculator",
    name: "Weighted Grade Calculator",
    description:
      "Combine category scores and weights into your overall course average.",
    category: "calculators",
    icon: "⚖️",
  },
  {
    slug: "test-grade-calculator",
    name: "Test Grade Calculator",
    description:
      "See what score you need on your next test to hit a target overall grade.",
    category: "calculators",
    icon: "✏️",
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    description:
      "Calculate high school or college GPA with weighted or unweighted scales.",
    category: "calculators",
    icon: "🎓",
  },
  {
    slug: "prime-factor-calculator",
    name: "Prime Number & Factor Calculator",
    description:
      "Check if a number is prime and list its factors or prime factorization with steps.",
    category: "calculators",
    icon: "⚛️",
  },
  {
    slug: "slope-calculator",
    name: "Slope Calculator",
    description:
      "Find the slope between two points, see the line equation, graph, and steps.",
    category: "calculators",
    icon: "📈",
  },
  {
    slug: "area-of-circle",
    name: "Area of a Circle Calculator",
    description: "Calculate circle area from radius with the πr² formula and steps.",
    category: "calculators",
    icon: "⭕",
  },
  {
    slug: "area-of-rectangle",
    name: "Area of a Rectangle Calculator",
    description: "Calculate rectangle area from length and width with clear steps.",
    category: "calculators",
    icon: "▭",
  },
  {
    slug: "area-of-triangle",
    name: "Area of a Triangle Calculator",
    description: "Calculate triangle area from base and height with step-by-step math.",
    category: "calculators",
    icon: "△",
  },
  {
    slug: "area-of-trapezoid",
    name: "Area of a Trapezoid Calculator",
    description: "Calculate trapezoid area from two bases and height with steps.",
    category: "calculators",
    icon: "⏢",
  },
  {
    slug: "volume-of-sphere",
    name: "Volume of a Sphere Calculator",
    description: "Calculate sphere volume from radius using (4/3)πr³ with steps.",
    category: "calculators",
    icon: "🔵",
  },
  {
    slug: "volume-of-cylinder",
    name: "Volume of a Cylinder Calculator",
    description: "Calculate cylinder volume from radius and height with steps.",
    category: "calculators",
    icon: "🛢️",
  },
  {
    slug: "volume-of-cone",
    name: "Volume of a Cone Calculator",
    description: "Calculate cone volume from radius and height with steps.",
    category: "calculators",
    icon: "🍦",
  },
  {
    slug: "volume-of-cube",
    name: "Volume of a Cube Calculator",
    description: "Calculate cube volume from side length with steps.",
    category: "calculators",
    icon: "🧊",
  },
  {
    slug: "volume-of-rectangular-prism",
    name: "Volume of a Rectangular Prism Calculator",
    description: "Calculate rectangular prism (box) volume from length, width, and height.",
    category: "calculators",
    icon: "📦",
  },
  {
    slug: "volume-of-pyramid",
    name: "Volume of a Pyramid Calculator",
    description: "Calculate pyramid volume from base area and height with steps.",
    category: "calculators",
    icon: "▲",
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    description:
      "Convert between binary, decimal, hex, octal, and text-to-binary in your browser.",
    category: "text-writing",
    icon: "01",
  },
  {
    slug: "binary-to-decimal",
    name: "Binary to Decimal Converter",
    description: "Convert binary numbers to decimal with clear place-value steps.",
    category: "text-writing",
    icon: "01",
  },
  {
    slug: "decimal-to-binary",
    name: "Decimal to Binary Converter",
    description: "Convert decimal integers to binary using repeated division by 2.",
    category: "text-writing",
    icon: "01",
  },
  {
    slug: "binary-to-hex",
    name: "Binary to Hex Converter",
    description: "Convert binary values to hexadecimal for programming and networking.",
    category: "text-writing",
    icon: "0x",
  },
  {
    slug: "hex-to-binary",
    name: "Hex to Binary Converter",
    description: "Convert hexadecimal values to binary bit strings instantly.",
    category: "text-writing",
    icon: "0x",
  },
  {
    slug: "decimal-to-hex",
    name: "Decimal to Hex Converter",
    description: "Convert decimal numbers to hexadecimal for coding and debugging.",
    category: "text-writing",
    icon: "0x",
  },
  {
    slug: "hex-to-decimal",
    name: "Hex to Decimal Converter",
    description: "Convert hexadecimal values to everyday decimal numbers.",
    category: "text-writing",
    icon: "0x",
  },
  {
    slug: "decimal-to-octal",
    name: "Decimal to Octal Converter",
    description: "Convert decimal integers to octal (base 8) with steps.",
    category: "text-writing",
    icon: "8",
  },
  {
    slug: "octal-to-decimal",
    name: "Octal to Decimal Converter",
    description: "Convert octal numbers to decimal for math and computing tasks.",
    category: "text-writing",
    icon: "8",
  },
  {
    slug: "text-to-binary",
    name: "Text to Binary Converter",
    description: "Convert plain text to binary (UTF-8 bytes) for learning and demos.",
    category: "text-writing",
    icon: "💬",
  },
  {
    slug: "binary-to-text",
    name: "Binary to Text Converter",
    description: "Decode binary byte strings back into readable UTF-8 text.",
    category: "text-writing",
    icon: "💬",
  },
  {
    slug: "time-card-calculator",
    name: "Hours / Time Card Calculator",
    description:
      "Add daily start, end, and break times to total hours worked for a pay period.",
    category: "calculators",
    icon: "🕒",
  },
  {
    slug: "military-time-converter",
    name: "Military Time Converter",
    description: "Convert between 12-hour and 24-hour (military) time formats.",
    category: "calculators",
    icon: "🪖",
  },
  {
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    description:
      "Browser scientific calculator with trig, logs, powers, roots, and parentheses.",
    category: "calculators",
    icon: "🧮",
  },
  {
    slug: "fancy-text-generator",
    name: "Fancy Text Generator",
    description:
      "Turn plain text into bold, italic, script, bubble, and other Unicode styles for social posts.",
    category: "text-writing",
    icon: "✨",
  },
  {
    slug: "fancy-text-bold",
    name: "Bold Fancy Text",
    description:
      "Convert letters to mathematical bold Unicode for bios, Discord, and captions.",
    category: "text-writing",
    icon: "𝐁",
  },
  {
    slug: "fancy-text-italic",
    name: "Italic Fancy Text",
    description:
      "Make slanted Unicode italic text for captions and usernames.",
    category: "text-writing",
    icon: "𝐼",
  },
  {
    slug: "fancy-text-script",
    name: "Script Fancy Text",
    description:
      "Generate elegant script-style Unicode letters for bios and headers.",
    category: "text-writing",
    icon: "𝒮",
  },
  {
    slug: "fancy-text-small-caps",
    name: "Small Caps Fancy Text",
    description:
      "Create small-cap Unicode text for titles and refined labels.",
    category: "text-writing",
    icon: "ꜱ",
  },
  {
    slug: "fancy-text-upside-down",
    name: "Upside Down Text",
    description:
      "Flip text upside down for jokes, puzzles, and social posts.",
    category: "text-writing",
    icon: "🙃",
  },
  {
    slug: "fancy-text-bubble",
    name: "Bubble Letter Text",
    description:
      "Wrap letters in bubble or circled Unicode for playful headlines.",
    category: "text-writing",
    icon: "🫧",
  },
  {
    slug: "fancy-text-monospace",
    name: "Monospace Fancy Text",
    description:
      "Convert text to monospace Unicode for code-like bios and terminal aesthetics.",
    category: "text-writing",
    icon: "𝙼",
  },
  {
    slug: "fancy-text-fullwidth",
    name: "Fullwidth Text",
    description:
      "Expand characters to fullwidth Unicode for vaporwave-style spacing.",
    category: "text-writing",
    icon: "Ｆ",
  },
  {
    slug: "word-unscrambler",
    name: "Word Unscrambler",
    description: "Unscramble letters into valid English words from a built-in dictionary.",
    category: "text-writing",
    icon: "🔤",
  },
  {
    slug: "typing-speed-test",
    name: "Typing Speed Test",
    description: "Measure WPM and accuracy with a standard English typing test.",
    category: "randomizers",
    icon: "⌨️",
  },
  {
    slug: "typing-speed-test-numbers",
    name: "Number Typing Test",
    description: "Practice typing numbers and symbols with a timed test.",
    category: "randomizers",
    icon: "🔢",
  },
  {
    slug: "name-generator-band",
    name: "Band Name Generator",
    description: "Random band name ideas for your next project.",
    category: "generators",
    icon: "🎸",
  },
  {
    slug: "name-generator-podcast",
    name: "Podcast Name Generator",
    description: "Catchy podcast title ideas in one click.",
    category: "generators",
    icon: "🎙️",
  },
  {
    slug: "name-generator-dnd",
    name: "D&D Name Generator",
    description: "Fantasy character names for tabletop RPGs.",
    category: "generators",
    icon: "🐉",
  },
  {
    slug: "name-generator-clan",
    name: "Clan Name Generator",
    description: "Clan and guild names for games and teams.",
    category: "generators",
    icon: "⚔️",
  },
  {
    slug: "name-generator-gamer-tag",
    name: "Gamer Tag Generator",
    description: "Unique gamer tag and username ideas.",
    category: "generators",
    icon: "🎮",
  },
  {
    slug: "name-generator-business",
    name: "Business Name Generator",
    description: "Startup and business name ideas.",
    category: "generators",
    icon: "💼",
  },
  {
    slug: "name-generator-baby",
    name: "Baby Name Generator",
    description: "Inspiration for baby name combinations.",
    category: "generators",
    icon: "👶",
  },
  {
    slug: "name-generator-pet",
    name: "Pet Name Generator",
    description: "Fun pet name ideas for dogs, cats, and more.",
    category: "generators",
    icon: "🐾",
  },
  {
    slug: "text-to-speech",
    name: "Text to Speech",
    description: "Listen to text with browser voices — adjust rate and pitch.",
    category: "text-writing",
    icon: "🔊",
  },
  {
    slug: "height-comparison",
    name: "Height Comparison",
    description: "Compare two heights side by side in feet or centimeters.",
    category: "health",
    icon: "📏",
  },
  {
    slug: "yaml-to-json",
    name: "YAML to JSON",
    description: "Convert YAML to JSON in your browser.",
    category: "text-writing",
    icon: "📄",
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    description: "Convert CSV spreadsheets to JSON arrays.",
    category: "text-writing",
    icon: "📊",
  },
  {
    slug: "xml-to-json",
    name: "XML to JSON",
    description: "Convert XML documents to JSON with DOMParser.",
    category: "text-writing",
    icon: "🗂️",
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode JWT header and payload (no signature verification).",
    category: "text-writing",
    icon: "🔐",
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description: "Encode or decode URI components and full URLs.",
    category: "text-writing",
    icon: "🔗",
  },
  {
    slug: "html-minifier",
    name: "HTML Minifier",
    description: "Remove comments and extra whitespace from HTML.",
    category: "text-writing",
    icon: "🌐",
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    description: "Minify CSS by stripping comments and spaces.",
    category: "text-writing",
    icon: "🎨",
  },
  {
    slug: "js-minifier",
    name: "JavaScript Minifier",
    description: "Basic JS minifier that preserves strings and comments safely.",
    category: "text-writing",
    icon: "📜",
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    description: "Convert WebP images to JPEG in your browser.",
    category: "image-media",
    icon: "🖼️",
  },
  {
    slug: "jpg-to-webp",
    name: "JPG to WebP",
    description: "Convert JPEG photos to smaller WebP files.",
    category: "image-media",
    icon: "🖼️",
  },
  {
    slug: "avif-to-jpg",
    name: "AVIF to JPG",
    description: "Convert AVIF images to JPEG when your browser supports AVIF.",
    category: "image-media",
    icon: "🖼️",
  },
  {
    slug: "avif-to-png",
    name: "AVIF to PNG",
    description: "Convert AVIF images to PNG with transparency preserved.",
    category: "image-media",
    icon: "🖼️",
  },
  {
    slug: "svg-to-png",
    name: "SVG to PNG",
    description: "Rasterize SVG vector files to PNG.",
    category: "image-media",
    icon: "📐",
  },
  {
    slug: "png-to-ico",
    name: "PNG to ICO",
    description: "Create a multi-size favicon ICO from a PNG image.",
    category: "image-media",
    icon: "⭐",
  },
  {
    slug: "tiff-to-jpg",
    name: "TIFF to JPG",
    description: "Convert TIFF images to JPEG when the browser can decode them.",
    category: "image-media",
    icon: "🖼️",
  },
  {
    slug: "heic-to-jpg",
    name: "HEIC to JPG",
    description: "Convert iPhone HEIC photos to JPEG locally.",
    category: "image-media",
    icon: "📱",
  },
  {
    slug: "heic-to-png",
    name: "HEIC to PNG",
    description: "Convert HEIC/HEIF images to PNG in the browser.",
    category: "image-media",
    icon: "📱",
  },
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Sample dominant colors from an uploaded image.",
    category: "generators",
    icon: "🎨",
  },
  {
    slug: "contrast-checker",
    name: "Contrast Checker",
    description: "Check WCAG contrast ratio between text and background colors.",
    category: "generators",
    icon: "👁️",
  },
  {
    slug: "gradient-generator",
    name: "CSS Gradient Generator",
    description: "Build linear gradients and copy CSS.",
    category: "generators",
    icon: "🌈",
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    description: "Create invoices with line items and export PDF.",
    category: "generators",
    icon: "🧾",
  },
  {
    slug: "receipt-generator",
    name: "Receipt Generator",
    description: "Simple receipt maker with PDF download.",
    category: "generators",
    icon: "🧾",
  },
  {
    slug: "quote-generator",
    name: "Quote Generator",
    description: "Build client quotes with totals and PDF export.",
    category: "generators",
    icon: "💬",
  },
  {
    slug: "signature-generator",
    name: "Signature Generator",
    description: "Draw or type a signature and download PNG.",
    category: "generators",
    icon: "✍️",
  },
  {
    slug: "email-signature-generator",
    name: "Email Signature Generator",
    description: "Gmail and Outlook HTML email signature builder.",
    category: "generators",
    icon: "📧",
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    description: "Add top and bottom text to an image and download.",
    category: "generators",
    icon: "😂",
  },
  {
    slug: "printable-calendar",
    name: "Printable Calendar",
    description: "Pick a year and month, then print a clean calendar page.",
    category: "generators",
    icon: "📅",
  },
  {
    slug: "printable-calendar-2026",
    name: "Printable Calendar 2026",
    description: "Print-friendly calendar for the year 2026.",
    category: "generators",
    icon: "📅",
  },
  {
    slug: "printable-calendar-2027",
    name: "Printable Calendar 2027",
    description: "Print-friendly calendar for the year 2027.",
    category: "generators",
    icon: "📅",
  },
  {
    slug: "printable-calendar-january-2027",
    name: "January 2027 Calendar",
    description: "Printable January 2027 monthly calendar.",
    category: "generators",
    icon: "📅",
  },
  {
    slug: "printable-calendar-february-2027",
    name: "February 2027 Calendar",
    description: "Printable February 2027 monthly calendar.",
    category: "generators",
    icon: "📅",
  },
  {
    slug: "printable-calendar-march-2027",
    name: "March 2027 Calendar",
    description: "Printable March 2027 monthly calendar.",
    category: "generators",
    icon: "📅",
  },
  {
    slug: "printable-calendar-april-2027",
    name: "April 2027 Calendar",
    description: "Printable April 2027 monthly calendar.",
    category: "generators",
    icon: "📅",
  },
  {
    slug: "image-to-text",
    name: "Image to Text (OCR)",
    description: "Extract text from images using Tesseract.js in your browser.",
    category: "image-media",
    icon: "🔍",
  },
  {
    slug: "tdee-calculator",
    name: "TDEE Calculator",
    description:
      "Estimate total daily energy expenditure using Mifflin–St Jeor BMR and activity multipliers.",
    category: "health",
    icon: "🔥",
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    description:
      "Calculate basal metabolic rate (calories at rest) with the Mifflin–St Jeor equation.",
    category: "health",
    icon: "💤",
  },
  {
    slug: "macro-calculator",
    name: "Macro Calculator",
    description:
      "Split daily calories into protein, carbs, and fat grams from your target macro percentages.",
    category: "health",
    icon: "🥗",
  },
  {
    slug: "due-date-calculator",
    name: "Pregnancy Due Date Calculator",
    description:
      "Estimate due date and weeks pregnant from last period or conception date.",
    category: "health",
    icon: "👶",
  },
  {
    slug: "concrete-calculator",
    name: "Concrete Calculator",
    description:
      "Estimate cubic yards of concrete for a slab from length, width, and depth.",
    category: "home-diy",
    icon: "🧱",
  },
  {
    slug: "square-footage-calculator",
    name: "Square Footage Calculator",
    description: "Calculate room or floor area in square feet from length and width.",
    category: "home-diy",
    icon: "📐",
  },
  {
    slug: "roof-pitch-calculator",
    name: "Roof Pitch Calculator",
    description:
      "Convert rise and run to pitch ratio, roof angle, and approximate rafter length.",
    category: "home-diy",
    icon: "🏠",
  },
  {
    slug: "deck-calculator",
    name: "Deck Board Calculator",
    description:
      "Estimate deck boards and linear feet from deck size, board width, and gap.",
    category: "home-diy",
    icon: "🪵",
  },
  {
    slug: "mulch-calculator",
    name: "Mulch Calculator",
    description:
      "Calculate mulch volume in cubic yards and bag count from bed dimensions.",
    category: "home-diy",
    icon: "🌿",
  },
  {
    slug: "paint-calculator",
    name: "Paint Calculator",
    description:
      "Estimate gallons of paint from wall area, coats, and coverage per gallon.",
    category: "home-diy",
    icon: "🎨",
  },
  {
    slug: "tile-calculator",
    name: "Tile Calculator",
    description:
      "Count floor tiles needed from room size, tile dimensions, and waste allowance.",
    category: "home-diy",
    icon: "🔲",
  },
  {
    slug: "fence-calculator",
    name: "Fence Calculator",
    description:
      "Estimate fence posts and panel sections from length and spacing.",
    category: "home-diy",
    icon: "🚧",
  },
  {
    slug: "paycheck-calculator",
    name: "Paycheck Calculator",
    description:
      "Estimate net pay with simplified federal withholding, FICA, and optional flat state tax.",
    category: "calculators",
    icon: "💵",
  },
  {
    slug: "etsy-fee-calculator",
    name: "Etsy Fee Calculator",
    description:
      "Estimate Etsy listing, transaction, and payment processing fees on a sale.",
    category: "calculators",
    icon: "🛍️",
  },
  {
    slug: "amazon-fba-fee-calculator",
    name: "Amazon FBA Fee Calculator",
    description:
      "Rough Amazon referral and FBA fulfillment fee estimate for a product price.",
    category: "calculators",
    icon: "📦",
  },
  {
    slug: "ebay-fee-calculator",
    name: "eBay Fee Calculator",
    description:
      "Estimate eBay final value and payment processing fees on your sale price.",
    category: "calculators",
    icon: "🏷️",
  },
  {
    slug: "paypal-fee-calculator",
    name: "PayPal Fee Calculator",
    description:
      "Calculate PayPal goods-and-services fees from sale amount (rates as of 2026).",
    category: "calculators",
    icon: "💳",
  },
  {
    slug: "video-to-mp3",
    name: "Video to MP3",
    description:
      "Extract audio from a video file and download MP3 in your browser with ffmpeg.wasm.",
    category: "audio-video",
    icon: "🎵",
  },
  {
    slug: "mp4-to-mp3",
    name: "MP4 to MP3",
    description:
      "Convert MP4 (and other video) files to MP3 audio locally — no upload to a server.",
    category: "audio-video",
    icon: "🎬",
  },
  {
    slug: "video-compressor",
    name: "Video Compressor",
    description:
      "Compress video with H.264 CRF and optional scaling using ffmpeg.wasm in the browser.",
    category: "audio-video",
    icon: "📹",
  },
  {
    slug: "audio-cutter",
    name: "Audio Cutter",
    description:
      "Trim audio with start/end times and fade in/out, then export a WAV download.",
    category: "audio-video",
    icon: "✂️",
  },
  {
    slug: "device-test-mic",
    name: "Microphone Test",
    description:
      "Check your microphone with a live input level meter in the browser.",
    category: "randomizers",
    icon: "🎤",
  },
  {
    slug: "device-test-webcam",
    name: "Webcam Test",
    description: "Preview your camera feed to verify video and framing.",
    category: "randomizers",
    icon: "📷",
  },
  {
    slug: "device-test-keyboard",
    name: "Keyboard Test",
    description:
      "Press keys to confirm they register — useful for new or cleaned keyboards.",
    category: "randomizers",
    icon: "⌨️",
  },
  {
    slug: "device-test-cps",
    name: "CPS Test",
    description:
      "Measure clicks per second in a 5-second challenge — mouse and trackpad tester.",
    category: "randomizers",
    icon: "🖱️",
  },
  {
    slug: "device-test-dead-pixel",
    name: "Dead Pixel Test",
    description:
      "Full-screen solid colors to help spot stuck or dead pixels on your display.",
    category: "randomizers",
    icon: "🖥️",
  },
  {
    slug: "device-test-pack",
    name: "Device Test Pack",
    description:
      "All-in-one mic, webcam, keyboard, CPS, and dead-pixel tests in one page.",
    category: "randomizers",
    icon: "🧰",
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
