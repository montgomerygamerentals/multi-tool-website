export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolExample {
  title: string;
  body: string;
}

/** Extra topical section rendered below the core guide blocks. */
export interface ToolGuideSection {
  heading: string;
  body: string;
}

export interface ToolGuide {
  /** Short intro used under the H1 — what the tool does and who it is for. */
  whatItDoes: string;
  /** Longer “when / why to use” copy. */
  whyUse: string;
  howToUse: string[];
  useCases: string[];
  supportedFormats: string[];
  privacy: string;
  faqs: ToolFaq[];
  examples?: ToolExample[];
  /** “What is [topic]?” explanatory section. */
  whatIs?: string;
  /** How the calculation, conversion, or process works. */
  howItWorks?: string;
  /** Formula or definition shown when applicable. */
  formula?: string;
  /** Additional unique sections (ROI vs profit, quality tradeoffs, etc.). */
  sections?: ToolGuideSection[];
}
