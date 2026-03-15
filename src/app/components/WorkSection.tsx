import { useState } from 'react';
import { SectionWrap } from './SectionWrap';
import { DisplayToggle } from './DisplayToggle';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import type { CaseStudyRoute } from '../data/portfolioData';

interface WorkSectionProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function WorkSection({ onViewCaseStudy }: WorkSectionProps) {
  const [displayMode, setDisplayMode] = useState<'stack' | 'grid'>('grid');

  return (
    <SectionWrap id="work">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="mb-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          Recent Projects
        </h2>
        <DisplayToggle value={displayMode} onChange={setDisplayMode} />
      </div>
      <div
        className={`flex flex-col gap-6 ${
          displayMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2' : ''
        }`}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onViewCaseStudy={onViewCaseStudy}
          />
        ))}
      </div>
    </SectionWrap>
  );
}
