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
 * Lexus (2) + McLaren (3) sit as a paired automotive row.
 */
const REVEAL = [
  { anim: 'fadeInUp', stagger: '0', speed: '0.05', max: '40' },
  { anim: 'fadeInUp', stagger: '0.35', speed: '0.1', max: '56' },
  // Lexus Driving Tour — mild lead
  { anim: 'fadeInDown', stagger: '0.12', speed: '-0.06', max: '48' },
  // McLaren FWD — mild lag beside Lexus
  { anim: 'fadeInUp', stagger: '0.22', speed: '0.1', max: '56' },
  // Worldpay
  { anim: 'fadeInUp', stagger: '0.4', speed: '0.14', max: '72' },
  // Levi's
  { anim: 'fadeInDown', stagger: '0.25', speed: '0.07', max: '44' },
  // First American
  { anim: 'fadeInUp', stagger: '0.35', speed: '0.12', max: '64' },
  // Quiksilver — lead slightly so it floats up as you scroll
  { anim: 'fadeInUp', stagger: '0.2', speed: '-0.14', max: '96' },
] as const;

export function WorkSection({ onViewCaseStudy, onProjectHover }: WorkSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  useWowReveal(gridRef);

  return (
    <SectionWrap id="work" className="work-section-asymmetric !pt-8 !pb-16 !px-5 md:!pt-12 md:!pb-28 md:!px-8 lg:!px-10">
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
          const slot = project.gridSlot ?? (index % 4) + 1;
          const gridSize = project.gridSize === 'wide' ? ' work-asymmetric__item--wide' : '';
          return (
            <div
              key={project.title}
              role="listitem"
              className={`work-asymmetric__item work-asymmetric__item--${slot}${gridSize} wow ${reveal.anim}`}
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
