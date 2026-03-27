import type { HeroDiscoveryBlock } from './types';
import { PLACEHOLDER_IMAGE_SECTION } from './constants';
import { CaseStudySectionHeader } from './CaseStudySectionLayout';

interface CaseStudyHeroDiscoveryProps {
  sectionLabel?: string;
  headline: string;
  body?: string;
  sections?: HeroDiscoveryBlock[];
}

function DiscoveryBlocks({ blocks }: { blocks: HeroDiscoveryBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'label':
            return (
              <p
                key={i}
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]"
              >
                {block.text}
              </p>
            );
          case 'title':
            return (
              <p
                key={i}
                className="text-[17px] font-normal leading-[1.35] tracking-[-0.02em] text-[var(--ink)] md:text-[20px]"
              >
                {block.text}
              </p>
            );
          case 'paragraph':
            return (
              <p
                key={i}
                className="text-[15px] font-normal leading-[1.65] text-[var(--ink)] md:text-[17px]"
              >
                {block.text}
              </p>
            );
          case 'meta':
            return (
              <dl key={i} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-xl">
                {block.rows.map((row) => (
                  <div key={row.label}>
                    <dt className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                      {row.label}
                    </dt>
                    <dd className="text-[15px] text-[var(--ink)] md:text-[16px]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            );
          case 'subheading':
            return (
              <h3
                key={i}
                className="pt-2 text-[15px] font-semibold leading-[1.35] tracking-[-0.01em] text-[var(--ink)] md:text-[20px]"
              >
                {block.text}
              </h3>
            );
          case 'card':
            return (
              <div key={i} className="border-b border-[var(--border)] pb-6 last:border-b-0">
                <p className="mb-2 text-[13px] font-semibold text-[var(--ink)] md:text-[14px]">
                  {block.title}
                </p>
                <p className="text-[15px] font-normal leading-[1.65] text-[var(--ink-muted)] md:text-[16px]">
                  {block.body}
                </p>
              </div>
            );
          case 'numbered':
            return (
              <div key={i} className="border-t border-[var(--border)] pt-6">
                <div className="flex gap-4 md:gap-6">
                  <span className="shrink-0 pt-0.5 text-[11px] font-normal tabular-nums text-[var(--ink-muted)]">
                    {block.number}
                  </span>
                  <div>
                    <p className="mb-2 text-[15px] font-semibold uppercase text-[var(--ink)] md:text-[16px]">
                      {block.title}
                    </p>
                    <p className="text-[15px] font-normal leading-[1.65] text-[var(--ink-muted)] md:text-[16px]">
                      {block.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          case 'placeholder':
            return (
              <div
                key={i}
                className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--card-bg)] px-4 py-8 text-center text-[13px] text-[var(--ink-muted)]"
              >
                {block.caption}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/**
 * Discovery block: header + headline + either stacked sections or two-column bullet body.
 */
export function CaseStudyHeroDiscovery({
  sectionLabel = 'DISCOVERY',
  headline,
  body,
  sections,
}: CaseStudyHeroDiscoveryProps) {
  const useSections = sections && sections.length > 0;

  return (
    <section
      className="px-[var(--cs-page-gutter)] py-14 md:py-20"
      style={{ color: 'var(--ink)' }}
      aria-labelledby="cs-hero-discovery-heading"
    >
      <div className="w-full">
        <div className="mb-10 w-full overflow-hidden rounded-xl md:mb-12">
          <div className="max-h-[80vh] w-full overflow-hidden">
            <img
              src={PLACEHOLDER_IMAGE_SECTION}
              alt=""
              className="h-full min-h-[280px] w-full object-cover md:min-h-[400px]"
            />
          </div>
        </div>

        <CaseStudySectionHeader sectionLabel={sectionLabel} />

        {useSections ? (
          <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div>
              <h2
                id="cs-hero-discovery-heading"
                className="font-normal leading-[1.15] tracking-[-0.02em] text-[var(--ink)]"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                {headline}
              </h2>
            </div>
            <div className="flex min-w-0 flex-col">
              <DiscoveryBlocks blocks={sections} />
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-16 lg:gap-24">
            <h2
              id="cs-hero-discovery-heading"
              className="font-normal leading-[1.15] tracking-[-0.02em] text-[var(--ink)]"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
            >
              {headline}
            </h2>

            <div className="flex gap-4 md:min-w-0 md:gap-6">
              <span
                className="mt-1.5 h-4 w-4 shrink-0 rounded-full bg-[var(--ink)] md:mt-2 md:h-5 md:w-5"
                aria-hidden
              />
              <p className="text-[15px] font-normal leading-[1.65] text-[var(--ink)] md:text-[17px]">
                {body ?? ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
