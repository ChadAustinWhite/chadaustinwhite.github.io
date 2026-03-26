import type { CaseStudyContent } from './types';
import { PLACEHOLDER_IMAGE_HERO } from './constants';
import { CaseStudyProjectOverview } from './CaseStudyProjectOverview';
import { CaseStudyHeroResults } from './CaseStudyHeroResults';
import { CaseStudyHeroDiscovery } from './CaseStudyHeroDiscovery';

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
      {/* Hero header: no background so scroll-driven --bg shows through */}
      <div
        className="px-5 pt-[7.5rem] pb-12 md:px-10 md:pt-[7.5rem] md:pb-12"
        style={{ color: 'var(--ink)' }}
      >
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-1.5 text-[11px] leading-[1.65] transition-colors duration-150 hover:opacity-100"
          style={{ color: 'var(--ink-muted)' }}
          aria-label="Back to Work"
        >
          <BackArrow />
          Work
        </button>
        <span
          className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: 'var(--ink-muted)' }}
        >
          Case Study
        </span>
        <h1
          className="mb-8 font-normal leading-[1.08] tracking-[-0.025em]"
          style={{ fontSize: 'clamp(34px, 5vw, 64px)', color: 'var(--ink)' }}
        >
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
              <span
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: 'var(--ink-muted)' }}
              >
                {label}
              </span>
              <div className="text-base" style={{ color: 'var(--ink)' }}>
                {meta[key]}
              </div>
            </div>
          ))}
        </div>

        {meta.organizationNote ? (
          <p
            className="mb-2 max-w-[80ch] text-[15px] leading-[1.7] text-[var(--ink-muted)] md:text-[17px]"
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
      <div className="px-5 pb-12 md:px-10 md:pb-16" style={{ background: 'var(--bg)' }}>
        <div className="max-h-[80vh] w-full overflow-hidden">
          <img
            src={getHeroImageSrc(content)}
            alt=""
            className="h-full min-h-[400px] w-full object-cover pt-[129px]"
          />
        </div>
        <CaseStudyProjectOverview content={content} />
        {content.heroDiscovery ? (
          <CaseStudyHeroDiscovery
            sectionLabel={content.heroDiscovery.sectionLabel}
            headline={content.heroDiscovery.headline}
            body={content.heroDiscovery.body}
            sections={content.heroDiscovery.sections}
          />
        ) : null}
        {content.heroResults?.metrics?.length ? (
          <CaseStudyHeroResults
            heading={content.heroResults.heading}
            sectionLabel={content.heroResults.sectionLabel}
            metrics={content.heroResults.metrics}
            gallery={content.heroResults.gallery}
          />
        ) : null}
      </div>
    </header>
  );
}
