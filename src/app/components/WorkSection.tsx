import { useRef } from 'react';
import { SectionWrap } from './SectionWrap';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import type { CaseStudyRoute } from '../data/portfolioData';
import { useWowReveal } from '../hooks/useWowReveal';

interface WorkSectionProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

/** Light stagger so neighboring cards don’t read as one unit while scrolling. */
const REVEAL = [
  { anim: 'fadeInUp', delay: '0s' },
  { anim: 'fadeInUp', delay: '0.06s' },
  { anim: 'fadeInDown', delay: '0.04s' },
  { anim: 'fadeInUp', delay: '0.08s' },
  { anim: 'fadeInDown', delay: '0.05s' },
  { anim: 'fadeInUp', delay: '0.07s' },
] as const;

export function WorkSection({ onViewCaseStudy }: WorkSectionProps) {
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
          return (
            <div
              key={project.title}
              role="listitem"
              className={`work-asymmetric__item work-asymmetric__item--${(index % 4) + 1} wow ${reveal.anim}`}
              style={{ ['--wow-delay' as string]: reveal.delay }}
              data-wow-delay={reveal.delay}
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
