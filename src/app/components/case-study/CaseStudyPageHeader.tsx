import type { CaseStudyContent } from './types';

const META_LABELS = [
  { key: 'organization' as const, label: 'Organization' },
  { key: 'role' as const, label: 'Role' },
  { key: 'year' as const, label: 'Year' },
  { key: 'duration' as const, label: 'Duration' },
] as const;

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path
      d="M8.5 2.5L4 7l4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface CaseStudyHeroMetric {
  label: string;
  value: string;
}

interface CaseStudyPageHeaderProps {
  content: CaseStudyContent;
  onBack: () => void;
  metrics?: CaseStudyHeroMetric[];
}

export function CaseStudyPageHeader({ content, onBack, metrics }: CaseStudyPageHeaderProps) {
  const { meta } = content;

  return (
    <header id="cs-hero">
      <button
        type="button"
        onClick={onBack}
        className="cs-text-meta mb-8 inline-flex items-center gap-1.5 text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
        aria-label="Back to Work"
      >
        <BackArrow />
        Work
      </button>

      <p className="cs-text-label mb-4 text-[var(--ink-muted)]">Case Study</p>

      <h1 className="serif-headline mb-8 text-[clamp(34px,5vw,64px)] leading-[1.08] text-[var(--ink)]">
        {content.heroTitleLines ? (
          <>
            {content.heroTitleLines[0]}
            <br />
            {content.heroTitleLines[1]}
          </>
        ) : (
          content.title
        )}
      </h1>

      <div className="mb-8 flex flex-wrap gap-8 md:gap-12">
        {META_LABELS.map(({ key, label }) => (
          <div key={key}>
            <span className="cs-text-label mb-1.5 block text-[var(--ink-muted)]">{label}</span>
            <div className="cs-text-body text-[var(--ink)]">{meta[key]}</div>
          </div>
        ))}
      </div>

      {meta.organizationNote ? (
        <p className="cs-text-lead max-w-[80ch] text-[var(--ink-muted)]">{meta.organizationNote}</p>
      ) : null}

      {metrics && metrics.length > 0 ? (
        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 md:mt-10 md:gap-x-12">
          {metrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="serif-headline text-[11px] leading-snug text-[var(--ink-muted)] md:text-xs">
                {metric.label}
              </dt>
              <dd className="serif-headline mt-1 text-base font-medium leading-tight tracking-[-0.02em] text-[var(--ink)] tabular-nums md:text-lg">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}
