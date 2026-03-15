import React from 'react';
import type { EducationItem } from '../data/portfolioData';

interface EducationRowProps {
  item: EducationItem;
  isFirst?: boolean;
}

export function EducationRow({ item, isFirst }: EducationRowProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-1 border-[var(--border)] py-4 md:grid-cols-[188px_1fr] md:gap-0 md:py-[18px] ${
        isFirst ? 'border-t' : ''
      } border-b`}
    >
      <div className="pt-0.5 text-xs text-[var(--ink-muted)] md:pt-0.5">{item.degree}</div>
      <div>
        <div className="mb-0.5 text-[15px] font-medium text-[var(--ink)]">{item.school}</div>
        <div className="text-xs text-[var(--ink-muted)]">{item.detail}</div>
      </div>
    </div>
  );
}
