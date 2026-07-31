import expediaAcceleratorWalkthrough from '../../assets/expedia-accelerator-walkthrough.mp4';
import expediaAcceleratorWalkthroughPoster from '../../assets/expedia-accelerator-walkthrough-poster.jpg';
import expediaAdPortalWalkthrough from '../../assets/expedia-ad-portal-walkthrough.mp4';
import expediaAdPortalWalkthroughPoster from '../../assets/expedia-ad-portal-walkthrough-poster.jpg';
import illustrationsCafeRacerImage from '../../assets/illustrations-cafe-racer.png';
import worldpayDisputesImage from '../../assets/worldpay-disputes-experience.png';
import worldpayMerchantOnboardingCardImage from '../../assets/worldpay-merchant-onboarding-card.png';

export type CaseStudyRoute =
  | 'case-study-worldpay-disputes'
  | 'case-study-expedia-accelerator'
  | 'case-study-expedia-ad-portal'
  | 'case-study-worldpay-merchant-onboarding'
  | 'case-study-worldpay-sso'
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
  /** `contain` = full image visible in the tile; `cover` = fill 16:9 (default). */
  imageObjectFit?: 'cover' | 'contain';
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
}

export const projects: ProjectItem[] = [
  {
    title: 'Expedia Group accelerator',
    description:
      'I led the redesign of Expedia Group’s Accelerator so hotels could launch and optimize search visibility campaigns.',
    period: '2025–2026',
    video: expediaAcceleratorWalkthrough,
    videoPoster: expediaAcceleratorWalkthroughPoster,
    videoAspectRatio: '1920 / 1182',
    videoStartSeconds: 4.4,
    imageAlt: 'Walkthrough of creating and managing an Accelerator in Expedia Group Partner Central',
    imageObjectFit: 'contain',
    caseStudyRoute: 'case-study-expedia-accelerator',
    hoverCanvas: { dark: '#2c2b28', light: '#eeece8' },
    metrics: [
      { label: 'gross revenue', value: '$300M' },
      { label: 'active hotel partners', value: '72.4K' },
    ],
  },
  {
    title: 'Worldpay dispute defender',
    description:
      'I designed automated dispute resolution that protects merchant revenue and replaces manual triage with clarity operators can trust.',
    period: '2026',
    image: worldpayDisputesImage,
    imageAlt:
      'Worldpay Dispute Defender — performance summary with sales protected, time saved, and disputes handled',
    caseStudyRoute: 'case-study-worldpay-disputes',
    hoverCanvas: { dark: '#2b2928', light: '#efecf0' },
    metrics: [
      { label: 'protected annually', value: '$44.6M' },
      { label: 'disputes automated', value: '147K/mo' },
    ],
  },
  {
    title: 'Worldpay merchant onboarding',
    description:
      'I reshaped merchant onboarding into a guided verification and compliance journey so partners reach first transaction with clarity.',
    period: '2025',
    image: worldpayMerchantOnboardingCardImage,
    imageAlt:
      'Kinetic merchant onboarding mobile screens — welcome signup, prefilled information review, and bank location setup',
    caseStudyRoute: 'case-study-worldpay-merchant-onboarding',
    comingSoon: true,
    imageObjectFit: 'contain',
    hoverCanvas: { dark: '#2a2926', light: '#f0efea' },
    metrics: [
      { label: 'onboarding completion', value: '+32%' },
      { label: 'time to activate', value: '-40%' },
    ],
  },
  {
    title: 'Expedia Group ad portal',
    description:
      'I helped design a unified advertising portal for partners to manage campaigns and payments with confidence across markets.',
    period: '2025',
    video: expediaAdPortalWalkthrough,
    videoPoster: expediaAdPortalWalkthroughPoster,
    videoAspectRatio: '1920 / 1128',
    imageAlt: 'Walkthrough of creating a campaign in the Expedia Group Ad Portal',
    imageObjectFit: 'contain',
    caseStudyRoute: 'case-study-expedia-ad-portal',
    comingSoon: true,
    hoverCanvas: { dark: '#2d2b26', light: '#f2efe8' },
    metrics: [
      { label: 'partner markets', value: '12+' },
      { label: 'support escalations', value: '-28%' },
    ],
  },
  {
    title: 'Selected visual work',
    description:
      'Visual work for brands and companies, spanning apparel graphics, campaign artwork, and custom illustration.',
    period: '2022–Present',
    image: illustrationsCafeRacerImage,
    imageAlt: 'Line illustration of a rider leaning into a cafe racer motorcycle',
    caseStudyRoute: 'illustrations',
    hoverCanvas: { dark: '#232130', light: '#ebe9f1' },
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
