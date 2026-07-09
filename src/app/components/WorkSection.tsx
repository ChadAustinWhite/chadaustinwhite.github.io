import { SectionWrap } from './SectionWrap';
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

function StackScrollArrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="flex-shrink-0"
    >
      <path
        d={direction === 'left' ? 'M9 2.5L4.5 7L9 11.5' : 'M5 2.5L9.5 7L5 11.5'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stackNavButtonClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-transparent text-[var(--ink-muted)] transition-[background,color,border-color,opacity] duration-150 hover:bg-[var(--card-bg)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-35';

interface WorkSectionProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
  onRequestAccess: (route: CaseStudyRoute) => void;
  onProjectHover: (route: CaseStudyRoute | null) => void;
}

export function WorkSection({ onViewCaseStudy, onRequestAccess, onProjectHover }: WorkSectionProps) {
  const {
    ref: stackRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    dragScrollProps,
  } = useHorizontalDragScroll({
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
        <div className="hidden items-center gap-1.5 md:flex">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous project"
            className={stackNavButtonClass}
          >
            <StackScrollArrow direction="left" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next project"
            className={stackNavButtonClass}
          >
            <StackScrollArrow direction="right" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:hidden">
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
      <div className="hidden md:block">
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
      </div>
    </SectionWrap>
  );
}
