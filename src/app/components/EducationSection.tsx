import React from 'react';
import { SectionWrap } from './SectionWrap';
import { EducationRow } from './EducationRow';
import { education } from '../data/portfolioData';

export function EducationSection() {
  return (
    <SectionWrap id="education">
      <h2 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
        Education
      </h2>
      <div className="flex flex-col">
        {education.map((item, index) => (
          <EducationRow key={`${item.school}-${item.degree}`} item={item} isFirst={index === 0} />
        ))}
      </div>
    </SectionWrap>
  );
}
