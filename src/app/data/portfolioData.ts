import expediaAcceleratorImage from '../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';
import expediaAdPortalImage from '../../assets/b49c7b7ab770e07828d62a9294af1b3f992959ec.png';
import payrixOnboardingImage from '../../assets/d37a1587dc67bf7c157730c623efab0af7f1c1e7.png';
import galileoImage from '../../assets/b191d448183cfac9582921f3ab94a468cb1b029a.png';

export type CaseStudyRoute =
  | 'case-study-modern-architecture'
  | 'case-study-creative-space'
  | 'case-study-luxury-goods'
  | 'case-study-fashion-forward'
  | 'case-study-tech-innovation';

export interface ProjectItem {
  title: string;
  description: string;
  period: string;
  image: string;
  imageAlt: string;
  caseStudyRoute: CaseStudyRoute;
}

export const projects: ProjectItem[] = [
  {
    title: 'Expedia Group Accelerator',
    description: 'Campaign launch and tracking',
    period: '2023–2025',
    image: expediaAcceleratorImage,
    imageAlt: 'Expedia Group Accelerator — campaign creation and performance dashboard',
    caseStudyRoute: 'case-study-modern-architecture',
  },
  {
    title: 'Expedia Group Ad Portal',
    description: 'Campaign & Payment Management',
    period: '2025',
    image: expediaAdPortalImage,
    imageAlt: 'Expedia Group Ad Portal — campaign and payment management',
    caseStudyRoute: 'case-study-luxury-goods',
  },
  {
    title: 'Worldpay Merchant Onboarding',
    description: 'Access Control & Security Compliance',
    period: '2024–2025',
    image: payrixOnboardingImage,
    imageAlt: 'Worldpay Merchant Onboarding — access control and security compliance',
    caseStudyRoute: 'case-study-creative-space',
  },
  {
    title: 'Worldpay SSO Management',
    description: 'Identity access and security',
    period: '2025',
    image: galileoImage,
    imageAlt: 'Worldpay SSO Management — identity access and security',
    caseStudyRoute: 'case-study-tech-innovation',
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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud exercitation.',
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

export interface EducationItem {
  degree: string;
  school: string;
  detail: string;
}

export const education: EducationItem[] = [
  { degree: 'Certificate · Dec 2024', school: 'Deque University', detail: 'Web Accessibility' },
  { degree: 'Certificate · Jan 2024', school: 'IBM', detail: 'AI Team Essentials' },
  {
    degree: 'BS · Mar 2009',
    school: 'The Art Institute of San Diego',
    detail: 'Bachelor of Science in Graphic Design',
  },
];
