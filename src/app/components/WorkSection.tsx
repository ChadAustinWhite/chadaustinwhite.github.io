import { useState } from 'react';
import { SectionWrap } from './SectionWrap';
import { DisplayToggle } from './DisplayToggle';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import type { CaseStudyRoute } from '../data/portfolioData';

interface WorkSectionProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
  onProjectHover: (route: CaseStudyRoute | null) => void;
}

export function WorkSection({ onViewCaseStudy, onProjectHover }: WorkSectionProps) {
  const [displayMode, setDisplayMode] = useState<'stack' | 'grid'>('stack');

  return (
    <SectionWrap id="work" className="!pt-8 !pb-14 md:!pt-10 md:!pb-[72px]">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="mb-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          Recent Projects ({projects.length})
        </h2>
        <div className="hidden md:block">
          <DisplayToggle value={displayMode} onChange={setDisplayMode} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:hidden">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onViewCaseStudy={onViewCaseStudy}
            onCtaHoverStart={() => onProjectHover(project.caseStudyRoute)}
            onCtaHoverEnd={() => onProjectHover(null)}
          />
        ))}
      </div>

      <div className="hidden md:block">
        {displayMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onViewCaseStudy={onViewCaseStudy}
                onCtaHoverStart={() => onProjectHover(project.caseStudyRoute)}
                onCtaHoverEnd={() => onProjectHover(null)}
              />
            ))}
          </div>
        ) : (
          <div
            className="work-section-stack-list flex flex-col gap-6"
            role="list"
            aria-label="Recent projects"
          >
            {projects.map((project) => (
              <div key={project.title} className="work-section-stack-list__item" role="listitem">
                <ProjectCard
                  project={project}
                  onViewCaseStudy={onViewCaseStudy}
                  onCtaHoverStart={() => onProjectHover(project.caseStudyRoute)}
                  onCtaHoverEnd={() => onProjectHover(null)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionWrap>
  );
}
