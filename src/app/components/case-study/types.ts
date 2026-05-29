export interface CaseStudyMeta {
  organization: string;
  /** Optional one-line description shown beneath the organization value in the hero header. */
  organizationNote?: string;
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

/** Case study page layout variants. */
export type CaseStudyLayoutVariant = 'whoop' | 'editorial' | 'sonos' | 'instrument';

export interface CaseStudyInstrumentImage {
  src: string;
  alt?: string;
  caption?: string;
  /** Defaults to `cover` so images fill the frame instead of a padded placeholder box. */
  objectFit?: 'cover' | 'contain';
  /** Frame behind the image; use `charcoal` for dark UI comps. */
  background?: 'page' | 'card' | 'charcoal';
}

/** Instrument work page bento: tall primary left, two stacked right (servicenow-rebrand). */
export interface CaseStudyInstrumentBentoGrid {
  primary: CaseStudyInstrumentImage;
  secondary: CaseStudyInstrumentImage;
  tertiary: CaseStudyInstrumentImage;
  caption?: string;
}

export interface CaseStudyInstrumentSubsection {
  title: string;
  paragraphs: string[];
  image?: CaseStudyInstrumentImage;
  images?: CaseStudyInstrumentImage[];
  bentoGrid?: CaseStudyInstrumentBentoGrid;
  /** Additional bento grids after the first (e.g. research or UI galleries). */
  bentoGrids?: CaseStudyInstrumentBentoGrid[];
}

export interface CaseStudyInstrumentChapter {
  title: string;
  lead?: string;
  subsections: CaseStudyInstrumentSubsection[];
  /** Pill accordion rows (Sonos / Dan-style) after chapter lead. */
  accordion?: CaseStudySonosSubpoint[];
  /** Full-bleed images stacked vertically above chapter bento (in order). */
  stackedImages?: CaseStudyInstrumentImage[];
  /** Bento grid directly under chapter lead (e.g. research synthesis gallery). */
  bentoGrid?: CaseStudyInstrumentBentoGrid;
  bentoGrids?: CaseStudyInstrumentBentoGrid[];
  testimonial?: { quote: string; name: string; role: string };
  metrics?: CaseStudySonosMetric[];
}

/** Instrument work page (instrument.com/work/servicenow-rebrand). */
export interface CaseStudyInstrumentContent {
  clientName: string;
  projectName: string;
  breadcrumb?: string;
  tags?: string[];
  lead: string;
  /** Full-bleed images directly under the lead paragraph (in order). */
  leadImages?: CaseStudyInstrumentImage[];
  /** Single lead image when only one hero frame is needed. */
  leadImage?: CaseStudyInstrumentImage;
  /** Bento grid directly under the lead (replaces heroImages when set). */
  leadBento?: CaseStudyInstrumentBentoGrid;
  heroImages?: CaseStudyInstrumentImage[];
  chapters: CaseStudyInstrumentChapter[];
  closing?: {
    paragraphs: string[];
    image?: CaseStudyInstrumentImage;
  };
  rolesHeading?: string;
}

/** Image aspect presets matching Instrument Sonos case study assets. */
export type CaseStudySonosImageVariant = 'portrait' | 'wide' | 'wideShort' | 'wideTall';

export interface CaseStudySonosImage {
  src: string;
  variant: CaseStudySonosImageVariant;
  /** Optional caption below image (Instrument-style, may repeat for emphasis). */
  caption?: string;
  /** `fullBleed` = edge-to-edge; `inset` = prose-width column; `duo` = wide left + portrait right. */
  display?: 'fullBleed' | 'inset' | 'duo';
  /** Right panel when `display` is `duo`. */
  duoSecondary?: { src: string; variant: CaseStudySonosImageVariant };
  /** Defaults to `cover`; use `contain` for UI comps and layout explorations. */
  objectFit?: 'cover' | 'contain';
  /** Defaults to `card`; use `none` for comps on the page background. */
  background?: 'card' | 'none';
  /** Keep image within page gutters instead of full-bleed breakout. */
  padded?: boolean;
}

export interface CaseStudySonosNumberedItem {
  number: string;
  title: string;
  body: string;
}

export interface CaseStudySonosSubpoint {
  title: string;
  body: string;
  /** Optional muted label after “ / ” in accordion row (e.g. client name). */
  label?: string;
}

export interface CaseStudySonosMetric {
  value: string;
  label: string;
}

/** Card in a horizontal auto-scrolling gallery (below a section). */
export type CaseStudySonosCarouselCardVariant =
  | 'square'
  | 'landscape'
  | 'landscapeWide'
  | 'tall';

export interface CaseStudySonosCarouselImage {
  src: string;
  alt?: string;
  variant?: CaseStudySonosCarouselCardVariant;
}

/** Cell in an Instrument-style asymmetric work grid (large/small pairs per row). */
export interface CaseStudySonosWorkGridCell {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  size: 'large' | 'small';
  aspect?: 'landscape' | 'portrait' | 'square';
  objectFit?: 'cover' | 'contain';
}

export interface CaseStudySonosWorkGridRow {
  cells: [CaseStudySonosWorkGridCell, CaseStudySonosWorkGridCell];
}

export interface CaseStudySonosWorkGrid {
  /** When `above`, renders before the section heading and copy. */
  position?: 'above' | 'below';
  rows: CaseStudySonosWorkGridRow[];
}

/** Full-width stacked screens for inspecting hi-fi UI detail. */
export interface CaseStudySonosScreenStackItem {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  objectFit?: 'cover' | 'contain';
}

export interface CaseStudySonosScreenStack {
  position?: 'above' | 'below';
  /** Optional lead-in rendered above the stack (e.g. context for legacy screenshots). */
  intro?: string;
  items: CaseStudySonosScreenStackItem[];
}

export type CaseStudySonosSectionLayout = 'default' | 'split';

export interface CaseStudySonosSection {
  /** H2-style section title (e.g. “A Digital Identity”). */
  heading: string;
  paragraphs: string[];
  /** `split`: heading + copy left, subpoints (e.g. accordion) right on md+. */
  layout?: CaseStudySonosSectionLayout;
  /** Optional KPI row (matches homepage project card metrics). */
  metrics?: CaseStudySonosMetric[];
  /** Optional numbered list (e.g. project complications). */
  numberedItems?: CaseStudySonosNumberedItem[];
  /** Optional titled sub-points (e.g. why it matters pillars). */
  subpoints?: CaseStudySonosSubpoint[];
  /** `bullet` = inline list; `stacked` = title + body blocks; `accordion` = expand/collapse rows. */
  subpointsVariant?: 'bullet' | 'stacked' | 'accordion';
  /** Quote block after section copy (mid-page testimonial). */
  testimonial?: { quote: string; name: string; role: string };
  /** Auto-scrolling horizontal gallery rendered below section copy. */
  imageCarousel?: CaseStudySonosCarouselImage[];
  /** Asymmetric 2-up image grid (Instrument work index style). */
  workGrid?: CaseStudySonosWorkGrid;
  /** Vertical stack of full-width screens (hi-fi UI detail). */
  screenStack?: CaseStudySonosScreenStack;
  image?: CaseStudySonosImage;
}

/** Instrument Sonos work page layout (instrument.com/work/sonos-brand-refresh). */
export interface CaseStudySonosContent {
  lead?: string;
  tags?: string[];
  /** KPI row in the page header (label above value, two columns). */
  heroMetrics?: CaseStudySonosMetric[];
  /** Auto-scrolling gallery below the header (replaces a single hero image). */
  heroCarousel?: CaseStudySonosCarouselImage[];
  /** Full-bleed hero image at the top of the page (after tags, before lead). */
  introImage?: CaseStudySonosImage;
  sections: CaseStudySonosSection[];
}

export interface CaseStudyEditorialSection {
  heading: string;
  body: string;
  /** When set, renders multiple paragraphs instead of a single `body` block. */
  bodyParagraphs?: string[];
  images?: string[];
  /** When true, images render in a responsive icon grid (e.g. 4 columns). */
  imageGrid?: boolean;
  /** Full-width image with no card chrome (Lucid-style break). */
  fullBleedImage?: boolean;
}

export interface CaseStudyContent {
  title: string;
  /** Page structure; `sonos` matches instrument.com/work/sonos-brand-refresh. */
  layout?: CaseStudyLayoutVariant;
  /** ServiceNow-style Instrument work page (instrument.com/work/servicenow-rebrand). */
  instrument?: CaseStudyInstrumentContent;
  /** Sonos-style Instrument work page content. */
  sonos?: CaseStudySonosContent;
  /** Scroll-driven dark → light background on the case study page. */
  scrollGradient?: boolean;
  /** Scroll-linked parallax on media (Instrument layout). Defaults to on for `instrument`. */
  parallax?: boolean;
  /** Editorial-only overrides (lucid-motors-style). */
  editorial?: {
    statement?: string;
    metricsHeading?: string;
    galleryHeading?: string;
    /** When false, skips the process gallery block. */
    showGallery?: boolean;
    /** Hero product shot spans viewport width (no inset card). */
    heroImageFullBleed?: boolean;
    testimonial?: { quote: string; name: string; role: string };
    sections?: CaseStudyEditorialSection[];
    nextProjectTitle?: string;
  };
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
    /**
     * One image: full width above the OVERVIEW bar. Two images: side-by-side on md+ (stack on small screens).
     */
    imagesAboveHeader?: string[];
    /** Optional image under the overview grid; placeholder when omitted. */
    introImage?: string;
    /** Optional strip under `introImage`; `label` / `headline` optional, `body` required when set. */
    introBelowImage?: {
      label?: string;
      headline?: string;
      body: string;
      /** Full-width image rendered after `body` (e.g. imported asset URL). */
      image?: string;
    };
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
    /** Right side of section bar (e.g. `RESULTS`); defaults to uppercase `heading`. */
    sectionLabel?: string;
    /** Optional secondary text displayed underneath the section bar. */
    sectionSubtitle?: string;
    /** Full-width image above the brand / section bar; placeholder when omitted. */
    imageAbove?: string;
    /** Optional second full-width image stacked under `imageAbove`. */
    imageBelowAbove?: string;
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
  /**
   * When true, renders `whyItMatters` in the hero stack above `heroDiscovery`
   * (section bar + headline + intro + cards), Discovery-style.
   */
  heroWhyItMatters?: boolean;
  /**
   * Up to two images side-by-side (md+) between `heroDiscovery` and `heroResults` when both exist in the layout.
   */
  heroBetweenDiscoveryAndResults?: string[];
  /** Single hero image or array for multiple image breaks (reused in order). */
  images: string | string[];
  /** When `contain`, hero image is uncropped (`w-full` / intrinsic height). Otherwise fixed block + `object-cover`. */
  heroImageObjectFit?: 'cover' | 'contain';
  /** With `contain`, avoids upscaling past native raster width / height (set to PNG pixel dimensions). */
  heroIntrinsicWidthPx?: number;
  heroIntrinsicHeightPx?: number;
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
