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

export interface CaseStudyNarrativeSection {
  heading: string;
  body: string[];
}

export interface CaseStudyRoles {
  design?: string[];
  strategy?: string[];
  content?: string[];
  development?: string[];
}

/** WHOOP-style strategy section subsection */
export interface StrategySubsection {
  label: string;
  heading: string;
  body: string[];
  /** Optional images for gallery after subsection body. */
  images?: string[];
}

/** Single card in the UX efforts section (modular visual + title + tags + description). */
export interface CaseStudyUxEffortCard {
  title: string;
  description: string;
  /** e.g. ["UX Research", "Interaction Design", "Prototyping"] */
  tags: string[];
  /** Optional image URL; placeholder used if omitted. */
  image?: string;
  /** Optional metric highlight (e.g. "4x YOY" / "Growth"). */
  metric?: { value: string; label: string };
  /** Optional quote or testimonial snippet. */
  quote?: string;
}

/** Caption block under a section image (heading + paragraphs). */
export interface SectionImageCaption {
  heading: string;
  paragraphs: string[];
}

/** WHOOP-style strategy/design/technology section */
export interface StrategySection {
  category: string;
  heading: string;
  body: string[];
  /** Optional image after section body. */
  image?: string;
  /** Optional caption under the section image when no subsections, or shown before subsections. */
  imageCaption?: SectionImageCaption;
  subsections?: StrategySubsection[];
}

export interface CaseStudyContent {
  title: string;
  /** When set, hero shows these two lines (e.g. "Expedia Group" / "Accelerator") instead of title. */
  heroTitleLines?: [string, string];
  meta: CaseStudyMeta;
  tagline: string;
  /** WHOOP-style: tags under "ProjectFocus" (e.g. Retail+eCommerce). */
  projectFocus?: string[];
  /** WHOOP-style: one-line statement headline. Falls back to tagline. */
  statement?: string;
  /** WHOOP-style: OVERVIEW block. Falls back to heroIntro or situation.paragraphs. */
  overview?: { paragraphs: string[]; imageCaption?: SectionImageCaption };
  /** WHOOP-style: APPROACH block. Falls back to challenge or first narrative. */
  approach?: { paragraphs: string[]; imageCaption?: SectionImageCaption };
  /** WHOOP-style: "View live site" URL. Omit if absent. */
  viewLiveUrl?: string;
  /** First block label: OVERVIEW (default), CHALLENGE (Prisoner-style), or SITUATION. */
  firstBlockLabel?: 'OVERVIEW' | 'CHALLENGE' | 'SITUATION';
  /** When true, show PlayPlayPlay / 00:00/00:00 media placeholder after APPROACH. */
  mediaBlock?: boolean;
  /** WHOOP-style: Strategy/Design/Technology sections. Derived from narrativeSections if absent. */
  strategySections?: StrategySection[];
  /** Optional intro paragraph under the hero, used for EA-style layout. */
  heroIntro?: string;
  /** Single hero image or array for multiple image breaks (reused in order). */
  images: string | string[];
  /** EA-style narrative sections */
  challenge?: {
    heading: string;
    paragraphs: string[];
  };
  narrativeSections?: CaseStudyNarrativeSection[];
  rallyingCry?: {
    heading: string;
    paragraphs: string[];
  };
  roles?: CaseStudyRoles;
  /** Optional testimonial (Instrument-style blockquote + attribution). */
  testimonial?: { quote: string; name: string; role: string };
  /** Optional UX efforts cards (Hoodzpah-style: visual + title + tags + description). */
  uxEfforts?: CaseStudyUxEffortCard[];
  /** Legacy fields – still used by current layout, can be mapped into EA-style sections. */
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
