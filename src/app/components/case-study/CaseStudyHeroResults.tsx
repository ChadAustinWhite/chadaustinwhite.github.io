import type { Metric } from './types';

interface CaseStudyHeroResultsProps {
  heading?: string;
  metrics: Metric[];
  gallery?: string[];
}

/**
 * “Results” heading + metric grid (value on top, label below), optional image row under metrics.
 */
export function CaseStudyHeroResults({ heading = 'Results', metrics, gallery }: CaseStudyHeroResultsProps) {
  if (!metrics.length) return null;

  return (
    <section
      className="px-5 py-14 md:px-10 md:py-20"
      style={{ color: 'var(--ink)' }}
      aria-labelledby="cs-hero-results-heading"
    >
      <div className="mx-auto max-w-[72rem]">
        <h2
          id="cs-hero-results-heading"
          className="font-normal leading-[1.15] tracking-[-0.02em] text-[var(--ink)]"
          style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
        >
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 md:mt-14 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
          {metrics.map((m, i) => (
            <div key={`${m.label}-${i}`} className="min-w-0 text-left">
              <div
                className="mb-3 font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 52px)' }}
              >
                {m.value.split('\n').map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-[var(--ink)] md:text-[11px]">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {gallery && gallery.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:gap-10">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm"
              >
                <img src={src} alt="" className="h-auto w-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
