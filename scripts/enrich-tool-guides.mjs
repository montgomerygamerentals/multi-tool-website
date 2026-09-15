/**
 * Expands short tool guides to ~300–500 words of unique SEO copy
 * and regenerates src/lib/tool-guides.ts.
 *
 * Run: node scripts/enrich-tool-guides.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Load existing guide source by evaluating the data object from generate-tool-guides.mjs
// We re-import by spawning the guides from the TS file via a lightweight parse of string fields.
const guidesTs = readFileSync(join(root, "src/lib/tool-guides.ts"), "utf8");
const toolsTs = readFileSync(join(root, "src/lib/tools.ts"), "utf8");

const toolMeta = [...toolsTs.matchAll(/\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*description:\s*"([^"]*(?:\\.[^"]*)*)",\s*category:\s*"([^"]+)"/g)].map(
  (m) => ({
    slug: m[1],
    name: m[2],
    description: m[3].replace(/\\"/g, '"'),
    category: m[4],
  }),
);

if (toolMeta.length < 50) {
  console.error("Failed to parse tools.ts — got", toolMeta.length);
  process.exit(1);
}

/** Parse one guide block from tool-guides.ts */
function parseGuides(src) {
  const result = {};
  const slugRe = /\n  "([a-z0-9-]+)": \{\n([\s\S]*?)\n  \},(?=\n  "|\n\};)/g;
  let match;
  while ((match = slugRe.exec(src))) {
    const slug = match[1];
    const block = match[2];
    const whatItDoes = (block.match(/whatItDoes: `([\s\S]*?)`,/) || [])[1] || "";
    const privacy = (block.match(/privacy: `([\s\S]*?)`,/) || [])[1] || "";
    const howBlock = (block.match(/howToUse: \[([\s\S]*?)\],\n    supportedFormats/) || [])[1] || "";
    const howToUse = [...howBlock.matchAll(/`([\s\S]*?)`,/g)].map((x) => x[1]);
    const formatsBlock =
      (block.match(/supportedFormats: \[([\s\S]*?)\],\n    privacy/) || [])[1] || "";
    const supportedFormats = [...formatsBlock.matchAll(/`([\s\S]*?)`,/g)].map((x) => x[1]);
    const faqBlock = (block.match(/faqs: \[([\s\S]*)\]\s*,?\s*$/) || [])[1] || "";
    const faqs = [];
    const faqRe = /question: `([\s\S]*?)`,\s*answer: `([\s\S]*?)`,/g;
    let fm;
    while ((fm = faqRe.exec(faqBlock))) {
      faqs.push({ question: fm[1], answer: fm[2] });
    }
    result[slug] = { whatItDoes, howToUse, supportedFormats, privacy, faqs };
  }
  return result;
}

const existing = parseGuides(guidesTs);
console.log("Parsed existing guides:", Object.keys(existing).length);

const categoryWhy = {
  "image-media":
    "Designers, marketers, and everyday users constantly need quick image fixes without opening a heavy desktop editor or uploading files to a third-party cloud.",
  randomizers:
    "Teachers, streamers, event hosts, and game nights need fair, transparent randomness without arguing over who got picked.",
  "text-writing":
    "Writers, developers, and students often need a fast text utility in the browser — especially when they cannot install software or send drafts to a remote API.",
  calculators:
    "Shoppers, students, and households make better decisions when the math is instant, private, and free of spreadsheet setup.",
};

/** Per-tool unique extras: whyUse paragraph + use cases + optional FAQ + expanded intro add-on */
const extras = {
  "image-converter": {
    whyUse:
      "Websites, email clients, and social platforms prefer different image formats. Converting locally means you can ship PNG for graphics with transparency, JPEG for photos, or WebP for faster pages — without waiting on uploads or worrying about a remote service storing your assets.",
    useCases: [
      "Prepare product photos as WebP for a storefront while keeping PNG masters for print.",
      "Convert screenshots to JPEG before attaching them to size-limited email threads.",
      "Batch-convert icons and UI assets when a CMS only accepts a specific format.",
      "Turn client deliverables into the format your design tool opens most reliably.",
    ],
  },
  "image-compressor": {
    whyUse:
      "Large images slow pages, burn mobile data, and get rejected by upload forms. Compressing in the browser lets you hit size limits while previewing quality tradeoffs before you publish.",
    useCases: [
      "Shrink hero images so a landing page passes Core Web Vitals budgets.",
      "Reduce photo attachments so they fit help-desk or ticket upload caps.",
      "Compress portfolio shots for a personal site without visible banding.",
      "Prepare social posts that look sharp but stay under platform size limits.",
    ],
  },
  "image-resizer": {
    whyUse:
      "Exact dimensions matter for avatars, ad slots, thumbnails, and print specs. Resizing in-browser avoids round-trips to cloud editors and keeps originals on your device until you download the result.",
    useCases: [
      "Create 1:1 profile photos for apps that reject oversized uploads.",
      "Downscale camera photos for slideshows that stutter on large files.",
      "Match banner pixel sizes required by ad networks or newsletter tools.",
      "Scale screenshots to a consistent width for documentation sites.",
    ],
  },
  "image-cropper": {
    whyUse:
      "Cropping removes distractions and frames the subject for the medium you are publishing to. Doing it locally is faster than opening a full editor when you only need a clean rectangle or circle.",
    useCases: [
      "Cut a circular avatar from a group photo for a team directory.",
      "Trim whiteboard photos so slides focus on the diagram, not the wall.",
      "Create square thumbnails for marketplace listings.",
      "Remove letterboxing from screenshots before sharing in chat.",
    ],
  },
  "aspect-ratio-finder": {
    whyUse:
      "Design specs call for 16:9, 4:3, 1:1, and other frames. Knowing an image’s true ratio and closest standard saves trial-and-error cropping and prevents stretched media.",
    useCases: [
      "Check whether a photo will fit a YouTube thumbnail template.",
      "Confirm orientation before sending assets to a printer.",
      "Match blog featured-image requirements without guessing.",
      "Audit a folder of exports to see which shots need reframing.",
    ],
  },
  "background-remover": {
    whyUse:
      "Transparent cutouts make products, stickers, and profile subjects drop cleanly onto new backgrounds. A browser tool with tolerance controls is ideal for solid studio backdrops when you do not need a full AI suite.",
    useCases: [
      "Isolate a product on white for an ecommerce catalog.",
      "Create sticker-style PNGs for presentations and thumbnails.",
      "Remove a plain wall behind a headshot for a site hero.",
      "Prep layered graphics for Canva or Figma imports.",
    ],
  },
  "favicon-generator": {
    whyUse:
      "Browsers and devices expect multiple favicon sizes plus a manifest. Generating a full package from one image, text, or emoji saves hours of manual export work.",
    useCases: [
      "Launch a new brand mark across desktop tabs and mobile home screens.",
      "Refresh an old ICO set when you rebrand colors.",
      "Ship an emoji favicon for a playful side project.",
      "Bundle Apple Touch and Android icons with a web manifest in one ZIP.",
    ],
  },
  "jpg-to-png": {
    whyUse:
      "PNG is better when you need lossless quality or a path toward transparency-friendly editing. Converting JPEG to PNG locally keeps photos private while you prepare them for design workflows.",
    useCases: [
      "Move a JPEG logo into a workflow that expects PNG.",
      "Losslessly stage a photo before removing a background.",
      "Meet a form that rejects JPG but accepts PNG.",
      "Hand designers a PNG when they asked for a non-lossy source.",
    ],
  },
  "png-to-jpg": {
    whyUse:
      "JPEG usually produces smaller photo files and is required by many upload forms. Converting PNG to JPG in the browser is the fastest way to meet those constraints without cloud uploads.",
    useCases: [
      "Shrink transparent-free photos for email newsletters.",
      "Satisfy a CMS that only accepts JPEG uploads.",
      "Reduce PNG screenshots that do not need an alpha channel.",
      "Prepare camera exports for a photo contest portal.",
    ],
  },
  "png-to-webp": {
    whyUse:
      "WebP often beats PNG on file size for similar visual quality, which helps pages load faster. Converting locally lets you optimize assets before deploy.",
    useCases: [
      "Optimize PNG illustrations for a marketing site.",
      "Cut bandwidth on image-heavy blog posts.",
      "Prepare WebP variants alongside originals for modern browsers.",
      "Shrink UI chrome assets in a static site build.",
    ],
  },
  "webp-to-png": {
    whyUse:
      "Not every editor, printer, or CMS accepts WebP. Converting to PNG restores compatibility while preserving transparency when the source has an alpha channel.",
    useCases: [
      "Open a WebP download in software that only reads PNG.",
      "Send print vendors a widely supported raster format.",
      "Archive WebP social downloads as PNG for long-term editing.",
      "Convert WebP icons before importing into older design tools.",
    ],
  },
  "qr-code-generator": {
    whyUse:
      "QR codes bridge print and digital — menus, posters, packaging, and Wi‑Fi cards. Generating a PNG in the browser means you can test scans immediately and avoid third-party branding on the code.",
    useCases: [
      "Put a URL on event flyers that open the registration page.",
      "Share Wi‑Fi credentials with guests without spelling the password.",
      "Link product packaging to a support or warranty page.",
      "Add a scannable resume or portfolio URL to a business card.",
    ],
  },
  "color-converter": {
    whyUse:
      "Designers jump between HEX in CSS, RGB in graphics tools, and HSL for adjustments. Instant conversion with a live preview prevents mismatched brand colors across a stack.",
    useCases: [
      "Translate a brand HEX into RGB for an email template.",
      "Explore HSL tweaks while keeping the HEX for developers.",
      "Check that a Figma token matches production CSS.",
      "Document a palette in multiple notations for a style guide.",
    ],
  },
  "pdf-tools": {
    whyUse:
      "Merging, extracting, or building PDFs from images is common before sharing contracts, homework, or scanned packets. Browser-side tools keep sensitive documents off remote converters.",
    useCases: [
      "Combine signed pages into one packet for a landlord.",
      "Extract only the pages a client needs from a long PDF.",
      "Turn phone photos of receipts into a single expense PDF.",
      "Assemble a portfolio PDF from exported image slides.",
    ],
  },
  "exif-viewer": {
    whyUse:
      "Photos often hide camera settings and GPS. Viewing EXIF helps with photography workflows; stripping it before sharing protects location privacy.",
    useCases: [
      "Check shutter speed and ISO on a practice shoot.",
      "Remove GPS before posting travel photos publicly.",
      "Verify capture dates when sorting an archive.",
      "Confirm whether a download still contains camera metadata.",
    ],
  },
  "word-counter": {
    whyUse:
      "Essays, SEO drafts, captions, and proposals all have length targets. A live counter with reading time helps you hit limits without pasting into multiple apps.",
    useCases: [
      "Stay under a college essay word maximum.",
      "Trim meta descriptions toward a search-friendly length.",
      "Check caption limits before posting to social platforms.",
      "Estimate reading time for a newsletter draft.",
    ],
  },
  notepad: {
    whyUse:
      "Sometimes you need a scratchpad that survives a refresh without creating an account. Browser autosave is perfect for quick notes, copy buffers, and drafting on shared machines carefully.",
    useCases: [
      "Draft meeting talking points during a call.",
      "Park a temporary copy-paste buffer while researching.",
      "Sketch outline bullets before moving them into Docs.",
      "Download a .txt backup of notes before clearing the editor.",
    ],
  },
  "case-converter": {
    whyUse:
      "Headlines, code identifiers, and messy pasted text often need consistent casing. One click beats retyping or fighting spreadsheet formulas, especially when you are cleaning exports from multiple systems. Keeping the conversion local also means confidential draft copy never hits a random web form.",
    useCases: [
      "Normalize a list of names to title case for invitations.",
      "Convert shouting-case emails into readable sentence case.",
      "Prepare constants in UPPER_CASE for configuration files.",
      "Clean product titles copied from inconsistent catalogs.",
    ],
  },
  "remove-duplicates": {
    whyUse:
      "Exports, RSVP lists, and scraped columns accumulate duplicate lines. Cleaning them in the browser is safer than uploading customer lists to unknown sites.",
    useCases: [
      "Deduplicate an email list before a campaign send.",
      "Clean repeated SKUs from a spreadsheet export.",
      "Unique a classroom roster after merging sections.",
      "Sort and dedupe a brainstorm list of domain ideas.",
    ],
  },
  "text-diff": {
    whyUse:
      "Side-by-side diffs make edits obvious in contracts, scripts, and policies. Comparing locally keeps confidential wording off cloud diff services.",
    useCases: [
      "Review lawyer redlines pasted as plain text.",
      "Spot changes between two versions of a bio.",
      "Compare old and new terms of service drafts.",
      "Check that a rewritten paragraph actually changed the right lines.",
    ],
  },
  "code-comparison": {
    whyUse:
      "Snippet-level diffs with line numbers help when you are not in a full IDE — config tweaks, interview exercises, or reviewing a pasted patch.",
    useCases: [
      "Compare two nginx config versions before deploy.",
      "Review a classmate’s function against yours.",
      "Diff JSON configs from staging and production.",
      "Inspect a hotfix snippet someone sent in chat.",
    ],
  },
  "lorem-ipsum": {
    whyUse:
      "Placeholder copy keeps stakeholders focused on layout instead of unfinished wording. Generating it instantly speeds wireframes and component demos.",
    useCases: [
      "Fill a Figma text frame before real copy arrives.",
      "Stress-test a blog template with long paragraphs.",
      "Populate a prototype form with dummy blurbs.",
      "Demo a print layout without using confidential drafts.",
    ],
  },
  "json-formatter": {
    whyUse:
      "Minified API payloads are painful to read. Formatting and validating JSON in the browser helps debugging without posting secrets to online formatters.",
    useCases: [
      "Pretty-print a webhook body while building an integration.",
      "Validate a config file before committing it.",
      "Minify JSON for an embed size budget.",
      "Find a missing comma in a hand-edited payload.",
    ],
  },
  "json-generator": {
    whyUse:
      "Front-end and API work stalls without sample data. Schema-driven mock JSON lets you prototype UI states and tests without a live backend.",
    useCases: [
      "Stub a user list for a React table component.",
      "Create fixtures for unit tests.",
      "Demo an API response shape to stakeholders.",
      "Seed a local mock server with realistic nested objects.",
    ],
  },
  "base64-encoder": {
    whyUse:
      "Base64 shows up in data URLs, tokens, and transport encodings. Encoding and decoding locally is essential when payloads may contain secrets you should not paste into random websites.",
    useCases: [
      "Decode a Base64 string from an API log.",
      "Encode a small SVG for an inline data URL.",
      "Debug email MIME content transfer encoding.",
      "Convert text for systems that require Base64 fields.",
    ],
  },
  "markdown-editor": {
    whyUse:
      "README files, docs, and posts are written in Markdown. A split preview catches broken links and headings before you commit or publish.",
    useCases: [
      "Draft a GitHub README with live formatting.",
      "Preview a changelog before releasing.",
      "Write documentation snippets for a knowledge base.",
      "Check list nesting and code fences visually.",
    ],
  },
  "regex-tester": {
    whyUse:
      "Regular expressions are easy to get subtly wrong. Live match highlighting shortens the loop versus redeploying code just to test a pattern.",
    useCases: [
      "Validate an email or slug pattern before shipping.",
      "Debug a log-parsing expression against sample lines.",
      "Teach students how capture groups behave.",
      "Prototype find-and-replace patterns for a cleanup script.",
    ],
  },
  "hash-generator": {
    whyUse:
      "Checksums verify downloads and detect accidental changes. Generating MD5/SHA hashes in the browser avoids uploading binaries to online hash sites.",
    useCases: [
      "Verify a downloaded ISO against a published checksum.",
      "Compare two files’ SHA-256 digests for integrity.",
      "Create content hashes for cache-busting experiments.",
      "Demonstrate one-way hashing in a security class.",
    ],
  },
  "uuid-generator": {
    whyUse:
      "Distributed systems and databases rely on unique IDs. Generating UUID v4 values locally is handy for fixtures, primary keys, and correlating test events.",
    useCases: [
      "Seed database rows during local development.",
      "Create request IDs for API debugging notes.",
      "Generate bulk IDs for import templates.",
      "Assign unique keys to offline form drafts.",
    ],
  },
  "password-generator": {
    whyUse:
      "Strong unique passwords beat reused phrases. Generating them in-browser with length and character controls helps you fill a password manager quickly and privately.",
    useCases: [
      "Create a long password for a new bank login.",
      "Generate app-specific passwords with symbol requirements.",
      "Produce a passphrase-length secret for Wi‑Fi.",
      "Rotate credentials after a breach notification.",
    ],
  },
  "unit-converter": {
    whyUse:
      "Recipes, DIY plans, and travel constantly mix metric and imperial. A fast converter prevents costly measurement mistakes without opening a spreadsheet.",
    useCases: [
      "Convert oven temperatures between °C and °F.",
      "Translate furniture dimensions before ordering abroad.",
      "Switch miles and kilometers for a trip plan.",
      "Convert milliliters to cups while cooking.",
    ],
  },
  "bmi-calculator": {
    whyUse:
      "BMI is a quick screening number used in many wellness contexts. Calculating it privately in the browser is convenient — with the caveat that it is not a diagnosis.",
    useCases: [
      "Estimate BMI before a routine checkup form.",
      "Compare metric vs imperial inputs for accuracy.",
      "Track a rough trend alongside other health notes.",
      "Educate students on how BMI is computed.",
    ],
  },
  "age-calculator": {
    whyUse:
      "Exact age in years, months, and days matters for enrollment, benefits, and milestones. Manual calendar math is error-prone around month lengths and leap years.",
    useCases: [
      "Confirm age eligibility for a youth program.",
      "Calculate precise age for a birthday caption.",
      "Fill forms that ask for age as of a specific date.",
      "Plan anniversary milestones down to the day.",
    ],
  },
  "days-between-dates": {
    whyUse:
      "Project deadlines, travel, and billing cycles all need reliable day counts. Instant date math beats counting on a wall calendar.",
    useCases: [
      "Count days until a product launch.",
      "Measure trip length between flights.",
      "Compute invoice periods between two dates.",
      "See how many weeks remain in a semester.",
    ],
  },
  "percentage-calculator": {
    whyUse:
      "Discounts, tips, exam scores, and growth rates are percentage problems in disguise. A dedicated calculator removes algebra mistakes under time pressure and keeps homework or business figures offline. Whether you need “what is X% of Y” or percent change between two values, the same tool covers everyday cases.",
    useCases: [
      "Find what 18% tip is on a restaurant bill before paying.",
      "Compute percent change between two months of revenue.",
      "Solve “X is what percent of Y” homework quickly and clearly.",
      "Reverse out an original price after a markdown to check the deal.",
    ],
  },
  "fraction-decimal-converter": {
    whyUse:
      "Homework, woodworking, and recipes jump between fractions and decimals. Converting and simplifying fractions avoids calculator-mode confusion.",
    useCases: [
      "Turn 0.125 into 1/8 for a cut list.",
      "Convert 2 1/3 cups to a decimal for scaling.",
      "Simplify improper fractions on math worksheets.",
      "Check mixed-number results from a word problem.",
    ],
  },
  "tip-calculator": {
    whyUse:
      "Splitting a bill fairly should not require mental gymnastics after dinner. Tip percentage plus per-person totals keep groups aligned.",
    useCases: [
      "Split a shared meal across four friends.",
      "Compare 15% vs 20% tip on the same tab.",
      "Include tax and tip when budgeting night out.",
      "Quickly tip on takeout when the app is unclear.",
    ],
  },
  "loan-calculator": {
    whyUse:
      "Monthly payment and total interest determine whether a loan is affordable. Estimating before talking to lenders sets realistic expectations and helps you compare term lengths without building amortization formulas by hand. Private browser math means salary and balance figures stay on your device while you explore scenarios.",
    useCases: [
      "Compare 36- vs 60-month auto loan payments side by side.",
      "See how a half-point rate change affects monthly cost.",
      "Estimate interest paid over the full term before signing.",
      "Stress-test borrowing amounts against your real monthly budget.",
    ],
  },
  "debt-payoff-calculator": {
    whyUse:
      "Multiple debts compete for the same monthly dollars. Modeling avalanche payoff with extra payments clarifies timelines and interest savings.",
    useCases: [
      "Prioritize high-APR cards while paying minimums elsewhere.",
      "Test what an extra $100/month does to freedom day.",
      "Plan a shrinking budget if income is temporary.",
      "Visualize payoff order before consolidating loans.",
    ],
  },
  "mortgage-calculator": {
    whyUse:
      "Home shopping hinges on payment comfort, not just list price. Estimating P&I plus taxes and insurance gives a fuller monthly picture.",
    useCases: [
      "Ballpark payments at different down payment levels.",
      "Compare 15-year vs 30-year tradeoffs.",
      "Include escrow-style tax and insurance estimates.",
      "Check affordability before touring listings.",
    ],
  },
  "compound-interest-calculator": {
    whyUse:
      "Compound growth rewards time and consistent contributions. Projecting future value makes savings goals concrete instead of abstract.",
    useCases: [
      "Estimate a rainy-day fund with monthly deposits.",
      "Illustrate compound interest for a classroom.",
      "Compare contribution amounts toward a target balance.",
      "Sketch long-term growth at a chosen annual rate.",
    ],
  },
  "roi-calculator": {
    whyUse:
      "Return on investment and annualized ROI help compare deals with different time horizons. Fast math beats ad-hoc spreadsheet formulas.",
    useCases: [
      "Evaluate a course or certification against income gain.",
      "Compare two project outcomes on an annualized basis.",
      "Check marketing spend versus attributed revenue.",
      "Summarize a personal investment’s simple ROI.",
    ],
  },
  "retirement-calculator": {
    whyUse:
      "Retirement planning starts with a nest-egg projection from savings, contributions, and assumed returns. A quick model motivates contribution changes today.",
    useCases: [
      "See the impact of raising monthly contributions.",
      "Project balances across different retirement ages.",
      "Illustrate compounding for a spouse or partner discussion.",
      "Stress-test lower assumed market returns.",
    ],
  },
  "budget-calculator": {
    whyUse:
      "Income versus expenses reveals surplus or shortfall immediately. A simple monthly budget tool beats ignoring the gap until rent day.",
    useCases: [
      "Build a first-pass budget after a job change.",
      "Find categories to trim when cash is tight.",
      "Compare planned vs actual spending totals.",
      "Teach teens how income must cover essentials first.",
    ],
  },
  "sales-tax-calculator": {
    whyUse:
      "Posted prices and tax-inclusive totals confuse checkout math. Adding or removing sales tax at any rate keeps invoices and reimbursements accurate.",
    useCases: [
      "Add local tax to a quote for a client.",
      "Back out pre-tax price from a receipt total.",
      "Compare tax impact across different rates.",
      "Estimate tax on online purchases before buying.",
    ],
  },
  "income-tax-estimator": {
    whyUse:
      "A rough federal tax estimate from taxable income helps with planning — not filing. Browser-side math keeps income figures private while you explore brackets.",
    useCases: [
      "Ballpark tax on a side-income scenario.",
      "Educate students on progressive brackets.",
      "Compare rough outcomes at different taxable incomes.",
      "Prepare questions before meeting a tax professional.",
    ],
  },
  "currency-converter": {
    whyUse:
      "Travel and online shopping cross currencies constantly. Live or manual rates let you estimate costs without installing a finance app.",
    useCases: [
      "Budget a trip from USD to EUR expenses.",
      "Check an invoice amount in your home currency.",
      "Apply a bank’s quoted manual rate for accuracy.",
      "Compare marketplace prices listed abroad.",
    ],
  },
  "salary-hourly-converter": {
    whyUse:
      "Job offers mix annual and hourly framing. Converting between salary, hourly, and common pay periods clarifies apples-to-apples comparisons.",
    useCases: [
      "Translate an annual offer into hourly pay.",
      "See monthly and biweekly take-home framing (pre-tax).",
      "Compare contract hourly rates to salaried roles.",
      "Adjust for different hours-per-week assumptions.",
    ],
  },
  "inflation-calculator": {
    whyUse:
      "Inflation quietly changes what money buys. Modeling purchasing power over years explains why savings targets must rise with prices.",
    useCases: [
      "Show how tuition costs might grow at a given rate.",
      "Adjust a past salary into today’s dollars for storytelling.",
      "Illustrate inflation for a personal finance lesson.",
      "Estimate future grocery budgets under assumed inflation.",
    ],
  },
  "buying-power-calculator": {
    whyUse:
      "Historical CPI-style comparisons answer “what was $20 worth in 1995?” with data-backed buying power — useful for nostalgia, research, and teaching.",
    useCases: [
      "Convert a childhood allowance into today’s dollars.",
      "Compare historical prices in a research paper.",
      "Explain wage changes across decades in real terms.",
      "Contextualize antique receipt amounts for a museum label.",
    ],
  },
  "refinance-calculator": {
    whyUse:
      "Refinancing only helps if monthly savings beat closing costs within a timeframe you will keep the loan. Break-even math prevents feel-good mistakes.",
    useCases: [
      "Compare a lower-rate offer including fees.",
      "Estimate months to recover closing costs.",
      "See total interest differences vs your current loan.",
      "Decide whether a cash-out refinance changes the math.",
    ],
  },
  "credit-card-payoff-calculator": {
    whyUse:
      "Minimum payments hide how long interest keeps a balance alive. Modeling payoff months and total interest motivates larger payments.",
    useCases: [
      "See how long a balance lasts at your current payment.",
      "Test a higher fixed payment to cut interest.",
      "Plan payoff before a 0% promo expires.",
      "Illustrate revolving interest for a money workshop.",
    ],
  },
  "down-payment-calculator": {
    whyUse:
      "Down payment percent, cash available, and home price are tightly linked. Solving for the missing number clarifies what you can offer.",
    useCases: [
      "Find the cash needed for 20% down on a listing.",
      "See what price you can target with saved funds.",
      "Compare 5% vs 10% down scenarios.",
      "Prepare numbers before a lender conversation.",
    ],
  },
  "amortization-schedule": {
    whyUse:
      "Month-by-month principal and interest tables explain how loans actually pay down. CSV export makes further analysis easy in Sheets or Excel.",
    useCases: [
      "Show a borrower how early payments skew to interest.",
      "Export a schedule for tax or planning records.",
      "Compare schedules after changing term length.",
      "Teach amortization mechanics in a finance class.",
    ],
  },
  "net-worth-calculator": {
    whyUse:
      "Assets minus liabilities is the clearest snapshot of financial position. A private browser balance sheet encourages honest totals without uploading to a fintech app.",
    useCases: [
      "Annual net-worth check-in for a household.",
      "Combine accounts after marriage for a shared view.",
      "Track progress while paying down student loans.",
      "List assets and debts before meeting an advisor.",
    ],
  },
  "emergency-fund-calculator": {
    whyUse:
      "Emergency funds are measured in months of essential expenses. Knowing the target and gap turns vague advice into a savings number.",
    useCases: [
      "Set a 3–6 month cash reserve goal.",
      "Recalculate after rent or childcare costs change.",
      "Track progress toward a freelance buffer.",
      "Define “essentials only” before sizing the fund.",
    ],
  },
  "401k-calculator": {
    whyUse:
      "Employer match is part of compensation. Estimating employee plus match contributions — and optional growth — shows why contributing enough to capture the match matters.",
    useCases: [
      "Model raising your deferral percentage.",
      "Estimate annual contribution with a tiered match.",
      "Project growth using a simplified return assumption.",
      "Compare outcomes before open-enrollment choices.",
    ],
  },
  "apr-calculator": {
    whyUse:
      "Stated interest rate ignores fees and points that change true yearly cost. Estimating APR helps compare loan offers more fairly.",
    useCases: [
      "Compare two mortgages with different fee structures.",
      "See how points affect estimated APR.",
      "Educate borrowers on rate vs APR differences.",
      "Sanity-check a dealer financing quote.",
    ],
  },
  "discount-markup-calculator": {
    whyUse:
      "Retail and freelance pricing mix discounts, markups, and margins. Clear math prevents selling below your intended profit.",
    useCases: [
      "Apply a 25% off sale price correctly.",
      "Markup wholesale cost to a retail target.",
      "Convert a desired margin into selling price.",
      "Check stacked discount scenarios step by step.",
    ],
  },
  "break-even-calculator": {
    whyUse:
      "Knowing how many units you must sell to cover fixed costs anchors pricing and sales targets. Break-even analysis is foundational for small businesses.",
    useCases: [
      "Price a workshop so venue costs are covered.",
      "Find units needed after a rent increase.",
      "Model lower variable costs from a new supplier.",
      "Set a revenue goal that clears break-even.",
    ],
  },
  "timezone-converter": {
    whyUse:
      "Distributed teams and travel make “what time is that for them?” a daily question. Proper zone conversion respects daylight saving better than fixed UTC offsets.",
    useCases: [
      "Schedule a call across U.S. and Europe.",
      "Convert a webinar time for attendees worldwide.",
      "Check arrival local time for an international flight.",
      "Coordinate game nights across friend time zones.",
    ],
  },
  timer: {
    whyUse:
      "Focus sessions, workouts, and cooking need a reliable stopwatch or countdown without installing another app. A browser timer is always one tab away.",
    useCases: [
      "Run Pomodoro-style focus blocks.",
      "Time HIIT intervals with lap splits.",
      "Countdown a presentation rehearsal.",
      "Track boiling or baking steps in the kitchen.",
    ],
  },
  "name-picker": {
    whyUse:
      "Fair random selection ends arguments in classrooms, giveaways, and standups. A transparent draw from your list is better than someone “randomly” choosing favorites.",
    useCases: [
      "Pick a raffle winner at an event.",
      "Choose who answers next in class.",
      "Rotate facilitators for team meetings.",
      "Select a giveaway winner on a livestream.",
    ],
  },
  "random-number-generator": {
    whyUse:
      "Games, sampling, and decision prompts need numbers in a range. Generating one or many values beats biased “pick a number” moments.",
    useCases: [
      "Roll initiative-style numbers for a campaign.",
      "Sample random IDs within a testing range.",
      "Pick a random page number in a book club.",
      "Generate multiple numbers for raffle tickets.",
    ],
  },
  "coin-flip": {
    whyUse:
      "Binary decisions sometimes deserve a coin. A virtual flip is fast, fair, and does not require digging for spare change — useful when two options are equally fine and you just need momentum. Each flip is independent, so you can also demonstrate basic probability without physical props.",
    useCases: [
      "Decide who kicks off in a casual backyard game.",
      "Break a tie between two dinner options after a long day.",
      "Teach probability with repeated flips and a simple tally.",
      "Choose which chore you do first when both are equally unpleasant.",
    ],
  },
  "dice-roller": {
    whyUse:
      "Tabletop games and classrooms need dice that do not get lost under the couch. Virtual dice with custom sides cover d6, d20, and more.",
    useCases: [
      "Roll a d20 during an online RPG session.",
      "Play board games when physical dice are missing.",
      "Teach expected value with many rolls.",
      "Generate random damage totals for homebrew rules.",
    ],
  },
  "list-shuffler": {
    whyUse:
      "Random order removes bias from agendas, playlists, and brackets. Shuffling locally keeps private lists off cloud “randomizer” sites, which matters when lines contain employee names, student emails, or unreleased track titles. A clean shuffle also beats dragging rows around in a spreadsheet when you only need a fair new sequence.",
    useCases: [
      "Shuffle a playlist for a party so the same songs are not always first.",
      "Randomize lightning-talk order at a meetup without favoritism.",
      "Seed a tournament bracket fairly from a registration list.",
      "Rotate chore lists each week so nobody always gets the worst task.",
    ],
  },
  "team-splitter": {
    whyUse:
      "Balanced random teams keep games and workshops fair. Automatic splitting beats captains picking friends first, and it saves facilitators from awkward politics when everyone can see the draw came from the same list. Because names never leave your browser, classroom and corporate rosters stay on the device you already trust.",
    useCases: [
      "Divide a class into project groups of roughly equal size.",
      "Make teams for a company offsite game in seconds.",
      "Split players for pickup sports when captains disagree.",
      "Assign breakout rooms without favoritism during a remote workshop.",
    ],
  },
  "yes-no-picker": {
    whyUse:
      "When you are stuck on a true binary choice, a random yes/no breaks analysis paralysis. It is a lighthearted tie-breaker — not a substitute for high-stakes judgment.",
    useCases: [
      "Decide whether to watch one more episode.",
      "Pick yes/no icebreakers for parties.",
      "Teach kids about chance with a simple tool.",
      "Break a low-stakes stalemate quickly.",
    ],
  },
  sudoku: {
    whyUse:
      "Sudoku trains logic without a download or account wall. Difficulty levels plus notes and conflict highlights make practice sessions smoother on any device.",
    useCases: [
      "Play a quick puzzle during a commute.",
      "Practice pencil-mark techniques with notes mode.",
      "Challenge yourself on hard difficulty.",
      "Use keyboard entry for faster solving on desktop.",
    ],
  },
  wordle: {
    whyUse:
      "Wordle-style play is a daily brain teaser. An independent browser version lets you practice five-letter logic anytime without an account.",
    useCases: [
      "Warm up before the official daily puzzle.",
      "Practice vocabulary and deduction skills.",
      "Play offline-friendly sessions in a browser tab.",
      "Share friendly competition rules with family.",
    ],
  },
};

// Verify extras cover all tools
const missingExtras = toolMeta.filter((t) => !extras[t.slug]).map((t) => t.slug);
if (missingExtras.length) {
  console.error("Missing extras for:", missingExtras);
  process.exit(1);
}

function wordCount(...parts) {
  return parts
    .flat()
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function expandWhatItDoes(tool, guide) {
  const base = guide.whatItDoes.trim();
  // Idempotent: skip if already enriched
  if (base.includes("free online utility on ToolBox")) {
    return base;
  }
  const addon = `${tool.name} is a free online utility on ToolBox (fastfreetools.net) that runs in your browser with no account required. ${tool.description} Because processing stays on your device whenever possible, you can work quickly while keeping drafts, uploads, and personal numbers more private than typical upload-to-server converters.`;
  return `${base} ${addon}`;
}

function expandFaqs(tool, guide, extra) {
  const faqs = [...guide.faqs];
  const extrasFaqs = [
    {
      question: `Is ${tool.name} free to use?`,
      answer: `Yes. ${tool.name} is free on ToolBox — no subscription is required to use the core features in your browser.`,
    },
    {
      question: `Why choose a browser-based ${tool.name}?`,
      answer: `Browser tools open instantly on any device, avoid installs, and — for local processing — reduce the need to upload sensitive files or numbers to a third-party server.`,
    },
  ];
  for (const f of extrasFaqs) {
    if (!faqs.some((x) => x.question === f.question)) faqs.push(f);
  }
  return faqs;
}

function buildGuide(tool) {
  const guide = existing[tool.slug];
  if (!guide) {
    console.error("No existing guide for", tool.slug);
    process.exit(1);
  }
  const extra = extras[tool.slug];
  const whatItDoes = expandWhatItDoes(tool, guide);
  const whyUse = `${extra.whyUse} ${categoryWhy[tool.category]}`;
  const howToUse = guide.howToUse;
  const useCases = extra.useCases;
  const supportedFormats = guide.supportedFormats;
  const privacy = guide.privacy;
  const faqs = expandFaqs(tool, guide, extra);

  // Closing tips paragraph — append once
  const tips = `Tips for better results with ${tool.name}: follow the steps above, double-check inputs before you download or copy anything, and keep this tab open until you save your output. If something looks wrong, refresh and try again with a smaller sample first. When you need a related utility — another converter, calculator, text cleaner, or randomizer — open the All Tools directory and follow the internal links to the next page on this site.`;
  const whatWithTips = whatItDoes.includes("Tips for better results")
    ? whatItDoes
    : `${whatItDoes} ${tips}`;

  return {
    whatItDoes: whatWithTips,
    whyUse,
    howToUse,
    useCases,
    supportedFormats,
    privacy,
    faqs,
  };
}

function esc(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const built = {};
const counts = [];
for (const tool of toolMeta) {
  const g = buildGuide(tool);
  built[tool.slug] = g;
  const wc = wordCount(
    g.whatItDoes,
    g.whyUse,
    g.howToUse,
    g.useCases,
    g.supportedFormats,
    g.privacy,
    g.faqs.map((f) => `${f.question} ${f.answer}`),
  );
  counts.push({ slug: tool.slug, wc });
}

counts.sort((a, b) => a.wc - b.wc);
console.log(
  `Word counts — min ${counts[0].wc} (${counts[0].slug}), max ${counts.at(-1).wc} (${counts.at(-1).slug}), avg ${(
    counts.reduce((s, c) => s + c.wc, 0) / counts.length
  ).toFixed(0)}`,
);
const under = counts.filter((c) => c.wc < 300);
if (under.length) {
  console.warn(
    "Under 300 words:",
    under.map((u) => `${u.slug}:${u.wc}`).join(", "),
  );
}

let body = `import type { ToolGuide } from "./tool-guide-types";

export const toolGuides: Record<string, ToolGuide> = {\n`;

for (const tool of toolMeta) {
  const g = built[tool.slug];
  body += `  ${JSON.stringify(tool.slug)}: {\n`;
  body += `    whatItDoes: \`${esc(g.whatItDoes)}\`,\n`;
  body += `    whyUse: \`${esc(g.whyUse)}\`,\n`;
  body += `    howToUse: [\n`;
  for (const step of g.howToUse) body += `      \`${esc(step)}\`,\n`;
  body += `    ],\n`;
  body += `    useCases: [\n`;
  for (const u of g.useCases) body += `      \`${esc(u)}\`,\n`;
  body += `    ],\n`;
  body += `    supportedFormats: [\n`;
  for (const f of g.supportedFormats) body += `      \`${esc(f)}\`,\n`;
  body += `    ],\n`;
  body += `    privacy: \`${esc(g.privacy)}\`,\n`;
  body += `    faqs: [\n`;
  for (const faq of g.faqs) {
    body += `      {\n`;
    body += `        question: \`${esc(faq.question)}\`,\n`;
    body += `        answer: \`${esc(faq.answer)}\`,\n`;
    body += `      },\n`;
  }
  body += `    ],\n`;
  body += `  },\n`;
}

body += `};

export function getToolGuide(slug: string): ToolGuide | undefined {
  return toolGuides[slug];
}
`;

writeFileSync(join(root, "src/lib/tool-guides.ts"), body);
console.log("Wrote enriched tool-guides.ts");
