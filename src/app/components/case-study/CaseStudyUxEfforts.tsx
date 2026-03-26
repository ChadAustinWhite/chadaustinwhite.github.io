import type { CaseStudyUxEffortCard } from './types';
import { PLACEHOLDER_IMAGE_SECTION } from './constants';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';
import { CaseStudySectionHeader } from './CaseStudySectionLayout';

interface CaseStudyUxEffortsProps {
  cards: CaseStudyUxEffortCard[];
}

export function CaseStudyUxEfforts({ cards }: CaseStudyUxEffortsProps) {
  if (!cards.length) return null;

  return (
    <section
      id="cs-ux-efforts"
      className="border-t border-[var(--border)] px-[var(--cs-page-gutter)] py-16 md:py-24"
      aria-labelledby="cs-ux-efforts-heading"
    >
      <div className="mx-auto max-w-[72rem]">
        <CaseStudySectionHeader sectionLabel="UX EFFORTS" />
        <div id="cs-ux-efforts-heading" className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2" aria-label="UX efforts">
          {cards.map((card, i) => (
            <ScrollReveal key={`${card.title}-${i}`}>
              <article className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                {/* Visual container: placeholder or image */}
                <div className="relative overflow-hidden rounded-t-xl bg-[var(--border)]">
                  <div className="aspect-[16/10] w-full">
                    <ImageWithFallback
                      src={card.image || PLACEHOLDER_IMAGE_SECTION}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {card.metric && (
                    <div className="absolute bottom-3 left-3 rounded-lg bg-[var(--ink)] px-3 py-2">
                      <span className="block text-[15px] font-semibold leading-tight text-[var(--bg)]">
                        {card.metric.value}
                      </span>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--bg)] opacity-90">
                        {card.metric.label}
                      </span>
                    </div>
                  )}
                  {card.quote && (
                    <div className="absolute right-3 top-3 max-w-[55%] rounded-lg bg-white/95 px-3 py-2 text-[13px] leading-snug text-[#1c1c1a] shadow-sm">
                      {card.quote}
                    </div>
                  )}
                </div>
                {/* Title, tags, description */}
                <div className="p-5 md:p-6">
                  <h3 className="mb-3 text-[15px] font-medium leading-[1.4] tracking-[-0.01em] text-[var(--ink)] md:text-[17px]">
                    {card.title}
                  </h3>
                  {card.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-[15px] leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
                    {card.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
