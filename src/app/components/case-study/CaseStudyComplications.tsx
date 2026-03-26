import type { ComplicationItem } from './types';

interface CaseStudyComplicationsProps {
  heading: string;
  intro?: string;
  items: ComplicationItem[];
}

export function CaseStudyComplications({ heading, intro, items }: CaseStudyComplicationsProps) {
  return (
    <>
      <h2
        className="mb-6 max-w-[720px] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
        style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
      >
        {heading}
      </h2>
      {intro && (
        <p className="mb-9 max-w-[640px] text-base leading-[1.7] text-[var(--ink-muted)]">
          {intro}
        </p>
      )}
      <div className="mt-2 grid grid-cols-1 gap-0 md:grid-cols-2 min-[900px]:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="border-b border-[var(--border)] py-7 first:pt-0"
          >
            <div className="mb-3 text-xs font-semibold tracking-[0.08em] text-[var(--ink-muted)]">
              {item.number}
            </div>
            <div className="mb-2 text-base font-medium leading-snug uppercase text-[var(--ink)]">
              {item.title}
            </div>
            <p className="text-base leading-[1.6] text-[var(--ink-muted)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
