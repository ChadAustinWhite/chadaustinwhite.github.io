import type { ReactNode } from 'react';

const BRAND_LABEL = 'Chad Austin White';

/** Header bar only: brand left, / LABEL right. Use for sections that have custom content below. */
export function CaseStudySectionHeader({ sectionLabel }: { sectionLabel: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-[var(--border)] pb-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
        {BRAND_LABEL}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
        / {sectionLabel}
      </span>
    </div>
  );
}

interface CaseStudySectionLayoutProps {
  /** Right side of header, e.g. "DETAILS", "STRATEGY", "OVERVIEW" */
  sectionLabel: string;
  /** Left column: large headline */
  headline: string;
  /** Right column: body paragraphs. */
  body: string[];
  /** Optional content below the two-column block (e.g. image, subsections) */
  children?: ReactNode;
}

export function CaseStudySectionLayout({
  sectionLabel,
  headline,
  body,
  children,
}: CaseStudySectionLayoutProps) {
  return (
    <>
      <CaseStudySectionHeader sectionLabel={sectionLabel} />

      {/* Two-column: headline left, body right */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h2
            className="line-clamp-3 font-bold uppercase leading-tight tracking-tight text-[var(--ink)]"
            style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}
          >
            {headline}
          </h2>
        </div>
        <div className="space-y-4 text-[15px] font-normal leading-[1.65] text-[var(--ink)] md:col-span-7 md:text-[17px]">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {children}
    </>
  );
}
