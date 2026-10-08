import type { Tool } from "@/lib/tools";

export interface ToolSeo {
  title: string;
  description: string;
}

const seo: Record<string, ToolSeo> = {
  "spin-the-wheel": {
    title: "Spin the Wheel — Random Picker",
    description:
      "Spin a customizable wheel to pick a random winner from names or options. Fair, visual, and runs locally in your browser.",
  },
  "days-from-today": {
    title: "Days From Today Calculator",
    description:
      "Add or subtract days from today and get the exact calendar date. Great for deadlines, reminders, and project planning.",
  },
  "profit-margin-calculator": {
    title: "Profit Margin Calculator",
    description:
      "Find profit margin, markup, revenue, or cost from any two values. Free margin calculator for pricing and business math.",
  },
  "ratio-proportion-calculator": {
    title: "Ratio & Proportion Calculator",
    description:
      "Solve proportions and scale ratios. Enter three known values to find the missing fourth — ideal for recipes and maps.",
  },
  "lcm-calculator": {
    title: "LCM Calculator — Least Common Multiple",
    description:
      "Compute the least common multiple of two or more integers. Shows steps for homework and number theory practice.",
  },
  "gcf-calculator": {
    title: "GCF Calculator — Greatest Common Factor",
    description:
      "Find the greatest common factor (GCD) of numbers quickly. Useful for simplifying fractions and factoring problems.",
  },
  "final-grade-calculator": {
    title: "Final Grade Calculator",
    description:
      "See what score you need on the final exam to hit your target course grade. Enter current grade and exam weight.",
  },
  "weighted-grade-calculator": {
    title: "Weighted Grade Calculator",
    description:
      "Combine assignment scores with different weights into one course average. Add categories and see your weighted grade.",
  },
  "test-grade-calculator": {
    title: "Test Grade Calculator",
    description:
      "Convert points earned to a percentage grade. Enter correct and total questions for instant test score results.",
  },
  "gpa-calculator": {
    title: "GPA Calculator",
    description:
      "Calculate semester or cumulative GPA from letter grades and credit hours. Supports common 4.0 scale grading.",
  },
  "prime-factor-calculator": {
    title: "Prime Factorization Calculator",
    description:
      "Break a whole number into prime factors and a factor tree view. Helpful for LCM, GCF, and divisibility work.",
  },
  "slope-calculator": {
    title: "Slope Calculator — Two Points",
    description:
      "Find slope, rise, run, and line equation from two coordinate points. Includes vertical and horizontal line cases.",
  },
  "area-of-circle": {
    title: "Area of a Circle Calculator",
    description:
      "Calculate circle area from radius or diameter. Uses πr² with clear units — geometry homework and design layouts.",
  },
  "area-of-rectangle": {
    title: "Area of a Rectangle Calculator",
    description:
      "Multiply length and width to get rectangle area. Enter any two dimensions you know for quick floor or field math.",
  },
  "area-of-triangle": {
    title: "Area of a Triangle Calculator",
    description:
      "Compute triangle area from base and height or three sides (Heron's formula). Works for acute and obtuse triangles.",
  },
  "area-of-trapezoid": {
    title: "Area of a Trapezoid Calculator",
    description:
      "Find trapezoid area from parallel bases and height. Handy for land plots, roofs, and composite shape problems.",
  },
  "volume-of-sphere": {
    title: "Volume of a Sphere Calculator",
    description:
      "Calculate sphere volume from radius or diameter using (4/3)πr³. Physics, packaging, and 3D modeling estimates.",
  },
  "volume-of-cylinder": {
    title: "Volume of a Cylinder Calculator",
    description:
      "Cylinder volume from radius and height (πr²h). Tanks, pipes, and cans — enter metric or customary units.",
  },
  "volume-of-cone": {
    title: "Volume of a Cone Calculator",
    description:
      "Cone volume from radius and height: one-third of the matching cylinder. Sand piles, funnels, and geometry labs.",
  },
  "volume-of-cube": {
    title: "Volume of a Cube Calculator",
    description:
      "Cube volume from side length (s³). Storage boxes, dice, and quick cubic measurement checks.",
  },
  "volume-of-rectangular-prism": {
    title: "Volume of a Rectangular Prism Calculator",
    description:
      "Box volume = length × width × height. Shipping crates, rooms, and aquarium capacity in one step.",
  },
  "volume-of-pyramid": {
    title: "Volume of a Pyramid Calculator",
    description:
      "Square-base pyramid volume from base side and height. Compare to prism volume for solid geometry study.",
  },
  "number-base-converter": {
    title: "Number Base Converter",
    description:
      "Convert numbers between binary, decimal, octal, and hexadecimal. See digit-by-digit results in your browser.",
  },
  "binary-to-decimal": {
    title: "Binary to Decimal Converter",
    description:
      "Convert binary strings to decimal integers. Validates bits and shows the place-value breakdown.",
  },
  "decimal-to-binary": {
    title: "Decimal to Binary Converter",
    description:
      "Turn a decimal number into binary with optional bit width. Useful for CS homework and bit masks.",
  },
  "binary-to-hex": {
    title: "Binary to Hexadecimal Converter",
    description:
      "Convert binary to hex in groups of four bits. Fast path from machine words to readable hex dumps.",
  },
  "hex-to-binary": {
    title: "Hexadecimal to Binary Converter",
    description:
      "Expand each hex digit to four binary bits. Debug firmware, color codes, and memory addresses.",
  },
  "decimal-to-hex": {
    title: "Decimal to Hexadecimal Converter",
    description:
      "Convert base-10 integers to hexadecimal. Common for colors (#RRGGBB) and low-level programming.",
  },
  "hex-to-decimal": {
    title: "Hexadecimal to Decimal Converter",
    description:
      "Parse hex strings into decimal values. Accepts optional 0x prefix and uppercase or lowercase digits.",
  },
  "decimal-to-octal": {
    title: "Decimal to Octal Converter",
    description:
      "Convert decimal numbers to base-8 octal. Handy for Unix file permissions and legacy systems.",
  },
  "octal-to-decimal": {
    title: "Octal to Decimal Converter",
    description:
      "Convert octal digits to a decimal integer. Validates leading zeros and invalid digit errors.",
  },
  "text-to-binary": {
    title: "Text to Binary Converter",
    description:
      "Encode text to binary using ASCII or UTF-8 bytes. See 8-bit groups per character for encoding lessons.",
  },
  "binary-to-text": {
    title: "Binary to Text Decoder",
    description:
      "Decode binary (8-bit chunks) back to readable text. Strip spaces and validate length before converting.",
  },
  "time-card-calculator": {
    title: "Time Card Calculator",
    description:
      "Add daily in/out times and break minutes to get total hours worked. Weekly totals for hourly payroll checks.",
  },
  "military-time-converter": {
    title: "Military Time Converter",
    description:
      "Convert between 12-hour AM/PM and 24-hour military time. Avoid scheduling mistakes across formats.",
  },
  "scientific-calculator": {
    title: "Online Scientific Calculator",
    description:
      "Trig, logs, powers, roots, and parentheses in the browser. No install — your expressions stay on your device.",
  },
  "fancy-text-generator": {
    title: "Fancy Text Generator — Unicode Styles",
    description:
      "Turn plain text into bold, italic, script, bubble, and other Unicode styles for social posts. Copy styled output instantly — runs locally.",
  },
  "fancy-text-bold": {
    title: "Bold Fancy Text Generator",
    description:
      "Convert letters to mathematical bold Unicode for Instagram, Discord, and bios. Paste plain text and copy styled bold characters in one click.",
  },
  "fancy-text-italic": {
    title: "Italic Fancy Text Generator",
    description:
      "Make slanted Unicode italic text for captions and usernames. Works with Latin letters; copy the transformed line without installing fonts.",
  },
  "fancy-text-script": {
    title: "Script Fancy Text Generator",
    description:
      "Generate elegant script-style Unicode letters for wedding invites, bios, and headers. Paste text and copy flowing script characters locally.",
  },
  "fancy-text-small-caps": {
    title: "Small Caps Fancy Text Generator",
    description:
      "Create small-cap Unicode text for titles and labels that need a refined look. Ideal for branding lines where true small caps are unavailable.",
  },
  "fancy-text-upside-down": {
    title: "Upside Down Text Generator",
    description:
      "Flip text upside down for jokes, puzzles, and social posts. Type a phrase and copy inverted Unicode characters — processed in your browser.",
  },
  "fancy-text-bubble": {
    title: "Bubble Letter Text Generator",
    description:
      "Wrap letters in bubble or circled Unicode for playful headlines and gamer tags. Paste plain text and copy bubble-style output immediately.",
  },
  "fancy-text-monospace": {
    title: "Monospace Fancy Text Generator",
    description:
      "Convert text to monospace Unicode for code-like bios and terminal aesthetics. Keeps alignment feel without a fixed-width font file.",
  },
  "fancy-text-fullwidth": {
    title: "Fullwidth Text Generator",
    description:
      "Expand characters to fullwidth Unicode for vaporwave-style spacing and emphasis. Paste ASCII text and copy wide characters for social posts.",
  },
  "word-unscrambler": {
    title: "Word Unscrambler — Anagram Solver",
    description:
      "Unscramble jumbled letters into valid words for puzzles and games. Enter up to fifteen letters and browse dictionary matches in your browser.",
  },
  "typing-speed-test": {
    title: "Typing Speed Test — WPM & Accuracy",
    description:
      "Measure words per minute and accuracy on timed passages. Practice touch typing and track improvement — no account; stats stay on your device.",
  },
  "typing-speed-test-numbers": {
    title: "Number Row Typing Speed Test",
    description:
      "Drill the number row and symbols for data entry jobs. Timed numeric passages show WPM and errors — runs locally without sending keystrokes.",
  },
  "name-generator-band": {
    title: "Band Name Generator",
    description:
      "Generate creative band and artist name ideas from genre and mood keywords. Brainstorm stage names for demos, flyers, and streaming profiles.",
  },
  "name-generator-podcast": {
    title: "Podcast Name Generator",
    description:
      "Find catchy podcast title ideas that fit your topic and tone. Spin options for show names before you register RSS feeds or social handles.",
  },
  "name-generator-dnd": {
    title: "D&D Character Name Generator",
    description:
      "Create fantasy names for D&D and tabletop RPG characters. Filter by race vibe and class flavor for NPCs, PCs, and one-shot heroes.",
  },
  "name-generator-clan": {
    title: "Clan Name Generator",
    description:
      "Invent clan and guild names for games and communities. Mix aggressive, mythical, or humorous tags for esports teams and Discord groups.",
  },
  "name-generator-gamer-tag": {
    title: "Gamer Tag Generator",
    description:
      "Generate unique gamer tags and usernames for Xbox, PlayStation, and PC. Try short, edgy, or funny handles before claiming a platform ID.",
  },
  "name-generator-business": {
    title: "Business Name Generator",
    description:
      "Brainstorm company and brand name ideas from industry and style inputs. Explore available-sounding names before domain and trademark checks.",
  },
  "name-generator-baby": {
    title: "Baby Name Generator",
    description:
      "Discover baby name ideas by origin, length, and style preferences. Use as a starting list — verify spelling and family meaning offline.",
  },
  "name-generator-pet": {
    title: "Pet Name Generator",
    description:
      "Find fun dog, cat, and pet names by personality and species vibe. Great for shelters, new puppies, and social posts — ideas only, no signup.",
  },
  "text-to-speech": {
    title: "Text to Speech — Browser TTS",
    description:
      "Listen to pasted text with your browser’s built-in voices. Adjust rate and pitch for proofreading — speech synthesis stays on your device.",
  },
  "height-comparison": {
    title: "Height Comparison Visualizer",
    description:
      "Compare two or more heights side by side in feet, cm, or meters. Visualize celebrity or athlete height differences without leaving the page.",
  },
  "yaml-to-json": {
    title: "YAML to JSON Converter",
    description:
      "Convert YAML configs to JSON for APIs and linters. Paste YAML, fix indentation errors, and copy pretty JSON — processed locally in-browser.",
  },
  "csv-to-json": {
    title: "CSV to JSON Converter",
    description:
      "Turn CSV spreadsheets into JSON arrays for code and APIs. Set delimiter and header row, then copy JSON without uploading your sheet.",
  },
  "xml-to-json": {
    title: "XML to JSON Converter",
    description:
      "Parse XML documents into JSON objects for JavaScript apps. Paste XML from feeds or SOAP responses and download or copy JSON locally.",
  },
  "jwt-decoder": {
    title: "JWT Decoder — Inspect Tokens",
    description:
      "Decode JWT header and payload JSON without verifying signatures. Debug auth tokens locally — never paste production secrets on untrusted sites.",
  },
  "url-encoder": {
    title: "URL Encoder & Decoder",
    description:
      "Encode or decode URL components and query strings. Fix broken links and form data with percent-encoding — runs entirely in your browser.",
  },
  "html-minifier": {
    title: "HTML Minifier",
    description:
      "Minify HTML by removing whitespace and comments for smaller payloads. Paste markup and copy one-line HTML for templates and email snippets.",
  },
  "css-minifier": {
    title: "CSS Minifier",
    description:
      "Compress CSS by stripping spaces and comments for production bundles. Paste stylesheets and copy minified CSS without a build step.",
  },
  "js-minifier": {
    title: "JavaScript Minifier",
    description:
      "Minify JavaScript snippets for faster loads and obfuscated demos. Remove comments and extra whitespace locally — review output before deploy.",
  },
  "webp-to-jpg": {
    title: "WebP to JPG Converter",
    description:
      "Convert WebP images to JPEG for editors and printers that reject WebP. Set quality and download JPG — conversion stays in your browser.",
  },
  "jpg-to-webp": {
    title: "JPG to WebP Converter",
    description:
      "Turn JPEG photos into smaller WebP files for faster websites. Adjust quality locally without uploading originals to a server.",
  },
  "avif-to-jpg": {
    title: "AVIF to JPG Converter",
    description:
      "Decode AVIF photos to widely compatible JPEG. Open AVIF from modern phones in legacy apps by exporting JPG on your device.",
  },
  "avif-to-png": {
    title: "AVIF to PNG Converter",
    description:
      "Convert AVIF to lossless PNG when you need editing layers or alpha-friendly workflows outside AVIF support.",
  },
  "svg-to-png": {
    title: "SVG to PNG Converter",
    description:
      "Rasterize SVG vector graphics to PNG at custom pixel sizes. Export icons and logos for slides and social templates.",
  },
  "png-to-ico": {
    title: "PNG to ICO Favicon Converter",
    description:
      "Build multi-size ICO favicons from a PNG logo. Generate browser tab icons locally before uploading to your site.",
  },
  "tiff-to-jpg": {
    title: "TIFF to JPG Converter",
    description:
      "Convert TIFF scans and photos to JPEG for email attachments and web uploads with a quality slider in-browser.",
  },
  "heic-to-jpg": {
    title: "HEIC to JPG Converter",
    description:
      "Open iPhone HEIC photos as JPG for Windows apps and online forms. Decode HEIC locally — no cloud upload required.",
  },
  "heic-to-png": {
    title: "HEIC to PNG Converter",
    description:
      "Convert HEIC to PNG to preserve transparency-friendly workflows in design tools that lack native HEIC support.",
  },
  "color-palette-generator": {
    title: "Color Palette Generator",
    description:
      "Generate harmonious color palettes from a seed hue or image. Copy HEX codes for CSS and UI design — runs locally in your browser.",
  },
  "contrast-checker": {
    title: "WCAG Contrast Checker",
    description:
      "Test foreground and background colors for WCAG AA and AAA contrast ratios. Pick accessible text colors before you ship UI or print designs.",
  },
  "gradient-generator": {
    title: "CSS Gradient Generator",
    description:
      "Build linear and radial CSS gradients with live preview. Copy gradient code for buttons, heroes, and backgrounds without a design app.",
  },
  "invoice-generator": {
    title: "Invoice Generator — PDF Ready",
    description:
      "Create professional invoices with line items, tax, and totals. Fill fields and export or print — your client data stays on your device.",
  },
  "receipt-generator": {
    title: "Receipt Generator",
    description:
      "Make itemized receipts for sales, donations, or reimbursements. Enter merchant details and download a clean receipt locally.",
  },
  "quote-generator": {
    title: "Quote & Estimate Generator",
    description:
      "Build price quotes and job estimates with terms and expiry dates. Send PDF-ready quotes without uploading customer lists to the cloud.",
  },
  "signature-generator": {
    title: "Signature Generator",
    description:
      "Draw or type a personal signature and export PNG with transparent background for documents and email.",
  },
  "email-signature-generator": {
    title: "Email Signature Generator",
    description:
      "Compose HTML email signatures with name, title, links, and logo placeholders. Copy into Outlook or Gmail settings.",
  },
  "meme-generator": {
    title: "Meme Generator",
    description:
      "Add top and bottom text to images for classic meme layouts. Upload a photo and download shareable JPEG or PNG memes locally.",
  },
  "printable-calendar": {
    title: "Printable Calendar Maker",
    description:
      "Build a monthly calendar you can print at home or at a shop. Choose layout and notes area — generated in your browser.",
  },
  "printable-calendar-2026": {
    title: "Printable Calendar 2026",
    description:
      "Download and print a full 2026 calendar with US holidays optional. Landscape or portrait layouts for planners and fridge boards.",
  },
  "printable-calendar-2027": {
    title: "Printable Calendar 2027",
    description:
      "Print a 2027 year-at-a-glance or monthly calendar set. Plan vacations and fiscal dates without signing up for templates.",
  },
  "printable-calendar-january-2027": {
    title: "January 2027 Printable Calendar",
    description:
      "Print January 2027 with weekday grid and notes column. Start the new year with a desk calendar PDF from your browser.",
  },
  "printable-calendar-february-2027": {
    title: "February 2027 Printable Calendar",
    description:
      "February 2027 calendar page for planners and bullet journals. Includes correct 28-day layout for non-leap February 2027.",
  },
  "printable-calendar-march-2027": {
    title: "March 2027 Printable Calendar",
    description:
      "March 2027 monthly calendar ready to print. Track spring events, taxes, and school breaks on one page.",
  },
  "image-to-text": {
    title: "Image to Text OCR",
    description:
      "Extract text from photos and screenshots with in-browser OCR. Copy recognized words without sending images to a remote server.",
  },
  "tdee-calculator": {
    title: "TDEE Calculator — Daily Calories",
    description:
      "Estimate total daily energy expenditure from activity level and body stats. Set calorie targets for cut, maintain, or bulk plans.",
  },
  "bmr-calculator": {
    title: "BMR Calculator — Basal Metabolic Rate",
    description:
      "Calculate basal metabolic rate with Mifflin-St Jeor or similar formulas. Know resting burn before adding activity multipliers.",
  },
  "macro-calculator": {
    title: "Macro Calculator — Protein, Carbs, Fat",
    description:
      "Split daily calories into protein, carbohydrate, and fat grams for your goal. Adjust ratios for keto, balanced, or high-protein diets.",
  },
  "due-date-calculator": {
    title: "Pregnancy Due Date Calculator",
    description:
      "Estimate due date from last menstrual period or conception date using standard pregnancy length assumptions.",
  },
  "concrete-calculator": {
    title: "Concrete Calculator — Yards & Bags",
    description:
      "Estimate cubic yards and bag counts for slabs, footings, and posts. Reduce waste on DIY pours with local browser math.",
  },
  "square-footage-calculator": {
    title: "Square Footage Calculator",
    description:
      "Compute floor area in square feet from length and width or multiple rooms. Plan flooring, paint, and HVAC sizing estimates.",
  },
  "roof-pitch-calculator": {
    title: "Roof Pitch Calculator",
    description:
      "Convert roof pitch rise/run to degrees and percent slope. Helpful for roofing quotes and rafter length estimates.",
  },
  "deck-calculator": {
    title: "Deck Board & Joist Calculator",
    description:
      "Estimate deck boards, joist spacing, and fastener counts from deck dimensions. Plan lumber orders before the home store run.",
  },
  "mulch-calculator": {
    title: "Mulch Calculator — Cubic Yards",
    description:
      "Calculate mulch volume from bed length, width, and depth in inches. Order the right bulk truckload instead of guessing bags.",
  },
  "paint-calculator": {
    title: "Paint Coverage Calculator",
    description:
      "Estimate gallons needed from wall square footage and coats. Account for doors and windows if the tool provides deductions.",
  },
  "tile-calculator": {
    title: "Tile Calculator — Floor & Wall",
    description:
      "Compute tile count with grout gap and waste factor for bathrooms and backsplashes. Avoid mid-project shortages.",
  },
  "fence-calculator": {
    title: "Fence Material Calculator",
    description:
      "Estimate posts, panels, and pickets from fence length and height. Plan backyard privacy or pasture fencing budgets.",
  },
  "paycheck-calculator": {
    title: "Paycheck Calculator — Net Pay",
    description:
      "Estimate take-home pay from gross wages, filing status, and common deductions. Compare salary offers before HR paperwork.",
  },
  "etsy-fee-calculator": {
    title: "Etsy Fee Calculator",
    description:
      "Calculate Etsy listing, transaction, and payment processing fees on a sale price. Price handmade goods with margin intact.",
  },
  "amazon-fba-fee-calculator": {
    title: "Amazon FBA Fee Calculator",
    description:
      "Estimate FBA fulfillment and referral fees for a SKU size tier and selling price. Sanity-check Amazon seller profitability.",
  },
  "ebay-fee-calculator": {
    title: "eBay Fee Calculator",
    description:
      "Compute eBay final value and promoted listing fees from item price and shipping. Compare net revenue across marketplaces.",
  },
  "paypal-fee-calculator": {
    title: "PayPal Fee Calculator",
    description:
      "Estimate PayPal processing fees for domestic and international payments. Know net deposit before invoicing clients.",
  },
  "video-to-mp3": {
    title: "Video to MP3 Converter",
    description:
      "Extract audio from video files as MP3 in your browser. Strip soundtracks locally with WASM — video never uploads to our servers.",
  },
  "mp4-to-mp3": {
    title: "MP4 to MP3 Converter",
    description:
      "Convert MP4 video to MP3 audio for podcasts and music clips. Trim length if supported; processing stays on your device.",
  },
  "video-compressor": {
    title: "Video Compressor — Smaller MP4",
    description:
      "Reduce video file size by adjusting resolution and bitrate in-browser. Share clips faster without cloud encoding queues.",
  },
  "audio-cutter": {
    title: "Audio Cutter & Trimmer",
    description:
      "Cut and trim audio segments from MP3 or WAV files with waveform preview. Export the selection locally via WASM decoding.",
  },
  "device-test-mic": {
    title: "Microphone Test Online",
    description:
      "Test mic input levels and playback before calls. Visualize volume meters — audio stays local to your browser session.",
  },
  "device-test-webcam": {
    title: "Webcam Test Online",
    description:
      "Preview camera resolution, framing, and focus before Zoom or streaming. Video preview runs locally without recording upload.",
  },
  "device-test-keyboard": {
    title: "Keyboard Test — Key Checker",
    description:
      "Press keys to verify they register correctly and detect stuck or ghost keys on laptops and mechanical boards.",
  },
  "device-test-cps": {
    title: "CPS Test — Clicks Per Second",
    description:
      "Measure clicks per second over timed intervals for gaming practice. Scores stay in the browser unless you share them.",
  },
  "device-test-dead-pixel": {
    title: "Dead Pixel Test — Screen Check",
    description:
      "Flash solid colors fullscreen to spot dead or stuck pixels on monitors and phones before warranty expires.",
  },
  "device-test-pack": {
    title: "Device Test Pack — Mic, Cam, Keys",
    description:
      "Run microphone, webcam, keyboard, CPS, and pixel tests from one hub before important meetings or hardware returns.",
  },
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
    title: "Aspect Ratio Finder & Calculator",
    description:
      "Calculate an image’s aspect ratio from width and height. See pixel dimensions, orientation, and closest common ratios like 16:9, 4:3, 3:2, or 1:1.",
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
      "Convert PNG to WebP online in your browser — smaller web images, quality control, no upload. Keep PNG masters; ship WebP for faster pages.",
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
    title: "Code Comparison Tool — Online Diff",
    description:
      "Compare two code snippets side by side. Line numbers, added/removed highlighting, inline word diffs, and ignore-whitespace. Runs in your browser.",
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
    title: "ROI Calculator — Return on Investment",
    description:
      "Free online ROI calculator with the ROI formula, simple return, and annualized ROI from cost and final value or gain. Compare investments of different lengths.",
  },
  "retirement-calculator": {
    title: "Retirement Savings Calculator",
    description:
      "Project a nest egg from current savings, monthly contributions, and an assumed annual return. Change the rate to stress-test.",
  },
  "budget-calculator": {
    title: "Budget Calculator — Monthly Income vs Expenses",
    description:
      "Free monthly budget calculator: add income and expenses to see surplus or shortfall. Plan a simple budget without creating an account.",
  },
  "sales-tax-calculator": {
    title: "Sales Tax Calculator",
    description:
      "Add sales tax to a price or remove tax from a receipt total. Enter any rate to see tax amount and pre-tax or final price instantly.",
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
    title: "Buying Power Calculator — Dollar Then vs Now",
    description:
      "See what a U.S. dollar amount from one year is worth in another using historical CPI-style data. Compare purchasing power across years.",
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
    title: "Down Payment Calculator — Home Purchase",
    description:
      "Home down payment calculator: solve for cash, percent, or purchase price. See how down payment changes loan amount for 5%, 10%, and 20% scenarios.",
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
      "Calculate an emergency fund target from monthly essential expenses and months of coverage. See how much you still need to save.",
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
      "Generate random integers in a min–max range — one or many, with optional no-duplicates mode. Free online RNG in your browser.",
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
    title: "Team Splitter — Random Team Generator",
    description:
      "Randomly split names into balanced teams for class, sports, or workshops. Uneven counts differ by at most one person per group.",
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
