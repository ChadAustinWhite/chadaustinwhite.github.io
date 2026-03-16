import type { Reflection } from './types';

interface CaseStudyReflectionsProps {
  heading: string;
  reflections: Reflection[];
}

export function CaseStudyReflections({ heading, reflections }: CaseStudyReflectionsProps) {
  return (
    <>
      <h2
        className="mb-8 max-w-[720px] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
        style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
      >
        {heading}
      </h2>
      <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
        {reflections.map((r, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-6 py-7 md:px-9 md:pt-7 md:pb-8"
          >
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
              {r.label}
            </span>
            <p className="text-base leading-[1.7] text-[var(--ink-muted)]">{r.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
