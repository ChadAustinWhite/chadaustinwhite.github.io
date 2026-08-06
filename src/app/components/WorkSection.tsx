import { useRef } from 'react';
import { SectionWrap } from './SectionWrap';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import type { CaseStudyRoute } from '../data/portfolioData';
import { useWowReveal } from '../hooks/useWowReveal';

interface WorkSectionProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
  /** Brand canvas color for the hovered project, or null when none. */
  onProjectHover?: (color: string | null) => void;
}

/**
 * Hoodzpah-style entrance choreography:
 * direction alternates, stagger shifts when each card starts rising into view.
 */
const REVEAL = [
  { anim: 'fadeInUp', stagger: '0' },
  { anim: 'fadeInUp', stagger: '0.45' },
  { anim: 'fadeInDown', stagger: '0.2' },
  { anim: 'fadeInUp', stagger: '0.6' },
  { anim: 'fadeInDown', stagger: '0.35' },
  { anim: 'fadeInUp', stagger: '0.55' },
] as const;

export function WorkSection({ onViewCaseStudy, onProjectHover }: WorkSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  useWowReveal(gridRef);

  return (
    <SectionWrap id="work" className="work-section-asymmetric !pt-8 !pb-16 md:!pt-12 md:!pb-28">
      <div className="mb-10 md:mb-14">
        <h2 className="mb-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          Recent Projects ({projects.length})
        </h2>
      </div>

      <div
        ref={gridRef}
        className="work-asymmetric"
        role="list"
        aria-label="Recent projects"
      >
        {projects.map((project, index) => {
          const reveal = REVEAL[index % REVEAL.length]!;
          const canvas = project.hoverCanvas.light;
          return (
            <div
              key={project.title}
              role="listitem"
              className={`work-asymmetric__item work-asymmetric__item--${(index % 4) + 1} wow ${reveal.anim}`}
              data-wow-stagger={reveal.stagger}
              style={{
                ['--wow-stagger' as string]: reveal.stagger,
                ['--wow-travel' as string]: index % 2 === 0 ? '88px' : '72px',
              }}
              onPointerEnter={() => onProjectHover?.(canvas)}
              onPointerLeave={() => onProjectHover?.(null)}
            >
              <ProjectCard
                project={project}
                onViewCaseStudy={onViewCaseStudy}
                layout="editorial"
              />
            </div>
          );
        })}
      </div>
    </SectionWrap>
  );
}
