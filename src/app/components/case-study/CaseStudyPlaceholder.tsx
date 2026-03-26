import type { CaseStudyContent } from './types';
import type { CaseStudyRoute } from '../../data/portfolioData';
import { CaseStudyLayout } from './CaseStudyLayout';
import { CaseStudyWhoopHero } from './CaseStudyWhoopHero';
import { CaseStudyWhoopStatement } from './CaseStudyWhoopStatement';
import { CaseStudyWhoopRoles, caseStudyHasRolesSection } from './CaseStudyWhoopRoles';
import { CaseStudyWhoopMedia } from './CaseStudyWhoopMedia';
import { CaseStudySectionBreakImage } from './CaseStudySectionBreakImage';
import { CaseStudyWhoopPagination } from './CaseStudyWhoopPagination';
import { CaseStudyWhoopNext } from './CaseStudyWhoopNext';
import { projects } from '../../data/portfolioData';
import {
  CaseStudySectionBrandProvider,
  getSectionHeaderBrand,
} from './CaseStudySectionBrandContext';

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
  const showRoles = caseStudyHasRolesSection(content);

  return (
    <CaseStudyLayout onNavigateHome={onNavigateHome}>
      <CaseStudySectionBrandProvider brand={getSectionHeaderBrand(content)}>
      <CaseStudyWhoopHero content={content} onBack={onBack} />
      <CaseStudySectionBreakImage />
      <CaseStudyWhoopStatement content={content} />
      <CaseStudySectionBreakImage />
      {showRoles ? (
        <>
          <CaseStudyWhoopRoles content={content} />
          <CaseStudySectionBreakImage />
        </>
      ) : null}
      <CaseStudyWhoopMedia />
      <CaseStudySectionBreakImage />
      <section id="cs-content" />
      <CaseStudySectionBreakImage />
      <CaseStudyWhoopPagination current={currentIndex} total={total} />
      <CaseStudySectionBreakImage />
      <CaseStudyWhoopNext nextProject={nextProject} onViewCaseStudy={onViewCaseStudy} />
      </CaseStudySectionBrandProvider>
    </CaseStudyLayout>
  );
}
