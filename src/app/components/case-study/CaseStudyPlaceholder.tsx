import type { CaseStudyContent } from './types';
import type { CaseStudyRoute } from '../../data/portfolioData';
import { CaseStudyLayout } from './CaseStudyLayout';
import { CaseStudyWhoopHero } from './CaseStudyWhoopHero';
import { CaseStudyWhoopStatement } from './CaseStudyWhoopStatement';
import { CaseStudyWhoopRoles } from './CaseStudyWhoopRoles';
import { CaseStudyWhoopOverview } from './CaseStudyWhoopOverview';
import { CaseStudyWhoopApproach } from './CaseStudyWhoopApproach';
import { CaseStudyWhoopMedia } from './CaseStudyWhoopMedia';
import { CaseStudyWhoopPagination } from './CaseStudyWhoopPagination';
import { CaseStudyWhoopNext } from './CaseStudyWhoopNext';
import { projects } from '../../data/portfolioData';

const CASE_STUDY_ROUTES: CaseStudyRoute[] = [
  'case-study-expedia-accelerator',
  'case-study-expedia-ad-portal',
  'case-study-worldpay-merchant-onboarding',
  'case-study-worldpay-sso',
];

function getNextProject(currentRoute: CaseStudyRoute) {
  const i = CASE_STUDY_ROUTES.indexOf(currentRoute);
  if (i < 0) return null;
  for (let j = i + 1; j < projects.length; j++) {
    if (!projects[j].comingSoon) return projects[j];
  }
  return null;
}

interface CaseStudyPlaceholderProps {
  title: string;
  onBack: () => void;
  onNavigateHome: () => void;
  currentRoute: CaseStudyRoute;
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

function buildPlaceholderContent(title: string): CaseStudyContent {
  return {
    title,
    meta: {
      organization: '—',
      role: '—',
      year: '—',
      duration: '—',
    },
    tagline: '',
    projectFocus: [],
    statement: `${title} — Case study coming soon.`,
    overview: { paragraphs: ['Case study coming soon.'] },
    firstBlockLabel: 'OVERVIEW',
    mediaBlock: true,
    images: '',
    situation: { heading: 'Overview', paragraphs: [] },
    whyItMatters: { intro: '', cards: [] },
    complications: { intro: '', items: [] },
    impact: { heading: 'Impact', intro: '', metrics: [] },
    reflections: { heading: 'Reflections', items: [] },
  };
}

export function CaseStudyPlaceholder({
  title,
  onBack,
  onNavigateHome,
  currentRoute,
  onViewCaseStudy,
}: CaseStudyPlaceholderProps) {
  const content = buildPlaceholderContent(title);
  const currentIndex = CASE_STUDY_ROUTES.indexOf(currentRoute) + 1 || 1;
  const total = CASE_STUDY_ROUTES.length;
  const nextProject = getNextProject(currentRoute);

  return (
    <CaseStudyLayout onNavigateHome={onNavigateHome}>
      <CaseStudyWhoopHero content={content} onBack={onBack} />
      <CaseStudyWhoopStatement content={content} />
      <CaseStudyWhoopRoles content={content} />
      <CaseStudyWhoopOverview content={content} />
      <CaseStudyWhoopApproach content={content} />
      <CaseStudyWhoopMedia />
      <section id="cs-content" />
      <CaseStudyWhoopPagination current={currentIndex} total={total} />
      <CaseStudyWhoopNext nextProject={nextProject} onViewCaseStudy={onViewCaseStudy} />
    </CaseStudyLayout>
  );
}
