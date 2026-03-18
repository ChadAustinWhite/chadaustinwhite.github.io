import type { CaseStudyMeta } from './types';

interface CaseStudyHeroProps {
  onBack: () => void;
  title: string;
  meta: CaseStudyMeta;
  tagline: string;
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

export function CaseStudyHero({ onBack, title, meta, tagline }: CaseStudyHeroProps) {
  return (
    <header id="cs-hero" className="px-5 pt-[7.5rem] pb-[4.5rem] md:px-[100px] md:pt-[7.5rem] md:pb-[4.5rem]">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]"
      >
        <BackArrow />
        Back to Work
      </button>
      <h1
        className="mb-12 max-w-[800px] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
        style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
      >
        {title}
      </h1>
      <div className="mb-12 flex flex-wrap gap-8 border-b border-[var(--border)] pb-12 md:gap-12">
        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            Organization
          </span>
          <div className="text-base text-[var(--ink)]">{meta.organization}</div>
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            Role
          </span>
          <div className="text-base text-[var(--ink)]">{meta.role}</div>
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            Year
          </span>
          <div className="text-base text-[var(--ink)]">{meta.year}</div>
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            Duration
          </span>
          <div className="text-base text-[var(--ink)]">{meta.duration}</div>
        </div>
      </div>
      <p
        className="max-w-[720px] font-normal leading-[1.65] text-[var(--ink-muted)]"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.0625rem)' }}
      >
        {tagline}
      </p>
    </header>
  );
}
