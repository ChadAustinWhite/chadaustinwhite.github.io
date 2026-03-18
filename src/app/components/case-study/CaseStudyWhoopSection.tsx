import type { StrategySection } from './types';
import { PLACEHOLDER_IMAGE_SECTION, PLACEHOLDER_IMAGE_SUB } from './constants';
import { CaseStudyImageCaption } from './CaseStudyImageCaption';
import { ScrollReveal } from './ScrollReveal';
import { CaseStudySectionLayout } from './CaseStudySectionLayout';

interface CaseStudyWhoopSectionProps {
  section: StrategySection;
}

export function CaseStudyWhoopSection({ section }: CaseStudyWhoopSectionProps) {
  return (
    <section className="border-t border-[var(--border)] px-5 py-16 md:px-[100px] md:py-24">
      <div className="mx-auto max-w-[72rem]">
        <ScrollReveal>
          <CaseStudySectionLayout
            sectionLabel={section.category.toUpperCase()}
            headline={section.heading}
            body={section.body}
          >
            <div className="mt-10 w-full overflow-hidden rounded-xl">
              <img
                src={section.image || PLACEHOLDER_IMAGE_SECTION}
                alt=""
                className="h-auto w-full object-cover"
              />
            </div>
            {section.imageCaption ? (
              <CaseStudyImageCaption caption={section.imageCaption} />
            ) : section.subsections?.length ? null : (
              <CaseStudyImageCaption />
            )}
            {section.subsections?.map((sub, i) => (
              <div key={i} className="mt-12">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                  {sub.label}
                </p>
                <h3 className="mb-3 max-w-[720px] text-xl font-medium leading-snug tracking-[-0.01em] text-[var(--ink)] md:text-2xl">
                  {sub.heading}
                </h3>
                <div className="max-w-[720px] space-y-3 text-[15px] leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
                  {sub.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {(sub.images?.length ? sub.images : [PLACEHOLDER_IMAGE_SUB, PLACEHOLDER_IMAGE_SUB]).map(
                    (src, j) => (
                      <img
                        key={j}
                        src={src}
                        alt=""
                        className="h-auto w-full rounded-lg object-cover"
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </CaseStudySectionLayout>
        </ScrollReveal>
      </div>
    </section>
  );
}
