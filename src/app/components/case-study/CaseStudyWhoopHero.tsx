import type { CaseStudyContent } from './types';
import { PLACEHOLDER_IMAGE_HERO } from './constants';
import { CaseStudyProjectOverview } from './CaseStudyProjectOverview';
import { CaseStudyHeroResults } from './CaseStudyHeroResults';
import { CaseStudyHeroDiscovery } from './CaseStudyHeroDiscovery';
import { CaseStudyHeroWhyMatters } from './CaseStudyHeroWhyMatters';
import { CaseStudyTwoUpImageRow } from './CaseStudyTwoUpImageRow';

function getHeroImageSrc(content: CaseStudyContent): string {
  const images = content.images;
  if (typeof images === 'string') return images || PLACEHOLDER_IMAGE_HERO;
  if (Array.isArray(images) && images.length > 0 && images[0]) return images[0];
  return PLACEHOLDER_IMAGE_HERO;
}

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

interface CaseStudyWhoopHeroProps {
  content: CaseStudyContent;
  onBack: () => void;
}

const META_LABELS = [
  { key: 'organization' as const, label: 'Organization' },
  { key: 'role' as const, label: 'Role' },
  { key: 'year' as const, label: 'Year' },
  { key: 'duration' as const, label: 'Duration' },
];

export function CaseStudyWhoopHero({ content, onBack }: CaseStudyWhoopHeroProps) {
  const { meta } = content;

  return (
    <header id="cs-hero">
      <div
        className="bg-[var(--bg)] px-[var(--cs-page-gutter)] pt-[7.5rem] pb-12 md:pt-[7.5rem] md:pb-12"
        style={{ color: 'var(--ink)' }}
      >
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-1.5 text-[11px] leading-[1.5] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]"
          aria-label="Back to Work"
        >
          <BackArrow />
          Work
        </button>
        <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          Case Study
        </span>
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
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                {label}
              </span>
              <div className="text-[15px] text-[var(--ink)] md:text-[17px]">{meta[key]}</div>
            </div>
          ))}
        </div>

        {meta.organizationNote ? (
          <p
            className="mb-2 max-w-[80ch] text-[15px] leading-[1.65] text-[var(--ink-muted)] md:text-[17px]"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
          >
            {meta.organizationNote}
          </p>
        ) : null}
      </div>

      {/* Below dark block: hero image and project overview */}
      <div className="px-[var(--cs-page-gutter)] pb-12 md:pb-16" style={{ background: 'var(--bg)' }}>
        {content.heroImageObjectFit === 'contain' ? (
          <div className="flex w-full justify-center bg-[var(--border)]">
            <img
              src={getHeroImageSrc(content)}
              alt=""
              width={content.heroIntrinsicWidthPx}
              height={content.heroIntrinsicHeightPx}
              decoding="async"
              sizes="100vw"
              className="block h-auto w-full max-w-full [image-rendering:auto]"
              style={
                content.heroIntrinsicWidthPx != null
                  ? { maxWidth: `min(100%, ${content.heroIntrinsicWidthPx}px)` }
                  : undefined
              }
            />
          </div>
        ) : (
          <div className="max-h-[80vh] w-full overflow-hidden bg-[var(--bg)]">
            <img
              src={getHeroImageSrc(content)}
              alt=""
              className="h-full min-h-[400px] w-full object-cover pt-[129px]"
            />
          </div>
        )}
        <CaseStudyProjectOverview content={content} />
        {content.heroWhyItMatters &&
        (content.whyItMatters.intro?.trim() || content.whyItMatters.cards.length > 0) ? (
          <CaseStudyHeroWhyMatters
            intro={content.whyItMatters.intro}
            cards={content.whyItMatters.cards}
          />
        ) : null}
        {content.heroDiscovery ? (
          <CaseStudyHeroDiscovery
            sectionLabel={content.heroDiscovery.sectionLabel}
            headline={content.heroDiscovery.headline}
            body={content.heroDiscovery.body}
            sections={content.heroDiscovery.sections}
          />
        ) : null}
        {(content.heroBetweenDiscoveryAndResults ?? []).filter(Boolean).length > 0 ? (
          <div className="border-t border-[var(--border)] pt-10 pb-0 md:pt-14">
            <CaseStudyTwoUpImageRow urls={content.heroBetweenDiscoveryAndResults ?? []} />
          </div>
        ) : null}
        {content.heroResults?.metrics?.length ? (
          <CaseStudyHeroResults
            heading={content.heroResults.heading}
            sectionLabel={content.heroResults.sectionLabel}
            sectionSubtitle={content.heroResults.sectionSubtitle}
            imageAbove={content.heroResults.imageAbove}
            imageBelowAbove={content.heroResults.imageBelowAbove}
            metrics={content.heroResults.metrics}
            gallery={content.heroResults.gallery}
            tightTopAfterGallery={
              (content.heroBetweenDiscoveryAndResults ?? []).filter(Boolean).length > 0
            }
          />
        ) : null}
      </div>
    </header>
  );
}
