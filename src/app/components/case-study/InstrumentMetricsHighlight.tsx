import type { CaseStudySonosMetric } from './types';

export function InstrumentMetricsHighlight({
  metrics,
  eyebrow,
}: {
  metrics: CaseStudySonosMetric[];
  eyebrow?: string;
}) {
  return (
    <div className="case-study-instrument__metrics-highlight">
      {eyebrow ? (
        <p className="case-study-instrument__metrics-highlight-eyebrow">{eyebrow}</p>
      ) : null}
      <div role="list">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="case-study-instrument__metrics-highlight-row"
            role="listitem"
            aria-label={`${eyebrow ? `${eyebrow}: ` : ''}${metric.label} ${metric.value}`}
          >
            <p className="case-study-instrument__metrics-highlight-value serif-headline tabular-nums">
              {metric.value}
            </p>
            <p className="case-study-instrument__metrics-highlight-label serif-headline">
              {metric.label}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
