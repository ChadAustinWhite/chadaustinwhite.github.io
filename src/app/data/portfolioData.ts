import expediaAcceleratorCardImage from '../../assets/expedia-accelerator-card.png';
import expediaAdPortalCardImage from '../../assets/expedia-ad-portal-card.png';
import firstAmericanResearchPlaybookCardImage from '../../assets/first-american-research-playbook-card.png';
import levisCardImage from '../../assets/levis-card.png';
import lexusDrivingTourImage from '../../assets/lexus-driving-tour-card.png';
import mclarenFwdCardImage from '../../assets/mclaren-fwd-card.png';
import quiksilverCardImage from '../../assets/quiksilver-card.png';
import worldpayMerchantOnboardingCardImage from '../../assets/worldpay-merchant-onboarding-card.png';

export type CaseStudyRoute =
  | 'case-study-lexus-driving-tour'
  | 'case-study-worldpay-disputes'
  | 'case-study-expedia-accelerator'
  | 'case-study-expedia-ad-portal'
  | 'case-study-worldpay-merchant-onboarding'
  | 'case-study-worldpay-sso'
  | 'case-study-first-american-playbook'
  | 'case-study-quiksilver'
  | 'case-study-mclaren-fwd'
  | 'illustrations';

export interface ProjectHoverCanvas {
  dark: string;
  light: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  period: string;
  /** Site background while this card is hovered (theme-specific). */
  hoverCanvas: ProjectHoverCanvas;
  /** Omit when the tile has no screenshot (matte frame only). */
  image?: string;
  imageAlt?: string;
  /** Silent looping recording shown in place of `image`; plays only while the card is in view. */
  video?: string;
  /** Still frame shown before the recording loads. */
  videoPoster?: string;
  /**
   * Intrinsic ratio of `video` as a CSS `aspect-ratio`. The frame is sized to this so its
   * rounded corners land on the recording's own edges, hiding the desktop wedges a screen
   * recording leaves outside a rounded app window.
   */
  videoAspectRatio?: string;
  /** Seconds into `video` to begin playback (and restart on loop). */
  videoStartSeconds?: number;
  caseStudyRoute: CaseStudyRoute;
  /** When true, case study is not available; show "Coming soon" and do not link. */
  comingSoon?: boolean;
  /** Optional tag under the title on homepage cards (defaults to “Case study”). */
  cardTag?: string;
  /** `contain` = full image visible in the tile; `cover` = fill 16:9 (default). */
  imageObjectFit?: 'cover' | 'contain';
  /**
   * CSS `object-position` when the thumbnail is filled (`cover`) or letterboxed (`contain`).
   * Defaults to top. Use bottom when important type/content sits low in the frame.
   */
  imageObjectPosition?: string;
  /**
   * With `contain`, caps max CSS width to these pixel values (usually = source PNG dimensions).
   * Prevents upscale past the raster’s native resolution—keeps dense UI typography sharp on large viewports / HiDPI.
   */
  imageIntrinsicWidthPx?: number;
  imageIntrinsicHeightPx?: number;
  /**
   * `charcoal`: dark matte behind `contain` mockups so light UI contrasts (Expedia thumbnails use standard border tone).
   */
  imageMediaMatteTone?: 'default' | 'charcoal';
  /** Two headline stats shown on the project card (large value above label). Omit for non-metric work. */
  metrics?: [ProjectMetric, ProjectMetric];
  /**
   * `device`: media inside a simple device outline (no period, title, copy, metrics, or CTA).
   * `image`: only the image fills the tile — no outer card chrome.
   * Default is the full project card.
   */
  cardPresentation?: 'default' | 'device' | 'image';
  /**
   * Homepage asymmetric grid span. `wide` overrides the default slot and uses a larger column span.
   */
  gridSize?: 'default' | 'wide';
  /**
   * Force a zipper slot (1–4). Defaults to `(index % 4) + 1`.
   * 1 = small left, 2 = large right, 3 = large left, 4 = small right.
   */
  gridSlot?: 1 | 2 | 3 | 4;
  /** Extra images stacked below the primary `image` for `cardPresentation: 'image'`. */
  secondaryImages?: { src: string; alt: string }[];
}

