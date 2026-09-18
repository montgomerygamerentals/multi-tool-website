import type { Tool } from "@/lib/tools";

export interface ToolSeo {
  title: string;
  description: string;
}

const seo: Record<string, ToolSeo> = {
  "image-converter": {
    title: "Image Converter (PNG, JPEG, WebP)",
    description:
      "Convert PNG, JPEG, and WebP images in your browser. Choose output format and quality, then download. Files never leave this device.",
  },
  "image-compressor": {
    title: "Image Compressor",
    description:
      "Shrink JPG, PNG, and WebP file size with a quality slider and before/after size comparison. Compression runs locally in your browser.",
  },
  "image-resizer": {
    title: "Image Resizer",
    description:
      "Resize an image to exact pixels or a percentage. Lock aspect ratio for thumbnails, avatars, and banners without uploading the file.",
  },
  "image-cropper": {
    title: "Image Cropper",
    description:
      "Crop a photo to a rectangle or circle for avatars and thumbnails. Adjust the selection and download PNG or JPEG locally.",
  },
  "aspect-ratio-finder": {
    title: "Image Aspect Ratio Finder",
    description:
      "Upload an image to see pixel dimensions, orientation, and the closest common ratio such as 16:9, 4:3, 3:2, or 1:1.",
  },
  "background-remover": {
    title: "Background Remover",
    description:
      "Make a simple or solid background transparent. Tune tolerance and soft edges, then download a PNG cutout — processed in the browser.",
  },
  "favicon-generator": {
    title: "Favicon Generator",
    description:
      "Build a favicon package from an image, letter, or emoji. Download ICO, PNG sizes, Apple Touch icon, and a web manifest ZIP.",
  },
  "jpg-to-png": {
    title: "JPG to PNG Converter",
    description:
      "Convert a JPEG photo to PNG in your browser. Use this when you need a lossless file before editing or removing a background.",
  },
  "png-to-jpg": {
    title: "PNG to JPG Converter",
    description:
      "Convert PNG images to JPEG to cut file size or meet upload forms that reject PNG. Runs locally; transparency is flattened.",
  },
  "png-to-webp": {
    title: "PNG to WebP Converter",
    description:
      "Convert PNG images to WebP for smaller web assets. Keep the PNG master; ship WebP on the site. Conversion stays on your device.",
  },
  "webp-to-png": {
    title: "WebP to PNG Converter",
    description:
      "Convert WebP images to PNG when an editor, printer, or CMS cannot open WebP. Transparency is preserved when the source has it.",
  },
  "qr-code-generator": {
    title: "QR Code Generator",
    description:
      "Create a PNG QR code for a URL, plain text, or Wi‑Fi login. Choose size and colors, test with your phone, and download.",
  },
  "color-converter": {
    title: "HEX RGB HSL Color Converter",
    description:
      "Convert colors between HEX, RGB, and HSL with a live preview. Copy the notation you need for CSS, design tools, or email.",
  },
  "pdf-tools": {
    title: "PDF Merge and Split",
    description:
      "Merge PDFs, extract pages, or build a PDF from images in your browser. Useful for packets and scans you do not want to upload.",
  },
  "exif-viewer": {
    title: "EXIF Viewer and Metadata Stripper",
    description:
      "Inspect camera settings and GPS in a photo’s EXIF, then download a JPEG with metadata removed before you share the file.",
  },
  "word-counter": {
    title: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs with a reading-time estimate. Paste an essay, caption, or meta description.",
  },
  notepad: {
    title: "Browser Notepad",
    description:
      "A scratch pad that autosaves in this browser’s local storage. Copy or download notes as text. Nothing is synced to a server.",
  },
  "case-converter": {
    title: "Case Converter",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, or sentence case. Paste a list or paragraph and copy the result.",
  },
  "remove-duplicates": {
    title: "Remove Duplicate Lines",
    description:
      "Deduplicate a list line by line, optionally sort alphabetically. Built for RSVP lists, SKUs, and spreadsheet exports.",
  },
  "text-diff": {
    title: "Text Diff Checker",
    description:
      "Compare two text blocks side by side and highlight additions and deletions. Useful for bios, policies, and contract wording.",
  },
  "code-comparison": {
    title: "Code Diff Viewer",
    description:
      "Compare two code snippets with line numbers and highlighted changes. Paste configs or functions without opening an IDE.",
  },
  "lorem-ipsum": {
    title: "Lorem Ipsum Generator",
    description:
      "Generate placeholder paragraphs for mockups and layout tests. Choose how much text you need and copy it into a design tool.",
  },
  "json-formatter": {
    title: "JSON Formatter and Validator",
    description:
      "Pretty-print, validate, or minify JSON in your browser. Catch missing commas in API payloads without sending secrets to a host.",
  },
  "json-generator": {
    title: "Mock JSON Generator",
    description:
      "Generate sample JSON from a simple schema for prototypes, tests, and mock APIs. Data is created locally in this tab.",
  },
  "base64-encoder": {
    title: "Base64 Encoder and Decoder",
    description:
      "Encode text to Base64 or decode a Base64 string back to text. Runs in the browser so tokens never go to a third-party decoder.",
  },
  "markdown-editor": {
    title: "Markdown Editor with Preview",
    description:
      "Write Markdown and see the rendered HTML beside it. Handy for README files, changelogs, and docs before you commit.",
  },
  "regex-tester": {
    title: "Regex Tester",
    description:
      "Test a regular expression against sample text with live match highlighting. Check anchors, groups, and flags before you ship.",
  },
  "hash-generator": {
    title: "MD5 and SHA Hash Generator",
    description:
      "Generate MD5, SHA-1, SHA-256, and other hashes from text or a file. Compare checksums locally instead of uploading a binary.",
  },
  "uuid-generator": {
    title: "UUID v4 Generator",
    description:
      "Generate one or many random UUID v4 identifiers for databases, fixtures, and request IDs. Copied values are created in this browser.",
  },
  "password-generator": {
    title: "Password Generator",
    description:
      "Generate a random password with length and character-set controls. The secret is created in your browser and is not stored.",
  },
  "unit-converter": {
    title: "Unit Converter",
    description:
      "Convert length, weight, temperature, and volume between common metric and imperial units. Includes °C/°F, inches/cm, and more.",
  },
  "bmi-calculator": {
    title: "BMI Calculator",
    description:
      "Calculate Body Mass Index from height and weight in metric or imperial units. Shows the formula and a worked example.",
  },
  "age-calculator": {
    title: "Age Calculator",
    description:
      "Calculate exact age in years, months, and days from a birthdate. Set an as-of date for deadlines and eligibility forms.",
  },
  "days-between-dates": {
    title: "Days Between Dates Calculator",
    description:
      "Count days, weeks, and months between two calendar dates. Useful for project timelines, trips, and invoice periods.",
  },
  "percentage-calculator": {
    title: "Percentage Calculator",
    description:
      "Find X percent of Y, reverse percentages, and percent change. Includes a restaurant-tip and markup-style example.",
  },
  "fraction-decimal-converter": {
    title: "Fraction to Decimal Converter",
    description:
      "Convert decimals to simplified fractions and fractions (including mixed numbers) to decimals. Built for homework and cut lists.",
  },
  "tip-calculator": {
    title: "Tip Calculator",
    description:
      "Calculate a tip and split a bill among people. Enter the pre-tip amount, tip percent, and party size to see per-person totals.",
  },
  "loan-calculator": {
    title: "Loan Payment Calculator",
    description:
      "Estimate monthly payment, total interest, and payoff on an amortizing loan. Compare term lengths before you talk to a lender.",
  },
  "debt-payoff-calculator": {
    title: "Debt Payoff Calculator",
    description:
      "Model avalanche payoff across multiple debts with extra payments. See how a larger monthly budget changes interest and months.",
  },
  "mortgage-calculator": {
    title: "Mortgage Payment Calculator",
    description:
      "Estimate principal and interest, total interest, and optional tax/insurance on a home loan. Compare 15-year and 30-year terms.",
  },
  "compound-interest-calculator": {
    title: "Compound Interest Calculator",
    description:
      "Project future value from a starting balance, contributions, and annual rate. See how monthly deposits change the total.",
  },
  "roi-calculator": {
    title: "ROI Calculator",
    description:
      "Calculate simple return on investment and annualized ROI from cost and final value. Compare deals that lasted different lengths.",
  },
  "retirement-calculator": {
    title: "Retirement Savings Calculator",
    description:
      "Project a nest egg from current savings, monthly contributions, and an assumed annual return. Change the rate to stress-test.",
  },
  "budget-calculator": {
    title: "Monthly Budget Calculator",
    description:
      "Add income and expenses to see surplus or shortfall. A simple monthly budget you can fill in without creating an account.",
  },
  "sales-tax-calculator": {
    title: "Sales Tax Calculator",
    description:
      "Add sales tax to a price or back out the pre-tax amount from a receipt total. Works for any percentage rate you enter.",
  },
  "income-tax-estimator": {
    title: "Federal Income Tax Estimator",
    description:
      "Rough U.S. federal income tax from taxable income and brackets. Educational only — not a filing tool and not tax advice.",
  },
  "currency-converter": {
    title: "Currency Converter",
    description:
      "Convert an amount between currencies using a live or manual exchange rate. Check travel and invoice totals in your home currency.",
  },
  "salary-hourly-converter": {
    title: "Salary to Hourly Converter",
    description:
      "Convert annual salary to hourly, monthly, and biweekly pay (pre-tax) using hours per week. Compare offers on the same basis.",
  },
  "inflation-calculator": {
    title: "Inflation Calculator",
    description:
      "See how an amount changes at a given inflation rate over years. Useful for savings targets and “future grocery bill” sketches.",
  },
  "buying-power-calculator": {
    title: "Dollar Buying Power Calculator",
    description:
      "Compare what a U.S. dollar amount from one year is worth in another using historical CPI-style data packaged with the tool.",
  },
  "refinance-calculator": {
    title: "Refinance Break-Even Calculator",
    description:
      "Compare your current loan to a refinance offer: monthly savings, closing-cost break-even months, and interest difference.",
  },
  "credit-card-payoff-calculator": {
    title: "Credit Card Payoff Calculator",
    description:
      "Estimate months to pay off a card balance and total interest from APR and monthly payment. See why minimums take so long.",
  },
  "down-payment-calculator": {
    title: "Down Payment Calculator",
    description:
      "Solve for down payment cash, percent, or home price from the two numbers you know. Compare 5%, 10%, and 20% down scenarios.",
  },
  "amortization-schedule": {
    title: "Amortization Schedule Calculator",
    description:
      "Generate a month-by-month principal, interest, and balance table for a loan. Download CSV for spreadsheets.",
  },
  "net-worth-calculator": {
    title: "Net Worth Calculator",
    description:
      "Add assets and subtract liabilities for a personal net-worth snapshot. Figures stay in this browser; nothing is uploaded.",
  },
  "emergency-fund-calculator": {
    title: "Emergency Fund Calculator",
    description:
      "Set an emergency-fund target from monthly essential expenses and months of coverage. See the gap versus cash you already have.",
  },
  "401k-calculator": {
    title: "401(k) Contribution Calculator",
    description:
      "Estimate employee deferrals and employer match, with optional growth. Check whether you contribute enough to capture the match.",
  },
  "apr-calculator": {
    title: "APR Calculator",
    description:
      "Estimate APR including fees and points so you can compare loan offers beyond the stated interest rate.",
  },
  "discount-markup-calculator": {
    title: "Discount and Markup Calculator",
    description:
      "Calculate a sale price after a percent off, markup from cost, or price from a target margin. Distinguishes markup vs margin.",
  },
  "break-even-calculator": {
    title: "Break-Even Calculator",
    description:
      "Find break-even units and revenue from fixed costs, variable cost per unit, and selling price. For workshops and small products.",
  },
  "timezone-converter": {
    title: "Time Zone Converter",
    description:
      "Convert a date and time between named time zones, including daylight saving. Better than adding a fixed hour offset.",
  },
  timer: {
    title: "Stopwatch and Countdown Timer",
    description:
      "Run a stopwatch with laps or a countdown timer in this tab. Useful for Pomodoro sessions, workouts, and kitchen timing.",
  },
  "name-picker": {
    title: "Random Name Picker",
    description:
      "Paste a list and pick a random name or raffle winner. Remove winners between spins. Names stay in your browser.",
  },
  "random-number-generator": {
    title: "Random Number Generator",
    description:
      "Generate one or many random integers in a range you set. Use a list shuffle instead if you need unique draws without repeats.",
  },
  "coin-flip": {
    title: "Coin Flip",
    description:
      "Flip a virtual coin for a fair heads-or-tails result. Each flip is independent — useful for tie-breaks and probability demos.",
  },
  "dice-roller": {
    title: "Dice Roller",
    description:
      "Roll virtual dice with a chosen number of dice and sides, including d6 and d20. For tabletop games and classrooms.",
  },
  "list-shuffler": {
    title: "List Shuffler",
    description:
      "Shuffle any list into a random order. Use it for talk lineups, playlists, chore rotations, and tournament seeds.",
  },
  "team-splitter": {
    title: "Random Team Generator",
    description:
      "Divide a list of names into balanced random teams. Leftovers are distributed so group sizes differ by at most one.",
  },
  "yes-no-picker": {
    title: "Yes or No Picker",
    description:
      "Get a random yes or no for a low-stakes decision. Not a substitute for judgment on anything that actually matters.",
  },
  sudoku: {
    title: "Sudoku Puzzle",
    description:
      "Play Sudoku in the browser with easy, medium, and hard grids, notes, and conflict highlights. No account required.",
  },
  wordle: {
    title: "Wordle-Style Word Game",
    description:
      "Guess a 5-letter word in six tries. Green is correct place, yellow is wrong place. Independent practice — not the NYT daily.",
  },
};

export function getToolSeo(tool: Tool): ToolSeo {
  return (
    seo[tool.slug] ?? {
      title: tool.name,
      description: tool.description,
    }
  );
}
