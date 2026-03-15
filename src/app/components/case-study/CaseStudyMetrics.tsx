import type { Metric } from './types';

interface CaseStudyMetricsProps {
  heading: string;
  intro?: string;
  metrics: Metric[];
}

export function CaseStudyMetrics({ heading, intro, metrics }: CaseStudyMetricsProps) {
  return (
    <>
      <h2
        className="mb-6 max-w-[720px] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
        style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
      >
        {heading}
      </h2>
      {intro && (
        <p className="mb-12 max-w-[640px] text-[15px] leading-[1.7] text-[var(--ink-muted)]">
          {intro}
        </p>
      )}
      <div className="flex flex-col items-start gap-8 md:flex-row md:gap-0">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="max-w-[240px] border-r-0 pr-0 md:border-r md:border-[var(--border)] md:px-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <div
              className="mb-2 font-semibold leading-none tracking-[-0.03em] text-[var(--ink)]"
              style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}
            >
              {m.value}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.04em] text-[var(--ink-muted)]">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