export const projects: ProjectItem[] = [
  {
    title: 'Expedia Group accelerator',
    description:
      'I led the redesign of Expedia Group’s Accelerator so hotels could launch and optimize search visibility campaigns.',
    period: '2025–2026',
    image: expediaAcceleratorCardImage,
    imageAlt:
      'Expedia Group Partner Central Accelerator — create flow and performance analytics as layered product windows',
    imageObjectFit: 'contain',
    imageIntrinsicWidthPx: 1024,
    imageIntrinsicHeightPx: 638,
    cardPresentation: 'device',
    caseStudyRoute: 'case-study-expedia-accelerator',
    // Primary work: large left (~58%) so the hero engagement target is bigger
    gridSlot: 3,
    cardTag: 'Product Design',
    hoverCanvas: { dark: '#1c2226', light: '#e6f1f4' },
  },
  {
    title: 'Expedia Group ad portal',
    description:
      'A unified portal for partners to manage campaigns and payments across markets.',
    period: '2025',
    image: expediaAdPortalCardImage,
    imageAlt:
      'Expedia Group advertising — Create a TravelAds campaign with property, goals, and campaign structure guidance',
    caseStudyRoute: 'case-study-expedia-ad-portal',
    cardPresentation: 'image',
    // Pair with Accelerator as the smaller right tile
    gridSlot: 4,
    cardTag: 'Product Design',
    hoverCanvas: { dark: '#26201e', light: '#f5ebe6' },
  },
  {
    title: 'Lexus Driving Tour',
    description:
      'An exclusive invitation to feel the road the way Lexus intended: event experience design for the Lexus Driving Tour.',
    period: '2024',
    image: lexusDrivingTourImage,
    imageAlt:
      'Lexus Driving Tour site on desktop and mobile: Experience Amazing hero with blue LC sports car, register and event actions, and You’re Invited section',
    caseStudyRoute: 'case-study-lexus-driving-tour',
    cardPresentation: 'image',
    // Keep original large-left scale (~58%)
    gridSlot: 3,
    cardTag: 'Product Design',
    hoverCanvas: { dark: '#221e28', light: '#ebe6f2' },
  },
  {
    title: 'McLaren FWD Event',
    description:
      'An exclusive digital invitation for McLaren’s FWD experience: dark, premium event storytelling from first look through registration.',
    period: '',
    image: mclarenFwdCardImage,
    imageAlt:
      'McLaren FWD Event website on desktop and mobile: black McLaren supercar hero, orange and white REGISTER NOW and EVENT GUIDE actions, and Overview content',
    caseStudyRoute: 'case-study-mclaren-fwd',
    comingSoon: true,
    cardPresentation: 'image',
    // Large right (~58%) — grid wraps under Lexus so both stay at full large size
    gridSlot: 2,
    hoverCanvas: { dark: '#1a1410', light: '#f2ebe4' },
  },
  {
    title: 'Worldpay merchant onboarding',
    description:
      'I reshaped merchant onboarding into a guided verification and compliance journey so partners reach first transaction with clarity.',
    period: '2025',
    image: worldpayMerchantOnboardingCardImage,
    imageAlt:
      'Kinetic merchant onboarding — Welcome to Kinetic signup on mobile and desktop with identity progress, contact fields, and secure Continue',
    caseStudyRoute: 'case-study-worldpay-merchant-onboarding',
    comingSoon: true,
    cardPresentation: 'image',
    hoverCanvas: { dark: '#1a2424', light: '#e4f2f0' },
  },
  {
    title: "Levi's",
    description:
      'Heritage-led denim graphics and brand marks: Riveted and Denim Supply Co system work rooted in Levi’s visual craft.',
    period: '',
    image: levisCardImage,
    imageAlt:
      'Two Horse Brand Crafted with the Finest Denim eagle graphic on a dark navy field',
    caseStudyRoute: 'illustrations',
    comingSoon: true,
    cardPresentation: 'image',
    hoverCanvas: { dark: '#1e1c26', light: '#ece8f4' },
  },
  {
    title: 'First American Research and Design Playbook',
    description:
      'A shared playbook for how research and design teams work together at First American.',
    period: '2020–2022',
    image: firstAmericanResearchPlaybookCardImage,
    imageAlt:
      'First American Research and Design Playbook covers arranged in a diagonal grid — navy books with white synergy team diagram',
    caseStudyRoute: 'case-study-first-american-playbook',
    comingSoon: true,
    cardPresentation: 'image',
    cardTag: 'Visual Design',
    hoverCanvas: { dark: '#202428', light: '#eef0f4' },
  },
  {
    title: 'Quiksilver',
    description:
      'Campaign creative for Quiksilver: action and portrait storytelling that holds the brand’s ocean-rooted attitude.',
    period: '',
    image: quiksilverCardImage,
    imageAlt:
      'Quiksilver campaign: black-and-white Austyn Gillette skate stair-set photo beside a coastal color portrait with Quiksilver logo and blue wash',
    caseStudyRoute: 'case-study-quiksilver',
    cardPresentation: 'image',
    gridSize: 'wide',
    cardTag: 'Campaign creative',
    hoverCanvas: { dark: '#141c28', light: '#e4eef6' },
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  detail: string;
  period: string;
  logoText: string;
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Global Payments',
    role: 'Principal UX Designer (Contract)',
    detail:
      'Led UX strategy for risk products, redesigned key workflows, improved fraud investigation efficiency, aligned cross-functional teams, and delivered scalable, user-centered design systems.',
    period: 'Apr 2024 – Present',
    logoText: 'GP',
    tags: ['UX Design', 'Product Design', 'Prototyping', 'Design Systems'],
  },
  {
    company: 'Expedia Group',
    role: 'Senior UX Designer',
    detail:
      'In the last 12 months, I implemented a series of design iterations that contributed to generating $300 million in Gross Revenue and $6.1 billion in Gross Booking Value, with over 72k hotels using the platform.',
    period: 'May 2022 – Present',
    logoText: 'EG',
    tags: ['UX Design', 'Product Strategy', 'Design Systems', 'Experimentation'],
  },
  {
    company: 'First American Title',
    role: 'Lead UX Designer',
    detail:
      'Facilitated design workshops with cross-functional teams (product management, research, design, engineering, and executive leadership) to generate and optimize design solutions for underwriters.',
    period: 'Jun 2020 – May 2022',
    logoText: 'FA',
    tags: ['UX Design', 'Workshop Facilitation', 'Prototyping'],
  },
  {
    company: 'Car Finance Capital',
    role: 'Lead UX Designer',
    detail:
      'Led user research and generated UX artifacts that defined detailed experience and interface specifications, streamlining the purchase and refinancing process.',
    period: 'Apr 2019 – Apr 2020',
    logoText: 'CF',
    tags: ['UX Research', 'UX Design', 'Prototyping'],
  },
  {
    company: 'The Apex Agency',
    role: 'UX Designer',
    detail:
      'Managed stakeholder expectations while leading ideation of low- and high-fidelity prototypes and design solutions, balancing business priorities, constraints, and quality standards.',
    period: 'Mar 2017 – Apr 2019',
    logoText: 'TA',
    tags: ['UX Design', 'Visual Design', 'Prototyping', 'Brand'],
  },
  {
    company: 'The Tony Robbins Foundation',
    role: 'UX Designer',
    detail:
      'Executed style guide, wireframes, and visual language while prototyping interactions that balanced client goals with user needs.',
    period: 'Jan 2017 – Mar 2017',
    logoText: 'TR',
    tags: ['Visual Design', 'Brand', 'Prototyping'],
  },
];
