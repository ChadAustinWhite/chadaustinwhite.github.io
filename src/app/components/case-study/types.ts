export interface CaseStudyMeta {
  organization: string;
  role: string;
  year: string;
  duration: string;
}

export interface WhyCard {
  title: string;
  description: string;
}

export interface ComplicationItem {
  number: string;
  title: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Reflection {
  label: string;
  text: string;
}

export interface CaseStudyContent {
  title: string;
  meta: CaseStudyMeta;
  tagline: string;
  /** Single hero image or array for multiple image breaks (reused in order). */
  images: string | string[];
  situation: {
    heading: string;
    paragraphs: string[];
  };
  whyItMatters: {
    intro?: string;
    cards: WhyCard[];
  };
  complications: {
    intro?: string;
    items: ComplicationItem[];
  };
  impact: {
    heading: string;
    intro?: string;
    metrics: Metric[];
  };
  reflections: {
    heading: string;
    items: Reflection[];
  };
}
