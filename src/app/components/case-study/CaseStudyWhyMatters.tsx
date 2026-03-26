import type { WhyCard } from './types';

interface CaseStudyWhyMattersProps {
  heading: string;
  intro?: string;
  cards: WhyCard[];
}

export function CaseStudyWhyMatters({ heading, intro, cards }: CaseStudyWhyMattersProps) {
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
      <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-6 py-7 md:px-9 md:pt-7 md:pb-8"
          >
            <div className="mb-3 text-base font-medium leading-snug uppercase text-[var(--ink)]">
              {card.title}
            </div>
            <p className="text-base leading-[1.65] text-[var(--ink-muted)]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
