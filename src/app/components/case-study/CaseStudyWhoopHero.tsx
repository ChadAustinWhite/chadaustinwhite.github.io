import type { CaseStudyContent } from './types';
import { PLACEHOLDER_IMAGE_HERO } from './constants';

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
        className="px-5 pt-[7.5rem] pb-12 md:px-[100px] md:pt-[7.5rem] md:pb-12"
        style={{ color: 'var(--ink)' }}
      >
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-1.5 text-[15px] leading-[1.65] transition-colors duration-150 hover:opacity-100 md:text-[17px]"
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
              <div className="text-base" style={{ color: 'var(--ink)' }}>{meta[key]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Below dark block: statement and hero image */}
      <div className="px-5 pb-12 md:px-[100px] md:pb-16" style={{ background: 'var(--bg)' }}>
        {(content.statement ?? content.tagline) && (
          <p className="mb-6 max-w-[720px] text-[17px] leading-[1.65] text-[var(--ink)] md:text-[20px]">
            {content.statement ?? content.tagline}
          </p>
        )}
        <div className="max-h-[80vh] w-full overflow-hidden">
          <img
            src={getHeroImageSrc(content)}
            alt=""
            className="h-full min-h-[400px] w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
