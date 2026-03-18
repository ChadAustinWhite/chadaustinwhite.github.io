import type { CaseStudyContent } from './types';
import type { StrategySection } from './types';
import type { CaseStudyRoute, ProjectItem } from '../../data/portfolioData';
import { projects } from '../../data/portfolioData';
import { CaseStudyWhoopHero } from './CaseStudyWhoopHero';
import { CaseStudyWhoopRoles } from './CaseStudyWhoopRoles';
import { CaseStudyWhoopOverview } from './CaseStudyWhoopOverview';
import { CaseStudyWhoopApproach } from './CaseStudyWhoopApproach';
import { CaseStudyWhoopChallenge } from './CaseStudyWhoopChallenge';
import { CaseStudyWhoopSection } from './CaseStudyWhoopSection';
import { CaseStudyWhoopMedia } from './CaseStudyWhoopMedia';
import { CaseStudyWhoopPagination } from './CaseStudyWhoopPagination';
import { CaseStudyWhoopNext } from './CaseStudyWhoopNext';
import { CaseStudyTestimonial } from './CaseStudyTestimonial';
import { CaseStudyUxEfforts } from './CaseStudyUxEfforts';

const CASE_STUDY_ROUTES: CaseStudyRoute[] = [
  'case-study-expedia-accelerator',
  'case-study-expedia-ad-portal',
  'case-study-worldpay-merchant-onboarding',
  'case-study-worldpay-sso',
];

function getStrategySections(content: CaseStudyContent): StrategySection[] {
  if (content.strategySections?.length) return content.strategySections;
  const sections: StrategySection[] = [];
  content.narrativeSections?.forEach((n) => {
    sections.push({
      category: 'Strategy',
      heading: n.heading,
      body: n.body,
    });
  });
  if (content.rallyingCry) {
    sections.push({
      category: 'Strategy',
      heading: content.rallyingCry.heading,
      body: content.rallyingCry.paragraphs,
    });
  }
  return sections;
}

function getCurrentIndex(currentRoute: CaseStudyRoute): number {
  const i = CASE_STUDY_ROUTES.indexOf(currentRoute);
  return i >= 0 ? i + 1 : 1;
}

/** Returns 2–3 related projects (excludes current route and comingSoon). */
function getRelatedProjects(currentRoute: CaseStudyRoute): ProjectItem[] {
  const available = projects.filter((p) => p.caseStudyRoute !== currentRoute && !p.comingSoon);
  return available.slice(0, 3);
}

interface CaseStudyPageProps {
  content: CaseStudyContent;
  onBack: () => void;
  currentRoute: CaseStudyRoute;
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function CaseStudyPage({
  content,
  onBack,
  currentRoute,
  onViewCaseStudy,
}: CaseStudyPageProps) {
  const strategySections = getStrategySections(content);
  const currentIndex = getCurrentIndex(currentRoute);
  const total = CASE_STUDY_ROUTES.length;
  const relatedProjects = getRelatedProjects(currentRoute);

  return (
    <>
      <CaseStudyWhoopHero content={content} onBack={onBack} />
      <CaseStudyWhoopChallenge content={content} />
      <CaseStudyWhoopRoles content={content} />
      <CaseStudyWhoopOverview content={content} />
      <CaseStudyWhoopApproach content={content} />
      {content.mediaBlock && <CaseStudyWhoopMedia />}

      <section id="cs-content">
        {strategySections.map((section, i) => (
          <CaseStudyWhoopSection key={`${section.category}-${section.heading}-${i}`} section={section} />
        ))}
      </section>

      {content.uxEfforts && content.uxEfforts.length > 0 && (
        <CaseStudyUxEfforts cards={content.uxEfforts} />
      )}

      {content.testimonial && (
        <CaseStudyTestimonial
          quote={content.testimonial.quote}
          name={content.testimonial.name}
          role={content.testimonial.role}
        />
      )}

      <CaseStudyWhoopPagination current={currentIndex} total={total} />
      <CaseStudyWhoopNext
        relatedProjects={relatedProjects}
        onViewCaseStudy={onViewCaseStudy}
      />
    </>
  );
}
