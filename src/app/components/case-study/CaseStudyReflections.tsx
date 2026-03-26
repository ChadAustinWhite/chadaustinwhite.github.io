import type { Reflection } from './types';
import { CaseStudySectionHeader } from './CaseStudySectionLayout';
import { ScrollReveal } from './ScrollReveal';

interface CaseStudyReflectionsProps {
  heading: string;
  reflections: Reflection[];
}

/**
 * Closing section: same shell and tokens as UX efforts / testimonial / strategy blocks.
 */
export function CaseStudyReflections({ heading, reflections }: CaseStudyReflectionsProps) {
  if (!reflections.length) return null;

  return (
    <section
      id="cs-reflections"
      className="border-t border-[var(--border)] px-[var(--cs-page-gutter)] py-16 md:py-24"
      aria-labelledby="cs-reflections-heading"
    >
      <div className="mx-auto max-w-[72rem]">
        <CaseStudySectionHeader sectionLabel="REFLECTIONS" />

        <h2
          id="cs-reflections-heading"
          className="mt-10 max-w-[720px] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          {heading}
        </h2>

        <div className="mt-12 flex flex-col gap-12 md:mt-16 md:gap-14">
          {reflections.map((r, i) => (
            <ScrollReveal key={`reflect-row-${i}`}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                    {r.label}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[15px] font-normal leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
                    {r.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
