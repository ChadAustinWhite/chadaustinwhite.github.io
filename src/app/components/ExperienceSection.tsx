import { SectionWrap } from './SectionWrap';
import { TimelineCard } from './TimelineCard';
import { experience } from '../data/portfolioData';
import React from 'react';

export function ExperienceSection() {
  return (
    <SectionWrap id="experience">
      <h2 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--experience-section-label,var(--ink-muted))]">
        Experience
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {experience.map((item) => (
          <TimelineCard key={`${item.company}-${item.period}`} item={item} />
        ))}
      </div>
    </SectionWrap>
  );
}
