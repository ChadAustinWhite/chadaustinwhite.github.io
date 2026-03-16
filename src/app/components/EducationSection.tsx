import React from 'react';
import { SectionWrap } from './SectionWrap';
import { education } from '../data/portfolioData';
import type { EducationItem } from '../data/portfolioData';

function EducationCard({ item }: { item: EducationItem }) {
  return (
    <article className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
      <div className="p-5 md:px-9 md:py-7 md:pb-8">
        {item.initials && (
          <div
            className="mb-3 flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card-bg)]"
            style={{ marginTop: '1px' }}
          >
            <span className="text-[9px] font-bold tracking-[0.04em] text-[var(--ink-muted)]">
              {item.initials}
            </span>
          </div>
        )}
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1" />
          <span className="flex-shrink-0 text-xs text-[var(--ink-muted)]">{item.degree}</span>
        </div>
        <h3 className="mb-2 text-lg font-medium leading-tight tracking-[-0.01em] text-[var(--ink)] md:text-[22px]">
          {item.school}
        </h3>
        <p className="max-w-[640px] text-sm leading-relaxed text-[var(--ink-muted)]">
          {item.detail}
        </p>
      </div>
    </article>
  );
}

export function EducationSection() {
  return (
    <SectionWrap id="education">
      <h2 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
        Education
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {education.map((item) => (
          <EducationCard key={`${item.school}-${item.degree}`} item={item} />
        ))}
      </div>
    </SectionWrap>
  );
}
