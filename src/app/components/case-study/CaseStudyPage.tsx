import { Fragment } from 'react';
import type { CaseStudyContent } from './types';
import type { StrategySection } from './types';
import type { CaseStudyRoute, ProjectItem } from '../../data/portfolioData';
import { projects } from '../../data/portfolioData';
import { CaseStudyEditorialPage } from './CaseStudyEditorialPage';
import { CaseStudyInstrumentPage } from './CaseStudyInstrumentPage';
import { CaseStudySonosPage } from './CaseStudySonosPage';
import { CaseStudyWhoopHero } from './CaseStudyWhoopHero';
import { CaseStudyWhoopRoles, caseStudyHasRolesSection } from './CaseStudyWhoopRoles';
import { CaseStudySectionBreakImage } from './CaseStudySectionBreakImage';
import { CaseStudyWhoopSection } from './CaseStudyWhoopSection';
import { CaseStudyWhoopMedia } from './CaseStudyWhoopMedia';
import { CaseStudyWhoopPagination } from './CaseStudyWhoopPagination';
import { CaseStudyWhoopNext } from './CaseStudyWhoopNext';
import { CaseStudyTestimonial } from './CaseStudyTestimonial';
import { CaseStudyUxEfforts } from './CaseStudyUxEfforts';
import { CaseStudyReflections } from './CaseStudyReflections';
import {
  CaseStudySectionBrandProvider,
  getSectionHeaderBrand,
} from './CaseStudySectionBrandContext';

const CASE_STUDY_ROUTES: CaseStudyRoute[] = [
  'case-study-lexus-driving-tour',
  'case-study-worldpay-disputes',
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
  if (content.layout === 'instrument') {
    return (
      <CaseStudyInstrumentPage
        content={content}
        onBack={onBack}
        currentRoute={currentRoute}
        onViewCaseStudy={onViewCaseStudy}
      />
    );
  }

  if (content.layout === 'sonos') {
    return (
      <CaseStudySonosPage content={content} onBack={onBack} />
    );
  }

  if (content.layout === 'editorial') {
    return (
      <CaseStudyEditorialPage
        content={content}
        onBack={onBack}
        currentRoute={currentRoute}
        onViewCaseStudy={onViewCaseStudy}
      />
    );
  }

  const strategySections = getStrategySections(content);
  const currentIndex = getCurrentIndex(currentRoute);
  const total = CASE_STUDY_ROUTES.length;
  const relatedProjects = getRelatedProjects(currentRoute);

  const showRoles = caseStudyHasRolesSection(content);

  return (
    <CaseStudySectionBrandProvider brand={getSectionHeaderBrand(content)}>
      <CaseStudyWhoopHero content={content} onBack={onBack} />
      <CaseStudySectionBreakImage />
      {showRoles ? (
        <>
          <CaseStudyWhoopRoles content={content} />
          <CaseStudySectionBreakImage />
        </>
      ) : null}
      {content.mediaBlock ? (
        <>
          <CaseStudyWhoopMedia />
          <CaseStudySectionBreakImage />
        </>
      ) : null}

      <section id="cs-content">
        {strategySections.map((section, i) => (
          <Fragment key={`${section.category}-${section.heading}-${i}`}>
            {i > 0 ? <CaseStudySectionBreakImage /> : null}
            <CaseStudyWhoopSection
              section={section}
              showSectionHeader={i !== 0}
              showHeadlineColumn={i !== 0}
            />
          </Fragment>
        ))}
      </section>

      {content.uxEfforts && content.uxEfforts.length > 0 ? (
        <>
          <CaseStudySectionBreakImage />
          <CaseStudyUxEfforts cards={content.uxEfforts} />
        </>
      ) : null}

      {content.testimonial ? (
        <>
          <CaseStudySectionBreakImage />
          <CaseStudyTestimonial
            quote={content.testimonial.quote}
            name={content.testimonial.name}
            role={content.testimonial.role}
          />
        </>
      ) : null}

      {content.reflections.items.length > 0 ? (
        <>
          <CaseStudySectionBreakImage />
          <CaseStudyReflections heading={content.reflections.heading} reflections={content.reflections.items} />
        </>
      ) : null}

      {!content.hidePagination ? (
        <>
          <CaseStudySectionBreakImage />
          <CaseStudyWhoopPagination current={currentIndex} total={total} />
        </>
      ) : null}
      {!content.hideRelatedCaseStudies ? (
        <>
          <CaseStudySectionBreakImage />
          <CaseStudyWhoopNext
            relatedProjects={relatedProjects}
            onViewCaseStudy={onViewCaseStudy}
          />
        </>
      ) : null}
    </CaseStudySectionBrandProvider>
  );
}
