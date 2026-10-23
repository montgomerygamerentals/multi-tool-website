import type { ToolCategory } from "@/lib/tools";

export interface CategoryHubPoint {
  title: string;
  body: string;
}

export interface CategoryHub {
  /** Search snippet. One or two sentences. */
  summary: string;
  lead: string;
  supporting: string;
  whyHeading: string;
  why: string[];
  points: CategoryHubPoint[];
}

export const categoryHubs: Record<ToolCategory, CategoryHub> = {
  "image-media": {
    summary:
      "Free browser image tools for converting, compressing, cropping, and resizing. Photos are edited on your device, not uploaded to a conversion farm.",
    lead:
      "FastFreeTools image utilities convert, compress, crop, resize, and inspect photos in the browser. PNG, JPEG, WebP, favicons, QR codes, and PDF helpers sit in one place so a single job does not bounce you across unrelated sites.",
    supporting:
      "Format converters, the compressor, cropper, and resizer draw on the file you drop into the page. That file is not posted to an image host. The EXIF viewer can also hand you a JPEG with camera metadata stripped before you share a picture.",
    whyHeading: "Why edit images in the browser",
    why: [
      "Upload-based converters keep a copy of the photo on someone else’s server, often longer than the download link lasts. A passport scan, a kid’s face, or an unreleased product shot does not need that stop. Local editing finishes in the tab and leaves when you close it.",
      "You also skip the account wall and the queue. A WebP export for a blog, a square crop for an avatar, or a smaller JPEG for email can happen on the machine that already has the file. The first OCR run may download a text-recognition language pack; the picture itself is still processed here, not sent to a cloud OCR API.",
    ],
    points: [
      {
        title: "Format changes without a re-host",
        body: "Move between PNG, JPEG, WebP, and the other converters in this list when a CMS, printer, or email client rejects the original. Transparency is preserved where the source format has it.",
      },
      {
        title: "Size and frame under your control",
        body: "Compress for a file-size budget, resize to exact pixels, or crop to a circle for a profile photo. Compare the result before you download it.",
      },
      {
        title: "Metadata you can see and remove",
        body: "The EXIF viewer shows camera settings and location fields that ride along inside a JPEG. Strip them when the picture is leaving your device.",
      },
    ],
  },
  "audio-video": {
    summary:
      "Convert video to MP3, compress clips, and trim audio in your browser. Your media is not uploaded to a remote encoder.",
    lead:
      "FastFreeTools audio and video tools extract MP3s, compress clips, and trim sound without sending the file to an online conversion farm. The work runs in your browser, which is the right default for recordings you would not post publicly.",
    supporting:
      "Video to MP3, MP4 to MP3, the video compressor, and the audio cutter use a local encoder (ffmpeg.wasm). The first visit downloads that encoder library from a CDN. After that, the movie or song you picked stays in this tab — it is not stored as a job on a conversion server.",
    whyHeading: "Why convert audio and video locally",
    why: [
      "Remote converters ask you to upload the whole file, wait in a queue, and trust that the service deletes it. Lectures, voice memos, unreleased music, and family video are a poor fit for that model. A browser encoder trades a one-time library download for a file that never leaves the device.",
      "Local editing is also easier to repeat. Trim a ringtone, change the in and out points, and export again without re-uploading. Compress a clip for a message-size limit and keep the original on disk. You are not paying for a cloud minute or creating an account to fetch your own audio.",
    ],
    points: [
      {
        title: "Audio out of a video file",
        body: "Pull an MP3 from a video when you need the soundtrack, a podcast excerpt, or a voice note and not the picture. MP4 to MP3 is the same local path aimed at the format people already have.",
      },
      {
        title: "Smaller video, same machine",
        body: "The compressor re-encodes with H.264 and can scale the frame down. Use it when a clip is too heavy to attach, then download the smaller file.",
      },
      {
        title: "Cuts and fades for short audio",
        body: "Set a start and end, add a fade, and export WAV for a ringtone or a sample. The source file is read in the browser; nothing is synced to an account.",
      },
    ],
  },
  "text-writing": {
    summary:
      "Format JSON, compare code, test regex, and edit text in the browser. Drafts, tokens, and configs stay on your device.",
    lead:
      "FastFreeTools text and developer utilities format JSON, diff code, test regular expressions, count words, and convert encodings in the page you already have open. Paste a draft or a config when it should not sit in another company’s editor.",
    supporting:
      "Notepad autosaves in this browser’s local storage. Formatters, the diff tools, Base64, hashes, and the Markdown preview read what you paste and do not upload the document. Clear the field, or clear site data, and the text is gone.",
    whyHeading: "Why keep drafts and configs in the browser",
    why: [
      "Online beautifiers and diff sites are convenient until the payload contains an API token, a customer list, or an unpublished post. Sending that text to a formatter you do not control is an extra copy you cannot delete. Running the same transform locally removes that copy.",
      "Browser tools are also faster for one-off cleanup: title case on a list of names, duplicate lines stripped from an export, a regex checked against a sample, two contract paragraphs compared before you send them. Each tool page explains the steps, so the result is something you can re-check.",
    ],
    points: [
      {
        title: "Code and data you can inspect",
        body: "Pretty-print JSON, generate mock JSON, compare two snippets, and test a pattern against sample text. Handy when a payload is wrong and you do not want to paste it into a hosted playground.",
      },
      {
        title: "Writing cleanup",
        body: "Count words for a limit, change case, remove duplicate lines, or preview Markdown. The notepad holds a scratch draft across refresh on this device only.",
      },
      {
        title: "Encodings and identifiers",
        body: "Base64, hashes, UUIDs, and number-base conversions stay in the tab. Use them for debugging, not as a place to store secrets long term.",
      },
    ],
  },
  calculators: {
    summary:
      "Mortgage, tax, ROI, grade, and everyday math calculators that show the steps. Your numbers stay in the browser.",
    lead:
      "FastFreeTools calculators cover loans, tax estimates, savings, grades, geometry, and unit conversions. Each page shows the formula and a worked example so you can see where a figure came from before you rely on it.",
    supporting:
      "Amounts you type stay in the tab. They are not saved to an account. The currency converter is the exception: it requests a public exchange rate, and it does not send a balance or an account number. Results are estimates, not financial, tax, or legal advice.",
    whyHeading: "Why run the numbers locally",
    why: [
      "Loan, paycheck, and tax worksheets often include income and debts you would not put in a random form. A calculator that never creates a profile has less to leak. You can try a rate, a term, or a down payment, then close the tab.",
      "Showing the steps matters as much as the total. Amortization, compound interest, grade weights, and proportions are easy to mis-key. A visible formula lets you match the result against a spreadsheet or a lender’s disclosure instead of treating the page as a black box.",
    ],
    points: [
      {
        title: "Loans, tax, and household budgets",
        body: "Mortgage, refinance, credit-card payoff, sales tax, and budget tools are for planning. Confirm anything you will sign or file with the lender, payroll, or a tax professional.",
      },
      {
        title: "School and shop math",
        body: "GPA, weighted grades, percentages, fractions, tip, discount, and unit conversion sit next to the finance tools when the job is ordinary arithmetic with the work shown.",
      },
      {
        title: "Area, volume, and bases",
        body: "Circle, rectangle, and solid-volume calculators, plus binary and hex converters, cover the geometry and base conversions that show up in class and in code.",
      },
    ],
  },
  health: {
    summary:
      "TDEE, BMR, macro, height, and due-date calculators that run in your browser. Measurements are not stored on a server.",
    lead:
      "FastFreeTools health calculators estimate daily calories, basal metabolic rate, macro grams, height differences, and a pregnancy due date. You enter the numbers in the browser and read the result on the same page.",
    supporting:
      "Weight, age, and cycle dates are not written to an account. These pages are educational estimates based on published formulas such as Mifflin–St Jeor. They are not a diagnosis, a diet plan, or medical advice.",
    whyHeading: "Why calculate health numbers in the browser",
    why: [
      "Calorie and due-date sites often ask you to create a profile so they can email a plan. That profile is a copy of measurements you may not want stored. A local calculator answers the same arithmetic and then forgets the inputs when you leave.",
      "The formulas are on the page, so you can see the activity multiplier or the date math instead of trusting a single unlabeled number. Use the result to frame a conversation with a clinician or a coach, not to replace one.",
    ],
    points: [
      {
        title: "Calories and macros",
        body: "BMR is the rest estimate. TDEE applies an activity factor. The macro calculator splits a calorie target into protein, carbs, and fat grams from the percentages you choose.",
      },
      {
        title: "Dates and height",
        body: "The due-date tool estimates from a last period or a conception date. Height comparison puts two statures side by side in feet or centimeters.",
      },
      {
        title: "What these tools are not",
        body: "They do not store a health record, and they do not adjust for conditions a formula cannot see. Bring clinical questions to a qualified professional.",
      },
    ],
  },
  "home-diy": {
    summary:
      "Concrete, paint, tile, deck, fence, and roof estimators for planning materials. Measurements stay in this browser.",
    lead:
      "FastFreeTools home and DIY calculators ballpark concrete, square footage, roof pitch, deck boards, mulch, paint, tile, and fence posts from the dimensions you measure. Use them before you order, then confirm structural work with a pro.",
    supporting:
      "Room sizes and material counts stay in the tab. Nothing is saved to a project account. The figures are planning estimates — coverage, waste, and site conditions still change how much you should buy.",
    whyHeading: "Why estimate materials locally",
    why: [
      "Big-box calculators often sit behind a store account and nudge a specific product. A plain estimator lets you check yards of concrete or gallons of paint from your own measurements, then shop wherever you want.",
      "Keeping the worksheet in the browser also means a floor plan or a half-finished quote is not uploaded with your name on it. Change a length, add a waste allowance, and read the new count immediately.",
    ],
    points: [
      {
        title: "Volume and area",
        body: "Concrete uses length, width, and depth for cubic yards. Square footage and mulch use the same habit: measure the bed or the room, then read the volume or area.",
      },
      {
        title: "Surfaces and structure",
        body: "Paint coverage, tile count with waste, deck boards, fence posts, and roof pitch turn a tape-measure reading into a materials list you can take to the store.",
      },
      {
        title: "Check before you build",
        body: "Pitch, spans, and footings have code and safety limits these pages do not evaluate. Treat the number as a quantity check, not a building permit.",
      },
    ],
  },
  randomizers: {
    summary:
      "Name pickers, dice, wheels, and team splitters that run locally. The lists you paste are not uploaded.",
    lead:
      "FastFreeTools randomizers pick a name, roll dice, flip a coin, shuffle a list, split teams, or spin a wheel. Classrooms, giveaways, and game nights can get a result without making an account.",
    supporting:
      "Paste a roster and generate the draw in this tab. Names are not sent to a server. Games such as Sudoku and Wordle run the same way: the board stays in the browser.",
    whyHeading: "Why randomize lists in the browser",
    why: [
      "A wheel-of-names site that uploads the class list creates a copy of student or employee names you did not need to share. Drawing locally keeps the roster on the machine in the room. When you are done, clear the field.",
      "Fairness is the other half. A visible shuffle or a dice roll is easier to trust in front of a group than a number someone claims they generated elsewhere. You still get an unpredictable result; you just do not hand the list to a third party to get it.",
    ],
    points: [
      {
        title: "Draws and groups",
        body: "The name picker, list shuffler, team splitter, and spin wheel are built for a roster you already have. Use them for cold calls, brackets, and who brings snacks.",
      },
      {
        title: "Dice, coins, and numbers",
        body: "Dice, coin flips, yes-or-no, and the random number generator cover tabletop and quick decisions when you do not need a custom list.",
      },
      {
        title: "Short games",
        body: "Sudoku and Wordle are here when you want a puzzle in the same browser session, with no separate game account.",
      },
    ],
  },
  generators: {
    summary:
      "Invoices, signatures, memes, calendars, palettes, and name ideas built in your browser. Drafts stay on this device.",
    lead:
      "FastFreeTools generators build invoices, quotes, receipts, signatures, memes, calendars, color palettes, and name ideas in the browser. You download the file you need and leave the draft on this device.",
    supporting:
      "Line items, signature strokes, and uploaded meme images are handled in the page. They are not saved to a customer account. Name generators only need a click — there is no list of your favorite ideas stored on a server.",
    whyHeading: "Why generate files locally",
    why: [
      "Invoice and signature builders often want a login so they can keep your clients on file. For a one-off receipt or a PNG of a signature, that account is extra surface area. Building the PDF or the image locally means the names, amounts, and handwriting do not become a hosted document.",
      "The same pattern fits lighter jobs. A meme, a printable month, or a palette sampled from a photo can be exported and discarded. You are not waiting on a render queue or paying to remove a watermark from your own text.",
    ],
    points: [
      {
        title: "Paperwork",
        body: "Invoices, quotes, and receipts collect line items and export a PDF. Email signatures and drawn signatures cover the image you paste into a mail client or a form.",
      },
      {
        title: "Visuals and calendars",
        body: "Memes, palettes, contrast checks, CSS gradients, and printable calendars are for a file you can download or print. Sampling a palette reads the image in the browser.",
      },
      {
        title: "Names",
        body: "Band, podcast, character, business, baby, and pet name generators are starting points. Check trademarks and existing shows before you commit to one.",
      },
    ],
  },
};
