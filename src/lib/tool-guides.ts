import type { ToolGuide } from "./tool-guide-types";
import { priorityToolGuides } from "./priority-tool-guides";
import { toolExamples } from "./tool-examples";

const PRIVACY =
  "This tool runs entirely in your browser. Your data never leaves your device — nothing is uploaded to our servers.";
const PRIVACY_WASM =
  "This tool runs entirely in your browser. Processing uses local WebAssembly (WASM) where needed — your files and data never leave your device.";

export const toolGuides: Record<string, ToolGuide> = {
  "spin-the-wheel": {
    whatItDoes:
      "Spin the Wheel is a random choice picker: add names, tasks, or prizes as wheel segments, then spin once for a fair visual result. Built for classrooms, meetings, and giveaways where everyone should see the same unbiased pick.",
    whyUse:
      "Drawing from a hat feels opaque; a wheel makes random selection obvious and fun. You can rebalance segment sizes, remove winners, and spin again without spreadsheets or paid apps.",
    howToUse: [
      "Enter each option on its own line or use the add-field controls.",
      "Adjust colors or segment weights if the tool supports weighted slices.",
      "Click Spin and wait for the animation to stop on one segment.",
      "Optional: remove the winner and spin again for the next pick.",
    ],
    useCases: [
      "Pick a student to answer a question fairly.",
      "Choose a restaurant or movie night option among friends.",
      "Run a small raffle at an event with named entries.",
      "Assign random chores or teams with equal slice sizes.",
    ],
    supportedFormats: ["Plain-text labels per wheel segment", "Multiple entries in one session"],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is each spin truly random?",
        answer:
          "The tool uses your browser’s random number generator to select a winning segment. It is fair for games and demos, not certified for regulated lotteries.",
      },
      {
        question: "Can I save my wheel list?",
        answer:
          "Lists typically persist only for the current session in the browser unless the tool offers export or local save — check the on-page controls.",
      },
      {
        question: "How is this different from a name picker?",
        answer:
          "Both pick randomly; the wheel adds a visual spin animation. Use whichever fits your audience — wheel for show, list picker for speed.",
      },
    ],
  },

  "days-from-today": {
    whatItDoes:
      "Days From Today adds or subtracts a number of calendar days from the current date and shows the resulting weekday and date. Use it when someone says “90 days from now” or “what was the date 14 days ago?”",
    whyUse:
      "Mental date math crosses month lengths and leap years. A dedicated calculator avoids off-by-one errors for return windows, billing cycles, and travel planning.",
    howToUse: [
      "Choose whether to add days forward or subtract backward from today.",
      "Enter the number of days (whole numbers; partial days are not used).",
      "Read the computed calendar date and day of the week.",
      "Compare with a fixed start date using the days-between tool if needed.",
    ],
    useCases: [
      "Find a product return or trial expiration date.",
      "Set a follow-up reminder N business or calendar days out.",
      "Backtrack from today to see when a project milestone was due.",
      "Plan pregnancy or medical timelines counted in days from now.",
    ],
    supportedFormats: ["Whole-day offsets from the device’s current local date", "Add or subtract direction"],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Does this use my local timezone?",
        answer:
          "Yes. “Today” is based on your browser’s local calendar date, not UTC, so the result matches what you see on your clock.",
      },
      {
        question: "Are business days supported?",
        answer:
          "This tool counts all calendar days unless a separate business-day mode is shown on the page. For weekdays-only math, use a business-day calculator if available.",
      },
      {
        question: "How is this related to days between two dates?",
        answer:
          "Days from today is anchored to now; days-between finds the span between any two dates you choose.",
      },
    ],
  },

  "profit-margin-calculator": {
    whatItDoes:
      "This profit margin calculator links revenue, cost, profit dollars, margin percentage, and markup. Enter any two known figures to solve for the rest — built for pricing products and reading financial statements.",
    whyUse:
      "Margin and markup are easy to confuse; mixing them leads to underpricing. A single calculator keeps formulas consistent when you negotiate costs or set retail prices.",
    howToUse: [
      "Identify what you know: for example revenue and cost, or price and target margin.",
      "Enter values in the matching fields and select margin vs markup if prompted.",
      "Read profit in dollars and margin or markup as a percentage.",
      "Adjust inputs to model a price change or supplier cost increase.",
    ],
    useCases: [
      "Check whether a sale price still meets a 30% margin target.",
      "Convert a vendor quote plus desired markup into a shelf price.",
      "Explain margin on an invoice to a non-finance teammate.",
      "Compare two SKUs with different costs on equal revenue.",
    ],
    supportedFormats: ["Currency amounts for revenue, cost, and profit", "Percent for margin or markup"],
    privacy: PRIVACY,
    formula:
      "Profit = Revenue − Cost\nMargin (%) = (Profit ÷ Revenue) × 100\nMarkup (%) = (Profit ÷ Cost) × 100",
    howItWorks:
      "Margin divides profit by selling price; markup divides profit by cost. The calculator solves the system from whichever pair you provide, so you never hand-transpose the wrong denominator.",
    faqs: [
      {
        question: "What is the difference between margin and markup?",
        answer:
          "Margin is profit as a percent of revenue; markup is profit as a percent of cost. A 25% markup is not the same as a 25% margin.",
      },
      {
        question: "Does this include tax or shipping?",
        answer:
          "Only if you include those amounts in the revenue or cost fields you enter.",
      },
      {
        question: "Can margin be over 100%?",
        answer:
          "Gross margin as defined here stays below 100% when revenue is positive. Markup can exceed 100% when profit is larger than cost.",
      },
    ],
  },

  "ratio-proportion-calculator": {
    whatItDoes:
      "Solve ratio and proportion problems: scale a recipe, map distance, or find an unknown fourth term when three values of a proportion are known (a/b = c/x).",
    whyUse:
      "Cross-multiplication is simple but error-prone with unit mismatches. The calculator keeps ratios consistent and flags zero denominators.",
    howToUse: [
      "Enter the known ratio or three terms of a proportion.",
      "Specify which value is unknown if the layout asks.",
      "Submit and read the missing term and simplified ratio.",
      "Verify units match on both sides before trusting the result.",
    ],
    useCases: [
      "Scale a recipe from 4 servings to 7.",
      "Convert map scale to real-world distance.",
      "Mix paint or chemical ratios for a larger batch.",
      "Check similar triangles in geometry homework.",
    ],
    supportedFormats: ["Decimal or fractional terms", "Two-term ratios and four-term proportions"],
    privacy: PRIVACY,
    formula: "If a/b = c/d then ad = bc (cross products). Unknown x from a/b = c/x → x = (b × c) ÷ a",
    howItWorks:
      "The tool cross-multiplies valid proportions or divides corresponding terms to preserve equality. It may reduce ratios to lowest terms by dividing out common factors.",
    faqs: [
      {
        question: "What if a denominator is zero?",
        answer:
          "A ratio with zero on the bottom is undefined. The calculator should reject or warn rather than divide by zero.",
      },
      {
        question: "Can I enter fractions?",
        answer:
          "Many proportion tools accept decimals; enter fractions as decimals or use a fraction form if the page provides it.",
      },
      {
        question: "Do units need to match?",
        answer:
          "Corresponding terms should use the same units (miles with miles, cups with cups) or the proportion will not represent a real scale.",
      },
    ],
  },

  "lcm-calculator": {
    whatItDoes:
      "Find the least common multiple (LCM) of two or more integers — the smallest positive number divisible by all inputs. Shows useful steps for adding fractions with unlike denominators.",
    whyUse:
      "Listing multiples by hand is slow for large numbers. LCM also feeds GCF relationships: LCM(a,b) × GCF(a,b) = |a×b| for two integers.",
    howToUse: [
      "Enter two or more whole numbers separated or in separate fields.",
      "Run the calculation.",
      "Review the LCM result and any prime-factor or multiple listing shown.",
      "Use the GCF tool if you also need the greatest common factor.",
    ],
    useCases: [
      "Find a common denominator for 1/6 + 1/8.",
      "Schedule repeating events that happen every 4 and 6 days.",
      "Solve textbook LCM word problems with verification.",
    ],
    supportedFormats: ["Positive integers (negative inputs may use absolute value)", "Two or more numbers at once"],
    privacy: PRIVACY,
    formula: "LCM(a,b) = |a × b| ÷ GCF(a,b); for lists, LCM is associative",
    howItWorks:
      "Common methods include prime factorization (take each prime at its highest power) or the Euclidean algorithm link through GCF. The calculator automates that for your inputs.",
    faqs: [
      {
        question: "What is LCM vs GCF?",
        answer:
          "LCM is the smallest shared multiple; GCF is the largest shared factor. They solve different problems but share the same prime building blocks.",
      },
      {
        question: "Can LCM be smaller than the largest input?",
        answer:
          "No. The LCM is always at least as large as the greatest input number (for positive integers).",
      },
      {
        question: "What about zero?",
        answer:
          "LCM with zero is not meaningful in standard grade-school definitions; valid tools require positive integers.",
      },
    ],
  },

  "gcf-calculator": {
    whatItDoes:
      "Compute the greatest common factor (GCF), also called greatest common divisor (GCD), of two or more integers — the largest number that divides all inputs evenly.",
    whyUse:
      "Factoring by trial division wastes time on homework and when simplifying fractions. Pair this with the LCM calculator when both concepts appear in the same problem set.",
    howToUse: [
      "Enter the integers you want to factor together.",
      "Calculate to get the GCF.",
      "Use the result to reduce fractions (divide numerator and denominator by GCF).",
      "Open the LCM tool if you need a common multiple next.",
    ],
    useCases: [
      "Reduce 48/64 to lowest terms.",
      "Find shared tile size for a rectangular floor layout.",
      "Complete Euclidean algorithm exercises with a check.",
    ],
    supportedFormats: ["Positive and negative integers (GCF uses absolute values)", "Multiple numbers"],
    privacy: PRIVACY,
    formula: "GCF(a,b) via Euclidean algorithm: repeat GCF(b, a mod b) until b = 0",
    howItWorks:
      "The Euclidean algorithm iteratively replaces the larger number with the remainder of division, which is fast even for big values. Prime factorization is an alternative when exponents are shown for teaching.",
    faqs: [
      {
        question: "Is GCF the same as GCD?",
        answer:
          "Yes — greatest common factor and greatest common divisor name the same quantity for integers.",
      },
      {
        question: "What if the GCF is 1?",
        answer:
          "The numbers are coprime (relatively prime): no common factor besides 1.",
      },
      {
        question: "How does GCF relate to LCM?",
        answer:
          "For two nonzero integers, GCF × LCM = |a × b|. Use that to cross-check results.",
      },
    ],
  },

  "final-grade-calculator": {
    whatItDoes:
      "Estimate the score you need on a final exam to reach a target course grade. Enter your current weighted average, the final’s weight, and your goal letter or percentage.",
    whyUse:
      "Students often guess required finals incorrectly by ignoring weight. This calculator applies the standard weighted-average formula so you know if a target is still reachable.",
    howToUse: [
      "Enter your current course grade as a percentage (or components if the tool splits them).",
      "Enter the final exam weight as a percent of the total grade.",
      "Set your desired overall grade.",
      "Read the required final exam score; impossible targets may show above 100%.",
    ],
    useCases: [
      "Decide whether an A is still realistic before study week.",
      "Set a minimum final score to pass with a C.",
      "Compare scenarios if the final weight changes on the syllabus.",
    ],
    supportedFormats: ["Percent grades", "Final weight as percent of course total"],
    privacy: PRIVACY,
    formula:
      "Required final ≈ (Target − Current × (1 − w)) ÷ w, where w is final weight as a decimal",
    howItWorks:
      "Your current grade contributes (1−w) of the course; the final contributes w. The tool solves for the final percentage that makes the weighted sum equal your target.",
    faqs: [
      {
        question: "What if I need more than 100% on the final?",
        answer:
          "That means the target overall grade is not achievable with the given current grade and weights.",
      },
      {
        question: "Does extra credit count?",
        answer:
          "Only if you include it in the current grade you enter.",
      },
      {
        question: "Which other grade tools should I use?",
        answer:
          "Use the weighted grade calculator to build your current average from assignments, and GPA calculator for term-wide credit hours.",
      },
    ],
  },

  "weighted-grade-calculator": {
    whatItDoes:
      "Combine multiple assignment categories — each with its own weight and average — into one overall course percentage. Add rows for exams, homework, labs, and participation.",
    whyUse:
      "Syllabi rarely give equal weight to every score. This calculator mirrors how LMS systems compute totals so you can track your standing before grades post.",
    howToUse: [
      "Add a category name, its average score, and weight percent.",
      "Ensure category weights sum to 100% (or let the tool normalize).",
      "Review the weighted total and adjust what-if scores.",
      "Pair with the final grade calculator for end-of-term planning.",
    ],
    useCases: [
      "Track a semester where exams are 60% and homework 40%.",
      "See how one bad quiz affects the total when quizzes are 10%.",
      "Rebuild your average after a dropped lowest score manually.",
    ],
    supportedFormats: ["Category weights in percent", "Scores as percentages or points converted to percent"],
    privacy: PRIVACY,
    formula: "Overall = Σ (category average × category weight) with weights summing to 1",
    howItWorks:
      "Each category contributes its average times its fraction of the course. Missing categories should be omitted or weighted zero explicitly.",
    faqs: [
      {
        question: "What if weights do not add to 100%?",
        answer:
          "Some tools warn you; others normalize. Fix weights to match your syllabus for accuracy.",
      },
      {
        question: "Can I enter letter grades?",
        answer:
          "Convert letters to midpoints (e.g. B = 85%) unless the tool maps letters for you.",
      },
      {
        question: "How is this different from GPA?",
        answer:
          "This page is one course’s percentage. GPA blends multiple courses with credit hours.",
      },
    ],
  },

  "test-grade-calculator": {
    whatItDoes:
      "Turn raw test points into a percentage grade: questions correct out of total, or points earned out of points possible.",
    whyUse:
      "Quick mental division fails on odd totals like 37/45. Teachers and students use the same math to align rubrics with letter-grade cutoffs.",
    howToUse: [
      "Enter the number correct (or points earned).",
      "Enter the total questions (or max points).",
      "Read the percentage and any letter mapping if shown.",
      "Use weighted or final grade tools for course-wide impact.",
    ],
    useCases: [
      "Score a multiple-choice practice test.",
      "Convert a rubric score out of 50 to a percent for the gradebook.",
      "Check whether you hit a 90% threshold for an A.",
    ],
    supportedFormats: ["Correct/total counts", "Earned/max points"],
    privacy: PRIVACY,
    formula: "Grade (%) = (Correct ÷ Total) × 100",
    howItWorks:
      "The calculator divides earned by possible and scales to 100. Partial credit is handled by using point totals rather than whole questions when needed.",
    faqs: [
      {
        question: "Does it round?",
        answer:
          "Display rounding depends on the tool settings; gradebook policies may round differently.",
      },
      {
        question: "Can total be zero?",
        answer:
          "No — division by zero is invalid. Enter a positive total.",
      },
      {
        question: "What about curved scores?",
        answer:
          "This tool does not apply curves; enter adjusted points after your instructor’s curve.",
      },
    ],
  },

  "gpa-calculator": {
    whatItDoes:
      "Calculate grade point average on a typical 4.0 scale from course letter grades and credit hours. Supports semester GPA and cumulative totals when you add multiple terms.",
    whyUse:
      "Scholarships and probation rules hinge on GPA; hand spreadsheets mis-weight labs vs seminars. Enter credits once per course for an accurate weighted mean.",
    howToUse: [
      "Add each course with letter grade and credit hours.",
      "Include labs and seminars with their actual credit values.",
      "Read semester GPA and total quality points if displayed.",
      "Use test or weighted grade tools for in-progress course estimates.",
    ],
    useCases: [
      "Project GPA after hypothetical grade changes.",
      "Combine transfer credits with local courses for cumulative GPA.",
      "Check eligibility for honors or athletic requirements.",
    ],
    supportedFormats: ["Letter grades mapped to 4.0 scale points", "Credit hours per course"],
    privacy: PRIVACY,
    formula: "GPA = Σ (grade points × credits) ÷ Σ credits",
    howItWorks:
      "Each letter maps to a point value (often A=4, B=3, etc.). The calculator sums quality points and divides by total attempted credits per your inputs.",
    faqs: [
      {
        question: "Do plus/minus grades count?",
        answer:
          "Only if the tool’s scale includes them (e.g. B+ = 3.3). Match your school’s registrar table.",
      },
      {
        question: "Are pass/fail courses included?",
        answer:
          "Pass/fail usually does not affect GPA; omit them unless your policy says otherwise.",
      },
      {
        question: "Weighted vs unweighted GPA?",
        answer:
          "This tool typically uses standard 4.0 unweighted points unless a weighted AP/honors mode is offered on the page.",
      },
    ],
  },

  "prime-factor-calculator": {
    whatItDoes:
      "Express a positive integer as a product of prime numbers — prime factorization — often with a factor tree or exponent list for teaching.",
    whyUse:
      "Factor trees by hand slip on large composites. Factoring primes unlocks LCM, GCF, and divisibility rules in one consistent breakdown.",
    howToUse: [
      "Enter a whole number greater than 1.",
      "Run factorization to see prime factors and powers.",
      "Use the output in LCM/GCF tools or fraction simplification.",
      "Try composite vs prime inputs to verify edge cases.",
    ],
    useCases: [
      "Complete homework on prime decomposition.",
      "Find LCM via highest prime powers across numbers.",
      "Check whether a number is prime (only one factor equal to itself).",
    ],
    supportedFormats: ["Positive integers within the tool’s digit limit"],
    privacy: PRIVACY,
    howItWorks:
      "Trial division or optimized sieves test small primes, then continue with larger factors until the quotient is 1. Each step divides by the smallest prime that fits.",
    faqs: [
      {
        question: "Is 1 prime?",
        answer:
          "No — 1 is neither prime nor composite; factorization usually starts at 2 for composites.",
      },
      {
        question: "What about very large numbers?",
        answer:
          "Browser tools may cap input size for performance; huge integers need specialized software.",
      },
      {
        question: "How does this help LCM?",
        answer:
          "LCM takes each prime at the maximum exponent seen across inputs; prime lists make that visible.",
      },
    ],
  },

  "slope-calculator": {
    whatItDoes:
      "Find the slope of a line through two points (x₁,y₁) and (x₂,y₂), plus rise, run, and often slope-intercept form y = mx + b.",
    whyUse:
      "Slope drives rate-of-change problems in algebra and physics. Getting m wrong flips line direction or breaks parallel/perpendicular checks.",
    howToUse: [
      "Enter coordinates for two distinct points.",
      "Calculate slope m = rise over run.",
      "Read the line equation if the tool provides it.",
      "Note undefined slope when the line is vertical (x₁ = x₂).",
    ],
    useCases: [
      "Find pitch of a roof line from two plan coordinates.",
      "Check if two lines are parallel (equal slopes).",
      "Convert a graphed segment to an equation for homework.",
    ],
    supportedFormats: ["Decimal or fractional coordinates", "Two-dimensional Cartesian points"],
    privacy: PRIVACY,
    formula: "m = (y₂ − y₁) ÷ (x₂ − x₁); vertical line: undefined slope",
    howItWorks:
      "The calculator subtracts coordinates in consistent order so rise and run match the direction from point 1 to point 2. It may also compute b from one point and m.",
    faqs: [
      {
        question: "What is slope of a horizontal line?",
        answer:
          "Zero — y does not change as x increases.",
      },
      {
        question: "Can I enter the same point twice?",
        answer:
          "Two identical points do not define a unique line; the tool should reject or warn.",
      },
      {
        question: "Does order of points matter for slope sign?",
        answer:
          "Swapping points negates rise and run together, so m stays the same.",
      },
    ],
  },

  "area-of-circle": {
    whatItDoes:
      "Calculate the area inside a circle from its radius or diameter using πr². Reports area in square units matching your length input.",
    whyUse:
      "Circle area appears in landscaping, pizza sizing, and pipe cross-sections. Diameter-to-radius mistakes are common without a dedicated step.",
    howToUse: [
      "Enter radius, or diameter if the tool accepts either.",
      "If using diameter, the tool halves it before applying πr².",
      "Read area in square units (e.g. ft², m²).",
      "Compare with other shape area tools for composite figures.",
    ],
    useCases: [
      "Estimate sod or mulch for a circular garden bed.",
      "Find cross-sectional area of a round duct or pipe.",
      "Solve geometry problems involving semicircles (use half the result).",
    ],
    supportedFormats: ["Radius or diameter in any consistent length unit"],
    privacy: PRIVACY,
    formula: "A = πr² = π(d/2)²",
    howItWorks:
      "Square the radius and multiply by π. The calculator uses a high-precision π constant and passes units through as squares.",
    faqs: [
      {
        question: "Which value should I enter — radius or diameter?",
        answer:
          "Use whichever you measured; pick the matching input mode so you do not double or halve twice.",
      },
      {
        question: "Does π use 3.14?",
        answer:
          "Calculators use many decimal places of π for accuracy; homework may ask you to round the final area.",
      },
      {
        question: "What about a semicircle?",
        answer:
          "Compute full circle area and divide by 2 (minus holes separately if any).",
      },
    ],
  },

  "area-of-rectangle": {
    whatItDoes:
      "Multiply length and width to find the area of a rectangle or square. Works for any consistent units on both sides.",
    whyUse:
      "Rectangles are the building block for rooms, screens, and fields. Area feeds into paint, flooring, and tile quantity estimates.",
    howToUse: [
      "Measure or enter the longer side (length) and shorter side (width).",
      "For a square, enter the same value twice or use side-only mode if available.",
      "Read area in square units.",
      "Combine with trapezoid or triangle tools for L-shaped lots by splitting shapes.",
    ],
    useCases: [
      "Floor area for carpet or laminate ordering.",
      "Pixel area of a rectangular UI element.",
      "Basic land parcel math before surveying detail.",
    ],
    supportedFormats: ["Length and width in matching units"],
    privacy: PRIVACY,
    formula: "A = length × width",
    howItWorks:
      "Area counts unit squares that fit inside the rectangle; multiplication gives that count when sides are perpendicular.",
    faqs: [
      {
        question: "Are length and width interchangeable?",
        answer:
          "Yes for area — order does not change the product.",
      },
      {
        question: "What if sides are not perpendicular?",
        answer:
          "That shape is a parallelogram, not a rectangle; this formula does not apply without height.",
      },
      {
        question: "How do I convert units?",
        answer:
          "Convert both sides to the same unit before multiplying; area units square the length unit.",
      },
    ],
  },

  "area-of-triangle": {
    whatItDoes:
      "Compute triangle area from base and height (½bh) or from three side lengths using Heron’s formula when height is unknown.",
    whyUse:
      "Roof gables, sail plots, and survey triangles often lack a drawn height. Heron’s formula saves an extra construction step.",
    howToUse: [
      "Choose base/height mode or three-side mode.",
      "Enter measurements in consistent units.",
      "Calculate and read square-unit area.",
      "For right triangles, either leg can be base with the other as height.",
    ],
    useCases: [
      "Area of a triangular garden plot.",
      "Geometry proofs checking Heron’s formula results.",
      "Graphics: UV triangle coverage in texture space.",
    ],
    supportedFormats: ["Base and height", "Three side lengths (SSS)"],
    privacy: PRIVACY,
    formula: "A = ½ × base × height; Heron: A = √(s(s−a)(s−b)(s−c)), s = semiperimeter",
    howItWorks:
      "Half base times height counts unit squares in the triangle. Heron computes from sides only when height is not given, using semiperimeter s.",
    faqs: [
      {
        question: "Which side is the base?",
        answer:
          "Any side — height must be perpendicular to that base, not necessarily another side length.",
      },
      {
        question: "Do three sides always form a triangle?",
        answer:
          "They must satisfy triangle inequality; invalid triples should error.",
      },
      {
        question: "Right triangle shortcut?",
        answer:
          "Area is ½ × leg₁ × leg₂ when legs are perpendicular.",
      },
    ],
  },

  "area-of-trapezoid": {
    whatItDoes:
      "Find the area of a trapezoid from the lengths of the two parallel bases and the perpendicular height between them.",
    whyUse:
      "Trapezoids model roof ends, tabletops with tapered edges, and composite shapes split from irregular plots.",
    howToUse: [
      "Enter parallel base lengths b₁ and b₂.",
      "Enter the height (altitude), not the slant leg.",
      "Calculate area in square units.",
      "Pair with rectangle area for floor plans mixing shapes.",
    ],
    useCases: [
      "Land area between parallel road and river edges approximated as trapezoid.",
      "Cross-section area in civil engineering sketches.",
      "Homework on quadrilateral area formulas.",
    ],
    supportedFormats: ["Two bases and height in consistent units"],
    privacy: PRIVACY,
    formula: "A = ½ × (b₁ + b₂) × h",
    howItWorks:
      "The formula averages the parallel sides and multiplies by height — equivalent to splitting into a rectangle and two triangles.",
    faqs: [
      {
        question: "Is height the same as a side length?",
        answer:
          "No — height is perpendicular distance between the parallel bases unless the trapezoid is right.",
      },
      {
        question: "What if bases are equal?",
        answer:
          "You get a parallelogram; area reduces to base × height.",
      },
      {
        question: "Can bases be in different units?",
        answer:
          "Convert to one unit first or the area will be wrong.",
      },
    ],
  },

  "volume-of-sphere": {
    whatItDoes:
      "Calculate the volume enclosed by a sphere from radius or diameter using V = (4/3)πr³.",
    whyUse:
      "Spherical tanks, balls, and bubbles use a non-intuitive cubic formula. Small radius errors cube into large volume mistakes.",
    howToUse: [
      "Enter radius or diameter.",
      "Calculate volume in cubic units.",
      "Compare with cylinder volume for similar dimensions.",
      "Halve or scale results for hemispheres manually if needed.",
    ],
    useCases: [
      "Capacity of a spherical storage tank.",
      "Estimate material in a ball bearing or marble.",
      "Physics problems on displaced volume.",
    ],
    supportedFormats: ["Radius or diameter length units → cubic units"],
    privacy: PRIVACY,
    formula: "V = (4/3)πr³",
    howItWorks:
      "The formula integrates circular cross-sections or derives from calculus; the calculator applies r³ then scales by 4π/3.",
    faqs: [
      {
        question: "Sphere vs circle?",
        answer:
          "Circle is 2D area πr²; sphere is 3D volume with an extra r and a 4/3 factor.",
      },
      {
        question: "Hemisphere volume?",
        answer:
          "Use half the sphere volume for a solid hemisphere.",
      },
      {
        question: "Does wall thickness matter?",
        answer:
          "Subtract inner sphere volume from outer for a hollow shell.",
      },
    ],
  },

  "volume-of-cylinder": {
    whatItDoes:
      "Find the volume of a right circular cylinder from radius and height: base area πr² times height.",
    whyUse:
      "Cans, silos, and pipes are cylinders. Volume drives fill levels and shipping fluid weights.",
    howToUse: [
      "Enter circular base radius and cylinder height.",
      "Use diameter mode if offered, converting to radius internally.",
      "Read cubic volume.",
      "Link to cone volume (one-third of same base and height) for comparisons.",
    ],
    useCases: [
      "How much water fits in a rain barrel.",
      "Concrete for a round column form.",
      "Engine displacement intuition (related geometry).",
    ],
    supportedFormats: ["Radius (or diameter) and height"],
    privacy: PRIVACY,
    formula: "V = πr²h",
    howItWorks:
      "Multiply the circular base area by the vertical height for a right cylinder; slanted oblique cylinders need a different model.",
    faqs: [
      {
        question: "Horizontal cylinder partial fill?",
        answer:
          "Full-volume formula assumes filled to the top; partial fill needs segment formulas not covered here.",
      },
      {
        question: "Units?",
        answer:
          "If radius and height are in meters, volume is cubic meters.",
      },
      {
        question: "Relation to cone?",
        answer:
          "A cone with same base and height has exactly one-third this volume.",
      },
    ],
  },

  "volume-of-cone": {
    whatItDoes:
      "Compute the volume of a right circular cone from base radius and height: one-third of the matching cylinder.",
    whyUse:
      "Funnels, piles of sand, and ice cream cones share this shape. The ⅓ factor is easy to forget without a calculator.",
    howToUse: [
      "Enter base radius and perpendicular height (apex to base plane).",
      "Calculate cubic volume.",
      "Contrast with cylinder tool using identical r and h.",
    ],
    useCases: [
      "Estimate gravel in a conical stockpile.",
      "Calculus labs verifying V = ⅓πr²h.",
      "Packaging for tapered containers approximated as cones.",
    ],
    supportedFormats: ["Radius and height of a right cone"],
    privacy: PRIVACY,
    formula: "V = (1/3)πr²h",
    howItWorks:
      "Integration or Cavalieri’s principle shows cone volume is one-third of a cylinder with the same base and height.",
    faqs: [
      {
        question: "Does slant height work as h?",
        answer:
          "No — h must be perpendicular to the base; slant height is the side edge.",
      },
      {
        question: "Truncated cone (frustum)?",
        answer:
          "This tool is for full cones; frustums need radii of both ends.",
      },
      {
        question: "Same units for r and h?",
        answer:
          "Yes — mixing cm radius with m height breaks cubic unit consistency.",
      },
    ],
  },

  "volume-of-cube": {
    whatItDoes:
      "Calculate the volume of a cube from side length s with V = s³ — all edges equal.",
    whyUse:
      "Cubes simplify storage math: one dimension fixes all three. Useful for dice, boxes, and unit-cell geometry.",
    howToUse: [
      "Enter the edge length.",
      "Read volume in cubic units.",
      "Compare with rectangular prism when only one dimension differs.",
    ],
    useCases: [
      "Volume of a cubic freezer compartment.",
      "Material in a cubic block given edge measure.",
      "Intro solid geometry drills.",
    ],
    supportedFormats: ["Single edge length"],
    privacy: PRIVACY,
    formula: "V = s³",
    howItWorks:
      "A cube packs s layers of s×s unit cubes, hence s cubed total unit cubes.",
    faqs: [
      {
        question: "Cube vs square?",
        answer:
          "Square is area s²; cube is volume s³.",
      },
      {
        question: "Surface area included?",
        answer:
          "This tool gives volume only; surface area is 6s² separately.",
      },
      {
        question: "Rectangular box?",
        answer:
          "Use the rectangular prism volume tool when three edges differ.",
      },
    ],
  },

  "volume-of-rectangular-prism": {
    whatItDoes:
      "Multiply length × width × height to get the volume of a rectangular prism (box shape).",
    whyUse:
      "Shipping, aquariums, and room air volume are box math. It generalizes the cube when edges differ.",
    howToUse: [
      "Enter three mutually perpendicular edge lengths.",
      "Calculate cubic volume.",
      "Use with cube tool when all three edges match.",
    ],
    useCases: [
      "Cargo volume in a shipping container.",
      "Soil for a raised bed box.",
      "GPU voxel grid cell counts in 3D grids.",
    ],
    supportedFormats: ["Length, width, height in one unit system"],
    privacy: PRIVACY,
    formula: "V = length × width × height",
    howItWorks:
      "Volume counts unit cubes filling the box; multiplication gives that count for orthogonal edges.",
    faqs: [
      {
        question: "Is order of dimensions important?",
        answer:
          "No — the product is commutative.",
      },
      {
        question: "Internal vs external dimensions?",
        answer:
          "Use interior dimensions for capacity; subtract wall thickness if measuring outside.",
      },
      {
        question: "L-shaped rooms?",
        answer:
          "Split into multiple boxes and add volumes.",
      },
    ],
  },

  "volume-of-pyramid": {
    whatItDoes:
      "Find the volume of a pyramid with a square base using base side length and height from base to apex.",
    whyUse:
      "Pyramids appear in architecture models and volume-of-composite problems. Like cones, they are one-third of a prism with the same base and height.",
    howToUse: [
      "Enter square base side s and vertical height.",
      "Calculate volume.",
      "Compare to rectangular prism with same base footprint and height (pyramid is ⅓ of that).",
    ],
    useCases: [
      "Sand or gravel in a square-base pile approximated as pyramid.",
      "Geometry worksheets on Egyptian pyramid models.",
      "3D mesh sanity checks for low-poly pyramids.",
    ],
    supportedFormats: ["Square base edge and perpendicular height"],
    privacy: PRIVACY,
    formula: "V = (1/3) × base area × h = (1/3)s²h for square base",
    howItWorks:
      "Cross-sections scale linearly from base to apex, integrating to one-third the prism volume.",
    faqs: [
      {
        question: "Triangular base pyramid?",
        answer:
          "This page assumes square base; triangular-base pyramids need base area = ½bh.",
      },
      {
        question: "Height vs slant height?",
        answer:
          "Use perpendicular height to the base plane, not edge length along a face.",
      },
      {
        question: "Relation to cone?",
        answer:
          "Both use ⅓ × base area × height; base shape differs.",
      },
    ],
  },

  "number-base-converter": {
    whatItDoes:
      "Convert integers between binary, decimal, octal, and hexadecimal in one place. Enter a value in any supported base and see all representations.",
    whyUse:
      "Jumping between bases by hand is slow in labs and interviews. One converter keeps bit patterns aligned when you debug flags or colors.",
    howToUse: [
      "Select the input base and type the number.",
      "View outputs in other bases simultaneously.",
      "Use dedicated pair converters for quick copy-paste between two bases only.",
      "Validate invalid digits before converting.",
    ],
    useCases: [
      "Translate a hex color channel to decimal for CSS.",
      "Check Unix permission bits in octal and binary.",
      "CS homework verifying manual conversions.",
    ],
    supportedFormats: ["Binary, decimal, octal, hexadecimal integers", "Optional prefixes like 0x"],
    privacy: PRIVACY,
    howItWorks:
      "Parse digits in the source base to an integer, then repeatedly divide or mask to emit each target base representation.",
    faqs: [
      {
        question: "Fractions supported?",
        answer:
          "Most integer converters ignore fractional parts; use a floating converter if offered elsewhere.",
      },
      {
        question: "Negative numbers?",
        answer:
          "Behavior depends on two’s complement settings if signed mode exists; unsigned mode may reject minus signs.",
      },
      {
        question: "Which single-base tools pair with this?",
        answer:
          "Binary↔decimal, hex↔decimal, and octal↔decimal pages focus on one hop; this page shows all at once.",
      },
    ],
  },

  "binary-to-decimal": {
    whatItDoes:
      "Convert a binary number (base 2) to its decimal (base 10) integer equivalent, validating that only 0 and 1 appear.",
    whyUse:
      "Reading long bit strings mentally is tedious. This confirms homework and interprets hardware register dumps quickly.",
    howToUse: [
      "Enter a binary string, optionally with spaces between bytes.",
      "Run conversion to decimal.",
      "Use decimal-to-binary to reverse or check your work.",
    ],
    useCases: [
      "Decode an 8-bit ASCII code in decimal before looking up the character.",
      "Interpret a single flag bit field documented in binary.",
      "Verify place-value expansion exercises.",
    ],
    supportedFormats: ["Binary strings of 0 and 1", "Optional grouping spaces"],
    privacy: PRIVACY,
    howItWorks:
      "Each bit multiplies 2 raised to its position index (usually from right at 2⁰) and sums to the decimal value.",
    faqs: [
      {
        question: "MSB first or LSB first?",
        answer:
          "Standard notation is leftmost as highest bit; the tool should document its bit order if ambiguous.",
      },
      {
        question: "Leading zeros?",
        answer:
          "They do not change value but may matter for fixed bit width display.",
      },
      {
        question: "Invalid characters?",
        answer:
          "Digits 2–9 are rejected in strict binary mode.",
      },
    ],
  },

  "decimal-to-binary": {
    whatItDoes:
      "Convert a base-10 integer to binary, showing the bit pattern and sometimes minimum bit width.",
    whyUse:
      "Repeated division by 2 is error-prone on long exams. Programmers need binary for masks and low-level constants.",
    howToUse: [
      "Enter a non-negative decimal integer (signed mode if available).",
      "Read the binary output.",
      "Pad to 8/16/32 bits if the UI offers width options.",
    ],
    useCases: [
      "Express 255 as 11111111 for an byte mask.",
      "Prepare answers for digital logic worksheets.",
      "Cross-check the binary-to-decimal tool.",
    ],
    supportedFormats: ["Decimal integers", "Optional fixed bit width"],
    privacy: PRIVACY,
    howItWorks:
      "Divide the number by 2, record remainders from bottom to top, or subtract highest powers of two — both yield the same bit string.",
    faqs: [
      {
        question: "Negative decimals?",
        answer:
          "Unsigned mode may disallow them; signed two’s complement needs a dedicated mode.",
      },
      {
        question: "Very large numbers?",
        answer:
          "JavaScript safe integer limits may cap input; huge values need big-int tools.",
      },
      {
        question: "Fractional decimals?",
        answer:
          "Integer converter truncates or rejects fractions; fractional binary is a different algorithm.",
      },
    ],
  },

  "binary-to-hex": {
    whatItDoes:
      "Convert binary to hexadecimal by grouping bits into fours and mapping each nibble to 0–9 or A–F.",
    whyUse:
      "Hex compresses long binary strings for memory addresses and color codes. Nibble alignment prevents off-by-one hex digits.",
    howToUse: [
      "Paste a binary string; pad left with zeros to a multiple of 4 if prompted.",
      "Read hex output, often with 0x prefix option.",
      "Use hex-to-binary to reverse.",
    ],
    useCases: [
      "Turn a 32-bit binary mask into readable hex for a datasheet.",
      "Debug UART hex logs against binary frame diagrams.",
    ],
    supportedFormats: ["Binary strings", "Upper or lower hex output"],
    privacy: PRIVACY,
    howItWorks:
      "Each group of four bits maps to one hex digit (0000=0 through 1111=F).",
    faqs: [
      {
        question: "Why pad to 4 bits?",
        answer:
          "Incomplete final nibbles need leading zeros so each hex digit represents exactly four bits.",
      },
      {
        question: "0x prefix?",
        answer:
          "Cosmetic for display; parsing may strip it on input hex tools.",
      },
      {
        question: "Skip decimal?",
        answer:
          "You can go binary→hex directly without decimal intermediate.",
      },
    ],
  },

  "hex-to-binary": {
    whatItDoes:
      "Expand each hexadecimal digit into four binary bits, producing a full binary string.",
    whyUse:
      "Datasheets list registers in hex while bus analyzers show bits. Expansion makes bit positions explicit.",
    howToUse: [
      "Enter hex digits (optional 0x).",
      "Read zero-padded binary per nibble.",
      "Validate length against expected word size (8, 16, 32).",
    ],
    useCases: [
      "Map a hex opcode to individual control bits.",
      "Verify #FF0000 red channel is 11111111 in binary.",
    ],
    supportedFormats: ["Hexadecimal strings", "Optional 0x prefix"],
    privacy: PRIVACY,
    howItWorks:
      "Replace each hex digit with its fixed 4-bit pattern without going through decimal.",
    faqs: [
      {
        question: "Case sensitive?",
        answer:
          "A–F and a–f are equivalent.",
      },
      {
        question: "Odd-length hex?",
        answer:
          "Valid — leading zero nibble may be implied (e.g. F = 1111).",
      },
      {
        question: "Spaces in input?",
        answer:
          "Many tools strip spaces; byte pairs like FF AA are common.",
      },
    ],
  },

  "decimal-to-hex": {
    whatItDoes:
      "Convert a decimal integer to hexadecimal representation — common for memory addresses and RGB color components.",
    whyUse:
      "Hex is compact for large integers. Developers convert decimal constants to hex for assembly and CSS.",
    howToUse: [
      "Enter a decimal number.",
      "Copy hex output, noting uppercase vs lowercase.",
      "Use hex-to-decimal to verify round-trip.",
    ],
    useCases: [
      "Convert decimal 255 to FF for styling.",
      "Express a decimal error code in hex for logs.",
    ],
    supportedFormats: ["Base-10 integers"],
    privacy: PRIVACY,
    howItWorks:
      "Repeated division by 16 yields remainders 0–15 mapped to hex digits from least to most significant.",
    faqs: [
      {
        question: "Does it show 0x?",
        answer:
          "Display preference only; value is the same with or without prefix.",
      },
      {
        question: "Negative values?",
        answer:
          "Depends on signed representation; many tools accept non-negative only.",
      },
      {
        question: "Leading zeros?",
        answer:
          "Omitted in canonical form unless fixed width (e.g. 2-digit color bytes).",
      },
    ],
  },

  "hex-to-decimal": {
    whatItDoes:
      "Parse a hexadecimal string into its decimal integer value, accepting optional 0x prefix.",
    whyUse:
      "Log files and color pickers show hex; budgets and spreadsheets often need decimal. Quick conversion avoids manual 16^n arithmetic.",
    howToUse: [
      "Type hex digits; include 0x if you like.",
      "Read decimal result.",
      "Cross-check with decimal-to-hex.",
    ],
    useCases: [
      "Interpret 0x2A as decimal 42 in protocol docs.",
      "Sum color channel hex values for accessibility checks in decimal tools.",
    ],
    supportedFormats: ["Hex integers with digits 0–9 and A–F"],
    privacy: PRIVACY,
    howItWorks:
      "Multiply each digit by 16 raised to its position power and sum, starting from the right at 16⁰.",
    faqs: [
      {
        question: "Invalid letters?",
        answer:
          "G–Z are invalid in hex and should trigger an error.",
      },
      {
        question: "Fractional hex?",
        answer:
          "Standard integer parser stops at the radix point.",
      },
      {
        question: "Big addresses?",
        answer:
          "Very long hex may exceed safe integer range in the browser.",
      },
    ],
  },

  "decimal-to-octal": {
    whatItDoes:
      "Convert a decimal integer to base-8 octal, often shown with leading zeros for Unix permissions.",
    whyUse:
      "chmod still references octal triplets like 755. Converting decimal bit masks to octal clarifies permission tutorials.",
    howToUse: [
      "Enter a decimal integer.",
      "Read octal digits 0–7.",
      "Use octal-to-decimal for reverse verification.",
    ],
    useCases: [
      "Translate a decimal file mode to octal for chmod.",
      "Legacy systems homework on base 8.",
    ],
    supportedFormats: ["Decimal integers → octal strings"],
    privacy: PRIVACY,
    howItWorks:
      "Divide by 8 repeatedly and collect remainders as octal digits from least to most significant.",
    faqs: [
      {
        question: "Why octal for permissions?",
        answer:
          "Each digit encodes read/write/execute for owner, group, and others in three bits.",
      },
      {
        question: "Digits 8 or 9 in output?",
        answer:
          "Never — octal only uses 0–7.",
      },
      {
        question: "Leading zeros?",
        answer:
          "Often shown for 3-digit chmod style (e.g. 0755).",
      },
    ],
  },

  "octal-to-decimal": {
    whatItDoes:
      "Convert an octal (base 8) number to decimal by expanding powers of eight.",
    whyUse:
      "Misreading octal as decimal causes permission bugs. Validate chmod values before applying scripts.",
    howToUse: [
      "Enter octal digits only (0–7).",
      "Read decimal equivalent.",
      "Pair with decimal-to-octal and the full base converter.",
    ],
    useCases: [
      "Confirm 755 octal equals 493 decimal in some API fields.",
      "Grade school base-conversion practice.",
    ],
    supportedFormats: ["Octal strings without 8 or 9"],
    privacy: PRIVACY,
    howItWorks:
      "Each position multiplies the digit by 8^position and sums, analogous to decimal place value with base 8.",
    faqs: [
      {
        question: "Is 9 allowed?",
        answer:
          "No — invalid in strict octal.",
      },
      {
        question: "Leading zero?",
        answer:
          "In JavaScript-style literals, a leading 0 once meant octal; here you choose octal mode explicitly.",
      },
      {
        question: "Negative octal?",
        answer:
          "Rare; tool may treat minus as sign on the decimal parse path.",
      },
    ],
  },

  "text-to-binary": {
    whatItDoes:
      "Encode plain text into binary using ASCII or UTF-8 byte values, typically showing 8 bits per character with optional spaces.",
    whyUse:
      "Encoding lessons and steganography demos start with character-to-bits. Seeing bytes clarifies why multi-byte emoji differ from ASCII letters.",
    howToUse: [
      "Type or paste text.",
      "Choose encoding if prompted (ASCII vs UTF-8).",
      "Copy the binary output in grouped bytes.",
      "Decode with binary-to-text to verify lossless ASCII.",
    ],
    useCases: [
      "Homework on character encoding.",
      "Craft binary puzzles or escape-room clues.",
      "Inspect how non-English letters expand to multiple bytes in UTF-8.",
    ],
    supportedFormats: ["UTF-8 or ASCII text → binary bit strings"],
    privacy: PRIVACY,
    howItWorks:
      "Each character maps to one or more bytes per encoding; each byte becomes eight bits, often zero-padded on the left.",
    faqs: [
      {
        question: "Why is my emoji longer in binary?",
        answer:
          "UTF-8 uses multiple bytes for code points above ASCII.",
      },
      {
        question: "Spaces between bytes?",
        answer:
          "For readability only; remove them before decoding unless the tool expects groups.",
      },
      {
        question: "Is this encryption?",
        answer:
          "No — it is open encoding, not secrecy.",
      },
    ],
  },

  "binary-to-text": {
    whatItDoes:
      "Decode binary strings back into readable text by interpreting 8-bit chunks as ASCII or UTF-8 bytes.",
    whyUse:
      "Manual decoding of long bit messages is slow. Validates that text-to-binary round-trips correctly for messages and puzzles.",
    howToUse: [
      "Paste binary digits, optionally with spaces between bytes.",
      "Ensure bit count is a multiple of 8 for standard bytes.",
      "Read decoded text output.",
      "Fix padding if you see replacement characters for invalid UTF-8.",
    ],
    useCases: [
      "Solve binary-encoded riddle messages.",
      "Recover ASCII from logic analyzer captures.",
      "Check student encoding assignments.",
    ],
    supportedFormats: ["Binary strings grouped as 8-bit bytes"],
    privacy: PRIVACY,
    howItWorks:
      "Split into bytes, convert each byte to decimal 0–255, then map byte sequences to characters per UTF-8 rules.",
    faqs: [
      {
        question: "Wrong character output?",
        answer:
          "Encoding mismatch (UTF-8 vs Latin-1) or misaligned bit groups cause garbage.",
      },
      {
        question: "7-bit ASCII?",
        answer:
          "Pad to 8 bits on the left for standard byte decoding.",
      },
      {
        question: "Non-binary characters in input?",
        answer:
          "Strip spaces; reject 2–9 if strict binary mode.",
      },
    ],
  },

  "time-card-calculator": {
    whatItDoes:
      "Add up hours worked from daily clock-in, clock-out, and break times — usually across a week — for hourly payroll sanity checks.",
    whyUse:
      "Rounding to quarter hours and subtracting unpaid lunch breaks is repetitive. A time card calculator totals decimal hours consistently.",
    howToUse: [
      "Enter start and end time for each workday (AM/PM or 24h).",
      "Subtract break minutes if unpaid.",
      "Review daily and weekly hour totals.",
      "Export or copy totals for your timesheet system.",
    ],
    useCases: [
      "Verify paycheck hours against a paper punch card.",
      "Freelancers tracking billable time by day.",
      "Managers auditing overtime before approval.",
    ],
    supportedFormats: ["12-hour or 24-hour clock times", "Break durations in minutes"],
    privacy: PRIVACY,
    howItWorks:
      "Convert each in/out pair to minutes from midnight, subtract breaks, sum days, then display as hours and minutes or decimal hours.",
    faqs: [
      {
        question: "Overnight shifts?",
        answer:
          "If end time is earlier than start, the tool should add 24 hours to end for next-day clock-out.",
      },
      {
        question: "Decimal hours vs hh:mm?",
        answer:
          "Payroll often uses decimals (7.5 = 7:30); toggle display if offered.",
      },
      {
        question: "Overtime rules?",
        answer:
          "This tool sums hours; legal overtime thresholds vary by jurisdiction and are not applied automatically.",
      },
    ],
  },

  "military-time-converter": {
    whatItDoes:
      "Convert times between 12-hour clock with AM/PM and 24-hour military time (0000–2359).",
    whyUse:
      "Missed AM/PM causes missed flights and shifts. Military time removes ambiguity for schedules and logs.",
    howToUse: [
      "Enter a time in either format.",
      "Read the converted equivalent instantly.",
      "Use for single times; duration math may need a separate calculator.",
    ],
    useCases: [
      "Read international train timetables in 24h format.",
      "Convert hospital or aviation schedules for civilians.",
      "Standardize log entries across time formats.",
    ],
    supportedFormats: ["12-hour with AM/PM", "24-hour HH:MM or HHMM"],
    privacy: PRIVACY,
    howItWorks:
      "Add 12 to hours after noon (except 12 PM) for PM conversion; midnight and noon have special cases (12 AM → 00:00, 12 PM → 12:00).",
    faqs: [
      {
        question: "Is 2400 valid?",
        answer:
          "End-of-day is often 23:59 or 00:00 next day; 24:00 is sometimes used but rare in UI.",
      },
      {
        question: "Minutes included?",
        answer:
          "Yes — convert hours and minutes together, not hours alone.",
      },
      {
        question: "Timezone conversion?",
        answer:
          "This tool converts format only, not zones.",
      },
    ],
  },

  "scientific-calculator": {
    whatItDoes:
      "Browser-based scientific calculator with trig, logarithms, powers, roots, parentheses, and constants for quick math without installing software.",
    whyUse:
      "Phone calculators hide advanced keys; desktop apps need installs. A tab-based sci-calc keeps expressions private and always available.",
    howToUse: [
      "Click keys or type expressions with standard operator precedence.",
      "Use shift or 2nd for inverse trig and extra functions.",
      "Apply parentheses for complex numerators and denominators.",
      "Clear and re-enter if you hit a syntax error.",
    ],
    useCases: [
      "Check algebra and precalc homework steps.",
      "Compute log or trig values in physics labs.",
      "Quick engineering estimates at a coworking desk.",
    ],
    supportedFormats: [
      "Decimal numbers and standard math operators",
      "Degrees or radians for trig if toggle exists",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Expressions parse into an evaluation tree respecting PEMDAS; trig and log functions use JavaScript math libraries at floating precision.",
    faqs: [
      {
        question: "Degree vs radian mode?",
        answer:
          "Wrong mode gives wrong trig answers; check the mode indicator before sin/cos/tan.",
      },
      {
        question: "How precise are results?",
        answer:
          "Floating-point has rounding limits; do not rely on last decimal for critical engineering without error analysis.",
      },
      {
        question: "History or memory?",
        answer:
          "Some calculators offer M+, MR, or history panels; features vary on the page.",
      },
    ],
  },
  "fancy-text-generator": {
    whatItDoes:
      "The Fancy Text Generator applies multiple Unicode presentation styles to ordinary Latin text so you can copy bold, italic, script, bubble, and other looks into bios, chats, and posts without custom fonts.",
    whyUse:
      "Social platforms often strip rich formatting; Unicode styled letters survive as plain text. One hub lets you compare styles side by side instead of hunting character maps.",
    howToUse: [
      "Type or paste the phrase you want to stylize.",
      "Pick a style preset or browse variant buttons on the page.",
      "Preview how the string renders in the output box.",
      "Copy the styled text and paste into Instagram, Discord, or TikTok.",
    ],
    useCases: [
      "Highlight a link-in-bio headline with script or bold Unicode.",
      "Make a giveaway post stand out in a crowded feed.",
      "Test which styles still display on your phone keyboard app.",
      "Create aesthetic captions when the platform has no bold button.",
    ],
    supportedFormats: [
      "UTF-8 plain text input",
      "Unicode mathematical and letterlike symbols",
    ],
    privacy: PRIVACY,
    whatIs:
      "Fancy text here means Unicode characters that resemble bold, italic, or decorative fonts while remaining copy-pasteable plain text.",
    howItWorks:
      "Each letter maps to a code point in Unicode compatibility zones (for example mathematical bold or script blocks). The tool substitutes characters per mapping tables entirely in JavaScript.",
    faqs: [
      {
        question: "Will everyone see the same style?",
        answer:
          "Most modern phones and desktops render these symbols. Rare older systems may show missing-glyph boxes for uncommon letters.",
      },
      {
        question: "Can I combine multiple styles?",
        answer:
          "You can manually mix outputs from different generators, but not every combination has a defined Unicode character for each letter.",
      },
      {
        question: "Does this change SEO on my website?",
        answer:
          "Styled Unicode in page titles can look odd in search results; use fancy text mainly for social and chat contexts.",
      }
    ],
  },

  "fancy-text-bold": {
    whatItDoes:
      "Bold Fancy Text maps A–Z and a–z to mathematical bold Unicode letters so your message looks heavy and emphasized in places that do not support HTML or Markdown bold.",
    whyUse:
      "Platform-native bold is unavailable in many usernames and comment fields. Mathematical bold symbols give a consistent weight without uploading image text.",
    howToUse: [
      "Enter the word or sentence to embolden.",
      "Confirm the preview uses bold Unicode glyphs, not CSS.",
      "Copy the full string including spaces and punctuation you need.",
      "Paste into the target field and send without retyping.",
    ],
    useCases: [
      "Emphasize a single word in a Twitter/X bio.",
      "Label team roles in a Discord channel topic line.",
      "Make a bullet header pop in a plain-text newsletter.",
      "Stress a deadline date in a group chat announcement.",
    ],
    supportedFormats: [
      "Latin alphabet A–Z and a–z",
      "Digits may map to bold digits where supported",
    ],
    privacy: PRIVACY,
    whatIs:
      "Unicode bold letters live in the Mathematical Alphanumeric Symbols block. They are distinct code points, not font weight changes.",
    whatIsHeading: "What is Unicode bold text?",
    faqs: [
      {
        question: "Why do some letters look normal?",
        answer:
          "Only characters with defined bold code points transform. Symbols and many accented letters may stay unchanged unless the tool maps them.",
      },
      {
        question: "Is this the same as **Markdown** bold?",
        answer:
          "No. Markdown bold needs a renderer; this output is plain Unicode characters.",
      },
      {
        question: "Can search engines read bold Unicode?",
        answer:
          "Crawlers treat them as unusual letters. Prefer normal text for critical keywords on indexed pages.",
      }
    ],
  },

  "fancy-text-italic": {
    whatItDoes:
      "Italic Fancy Text converts standard Latin letters into slanted mathematical italic Unicode for captions, quotes, and subtle emphasis where formatting buttons are missing.",
    whyUse:
      "Italic Unicode reads as emphasis in bios and comments without relying on serif fonts that may not load on mobile.",
    howToUse: [
      "Paste the phrase you want in italic Unicode.",
      "Review the output for letters that lack italic mappings.",
      "Copy the transformed line in one action.",
      "Paste into your app without enabling rich text mode if unsupported.",
    ],
    useCases: [
      "Credit a quote author in an Instagram caption.",
      "Soft-emphasize a song title in a musician bio.",
      "Mark foreign words in a plain-text readme.",
      "Add flair to event names on Linktree lines.",
    ],
    supportedFormats: [
      "Basic Latin letters",
      "Spaces and ASCII punctuation pass through",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Each mapped letter swaps to its mathematical italic code point. The transformation is reversible only by retyping or using a normalizer tool.",
    faqs: [
      {
        question: "Does italic Unicode work in usernames?",
        answer:
          "Some games allow it; others filter non-ASCII. Test on the platform before committing.",
      },
      {
        question: "Will screen readers pronounce it correctly?",
        answer:
          "Screen readers may spell unusual symbols letter by letter. Use sparingly in accessible content.",
      },
      {
        question: "Can I italicize numbers?",
        answer:
          "Italic digit mappings exist for 0–9 in Unicode; check the tool output for your full string.",
      }
    ],
  },

  "fancy-text-script": {
    whatItDoes:
      "Script Fancy Text produces flowing calligraphy-like Unicode letters for wedding stationery lines, elegant bios, and decorative headers that must remain copy-paste text.",
    whyUse:
      "Downloading script fonts fails on many mobile apps; Unicode script letters travel as text and do not require font embedding.",
    howToUse: [
      "Type a short phrase — long blocks may be hard to edit after conversion.",
      "Generate script-style output and scan for missing letters.",
      "Copy and paste into Canva text boxes or social bios.",
      "Pair with plain text elsewhere for readability.",
    ],
    useCases: [
      "Spell a couple’s names on digital invite copy.",
      "Brand a luxury skincare line tagline in a bio.",
      "Head a Pinterest board description aesthetically.",
      "Label photo album titles in group chats.",
    ],
    supportedFormats: [
      "Latin script mappings",
      "Short phrases recommended",
    ],
    privacy: PRIVACY,
    whatIs:
      "Unicode script letters mimic handwritten capitals and lowercase in the Mathematical Script block.",
    faqs: [
      {
        question: "Is this a real cursive font?",
        answer:
          "It is preset glyph shapes, not joined handwriting. Letters will not connect like true cursive.",
      },
      {
        question: "Does script work in all caps?",
        answer:
          "Script capitals and lowercase use different code points; type the case you want before converting.",
      },
      {
        question: "Can I use script in email subject lines?",
        answer:
          "Some clients display it; others strip non-ASCII. Send a test to yourself first.",
      }
    ],
  },

  "fancy-text-small-caps": {
    whatItDoes:
      "Small Caps Fancy Text turns lowercase input into Unicode small-capital letters for tidy labels, acronym lines, and branding where CSS font-variant is unavailable.",
    whyUse:
      "True small caps need OpenType features; Unicode small caps give a similar visual hierarchy in plain text environments.",
    howToUse: [
      "Enter words in lowercase for the most consistent small-cap mapping.",
      "Inspect acronyms to ensure each letter converted.",
      "Copy the line for headlines or table labels.",
      "Avoid mixing with ALL CAPS unless you want mixed heights.",
    ],
    useCases: [
      "Typeset “versus” matchups in esports announcements.",
      "Label chart axes in screenshot captions.",
      "Present legal entity names with dignified spacing.",
      "Format book chapter titles in notes apps.",
    ],
    supportedFormats: [
      "Latin small-cap Unicode mappings",
      "Mixed case input normalized by the tool",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "How is this different from uppercase?",
        answer:
          "Small caps glyphs are shorter than full capitals, closer to typographic small caps.",
      },
      {
        question: "Do numbers become small caps?",
        answer:
          "Digits may stay full size unless the tool maps numeric small caps — check preview.",
      },
      {
        question: "Can I use this in PDF forms?",
        answer:
          "Plain-text fields accept Unicode; appearance depends on the PDF viewer font fallback.",
      }
    ],
  },

  "fancy-text-upside-down": {
    whatItDoes:
      "Upside Down Text reverses character order and substitutes upside-down Unicode glyphs so phrases read as inverted when you flip your phone or surprise friends in chats.",
    whyUse:
      "Manual character flipping is tedious and error-prone. The generator handles paired mappings for letters and common punctuation.",
    howToUse: [
      "Type the joke or puzzle clue in normal orientation.",
      "Generate flipped text and read the preview mentally upside down.",
      "Copy and post; warn viewers to rotate their device if needed.",
      "Keep messages short for legibility.",
    ],
    useCases: [
      "Hide a spoiler answer in a gaming Discord.",
      "Create scavenger hunt clues for parties.",
      "Post playful status lines on April Fools’.",
      "Make meme captions that require a double take.",
    ],
    supportedFormats: [
      "Latin letters with upside-down partners",
      "Limited punctuation flips",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The tool maps characters to inverted equivalents and often reverses string order so reading bottom-to-top yields the original message.",
    faqs: [
      {
        question: "Why does my text look mirrored?",
        answer:
          "Some mappings are reflections; combined with reversal the phrase reads correctly when inverted.",
      },
      {
        question: "Can I flip emojis?",
        answer:
          "Emojis usually pass through unchanged; the effect works best on Latin letters.",
      },
      {
        question: "Is upside-down text searchable?",
        answer:
          "Search indexes normal text poorly when characters are exotic; do not use for important links.",
      }
    ],
  },

  "fancy-text-bubble": {
    whatItDoes:
      "Bubble Text wraps letters in circled or bubble Unicode symbols for playful gamer tags, party flyers, and kid-friendly headlines that still paste as text.",
    whyUse:
      "Bubble letters draw attention in usernames where color or images are blocked. Unicode bubbles avoid custom emoji art.",
    howToUse: [
      "Enter a short word or acronym to bubble.",
      "Check that each character has a circled counterpart.",
      "Copy the bubbly string for your tag or title.",
      "Avoid very long sentences — readability drops quickly.",
    ],
    useCases: [
      "Stylize a Fortnite clan abbreviation.",
      "Headline a birthday invite in group SMS.",
      "Mark sale prices in a Instagram story text sticker paste.",
      "Nickname a sports team in a bracket sheet.",
    ],
    supportedFormats: [
      "A–Z and 0–9 circled variants where available",
      "Spaces between bubbled words",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Bubble vs square enclosed letters?",
        answer:
          "This tool focuses on round bubble glyphs; square variants are a different Unicode set.",
      },
      {
        question: "Do lowercase letters bubble?",
        answer:
          "Circled capitals are most common; lowercase may map to smaller enclosed forms if supported.",
      },
      {
        question: "Will bubbles work in SMS?",
        answer:
          "Most smartphones render enclosed alphanumerics; older SMS handsets may substitute squares.",
      }
    ],
  },

  "fancy-text-monospace": {
    whatItDoes:
      "Monospace Fancy Text converts letters to full-width or monospace Unicode symbols so lines align visually in bios, ASCII art captions, and faux-terminal messages.",
    whyUse:
      "When you cannot load a code font, monospace Unicode preserves a grid-like aesthetic in plain text fields.",
    howToUse: [
      "Paste code snippets or short commands you want to showcase.",
      "Generate monospace-styled text for display-only use.",
      "Copy into chat — do not expect syntax highlighting.",
      "Keep line length moderate for mobile screens.",
    ],
    useCases: [
      "Fake terminal greeting in a developer bio.",
      "Align column-like lists in Discord about-me sections.",
      "Style hackathon team names with a tech feel.",
      "Differentiate config keys in screenshot captions.",
    ],
    supportedFormats: [
      "Latin to monospace Unicode letter forms",
      "Line breaks preserved",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Can I run code copied from here?",
        answer:
          "No. Output uses special Unicode letters, not ASCII — never execute it as code.",
      },
      {
        question: "Is this good for GitHub README titles?",
        answer:
          "GitHub Markdown prefers normal text; monospace Unicode may confuse copy-paste into terminals.",
      },
      {
        question: "Does it preserve indentation?",
        answer:
          "Spaces remain spaces; alignment depends on the viewing font’s character widths.",
      }
    ],
  },

  "fancy-text-fullwidth": {
    whatItDoes:
      "Fullwidth Text expands ASCII characters to fullwidth Unicode forms, creating spaced vaporwave-style lines and dramatic emphasis in social posts.",
    whyUse:
      "Fullwidth characters add visual breathing room without inserting zero-width spaces that break search or URLs.",
    howToUse: [
      "Type ASCII letters, numbers, or punctuation to widen.",
      "Preview the stretched line for unintended wide symbols.",
      "Copy for aesthetic captions or meme templates.",
      "Mix with normal text for contrast in the same sentence if needed.",
    ],
    useCases: [
      "Vaporwave album title aesthetics in bios.",
      "Emphasize a single word in a TikTok caption.",
      "Create spaced headers for photo carousels.",
      "Playful warnings in community announcement posts.",
    ],
    supportedFormats: [
      "ASCII to fullwidth Latin and digits",
      "Some punctuation has fullwidth partners",
    ],
    privacy: PRIVACY,
    whatIs:
      "Fullwidth forms occupy twice the horizontal cell width of halfwidth ASCII in East Asian typography conventions.",
    faqs: [
      {
        question: "Does fullwidth affect URL detection?",
        answer:
          "Yes. Links with fullwidth dots or slashes may not click; keep URLs in normal ASCII.",
      },
      {
        question: "Can I convert back to normal?",
        answer:
          "Retype or run through a normalizer that maps fullwidth back to ASCII if you have one.",
      },
      {
        question: "Why does it look uneven in some apps?",
        answer:
          "Apps use different fallback fonts; spacing is cosmetic, not guaranteed monospaced.",
      }
    ],
  },

  "word-unscrambler": {
    whatItDoes:
      "Word Unscrambler finds valid dictionary words from jumbled letters for crosswords, Wordscapes-style games, and classroom anagram puzzles.",
    whyUse:
      "Manual anagram solving exhausts time on long letter sets. A local dictionary scan lists candidates you can verify against puzzle constraints.",
    howToUse: [
      "Enter scrambled letters without spaces (use ? for blank tiles if supported).",
      "Set minimum word length or pattern filters if available.",
      "Browse sorted results from longest to shortest.",
      "Pick the word that fits crossing letters in your puzzle.",
    ],
    useCases: [
      "Break a stalemate in a daily jumble.",
      "Help students practice vocabulary with letter banks.",
      "Find bingo plays in friendly word games.",
      "Validate whether a letter rack can form a seven-letter word.",
    ],
    supportedFormats: [
      "A–Z letter racks",
      "Optional wildcard blanks",
      "English word lists bundled locally",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The tool permutes or scans the dictionary for words whose multiset of letters matches your rack, pruning by length and pattern.",
    faqs: [
      {
        question: "Are proper nouns included?",
        answer:
          "Most solvers use general dictionaries; names may be excluded unless the list marks them.",
      },
      {
        question: "How many letters can I enter?",
        answer:
          "Performance drops as racks grow; practical limits are often around fifteen letters.",
      },
      {
        question: "Does it guarantee the highest score word?",
        answer:
          "It lists valid words; game scoring with premium squares is up to you.",
      }
    ],
  },

  "typing-speed-test": {
    whatItDoes:
      "This typing speed test measures words per minute (WPM) and accuracy while you type timed English passages in the browser.",
    whyUse:
      "Regular timed tests reveal whether practice translates into speed without installing desktop tutors or sending keystrokes to a server.",
    howToUse: [
      "Choose a test duration or word count if options exist.",
      "Start typing when the timer begins; errors may highlight in red.",
      "Finish the passage or let the timer expire.",
      "Review WPM, accuracy percentage, and error count.",
    ],
    useCases: [
      "Track weekly improvement for a data entry certificate.",
      "Warm up fingers before a remote coding interview.",
      "Compare QWERTY vs alternate layout experiments.",
      "Run a friendly office WPM challenge.",
    ],
    supportedFormats: [
      "English prose prompts",
      "WPM based on standard five-character word length",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The timer starts on first keystroke. Each mismatch flags an error; net WPM adjusts for mistakes depending on the scoring mode shown.",
    formula:
      "WPM ≈ (correct characters ÷ 5) ÷ minutes elapsed",
    faqs: [
      {
        question: "What counts as a word?",
        answer:
          "Most tests define a word as five characters including spaces, a long-standing typing metric convention.",
      },
      {
        question: "Can I restart mid-test?",
        answer:
          "Use the reset control to discard the current attempt without saving history unless the tool stores local stats.",
      },
      {
        question: "Does autocorrect help?",
        answer:
          "Browser autocorrect may inflate scores; disable OS suggestions for honest measurement.",
      }
    ],
  },

  "typing-speed-test-numbers": {
    whatItDoes:
      "The Number Row Typing Test drills digits and symbol keys with timed numeric passages separate from letter-heavy WPM tests.",
    whyUse:
      "Data entry and finance roles demand fast, accurate number typing that general prose tests undertrain.",
    howToUse: [
      "Select the numeric test mode on the page.",
      "Place fingers on the home row and reach for number keys.",
      "Type the flashing digits and punctuation exactly.",
      "Compare accuracy — a single shifted symbol error matters.",
    ],
    useCases: [
      "Practice entering invoice amounts quickly.",
      "Prepare for clerical hiring keystroke exams.",
      "Improve PIN and OTP entry on keyboard layouts.",
      "Balance training after learning letter touch typing.",
    ],
    supportedFormats: [
      "Digits 0–9",
      "Common symbols on the number row",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is WPM calculated the same way?",
        answer:
          "Yes, using the five-strokes-per-word convention, which makes numeric tests feel slower than prose.",
      },
      {
        question: "Do I need a numpad?",
        answer:
          "This mode targets the top number row; numpad drills may be a separate exercise.",
      },
      {
        question: "Why focus on accuracy?",
        answer:
          "Financial typos are costly; many employers prioritize sub-1% error rates over raw speed.",
      }
    ],
  },

  "name-generator-band": {
    whatItDoes:
      "Band Name Generator mixes genre, mood, and keyword seeds into stage-name ideas for solo artists, duos, and full groups.",
    whyUse:
      "Naming blocks creative momentum. Rapid idea lists help you search trademarks and domains without staring at a blank page.",
    howToUse: [
      "Pick genre tags like indie, metal, or electronic.",
      "Add optional words you want reflected (city, color, myth).",
      "Generate batches until a name feels memorable.",
      "Shortlist favorites and verify availability on streaming platforms.",
    ],
    useCases: [
      "Name a high school garage band before first gig flyers.",
      "Find a side-project alias distinct from your solo act.",
      "Brainstorm titles for a concept album persona.",
      "Seed ideas for a battle-of-the-bands signup form.",
    ],
    supportedFormats: [
      "Keyword and genre toggles",
      "Plain-text name lists to copy",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Are names guaranteed unique?",
        answer:
          "No. Always search Spotify, USPTO, and social handles before adopting a name.",
      },
      {
        question: "Can I lock part of the name?",
        answer:
          "Use keywords to anchor one word while randomizing the rest if the tool supports fixed tokens.",
      },
      {
        question: "Does it suggest album titles?",
        answer:
          "Focus is stage names; pair with your own title ideas or other writing tools.",
      }
    ],
  },

  "name-generator-podcast": {
    whatItDoes:
      "Podcast Name Generator proposes show titles tuned to topic, tone, and audience — interview, true crime, comedy, or education.",
    whyUse:
      "Great podcasts need searchable, pronounceable titles. Generator sparks reduce anchoring on the first idea you thought of.",
    howToUse: [
      "Describe your niche in a few keywords.",
      "Select tone: serious, humorous, or minimalist if offered.",
      "Generate lists and star favorites locally on paper.",
      "Say names aloud to catch awkward abbreviations.",
    ],
    useCases: [
      "Launch a weekly hobby show with a clear brand.",
      "Rebrand after a format pivot away from old title.",
      "Find subtitle ideas paired with an existing brand.",
      "Pitch co-hosts three distinct naming directions.",
    ],
    supportedFormats: [
      "Topic keywords",
      "Optional episode format hints",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Should I include the word podcast?",
        answer:
          "Often no — directories add category context; shorter names fit artwork better.",
      },
      {
        question: "How do I check duplicates?",
        answer:
          "Search Apple Podcasts and Spotify directly; similar titles confuse listeners.",
      },
      {
        question: "Can I get domain-matching names?",
        answer:
          "Generator does not check DNS; verify .com or .fm manually after shortlisting.",
      }
    ],
  },

  "name-generator-dnd": {
    whatItDoes:
      "D&D Name Generator creates fantasy personal names suited to elves, dwarves, humans, and other tabletop archetypes for player characters and NPCs.",
    whyUse:
      "Session prep needs dozens of believable names fast. Random tables avoid repetitive tavern keepers named Bob.",
    howToUse: [
      "Choose ancestry or vibe tags matching your setting.",
      "Generate single names or first-plus-surname pairs.",
      "Reroll until pronunciation feels natural at the table.",
      "Copy into your character sheet or VTT journal.",
    ],
    useCases: [
      "Name shopkeepers in a sandbox city.",
      "Generate rival adventuring party members.",
      "Find a warlock patron epithet.",
      "Populate ship crews for nautical campaigns.",
    ],
    supportedFormats: [
      "Fantasy name tokens",
      "Optional gender or honorific flavor",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Are names lore-accurate to official D&D?",
        answer:
          "Names echo common fantasy tropes; adapt to your homebrew world freely.",
      },
      {
        question: "Can I generate place names?",
        answer:
          "This generator focuses on people; combine syllables manually for towns.",
      },
      {
        question: "Will players laugh at a bad roll?",
        answer:
          "Reroll freely — humor names are valid for comic campaigns.",
      }
    ],
  },

  "name-generator-clan": {
    whatItDoes:
      "Clan Name Generator produces guild and clan tags for shooters, MMOs, and mobile strategy games with aggressive, mythical, or humorous themes.",
    whyUse:
      "Memorable clans need short, punchy tags within character limits. Bulk ideas help you avoid duplicate tags already taken in-game.",
    howToUse: [
      "Pick theme: military, fantasy, tech, or joke.",
      "Set desired length if the game caps characters.",
      "Generate and test capitalization for readability.",
      "Claim the tag in-game before announcing publicly.",
    ],
    useCases: [
      "Form a Call of Duty warzone clan tag.",
      "Rename a merged guild after a server merge.",
      "Create alt clans for seasonal competitions.",
      "Brand a Discord community matching in-game tag.",
    ],
    supportedFormats: [
      "Short alphanumeric-friendly strings",
      "Copyable tag list",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Are special characters included?",
        answer:
          "Many games ban symbols; generator may filter to letters and numbers — follow your game’s rules.",
      },
      {
        question: "Can I embed my gamertag?",
        answer:
          "Use keyword mode to prepend or append your handle fragment.",
      },
      {
        question: "Is profanity filtered?",
        answer:
          "Automated filters vary; manually review before publishing.",
      }
    ],
  },

  "name-generator-gamer-tag": {
    whatItDoes:
      "Gamer Tag Generator suggests usernames for consoles and PC platforms, balancing readability, edge, and length limits.",
    whyUse:
      "Availability frustration wastes time. Idea bursts let you try variations quickly on Xbox, PlayStation, Steam, or Epic.",
    howToUse: [
      "Select vibe: stealthy, cute, competitive, or random.",
      "Add lucky numbers or letters you want included.",
      "Generate and tweak spelling leetspeak if desired.",
      "Search platform availability outside this tool.",
    ],
    useCases: [
      "Fresh tag for a smurf account.",
      "Rebrand after a username dox concern.",
      "Match tags across squad members with a theme.",
      "Find available-looking handles before gifting a console.",
    ],
    supportedFormats: [
      "Platform-friendly ASCII usernames",
      "Optional number suffixes",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Does it check if a tag is free?",
        answer:
          "No. You must attempt registration on each platform.",
      },
      {
        question: "Are offensive tags blocked?",
        answer:
          "Review suggestions; platforms enforce their own moderation.",
      },
      {
        question: "Can I use Unicode fancy letters?",
        answer:
          "Many platforms disallow non-ASCII; stick to plain letters for reliability.",
      }
    ],
  },

  "name-generator-business": {
    whatItDoes:
      "Business Name Generator combines industry keywords and naming styles to propose company and product brand names for startups and side hustles.",
    whyUse:
      "Founders need many candidates before legal screening. Structured combos beat generic thesaurus browsing.",
    howToUse: [
      "Enter industry terms like bakery, SaaS, or landscaping.",
      "Choose modern, classic, or compound naming styles.",
      "Generate batches and note favorites in a spreadsheet.",
      "Run trademark and domain searches externally.",
    ],
    useCases: [
      "Name a Shopify store private label line.",
      "Find a consulting LLC name that sounds credible.",
      "Brainstorm app names before MVP design.",
      "Label internal project codenames transitioning public.",
    ],
    supportedFormats: [
      "Industry keywords",
      "Style toggles",
      "Text name outputs",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is legal clearance included?",
        answer:
          "No. Consult an attorney and trademark database before filing.",
      },
      {
        question: "Can I get logo text only?",
        answer:
          "Yes — use names as input to separate design tools.",
      },
      {
        question: "Should names be descriptive?",
        answer:
          "Descriptive names explain offerings but may be harder to trademark; balance clarity and distinctiveness.",
      }
    ],
  },

  "name-generator-baby": {
    whatItDoes:
      "Baby Name Generator surfaces first-name ideas filtered by origin, popularity vibe, and letter patterns for expecting parents and writers.",
    whyUse:
      "Overwhelming name lists stall decisions. Curated random draws expose options you might not search manually.",
    howToUse: [
      "Select gender preference if provided, or neutral mode.",
      "Filter by origin such as Irish, Japanese, or Latin roots.",
      "Generate lists and say names aloud with your surname.",
      "Research meaning and cultural context before finalizing.",
    ],
    useCases: [
      "Build a shortlist before a anatomy scan reveal.",
      "Find character names for novels with realistic backgrounds.",
      "Compare traditional vs modern spelling variants.",
      "Pair sibling names with matching syllable counts.",
    ],
    supportedFormats: [
      "Given name strings",
      "Optional meaning blurbs if shown",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Are popularity rankings included?",
        answer:
          "Some tools show rough popularity; verify with official SSA or local stats.",
      },
      {
        question: "Can I exclude letters?",
        answer:
          "Use advanced filters if available to avoid initials matching unwanted words.",
      },
      {
        question: "Is medical advice implied?",
        answer:
          "No. Naming is personal; the tool offers ideas only.",
      }
    ],
  },

  "name-generator-pet": {
    whatItDoes:
      "Pet Name Generator suggests dog, cat, and small-animal names by personality traits, coat color, and cute vs dignified tone.",
    whyUse:
      "Shelter adopters and new puppy owners want names that fit behavior without copying the same top-ten lists.",
    howToUse: [
      "Choose species and personality sliders.",
      "Generate names and test whether your pet responds.",
      "Shortlist two-syllable names for training recall.",
      "Share finalists with household members before engraving tags.",
    ],
    useCases: [
      "Name foster kittens in a litter with a theme.",
      "Rebrand a rescue dog whose old name is unknown.",
      "Find punny names for a pet Instagram account.",
      "Label classroom hamsters for a science unit.",
    ],
    supportedFormats: [
      "Pet name strings",
      "Theme tags like food or mythology",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Do you store my pet’s photo?",
        answer:
          "No image upload is required for name ideas; everything stays local if you only use text filters.",
      },
      {
        question: "Are human names included?",
        answer:
          "Yes, many pets receive human-style names; reroll for classic pet names if preferred.",
      },
      {
        question: "Can I generate pairs for bonded pets?",
        answer:
          "Run themed generation twice or use duo mode if the page offers it.",
      }
    ],
  },

  "text-to-speech": {
    whatItDoes:
      "Text to Speech reads your pasted writing aloud using the Web Speech API voices installed on your device for proofreading and accessibility checks.",
    whyUse:
      "Hearing text catches awkward phrasing and typos eyes skip. Browser TTS avoids cloud APIs that record your manuscript.",
    howToUse: [
      "Paste or type the passage to hear.",
      "Choose voice, language, rate, and pitch if controls exist.",
      "Press Speak and pause at any time.",
      "Adjust settings and replay dense paragraphs.",
    ],
    useCases: [
      "Proofread blog posts before publishing.",
      "Test dialogue rhythm for screenplays.",
      "Listen to study notes while commuting.",
      "Check pronunciation of names in speeches.",
    ],
    supportedFormats: [
      "UTF-8 text",
      "System voices per OS and browser",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser sends text to the OS speech synthesizer locally. No audio file uploads occur unless you separately record output.",
    faqs: [
      {
        question: "Why are voices different on my phone?",
        answer:
          "Each device exposes its own voice catalog to the browser.",
      },
      {
        question: "Can I download MP3?",
        answer:
          "Basic TTS may not export audio; use a dedicated recorder if you need files.",
      },
      {
        question: "Does it read PDFs?",
        answer:
          "Paste extracted text; PDF parsing is not part of core TTS.",
      }
    ],
  },

  "height-comparison": {
    whatItDoes:
      "Height Comparison draws silhouettes or bars for two or more heights so you can visualize how people, characters, or objects stack up.",
    whyUse:
      "Raw numbers in centimeters fail to communicate scale. A side-by-side chart helps casting, sports debates, and costume planning.",
    howToUse: [
      "Enter each person’s height in feet/inches or centimeters.",
      "Add optional labels like names or roles.",
      "View the comparative chart scaling automatically.",
      "Screenshot or share the visual for discussions.",
    ],
    useCases: [
      "Compare actor heights for cosplay accuracy.",
      "Set basketball lineup height talk straight.",
      "Show kids how they grew versus a parent.",
      "Plan shelf reach for warehouse ergonomics.",
    ],
    supportedFormats: [
      "Feet and inches",
      "Centimeters and meters",
      "Multiple entries",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Are silhouettes to scale?",
        answer:
          "Charts scale proportionally to entered values; artistic icons may simplify details.",
      },
      {
        question: "Can I compare more than two?",
        answer:
          "Add rows until the tool’s limit; useful for team rosters.",
      },
      {
        question: "Is celebrity data built in?",
        answer:
          "You enter heights manually unless the page ships preset examples.",
      }
    ],
  },

  "yaml-to-json": {
    whatItDoes:
      "YAML to JSON converts configuration files written in YAML into JSON objects developers can feed to APIs, linters, and JSON-only tools.",
    whyUse:
      "Kubernetes and CI configs often start as YAML while app runtimes expect JSON. Local conversion keeps secrets off remote formatters.",
    howToUse: [
      "Paste YAML respecting indentation with spaces, not tabs.",
      "Fix parser errors pointed at line numbers.",
      "Copy pretty-printed JSON from the output pane.",
      "Validate JSON in a schema validator if required.",
    ],
    useCases: [
      "Convert docker-compose snippets for a Node script.",
      "Turn GitHub Actions YAML fragments into test fixtures.",
      "Migrate Ansible vars to JSON for a cloud function.",
      "Debug indentation mistakes with immediate feedback.",
    ],
    supportedFormats: [
      "YAML 1.2 subset common in configs",
      "JSON output with 2-space indent typical",
    ],
    privacy: PRIVACY,
    howItWorks:
      "A client-side parser builds an object tree, then JSON.stringify formats the result. Anchors and aliases may be unsupported depending on parser strictness.",
    faqs: [
      {
        question: "Are tabs allowed in YAML?",
        answer:
          "Standard YAML forbids tab indentation; use spaces only.",
      },
      {
        question: "Do multi-document YAML files work?",
        answer:
          "Some tools accept --- separated docs; others require splitting manually.",
      },
      {
        question: "Is my API key safe?",
        answer:
          "Parsing stays in-browser, but never paste production secrets into any website you do not trust.",
      }
    ],
  },

  "csv-to-json": {
    whatItDoes:
      "CSV to JSON transforms comma-separated spreadsheets into JSON arrays of objects, using the first row as column headers by default.",
    whyUse:
      "Front-end prototypes and serverless functions often need JSON imports. Conversion avoids manual Excel macros uploading data elsewhere.",
    howToUse: [
      "Paste CSV or upload a small file if supported.",
      "Set delimiter to comma, semicolon, or tab for EU exports.",
      "Confirm header row handling matches your sheet.",
      "Copy JSON into your app or download the blob.",
    ],
    useCases: [
      "Load marketing lead lists into a mock API.",
      "Convert survey exports for D3 charts.",
      "Turn inventory CSV into Firebase seed documents.",
      "Inspect malformed rows before ETL pipelines.",
    ],
    supportedFormats: [
      "CSV with configurable delimiter",
      "JSON array-of-objects output",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "How are quotes escaped?",
        answer:
          "RFC-style doubled quotes inside fields should parse; broken quoting shows row errors.",
      },
      {
        question: "Can JSON be nested?",
        answer:
          "Flat CSV becomes flat objects; nest manually after conversion.",
      },
      {
        question: "Is there a row limit?",
        answer:
          "Very large sheets may slow the browser; split files if needed.",
      }
    ],
  },

  "xml-to-json": {
    whatItDoes:
      "XML to JSON parses XML documents into JSON structures for JavaScript consumption, debugging feeds, and legacy SOAP integrations.",
    whyUse:
      "Modern front ends prefer JSON while enterprise systems emit XML. One-step parsing saves writing bespoke transformers during spikes.",
    howToUse: [
      "Paste well-formed XML including the root element.",
      "Review JSON for attribute naming (@attributes keys common).",
      "Copy output into Postman or your app.",
      "Adjust options for array wrapping of repeated tags if available.",
    ],
    useCases: [
      "Inspect RSS items as JSON for a news ticker.",
      "Prototype clients against SOAP sample envelopes.",
      "Convert config XML from older .NET apps.",
      "Teach students the mapping between tree models.",
    ],
    supportedFormats: [
      "XML 1.0 text",
      "JSON object output",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The parser walks DOM nodes, mapping elements to keys and text nodes to values, optionally collecting attributes separately.",
    faqs: [
      {
        question: "Are namespaces preserved?",
        answer:
          "Some converters strip prefixes; verify critical QName handling before production use.",
      },
      {
        question: "Does it validate XSD?",
        answer:
          "No schema validation — only structural parsing.",
      },
      {
        question: "Can I go back to XML?",
        answer:
          "Use a dedicated JSON-to-XML tool; round-trip may not be identical.",
      }
    ],
  },

  "jwt-decoder": {
    whatItDoes:
      "JWT Decoder splits JSON Web Tokens into header, payload, and signature sections, showing claims as formatted JSON without verifying cryptographic signatures.",
    whyUse:
      "Debugging OAuth and API auth requires reading exp, iss, and scope claims quickly. Local decode avoids logging tokens in server access logs.",
    howToUse: [
      "Paste a JWT string (three dot-separated parts).",
      "Read decoded header algorithm and payload claims.",
      "Compare exp timestamp to current time for expiry bugs.",
      "Never treat decoded data as trusted without signature verification.",
    ],
    useCases: [
      "Inspect a staging access token from browser devtools.",
      "Teach JWT structure in security workshops.",
      "Check whether roles claim matches database groups.",
      "Confirm clock skew issues on exp and nbf fields.",
    ],
    supportedFormats: [
      "Base64URL-encoded JWT compact serialization",
      "JSON pretty-print for header and payload",
    ],
    privacy: PRIVACY,
    whatIs:
      "A JWT carries signed claims between parties. Decoding is not verification — anyone can read payload bytes if they have the string.",
    faqs: [
      {
        question: "Does this validate signatures?",
        answer:
          "No. Use your auth server or SDK with the secret or public key to verify.",
      },
      {
        question: "Is pasting production tokens safe here?",
        answer:
          "Decoding is local, but tokens are secrets — prefer staging tokens or redact.",
      },
      {
        question: "Why is my payload empty?",
        answer:
          "Malformed base64 or truncated strings fail decode — copy the entire token.",
      }
    ],
  },

  "url-encoder": {
    whatItDoes:
      "URL Encoder converts reserved characters in URLs and query values to percent-encoded form, and decodes encoded strings back to readable text.",
    whyUse:
      "Broken links often come from unencoded spaces or ampersands. Quick encode/decode fixes analytics tags and redirect builders.",
    howToUse: [
      "Choose encode or decode mode.",
      "Paste the full URL or a single component depending on guidance.",
      "Copy the result into your href or fetch call.",
      "Decode user-submitted query strings for debugging.",
    ],
    useCases: [
      "Encode a campaign utm_content with spaces.",
      "Fix plus-sign versus space ambiguity in forms.",
      "Decode redirect parameters in OAuth callbacks.",
      "Prepare filenames for CDN query parameters.",
    ],
    supportedFormats: [
      "UTF-8 percent-encoding",
      "Component vs full-URI modes if labeled",
    ],
    privacy: PRIVACY,
    howItWorks:
      "encodeURIComponent escapes all reserved characters except those allowed in components; decode reverses %XX hex bytes to UTF-8.",
    faqs: [
      {
        question: "Should I encode the whole URL?",
        answer:
          "Often only query values need encoding; encoding :// breaks the scheme.",
      },
      {
        question: "How are plus signs handled?",
        answer:
          "application/x-www-form-urlencoded treats + as space; raw URLs use %20.",
      },
      {
        question: "Does it support Unicode domains?",
        answer:
          "IDN punycode is separate; encode UTF-8 path segments as UTF-8 bytes.",
      }
    ],
  },

  "html-minifier": {
    whatItDoes:
      "HTML Minifier removes nonessential whitespace, comments, and optional optional tags from HTML markup to shrink template size for email and embedded widgets.",
    whyUse:
      "Every byte counts in inline email and single-file demos. Minification is a safe preview before bundler pipelines.",
    howToUse: [
      "Paste HTML including inline CSS or JS if needed.",
      "Toggle aggressive options like comment removal carefully.",
      "Copy minified output into your template host.",
      "Test rendering — minifiers can break whitespace-sensitive pre blocks.",
    ],
    useCases: [
      "Compress newsletter HTML under provider size caps.",
      "Prepare static landing snippets for CDN upload.",
      "Compare size before/after template refactors.",
      "Embed compact HTML in JSON config strings.",
    ],
    supportedFormats: [
      "HTML5 markup",
      "Optional comment and whitespace stripping",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Will minified HTML validate?",
        answer:
          "Structure should remain; validation depends on original markup quality.",
      },
      {
        question: "Does it obfuscate code?",
        answer:
          "It mainly removes whitespace; logic remains readable.",
      },
      {
        question: "Can it break inline scripts?",
        answer:
          "Avoid removing comments inside scripts that depend on line breaks — test thoroughly.",
      }
    ],
  },

  "css-minifier": {
    whatItDoes:
      "CSS Minifier compresses stylesheets by stripping comments, spaces, and redundant semicolons for production delivery.",
    whyUse:
      "Smaller CSS improves first paint on static sites without invoking Webpack for a one-off file.",
    howToUse: [
      "Paste CSS rules or an entire stylesheet.",
      "Run minify and note byte savings if displayed.",
      "Copy output to your production asset folder.",
      "Keep an unminified source file in version control.",
    ],
    useCases: [
      "Ship a single critical CSS block inline.",
      "Prepare theme overrides for embedded widgets.",
      "Benchmark size of utility-first generated CSS.",
      "Bundle legacy CSS before HTTP/2 push experiments.",
    ],
    supportedFormats: [
      "CSS3 syntax",
      "Minified single-line output",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Does it rename classes?",
        answer:
          "Basic minifiers do not shorten selectors unless configured for advanced modes.",
      },
      {
        question: "Are source maps generated?",
        answer:
          "Not typically — rely on original files for debugging.",
      },
      {
        question: "Can @media queries break?",
        answer:
          "Valid CSS stays valid; malformed input may concatenate rules wrongly.",
      }
    ],
  },

  "js-minifier": {
    whatItDoes:
      "JavaScript Minifier condenses JS source by removing comments and whitespace for lighter script tags and demo embeds.",
    whyUse:
      "Quick experiments and legacy pages benefit from smaller inline scripts without configuring Terser in a build chain.",
    howToUse: [
      "Paste JavaScript function or module code.",
      "Minify and scan output for missing semicolon issues.",
      "Test in browser console before deploying.",
      "Keep readable source separately for maintenance.",
    ],
    useCases: [
      "Shrink bookmarklet-style utilities.",
      "Embed config bootstrap scripts in static HTML.",
      "Compare gzip size after manual deduplication.",
      "Prepare code snippets for size-limited contests.",
    ],
    supportedFormats: [
      "ECMAScript syntax supported by the minifier engine",
      "Single-line output",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is this the same as uglifying?",
        answer:
          "Light minifiers may not mangle variable names; check options for mangle passes.",
      },
      {
        question: "Will TypeScript compile?",
        answer:
          "Paste compiled JS; TS types are not valid in runtime minifiers.",
      },
      {
        question: "Can minification introduce bugs?",
        answer:
          "ASI edge cases exist — always run tests after minifying.",
      }
    ],
  },
  "webp-to-jpg": {
    whatItDoes:
      "WebP to JPG decodes Google WebP photos and exports JPEG files your older tools, print shops, and CMS uploads accept.",
    whyUse:
      "WebP saves bandwidth but many desktop apps still expect JPG. Local conversion avoids emailing files to random online converters.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Submit listing photos to a JPG-only marketplace.",
      "Open WebP downloads in Photoshop versions without WebP.",
      "Attach product shots to email clients blocking WebP.",
    ],
    supportedFormats: [
      "WebP input",
      "JPEG output with quality control",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },

  "jpg-to-webp": {
    whatItDoes:
      "JPG to WebP re-encodes JPEG images into modern WebP for smaller page weight while you tune quality visually.",
    whyUse:
      "Serving WebP cuts bytes without rebuilding your whole asset pipeline — convert batches before deploy.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Shrink hero images for a static site.",
      "Convert blog inline photos before CDN upload.",
      "Preview WebP quality next to the JPG original.",
    ],
    supportedFormats: [
      "JPEG input",
      "WebP output",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },

  "avif-to-jpg": {
    whatItDoes:
      "AVIF to JPG transcodes AV1-based AVIF stills into JPEG for universal viewing on older Android and desktop apps.",
    whyUse:
      "AVIF excels at compression but support gaps remain. JPG export is the compatibility escape hatch.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Share phone AVIF shots with relatives on older PCs.",
      "Upload AVIF exports to JPG-only government portals.",
      "Insert AVIF assets into Word docs via JPG.",
    ],
    supportedFormats: [
      "AVIF input",
      "JPEG output",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },

  "avif-to-png": {
    whatItDoes:
      "AVIF to PNG converts AVIF images to lossless PNG when you need pixel-perfect edits or alpha in design tools.",
    whyUse:
      "PNG remains the lingua franca for editors expecting uncompressed RGBA buffers.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Pull AVIF marketing assets into Figma via PNG.",
      "Archive a lossless copy after AVIF delivery.",
      "Keep transparency when downstream tools lack AVIF.",
    ],
    supportedFormats: [
      "AVIF input",
      "PNG output",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },

  "svg-to-png": {
    whatItDoes:
      "SVG to PNG rasterizes scalable vector graphics to bitmap PNG at chosen width and height for non-vector hosts.",
    whyUse:
      "Slide decks, SMS previews, and some CMS fields reject SVG uploads but accept PNG.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Export logo PNGs for Instagram templates.",
      "Generate @2x icons from a single SVG master.",
      "Preview how thin strokes render when rasterized.",
    ],
    supportedFormats: [
      "SVG markup input",
      "PNG raster output at custom DPI/size",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },

  "png-to-ico": {
    whatItDoes:
      "PNG to ICO packs square PNG artwork into Windows ICO favicon files with multiple embedded sizes.",
    whyUse:
      "Browsers still request favicon.ico; ICO bundles 16×16 and 32×32 layers from one source image.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Refresh a site tab icon after rebranding.",
      "Produce favicon.ico for legacy IIS hosting.",
      "Bundle icons before deploying static HTML.",
    ],
    supportedFormats: [
      "PNG square logos recommended",
      "ICO multi-size output",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },

  "tiff-to-jpg": {
    whatItDoes:
      "TIFF to JPG compresses large TIFF scans and camera RAW-adjacent exports into shareable JPEG photos.",
    whyUse:
      "TIFF excels for archiving but is heavy for email; JPG is the pragmatic sharing format.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Email a scanned document page as JPG.",
      "Upload TIFF microscopy stills to JPG-only journals.",
      "Reduce attachment size for support tickets.",
    ],
    supportedFormats: [
      "TIFF input",
      "JPEG output with quality slider",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },

  "heic-to-jpg": {
    whatItDoes:
      "HEIC to JPG converts Apple HEIC photos from iPhones into JPEG images Windows and web forms recognize.",
    whyUse:
      "HEIC saves space on iOS but breaks many upload flows; JPG conversion fixes compatibility locally.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Upload iPhone photos to employer expense portals.",
      "Share vacation shots with friends on older Android.",
      "Print HEIC files at kiosks expecting JPG.",
    ],
    supportedFormats: [
      "HEIC/HEIF input",
      "JPEG output",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },

  "heic-to-png": {
    whatItDoes:
      "HEIC to PNG decodes iPhone HEIC captures into PNG for editors that need lossless RGB or alpha workflows.",
    whyUse:
      "PNG avoids another lossy generation when HEIC must become an editable intermediate.",
    howToUse: [
      "Drag or select the source image file supported by this converter.",
      "Adjust quality, size, or background options shown for the target format.",
      "Preview the output if the tool provides a side-by-side view.",
      "Download the converted file — it saves from browser memory, not a server.",
    ],
    useCases: [
      "Import HEIC into GIMP via PNG export.",
      "Preserve quality for meme templates before editing.",
      "Convert HEIC screenshots for documentation wikis.",
    ],
    supportedFormats: [
      "HEIC input",
      "PNG output",
    ],
    privacy: PRIVACY,
    howItWorks:
      "The browser reads the file with File API, decodes via canvas or WASM codecs, then encodes to the destination mime type without network upload.",
    faqs: [
      {
        question: "Is EXIF metadata kept?",
        answer:
          "Some conversions strip location EXIF for privacy; check tool notes if GPS preservation matters.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Limits come from device RAM; huge TIFFs may fail on low-memory phones.",
      },
      {
        question: "Does transparency survive?",
        answer:
          "JPG never keeps alpha; choose PNG or WebP when transparency matters.",
      }
    ],
  },
  "color-palette-generator": {
    whatItDoes:
      "Color Palette Generator builds sets of matching HEX and RGB colors from a base color, harmony rule, or uploaded swatch for UI and brand work.",
    whyUse:
      "Cohesive palettes speed design reviews. Generating five related colors beats eyedropping random Dribbble shots.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "Seed a Tailwind config with brand primaries.",
      "Find accent colors for a landing page hero.",
      "Explore complementary colors for infographic charts.",
    ],
    supportedFormats: [
      "HEX, RGB, HSL values",
      "CSS snippets",
    ],
    privacy: PRIVACY,
    formula:
      "Harmonies rotate hue on the HSL wheel: complementary = H+180°, triadic = H+120°/+240°.",
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "contrast-checker": {
    whatItDoes:
      "Contrast Checker computes WCAG 2.x contrast ratios between text and background colors and flags AA/AAA pass levels for normal and large text.",
    whyUse:
      "Low contrast fails accessibility audits and hurts readability in sunlight. Test before developers implement tokens.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "Validate button label color on brand blue.",
      "Check gray body text on off-white backgrounds.",
      "Prove compliance for government RFP designs.",
    ],
    supportedFormats: [
      "HEX, RGB, HSL values",
      "CSS snippets",
    ],
    privacy: PRIVACY,
    formula:
      "Contrast ratio = (Llighter + 0.05) ÷ (Ldarker + 0.05) using relative luminance.",
    faqs: [
      {
        question: "What ratio passes WCAG AA?",
        answer:
          "Normal text needs 4.5:1; large text (18pt+ or 14pt bold) needs 3:1.",
      },
      {
        question: "Does it simulate color blindness?",
        answer:
          "This tool focuses on contrast ratio; use a simulator separately for protanopia checks.",
      },
      {
        question: "Are alpha channels supported?",
        answer:
          "Flat colors work best; semi-transparent text on photos needs manual judgment.",
      }
    ],
  },

  "gradient-generator": {
    whatItDoes:
      "CSS Gradient Generator previews linear, radial, and conic gradients and outputs copy-ready background CSS for modern browsers.",
    whyUse:
      "Hand-writing gradient stops wastes time. Visual sliders show banding and angle mistakes immediately.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "Hero backgrounds for marketing sites.",
      "Subtle card borders with multi-stop linear gradients.",
      "Instagram story templates exported as CSS for web mirrors.",
    ],
    supportedFormats: [
      "HEX, RGB, HSL values",
      "CSS snippets",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "invoice-generator": {
    whatItDoes:
      "Invoice Generator fills a structured invoice template with your business details, line items, tax rate, and totals for PDF or print export.",
    whyUse:
      "Freelancers need professional invoices without monthly SaaS fees. Local generation keeps client PII off third-party servers.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "Bill a design project with milestone line items.",
      "Send NET-15 invoices to small business clients.",
      "Reissue a corrected invoice after a typo.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "receipt-generator": {
    whatItDoes:
      "Receipt Generator formats a proof-of-purchase receipt with items, subtotal, tax, payment method, and optional barcode placeholders.",
    whyUse:
      "Reimbursements and petty cash logs need readable receipts when originals were lost or digital-only.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "Document cash sales at a pop-up market.",
      "Provide donation receipts for informal fundraisers.",
      "Attach PDF receipts to expense reports.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "quote-generator": {
    whatItDoes:
      "Quote Generator produces estimate documents with scope description, itemized pricing, validity date, and acceptance footer language.",
    whyUse:
      "Speed wins jobs — send a polished quote the same day you site-visit without opening Word templates.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "HVAC install ballpark with optional upsells.",
      "Photography package tiers on one quote.",
      "Construction change-order pricing before contract amendment.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "signature-generator": {
    whatItDoes:
      "Signature Generator lets you draw with mouse or stylus or type a cursive name, then export a PNG signature with transparent background.",
    whyUse:
      "PDF forms and DocuSign alternatives often need a raster signature asset you control.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "Sign freelance contracts exported to PDF.",
      "Create a consistent signature for scanned forms.",
      "Build a lightweight signature PNG for slide decks.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "email-signature-generator": {
    whatItDoes:
      "Email Signature Generator assembles name, role, phone, social icons, and disclaimer into HTML suitable for Gmail and Outlook signature settings.",
    whyUse:
      "Consistent email branding looks professional; HTML tables still dominate mail client rendering quirks.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "Onboard new hires with a standard corporate footer.",
      "Add campaign banners below legal disclaimers.",
      "Switch offices and update phone numbers once centrally.",
    ],
    supportedFormats: [
      "HTML signature blocks",
      "Plain-text fallback lines",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "meme-generator": {
    whatItDoes:
      "Meme Generator overlays classic top and bottom Impact-style captions on your uploaded image and exports shareable JPEG or PNG memes.",
    whyUse:
      "Quick memes for community managers should not require Photoshop for every joke.",
    howToUse: [
      "Enter required fields or pick colors on the visual controls.",
      "Adjust advanced options like tax rate, angle, or font size.",
      "Preview the result pane or live CSS output.",
      "Copy, download, or print according to the tool’s export buttons.",
    ],
    useCases: [
      "React to product launch news on social.",
      "Internal Slack humor with company inside jokes.",
      "Teaching internet culture with labeled examples.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "printable-calendar": {
    whatItDoes:
      "Printable Calendar Maker renders any month or year grid with optional notes and holidays for home or office printing.",
    whyUse:
      "Physical calendars still anchor family logistics and shop floor planning when digital notifications get ignored.",
    howToUse: [
      "Select month, year, or layout preset shown on the page.",
      "Toggle holidays or notes sections if available.",
      "Preview the grid for correct weekday alignment.",
      "Print from the browser dialog or save as PDF.",
    ],
    useCases: [
      "Kitchen fridge monthly planner.",
      "Warehouse shift tracking with handwritten notes.",
      "Classroom wall calendar students mark up.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "printable-calendar-2026": {
    whatItDoes:
      "Printable Calendar 2026 delivers ready-to-print 2026 monthly or yearly layouts with correct weekday alignment for the entire year.",
    whyUse:
      "Year-specific files save setup time — no manual date math for January 1 landing on Thursday 2026.",
    howToUse: [
      "Select month, year, or layout preset shown on the page.",
      "Toggle holidays or notes sections if available.",
      "Preview the grid for correct weekday alignment.",
      "Print from the browser dialog or save as PDF.",
    ],
    useCases: [
      "Annual planning binder for small business.",
      "Gift a printed calendar to grandparents.",
      "Track 2026 fitness streaks on paper.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "printable-calendar-2027": {
    whatItDoes:
      "Printable Calendar 2027 provides full-year 2027 calendar pages formatted for letter or A4 printers directly from the browser.",
    whyUse:
      "Long-range planning for fiscal 2027 and school years benefits from a trustworthy pre-built grid.",
    howToUse: [
      "Select month, year, or layout preset shown on the page.",
      "Toggle holidays or notes sections if available.",
      "Preview the grid for correct weekday alignment.",
      "Print from the browser dialog or save as PDF.",
    ],
    useCases: [
      "Conference planning across 2027 quarters.",
      "Vacation accrual tracking for HR.",
      "Wall calendar mockups before commercial print orders.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "printable-calendar-january-2027": {
    whatItDoes:
      "January 2027 Printable Calendar is a single-month sheet starting Friday, January 1, 2027, with space for goals and reminders.",
    whyUse:
      "Single-month prints fit planners and bullet journals better than shrinking a full year onto one page.",
    howToUse: [
      "Select month, year, or layout preset shown on the page.",
      "Toggle holidays or notes sections if available.",
      "Preview the grid for correct weekday alignment.",
      "Print from the browser dialog or save as PDF.",
    ],
    useCases: [
      "New Year resolution habit tracker.",
      "January billing close checklist.",
      "School semester syllabus pacing.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "printable-calendar-february-2027": {
    whatItDoes:
      "February 2027 Printable Calendar covers 28 days in a clean grid — February 2027 is not a leap year — plus notes margin.",
    whyUse:
      "Short months need layouts that do not waste paper; dedicated February pages omit blank leap day rows.",
    howToUse: [
      "Select month, year, or layout preset shown on the page.",
      "Toggle holidays or notes sections if available.",
      "Preview the grid for correct weekday alignment.",
      "Print from the browser dialog or save as PDF.",
    ],
    useCases: [
      "Valentine event planning for venues.",
      "Tax document gathering deadlines.",
      "Winter sports practice schedules.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "printable-calendar-march-2027": {
    whatItDoes:
      "March 2027 Printable Calendar spans 31 days with daylight-saving awareness notes for regions that spring forward in March.",
    whyUse:
      "Spring scheduling bursts with sports and school events; a dedicated March page keeps March madness visible.",
    howToUse: [
      "Select month, year, or layout preset shown on the page.",
      "Toggle holidays or notes sections if available.",
      "Preview the grid for correct weekday alignment.",
      "Print from the browser dialog or save as PDF.",
    ],
    useCases: [
      "NCAA bracket office pool dates.",
      "Garden planting reminders in temperate zones.",
      "Quarter-end sales sprint milestones.",
    ],
    supportedFormats: [
      "Form fields and line items",
      "PDF or PNG export typical",
    ],
    privacy: PRIVACY,
    faqs: [
      {
        question: "Is my input uploaded?",
        answer:
          "No. Processing happens in your browser; nothing is sent to our servers.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes. Modern mobile browsers support the same client-side features, though very large inputs may feel slower.",
      },
      {
        question: "Does this work offline?",
        answer:
          "After the page loads once, many tools continue to work offline until you refresh.",
      }
    ],
  },

  "image-to-text": {
    whatItDoes:
      "Image to Text OCR reads visible characters from uploaded photos, scans, and screenshots using in-browser optical character recognition.",
    whyUse:
      "Retyping screenshots wastes time and introduces errors. Local OCR helps when cloud APIs are blocked by policy.",
    howToUse: [
      "Upload a clear photo or screenshot with readable text.",
      "Choose language if OCR supports multiple models.",
      "Run recognition and review text in the editable output box.",
      "Copy corrected text into your document or spreadsheet.",
    ],
    useCases: [
      "Copy text from a photo of a whiteboard.",
      "Digitize a printed page without a scanner driver.",
      "Grab serial numbers from product label photos.",
    ],
    supportedFormats: [
      "PNG, JPEG, or WebP images",
      "UTF-8 text output",
    ],
    privacy: PRIVACY_WASM,
    howItWorks:
      "WASM or browser OCR models detect glyphs, segment lines, and return UTF-8 text you can edit before copying.",
    faqs: [
      {
        question: "Will handwriting OCR work?",
        answer:
          "Printed text works best; cursive may produce errors you must fix manually.",
      },
      {
        question: "Are files uploaded?",
        answer:
          "Recognition runs locally with WASM where noted; images stay on your device.",
      },
      {
        question: "Which languages are supported?",
        answer:
          "Depends on bundled models — pick the closest language for best accuracy.",
      }
    ],
  },
  "tdee-calculator": {
    whatItDoes:
      "TDEE Calculator estimates how many calories you burn per day including exercise and daily movement, starting from BMR and activity multipliers.",
    whyUse:
      "Calorie targets for fat loss or muscle gain need TDEE, not guesswork from generic 2000-calorie labels.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Set a 300-calorie deficit for sustainable weight loss.",
      "Fuel marathon training weeks without undereating.",
      "Compare sedentary vs active job TDEE side by side.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "TDEE ≈ BMR × activity factor (e.g. 1.2 sedentary up to 1.9 very active).",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "bmr-calculator": {
    whatItDoes:
      "BMR Calculator computes resting energy burn using height, weight, age, and sex with established predictive equations.",
    whyUse:
      "Knowing BMR separates baseline metabolism from exercise calories when interpreting smart scale trends.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Explain why taller friends eat more at maintenance.",
      "Baseline before thyroid conversations with clinicians.",
      "Teaching nutrition units the difference BMR vs TDEE.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Mifflin-St Jeor (example): BMR = 10×kg + 6.25×cm − 5×age + s (s = +5 male, −161 female).",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "macro-calculator": {
    whatItDoes:
      "Macro Calculator divides your calorie target into daily protein, carb, and fat grams based on chosen percentage splits or bodyweight rules.",
    whyUse:
      "Hitting protein grams preserves muscle in a cut; macro splits make meal prep measurable.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "High-protein cut at 40/30/30 macros.",
      "Keto split with capped carbs under 50 g.",
      "Athlete bulk emphasizing 1.8 g protein per kg.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Protein/carb grams ×4 cal/g; fat grams ×9 cal/g; sum ≈ daily calories.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "due-date-calculator": {
    whatItDoes:
      "Due Date Calculator estimates pregnancy due date from the first day of last menstrual period or known conception date using typical 280-day gestation.",
    whyUse:
      "Early dating ultrasounds refine dates, but LMP math gives a starting point for prenatal scheduling.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Plan maternity leave start windows.",
      "Schedule anatomy scan around recommended weeks.",
      "Compare LMP-based date vs IVF transfer date inputs.",
    ],
    supportedFormats: [
      "Dates in local calendar",
      "LMP or conception inputs",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Due date ≈ LMP + 280 days (40 weeks) for standard Naegele’s rule estimate.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "concrete-calculator": {
    whatItDoes:
      "Concrete Calculator converts slab length, width, and thickness into cubic yards and common 60/80 lb bag counts for small pours.",
    whyUse:
      "Ordering one extra yard is expensive; short pours fail structurally. Measure twice, calculate once.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Backyard patio 12×16 ft at 4 in thick.",
      "Fence post holes aggregated by diameter and depth.",
      "Compare truck delivery vs bag mix for a walkway.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Volume = length × width × thickness (feet) ÷ 27 = cubic yards.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "square-footage-calculator": {
    whatItDoes:
      "Square Footage Calculator totals area in square feet for rectangles, multiple rooms, or L-shaped layouts you enter as dimensions.",
    whyUse:
      "Flooring quotes, paint estimates, and rental listings all reference square footage — errors cost money.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Sum living room and hallway for laminate order.",
      "Verify landlord-listed apartment size.",
      "Estimate HVAC BTU needs from conditioned area.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Area = length × width; sum rooms for total ft².",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "roof-pitch-calculator": {
    whatItDoes:
      "Roof Pitch Calculator translates rise and run (such as 4:12) into slope degrees, percent grade, and rafter ratio helpers.",
    whyUse:
      "Roofers and DIYers speak in pitch language; degrees help with safety harness and material slope limits.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Check if metal roofing minimum pitch is met.",
      "Convert blueprint pitch notation to degrees.",
      "Estimate roof surface area multiplier from pitch.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Pitch angle = arctan(rise ÷ run); percent slope = (rise ÷ run) × 100.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "deck-calculator": {
    whatItDoes:
      "Deck Calculator estimates decking boards, joists, and spacing from deck footprint and board width assumptions.",
    whyUse:
      "Home stores sell lumber in standard lengths; planning reduces cuts and mid-build lumber runs.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "12×20 ft ground-level deck board count.",
      "Plan 16 in on-center joists for composite decking.",
      "Budget screws and hidden fasteners from square footage.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Board rows ≈ deck width ÷ (board width + gap); length coverage from deck length.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "mulch-calculator": {
    whatItDoes:
      "Mulch Calculator converts bed dimensions and desired depth in inches into cubic yards or bag counts for landscape mulch.",
    whyUse:
      "Bulk mulch is sold by the yard; guessing leads to thin coverage or expensive extra deliveries.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Refresh 3-inch depth on a 40×6 ft shrub bed.",
      "Compare rubber vs wood mulch volume needs.",
      "School garden paths with irregular rectangles split into blocks.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Volume (yd³) = (length × width × depth in ft) ÷ 27.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "paint-calculator": {
    whatItDoes:
      "Paint Calculator estimates gallons from wall and ceiling square footage, coats, and typical spread rate per gallon.",
    whyUse:
      "Running out mid-room delays projects; buying extra gallons wastes money on custom colors.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Two-coat refresh of a 12×14 bedroom.",
      "Exclude windows and doors if fields allow.",
      "Primer plus topcoat gallon totals.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Gallons ≈ (total ft² × coats) ÷ coverage ft²/gal.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "tile-calculator": {
    whatItDoes:
      "Tile Calculator counts tiles needed for floor or wall area including grout width and breakage waste percentage.",
    whyUse:
      "Tile lots vary in dye lot; ordering enough upfront avoids mismatched patch jobs.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Subway backsplash 8 ft wide × 18 in tall.",
      "12×24 floor tile with 3 mm grout lines.",
      "Add 10% waste for diagonal layouts.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Tiles ≈ ceil(area ÷ effective tile area with grout) × (1 + waste%).",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "fence-calculator": {
    whatItDoes:
      "Fence Calculator estimates posts, rails, pickets, or panels from linear feet, post spacing, and fence height.",
    whyUse:
      "Material lists prevent halfway installs when lumber sales close early.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "6 ft privacy fence around 120 ft perimeter.",
      "Split rail pasture fence with 10 ft post spacing.",
      "Gate opening subtraction from panel counts.",
    ],
    supportedFormats: [
      "Feet, inches, pounds, or metric equivalents",
      "Numeric results with units",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Posts ≈ (length ÷ spacing) + 1; pickets depend on style width and overlap.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "paycheck-calculator": {
    whatItDoes:
      "Paycheck Calculator approximates net pay from gross wages, pay frequency, filing status, and common pre-tax deductions.",
    whyUse:
      "Job offer letters show gross salary; take-home determines rent and loan affordability.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Compare biweekly vs semi-monthly net deposits.",
      "See impact of 401(k) percentage on cash flow.",
      "Estimate first paycheck after a state move.",
    ],
    supportedFormats: [
      "USD currency amounts",
      "Percent fee tables approximate official schedules",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Net ≈ gross − federal withholding − FICA − state/local − pre-tax benefits (simplified tables).",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "etsy-fee-calculator": {
    whatItDoes:
      "Etsy Fee Calculator totals listing, transaction, payment processing, and optional offsite ads fees for a target sale price.",
    whyUse:
      "Handmade pricing must cover fees plus materials; underestimating Etsy cuts erodes margin.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Price a $38 mug to keep 30% margin after fees.",
      "Compare free shipping absorbed vs separate shipping line.",
      "Model holiday sale discounts net revenue.",
    ],
    supportedFormats: [
      "USD currency amounts",
      "Percent fee tables approximate official schedules",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Net ≈ sale + shipping − (listing + % transaction + processing + ads).",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "amazon-fba-fee-calculator": {
    whatItDoes:
      "Amazon FBA Fee Calculator estimates fulfillment, storage, and referral fees using product size tier, weight, and category percentage.",
    whyUse:
      "FBA fees change with dimensions; skinny profit SKUs become losers after fulfillment surcharges.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Compare small standard vs large standard tier.",
      "Check if bundling lowers per-unit FBA cost.",
      "Evaluate price point after 15% referral fee category.",
    ],
    supportedFormats: [
      "USD currency amounts",
      "Percent fee tables approximate official schedules",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Net ≈ price − referral % − FBA fulfillment − storage (monthly est.).",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "ebay-fee-calculator": {
    whatItDoes:
      "eBay Fee Calculator applies final value fees, per-order fees, and promoted listing percentages to item and shipping amounts.",
    whyUse:
      "Collectibles sellers stack promotions; fee math clarifies whether auction vs Buy It Now wins.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Net from a $250 vintage camera with 12% FVF.",
      "Add international fee surcharge estimates.",
      "Promoted listing 2% on top of standard fees.",
    ],
    supportedFormats: [
      "USD currency amounts",
      "Percent fee tables approximate official schedules",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Net ≈ total paid − final value % − fixed per order − promos.",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },

  "paypal-fee-calculator": {
    whatItDoes:
      "PayPal Fee Calculator computes domestic and cross-border processing percentages plus fixed cents per transaction.",
    whyUse:
      "Freelancers quoting fixed project fees need to gross-up so PayPal fees do not eat intended income.",
    howToUse: [
      "Enter measurements or body stats in the units shown (toggle ft/in vs metric if available).",
      "Select presets such as activity level, fee tier, or coat count.",
      "Submit or live-update to refresh results.",
      "Write down outputs with a margin buffer for waste, taxes, or medical variance.",
    ],
    useCases: [
      "Invoice $1000 so net after 2.9% + fixed meets goal.",
      "Compare Goods and Services vs Friends protection tradeoffs externally.",
      "Micropayment pricing for small digital goods.",
    ],
    supportedFormats: [
      "USD currency amounts",
      "Percent fee tables approximate official schedules",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Formulas apply standard published equations or fee schedules in client-side JavaScript — not personalized medical or tax advice.",
    formula:
      "Fee ≈ amount × percentage + fixed; net = amount − fee (mode dependent).",
    faqs: [
      {
        question: "Is this medical or tax advice?",
        answer:
          "No. Due dates, TDEE, and paycheck outputs are estimates; consult clinicians, IRS guidance, or payroll for official figures.",
      },
      {
        question: "Do marketplace fees change?",
        answer:
          "Platforms update fee tables; treat results as planning approximations and verify on seller dashboards.",
      },
      {
        question: "Should I add waste factor?",
        answer:
          "Yes for concrete, tile, and mulch — many pros add 5–10% beyond raw calculator output.",
      }
    ],
  },
  "video-to-mp3": {
    whatItDoes:
      "Video to MP3 extracts the audio track from common video containers and encodes an MP3 you can download, using in-browser demux and encode libraries.",
    whyUse:
      "Podcasters and editors need quick audio pulls without installing ffmpeg CLI or uploading sensitive footage.",
    howToUse: [
      "Choose a video or audio file within stated size limits.",
      "Wait for WASM modules to finish loading if a progress bar appears.",
      "Adjust trim, quality, or encode options before starting.",
      "Download the output file created in memory — nothing is stored on our servers.",
    ],
    useCases: [
      "Pull interview audio from a Zoom MP4 recording.",
      "Save a concert clip soundtrack as MP3 for personal playlist.",
      "Extract narration from screen recordings for transcription tools.",
    ],
    supportedFormats: [
      "MP4 and common video containers",
      "MP3 or compressed audio output",
    ],
    privacy: PRIVACY_WASM,
    howItWorks:
      "ffmpeg.wasm or similar decodes media in WebAssembly workers, encodes output, and hands you a Blob URL for download.",
    faqs: [
      {
        question: "Why is encoding slow?",
        answer:
          "WASM lacks GPU acceleration on many browsers; shorter clips encode faster.",
      },
      {
        question: "Is my video uploaded?",
        answer:
          "No. Bytes stay in memory on your device during processing.",
      },
      {
        question: "What file size works?",
        answer:
          "Large files may exceed mobile RAM; try trimming first or use desktop Chrome.",
      }
    ],
  },

  "mp4-to-mp3": {
    whatItDoes:
      "MP4 to MP3 focuses on H.264/AAC MP4 files, exporting MP3 audio compatible with older car stereos and editors.",
    whyUse:
      "MP4 is ubiquitous from phones; MP3 remains the lowest-friction share format.",
    howToUse: [
      "Choose a video or audio file within stated size limits.",
      "Wait for WASM modules to finish loading if a progress bar appears.",
      "Adjust trim, quality, or encode options before starting.",
      "Download the output file created in memory — nothing is stored on our servers.",
    ],
    useCases: [
      "Convert phone video memos to audio notes.",
      "Create MP3 ringtones from MP4 snippets.",
      "Shrink library size when video picture is unnecessary.",
    ],
    supportedFormats: [
      "MP4 and common video containers",
      "MP3 or compressed audio output",
    ],
    privacy: PRIVACY_WASM,
    howItWorks:
      "ffmpeg.wasm or similar decodes media in WebAssembly workers, encodes output, and hands you a Blob URL for download.",
    faqs: [
      {
        question: "Why is encoding slow?",
        answer:
          "WASM lacks GPU acceleration on many browsers; shorter clips encode faster.",
      },
      {
        question: "Is my video uploaded?",
        answer:
          "No. Bytes stay in memory on your device during processing.",
      },
      {
        question: "What file size works?",
        answer:
          "Large files may exceed mobile RAM; try trimming first or use desktop Chrome.",
      }
    ],
  },

  "video-compressor": {
    whatItDoes:
      "Video Compressor re-encodes video with lower resolution or bitrate targets to shrink file size for email and messaging limits.",
    whyUse:
      "Cloud transcoders queue and privacy-policy your footage; local compression keeps drafts private.",
    howToUse: [
      "Choose a video or audio file within stated size limits.",
      "Wait for WASM modules to finish loading if a progress bar appears.",
      "Adjust trim, quality, or encode options before starting.",
      "Download the output file created in memory — nothing is stored on our servers.",
    ],
    useCases: [
      "Compress demo reels under 25 MB email caps.",
      "Reduce 4K screen recordings to 1080p client updates.",
      "Preview quality steps before batch exporting.",
    ],
    supportedFormats: [
      "MP4 and common video containers",
      "MP3 or compressed audio output",
    ],
    privacy: PRIVACY_WASM,
    howItWorks:
      "ffmpeg.wasm or similar decodes media in WebAssembly workers, encodes output, and hands you a Blob URL for download.",
    faqs: [
      {
        question: "Why is encoding slow?",
        answer:
          "WASM lacks GPU acceleration on many browsers; shorter clips encode faster.",
      },
      {
        question: "Is my video uploaded?",
        answer:
          "No. Bytes stay in memory on your device during processing.",
      },
      {
        question: "What file size works?",
        answer:
          "Large files may exceed mobile RAM; try trimming first or use desktop Chrome.",
      }
    ],
  },

  "audio-cutter": {
    whatItDoes:
      "Audio Cutter loads audio files, shows a timeline, and exports only the selected start/end region as a new clip.",
    whyUse:
      "Full DAW installs are heavy when you only need to trim intro silence on one podcast episode.",
    howToUse: [
      "Choose a video or audio file within stated size limits.",
      "Wait for WASM modules to finish loading if a progress bar appears.",
      "Adjust trim, quality, or encode options before starting.",
      "Download the output file created in memory — nothing is stored on our servers.",
    ],
    useCases: [
      "Remove dead air at start of voice memos.",
      "Extract a quote from a long MP3 interview.",
      "Loop a short sfx segment for game prototyping.",
    ],
    supportedFormats: [
      "MP4 and common video containers",
      "MP3 or compressed audio output",
    ],
    privacy: PRIVACY_WASM,
    howItWorks:
      "ffmpeg.wasm or similar decodes media in WebAssembly workers, encodes output, and hands you a Blob URL for download.",
    faqs: [
      {
        question: "Why is encoding slow?",
        answer:
          "WASM lacks GPU acceleration on many browsers; shorter clips encode faster.",
      },
      {
        question: "Is my video uploaded?",
        answer:
          "No. Bytes stay in memory on your device during processing.",
      },
      {
        question: "What file size works?",
        answer:
          "Large files may exceed mobile RAM; try trimming first or use desktop Chrome.",
      }
    ],
  },

  "device-test-mic": {
    whatItDoes:
      "Microphone Test listens to your selected input device and displays level meters so you can confirm gain, mute switches, and USB headset routing before calls.",
    whyUse:
      "‘Can you hear me?’ delays ruin interviews; thirty seconds of local testing fixes wrong default devices.",
    howToUse: [
      "Allow browser permissions when prompted for mic or camera.",
      "Select the correct device from dropdown if multiple exist.",
      "Perform the action (speak, press keys, click) while watching indicators.",
      "Fix OS settings if no signal appears, then refresh and retest.",
    ],
    useCases: [
      "Verify Bluetooth headset mic vs laptop array.",
      "Check streaming mic gain before going live.",
      "Confirm browser permission after OS privacy update.",
    ],
    supportedFormats: [
      "System audio input devices",
      "Level meter visualization",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Device tests use WebRTC getUserMedia or DOM keyboard events entirely client-side.",
    faqs: [
      {
        question: "Why is permission denied?",
        answer:
          "Check OS privacy toggles and browser site settings, then reload.",
      },
      {
        question: "Is AV recorded?",
        answer:
          "Mic and webcam tests stream locally unless you explicitly record elsewhere.",
      },
      {
        question: "Can I use on phone?",
        answer:
          "Yes for many tests; CPS and keyboard tests suit desktop best.",
      }
    ],
  },

  "device-test-webcam": {
    whatItDoes:
      "Webcam Test opens a live preview from your chosen camera at reported resolution so you can adjust lighting, focus, and framing.",
    whyUse:
      "Blurred or dark video undermines presentations; preview catches cover stickers and wrong camera selection.",
    howToUse: [
      "Allow browser permissions when prompted for mic or camera.",
      "Select the correct device from dropdown if multiple exist.",
      "Perform the action (speak, press keys, click) while watching indicators.",
      "Fix OS settings if no signal appears, then refresh and retest.",
    ],
    useCases: [
      "Test 1080p vs 720p actual output on cheap webcams.",
      "Frame whiteboard area before training webinar.",
      "Confirm external DSLR capture card feed.",
    ],
    supportedFormats: [
      "USB and built-in cameras",
      "Live preview stream",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Device tests use WebRTC getUserMedia or DOM keyboard events entirely client-side.",
    faqs: [
      {
        question: "Why is permission denied?",
        answer:
          "Check OS privacy toggles and browser site settings, then reload.",
      },
      {
        question: "Is AV recorded?",
        answer:
          "Mic and webcam tests stream locally unless you explicitly record elsewhere.",
      },
      {
        question: "Can I use on phone?",
        answer:
          "Yes for many tests; CPS and keyboard tests suit desktop best.",
      }
    ],
  },

  "device-test-keyboard": {
    whatItDoes:
      "Keyboard Test highlights each key on a virtual layout when pressed, exposing stuck keys, missed registrations, and layout mismatches.",
    whyUse:
      "Return windows close fast; documenting dead keys with an on-screen map helps RMA claims.",
    howToUse: [
      "Allow browser permissions when prompted for mic or camera.",
      "Select the correct device from dropdown if multiple exist.",
      "Perform the action (speak, press keys, click) while watching indicators.",
      "Fix OS settings if no signal appears, then refresh and retest.",
    ],
    useCases: [
      "Test new mechanical keyboard for chatter.",
      "Verify UK vs US layout after laptop swap.",
      "Check function keys on compact 60% boards.",
    ],
    supportedFormats: [
      "Physical key events",
      "QWERTY layout visualization",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Device tests use WebRTC getUserMedia or DOM keyboard events entirely client-side.",
    faqs: [
      {
        question: "Why is permission denied?",
        answer:
          "Check OS privacy toggles and browser site settings, then reload.",
      },
      {
        question: "Is AV recorded?",
        answer:
          "Mic and webcam tests stream locally unless you explicitly record elsewhere.",
      },
      {
        question: "Can I use on phone?",
        answer:
          "Yes for many tests; CPS and keyboard tests suit desktop best.",
      }
    ],
  },

  "device-test-cps": {
    whatItDoes:
      "CPS Test counts mouse or touchpad clicks over 1, 5, or 10 second windows to benchmark clicking speed for games.",
    whyUse:
      "Butterfly clicking practice needs repeatable timers; local tests avoid sketchy download macros.",
    howToUse: [
      "Select test duration (1s, 5s, etc.).",
      "Click the target area as fast as possible when the timer starts.",
      "Read CPS score and retry for personal best.",
      "Use the same mouse and surface for comparable runs.",
    ],
    useCases: [
      "Baseline CPS before Minecraft PvP practice.",
      "Compare palm grip vs fingertip clicking.",
      "Friendly classroom competition with timer on projector.",
    ],
    supportedFormats: [
      "Mouse button clicks",
      "Timed CPS score",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Device tests use WebRTC getUserMedia or DOM keyboard events entirely client-side.",
    faqs: [
      {
        question: "Why is permission denied?",
        answer:
          "Check OS privacy toggles and browser site settings, then reload.",
      },
      {
        question: "Is AV recorded?",
        answer:
          "Mic and webcam tests stream locally unless you explicitly record elsewhere.",
      },
      {
        question: "Can I use on phone?",
        answer:
          "Yes for many tests; CPS and keyboard tests suit desktop best.",
      }
    ],
  },

  "device-test-dead-pixel": {
    whatItDoes:
      "Dead Pixel Test cycles fullscreen red, green, blue, black, and white to reveal dead pixels (always dark) or stuck pixels (fixed color).",
    whyUse:
      "Manufacturers accept returns only with documented defects; solid fills make tiny dots obvious.",
    howToUse: [
      "Enter fullscreen or maximize the test area.",
      "Tap or click to cycle solid test colors across the screen.",
      "Inspect edges and center for dark or stuck dots.",
      "Exit fullscreen and note pixel locations for warranty photos.",
    ],
    useCases: [
      "Inspect new 27 in monitor during return period.",
      "Check used phone OLED before paying cash.",
      "Projector color uniformity spot check.",
    ],
    supportedFormats: [
      "Fullscreen color fills",
      "Manual pixel inspection",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Device tests use WebRTC getUserMedia or DOM keyboard events entirely client-side.",
    faqs: [
      {
        question: "Why is permission denied?",
        answer:
          "Check OS privacy toggles and browser site settings, then reload.",
      },
      {
        question: "Is AV recorded?",
        answer:
          "Mic and webcam tests stream locally unless you explicitly record elsewhere.",
      },
      {
        question: "Can I use on phone?",
        answer:
          "Yes for many tests; CPS and keyboard tests suit desktop best.",
      }
    ],
  },

  "device-test-pack": {
    whatItDoes:
      "Device Test Pack links microphone, webcam, keyboard, CPS, and dead-pixel tools so you can run a pre-flight checklist from one page.",
    whyUse:
      "Remote workers benefit from a repeatable hardware routine before quarterly reviews or sales demos.",
    howToUse: [
      "Allow browser permissions when prompted for mic or camera.",
      "Select the correct device from dropdown if multiple exist.",
      "Perform the action (speak, press keys, click) while watching indicators.",
      "Fix OS settings if no signal appears, then refresh and retest.",
    ],
    useCases: [
      "Monday morning standup hardware check.",
      "Student laptop verification before online exam.",
      "Streamer setup validation after moving desk.",
    ],
    supportedFormats: [
      "Fullscreen color fills",
      "Manual pixel inspection",
    ],
    privacy: PRIVACY,
    howItWorks:
      "Device tests use WebRTC getUserMedia or DOM keyboard events entirely client-side.",
    faqs: [
      {
        question: "Do I run all tests in order?",
        answer:
          "Recommended but optional — each linked tool opens its own page or section.",
      },
      {
        question: "Are results saved?",
        answer:
          "Generally no; screenshots are yours to keep for support tickets.",
      },
      {
        question: "Does pack replace manufacturer diagnostics?",
        answer:
          "No. Use vendor tools for RMA-grade reports.",
      }
    ],
  },
  "image-converter": {
    whatItDoes: `Image Converter changes pictures between PNG, JPEG, and WebP without installing software. Conversion happens on your device so you can prepare assets for websites, email, or social posts quickly.`,
    whyUse: `Websites, email clients, and social platforms prefer different image formats. Converting locally means you can ship PNG for graphics with transparency, JPEG for photos, or WebP for faster pages — without waiting on uploads or worrying about a remote service storing your assets.`,
    howToUse: [
      `Upload one or more images by dragging them in or choosing files.`,
      `Select the output format (PNG, JPEG, or WebP).`,
      `Adjust quality if available, then convert.`,
      `Download the converted file(s).`,
    ],
    useCases: [
      `Prepare product photos as WebP for a storefront while keeping PNG masters for print.`,
      `Convert screenshots to JPEG before attaching them to size-limited email threads.`,
      `Batch-convert icons and UI assets when a CMS only accepts a specific format.`,
      `Turn client deliverables into the format your design tool opens most reliably.`,
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
    whyUse: `Large images slow pages, burn mobile data, and get rejected by upload forms. Compressing in the browser lets you hit size limits while previewing quality tradeoffs before you publish.`,
    howToUse: [
      `Upload an image.`,
      `Adjust the quality slider and preview the result.`,
      `Compare original vs compressed size.`,
      `Download the compressed image when you are happy with the tradeoff.`,
    ],
    useCases: [
      `Shrink hero images so a landing page passes Core Web Vitals budgets.`,
      `Reduce photo attachments so they fit help-desk or ticket upload caps.`,
      `Compress portfolio shots for a personal site without visible banding.`,
      `Prepare social posts that look sharp but stay under platform size limits.`,
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
    whyUse: `Exact dimensions matter for avatars, ad slots, thumbnails, and print specs. Resizing in-browser avoids round-trips to cloud editors and keeps originals on your device until you download the result.`,
    howToUse: [
      `Upload an image.`,
      `Enter width and height in pixels, or choose a percentage scale.`,
      `Keep aspect ratio locked if you want proportional resizing.`,
      `Download the resized image.`,
    ],
    useCases: [
      `Create 1:1 profile photos for apps that reject oversized uploads.`,
      `Downscale camera photos for slideshows that stutter on large files.`,
      `Match banner pixel sizes required by ad networks or newsletter tools.`,
      `Scale screenshots to a consistent width for documentation sites.`,
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
    whyUse: `Cropping removes distractions and frames the subject for the medium you are publishing to. Doing it locally is faster than opening a full editor when you only need a clean rectangle or circle.`,
    howToUse: [
      `Upload an image.`,
      `Choose a rectangular or circular crop area and drag to adjust.`,
      `Confirm the crop.`,
      `Download the cropped result.`,
    ],
    useCases: [
      `Cut a circular avatar from a group photo for a team directory.`,
      `Trim whiteboard photos so slides focus on the diagram, not the wall.`,
      `Create square thumbnails for marketplace listings.`,
      `Remove letterboxing from screenshots before sharing in chat.`,
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
    whyUse: `Design specs call for 16:9, 4:3, 1:1, and other frames. Knowing an image’s true ratio and closest standard saves trial-and-error cropping and prevents stretched media.`,
    howToUse: [
      `Upload an image.`,
      `Review pixel dimensions, aspect ratio, and orientation.`,
      `Note the closest common ratio if you need a standard frame.`,
    ],
    useCases: [
      `Check whether a photo will fit a YouTube thumbnail template.`,
      `Confirm orientation before sending assets to a printer.`,
      `Match blog featured-image requirements without guessing.`,
      `Audit a folder of exports to see which shots need reframing.`,
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
    whyUse: `Transparent cutouts make products, stickers, and profile subjects drop cleanly onto new backgrounds. A browser tool with tolerance controls is ideal for solid studio backdrops when you do not need a full AI suite.`,
    howToUse: [
      `Upload an image with a relatively plain background.`,
      `Adjust tolerance and edge softness until the background clears.`,
      `Preview the transparent result.`,
      `Download a PNG with transparency.`,
    ],
    useCases: [
      `Isolate a product on white for an ecommerce catalog.`,
      `Create sticker-style PNGs for presentations and thumbnails.`,
      `Remove a plain wall behind a headshot for a site hero.`,
      `Prep layered graphics for Canva or Figma imports.`,
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
    whyUse: `Browsers and devices expect multiple favicon sizes plus a manifest. Generating a full package from one image, text, or emoji saves hours of manual export work.`,
    howToUse: [
      `Choose image, text, or emoji as the source.`,
      `Customize colors and appearance as needed.`,
      `Generate the favicon package.`,
      `Download the ZIP and add the files to your website.`,
    ],
    useCases: [
      `Launch a new brand mark across desktop tabs and mobile home screens.`,
      `Refresh an old ICO set when you rebrand colors.`,
      `Ship an emoji favicon for a playful side project.`,
      `Bundle Apple Touch and Android icons with a web manifest in one ZIP.`,
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
    whyUse: `PNG is better when you need lossless quality or a path toward transparency-friendly editing. Converting JPEG to PNG locally keeps photos private while you prepare them for design workflows.`,
    howToUse: [
      `Upload a JPEG/JPG image.`,
      `Convert to PNG.`,
      `Download the PNG file.`,
    ],
    useCases: [
      `Move a JPEG logo into a workflow that expects PNG.`,
      `Losslessly stage a photo before removing a background.`,
      `Meet a form that rejects JPG but accepts PNG.`,
      `Hand designers a PNG when they asked for a non-lossy source.`,
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
    whyUse: `JPEG usually produces smaller photo files and is required by many upload forms. Converting PNG to JPG in the browser is the fastest way to meet those constraints without cloud uploads.`,
    howToUse: [
      `Upload a PNG image.`,
      `Convert to JPEG (adjust quality if available).`,
      `Download the JPG file.`,
    ],
    useCases: [
      `Shrink transparent-free photos for email newsletters.`,
      `Satisfy a CMS that only accepts JPEG uploads.`,
      `Reduce PNG screenshots that do not need an alpha channel.`,
      `Prepare camera exports for a photo contest portal.`,
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
    whyUse: `WebP often beats PNG on file size for similar visual quality, which helps pages load faster. Converting locally lets you optimize assets before deploy.`,
    howToUse: [
      `Upload a PNG image.`,
      `Convert to WebP.`,
      `Download the WebP file.`,
    ],
    useCases: [
      `Optimize PNG illustrations for a marketing site.`,
      `Cut bandwidth on image-heavy blog posts.`,
      `Prepare WebP variants alongside originals for modern browsers.`,
      `Shrink UI chrome assets in a static site build.`,
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
    whyUse: `Not every editor, printer, or CMS accepts WebP. Converting to PNG restores compatibility while preserving transparency when the source has an alpha channel.`,
    howToUse: [
      `Upload a WebP image.`,
      `Convert to PNG.`,
      `Download the PNG file.`,
    ],
    useCases: [
      `Open a WebP download in software that only reads PNG.`,
      `Send print vendors a widely supported raster format.`,
      `Archive WebP social downloads as PNG for long-term editing.`,
      `Convert WebP icons before importing into older design tools.`,
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
    whyUse: `QR codes bridge print and digital — menus, posters, packaging, and Wi‑Fi cards. Generating a PNG in the browser means you can test scans immediately and avoid third-party branding on the code.`,
    howToUse: [
      `Enter the content (URL, text, Wi‑Fi, etc.).`,
      `Generate the QR code preview.`,
      `Download the PNG when it looks correct.`,
      `Test with your phone camera before printing or publishing.`,
    ],
    useCases: [
      `Put a URL on event flyers that open the registration page.`,
      `Share Wi‑Fi credentials with guests without spelling the password.`,
      `Link product packaging to a support or warranty page.`,
      `Add a scannable resume or portfolio URL to a business card.`,
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
    whyUse: `Designers jump between HEX in CSS, RGB in graphics tools, and HSL for adjustments. Instant conversion with a live preview prevents mismatched brand colors across a stack.`,
    howToUse: [
      `Enter a color in HEX, RGB, or HSL.`,
      `View the converted values and live preview.`,
      `Copy the format you need into your project.`,
    ],
    useCases: [
      `Translate a brand HEX into RGB for an email template.`,
      `Explore HSL tweaks while keeping the HEX for developers.`,
      `Check that a Figma token matches production CSS.`,
      `Document a palette in multiple notations for a style guide.`,
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
    whyUse: `Merging, extracting, or building PDFs from images is common before sharing contracts, homework, or scanned packets. Browser-side tools keep sensitive documents off remote converters.`,
    howToUse: [
      `Choose merge, extract, or images-to-PDF.`,
      `Add your PDF or image files.`,
      `Set page ranges or order as needed.`,
      `Download the resulting PDF.`,
    ],
    useCases: [
      `Combine signed pages into one packet for a landlord.`,
      `Extract only the pages a client needs from a long PDF.`,
      `Turn phone photos of receipts into a single expense PDF.`,
      `Assemble a portfolio PDF from exported image slides.`,
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
    whyUse: `Photos often hide camera settings and GPS. Viewing EXIF helps with photography workflows; stripping it before sharing protects location privacy.`,
    howToUse: [
      `Upload a photo that may contain EXIF data.`,
      `Inspect tags such as camera model, date, and GPS if present.`,
      `Optionally download a JPEG with metadata stripped.`,
    ],
    useCases: [
      `Check shutter speed and ISO on a practice shoot.`,
      `Remove GPS before posting travel photos publicly.`,
      `Verify capture dates when sorting an archive.`,
      `Confirm whether a download still contains camera metadata.`,
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
    whyUse: `Essays, SEO drafts, captions, and proposals all have length targets. A live counter with reading time helps you hit limits without pasting into multiple apps.`,
    howToUse: [
      `Paste or type your text into the box.`,
      `Read live counts for words, characters, and more.`,
      `Use reading time as a rough guide for length.`,
    ],
    useCases: [
      `Stay under a college essay word maximum.`,
      `Trim meta descriptions toward a search-friendly length.`,
      `Check caption limits before posting to social platforms.`,
      `Estimate reading time for a newsletter draft.`,
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
    whyUse: `Sometimes you need a scratchpad that survives a refresh without creating an account. Browser autosave is perfect for quick notes, copy buffers, and drafting on shared machines carefully.`,
    howToUse: [
      `Start typing in the notepad.`,
      `Your text autosaves locally as you write.`,
      `Copy or download when you need the content elsewhere.`,
      `Clear the note if you want a blank slate.`,
    ],
    useCases: [
      `Draft meeting talking points during a call.`,
      `Park a temporary copy-paste buffer while researching.`,
      `Sketch outline bullets before moving them into Docs.`,
      `Download a .txt backup of notes before clearing the editor.`,
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
    whyUse: `Headlines, code identifiers, and messy pasted text often need consistent casing. One click beats retyping or fighting spreadsheet formulas, especially when you are cleaning exports from multiple systems. Keeping the conversion local also means confidential draft copy never hits a random web form.`,
    howToUse: [
      `Paste your text.`,
      `Choose the target case style.`,
      `Copy the converted result.`,
    ],
    useCases: [
      `Normalize a list of names to title case for invitations.`,
      `Convert shouting-case emails into readable sentence case.`,
      `Prepare constants in UPPER_CASE for configuration files.`,
      `Clean product titles copied from inconsistent catalogs.`,
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
    whyUse: `Exports, RSVP lists, and scraped columns accumulate duplicate lines. Cleaning them in the browser is safer than uploading customer lists to unknown sites.`,
    howToUse: [
      `Paste your list (one item per line).`,
      `Remove duplicates.`,
      `Optionally sort the cleaned list.`,
      `Copy the result.`,
    ],
    useCases: [
      `Deduplicate an email list before a campaign send.`,
      `Clean repeated SKUs from a spreadsheet export.`,
      `Unique a classroom roster after merging sections.`,
      `Sort and dedupe a brainstorm list of domain ideas.`,
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
    whyUse: `Side-by-side diffs make edits obvious in contracts, scripts, and policies. Comparing locally keeps confidential wording off cloud diff services.`,
    howToUse: [
      `Paste the original text on one side.`,
      `Paste the revised text on the other.`,
      `Review highlighted additions and removals.`,
    ],
    useCases: [
      `Review lawyer redlines pasted as plain text.`,
      `Spot changes between two versions of a bio.`,
      `Compare old and new terms of service drafts.`,
      `Check that a rewritten paragraph actually changed the right lines.`,
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
    whyUse: `Snippet-level diffs with line numbers help when you are not in a full IDE — config tweaks, interview exercises, or reviewing a pasted patch.`,
    howToUse: [
      `Paste the old code in one panel.`,
      `Paste the new code in the other.`,
      `Scan highlighted lines to see what changed.`,
    ],
    useCases: [
      `Compare two nginx config versions before deploy.`,
      `Review a classmate’s function against yours.`,
      `Diff JSON configs from staging and production.`,
      `Inspect a hotfix snippet someone sent in chat.`,
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
    whyUse: `Placeholder copy keeps stakeholders focused on layout instead of unfinished wording. Generating it instantly speeds wireframes and component demos.`,
    howToUse: [
      `Choose how much text you need (paragraphs, words, etc.).`,
      `Generate the placeholder copy.`,
      `Copy it into your design or prototype.`,
    ],
    useCases: [
      `Fill a Figma text frame before real copy arrives.`,
      `Stress-test a blog template with long paragraphs.`,
      `Populate a prototype form with dummy blurbs.`,
      `Demo a print layout without using confidential drafts.`,
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
    whyUse: `Minified API payloads are painful to read. Formatting and validating JSON in the browser helps debugging without posting secrets to online formatters.`,
    howToUse: [
      `Paste your JSON.`,
      `Format to pretty-print, or minify to compress.`,
      `Fix any validation errors the tool reports.`,
      `Copy the result.`,
    ],
    useCases: [
      `Pretty-print a webhook body while building an integration.`,
      `Validate a config file before committing it.`,
      `Minify JSON for an embed size budget.`,
      `Find a missing comma in a hand-edited payload.`,
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
    whyUse: `Front-end and API work stalls without sample data. Schema-driven mock JSON lets you prototype UI states and tests without a live backend.`,
    howToUse: [
      `Define or adjust the schema/fields you need.`,
      `Generate sample JSON data.`,
      `Copy or download the output for your project.`,
    ],
    useCases: [
      `Stub a user list for a React table component.`,
      `Create fixtures for unit tests.`,
      `Demo an API response shape to stakeholders.`,
      `Seed a local mock server with realistic nested objects.`,
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
    whyUse: `Base64 shows up in data URLs, tokens, and transport encodings. Encoding and decoding locally is essential when payloads may contain secrets you should not paste into random websites.`,
    howToUse: [
      `Paste plain text to encode, or Base64 to decode.`,
      `Run encode or decode.`,
      `Copy the result.`,
    ],
    useCases: [
      `Decode a Base64 string from an API log.`,
      `Encode a small SVG for an inline data URL.`,
      `Debug email MIME content transfer encoding.`,
      `Convert text for systems that require Base64 fields.`,
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
    whyUse: `README files, docs, and posts are written in Markdown. A split preview catches broken links and headings before you commit or publish.`,
    howToUse: [
      `Type or paste Markdown in the editor.`,
      `Watch the live HTML preview.`,
      `Copy Markdown or use the preview as a visual check.`,
    ],
    useCases: [
      `Draft a GitHub README with live formatting.`,
      `Preview a changelog before releasing.`,
      `Write documentation snippets for a knowledge base.`,
      `Check list nesting and code fences visually.`,
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
    whyUse: `Regular expressions are easy to get subtly wrong. Live match highlighting shortens the loop versus redeploying code just to test a pattern.`,
    howToUse: [
      `Enter a regular expression.`,
      `Paste sample text to test against.`,
      `Review highlighted matches and adjust flags/pattern as needed.`,
    ],
    useCases: [
      `Validate an email or slug pattern before shipping.`,
      `Debug a log-parsing expression against sample lines.`,
      `Teach students how capture groups behave.`,
      `Prototype find-and-replace patterns for a cleanup script.`,
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
    whyUse: `Checksums verify downloads and detect accidental changes. Generating MD5/SHA hashes in the browser avoids uploading binaries to online hash sites.`,
    howToUse: [
      `Enter text or select a file.`,
      `Choose the hash algorithm(s).`,
      `Copy the generated hash digest.`,
    ],
    useCases: [
      `Verify a downloaded ISO against a published checksum.`,
      `Compare two files’ SHA-256 digests for integrity.`,
      `Create content hashes for cache-busting experiments.`,
      `Demonstrate one-way hashing in a security class.`,
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
    whyUse: `Distributed systems and databases rely on unique IDs. Generating UUID v4 values locally is handy for fixtures, primary keys, and correlating test events.`,
    howToUse: [
      `Choose how many UUIDs you need.`,
      `Generate.`,
      `Copy the identifiers into your app or spreadsheet.`,
    ],
    useCases: [
      `Seed database rows during local development.`,
      `Create request IDs for API debugging notes.`,
      `Generate bulk IDs for import templates.`,
      `Assign unique keys to offline form drafts.`,
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
    whyUse: `Strong unique passwords beat reused phrases. Generating them in-browser with length and character controls helps you fill a password manager quickly and privately.`,
    howToUse: [
      `Set length and character options (letters, numbers, symbols).`,
      `Generate a password.`,
      `Copy it into your password manager or account form.`,
    ],
    useCases: [
      `Create a long password for a new bank login.`,
      `Generate app-specific passwords with symbol requirements.`,
      `Produce a passphrase-length secret for Wi‑Fi.`,
      `Rotate credentials after a breach notification.`,
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
    whyUse: `Recipes, DIY plans, and travel constantly mix metric and imperial. A fast converter prevents costly measurement mistakes without opening a spreadsheet.`,
    howToUse: [
      `Pick a measurement category.`,
      `Enter a value and choose from/to units.`,
      `Read the converted result instantly.`,
    ],
    useCases: [
      `Convert oven temperatures between °C and °F.`,
      `Translate furniture dimensions before ordering abroad.`,
      `Switch miles and kilometers for a trip plan.`,
      `Convert milliliters to cups while cooking.`,
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
    whyUse: `BMI is a quick screening number used in many wellness contexts. Calculating it privately in the browser is convenient — with the caveat that it is not a diagnosis.`,
    howToUse: [
      `Choose metric or imperial units.`,
      `Enter height and weight.`,
      `Review your BMI and category label.`,
    ],
    useCases: [
      `Estimate BMI before a routine checkup form.`,
      `Compare metric vs imperial inputs for accuracy.`,
      `Track a rough trend alongside other health notes.`,
      `Educate students on how BMI is computed.`,
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
    whyUse: `Exact age in years, months, and days matters for enrollment, benefits, and milestones. Manual calendar math is error-prone around month lengths and leap years.`,
    howToUse: [
      `Enter your date of birth.`,
      `Optionally set an “as of” date.`,
      `Read the breakdown of years, months, and days.`,
    ],
    useCases: [
      `Confirm age eligibility for a youth program.`,
      `Calculate precise age for a birthday caption.`,
      `Fill forms that ask for age as of a specific date.`,
      `Plan anniversary milestones down to the day.`,
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
    whyUse: `Project deadlines, travel, and billing cycles all need reliable day counts. Instant date math beats counting on a wall calendar.`,
    howToUse: [
      `Pick a start date and an end date.`,
      `View the difference in days and related units.`,
      `Adjust dates to explore alternate schedules.`,
    ],
    useCases: [
      `Count days until a product launch.`,
      `Measure trip length between flights.`,
      `Compute invoice periods between two dates.`,
      `See how many weeks remain in a semester.`,
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
    whyUse: `Discounts, tips, exam scores, and growth rates are percentage problems in disguise. A dedicated calculator removes algebra mistakes under time pressure and keeps homework or business figures offline. Whether you need “what is X% of Y” or percent change between two values, the same tool covers everyday cases.`,
    howToUse: [
      `Choose the type of percentage problem.`,
      `Enter the known values.`,
      `Read the calculated percentage or amount.`,
    ],
    useCases: [
      `Find what 18% tip is on a restaurant bill before paying.`,
      `Compute percent change between two months of revenue.`,
      `Solve “X is what percent of Y” homework quickly and clearly.`,
      `Reverse out an original price after a markdown to check the deal.`,
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
    whyUse: `Homework, woodworking, and recipes jump between fractions and decimals. Converting and simplifying fractions avoids calculator-mode confusion.`,
    howToUse: [
      `Enter a fraction or a decimal.`,
      `Convert in either direction.`,
      `Copy the simplified result.`,
    ],
    useCases: [
      `Turn 0.125 into 1/8 for a cut list.`,
      `Convert 2 1/3 cups to a decimal for scaling.`,
      `Simplify improper fractions on math worksheets.`,
      `Check mixed-number results from a word problem.`,
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
    whyUse: `Splitting a bill fairly should not require mental gymnastics after dinner. Tip percentage plus per-person totals keep groups aligned.`,
    howToUse: [
      `Enter the bill amount.`,
      `Choose a tip percentage.`,
      `Set how many people are splitting.`,
      `Pay your share from the per-person total.`,
    ],
    useCases: [
      `Split a shared meal across four friends.`,
      `Compare 15% vs 20% tip on the same tab.`,
      `Include tax and tip when budgeting night out.`,
      `Quickly tip on takeout when the app is unclear.`,
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
    whyUse: `Monthly payment and total interest determine whether a loan is affordable. Estimating before talking to lenders sets realistic expectations and helps you compare term lengths without building amortization formulas by hand. Private browser math means salary and balance figures stay on your device while you explore scenarios.`,
    howToUse: [
      `Enter loan amount, interest rate, and term.`,
      `Review monthly payment and total interest.`,
      `Adjust inputs to compare scenarios.`,
    ],
    useCases: [
      `Compare 36- vs 60-month auto loan payments side by side.`,
      `See how a half-point rate change affects monthly cost.`,
      `Estimate interest paid over the full term before signing.`,
      `Stress-test borrowing amounts against your real monthly budget.`,
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
    whyUse: `Multiple debts compete for the same monthly dollars. Modeling avalanche payoff with extra payments clarifies timelines and interest savings.`,
    howToUse: [
      `Add each debt with balance, APR, and minimum payment.`,
      `Set your monthly budget and any extra payment.`,
      `Review the payoff order and timeline.`,
      `Adjust strategy inputs until the plan fits your budget.`,
    ],
    useCases: [
      `Prioritize high-APR cards while paying minimums elsewhere.`,
      `Test what an extra $100/month does to freedom day.`,
      `Plan a shrinking budget if income is temporary.`,
      `Visualize payoff order before consolidating loans.`,
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
    whyUse: `Home shopping hinges on payment comfort, not just list price. Estimating P&I plus taxes and insurance gives a fuller monthly picture.`,
    howToUse: [
      `Enter home price, down payment, rate, and term.`,
      `Add taxes/insurance if you want a PITI-style estimate.`,
      `Review monthly payment and total interest.`,
    ],
    useCases: [
      `Ballpark payments at different down payment levels.`,
      `Compare 15-year vs 30-year tradeoffs.`,
      `Include escrow-style tax and insurance estimates.`,
      `Check affordability before touring listings.`,
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
    whyUse: `Compound growth rewards time and consistent contributions. Projecting future value makes savings goals concrete instead of abstract.`,
    howToUse: [
      `Enter starting principal, rate, and time period.`,
      `Add monthly contributions if applicable.`,
      `Review projected future value and growth.`,
    ],
    useCases: [
      `Estimate a rainy-day fund with monthly deposits.`,
      `Illustrate compound interest for a classroom.`,
      `Compare contribution amounts toward a target balance.`,
      `Sketch long-term growth at a chosen annual rate.`,
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
    whyUse: `Return on investment and annualized ROI help compare deals with different time horizons. Fast math beats ad-hoc spreadsheet formulas.`,
    howToUse: [
      `Enter the initial cost and final value (or gain).`,
      `Add the time period for annualized ROI if needed.`,
      `Review ROI percentage and related results.`,
    ],
    useCases: [
      `Evaluate a course or certification against income gain.`,
      `Compare two project outcomes on an annualized basis.`,
      `Check marketing spend versus attributed revenue.`,
      `Summarize a personal investment’s simple ROI.`,
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
    whyUse: `Retirement planning starts with a nest-egg projection from savings, contributions, and assumed returns. A quick model motivates contribution changes today.`,
    howToUse: [
      `Enter current savings, monthly contribution, and expected return.`,
      `Set years until retirement.`,
      `Review the projected balance.`,
    ],
    useCases: [
      `See the impact of raising monthly contributions.`,
      `Project balances across different retirement ages.`,
      `Illustrate compounding for a spouse or partner discussion.`,
      `Stress-test lower assumed market returns.`,
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
    whyUse: `Income versus expenses reveals surplus or shortfall immediately. A simple monthly budget tool beats ignoring the gap until rent day.`,
    howToUse: [
      `Enter monthly income.`,
      `List expense categories and amounts.`,
      `Review remaining balance (surplus or shortfall).`,
    ],
    useCases: [
      `Build a first-pass budget after a job change.`,
      `Find categories to trim when cash is tight.`,
      `Compare planned vs actual spending totals.`,
      `Teach teens how income must cover essentials first.`,
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
    whyUse: `Posted prices and tax-inclusive totals confuse checkout math. Adding or removing sales tax at any rate keeps invoices and reimbursements accurate.`,
    howToUse: [
      `Enter the price and tax rate.`,
      `Choose add tax or remove tax from a total.`,
      `Copy the tax amount and final price.`,
    ],
    useCases: [
      `Add local tax to a quote for a client.`,
      `Back out pre-tax price from a receipt total.`,
      `Compare tax impact across different rates.`,
      `Estimate tax on online purchases before buying.`,
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
    whyUse: `A rough federal tax estimate from taxable income helps with planning — not filing. Browser-side math keeps income figures private while you explore brackets.`,
    howToUse: [
      `Enter taxable income (and filing context if asked).`,
      `Review the estimated tax.`,
      `Treat the result as a rough educational estimate only.`,
    ],
    useCases: [
      `Ballpark tax on a side-income scenario.`,
      `Educate students on progressive brackets.`,
      `Compare rough outcomes at different taxable incomes.`,
      `Prepare questions before meeting a tax professional.`,
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
    whyUse: `Travel and online shopping cross currencies constantly. Live or manual rates let you estimate costs without installing a finance app.`,
    howToUse: [
      `Choose source and target currencies.`,
      `Enter an amount.`,
      `Use live rates when available, or type a manual rate.`,
      `Read the converted amount.`,
    ],
    useCases: [
      `Budget a trip from USD to EUR expenses.`,
      `Check an invoice amount in your home currency.`,
      `Apply a bank’s quoted manual rate for accuracy.`,
      `Compare marketplace prices listed abroad.`,
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
    whyUse: `Job offers mix annual and hourly framing. Converting between salary, hourly, and common pay periods clarifies apples-to-apples comparisons.`,
    howToUse: [
      `Enter salary or hourly rate.`,
      `Confirm hours-per-week assumptions if shown.`,
      `Review equivalent pay across common periods.`,
    ],
    useCases: [
      `Translate an annual offer into hourly pay.`,
      `See monthly and biweekly take-home framing (pre-tax).`,
      `Compare contract hourly rates to salaried roles.`,
      `Adjust for different hours-per-week assumptions.`,
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
    whyUse: `Inflation quietly changes what money buys. Modeling purchasing power over years explains why savings targets must rise with prices.`,
    howToUse: [
      `Enter an amount and inflation rate.`,
      `Set the number of years.`,
      `Compare today’s value with the inflated (or deflated) equivalent.`,
    ],
    useCases: [
      `Show how tuition costs might grow at a given rate.`,
      `Adjust a past salary into today’s dollars for storytelling.`,
      `Illustrate inflation for a personal finance lesson.`,
      `Estimate future grocery budgets under assumed inflation.`,
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
    whyUse: `Historical CPI-style comparisons answer what a given amount from one year is worth in another, using data-backed buying power. That is useful for nostalgia, research, teaching, and putting old prices in today's terms.`,
    howToUse: [
      `Enter an amount and the original year.`,
      `Choose the comparison year.`,
      `Review the equivalent buying power.`,
    ],
    useCases: [
      `Convert a childhood allowance into today’s dollars.`,
      `Compare historical prices in a research paper.`,
      `Explain wage changes across decades in real terms.`,
      `Contextualize antique receipt amounts for a museum label.`,
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
    whyUse: `Refinancing only helps if monthly savings beat closing costs within a timeframe you will keep the loan. Break-even math prevents feel-good mistakes.`,
    howToUse: [
      `Enter your current loan details.`,
      `Enter the new loan rate, term, and closing costs.`,
      `Review monthly savings and break-even months.`,
    ],
    useCases: [
      `Compare a lower-rate offer including fees.`,
      `Estimate months to recover closing costs.`,
      `See total interest differences vs your current loan.`,
      `Decide whether a cash-out refinance changes the math.`,
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
    whyUse: `Minimum payments hide how long interest keeps a balance alive. Modeling payoff months and total interest motivates larger payments.`,
    howToUse: [
      `Enter balance, APR, and monthly payment.`,
      `Review months to pay off and total interest.`,
      `Try higher payments to see interest savings.`,
    ],
    useCases: [
      `See how long a balance lasts at your current payment.`,
      `Test a higher fixed payment to cut interest.`,
      `Plan payoff before a 0% promo expires.`,
      `Illustrate revolving interest for a money workshop.`,
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
    whyUse: `Down payment percent, cash available, and home price are tightly linked. Solving for the missing number clarifies what you can offer.`,
    howToUse: [
      `Enter the known values (price, percent, or cash available).`,
      `Solve for the missing down payment figure.`,
      `Use the result while shopping or talking to lenders.`,
    ],
    useCases: [
      `Find the cash needed for 20% down on a listing.`,
      `See what price you can target with saved funds.`,
      `Compare 5% vs 10% down scenarios.`,
      `Prepare numbers before a lender conversation.`,
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
    whyUse: `Month-by-month principal and interest tables explain how loans actually pay down. CSV export makes further analysis easy in Sheets or Excel.`,
    howToUse: [
      `Enter loan amount, rate, and term.`,
      `Generate the amortization schedule.`,
      `Download CSV if you want to analyze it in Excel or Sheets.`,
    ],
    useCases: [
      `Show a borrower how early payments skew to interest.`,
      `Export a schedule for tax or planning records.`,
      `Compare schedules after changing term length.`,
      `Teach amortization mechanics in a finance class.`,
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
    whyUse: `Assets minus liabilities is the clearest snapshot of financial position. A private browser balance sheet encourages honest totals without uploading to a fintech app.`,
    howToUse: [
      `List assets (cash, investments, property, etc.).`,
      `List liabilities (loans, cards, mortgages).`,
      `Review net worth as assets − liabilities.`,
    ],
    useCases: [
      `Annual net-worth check-in for a household.`,
      `Combine accounts after marriage for a shared view.`,
      `Track progress while paying down student loans.`,
      `List assets and debts before meeting an advisor.`,
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
    whyUse: `Emergency funds are measured in months of essential expenses. Knowing the target and gap turns vague advice into a savings number.`,
    howToUse: [
      `Enter essential monthly expenses.`,
      `Choose months of coverage (commonly 3–6).`,
      `Enter what you have saved so far.`,
      `See the remaining gap to your target.`,
    ],
    useCases: [
      `Set a 3–6 month cash reserve goal.`,
      `Recalculate after rent or childcare costs change.`,
      `Track progress toward a freelance buffer.`,
      `Define “essentials only” before sizing the fund.`,
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
    whyUse: `Employer match is part of compensation. Estimating employee plus match contributions — and optional growth — shows why contributing enough to capture the match matters.`,
    howToUse: [
      `Enter salary and contribution percentage.`,
      `Add employer match rules if applicable.`,
      `Review annual contributions and optional growth projection.`,
    ],
    useCases: [
      `Model raising your deferral percentage.`,
      `Estimate annual contribution with a tiered match.`,
      `Project growth using a simplified return assumption.`,
      `Compare outcomes before open-enrollment choices.`,
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
    whyUse: `Stated interest rate ignores fees and points that change true yearly cost. Estimating APR helps compare loan offers more fairly.`,
    howToUse: [
      `Enter loan amount, interest rate, term, and fees/points.`,
      `Calculate estimated APR.`,
      `Compare against other loan offers using the same fee assumptions.`,
    ],
    useCases: [
      `Compare two mortgages with different fee structures.`,
      `See how points affect estimated APR.`,
      `Educate borrowers on rate vs APR differences.`,
      `Sanity-check a dealer financing quote.`,
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
    whyUse: `Retail and freelance pricing mix discounts, markups, and margins. Clear math prevents selling below your intended profit.`,
    howToUse: [
      `Choose discount, markup, or margin mode.`,
      `Enter cost or original price and the percent.`,
      `Copy the resulting price or profit figures.`,
    ],
    useCases: [
      `Apply a 25% off sale price correctly.`,
      `Markup wholesale cost to a retail target.`,
      `Convert a desired margin into selling price.`,
      `Check stacked discount scenarios step by step.`,
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
    whyUse: `Knowing how many units you must sell to cover fixed costs anchors pricing and sales targets. Break-even analysis is foundational for small businesses.`,
    howToUse: [
      `Enter fixed costs, variable cost per unit, and selling price.`,
      `Review break-even units and revenue.`,
      `Adjust price or costs to model scenarios.`,
    ],
    useCases: [
      `Price a workshop so venue costs are covered.`,
      `Find units needed after a rent increase.`,
      `Model lower variable costs from a new supplier.`,
      `Set a revenue goal that clears break-even.`,
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
    whyUse: `Distributed teams and travel make “what time is that for them?” a daily question. Proper zone conversion respects daylight saving better than fixed UTC offsets.`,
    howToUse: [
      `Enter a date and time.`,
      `Select the source and destination time zones.`,
      `Read the converted local times.`,
    ],
    useCases: [
      `Schedule a call across U.S. and Europe.`,
      `Convert a webinar time for attendees worldwide.`,
      `Check arrival local time for an international flight.`,
      `Coordinate game nights across friend time zones.`,
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
    whyUse: `Focus sessions, workouts, and cooking need a reliable stopwatch or countdown without installing another app. A browser timer is always one tab away.`,
    howToUse: [
      `Choose stopwatch or countdown mode.`,
      `Start, pause, and reset as needed.`,
      `Record laps on the stopwatch, or set a duration for the timer.`,
    ],
    useCases: [
      `Run Pomodoro-style focus blocks.`,
      `Time HIIT intervals with lap splits.`,
      `Countdown a presentation rehearsal.`,
      `Track boiling or baking steps in the kitchen.`,
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
    whyUse: `Fair random selection ends arguments in classrooms, giveaways, and standups. A transparent draw from your list is better than someone “randomly” choosing favorites.`,
    howToUse: [
      `Paste names (one per line).`,
      `Spin or draw a random winner.`,
      `Repeat if you need additional picks.`,
    ],
    useCases: [
      `Pick a raffle winner at an event.`,
      `Choose who answers next in class.`,
      `Rotate facilitators for team meetings.`,
      `Select a giveaway winner on a livestream.`,
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
    whyUse: `Games, sampling, and decision prompts need numbers in a range. Generating one or many values beats biased “pick a number” moments.`,
    howToUse: [
      `Set the minimum and maximum.`,
      `Choose how many numbers to generate.`,
      `Generate and copy the results.`,
    ],
    useCases: [
      `Roll initiative-style numbers for a campaign.`,
      `Sample random IDs within a testing range.`,
      `Pick a random page number in a book club.`,
      `Generate multiple numbers for raffle tickets.`,
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
    whyUse: `Binary decisions sometimes deserve a coin. A virtual flip is fast, fair, and does not require digging for spare change — useful when two options are equally fine and you just need momentum. Each flip is independent, so you can also demonstrate basic probability without physical props.`,
    howToUse: [
      `Click to flip the coin.`,
      `Read heads or tails.`,
      `Flip again whenever you need another toss.`,
    ],
    useCases: [
      `Decide who kicks off in a casual backyard game.`,
      `Break a tie between two dinner options after a long day.`,
      `Teach probability with repeated flips and a simple tally.`,
      `Choose which chore you do first when both are equally unpleasant.`,
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
    whyUse: `Tabletop games and classrooms need dice that do not get lost under the couch. Virtual dice with custom sides cover d6, d20, and more.`,
    howToUse: [
      `Choose number of dice and sides.`,
      `Roll.`,
      `Read individual results and totals as shown.`,
    ],
    useCases: [
      `Roll a d20 during an online RPG session.`,
      `Play board games when physical dice are missing.`,
      `Teach expected value with many rolls.`,
      `Generate random damage totals for homebrew rules.`,
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
    whyUse: `Random order removes bias from agendas, playlists, and brackets. Shuffling locally keeps private lists off cloud “randomizer” sites, which matters when lines contain employee names, student emails, or unreleased track titles. A clean shuffle also beats dragging rows around in a spreadsheet when you only need a fair new sequence.`,
    howToUse: [
      `Paste your list (one item per line).`,
      `Shuffle.`,
      `Copy the new order.`,
    ],
    useCases: [
      `Shuffle a playlist for a party so the same songs are not always first.`,
      `Randomize lightning-talk order at a meetup without favoritism.`,
      `Seed a tournament bracket fairly from a registration list.`,
      `Rotate chore lists each week so nobody always gets the worst task.`,
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
    whyUse: `Balanced random teams keep games and workshops fair. Automatic splitting beats captains picking friends first, and it saves facilitators from awkward politics when everyone can see the draw came from the same list. Because names never leave your browser, classroom and corporate rosters stay on the device you already trust.`,
    howToUse: [
      `Paste participant names.`,
      `Choose how many teams.`,
      `Generate balanced random teams.`,
      `Copy the groups.`,
    ],
    useCases: [
      `Divide a class into project groups of roughly equal size.`,
      `Make teams for a company offsite game in seconds.`,
      `Split players for pickup sports when captains disagree.`,
      `Assign breakout rooms without favoritism during a remote workshop.`,
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
    whyUse: `When you are stuck on a true binary choice, a random yes/no breaks analysis paralysis. It is a lighthearted tie-breaker — not a substitute for high-stakes judgment.`,
    howToUse: [
      `Think of your yes/no question.`,
      `Click to get a random answer.`,
      `Try again if you want another draw.`,
    ],
    useCases: [
      `Decide whether to watch one more episode.`,
      `Pick yes/no icebreakers for parties.`,
      `Teach kids about chance with a simple tool.`,
      `Break a low-stakes stalemate quickly.`,
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
    whyUse: `Sudoku trains logic without a download or account wall. Difficulty levels plus notes and conflict highlights make practice sessions smoother on any device.`,
    howToUse: [
      `Pick a difficulty and start a puzzle.`,
      `Fill cells with numbers 1–9 using mouse or keyboard.`,
      `Use notes mode for candidates; watch conflict highlights.`,
      `Complete the board so each row, column, and box has 1–9 once.`,
    ],
    useCases: [
      `Play a quick puzzle during a commute.`,
      `Practice pencil-mark techniques with notes mode.`,
      `Challenge yourself on hard difficulty.`,
      `Use keyboard entry for faster solving on desktop.`,
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
    whyUse: `Wordle-style play is a daily brain teaser. An independent browser version lets you practice five-letter logic anytime without an account.`,
    howToUse: [
      `Type a 5-letter guess and submit.`,
      `Use the color feedback to refine the next guess.`,
      `Solve the word within six attempts.`,
    ],
    useCases: [
      `Warm up before the official daily puzzle.`,
      `Practice vocabulary and deduction skills.`,
      `Play offline-friendly sessions in a browser tab.`,
      `Share friendly competition rules with family.`,
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
  const guide = priorityToolGuides[slug] ?? toolGuides[slug];
  if (!guide) return undefined;
  return {
    ...guide,
    examples: toolExamples[slug] ?? guide.examples ?? [],
  };
}
