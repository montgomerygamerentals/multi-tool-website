import type { ToolExample } from "./tool-guide-types";

export const toolExamples: Record<string, ToolExample[]> = {
  "image-converter": [
    {
      title: "PNG illustration → WebP for a landing page",
      body: "A 1400×900 PNG icon sheet is often 1.5–4 MB because PNG stores graphics losslessly. Converting to WebP at a high quality setting commonly drops that to a few hundred kilobytes while keeping sharp edges. Use JPEG instead only if the file is a photograph; JPEG is a poor fit for flat logos with text.",
    },
    {
      title: "Screenshot → JPEG for email",
      body: "A retina screenshot saved as PNG can exceed 8 MB and bounce off mail servers. JPEG at quality 75–85 usually lands under 1 MB. You lose an alpha channel, which screenshots almost never need.",
    },
  ],
  "image-compressor": [
    {
      title: "Hero photo that fails a 500 KB upload cap",
      body: "A 4000×3000 camera JPEG at quality 95 can be 4–8 MB. Re-encoding at quality 70–80 often reaches 400–700 KB. If it is still large, resize the longest edge to 1600–2000 px first, then compress — pixel count drives size more than a few quality points.",
    },
  ],
  "image-resizer": [
    {
      title: "LinkedIn-style 400×400 avatar",
      body: "Start with a photo whose subject is centered. Set width and height to 400 and keep aspect ratio unlocked only if you will crop separately; otherwise lock ratio and resize the shortest side to 400, then crop. Upsizing a 200×200 image to 800×800 cannot invent detail — it only blurs.",
    },
  ],
  "image-cropper": [
    {
      title: "Circle avatar from a group photo",
      body: "Pick the circular crop, place the subject’s face in the center, and leave a little headroom so the circle does not clip hair or ears. Export PNG if you need a transparent outside; JPEG will fill that outside with a solid color.",
    },
  ],
  "aspect-ratio-finder": [
    {
      title: "Is this photo 16:9 or 4:3?",
      body: "A 1920×1080 frame is exactly 16:9 (1.778). A 4000×3000 camera still is 4:3 (1.333). If you upload 3000×2002, the tool reports ~3:2 and the nearest common ratio. That tells you whether a YouTube thumbnail template will letterbox or crop faces.",
    },
  ],
  "background-remover": [
    {
      title: "Product on a white seamless background",
      body: "Click the white backdrop and raise tolerance until the sweep disappears but the product edge stays. Soft-edge helps fur and glass; too much softness eats into the subject. Studio paper works; busy rooms and gradients usually need a dedicated cutout model, which this tool does not pretend to be.",
    },
  ],
  "favicon-generator": [
    {
      title: "One mark → ICO, PNG, Apple Touch, manifest",
      body: "A simple 512×512 PNG with a solid center and padding survives being scaled to 16×16. Thin script type becomes mud at favicon size — prefer a lettermark or icon. The ZIP should include favicon.ico, 32×32/192×192 PNGs, apple-touch-icon.png, and a web manifest referencing those files.",
    },
  ],
  "jpg-to-png": [
    {
      title: "JPEG logo that needs a transparent stage",
      body: "JPEG has no alpha channel. Converting to PNG does not magically make the white background transparent — it only gives you a lossless file you can then edit or run through a background remover. Do the format change first if your editor refuses JPEG.",
    },
  ],
  "png-to-jpg": [
    {
      title: "Transparent PNG that a CMS rejects",
      body: "Flattening a PNG with transparency to JPEG fills transparent pixels (usually with white or a color you choose). A 2 MB UI screenshot PNG often becomes a 200–400 KB JPEG. If you still need transparency, stay on PNG or WebP.",
    },
  ],
  "png-to-webp": [
    {
      title: "Blog inline images",
      body: "A 1200 px wide PNG diagram at 900 KB may convert to a 150–300 KB WebP at visually similar quality. Keep the PNG master in git; ship WebP (and a PNG/JPEG fallback if you still support older browsers).",
    },
  ],
  "webp-to-png": [
    {
      title: "Designer cannot open a WebP download",
      body: "Older Photoshop, some printers, and a few DAM systems still choke on WebP. Convert to PNG to preserve transparency, or JPEG if the image is a photo with no alpha. PNG will usually be larger than the WebP source — that is expected.",
    },
  ],
  "qr-code-generator": [
    {
      title: "Event flyer URL at print size",
      body: "Encode the final HTTPS URL (not a redirect you might change later), export at 512 px or larger, and print at least 1 inch square with a quiet zone around the modules. Test with a phone camera in the same lighting as the venue. Dense Wi‑Fi payloads or very long URLs need a larger print.",
    },
    {
      title: "Wi‑Fi guest card",
      body: "A WIFI: payload includes SSID, type (WPA/WPA2), and password. Short SSIDs scan more reliably. Do not put the admin password on a public poster — use a guest network.",
    },
  ],
  "color-converter": [
    {
      title: "Brand HEX → RGB for email",
      body: "#4F46E5 (indigo) is rgb(79, 70, 229) and hsl(243, 76%, 59%). Many email clients want RGB or HEX; design tools often show HSL. Convert once, paste the same values into CSS, Figma, and the ESP so the button is not a slightly different blue in each place.",
    },
  ],
  "pdf-tools": [
    {
      title: "Three signed pages into one lease packet",
      body: "Merge the signature PDF, the addendum, and a scanned ID photo into a single file before sending. If a page is a phone photo, convert images to PDF first, then merge. Extracting pages works the other way: pull only the exhibits a reviewer asked for instead of emailing a 40-page original.",
    },
  ],
  "exif-viewer": [
    {
      title: "Strip GPS before posting a home photo",
      body: "Phone photos often store GPSLatitude/GPSLongitude. Open the image, confirm the location fields, then download the stripped JPEG. The pixels stay; the coordinates and often camera serial/software tags are gone. Always check the downloaded file once — do not assume a social network strips EXIF for you.",
    },
  ],
  "word-counter": [
    {
      title: "College essay with a 650-word cap",
      body: "Paste the draft and watch words, characters, and reading time. A 650-word Common App essay is typically ~3,800–4,200 characters including spaces. If you are 80 words over, cut examples, not the thesis. Reading time assumes ~200–250 words per minute for silent reading.",
    },
  ],
  notepad: [
    {
      title: "Scratch pad that survives a refresh",
      body: "Type during a call, refresh the tab, and the text should still be there via local storage on this browser. It is not a cloud doc: another device will not see it, and clearing site data deletes it. Download a .txt copy if the notes matter.",
    },
  ],
  "case-converter": [
    {
      title: "Title Case a guest list",
      body: "“JANE DOE, john smith, aNNa LEE” becomes “Jane Doe, John Smith, Anna Lee” in title case. Sentence case is better for paragraphs; UPPER CASE for constants; lowercase for slugs. Name particles (von, de) may still need a manual pass — algorithmic title case is not a style guide.",
    },
  ],
  "remove-duplicates": [
    {
      title: "RSVP emails pasted from three sheets",
      body: "If 180 lines contain 22 repeats, unique + optional sort yields 158 addresses. Compare counts before and after so you know how many collisions you removed. This is line-based: “Pat@example.com” and “pat@example.com” are different unless you lowercase first.",
    },
  ],
  "text-diff": [
    {
      title: "Two versions of a bio",
      body: "Paste yesterday’s paragraph and today’s. Added phrases highlight on one side, removals on the other. Use it for contracts too: a single changed date is easy to miss in a 20-line block if you eyeball it.",
    },
  ],
  "code-comparison": [
    {
      title: "Staging vs production JSON config",
      body: "Pretty-print both blobs first (the JSON formatter helps), then diff. A one-line minify vs pretty-print will look like the entire file changed. Line numbers make it obvious whether a key was added or a value flipped from true to false.",
    },
  ],
  "lorem-ipsum": [
    {
      title: "Five paragraphs for a blog template",
      body: "Generate enough Latin-style placeholder that headings, pull quotes, and a long paragraph all wrap. Designers often under-test with one short sentence; five paragraphs expose overflow and line-height bugs.",
    },
  ],
  "json-formatter": [
    {
      title: "Minified webhook body",
      body: "A single-line payload is unreadable. Format it with 2-space indent to find a missing comma or a string that should have been a number. Minify again only when you need to paste into a size-limited field. Invalid JSON should fail with a parse error, not silently “pretty-print” broken data.",
    },
  ],
  "json-generator": [
    {
      title: "Mock users for a table UI",
      body: "A schema like { id: uuid, name: string, email: string } × 25 rows gives you loading, empty, and overflow states without a backend. Keep generated emails obviously fake so nobody tries to mail them.",
    },
  ],
  "base64-encoder": [
    {
      title: "Decode a data URL",
      body: "A CSS data URL starts with data:image/png;base64, followed by the payload. Decode only the Base64 part (not the prefix) to inspect the original text or binary-as-text. Never paste live session tokens into a third-party decoder — this page keeps encoding local.",
    },
  ],
  "markdown-editor": [
    {
      title: "README with a code fence",
      body: "Write ## Install then a fenced bash block. The preview should show a heading and a code panel, not literal backticks. Broken fences (three ticks opened, two closed) are the usual reason a whole file renders as code.",
    },
  ],
  "regex-tester": [
    {
      title: "US ZIP code pattern",
      body: "^\\d{5}(-\\d{4})?$ matches 94107 and 94107-1234 but not 9410 or 941070. Test against a few real lines, including a failure case. If you forget ^ and $, the pattern can match a 5-digit street number inside a longer string.",
    },
  ],
  "hash-generator": [
    {
      title: "Check a downloaded file against a published SHA-256",
      body: "Hash the file locally and compare the hex digest to the vendor’s checksum, character for character. MD5 is fine for accidental corruption checks, not for security. A one-byte change produces a completely different digest — that is the point.",
    },
  ],
  "uuid-generator": [
    {
      title: "Ten IDs for a fixture file",
      body: "UUID v4 values look like 550e8400-e29b-41d4-a716-446655440000. Generate a handful, paste into JSON, and never reuse the same ID across environments if the column is a primary key. These are random, not sequential, so they do not leak how many rows you have.",
    },
  ],
  "password-generator": [
    {
      title: "24-character login secret",
      body: "Length beats clever substitutions. A 24-character mix of upper, lower, digits, and symbols is vastly harder to brute-force than “P@ssw0rd1”. Store it in a password manager; generating it here does not save it anywhere. If a site bans symbols, drop them and add length instead.",
    },
  ],
  "unit-converter": [
    {
      title: "Oven temperature 180°C → °F",
      body: "°F = °C × 9/5 + 32, so 180°C is 356°F. For length, 72 inches is 6 feet or 182.88 cm. Convert one dimension at a time; mixing mL and cups in the same batter without converting the rest of the recipe will throw off ratios.",
    },
  ],
  "bmi-calculator": [
    {
      title: "5′10″ and 170 lb",
      body: "BMI = 703 × weight(lb) / height(in)². Height 70 in, weight 170 lb → 703 × 170 / 4900 ≈ 24.4, which falls in the standard “healthy weight” band (18.5–24.9) used on many charts. BMI does not measure fat vs muscle and is not a diagnosis.",
    },
    {
      title: "175 cm and 70 kg",
      body: "Metric formula: kg / m². 70 / 1.75² = 70 / 3.0625 ≈ 22.9. Same person as a slightly lighter 5′9″ frame would be. Enter height once; mixing cm with inches is the usual source of impossible results like BMI 3 or 90.",
    },
  ],
  "age-calculator": [
    {
      title: "Born 12 March 2000, as of 12 March 2026",
      body: "That is exactly 26 years. If the as-of date is 11 March 2026, age is 25 years, 11 months, 27 days — month lengths and leap days (2000 was a leap year) are why counting on your fingers fails. Always set the “as of” date when a form asks age on a deadline, not today.",
    },
  ],
  "days-between-dates": [
    {
      title: "1 June 2026 → 1 September 2026",
      body: "June has 30 days, so 1 Jun to 1 Jul is 30 days; July 31; August 31; total 92 days (13 weeks + 1 day) if you count the span to the same calendar day. Confirm whether your use case includes the end date (event duration vs “days until”).",
    },
  ],
  "percentage-calculator": [
    {
      title: "18% of a $86 restaurant bill",
      body: "0.18 × 86 = $15.48 tip; total $101.48. “86 is what percent of 200?” is 86/200 = 43%. Percent change from 80 to 100 is (100−80)/80 = 25% increase, not 20%. Those three problem types are easy to mix up; pick the matching mode.",
    },
  ],
  "fraction-decimal-converter": [
    {
      title: "0.125 and 2 1/3",
      body: "0.125 = 125/1000 = 1/8 after dividing by 125. Mixed number 2 1/3 = 7/3 ≈ 2.333…. Woodworking cut lists almost always want the fraction; spreadsheet formulas want the decimal. Simplify before you measure.",
    },
  ],
  "tip-calculator": [
    {
      title: "Four people, $96 pre-tip, 20%",
      body: "Tip = 0.20 × 96 = $19.20. Total $115.20, or $28.80 per person if split evenly. If one person did not drink, calculate the shared food first, then add drinks to individuals — this tool’s even split will not do that for you automatically.",
    },
  ],
  "loan-calculator": [
    {
      title: "$15,000 auto loan at 7.5% for 48 months",
      body: "Monthly payment on a standard amortizing loan is P × r(1+r)^n / ((1+r)^n − 1), with r = 0.075/12 and n = 48. That is about $362 per month. Total paid ≈ $17,376, so interest ≈ $2,376. A 60-month term lowers the payment but raises total interest.",
    },
  ],
  "debt-payoff-calculator": [
    {
      title: "Two cards, avalanche extra $100",
      body: "Card A $4,000 at 22% APR, Card B $2,000 at 13%. Avalanche puts every extra dollar on A (higher APR) while you pay B’s minimum. An extra $100/month typically cuts months and hundreds of dollars of interest vs minimums-only. Snowball (smallest balance first) can feel better but usually costs more interest.",
    },
  ],
  "mortgage-calculator": [
    {
      title: "$400,000 at 6.5% for 30 years",
      body: "Principal & interest is about $2,528 per month before taxes and insurance. Over 360 payments you would schedule ~$510,000 in interest if you never prepay. A 15-year term at the same rate jumps the payment (about $3,484 P&I) and slashes interest. Add estimated tax/insurance to compare against rent.",
    },
  ],
  "compound-interest-calculator": [
    {
      title: "$200 per month for 10 years at 7%",
      body: "Contributions total $24,000. Compounded monthly at 7% annual, future value is roughly $34,600 (about $10,600 of growth). Starting with $5,000 already saved adds more, because that lump sum compounds the whole decade. Rate assumptions are not a forecast.",
    },
  ],
  "roi-calculator": [
    {
      title: "Spend $2,000, later worth $2,700 after 18 months",
      body: "Simple ROI = (2700 − 2000) / 2000 = 35%. Annualized ROI is (1.35)^(12/18) − 1 ≈ 22% per year. A 35% gain in three months is a very different annualized result than 35% in three years — always look at both.",
    },
  ],
  "retirement-calculator": [
    {
      title: "Current $40,000, $500/month, 7%, 25 years",
      body: "This is the same math as compound interest with a starting balance. Rough order of magnitude: the nest egg can land in the mid–six figures if contributions are consistent and the return assumption holds. Drop the return to 4% and the gap is large — that is why the rate input is the sensitivity that matters.",
    },
  ],
  "budget-calculator": [
    {
      title: "$4,800 take-home vs $4,350 expenses",
      body: "Surplus is $450. If rent is $1,800, that is 37.5% of take-home — useful context next to a 30% rent rule of thumb. A $200 “misc” line that is really dining out belongs in its own category or the surplus is fiction.",
    },
  ],
  "sales-tax-calculator": [
    {
      title: "Add 8.25% tax to a $40 item",
      body: "Tax = 40 × 0.0825 = $3.30; total $43.30. Working backwards from a $43.30 receipt: pre-tax = 43.30 / 1.0825 ≈ $40.00. Use “remove tax” when you need the net price from a gross total.",
    },
  ],
  "income-tax-estimator": [
    {
      title: "Rough federal tax on $90,000 taxable (single)",
      body: "U.S. brackets are progressive: only the dollars inside each band are taxed at that band’s rate. A $90k taxable income is not all taxed at the top rate that applies. This estimator is educational — it is not a filing engine, does not include credits, and is not tax advice.",
    },
  ],
  "currency-converter": [
    {
      title: "€250 hotel bill in USD",
      body: "If EURUSD is 1.08, 250 × 1.08 = $270 before card fees. A 3% foreign-transaction fee makes it ~$278. Manual rate mode is for when your bank quoted a number different from the public mid-market rate.",
    },
  ],
  "salary-hourly-converter": [
    {
      title: "$78,000 salary at 40 hours/week",
      body: "Hourly ≈ 78000 / (40 × 52) = $37.50 before tax. Monthly is $6,500; biweekly $3,000. If you actually work 45 hours, the implied hourly is lower. Contractors comparing to W-2 should also price benefits and unpaid time off, which this converter does not.",
    },
  ],
  "inflation-calculator": [
    {
      title: "$50 grocery run, 3% inflation, 10 years",
      body: "Future cost ≈ 50 × (1.03)^10 ≈ $67.20. That is why a cash emergency fund target should be revisited. This uses the rate you enter, not a live CPI series — pair it with the buying-power tool when you want historical years.",
    },
  ],
  "buying-power-calculator": [
    {
      title: "What $20 in 1995 feels like later",
      body: "U.S. CPI rose substantially from the mid-1990s to the 2020s, so $20 then maps to a much higher amount in recent dollars (often in the $35–$40 neighborhood depending on the exact years in the dataset). Use it for “allowance in today’s money,” not for a specific city’s rent.",
    },
  ],
  "refinance-calculator": [
    {
      title: "$300,000 remaining, drop 7% → 6%, $4,000 closing costs",
      body: "If the new payment saves $160/month, break-even is 4000/160 = 25 months. If you expect to sell in 18 months, the refinance loses. If you will keep the loan 7 years, savings can exceed costs — unless you extend the term and reset interest, which this comparison should show.",
    },
  ],
  "credit-card-payoff-calculator": [
    {
      title: "$3,500 balance, 21% APR, $90 monthly",
      body: "Minimum-like payments mostly cover interest at 21%. $90/month pays this off in on the order of ~4–5 years with a large interest total; $150/month cuts both sharply. If the payment is below the monthly interest, the balance grows — the tool should show that failure mode.",
    },
  ],
  "down-payment-calculator": [
    {
      title: "20% down on a $425,000 home",
      body: "Cash needed = 0.20 × 425000 = $85,000, before closing costs. If you only have $50,000, that is 11.8% down and a $375,000 loan. Solve for price: $50,000 / 0.20 = a $250,000 home at a true 20% down.",
    },
  ],
  "amortization-schedule": [
    {
      title: "First months of a $250,000 30-year loan at 6%",
      body: "Payment is about $1,499. Early months are interest-heavy: month 1 might apply ~$1,250 to interest and ~$249 to principal. By the last years that ratio flips. Export CSV if you want to chart remaining balance in a spreadsheet.",
    },
  ],
  "net-worth-calculator": [
    {
      title: "Simple household snapshot",
      body: "Assets: $42,000 checking/savings, $18,000 car, $8,000 brokerage. Liabilities: $12,000 student loan, $6,000 card. Net worth = 68,000 − 18,000 = $50,000. Include the mortgage as a liability and the home as an asset if you want a complete picture; omitting one side lies to you.",
    },
  ],
  "emergency-fund-calculator": [
    {
      title: "$3,200 essential expenses × 6 months",
      body: "Target = 3200 × 6 = $19,200. If you already have $7,000, the gap is $12,200. Freelancers often use 6–12 months; a dual-income household with disability insurance might choose 3. Count rent, food, insurance, minimum debt payments — not the vacation line.",
    },
  ],
  "401k-calculator": [
    {
      title: "$70,000 salary, 6% deferral, 50% match on 6%",
      body: "Employee = 0.06 × 70000 = $4,200/year. Employer match = 50% of that $4,200 = $2,100. Total in = $6,300 plus any growth. Contributing only 3% may leave match on the table — that is the first lever, before picking funds.",
    },
  ],
  "apr-calculator": [
    {
      title: "$20,000 loan at 6% with $800 of fees",
      body: "You receive $19,200 but repay as if the principal were $20,000. Estimated APR is higher than 6% because fees are part of the cost of credit. Two offers with the same rate but different origination fees will not have the same APR — compare APR, not the teaser rate.",
    },
  ],
  "discount-markup-calculator": [
    {
      title: "25% off a $80 jacket, and a 40% markup on $30 cost",
      body: "Sale price = 80 × 0.75 = $60 (discount $20). Markup 40% on $30 cost → $42 selling price. Margin is different from markup: $12 profit on $42 price is a 28.6% margin, not 40%. Use the mode that matches how you set prices.",
    },
  ],
  "break-even-calculator": [
    {
      title: "Workshop: $1,200 fixed, $15 variable, $45 ticket",
      body: "Contribution margin = 45 − 15 = $30 per ticket. Break-even units = 1200 / 30 = 40 tickets. Revenue at break-even = 40 × 45 = $1,800. If the venue raises rent by $300, you need 10 more tickets.",
    },
  ],
  "timezone-converter": [
    {
      title: "3:00 p.m. New York on a weekday → London and Tokyo",
      body: "When New York is on Eastern Daylight Time (UTC−4), 15:00 EDT is 20:00 in London (UTC+1) and 04:00 the next calendar day in Tokyo (UTC+9). Fixed “+5 hours from me” math fails around DST weekends — pick named zones, not raw offsets.",
    },
  ],
  timer: [
    {
      title: "25-minute focus block",
      body: "Set a 25:00 countdown for a Pomodoro, then a 5:00 break. The stopwatch + laps mode is better for workouts where you want split times instead of a single alarm. Keep the tab audible if you need the alert; browsers may throttle background timers.",
    },
  ],
  "name-picker": [
    {
      title: "Classroom cold-call from a 28-name roster",
      body: "Paste one name per line, spin once, and do not quietly reroll until you like the result if you promised fairness. For a raffle, remove the winner before the next spin. Duplicate names in the list get duplicate chance — clean the list first.",
    },
  ],
  "random-number-generator": [
    {
      title: "Integer from 1 to 100, or 10 of them",
      body: "A single roll is useful for “pick a page.” Generating 10 numbers in 1–100 can produce repeats unless you explicitly need unique draws. For sampling without replacement, shuffle a list instead of rolling independent numbers.",
    },
  ],
  "coin-flip": [
    {
      title: "Best of three",
      body: "Each flip is independent: three heads in a row is uncommon but not broken. If you need a 50/50 once, one flip is enough. Use a tally when you are demonstrating probability, not when you are just choosing a restaurant.",
    },
  ],
  "dice-roller": [
    {
      title: "2d6 and a d20",
      body: "Two six-sided dice sum from 2–12 with 7 as the most common total. A d20 is uniform 1–20 if the roller is fair. Rolling many dice at once is for damage totals and classroom expected-value demos, not for replacing a missing physical die in a tournament that requires physical dice.",
    },
  ],
  "list-shuffler": [
    {
      title: "Meetup lightning-talk order",
      body: "Paste 12 titles, shuffle once, and screenshot the order. Shuffling again is a new random permutation — if you promised the first shuffle, do not reroll. A spreadsheet “sort by random” column is the same idea; this is faster when the list is already on your clipboard.",
    },
  ],
  "team-splitter": [
    {
      title: "17 names into 4 groups",
    body: "17 ÷ 4 cannot be equal: you get groups of 5, 4, 4, and 4 (or similar). That is balanced enough for a workshop. Captains picking friends is what this avoids. If skill balance matters more than randomness, seed strong players manually and randomize the rest.",
    },
  ],
  "yes-no-picker": [
    {
      title: "Low-stakes tie-break",
      body: "Use it for “another episode?” not for medical, legal, or financial decisions. If you keep clicking until you see Yes, you are not randomizing — you are shopping for permission.",
    },
  ],
  sudoku: [
    {
      title: "Notes on a medium puzzle",
      body: "Fill pencil marks (notes) in a box when a digit has two or three candidate cells, then look for singles. Conflict highlights catch a 7 entered twice in a row. Easy puzzles are for warm-up; hard usually needs notes. This is a practice grid, not a daily newspaper reprint.",
    },
  ],
  wordle: [
    {
      title: "Opening with a 5-letter word that uses common vowels",
      body: "A starter with three vowels (for example ADIEU or AUDIO) reveals a lot of letters; a consonant-heavy starter (STARE, CRANE) is the other school. Green = right letter, right place; yellow = in the word, wrong place. You have six tries. This is an independent practice game, not the New York Times daily.",
    },
  ],
};
