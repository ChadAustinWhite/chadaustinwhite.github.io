import { Fragment, useState } from 'react';
import { SectionWrap } from './SectionWrap';
import { DisplayToggle } from './DisplayToggle';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import type { CaseStudyRoute } from '../data/portfolioData';

/** One full pass of the ticker; duplicated in the DOM for a seamless loop. Terms from Don Norman's design vocabulary (e.g. The Design of Everyday Things). */
const WORK_PROCESS_LABELS = [
  'Affordances',
  'Signifiers',
  'Mapping',
  'Feedback',
  'Constraints',
  'Discoverability',
  'Conceptual models',
  'Visibility',
  'System image',
  'Gulf of execution',
  'Gulf of evaluation',
  'Forcing functions',
  'Human-centered design',
] as const;

function WorkProcessMarqueeSegment({ segmentId }: { segmentId: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-x-5 px-5 md:gap-x-7 md:px-7">
      {WORK_PROCESS_LABELS.map((label, i) => (
        <Fragment key={`${segmentId}-${label}-${i}`}>
          {i > 0 ? (
            <span className="select-none text-[var(--ink-subtle)]" aria-hidden>
              ·
            </span>
          ) : null}
          <span className="whitespace-nowrap">{label}</span>
        </Fragment>
      ))}
      <span className="select-none text-[var(--ink-subtle)]" aria-hidden>
        ·
      </span>
    </span>
  );
}

interface WorkSectionProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
  onRequestAccess: (route: CaseStudyRoute) => void;
  onProjectHover: (route: CaseStudyRoute | null) => void;
}

export function WorkSection({ onViewCaseStudy, onRequestAccess, onProjectHover }: WorkSectionProps) {
  const [displayMode, setDisplayMode] = useState<'stack' | 'grid'>('grid');

  return (
    <SectionWrap
      id="work"
      className="!pt-2 !pb-14 md:!pt-3 md:!pb-[72px]"
    >
      <div
        className="relative -mx-5 mb-8 w-[calc(100%+2.5rem)] min-w-0 overflow-x-hidden md:-mx-10 md:w-[calc(100%+5rem)]"
        role="region"
        aria-label="Don Norman design concepts"
      >
        <div className="hero-brands-marquee__track text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          <WorkProcessMarqueeSegment segmentId="a" />
          <span aria-hidden="true">
            <WorkProcessMarqueeSegment segmentId="b" />
          </span>
        </div>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="mb-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          Recent Projects ({projects.length})
        </h2>
        <div className="hidden md:block">
          <DisplayToggle value={displayMode} onChange={setDisplayMode} />
        </div>
      </div>
      <div
        className={
          displayMode === 'grid'
            ? 'grid grid-cols-1 gap-6 md:grid-cols-2'
            : 'flex flex-col gap-6'
        }
      >
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
    </SectionWrap>
  );
}
