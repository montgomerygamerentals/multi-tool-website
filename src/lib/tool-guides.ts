import type { ToolGuide } from "./tool-guide-types";

export const toolGuides: Record<string, ToolGuide> = {
  "image-converter": {
    whatItDoes: `Image Converter changes pictures between PNG, JPEG, and WebP without installing software. Conversion happens on your device so you can prepare assets for websites, email, or social posts quickly.`,
    howToUse: [
      `Upload one or more images by dragging them in or choosing files.`,
      `Select the output format (PNG, JPEG, or WebP).`,
      `Adjust quality if available, then convert.`,
      `Download the converted file(s).`,
    ],
    supportedFormats: [
      `Input: PNG, JPEG/JPG, WebP (and other browser-readable image types)`,
      `Output: PNG, JPEG, WebP`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Will converting reduce image quality?`,
        answer: `PNG is lossless. JPEG and WebP can use compression, so lower quality settings create smaller files with more compression artifacts.`,
      },
      {
        question: `Can I convert multiple images at once?`,
        answer: `Yes. Add several files and convert them in one session, then download each result.`,
      },
      {
        question: `Do I need an account?`,
        answer: `No. The converter is free to use in your browser with no sign-up.`,
      },
    ],
  },
  "image-compressor": {
    whatItDoes: `Image Compressor shrinks file size while keeping your picture usable for the web. Dial quality up or down and compare the savings before you download.`,
    howToUse: [
      `Upload an image.`,
      `Adjust the quality slider and preview the result.`,
      `Compare original vs compressed size.`,
      `Download the compressed image when you are happy with the tradeoff.`,
    ],
    supportedFormats: [
      `Input: PNG, JPEG/JPG, WebP, and other common browser image formats`,
      `Output: Compressed JPEG or format supported by the tool UI`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `How much can I compress an image?`,
        answer: `It depends on the original. Photos often shrink a lot at moderate JPEG/WebP quality; already-compressed files may save less.`,
      },
      {
        question: `Is compression lossless?`,
        answer: `Typical web compression is lossy. Lower quality means smaller files and more visible artifacts.`,
      },
      {
        question: `Are my images uploaded?`,
        answer: `No. Compression runs locally in your browser.`,
      },
    ],
  },
  "image-resizer": {
    whatItDoes: `Image Resizer scales pictures to exact pixel dimensions or a percentage of the original size. Use it for thumbnails, banners, product shots, and profile photos.`,
    howToUse: [
      `Upload an image.`,
      `Enter width and height in pixels, or choose a percentage scale.`,
      `Keep aspect ratio locked if you want proportional resizing.`,
      `Download the resized image.`,
    ],
    supportedFormats: [
      `Input: PNG, JPEG/JPG, WebP, and other common image formats`,
      `Output: Resized image download (browser-supported format)`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Can I resize without stretching?`,
        answer: `Yes. Keep the aspect ratio locked so width and height scale together.`,
      },
      {
        question: `Does upsizing improve quality?`,
        answer: `No. Enlarging adds pixels by interpolation and cannot restore detail that was never there.`,
      },
      {
        question: `Is there a size limit?`,
        answer: `Limits depend on your browser and device memory. Very large images may be slow or fail on low-memory devices.`,
      },
    ],
  },
  "image-cropper": {
    whatItDoes: `Image Cropper lets you cut a custom rectangle or circle from a photo. It is useful for avatars, thumbnails, and removing unwanted edges before you publish.`,
    howToUse: [
      `Upload an image.`,
      `Choose a rectangular or circular crop area and drag to adjust.`,
      `Confirm the crop.`,
      `Download the cropped result.`,
    ],
    supportedFormats: [
      `Input: PNG, JPEG/JPG, WebP, and other common image formats`,
      `Output: Cropped PNG or JPEG depending on your selection`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Can I crop to a circle?`,
        answer: `Yes. Use the circular crop mode for profile photos and round avatars.`,
      },
      {
        question: `Does cropping reduce resolution?`,
        answer: `Cropping removes pixels outside the selection. The remaining area keeps its native resolution unless you also resize.`,
      },
      {
        question: `Are uploads stored?`,
        answer: `No. Cropping happens on your device only.`,
      },
    ],
  },
  "aspect-ratio-finder": {
    whatItDoes: `Image Aspect Ratio Finder reports an image’s width, height, orientation, and closest common ratio such as 16:9, 4:3, or 1:1. Handy when matching design specs or social templates.`,
    howToUse: [
      `Upload an image.`,
      `Review pixel dimensions, aspect ratio, and orientation.`,
      `Note the closest common ratio if you need a standard frame.`,
    ],
    supportedFormats: [
      `Input: PNG, JPEG/JPG, WebP, GIF, and other browser-readable images`,
      `Output: On-screen analysis (no format conversion required)`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `What is an aspect ratio?`,
        answer: `It is the proportional relationship between width and height, often written as W:H (for example 16:9).`,
      },
      {
        question: `Why does it show a “closest” ratio?`,
        answer: `Real photos are rarely exact standards. The tool maps your dimensions to the nearest common ratio for design work.`,
      },
      {
        question: `Does this edit my image?`,
        answer: `No. It only inspects dimensions; your file is unchanged unless you use another tool.`,
      },
    ],
  },
  "background-remover": {
    whatItDoes: `Background Remover makes solid or simple backgrounds transparent. Tune tolerance and soft edges, then download a PNG with the subject cut out for overlays and product shots.`,
    howToUse: [
      `Upload an image with a relatively plain background.`,
      `Adjust tolerance and edge softness until the background clears.`,
      `Preview the transparent result.`,
      `Download a PNG with transparency.`,
    ],
    supportedFormats: [
      `Input: PNG, JPEG/JPG, WebP, and similar formats`,
      `Output: PNG with alpha transparency`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Does this work on complex backgrounds?`,
        answer: `It works best on solid or simple backgrounds. Busy scenes, hair detail, or similar colors may need extra cleanup in an editor.`,
      },
      {
        question: `Why download PNG?`,
        answer: `PNG supports transparency. JPEG does not, so transparent cutouts need PNG (or another alpha-capable format).`,
      },
      {
        question: `Is AI used on a server?`,
        answer: `Processing runs in your browser on the image you provide. Nothing is uploaded to our servers.`,
      },
    ],
  },
  "favicon-generator": {
    whatItDoes: `Favicon Generator builds a complete favicon set from an image, text, or emoji. Download ICO, PNG sizes, Apple Touch Icon, Android icons, and a web manifest package for your site.`,
    howToUse: [
      `Choose image, text, or emoji as the source.`,
      `Customize colors and appearance as needed.`,
      `Generate the favicon package.`,
      `Download the ZIP and add the files to your website.`,
    ],
    supportedFormats: [
      `Input: Common image formats, text, or emoji`,
      `Output: ICO, PNG favicon sizes, Apple Touch Icon, Android icons, web manifest (ZIP package)`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `What sizes are included?`,
        answer: `The package includes common favicon and app-icon sizes plus markup/manifest helpers so browsers and devices can pick the right asset.`,
      },
      {
        question: `Can I use emoji as a favicon?`,
        answer: `Yes. Pick the emoji source mode and generate icons from it.`,
      },
      {
        question: `Where should I put the files?`,
        answer: `Usually in your site root or a public icons folder, then link them from your HTML head or framework config.`,
      },
    ],
  },
  "jpg-to-png": {
    whatItDoes: `JPG to PNG Converter turns JPEG photos into PNG files. Use it when you need a lossless format or want to prepare an image for further editing with transparency later.`,
    howToUse: [
      `Upload a JPEG/JPG image.`,
      `Convert to PNG.`,
      `Download the PNG file.`,
    ],
    supportedFormats: [
      `Input: JPEG/JPG`,
      `Output: PNG`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Does JPG to PNG make the file larger?`,
        answer: `Often yes. PNG is lossless and may be bigger than a compressed JPEG of the same photo.`,
      },
      {
        question: `Will transparency appear automatically?`,
        answer: `JPEG has no alpha channel. Converting preserves the visible image; it does not invent a transparent background.`,
      },
      {
        question: `Is conversion private?`,
        answer: `Yes. It runs locally in your browser.`,
      },
    ],
  },
  "png-to-jpg": {
    whatItDoes: `PNG to JPG Converter creates JPEG files from PNG images. That often reduces size for photos and is useful when a destination requires JPG.`,
    howToUse: [
      `Upload a PNG image.`,
      `Convert to JPEG (adjust quality if available).`,
      `Download the JPG file.`,
    ],
    supportedFormats: [
      `Input: PNG`,
      `Output: JPEG/JPG`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `What happens to transparency?`,
        answer: `JPEG does not support transparency. Transparent areas are typically filled with a solid background color.`,
      },
      {
        question: `When should I use JPG instead of PNG?`,
        answer: `JPG is usually better for photographs. PNG is better for graphics with sharp edges or transparency.`,
      },
      {
        question: `Are files uploaded?`,
        answer: `No. Conversion stays on your device.`,
      },
    ],
  },
  "png-to-webp": {
    whatItDoes: `PNG to WebP Converter creates modern WebP images from PNG files for faster page loads while keeping visual quality suitable for the web.`,
    howToUse: [
      `Upload a PNG image.`,
      `Convert to WebP.`,
      `Download the WebP file.`,
    ],
    supportedFormats: [
      `Input: PNG`,
      `Output: WebP`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Why convert to WebP?`,
        answer: `WebP often yields smaller files than PNG/JPEG at similar quality, which helps site performance.`,
      },
      {
        question: `Do all browsers support WebP?`,
        answer: `Most modern browsers do. Keep a fallback format if you must support very old clients.`,
      },
      {
        question: `Is my PNG uploaded?`,
        answer: `No. Processing is local.`,
      },
    ],
  },
  "webp-to-png": {
    whatItDoes: `WebP to PNG Converter turns WebP images into widely compatible PNG files for editors, printers, or platforms that do not accept WebP.`,
    howToUse: [
      `Upload a WebP image.`,
      `Convert to PNG.`,
      `Download the PNG file.`,
    ],
    supportedFormats: [
      `Input: WebP`,
      `Output: PNG`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Will transparency be kept?`,
        answer: `If the WebP has an alpha channel, PNG can preserve transparency through the conversion.`,
      },
      {
        question: `Why convert away from WebP?`,
        answer: `Some apps, CMSs, or print workflows still expect PNG or JPEG instead of WebP.`,
      },
      {
        question: `Is conversion private?`,
        answer: `Yes. It runs in your browser only.`,
      },
    ],
  },
  "qr-code-generator": {
    whatItDoes: `QR Code Generator creates scannable codes for URLs, plain text, Wi‑Fi details, and more. Download a PNG to print, share, or embed on a page.`,
    howToUse: [
      `Enter the content (URL, text, Wi‑Fi, etc.).`,
      `Generate the QR code preview.`,
      `Download the PNG when it looks correct.`,
      `Test with your phone camera before printing or publishing.`,
    ],
    supportedFormats: [
      `Input: Text, URLs, and structured payloads supported by the form`,
      `Output: PNG QR code image`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Can I make a Wi‑Fi QR code?`,
        answer: `Yes, when Wi‑Fi mode is available — guests can scan to join without typing the password.`,
      },
      {
        question: `How much text can a QR code hold?`,
        answer: `Short URLs work best. Very long text makes denser codes that can be harder to scan when printed small.`,
      },
      {
        question: `Do you store what I encode?`,
        answer: `No. Generation happens in your browser.`,
      },
    ],
  },
  "color-converter": {
    whatItDoes: `Color Converter translates between HEX, RGB, and HSL with a live preview. Use it when matching brand colors across CSS, design tools, and print specs.`,
    howToUse: [
      `Enter a color in HEX, RGB, or HSL.`,
      `View the converted values and live preview.`,
      `Copy the format you need into your project.`,
    ],
    supportedFormats: [
      `HEX (e.g. #1A73E8)`,
      `RGB / RGBA channel values`,
      `HSL / HSLA channel values`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Are HEX and RGB the same color?`,
        answer: `They can represent the same color in different notations. This tool converts between them accurately for screen use.`,
      },
      {
        question: `Does it support alpha/transparency?`,
        answer: `Where the UI exposes alpha, you can work with transparent colors; otherwise values are opaque.`,
      },
      {
        question: `Is anything saved?`,
        answer: `No. Color values stay in your browser session.`,
      },
    ],
  },
  "pdf-tools": {
    whatItDoes: `PDF Tools merge PDFs, extract pages, or build a PDF from images — all in the browser. Ideal for quick document prep without uploading sensitive files.`,
    howToUse: [
      `Choose merge, extract, or images-to-PDF.`,
      `Add your PDF or image files.`,
      `Set page ranges or order as needed.`,
      `Download the resulting PDF.`,
    ],
    supportedFormats: [
      `Input: PDF; images (PNG, JPEG, etc.) for images-to-PDF`,
      `Output: PDF`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Can I merge more than two PDFs?`,
        answer: `Yes. Add multiple PDFs and arrange them before merging.`,
      },
      {
        question: `Will extract keep original quality?`,
        answer: `Extracted pages come from your source PDF; we do not re-upload or recompress on a server.`,
      },
      {
        question: `Are PDFs uploaded?`,
        answer: `No. Files stay in your browser.`,
      },
    ],
  },
  "exif-viewer": {
    whatItDoes: `EXIF Metadata Viewer shows camera and capture details embedded in photos, and can give you a JPEG copy with metadata removed for cleaner sharing.`,
    howToUse: [
      `Upload a photo that may contain EXIF data.`,
      `Inspect tags such as camera model, date, and GPS if present.`,
      `Optionally download a JPEG with metadata stripped.`,
    ],
    supportedFormats: [
      `Input: JPEG and other formats with readable EXIF where supported`,
      `Output: On-screen metadata; optional JPEG without EXIF`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `What is EXIF?`,
        answer: `EXIF is metadata stored in many photos — camera settings, timestamps, and sometimes GPS location.`,
      },
      {
        question: `Why remove metadata?`,
        answer: `Stripping EXIF helps avoid sharing location or device details when you publish a photo.`,
      },
      {
        question: `Do you keep my photos?`,
        answer: `No. Reading and stripping happens locally.`,
      },
    ],
  },
  "word-counter": {
    whatItDoes: `Word Counter tallies words, characters, sentences, and paragraphs, plus an estimated reading time. Useful for essays, captions, SEO drafts, and social limits.`,
    howToUse: [
      `Paste or type your text into the box.`,
      `Read live counts for words, characters, and more.`,
      `Use reading time as a rough guide for length.`,
    ],
    supportedFormats: [
      `Plain text pasted or typed in the browser`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Does it count spaces as characters?`,
        answer: `Character counts typically include spaces unless a separate “without spaces” metric is shown.`,
      },
      {
        question: `How is reading time estimated?`,
        answer: `It uses a typical words-per-minute assumption. Actual reading speed varies by person and content.`,
      },
      {
        question: `Is my text stored?`,
        answer: `No. Text stays in your browser.`,
      },
    ],
  },
  "notepad": {
    whatItDoes: `Notepad is a simple writing pad that autosaves in your browser. Draft notes, copy them, or download when you need a local file.`,
    howToUse: [
      `Start typing in the notepad.`,
      `Your text autosaves locally as you write.`,
      `Copy or download when you need the content elsewhere.`,
      `Clear the note if you want a blank slate.`,
    ],
    supportedFormats: [
      `Plain text in the editor`,
      `Download as a text file when exported`,
    ],
    privacy: `Notes are stored only in your browser’s local storage on this device. We do not upload or sync your text to any server.`,
    faqs: [
      {
        question: `Where are notes saved?`,
        answer: `In this browser’s local storage on your device — not on our servers.`,
      },
      {
        question: `Will clearing site data delete notes?`,
        answer: `Yes. Clearing browser storage for this site removes autosaved notes.`,
      },
      {
        question: `Can I sync across devices?`,
        answer: `Not automatically. Copy or download your note to move it elsewhere.`,
      },
    ],
  },
  "case-converter": {
    whatItDoes: `Case Converter transforms text into uppercase, lowercase, title case, sentence case, and other common casings for headings, code, and cleanup.`,
    howToUse: [
      `Paste your text.`,
      `Choose the target case style.`,
      `Copy the converted result.`,
    ],
    supportedFormats: [
      `Plain text`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is title case?`,
        answer: `Title case capitalizes major words in a headline-style way. Small words may stay lowercase depending on the rules applied.`,
      },
      {
        question: `Does it change punctuation?`,
        answer: `It focuses on letter casing; punctuation is generally left as-is.`,
      },
      {
        question: `Is text uploaded?`,
        answer: `No. Conversion is local.`,
      },
    ],
  },
  "remove-duplicates": {
    whatItDoes: `Remove Duplicate Lines cleans lists by dropping repeated lines. Optionally sort alphabetically to tidy exports, emails, or CSV columns.`,
    howToUse: [
      `Paste your list (one item per line).`,
      `Remove duplicates.`,
      `Optionally sort the cleaned list.`,
      `Copy the result.`,
    ],
    supportedFormats: [
      `Plain text lists (one entry per line)`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is matching case-sensitive?`,
        answer: `Duplicate detection follows the tool’s matching rules — identical lines are removed; slight spelling differences are kept.`,
      },
      {
        question: `Does order stay the same?`,
        answer: `Typically the first occurrence is kept. Sorting is optional if you enable it.`,
      },
      {
        question: `Is my list private?`,
        answer: `Yes. Processing stays in your browser.`,
      },
    ],
  },
  "text-diff": {
    whatItDoes: `Text Diff Compare shows differences between two text blocks side by side. Spot edits in drafts, policies, scripts, or any plain-text revisions.`,
    howToUse: [
      `Paste the original text on one side.`,
      `Paste the revised text on the other.`,
      `Review highlighted additions and removals.`,
    ],
    supportedFormats: [
      `Plain text`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is this a full document merge tool?`,
        answer: `It highlights differences for review. It is not a collaborative Word-style track-changes editor.`,
      },
      {
        question: `Does formatting matter?`,
        answer: `Comparison is text-based. Whitespace and line breaks can show up as differences.`,
      },
      {
        question: `Do you store the texts?`,
        answer: `No. Comparison runs locally.`,
      },
    ],
  },
  "code-comparison": {
    whatItDoes: `Code Comparison diffs two snippets with line numbers and highlighted additions/removals. Useful for reviewing patches, config changes, and small refactors.`,
    howToUse: [
      `Paste the old code in one panel.`,
      `Paste the new code in the other.`,
      `Scan highlighted lines to see what changed.`,
    ],
    supportedFormats: [
      `Plain text / source code of any language`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Which languages are supported?`,
        answer: `Any text-based code. Highlighting is about line differences, not language-specific parsing.`,
      },
      {
        question: `Can I compare whole repositories?`,
        answer: `This tool is for snippet-level comparison, not full git repository diffs.`,
      },
      {
        question: `Is code uploaded?`,
        answer: `No. Diffing happens in your browser.`,
      },
    ],
  },
  "lorem-ipsum": {
    whatItDoes: `Lorem Ipsum Generator creates placeholder copy for wireframes, mockups, and prototypes so layouts look realistic before final content is ready.`,
    howToUse: [
      `Choose how much text you need (paragraphs, words, etc.).`,
      `Generate the placeholder copy.`,
      `Copy it into your design or prototype.`,
    ],
    supportedFormats: [
      `Plain text placeholder copy`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is Lorem Ipsum?`,
        answer: `It is scrambled Latin-like placeholder text used in design so viewers focus on layout instead of real wording.`,
      },
      {
        question: `Can I use it commercially?`,
        answer: `Placeholder text itself is fine for mockups; replace it with real content before publishing.`,
      },
      {
        question: `Does generation phone home?`,
        answer: `No. Text is generated locally.`,
      },
    ],
  },
  "json-formatter": {
    whatItDoes: `JSON Formatter beautifies, validates, and minifies JSON so API payloads and config files are easier to read or ship.`,
    howToUse: [
      `Paste your JSON.`,
      `Format to pretty-print, or minify to compress.`,
      `Fix any validation errors the tool reports.`,
      `Copy the result.`,
    ],
    supportedFormats: [
      `JSON text`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What if my JSON is invalid?`,
        answer: `The formatter will indicate a parse error. Check commas, quotes, and brackets, then try again.`,
      },
      {
        question: `Does minify change meaning?`,
        answer: `No. Minifying removes unnecessary whitespace while keeping the same data.`,
      },
      {
        question: `Is JSON uploaded?`,
        answer: `No. Formatting stays on your device.`,
      },
    ],
  },
  "json-generator": {
    whatItDoes: `JSON Generator builds mock JSON from a schema you define. Speed up API stubs, front-end prototypes, and test fixtures.`,
    howToUse: [
      `Define or adjust the schema/fields you need.`,
      `Generate sample JSON data.`,
      `Copy or download the output for your project.`,
    ],
    supportedFormats: [
      `Schema-driven mock JSON output`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is the data real?`,
        answer: `No. It is synthetic mock data for development and demos — not production user data.`,
      },
      {
        question: `Can I control field types?`,
        answer: `Yes, through the schema controls exposed in the tool (strings, numbers, nested objects, etc.).`,
      },
      {
        question: `Do you store schemas?`,
        answer: `No. Everything runs in your browser session.`,
      },
    ],
  },
  "base64-encoder": {
    whatItDoes: `Base64 Encoder / Decoder converts text to Base64 and back. Handy for data URLs, simple transport encoding, and debugging encoded payloads.`,
    howToUse: [
      `Paste plain text to encode, or Base64 to decode.`,
      `Run encode or decode.`,
      `Copy the result.`,
    ],
    supportedFormats: [
      `Plain text ↔ Base64 strings`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is Base64 encryption?`,
        answer: `No. Base64 is encoding, not encryption. Anyone can decode it. Do not use it to hide secrets.`,
      },
      {
        question: `Why do encoded strings get longer?`,
        answer: `Base64 represents binary/text using a 64-character alphabet and typically expands size by about a third.`,
      },
      {
        question: `Is my text uploaded?`,
        answer: `No. Encoding/decoding is local.`,
      },
    ],
  },
  "markdown-editor": {
    whatItDoes: `Markdown Editor lets you write Markdown and preview rendered HTML side by side. Draft READMEs, docs, and posts without leaving the browser.`,
    howToUse: [
      `Type or paste Markdown in the editor.`,
      `Watch the live HTML preview.`,
      `Copy Markdown or use the preview as a visual check.`,
    ],
    supportedFormats: [
      `Markdown (CommonMark-style) → HTML preview`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Which Markdown features work?`,
        answer: `Common syntax like headings, lists, links, code blocks, and emphasis are supported via the preview renderer.`,
      },
      {
        question: `Is HTML sanitized?`,
        answer: `Preview rendering is meant for drafting. Be careful pasting untrusted HTML/Markdown from unknown sources.`,
      },
      {
        question: `Do you save my drafts?`,
        answer: `Content stays in your browser unless you copy it elsewhere.`,
      },
    ],
  },
  "regex-tester": {
    whatItDoes: `Regex Tester runs regular expressions against sample text with live match highlighting so you can debug patterns faster.`,
    howToUse: [
      `Enter a regular expression.`,
      `Paste sample text to test against.`,
      `Review highlighted matches and adjust flags/pattern as needed.`,
    ],
    supportedFormats: [
      `JavaScript-style regular expressions and plain text samples`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Which regex flavor is this?`,
        answer: `It follows JavaScript regular expression behavior in your browser.`,
      },
      {
        question: `Can I test flags like global or case-insensitive?`,
        answer: `Yes, when flags are exposed in the UI (for example g, i, m).`,
      },
      {
        question: `Is my text sent to a server?`,
        answer: `No. Testing is local.`,
      },
    ],
  },
  "hash-generator": {
    whatItDoes: `Hash Generator computes hashes such as MD5, SHA-1, and SHA-256 from text or files for checksums, integrity checks, and development workflows.`,
    howToUse: [
      `Enter text or select a file.`,
      `Choose the hash algorithm(s).`,
      `Copy the generated hash digest.`,
    ],
    supportedFormats: [
      `Input: Plain text or local files`,
      `Output: Hex hash digests (MD5, SHA-1, SHA-256, and other listed algorithms)`,
    ],
    privacy: `Files are processed locally in your browser and are never uploaded. Close the tab when you are done and nothing is retained on our side.`,
    faqs: [
      {
        question: `Is hashing reversible?`,
        answer: `No. Hashes are one-way digests. You cannot reconstruct the original file from a hash alone.`,
      },
      {
        question: `Should I use MD5 for security?`,
        answer: `MD5 and SHA-1 are weak for security-sensitive uses. Prefer SHA-256 (or stronger) for integrity where it matters.`,
      },
      {
        question: `Are files uploaded to hash them?`,
        answer: `No. Hashing runs in your browser.`,
      },
    ],
  },
  "uuid-generator": {
    whatItDoes: `UUID Generator creates random UUID v4 identifiers one at a time or in bulk for databases, APIs, and unique keys.`,
    howToUse: [
      `Choose how many UUIDs you need.`,
      `Generate.`,
      `Copy the identifiers into your app or spreadsheet.`,
    ],
    supportedFormats: [
      `UUID version 4 strings (8-4-4-4-12 hex format)`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Are UUIDs unique?`,
        answer: `UUID v4 values are randomly generated with extremely low collision probability for normal use.`,
      },
      {
        question: `Do you log generated IDs?`,
        answer: `No. Generation happens locally and is not stored by us.`,
      },
      {
        question: `Can I generate bulk UUIDs?`,
        answer: `Yes. Select a count and generate a list.`,
      },
    ],
  },
  "password-generator": {
    whatItDoes: `Password Generator creates strong random passwords with length and character-set controls. Build credentials you can copy into a password manager.`,
    howToUse: [
      `Set length and character options (letters, numbers, symbols).`,
      `Generate a password.`,
      `Copy it into your password manager or account form.`,
    ],
    supportedFormats: [
      `Random password strings based on your selected character sets`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Are passwords stored?`,
        answer: `No. Generated passwords are created in your browser and are not uploaded to us.`,
      },
      {
        question: `How long should a password be?`,
        answer: `Longer is stronger. Many sites accept 16+ characters; follow each site’s rules and store passwords in a manager.`,
      },
      {
        question: `Is this cryptographically random?`,
        answer: `The tool uses the browser’s secure random capabilities where available for generation.`,
      },
    ],
  },
  "unit-converter": {
    whatItDoes: `Unit Converter switches length, weight, temperature, volume, and other everyday units so recipes, DIY, and travel math stay accurate.`,
    howToUse: [
      `Pick a measurement category.`,
      `Enter a value and choose from/to units.`,
      `Read the converted result instantly.`,
    ],
    supportedFormats: [
      `Numeric values`,
      `Common units for length, weight, temperature, volume, and related categories in the tool`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Are conversions exact?`,
        answer: `They use standard conversion factors. Floating-point rounding may show tiny differences at many decimal places.`,
      },
      {
        question: `Does temperature conversion work differently?`,
        answer: `Yes. Celsius, Fahrenheit, and Kelvin use formulas rather than a simple multiply factor.`,
      },
      {
        question: `Is data saved?`,
        answer: `No. Values stay in your browser.`,
      },
    ],
  },
  "bmi-calculator": {
    whatItDoes: `BMI Calculator estimates Body Mass Index from height and weight in metric or imperial units. It is a screening number, not a full health diagnosis.`,
    howToUse: [
      `Choose metric or imperial units.`,
      `Enter height and weight.`,
      `Review your BMI and category label.`,
    ],
    supportedFormats: [
      `Metric: centimeters / kilograms`,
      `Imperial: feet-inches / pounds`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is a healthy BMI range?`,
        answer: `Common adult charts treat roughly 18.5–24.9 as a standard “normal” range, but healthy bodies vary. Ask a clinician for personal advice.`,
      },
      {
        question: `Is BMI accurate for athletes?`,
        answer: `BMI does not distinguish muscle from fat, so muscular people may score higher without excess fat.`,
      },
      {
        question: `Do you store my measurements?`,
        answer: `No. Calculations stay on your device.`,
      },
    ],
  },
  "age-calculator": {
    whatItDoes: `Age Calculator computes exact age in years, months, and days from a birthdate — useful for forms, milestones, and eligibility checks.`,
    howToUse: [
      `Enter your date of birth.`,
      `Optionally set an “as of” date.`,
      `Read the breakdown of years, months, and days.`,
    ],
    supportedFormats: [
      `Calendar dates`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Does it account for leap years?`,
        answer: `Yes. Age is computed from real calendar dates, including leap-day effects.`,
      },
      {
        question: `Can I calculate age on a future date?`,
        answer: `If an “as of” date is available, set it to any valid date to project age.`,
      },
      {
        question: `Is my birthdate uploaded?`,
        answer: `No. It never leaves your browser.`,
      },
    ],
  },
  "days-between-dates": {
    whatItDoes: `Days Between Dates measures the span between two dates in days, weeks, and months for planning trips, deadlines, and project timelines.`,
    howToUse: [
      `Pick a start date and an end date.`,
      `View the difference in days and related units.`,
      `Adjust dates to explore alternate schedules.`,
    ],
    supportedFormats: [
      `Calendar dates`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Are both dates included?`,
        answer: `Most day-count tools report the difference between dates; check the result label for inclusive vs exclusive counting if shown.`,
      },
      {
        question: `Can I count business days only?`,
        answer: `This calculator focuses on calendar time unless a business-day mode is explicitly provided.`,
      },
      {
        question: `Is anything stored?`,
        answer: `No. Dates stay local.`,
      },
    ],
  },
  "percentage-calculator": {
    whatItDoes: `Percentage Calculator solves everyday percent problems — what is X% of Y, percent change, and related increase/decrease math.`,
    howToUse: [
      `Choose the type of percentage problem.`,
      `Enter the known values.`,
      `Read the calculated percentage or amount.`,
    ],
    supportedFormats: [
      `Numeric values and percents`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `How do I calculate percent increase?`,
        answer: `Subtract the old value from the new, divide by the old value, and multiply by 100. The tool does this when you use the increase/decrease mode.`,
      },
      {
        question: `Can it do reverse percentages?`,
        answer: `Yes for common cases like finding the original amount before a percent was applied, when that mode is selected.`,
      },
      {
        question: `Are inputs saved?`,
        answer: `No.`,
      },
    ],
  },
  "fraction-decimal-converter": {
    whatItDoes: `Fraction ↔ Decimal Converter switches decimals to simplified fractions and fractions to decimals, including mixed numbers for homework and measurements.`,
    howToUse: [
      `Enter a fraction or a decimal.`,
      `Convert in either direction.`,
      `Copy the simplified result.`,
    ],
    supportedFormats: [
      `Proper/improper fractions`,
      `Mixed numbers`,
      `Decimal numbers`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Will fractions always simplify?`,
        answer: `Yes when a simpler equivalent exists (for example 2/4 → 1/2).`,
      },
      {
        question: `Are repeating decimals exact?`,
        answer: `Finite decimal displays may round repeating values. Fractions remain exact when shown as ratios.`,
      },
      {
        question: `Is data private?`,
        answer: `Yes. Conversion is local.`,
      },
    ],
  },
  "tip-calculator": {
    whatItDoes: `Tip Calculator figures tip amount and total bill, and can split the cost across people after a meal or service.`,
    howToUse: [
      `Enter the bill amount.`,
      `Choose a tip percentage.`,
      `Set how many people are splitting.`,
      `Pay your share from the per-person total.`,
    ],
    supportedFormats: [
      `Currency amounts and tip percentages`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Should tip be calculated before or after tax?`,
        answer: `Customs vary. Many people tip on the pre-tax subtotal; follow local norms or house policy.`,
      },
      {
        question: `Can I use a custom tip percent?`,
        answer: `Yes. Enter whatever percentage you want.`,
      },
      {
        question: `Do you store bill amounts?`,
        answer: `No.`,
      },
    ],
  },
  "loan-calculator": {
    whatItDoes: `Loan Calculator estimates monthly payments, total interest, and payoff outlook for standard amortizing loans so you can compare offers.`,
    howToUse: [
      `Enter loan amount, interest rate, and term.`,
      `Review monthly payment and total interest.`,
      `Adjust inputs to compare scenarios.`,
    ],
    supportedFormats: [
      `Currency amounts, interest rates (%), loan terms`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Does this include fees or insurance?`,
        answer: `Basic payment math focuses on principal and interest unless you add other costs in related fields.`,
      },
      {
        question: `Is this a loan offer?`,
        answer: `No. It is an estimate. Lenders may use different compounding or fees.`,
      },
      {
        question: `Are my numbers uploaded?`,
        answer: `No. Calculations stay in your browser.`,
      },
    ],
  },
  "debt-payoff-calculator": {
    whatItDoes: `Debt Payoff Calculator plans payoff across multiple debts using the avalanche method, extra payments, and a fixed or shrinking monthly budget.`,
    howToUse: [
      `Add each debt with balance, APR, and minimum payment.`,
      `Set your monthly budget and any extra payment.`,
      `Review the payoff order and timeline.`,
      `Adjust strategy inputs until the plan fits your budget.`,
    ],
    supportedFormats: [
      `Debt balances, APRs, and monthly payment amounts`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is the avalanche method?`,
        answer: `Avalanche pays minimums on all debts and puts extra money toward the highest interest rate first to reduce interest cost.`,
      },
      {
        question: `Is this financial advice?`,
        answer: `No. It is a planning calculator. Consider a trusted advisor for personal decisions.`,
      },
      {
        question: `Do you store debt details?`,
        answer: `No. Everything stays local.`,
      },
    ],
  },
  "mortgage-calculator": {
    whatItDoes: `Mortgage Calculator estimates monthly principal & interest and can factor taxes and insurance for a fuller payment picture before you talk to lenders.`,
    howToUse: [
      `Enter home price, down payment, rate, and term.`,
      `Add taxes/insurance if you want a PITI-style estimate.`,
      `Review monthly payment and total interest.`,
    ],
    supportedFormats: [
      `Home price, rates, terms, tax/insurance amounts`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is P&I?`,
        answer: `Principal and interest — the loan payment portion before taxes, insurance, or HOA fees.`,
      },
      {
        question: `Are estimates guaranteed?`,
        answer: `No. Actual quotes depend on credit, fees, escrow, and lender rules.`,
      },
      {
        question: `Is my data private?`,
        answer: `Yes. Numbers never leave your browser.`,
      },
    ],
  },
  "compound-interest-calculator": {
    whatItDoes: `Compound Interest Calculator projects future value with compound growth and optional recurring contributions for savings and investment sketches.`,
    howToUse: [
      `Enter starting principal, rate, and time period.`,
      `Add monthly contributions if applicable.`,
      `Review projected future value and growth.`,
    ],
    supportedFormats: [
      `Currency amounts, annual rates (%), time periods`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `How often does interest compound?`,
        answer: `The calculator uses the compounding frequency shown in the UI (for example monthly). Match it to your account when possible.`,
      },
      {
        question: `Does this include taxes or fees?`,
        answer: `Usually no. It is a growth estimate before taxes, fees, or market volatility.`,
      },
      {
        question: `Are inputs stored?`,
        answer: `No.`,
      },
    ],
  },
  "roi-calculator": {
    whatItDoes: `ROI Calculator measures return on investment and annualized ROI from initial cost and final value (or gain) for quick deal comparisons.`,
    howToUse: [
      `Enter the initial cost and final value (or gain).`,
      `Add the time period for annualized ROI if needed.`,
      `Review ROI percentage and related results.`,
    ],
    supportedFormats: [
      `Currency amounts and time periods`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is annualized ROI?`,
        answer: `It expresses return on a per-year basis so investments held for different lengths are easier to compare.`,
      },
      {
        question: `Does ROI include ongoing costs?`,
        answer: `Only if you fold them into the amounts you enter. The formula uses the inputs you provide.`,
      },
      {
        question: `Is this investment advice?`,
        answer: `No. It is a simple math tool.`,
      },
    ],
  },
  "retirement-calculator": {
    whatItDoes: `Retirement Savings Calculator projects a nest egg from current savings, monthly contributions, and expected annual return for long-range planning sketches.`,
    howToUse: [
      `Enter current savings, monthly contribution, and expected return.`,
      `Set years until retirement.`,
      `Review the projected balance.`,
    ],
    supportedFormats: [
      `Currency amounts, contribution rates, return assumptions`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Are returns guaranteed?`,
        answer: `No. Markets vary. The projection assumes a steady rate you choose for illustration.`,
      },
      {
        question: `Does it include inflation or Social Security?`,
        answer: `This tool focuses on contribution and growth math unless those inputs are explicitly included.`,
      },
      {
        question: `Do you store financial details?`,
        answer: `No. Calculations are local.`,
      },
    ],
  },
  "budget-calculator": {
    whatItDoes: `Budget Calculator builds a simple monthly plan by comparing income to expenses so you can see what is left over.`,
    howToUse: [
      `Enter monthly income.`,
      `List expense categories and amounts.`,
      `Review remaining balance (surplus or shortfall).`,
    ],
    supportedFormats: [
      `Currency amounts for income and expenses`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Should I use take-home pay?`,
        answer: `Yes — budgeting with after-tax income is usually more realistic than gross pay.`,
      },
      {
        question: `Can I plan irregular expenses?`,
        answer: `Average irregular costs into a monthly amount (for example annual insurance ÷ 12).`,
      },
      {
        question: `Is my budget uploaded?`,
        answer: `No.`,
      },
    ],
  },
  "sales-tax-calculator": {
    whatItDoes: `Sales Tax Calculator adds or removes tax from a price so you can see tax amount and totals for any rate.`,
    howToUse: [
      `Enter the price and tax rate.`,
      `Choose add tax or remove tax from a total.`,
      `Copy the tax amount and final price.`,
    ],
    supportedFormats: [
      `Currency amounts and tax rates (%)`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Does this know my local rate?`,
        answer: `You enter the rate. Local sales tax can vary by city/county — confirm with an official source.`,
      },
      {
        question: `Can I reverse out tax from a total?`,
        answer: `Yes. Use remove-tax mode to find the pre-tax amount from a tax-inclusive price.`,
      },
      {
        question: `Are amounts stored?`,
        answer: `No.`,
      },
    ],
  },
  "income-tax-estimator": {
    whatItDoes: `Income Tax Estimator roughly estimates U.S. federal income tax from taxable income using bracket-style math. It is not tax advice or a filing substitute.`,
    howToUse: [
      `Enter taxable income (and filing context if asked).`,
      `Review the estimated tax.`,
      `Treat the result as a rough educational estimate only.`,
    ],
    supportedFormats: [
      `USD taxable income figures`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is this official IRS software?`,
        answer: `No. It is a simplified estimator and may not reflect credits, deductions, AMT, or state tax.`,
      },
      {
        question: `Should I use this to file?`,
        answer: `No. Use IRS tools, tax software, or a professional for filing decisions.`,
      },
      {
        question: `Do you store income values?`,
        answer: `No. Estimates run locally.`,
      },
    ],
  },
  "currency-converter": {
    whatItDoes: `Currency Converter converts between world currencies using a live or manual exchange rate for quick travel and shopping math.`,
    howToUse: [
      `Choose source and target currencies.`,
      `Enter an amount.`,
      `Use live rates when available, or type a manual rate.`,
      `Read the converted amount.`,
    ],
    supportedFormats: [
      `ISO currency codes supported by the tool / rate source`,
      `Numeric currency amounts`,
    ],
    privacy: `Amounts you enter stay in your browser. When using live rates, only the selected currency codes are sent to a public exchange-rate API (Frankfurter). Nothing about your balances is stored by us.`,
    faqs: [
      {
        question: `Are rates real-time bank rates?`,
        answer: `Live rates come from a public exchange-rate API and may differ from card networks or bank spreads.`,
      },
      {
        question: `Can I set my own rate?`,
        answer: `Yes. Use manual rate mode when you have a specific FX quote.`,
      },
      {
        question: `Do you store conversion history?`,
        answer: `No conversion history is stored by us on a server.`,
      },
    ],
  },
  "salary-hourly-converter": {
    whatItDoes: `Salary to Hourly Converter translates annual salary to hourly wage and back, plus monthly, biweekly, and weekly views for offer comparisons.`,
    howToUse: [
      `Enter salary or hourly rate.`,
      `Confirm hours-per-week assumptions if shown.`,
      `Review equivalent pay across common periods.`,
    ],
    supportedFormats: [
      `Annual salary and hourly wage amounts`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `How many hours per year does it assume?`,
        answer: `Typically a standard full-time schedule (for example 40 hours × 52 weeks) unless you change the assumption.`,
      },
      {
        question: `Does this include overtime or bonuses?`,
        answer: `No. It converts base pay equivalents only unless you add those amounts yourself.`,
      },
      {
        question: `Is pay data uploaded?`,
        answer: `No.`,
      },
    ],
  },
  "inflation-calculator": {
    whatItDoes: `Inflation Calculator shows how purchasing power changes over time at a given inflation rate so you can compare dollar values across years.`,
    howToUse: [
      `Enter an amount and inflation rate.`,
      `Set the number of years.`,
      `Compare today’s value with the inflated (or deflated) equivalent.`,
    ],
    supportedFormats: [
      `Currency amounts, inflation rates (%), years`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is the inflation rate official CPI?`,
        answer: `You choose the rate (or use the value provided). Official CPI series can differ by index and country.`,
      },
      {
        question: `Can inflation be negative?`,
        answer: `If you enter a negative rate, the math models deflation (rising purchasing power).`,
      },
      {
        question: `Are inputs stored?`,
        answer: `No.`,
      },
    ],
  },
  "buying-power-calculator": {
    whatItDoes: `Dollar Buying Power Calculator compares what money from one year is worth in another using historical U.S. CPI-style data — then vs now purchasing power.`,
    howToUse: [
      `Enter an amount and the original year.`,
      `Choose the comparison year.`,
      `Review the equivalent buying power.`,
    ],
    supportedFormats: [
      `USD amounts and calendar years covered by the dataset`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What data powers this?`,
        answer: `It uses historical U.S. consumer price index style figures packaged with the tool for year-to-year comparisons.`,
      },
      {
        question: `Is this exact for my city?`,
        answer: `CPI is a national-style index. Local prices for specific goods can differ.`,
      },
      {
        question: `Do you collect the amounts I enter?`,
        answer: `No. Calculation is local.`,
      },
    ],
  },
  "refinance-calculator": {
    whatItDoes: `Refinance Calculator compares your current loan with a refinance offer — monthly savings, break-even time, and total interest impact.`,
    howToUse: [
      `Enter your current loan details.`,
      `Enter the new loan rate, term, and closing costs.`,
      `Review monthly savings and break-even months.`,
    ],
    supportedFormats: [
      `Loan balances, rates, terms, and refinance fees`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is break-even?`,
        answer: `It is how long until monthly savings recover upfront refinance costs.`,
      },
      {
        question: `Should I refinance if break-even is long?`,
        answer: `Only if you expect to keep the loan past break-even and the overall interest picture improves. This is not personalized advice.`,
      },
      {
        question: `Is loan data uploaded?`,
        answer: `No.`,
      },
    ],
  },
  "credit-card-payoff-calculator": {
    whatItDoes: `Credit Card Payoff Calculator estimates how long payoff takes and how much interest accrues at your payment amount and APR.`,
    howToUse: [
      `Enter balance, APR, and monthly payment.`,
      `Review months to pay off and total interest.`,
      `Try higher payments to see interest savings.`,
    ],
    supportedFormats: [
      `Card balances, APRs (%), monthly payments`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Why is interest so high?`,
        answer: `Card APRs compound on revolving balances. Paying only a little above interest extends payoff for years.`,
      },
      {
        question: `Does this include new charges?`,
        answer: `It models paying down an existing balance assuming no new spending unless you add that yourself.`,
      },
      {
        question: `Are balances stored?`,
        answer: `No.`,
      },
    ],
  },
  "down-payment-calculator": {
    whatItDoes: `Down Payment Calculator finds down payment amount, percent, or an affordable home price from the numbers you already know.`,
    howToUse: [
      `Enter the known values (price, percent, or cash available).`,
      `Solve for the missing down payment figure.`,
      `Use the result while shopping or talking to lenders.`,
    ],
    supportedFormats: [
      `Home prices, down payment percents, cash amounts`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `How much down payment do I need?`,
        answer: `It depends on the loan program. Some allow low down payments; 20% often avoids PMI on conventional loans.`,
      },
      {
        question: `Does this include closing costs?`,
        answer: `It focuses on down payment math. Budget separately for closing costs and reserves.`,
      },
      {
        question: `Is data private?`,
        answer: `Yes.`,
      },
    ],
  },
  "amortization-schedule": {
    whatItDoes: `Amortization Schedule Calculator builds a month-by-month table of principal, interest, and remaining balance, with CSV download for spreadsheets.`,
    howToUse: [
      `Enter loan amount, rate, and term.`,
      `Generate the amortization schedule.`,
      `Download CSV if you want to analyze it in Excel or Sheets.`,
    ],
    supportedFormats: [
      `Loan inputs: amount, rate, term`,
      `Output: On-screen schedule and CSV download`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Why do early payments go mostly to interest?`,
        answer: `That is normal amortization: interest is charged on the remaining balance, which is highest at the start.`,
      },
      {
        question: `Can I model extra payments?`,
        answer: `If the tool includes extra-payment fields, enter them; otherwise the schedule reflects the standard payment only.`,
      },
      {
        question: `Is the CSV uploaded?`,
        answer: `No. It is generated in your browser for download.`,
      },
    ],
  },
  "net-worth-calculator": {
    whatItDoes: `Net Worth Calculator totals assets minus liabilities for a simple personal balance sheet — private and local in your browser.`,
    howToUse: [
      `List assets (cash, investments, property, etc.).`,
      `List liabilities (loans, cards, mortgages).`,
      `Review net worth as assets − liabilities.`,
    ],
    supportedFormats: [
      `Currency amounts for assets and liabilities`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What counts as an asset?`,
        answer: `Things you own with value: bank balances, investments, vehicles, home equity-related values you choose to include, etc.`,
      },
      {
        question: `Should I use market value?`,
        answer: `Use realistic estimates. For homes and cars, a conservative market value is usually better than purchase price.`,
      },
      {
        question: `Do you store my balance sheet?`,
        answer: `No. It stays on your device.`,
      },
    ],
  },
  "emergency-fund-calculator": {
    whatItDoes: `Emergency Fund Calculator sets a savings target from monthly expenses and months of coverage, then shows how much you still need.`,
    howToUse: [
      `Enter essential monthly expenses.`,
      `Choose months of coverage (commonly 3–6).`,
      `Enter what you have saved so far.`,
      `See the remaining gap to your target.`,
    ],
    supportedFormats: [
      `Monthly expense amounts and savings balances`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `How many months should I save?`,
        answer: `Many guides suggest 3–6 months of essential expenses; freelancers or single-income households may prefer more.`,
      },
      {
        question: `What expenses count?`,
        answer: `Focus on necessities: housing, utilities, food, insurance, minimum debt payments, and transport.`,
      },
      {
        question: `Is my data uploaded?`,
        answer: `No.`,
      },
    ],
  },
  "401k-calculator": {
    whatItDoes: `401(k) Contribution Calculator estimates employee and employer contributions with match rules, plus optional growth projection for workplace retirement accounts.`,
    howToUse: [
      `Enter salary and contribution percentage.`,
      `Add employer match rules if applicable.`,
      `Review annual contributions and optional growth projection.`,
    ],
    supportedFormats: [
      `Salary, contribution %, match formulas, return assumptions`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is an employer match?`,
        answer: `It is free contribution money your employer adds when you contribute, often up to a percentage of salary.`,
      },
      {
        question: `Does this know IRS contribution limits?`,
        answer: `Limits change by year. Verify current IRS caps separately; this tool estimates based on the numbers you enter.`,
      },
      {
        question: `Are salary details stored?`,
        answer: `No.`,
      },
    ],
  },
  "apr-calculator": {
    whatItDoes: `APR Calculator estimates the true annual percentage rate of a loan when fees and points are included, so you can compare stated rate vs real cost.`,
    howToUse: [
      `Enter loan amount, interest rate, term, and fees/points.`,
      `Calculate estimated APR.`,
      `Compare against other loan offers using the same fee assumptions.`,
    ],
    supportedFormats: [
      `Loan amount, stated rate, fees, points, term`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `How is APR different from interest rate?`,
        answer: `APR aims to include certain financing costs so the yearly cost is more comparable across offers.`,
      },
      {
        question: `Is this lender-official APR?`,
        answer: `No. Lenders follow regulatory formulas that may differ. Use this as an educational estimate.`,
      },
      {
        question: `Do you store loan data?`,
        answer: `No.`,
      },
    ],
  },
  "discount-markup-calculator": {
    whatItDoes: `Discount & Markup Calculator finds sale price after a discount, markup from cost, or selling price from a target margin for retail and freelance pricing.`,
    howToUse: [
      `Choose discount, markup, or margin mode.`,
      `Enter cost or original price and the percent.`,
      `Copy the resulting price or profit figures.`,
    ],
    supportedFormats: [
      `Currency amounts and percentages`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What is the difference between markup and margin?`,
        answer: `Markup is percent over cost; margin is percent of selling price. They are related but not identical.`,
      },
      {
        question: `Can I stack multiple discounts?`,
        answer: `Apply one discount at a time, using each result as the next starting price, unless a combined mode is shown.`,
      },
      {
        question: `Are prices stored?`,
        answer: `No.`,
      },
    ],
  },
  "break-even-calculator": {
    whatItDoes: `Break-Even Calculator finds the unit sales and revenue needed to cover fixed costs given variable cost and selling price.`,
    howToUse: [
      `Enter fixed costs, variable cost per unit, and selling price.`,
      `Review break-even units and revenue.`,
      `Adjust price or costs to model scenarios.`,
    ],
    supportedFormats: [
      `Currency amounts for costs, prices, and unit counts`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What are fixed vs variable costs?`,
        answer: `Fixed costs stay roughly constant (rent, salaries). Variable costs change with each unit (materials, shipping).`,
      },
      {
        question: `Does break-even mean profit?`,
        answer: `Break-even means zero profit/loss. Units above break-even contribute to profit (before taxes).`,
      },
      {
        question: `Is business data uploaded?`,
        answer: `No.`,
      },
    ],
  },
  "timezone-converter": {
    whatItDoes: `Timezone Converter translates a date and time between zones and helps check what time it is around the world for meetings and travel.`,
    howToUse: [
      `Enter a date and time.`,
      `Select the source and destination time zones.`,
      `Read the converted local times.`,
    ],
    supportedFormats: [
      `Dates, times, and IANA-style time zone selections`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Does it handle daylight saving?`,
        answer: `Yes when using proper time zone identifiers — conversions follow that zone’s DST rules for the chosen date.`,
      },
      {
        question: `Why not just use UTC offset?`,
        answer: `Offsets change with DST. Named zones stay accurate across seasons.`,
      },
      {
        question: `Is anything stored?`,
        answer: `No.`,
      },
    ],
  },
  "timer": {
    whatItDoes: `Stopwatch & Timer runs a lap-capable stopwatch or a countdown timer entirely in your browser for workouts, cooking, and focus sessions.`,
    howToUse: [
      `Choose stopwatch or countdown mode.`,
      `Start, pause, and reset as needed.`,
      `Record laps on the stopwatch, or set a duration for the timer.`,
    ],
    supportedFormats: [
      `Time durations (hours, minutes, seconds)`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Will the timer run in a background tab?`,
        answer: `Browsers may throttle background tabs. Keep the tab visible for the most reliable timing.`,
      },
      {
        question: `Is there an alarm sound?`,
        answer: `If the UI includes an alert, your device must allow sound; otherwise watch the on-screen completion state.`,
      },
      {
        question: `Do you track my sessions?`,
        answer: `No.`,
      },
    ],
  },
  "name-picker": {
    whatItDoes: `Random Name Picker spins a wheel (or equivalent random draw) to choose a fair winner from your list for giveaways, classrooms, and teams.`,
    howToUse: [
      `Paste names (one per line).`,
      `Spin or draw a random winner.`,
      `Repeat if you need additional picks.`,
    ],
    supportedFormats: [
      `Plain text name lists (one name per line)`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is the pick truly random?`,
        answer: `It uses your browser’s random number generation for an unbiased draw among the names you entered.`,
      },
      {
        question: `Can I remove the winner and pick again?`,
        answer: `Yes — delete or omit names you no longer want, then draw again.`,
      },
      {
        question: `Do you store participant lists?`,
        answer: `No.`,
      },
    ],
  },
  "random-number-generator": {
    whatItDoes: `Random Number Generator produces numbers inside a range you set — one value or many — for games, sampling, and decision prompts.`,
    howToUse: [
      `Set the minimum and maximum.`,
      `Choose how many numbers to generate.`,
      `Generate and copy the results.`,
    ],
    supportedFormats: [
      `Integers within your chosen numeric range`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Can numbers repeat?`,
        answer: `Depending on options, draws may allow duplicates. Use unique mode if the UI provides it.`,
      },
      {
        question: `Is this suitable for cryptography?`,
        answer: `For casual use yes; for security-critical keys prefer dedicated cryptographic tooling and OS facilities.`,
      },
      {
        question: `Are results logged?`,
        answer: `No.`,
      },
    ],
  },
  "coin-flip": {
    whatItDoes: `Coin Flip simulates a fair heads-or-tails toss when you need a quick binary decision.`,
    howToUse: [
      `Click to flip the coin.`,
      `Read heads or tails.`,
      `Flip again whenever you need another toss.`,
    ],
    supportedFormats: [
      `On-screen heads/tails result`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is it 50/50?`,
        answer: `Yes. Each flip is an independent random choice between two outcomes.`,
      },
      {
        question: `Can I flip multiple coins?`,
        answer: `Flip repeatedly, or use the dice/number tools if you need more than a single binary outcome.`,
      },
      {
        question: `Do you record flips?`,
        answer: `No.`,
      },
    ],
  },
  "dice-roller": {
    whatItDoes: `Dice Roller rolls virtual dice with a configurable count and sides for board games, RPGs, and classroom activities.`,
    howToUse: [
      `Choose number of dice and sides.`,
      `Roll.`,
      `Read individual results and totals as shown.`,
    ],
    supportedFormats: [
      `Standard die sizes (e.g. d6, d20) and custom side counts supported by the UI`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Can I roll a d20?`,
        answer: `Yes — set sides to 20 (and any count of dice you need).`,
      },
      {
        question: `Are rolls fair?`,
        answer: `Each face is equally likely based on browser random generation.`,
      },
      {
        question: `Is history stored on a server?`,
        answer: `No.`,
      },
    ],
  },
  "list-shuffler": {
    whatItDoes: `List Shuffler randomly reorders any list — playlists, agendas, bracket seeds, or chore rotations.`,
    howToUse: [
      `Paste your list (one item per line).`,
      `Shuffle.`,
      `Copy the new order.`,
    ],
    supportedFormats: [
      `Plain text lists`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Does shuffle remove duplicates?`,
        answer: `No. It only reorders lines. Use Remove Duplicate Lines if you need uniqueness first.`,
      },
      {
        question: `Is every order equally likely?`,
        answer: `Shuffling aims for an unbiased random permutation of the items you provide.`,
      },
      {
        question: `Is my list uploaded?`,
        answer: `No.`,
      },
    ],
  },
  "team-splitter": {
    whatItDoes: `Split into Teams randomly divides names or items into balanced groups for games, workshops, and class projects.`,
    howToUse: [
      `Paste participant names.`,
      `Choose how many teams.`,
      `Generate balanced random teams.`,
      `Copy the groups.`,
    ],
    supportedFormats: [
      `Plain text name/item lists`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `What if the count does not divide evenly?`,
        answer: `Teams will be as balanced as possible, with some groups differing by one person.`,
      },
      {
        question: `Can I re-roll teams?`,
        answer: `Yes. Run the splitter again for a new random grouping.`,
      },
      {
        question: `Do you store rosters?`,
        answer: `No.`,
      },
    ],
  },
  "yes-no-picker": {
    whatItDoes: `Yes or No Picker answers a binary question with a random yes/no when you want a quick tie-breaker.`,
    howToUse: [
      `Think of your yes/no question.`,
      `Click to get a random answer.`,
      `Try again if you want another draw.`,
    ],
    supportedFormats: [
      `On-screen yes/no result`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is it actually random?`,
        answer: `Yes. Each click independently chooses yes or no at random.`,
      },
      {
        question: `Can I weight the odds?`,
        answer: `This picker is an even yes/no. Use the random number tool for custom probabilities.`,
      },
      {
        question: `Do you log questions?`,
        answer: `No questions are sent to a server.`,
      },
    ],
  },
  "sudoku": {
    whatItDoes: `Sudoku lets you play classic 9×9 puzzles with easy, medium, and hard difficulty, plus notes, conflict highlights, and keyboard support.`,
    howToUse: [
      `Pick a difficulty and start a puzzle.`,
      `Fill cells with numbers 1–9 using mouse or keyboard.`,
      `Use notes mode for candidates; watch conflict highlights.`,
      `Complete the board so each row, column, and box has 1–9 once.`,
    ],
    supportedFormats: [
      `In-browser Sudoku puzzle play (no file import required)`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Can I take notes?`,
        answer: `Yes. Notes mode lets you pencil in candidate digits.`,
      },
      {
        question: `Does it check mistakes?`,
        answer: `Conflict highlighting helps spot duplicates in a row, column, or box.`,
      },
      {
        question: `Is progress saved to an account?`,
        answer: `Play happens locally in your browser session; no account is required.`,
      },
    ],
  },
  "wordle": {
    whatItDoes: `Wordle is a word game where you guess a 5-letter word in six tries. Green means correct place; yellow means wrong place; gray means not in the word.`,
    howToUse: [
      `Type a 5-letter guess and submit.`,
      `Use the color feedback to refine the next guess.`,
      `Solve the word within six attempts.`,
    ],
    supportedFormats: [
      `5-letter English word guesses`,
    ],
    privacy: `This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.`,
    faqs: [
      {
        question: `Is this the New York Times Wordle?`,
        answer: `No. It is an independent Wordle-style game on this site with the same basic rules.`,
      },
      {
        question: `Are guesses case-sensitive?`,
        answer: `Letters are treated as A–Z; casing does not matter.`,
      },
      {
        question: `Do you track my scores?`,
        answer: `Gameplay stays in your browser; no account tracking is required.`,
      },
    ],
  },
};

export function getToolGuide(slug: string): ToolGuide | undefined {
  return toolGuides[slug];
}
