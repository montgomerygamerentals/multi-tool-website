import type { ToolGuide } from "./tool-guide-types";

/**
 * High-quality, search-intent-focused guides for the pages with the most
 * Google Search Console impressions. Merged over the base guides at runtime.
 */
export const priorityToolGuides: Record<string, ToolGuide> = {
  "roi-calculator": {
    whatItDoes:
      "This free online ROI calculator shows return on investment and optional annualized ROI from an initial cost and a final value (or gain). Use it when you need a clear percentage return before comparing deals, projects, or marketing spend.",
    whatIsHeading: "What is ROI (return on investment)?",
    whatIs:
      "Return on investment (ROI) is a simple performance measure: how much you gained or lost relative to what you put in. A positive ROI means the outcome was worth more than the cost; a negative ROI means you lost money relative to the starting amount. People search for an ROI calculator when they want that percentage quickly — for investments, courses, campaigns, or any cash outlay with a measurable result.",
    howItWorks:
      "Enter the money you spent (initial investment) and either the final value of what you have now or the gain/loss amount. The calculator computes simple ROI as a percentage. If you also enter a holding period in years, it annualizes the return so a 35% gain over 18 months is not treated the same as 35% over three years.",
    formula:
      "ROI (%) = ((Final value − Initial cost) ÷ Initial cost) × 100\nAnnualized ROI ≈ (Final ÷ Initial)^(1 ÷ years) − 1",
    whyUse:
      "A spreadsheet works, but a dedicated return on investment calculator keeps the formula consistent and makes annualized comparisons obvious. That matters when one option ran for six months and another for two years — simple ROI alone can mislead.",
    howToUse: [
      "Enter the initial investment (what you spent).",
      "Choose final value or gain/loss, then enter that amount.",
      "Optionally add the holding period in years for annualized ROI.",
      "Read the ROI percentage, dollar gain or loss, and annualized figure if provided.",
    ],
    useCases: [
      "Compare two project outcomes on an annualized basis.",
      "Check marketing spend against attributed revenue (simple ROI, not ROAS).",
      "Evaluate a course or certification against an income change.",
      "Summarize a personal investment’s simple return before diving into IRR or CAGR models.",
    ],
    supportedFormats: [
      "Currency amounts for cost, final value, or gain",
      "Optional holding period in years (supports fractions such as 1.5)",
    ],
    privacy:
      "This tool runs entirely in your browser. Amounts you enter never leave your device — nothing is uploaded to our servers.",
    sections: [
      {
        heading: "ROI vs profit",
        body: "Profit is usually a dollar amount (revenue minus costs, or final value minus cost). ROI expresses that same idea as a percentage of the original investment. A $500 profit on a $1,000 outlay is 50% ROI; a $500 profit on a $10,000 outlay is only 5% ROI. Both made $500, but the efficiency of the capital was very different.",
      },
      {
        heading: "ROI vs ROAS",
        body: "ROAS (return on ad spend) is common in advertising: revenue attributed to ads divided by ad spend. ROI typically subtracts cost from the result first, so it reflects net return relative to investment. A campaign can show strong ROAS and still weak ROI once product cost, fees, or fulfillment are included. This calculator is for classic ROI, not a full ROAS attribution model.",
      },
      {
        heading: "Interpreting positive and negative ROI",
        body: "Positive ROI means the final value exceeded the cost. Negative ROI means you ended below the initial outlay — for example, buying something for $1,000 that later is worth $800 is −20% ROI. Zero ROI means you broke even on value. Annualized ROI helps compare results across different time spans; it is not a guarantee of future returns.",
      },
    ],
    faqs: [
      {
        question: "What is the ROI formula?",
        answer:
          "Simple ROI is ((final value − initial cost) ÷ initial cost) × 100. If you only know the gain, final value is initial cost plus gain.",
      },
      {
        question: "What is annualized ROI?",
        answer:
          "It restates the total return on a per-year basis so investments held for different lengths are easier to compare. It assumes a steady compounding path for the math — real markets vary.",
      },
      {
        question: "Does ROI include ongoing costs?",
        answer:
          "Only if you fold them into the amounts you enter. The formula uses the inputs you provide; it does not invent fees or taxes.",
      },
      {
        question: "Is this investment advice?",
        answer:
          "No. It is a simple math tool for return on investment calculations. It does not account for risk, taxes, or liquidity.",
      },
    ],
  },

  "down-payment-calculator": {
    whatItDoes:
      "This home down payment calculator solves for cash needed, down payment percentage, or an affordable purchase price from the two numbers you already know — so you can compare 5%, 10%, and 20% down scenarios before you talk to a lender.",
    whatIsHeading: "What is a down payment?",
    whatIs:
      "A down payment is the portion of a home’s purchase price you pay upfront in cash (or equity). The rest is typically financed with a mortgage. Down payment percentage is cash ÷ purchase price. Loan amount is roughly purchase price minus down payment (before closing costs and other fees).",
    howItWorks:
      "Pick the mode that matches what you know: price and percent, price and cash amount, or cash and percent (to solve for price). The calculator links those three numbers so changing one updates the related fields. It focuses on down payment math — not interest rates, PMI premiums, or closing-cost quotes.",
    formula:
      "Down payment ($) = Purchase price × (Down payment % ÷ 100)\nDown payment % = (Down payment $ ÷ Purchase price) × 100\nLoan amount ≈ Purchase price − Down payment $\nAffordable price (at a target %) ≈ Cash available ÷ (Down payment % ÷ 100)",
    whyUse:
      "Listings are quoted as prices; savings accounts are cash. Translating between percent down, dollars down, and a realistic purchase price prevents shopping for homes that require more cash than you have — or underestimating how much a 20% down target actually is.",
    howToUse: [
      "Choose whether you are solving from price + percent, price + cash, or cash + percent.",
      "Enter the two known values.",
      "Read the missing figure: cash needed, percent down, or target home price.",
      "Note the implied loan amount (price minus down payment) as you compare scenarios.",
    ],
    useCases: [
      "Find the cash needed for 20% down on a listing price.",
      "See what purchase price you can target with a fixed savings balance at 10% or 20% down.",
      "Compare 5% vs 10% vs 20% down on the same home.",
      "Prepare clear numbers before a lender or agent conversation.",
    ],
    supportedFormats: [
      "Home purchase price, down payment percent, and cash amounts",
      "Implied loan amount as price minus down payment",
    ],
    privacy:
      "This tool runs entirely in your browser. Your figures never leave your device — nothing is uploaded to our servers.",
    sections: [
      {
        heading: "How changing the down payment affects the loan",
        body: "A larger down payment lowers the loan amount dollar-for-dollar (before fees). On a $400,000 home, 5% down is $20,000 cash and about a $380,000 loan; 20% down is $80,000 cash and about a $320,000 loan. The smaller loan usually means a lower monthly principal-and-interest payment, but you also need more cash at closing. This page does not quote mortgage rates or monthly payments — use the mortgage calculator for payment estimates.",
      },
      {
        heading: "Closing costs are separate",
        body: "Down payment is not the same as cash to close. Closing costs, prepaid items, and reserves can add substantially beyond the down payment. Budget for those separately; this calculator intentionally focuses on purchase price, percent, and down payment cash.",
      },
    ],
    faqs: [
      {
        question: "How much down payment do I need?",
        answer:
          "It depends on the loan program and lender. Some loans allow relatively low down payments; putting 20% down on a conventional loan often avoids private mortgage insurance (PMI). Confirm requirements with a lender — this tool only does the arithmetic.",
      },
      {
        question: "Does this include mortgage rates?",
        answer:
          "No. It does not estimate interest rates or monthly payments. It solves down payment amount, percent, and related purchase-price math only.",
      },
      {
        question: "Does this include closing costs?",
        answer:
          "No. It focuses on down payment math. Plan separately for closing costs and reserves.",
      },
      {
        question: "Is my data private?",
        answer: "Yes. Calculations run locally in your browser.",
      },
    ],
  },

  "code-comparison": {
    whatItDoes:
      "This online code comparison tool (code diff) lets you paste two snippets side by side and see added, removed, and unchanged lines with line numbers — useful for config changes, small refactors, and reviewing a patch without opening a full IDE.",
    whatIsHeading: "What is code comparison?",
    whatIs:
      "Code comparison (often called a diff or code compare) shows the differences between two versions of text or source. Green-style additions and red-style removals help you spot what changed. Searchers looking for “code compare,” “code comparison tools,” or “compare two code files” usually want a fast browser diff, not a full Git client.",
    howItWorks:
      "Paste the original (left) and modified (right) code. The tool builds a side-by-side diff: matching lines stay aligned, removals appear on the left, additions on the right, and word-level highlights call out edits within a line. You can ignore whitespace when indentation-only noise is getting in the way. Navigate change hunks to jump between differences. There is no language-specific syntax highlighting theme — the focus is accurate line and word diffs for any text-based code.",
    whyUse:
      "IDE diffs are great inside a repo; this page is for pasted snippets from chat, tickets, or staging vs production configs when you do not want to create a branch just to see what changed. Everything runs in the browser so proprietary code is not uploaded.",
    howToUse: [
      "Paste the older or “before” code into the left panel.",
      "Paste the newer or “after” code into the right panel.",
      "Scan highlighted additions and removals; use hunk navigation if the diff is long.",
      "Turn on ignore-whitespace when you only care about substantive changes.",
      "Copy either pane when you need to keep a cleaned-up version.",
    ],
    useCases: [
      "Compare nginx, JSON, or env configs between staging and production.",
      "Review a hotfix snippet someone sent in chat.",
      "Diff two versions of a function before merging a pull request discussion.",
      "Check classmate or interview solutions against a reference implementation.",
    ],
    supportedFormats: [
      "Plain text / source code of any language",
      "Side-by-side diff with line numbers and inline change highlights",
      "Optional ignore-whitespace comparison",
    ],
    privacy:
      "Diffing runs entirely in your browser. Code you paste is not uploaded to our servers.",
    sections: [
      {
        heading: "What this tool does and does not do",
        body: "It compares two pasted snippets with line numbers, added/removed highlighting, inline word highlights, hunk navigation, and an ignore-whitespace option. It does not clone Git repositories, merge conflicts, or apply language-aware AST diffs. For whole-project history, use Git; for two blobs of text, this code compare view is enough.",
      },
      {
        heading: "Tips for cleaner diffs",
        body: "Pretty-print JSON or format code the same way on both sides before comparing — otherwise minified vs formatted text looks like every line changed. Align line endings when possible. If you only need prose differences, the Text Diff tool may be a better fit.",
      },
    ],
    faqs: [
      {
        question: "Which programming languages are supported?",
        answer:
          "Any text-based code. The diff is based on lines and words, not a language parser, so JavaScript, Python, JSON, YAML, and configs all work the same way.",
      },
      {
        question: "Can I compare whole repositories?",
        answer:
          "No. This is a snippet-level online code comparison tool, not a full Git repository diff viewer.",
      },
      {
        question: "Is syntax highlighting included?",
        answer:
          "The viewer highlights additions and removals (and inline word changes). It does not apply a full language syntax color theme.",
      },
      {
        question: "Is my code uploaded?",
        answer: "No. Comparison happens locally in your browser.",
      },
    ],
  },

  "png-to-webp": {
    whatItDoes:
      "Convert PNG images to WebP in your browser. Keep a PNG master when you need lossless editing; ship WebP on the web for smaller file sizes. Conversion and quality controls run on your device.",
    whatIsHeading: "What is WebP, and why convert from PNG?",
    whatIs:
      "WebP is an image format designed for the web. It often produces smaller files than PNG at similar visual quality, which helps pages load faster and use less bandwidth. A PNG to WebP converter is what people reach for when they have transparent graphics or UI assets in PNG and want a lighter file for production.",
    howItWorks:
      "Upload a PNG (or another browser-readable image if allowed by the picker). The converter draws it to a canvas and encodes WebP at the quality you choose, then lets you download the result. Because encoding uses the browser’s image APIs, the file is processed locally — it is not sent to an upload farm.",
    whyUse:
      "PNG is excellent as a master format (especially with transparency), but PNG files can be large on marketing pages and blogs. Converting to WebP cuts weight for modern browsers while you keep the original PNG in source control. Doing it locally means product shots and unreleased UI never sit on a third-party converter.",
    howToUse: [
      "Upload your PNG image.",
      "Confirm WebP as the output format (locked on this page).",
      "Adjust quality if you want a smaller file; preview the tradeoff.",
      "Convert and download the WebP file.",
    ],
    useCases: [
      "Optimize PNG illustrations and diagrams for a marketing site.",
      "Cut bandwidth on image-heavy blog posts.",
      "Prepare WebP variants alongside PNG masters for modern browsers.",
      "Shrink UI chrome assets in a static site or design handoff.",
    ],
    supportedFormats: [
      "Input: PNG (primary); other browser-decodable images may load depending on the file",
      "Output: WebP",
      "Quality slider for lossy WebP encoding tradeoffs",
    ],
    privacy:
      "Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.",
    sections: [
      {
        heading: "Quality and file-size considerations",
        body: "Higher quality settings keep more detail and usually produce larger WebP files. Lower settings shrink the download but can soften edges or add compression artifacts — more noticeable on text, UI chrome, and flat graphics than on photos. For sharp icons with few colors, compare a few quality points and keep the PNG master if you still need lossless editing later.",
      },
      {
        heading: "Transparency and browser support",
        body: "WebP can retain transparency when the source has an alpha channel and the encoder supports it in your browser. Most modern browsers display WebP; if you must support very old clients, keep a PNG or JPEG fallback in your site’s picture/source setup.",
      },
    ],
    faqs: [
      {
        question: "Why convert PNG to WebP?",
        answer:
          "WebP often yields smaller files than PNG at similar visual quality, which improves page load performance.",
      },
      {
        question: "Do all browsers support WebP?",
        answer:
          "Most modern browsers do. Keep a fallback format if you must support very old clients.",
      },
      {
        question: "Is my PNG uploaded to a server?",
        answer:
          "No. Conversion runs in your browser using local processing.",
      },
      {
        question: "Will quality drop?",
        answer:
          "WebP encoding can be lossy depending on quality settings. Start high and lower only until the file size meets your budget.",
      },
    ],
  },

  "aspect-ratio-finder": {
    whatItDoes:
      "Upload an image to calculate its aspect ratio from width and height — including pixel dimensions, orientation, and the closest common ratio such as 16:9, 4:3, 3:2, or 1:1.",
    whatIsHeading: "What is aspect ratio?",
    whatIs:
      "Aspect ratio is the proportional relationship between width and height, written as W:H (for example 16:9). An aspect ratio finder or aspect ratio calculator answers “what ratio is this image?” so you can match social templates, video frames, or print specs without guessing.",
    howItWorks:
      "When you upload an image, the tool reads its pixel width and height, simplifies the ratio (using the greatest common divisor), and compares it to common standards within a small tolerance. You also see orientation (landscape, portrait, or square). The file is inspected in the browser; the pixels are not uploaded to a server.",
    formula:
      "Aspect ratio = width ÷ height\nSimplified W:H uses gcd(width, height)\nExample: 1920×1080 → divide by 120 → 16:9",
    whyUse:
      "Design specs call for 16:9 thumbnails, 4:5 portraits, 1:1 avatars, and other frames. Knowing an image’s true ratio and nearest standard saves trial-and-error cropping and prevents stretched media.",
    howToUse: [
      "Upload an image (PNG, JPEG, WebP, or another browser-readable format).",
      "Review pixel dimensions, simplified aspect ratio, and orientation.",
      "Note the closest common ratio if you need a standard frame for crop or export.",
    ],
    useCases: [
      "Check whether a photo will fit a YouTube 16:9 thumbnail template.",
      "Confirm orientation before sending assets to a printer.",
      "Match blog featured-image or social requirements without guessing.",
      "Audit exports to see which shots need reframing in the image cropper.",
    ],
    supportedFormats: [
      "Input: PNG, JPEG/JPG, WebP, GIF, and other browser-readable images",
      "Output: On-screen analysis (dimensions, ratio, closest common ratio)",
    ],
    privacy:
      "Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.",
    sections: [
      {
        heading: "Common aspect ratios",
        body: "1:1 (square avatars), 4:5 (many portrait social posts), 3:2 and 2:3 (classic photo), 4:3 and 3:4 (standard / older displays), 16:9 and 9:16 (widescreen and vertical video), 21:9 (ultrawide), plus cinema-style and golden-ratio approximations. Real photos are rarely exact; the “closest” match tells you which template will crop the least.",
      },
      {
        heading: "Width and height without uploading a design file",
        body: "This page calculates ratio from an image file’s intrinsic pixel size. If you already know width and height from a brief (for example 1200×628), divide width by height or simplify the fraction the same way — 1200×628 is close to 1.91:1, a common link-preview shape.",
      },
    ],
    faqs: [
      {
        question: "What is an aspect ratio?",
        answer:
          "It is the proportional relationship between width and height, often written as W:H (for example 16:9).",
      },
      {
        question: "Why does it show a “closest” ratio?",
        answer:
          "Real photos are rarely exact standards. The tool maps your dimensions to the nearest common ratio within a small tolerance for design work.",
      },
      {
        question: "Does this edit my image?",
        answer:
          "No. It only inspects dimensions. Use the image cropper or resizer if you need to change the frame.",
      },
      {
        question: "Can I calculate ratio from width and height alone?",
        answer:
          "Yes conceptually: divide width by height or simplify W:H. This tool reads those dimensions from an uploaded image automatically.",
      },
    ],
  },

  "buying-power-calculator": {
    whatItDoes:
      "Compare what a U.S. dollar amount from one year is worth in another using historical CPI-style data packaged with the tool — useful for “then vs now” purchasing power questions.",
    whatIs:
      "Buying power (purchasing power) describes how much a sum of money can buy. Inflation erodes buying power over time: the same face-value dollar buys fewer goods and services later. A buying power calculator translates an amount from one year into the equivalent in another year using a price index.",
    howItWorks:
      "Enter an amount, the original year, and the comparison year. The calculator applies the ratio of index values between those years to estimate equivalent purchasing power. Results are national-style CPI comparisons, not a quote for a specific city’s rent or a single product.",
    formula:
      "Value in year B ≈ Value in year A × (Index_B ÷ Index_A)\n(using the historical CPI-style series bundled with this tool)",
    whyUse:
      "Old salaries, allowances, and sticker prices are hard to interpret without adjustment. A CPI-based conversion puts childhood prices, historical wages, or archive receipts into today’s (or another year’s) dollars for teaching, writing, and personal curiosity.",
    howToUse: [
      "Enter the dollar amount.",
      "Choose the year that amount is from.",
      "Choose the year you want to compare to.",
      "Read the equivalent buying-power amount.",
    ],
    useCases: [
      "Convert a childhood allowance into recent dollars.",
      "Put historical prices in a research paper or article in comparable terms.",
      "Explain wage changes across decades in real (inflation-adjusted) terms.",
      "Contextualize antique receipt amounts for exhibits or family history.",
    ],
    supportedFormats: [
      "USD amounts and calendar years covered by the bundled dataset",
    ],
    privacy:
      "This tool runs entirely in your browser. Amounts you enter never leave your device.",
    sections: [
      {
        heading: "What this is not",
        body: "CPI-style buying power is not a personal inflation rate, a city-level rent index, or investment return. Asset prices (stocks, houses) can diverge from consumer prices. For forward-looking “what will $50 cost in 10 years?” sketches at a rate you choose, use the inflation calculator.",
      },
    ],
    faqs: [
      {
        question: "What data powers this?",
        answer:
          "Historical U.S. consumer price index style figures packaged with the tool for year-to-year comparisons.",
      },
      {
        question: "Is this exact for my city?",
        answer:
          "No. CPI is a national-style index. Local prices for specific goods can differ a lot.",
      },
      {
        question: "Do you collect the amounts I enter?",
        answer: "No. Calculation is local.",
      },
    ],
  },

  "budget-calculator": {
    whatItDoes:
      "Build a simple monthly budget by comparing income to expenses so you can see surplus or shortfall immediately — no account required.",
    whatIs:
      "A budget is a plan for money in versus money out. A monthly budget calculator totals income and expense lines so you can see what remains. Searchers looking for a budget calculator usually want that snapshot quickly, not a full banking app.",
    howItWorks:
      "Enter take-home (or other) income and list expense amounts by category. The tool subtracts total expenses from income. A positive remainder is surplus; a negative result is a shortfall you need to cover by cutting spending, raising income, or both.",
    formula: "Remaining = Monthly income − Σ expenses\nSurplus if remaining > 0; shortfall if remaining < 0",
    whyUse:
      "Ignoring the gap until rent day is expensive. A first-pass monthly budget surfaces categories that do not fit and makes tradeoffs visible before you commit to subscriptions or a housing change.",
    howToUse: [
      "Enter monthly income (preferably take-home pay).",
      "Add expense categories and amounts.",
      "Review the remaining balance (surplus or shortfall).",
      "Adjust categories and recalculate until the plan fits.",
    ],
    useCases: [
      "Build a first-pass budget after a job change.",
      "Find categories to trim when cash is tight.",
      "Compare planned totals before a move or new lease.",
      "Teach teens how income must cover essentials first.",
    ],
    supportedFormats: ["Currency amounts for income and expenses"],
    privacy:
      "This tool runs entirely in your browser. Your budget figures are not uploaded to our servers.",
    sections: [
      {
        heading: "Tips for a realistic monthly plan",
        body: "Use after-tax income when you can. Average irregular costs into a monthly amount (annual insurance ÷ 12). Separate “misc” into real categories like dining or software so the surplus is not fiction. Pair this with the emergency fund calculator once you know essential monthly expenses.",
      },
    ],
    faqs: [
      {
        question: "Should I use take-home pay?",
        answer:
          "Yes — budgeting with after-tax income is usually more realistic than gross pay.",
      },
      {
        question: "Can I plan irregular expenses?",
        answer:
          "Average them into a monthly amount (for example annual insurance ÷ 12).",
      },
      {
        question: "Is my budget uploaded?",
        answer: "No.",
      },
    ],
  },

  "sales-tax-calculator": {
    whatItDoes:
      "Add sales tax to a price or back out the pre-tax amount from a receipt total for any rate you enter — tax amount and totals update instantly.",
    whatIs:
      "Sales tax is a percentage added to taxable purchases in many jurisdictions. A sales tax calculator either applies a rate to a net price or reverses a tax-inclusive total so you can see the pre-tax amount and the tax portion.",
    howItWorks:
      "Enter a price and a tax rate. In add-tax mode, tax = price × rate and total = price + tax. In remove-tax mode, the tool divides a gross total by (1 + rate) to recover the pre-tax price, then shows the tax component. You supply the rate — the page does not look up your city’s rate.",
    formula:
      "Tax = Price × (Rate ÷ 100)\nTotal = Price + Tax\nPre-tax from total = Total ÷ (1 + Rate ÷ 100)",
    whyUse:
      "Posted prices and tax-inclusive receipts are easy to mix up for quotes, reimbursements, and online checkout estimates. Doing the math for any percentage keeps invoices and expense reports consistent.",
    howToUse: [
      "Enter the price (or tax-inclusive total) and the tax rate percent.",
      "Choose add tax or remove tax from a total.",
      "Copy the tax amount and final or pre-tax price.",
    ],
    useCases: [
      "Add local tax to a client quote.",
      "Back out pre-tax price from a receipt total.",
      "Estimate tax on an online purchase before buying.",
      "Compare tax impact across different rates you were quoted.",
    ],
    supportedFormats: ["Currency amounts and tax rates (%)"],
    privacy:
      "This tool runs entirely in your browser. Amounts you enter are not uploaded.",
    sections: [
      {
        heading: "Rates vary by location",
        body: "Combined state, county, and city rates can differ even a few miles apart, and some items are exempt. Confirm the official rate for your transaction. This calculator applies the percentage you type; it is not a tax filing product.",
      },
    ],
    faqs: [
      {
        question: "Does this know my local rate?",
        answer:
          "You enter the rate. Local sales tax can vary by city or county — confirm with an official source.",
      },
      {
        question: "Can I reverse out tax from a total?",
        answer:
          "Yes. Use remove-tax mode to find the pre-tax amount from a tax-inclusive price.",
      },
      {
        question: "Are amounts stored?",
        answer: "No.",
      },
    ],
  },

  "random-number-generator": {
    whatItDoes:
      "Generate one or many random integers in a minimum–maximum range you set. Optional “no duplicates” mode draws unique numbers when the range is large enough.",
    whatIs:
      "A random number generator (RNG) produces numbers that are not chosen by hand — useful for games, sampling, raffles, and classroom demos. Online RNGs typically let you set a range and how many values to draw.",
    howItWorks:
      "Set min, max, and count, then generate. Each value is chosen with the browser’s random number facilities across the inclusive integer range. With “no duplicates” enabled, each draw is unique until the range is exhausted (count cannot exceed the size of the range).",
    whyUse:
      "Picking “random” numbers mentally is biased. A simple generator is faster for raffle tickets, practice sets, and game prompts — and you can copy a list of results in one click.",
    howToUse: [
      "Set the minimum and maximum (inclusive).",
      "Choose how many numbers to generate.",
      "Optionally enable no duplicates.",
      "Click Generate and copy the results.",
    ],
    useCases: [
      "Generate raffle or seating numbers in a range.",
      "Sample random IDs within a testing range.",
      "Pick a random page number for a book club.",
      "Create multiple integers for classroom probability demos.",
    ],
    supportedFormats: [
      "Integers within your chosen numeric range",
      "One or many results; optional unique draws",
    ],
    privacy:
      "This tool runs entirely in your browser. Results are not logged on our servers.",
    sections: [
      {
        heading: "Duplicates and uniqueness",
        body: "Without “no duplicates,” the same integer can appear more than once — like rolling a die repeatedly. With uniqueness on, the tool samples without replacement. If you need a random order of an entire list of names, use the list shuffler or name picker instead.",
      },
      {
        heading: "Not for cryptography",
        body: "Casual games and classroom use are fine. For security-critical keys, tokens, or lotteries with legal requirements, use dedicated cryptographic generators and follow the rules of that system.",
      },
    ],
    faqs: [
      {
        question: "Can numbers repeat?",
        answer:
          "Yes, unless you enable no duplicates. Unique mode requires that the count not exceed the size of the min–max range.",
      },
      {
        question: "Is this suitable for cryptography?",
        answer:
          "For casual use, yes. For security-critical keys, prefer dedicated cryptographic tooling and OS facilities.",
      },
      {
        question: "Are results logged?",
        answer: "No.",
      },
    ],
  },

  "team-splitter": {
    whatItDoes:
      "Randomly divide a list of names into balanced teams for games, classes, and workshops. Uneven counts are distributed so group sizes differ by at most one.",
    whatIs:
      "A team splitter (random team generator) takes a roster and partitions it into N groups without captains picking favorites. Facilitators use it for classroom projects, offsites, and pickup games when fairness and speed matter more than manual drafting.",
    howItWorks:
      "Paste one name per line, choose how many teams, and generate. Names are shuffled and dealt into groups as evenly as possible. If 17 people become 4 teams, you get sizes like 5–4–4–4 rather than leaving people out.",
    whyUse:
      "Manual team picks create politics and slow down the start of an activity. A transparent random split keeps the focus on the exercise. Because names stay in the browser, classroom and corporate rosters are not uploaded to a third-party picker.",
    howToUse: [
      "Paste participant names (one per line).",
      "Choose how many teams you want.",
      "Generate balanced random teams.",
      "Copy the groups into your slides, chat, or whiteboard.",
    ],
    useCases: [
      "Divide a class into project groups of roughly equal size.",
      "Make teams for a company offsite game in seconds.",
      "Split players for pickup sports when captains disagree.",
      "Assign breakout rooms without favoritism in a remote workshop.",
    ],
    supportedFormats: ["Plain text name or item lists (one entry per line)"],
    privacy:
      "This tool runs entirely in your browser. Names you paste are not uploaded to our servers.",
    sections: [
      {
        heading: "Fairness vs skill balance",
        body: "Random teams are fair in the sense that nobody is chosen last by a captain. They are not guaranteed to balance skill. If competitive balance matters, seed a few strong players manually and randomize the rest, or re-roll until the mix looks reasonable for a friendly game.",
      },
    ],
    faqs: [
      {
        question: "What if the count does not divide evenly?",
        answer:
          "Teams will be as balanced as possible, with some groups differing by one person.",
      },
      {
        question: "Can I re-roll teams?",
        answer: "Yes. Run the splitter again for a new random grouping.",
      },
      {
        question: "Are names stored?",
        answer: "No. Everything stays in your browser session.",
      },
    ],
  },

  "emergency-fund-calculator": {
    whatItDoes:
      "Set an emergency-fund target from monthly essential expenses and months of coverage, then see the gap versus cash you already have.",
    whatIs:
      "An emergency fund is cash set aside for unexpected expenses or income loss — typically measured in months of essential living costs. An emergency fund calculator turns “I should save more” into a concrete target and remaining gap.",
    howItWorks:
      "Enter essential monthly expenses, choose how many months of coverage you want (often 3–6), and enter what you have saved. Target = expenses × months. Gap = target − current savings (or zero if you are already there).",
    formula:
      "Target = Monthly essential expenses × Months of coverage\nGap = max(0, Target − Current savings)",
    whyUse:
      "Vague advice does not drive deposits. Seeing a dollar target and a remaining gap makes automatic transfers and spending cuts concrete — especially after rent, childcare, or job changes.",
    howToUse: [
      "Enter essential monthly expenses (housing, utilities, food, insurance, minimum debt payments, transport).",
      "Choose months of coverage (commonly 3–6; more if income is variable).",
      "Enter what you have saved so far.",
      "Review the target and remaining gap.",
    ],
    useCases: [
      "Set a 3–6 month cash reserve goal.",
      "Recalculate after rent or childcare costs change.",
      "Track progress toward a freelance income buffer.",
      "Define “essentials only” before sizing the fund.",
    ],
    supportedFormats: [
      "Monthly expense amounts and savings balances",
      "Months of coverage as a number you choose",
    ],
    privacy:
      "This tool runs entirely in your browser. Your figures are not uploaded.",
    sections: [
      {
        heading: "What counts as essential",
        body: "Focus on necessities you would still need during a job loss or emergency: housing, utilities, groceries, insurance, required minimum debt payments, and basic transport. Discretionary streaming, vacations, and nice-to-have shopping usually stay out of the “essential” total so the target stays realistic.",
      },
      {
        heading: "How many months?",
        body: "Many guides suggest 3–6 months of essential expenses. Single-income households, freelancers, or people in specialized fields often aim higher. Dual-income households with strong job stability sometimes choose the lower end. This is a planning choice, not a universal rule — and not personalized financial advice.",
      },
    ],
    faqs: [
      {
        question: "How many months should I save?",
        answer:
          "Many guides suggest 3–6 months of essential expenses; freelancers or single-income households may prefer more. Choose what matches your risk tolerance and income stability.",
      },
      {
        question: "What expenses count?",
        answer:
          "Necessities: housing, utilities, food, insurance, minimum debt payments, and transport. Skip discretionary extras when sizing the fund.",
      },
      {
        question: "Is my data uploaded?",
        answer: "No.",
      },
    ],
  },
};
