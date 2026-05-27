import type { WhyCard } from './types';
import { CaseStudySectionHeader } from './CaseStudySectionLayout';

interface CaseStudyHeroWhyMattersProps {
  sectionLabel?: string;
  headline?: string;
  intro?: string;
  cards: WhyCard[];
}

/**
 * Discovery-style two-column strip: section bar + left headline + intro + titled cards on the right.
 */
export function CaseStudyHeroWhyMatters({
  sectionLabel = 'WHY IT MATTERS',
  headline = 'Why It Matters',
  intro,
  cards,
}: CaseStudyHeroWhyMattersProps) {
  const hasIntro = Boolean(intro?.trim());
  if (!hasIntro && cards.length === 0) return null;

  return (
    <section
      className="px-[var(--cs-page-gutter)] py-14 md:py-20"
      style={{ color: 'var(--ink)' }}
      aria-labelledby="cs-hero-why-heading"
    >
      <div className="w-full">
        <CaseStudySectionHeader sectionLabel={sectionLabel} />

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <h2
              id="cs-hero-why-heading"
              className="serif-headline text-[clamp(34px,5vw,64px)] leading-[1.15] text-[var(--ink)]"
            >
              {headline}
            </h2>
          </div>
          <div className="min-w-0">
            {hasIntro ? (
              <p className="text-[15px] font-normal leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
                {intro}
              </p>
            ) : null}
            <div className={hasIntro ? 'mt-10 space-y-10 md:mt-12' : 'space-y-10'}>
              {cards.map((card, i) => (
                <div
                  key={`${card.title}-${i}`}
                  className={
                    i === 0 && !hasIntro
                      ? ''
                      : 'border-t border-[var(--border)] pt-6'
                  }
                >
                  <p className="mb-2 text-[15px] font-semibold uppercase text-[var(--ink)] md:text-[17px]">
                    {card.title}
                  </p>
                  <p className="text-[15px] font-normal leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
