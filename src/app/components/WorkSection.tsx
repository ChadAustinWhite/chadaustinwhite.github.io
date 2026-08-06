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
 * Entrance + multi-speed choreography per asymmetric slot.
 * Higher `speed` = more lag vs document scroll (reads as a slower layer).
 * Lexus (2) vs Worldpay (3): deliberately far apart so the pair reads as two tempos.
 */
const REVEAL = [
  { anim: 'fadeInUp', stagger: '0', speed: '0.05', max: '48' },
  { anim: 'fadeInUp', stagger: '0.4', speed: '0.12', max: '88' },
  // Lexus Driving Tour — stays closer to the scroll, rises faster
  { anim: 'fadeInDown', stagger: '0.18', speed: '0.03', max: '36' },
  // Worldpay — stronger lag, drifts behind the left card
  { anim: 'fadeInUp', stagger: '0.5', speed: '0.28', max: '170' },
  // Levi's (left) — slight lag so the right neighbor can lead
  { anim: 'fadeInDown', stagger: '0.28', speed: '0.12', max: '88' },
  // First American (right) — lower lag = rises slightly faster on scroll
  { anim: 'fadeInUp', stagger: '0.45', speed: '0.04', max: '40' },
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
              data-scroll-speed={reveal.speed}
              data-scroll-max={reveal.max}
              style={{
                ['--wow-stagger' as string]: reveal.stagger,
                ['--wow-travel' as string]: index % 2 === 0 ? '32px' : '26px',
                ['--scroll-speed' as string]: reveal.speed,
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
