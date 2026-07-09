import expediaAcceleratorImage from '../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';
import expediaAdPortalImage from '../../assets/b49c7b7ab770e07828d62a9294af1b3f992959ec.png';
import worldpayDisputesImage from '../../assets/worldpay-disputes-experience.png';
import worldpayMerchantOnboardingCardImage from '../../assets/worldpay-merchant-onboarding-card.png';

export type CaseStudyRoute =
  | 'case-study-worldpay-disputes'
  | 'case-study-expedia-accelerator'
  | 'case-study-expedia-ad-portal'
  | 'case-study-worldpay-merchant-onboarding'
  | 'case-study-worldpay-sso';

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
  caseStudyRoute: CaseStudyRoute;
  /** When true, case study is not available; show "Request Access" and do not link. */
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
  /** Two headline stats shown on the project card (label above value). */
  metrics: [ProjectMetric, ProjectMetric];
}

export const projects: ProjectItem[] = [
  {
    title: 'Worldpay Merchant Onboarding',
    description: 'Guided onboarding, verification, and compliance',
    period: '2025',
    image: worldpayMerchantOnboardingCardImage,
    imageAlt:
      'Kinetic merchant onboarding welcome — phone and email fields, terms agreement, security note, and continue',
    caseStudyRoute: 'case-study-worldpay-merchant-onboarding',
    hoverCanvas: { dark: '#2a2926', light: '#f0efea' },
    metrics: [
      { label: 'Onboarding completion', value: '+32%' },
      { label: 'Time to activate', value: '-40%' },
    ],
  },
  {
    title: 'Expedia Group Accelerator',
    description: 'Campaign launch and tracking',
    period: '2023–2025',
    image: expediaAcceleratorImage,
    imageAlt:
      'Expedia Group Partner Central — Performance and market trends, competitive set comparison, revenue and ADR summary',
    caseStudyRoute: 'case-study-expedia-accelerator',
    hoverCanvas: { dark: '#2c2b28', light: '#eeece8' },
    metrics: [
      { label: 'Gross revenue', value: '$300M' },
      { label: 'Active hotel partners', value: '72.4K' },
    ],
  },
  {
    title: 'Worldpay Disputes Experience',
    description: 'Dispute intake, investigation, and resolution',
    period: '2026',
    image: worldpayDisputesImage,
    imageAlt:
      'Worldpay Dashboard — Disputes case detail with case analysis, win probability, and submit information',
    caseStudyRoute: 'case-study-worldpay-disputes',
    hoverCanvas: { dark: '#2b2928', light: '#efecf0' },
    metrics: [
      { label: 'Monthly users', value: '50K' },
      { label: 'Large merchants', value: '50% retention' },
    ],
  },
  {
    title: 'Expedia Group Ad Portal',
    description: 'Campaign & payment management',
    period: '2025',
    image: expediaAdPortalImage,
    imageAlt: 'Expedia Group Ad Portal — campaign and payment management',
    caseStudyRoute: 'case-study-expedia-ad-portal',
    hoverCanvas: { dark: '#2d2b26', light: '#f2efe8' },
    metrics: [
      { label: 'Partner markets', value: '12+' },
      { label: 'Support escalations', value: '-28%' },
    ],
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
