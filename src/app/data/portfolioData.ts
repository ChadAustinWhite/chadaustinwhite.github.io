import expediaAcceleratorImage from '../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';
import expediaAdPortalImage from '../../assets/b49c7b7ab770e07828d62a9294af1b3f992959ec.png';
import galileoImage from '../../assets/b191d448183cfac9582921f3ab94a468cb1b029a.png';
import worldpayMerchantOnboardingImage from '../../assets/worldpay-merchant-onboarding.png';

export type CaseStudyRoute =
  | 'case-study-expedia-accelerator'
  | 'case-study-expedia-ad-portal'
  | 'case-study-worldpay-merchant-onboarding'
  | 'case-study-worldpay-sso';

export interface ProjectItem {
  title: string;
  description: string;
  period: string;
  image: string;
  imageAlt: string;
  caseStudyRoute: CaseStudyRoute;
  /** When true, case study is not available; show "Request Access" and do not link. */
  comingSoon?: boolean;
  /** `contain` = full image visible in the tile; `cover` = fill 16:9 (default). */
  imageObjectFit?: 'cover' | 'contain';
}

export const projects: ProjectItem[] = [
  {
    title: 'Worldpay Merchant Onboarding',
    description: 'Access Control & Security Compliance',
    period: '2024–2025',
    image: worldpayMerchantOnboardingImage,
    imageAlt:
      'Worldpay Merchant Onboarding — Kinetic welcome screen with progress, mobile and email fields, authorization and terms checkboxes, and security copy on a white card over a soft gradient',
    caseStudyRoute: 'case-study-worldpay-merchant-onboarding',
    comingSoon: true,
    imageObjectFit: 'contain',
  },
  {
    title: 'Expedia Group Accelerator',
    description: 'Campaign launch and tracking',
    period: '2023–2025',
    image: expediaAcceleratorImage,
    imageAlt: 'Expedia Group Accelerator — campaign creation and performance dashboard',
    caseStudyRoute: 'case-study-expedia-accelerator',
    comingSoon: true,
  },
  {
    title: 'Expedia Group Ad Portal',
    description: 'Campaign & Payment Management',
    period: '2025',
    image: expediaAdPortalImage,
    imageAlt: 'Expedia Group Ad Portal — campaign and payment management',
    caseStudyRoute: 'case-study-expedia-ad-portal',
    comingSoon: true,
  },
  {
    title: 'Worldpay SSO Management',
    description: 'Identity access and security',
    period: '2025',
    image: galileoImage,
    imageAlt: 'Worldpay SSO Management — identity access and security',
    caseStudyRoute: 'case-study-worldpay-sso',
    comingSoon: true,
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
    role: 'Senior UX Designer (Contract)',
    detail:
      'Led UX strategy for Risk products, redesigned key workflows, improved fraud investigation efficiency, aligned cross-functional teams, and delivered scalable, user-centered design systems.',
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

/** Home tools & technologies block: stacked lines (same scale as hero headline). */
export const principlesContent: {
  /** Small caps row above the list, e.g. “Tools & Technologies (12)”. */
  sectionLabel: string;
  lines: string[];
  metaBar: { left: string; center: string };
} = {
  sectionLabel: 'Tools & Technologies',
  lines: [
    'WCAG standards',
    'Figma',
    'Cursor',
    'Claude code',
    'GitHub',
    'UserTesting',
    'Google analytics',
    'Adobe creative cloud',
    'HTML/CSS',
    'Microsoft office',
    'Jira',
    'Confluence',
    'Miro',
  ],
  metaBar: { left: 'SEC.', center: '/D' },
};
