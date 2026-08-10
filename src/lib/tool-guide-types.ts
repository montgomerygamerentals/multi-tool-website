export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolGuide {
  whatItDoes: string;
  howToUse: string[];
  supportedFormats: string[];
  privacy: string;
  faqs: ToolFaq[];
}
