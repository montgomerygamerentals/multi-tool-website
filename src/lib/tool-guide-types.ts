export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolGuide {
  whatItDoes: string;
  whyUse: string;
  howToUse: string[];
  useCases: string[];
  supportedFormats: string[];
  privacy: string;
  faqs: ToolFaq[];
}
