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

/** Content blocks listed under the discovery headline (e.g. project outline). */
export type HeroDiscoveryBlock =
  | { type: 'label'; text: string }
  | { type: 'title'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'meta'; rows: { label: string; value: string }[] }
  | { type: 'subheading'; text: string }
  | { type: 'numbered'; number: string; title: string; body: string }
  | { type: 'card'; title: string; body: string }
  | { type: 'placeholder'; caption: string };

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
  /**
   * Left label in section headers (e.g. OVERVIEW). If omitted, uses second hero line when present,
   * otherwise "Chad Austin White".
   */
  sectionHeaderBrand?: string;
  /** When set, hero shows these two lines (e.g. "Expedia Group" / "Accelerator") instead of title. */
  heroTitleLines?: [string, string];
  meta: CaseStudyMeta;
  tagline: string;
  /** WHOOP-style: tags under "ProjectFocus" (e.g. Retail+eCommerce). */
  projectFocus?: string[];
  /** WHOOP-style: one-line statement headline. Falls back to tagline. */
  statement?: string;
  /** WHOOP-style: OVERVIEW block. Falls back to heroIntro or situation.paragraphs. */
  overview?: {
    paragraphs: string[];
    imageCaption?: SectionImageCaption;
    /** Large left-column line under hero (e.g. “Project — …”). Defaults to statement or title — tagline. */
    introHeadline?: string;
    /** Small-caps list under intro headline; defaults to projectFocus. */
    serviceList?: string[];
    /** Optional image under the overview grid; placeholder when omitted. */
    introImage?: string;
    /** Optional strip under `introImage` (e.g. Design + headline + body). */
    introBelowImage?: { label: string; headline: string; body: string };
  };
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
  /**
   * Results grid below the overview intro image: uppercase heading + 3-column metrics
   * (small caps label, large value). Use `\n` in value for a second line (e.g. "25+\nMINS").
   */
  heroResults?: {
    heading?: string;
    metrics: Metric[];
    /** Optional row of screenshots below the metric grid (imported asset URLs). */
    gallery?: string[];
  };
  /**
   * Discovery-style strip under hero results: section header + large left headline
   * + bulleted body (BASIC/DEPT–style).
   */
  heroDiscovery?: {
    sectionLabel?: string;
    headline: string;
    /** Two-column layout: bullet + body. Ignored when `sections` is set. */
    body?: string;
    /** Full-width stacked blocks under the headline. */
    sections?: HeroDiscoveryBlock[];
  };
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
  /** Hide bottom case-study index (e.g. 01/04). */
  hidePagination?: boolean;
  /** Hide related case studies strip. */
  hideRelatedCaseStudies?: boolean;
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
