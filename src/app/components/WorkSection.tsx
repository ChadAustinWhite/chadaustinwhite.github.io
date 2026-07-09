import { useState } from 'react';
import { SectionWrap } from './SectionWrap';
import { DisplayToggle } from './DisplayToggle';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import type { CaseStudyRoute } from '../data/portfolioData';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';

/** One full pass of the ticker; duplicated in the DOM for a seamless loop. */
const WORK_MARQUEE_LABELS = [
  'Acura',
  'Alpinestars',
  'Car Finance Capital',
  'Expedia Group',
  'First American Title',
  'Global Payments',
  'Honda',
  'Lexus',
  'McLaren',
  'Tony Robbins Foundation',
  'Toyota',
] as const;

/** Equal space on both sides of each interpunct so word · word rhythm is uniform. */
function WorkMarqueeSeparator() {
  return (
    <span
      className="inline-flex w-10 shrink-0 items-center justify-center text-[var(--ink-subtle)] select-none md:w-14"
      aria-hidden
    >
      ·
    </span>
  );
}

/** Renders one marquee pass as direct flex children so separator spacing is uniform at the loop seam. */
function renderWorkMarqueeItems(segmentId: string) {
  return WORK_MARQUEE_LABELS.flatMap((label, i) => {
    const labelEl = (
      <span key={`${segmentId}-label-${label}-${i}`} className="shrink-0 whitespace-nowrap">
        {label}
      </span>
    );
    if (i === 0) return [labelEl];
    return [<WorkMarqueeSeparator key={`${segmentId}-sep-${i}`} />, labelEl];
  }).concat(<WorkMarqueeSeparator key={`${segmentId}-sep-end`} />);
}

interface WorkSectionProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
  onRequestAccess: (route: CaseStudyRoute) => void;
  onProjectHover: (route: CaseStudyRoute | null) => void;
}

export function WorkSection({ onViewCaseStudy, onRequestAccess, onProjectHover }: WorkSectionProps) {
  const [displayMode, setDisplayMode] = useState<'stack' | 'grid'>('stack');
  const { ref: stackRef, dragScrollProps } = useHorizontalDragScroll({
    slideSelector: '.work-section-stack__slide',
  });

  return (
    <SectionWrap
      id="work"
      className="!pt-2 !pb-14 md:!pt-3 md:!pb-[72px]"
    >
      <div
        className="relative -mx-5 mb-8 w-[calc(100%+2.5rem)] min-w-0 overflow-x-hidden md:-mx-10 md:w-[calc(100%+5rem)]"
        aria-hidden="true"
      >
        <div className="hero-brands-marquee__track text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          {renderWorkMarqueeItems('a')}
          <span className="contents" aria-hidden="true">
            {renderWorkMarqueeItems('b')}
          </span>
        </div>
      </div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="mb-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            Recent Projects ({projects.length})
          </h2>
          <DisplayToggle value={displayMode} onChange={setDisplayMode} />
        </div>
      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onViewCaseStudy={onViewCaseStudy}
              onRequestAccess={onRequestAccess}
              onCtaHoverStart={() => onProjectHover(project.caseStudyRoute)}
              onCtaHoverEnd={() => onProjectHover(null)}
            />
          ))}
        </div>
      ) : (
        <div
          ref={stackRef}
          className="work-section-stack touch-pan-x"
          role="region"
          aria-label="Recent projects, horizontal scroll"
          {...dragScrollProps}
        >
          <div className="work-section-stack__track">
            {projects.map((project) => (
              <div key={project.title} className="work-section-stack__slide">
                <ProjectCard
                  project={project}
                  onViewCaseStudy={onViewCaseStudy}
                  onRequestAccess={onRequestAccess}
                  onCtaHoverStart={() => onProjectHover(project.caseStudyRoute)}
                  onCtaHoverEnd={() => onProjectHover(null)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrap>
  );
}
