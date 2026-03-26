import type { Metric } from './types';
import { CaseStudySectionHeader } from './CaseStudySectionLayout';

interface CaseStudyHeroResultsProps {
  heading?: string;
  /** Bar label right side (e.g. RESULTS); defaults to uppercase heading. */
  sectionLabel?: string;
  /** Optional secondary text displayed underneath the section bar. */
  sectionSubtitle?: string;
  metrics: Metric[];
  gallery?: string[];
}

/**
 * “Results” heading + metric grid (value on top, label below), optional image row under metrics.
 */
export function CaseStudyHeroResults({
  heading = 'Results',
  sectionLabel,
  sectionSubtitle,
  metrics,
  gallery,
}: CaseStudyHeroResultsProps) {
  if (!metrics.length) return null;

  const barLabel = sectionLabel?.trim() || heading.toUpperCase();
  const subtitle = sectionSubtitle?.trim();

  return (
    <section
      className="px-[var(--cs-page-gutter)] py-14 md:py-20"
      style={{ color: 'var(--ink)' }}
      aria-labelledby="cs-hero-results-heading"
    >
      <div className="w-full">
        <CaseStudySectionHeader sectionLabel={barLabel} />

        {subtitle ? (
          <p className="mt-6 text-[15px] leading-[1.7] text-[var(--ink-muted)] md:text-[17px]">
            {subtitle}
          </p>
        ) : null}

        <h2
          id="cs-hero-results-heading"
          className={`font-normal leading-[1.15] tracking-[-0.02em] text-[var(--ink)] ${
            subtitle ? 'mt-6 md:mt-10' : 'mt-10 md:mt-14'
          }`}
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
