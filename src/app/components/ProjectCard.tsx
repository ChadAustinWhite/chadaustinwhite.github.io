import type { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  onViewCaseStudy: (route: ProjectItem['caseStudyRoute']) => void;
  onRequestAccess: (route: ProjectItem['caseStudyRoute']) => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProjectCard({
  project,
  onViewCaseStudy,
  onRequestAccess,
  onHoverStart,
  onHoverEnd,
}: ProjectCardProps) {
  const hasMockup = Boolean(project.image);
  const fit = project.imageObjectFit ?? 'cover';
  /** Standard tiles use `--border`; charcoal contrasts light UI mocks in `contain` mode. */
  const mediaBg =
    project.imageMediaMatteTone === 'charcoal' ? 'bg-[#2d2d2d]' : 'bg-[var(--border)]';
  const intrinsicW = project.imageIntrinsicWidthPx;
  const intrinsicH = project.imageIntrinsicHeightPx;
  const cappedContain = hasMockup && fit === 'contain' && intrinsicW != null;

  const imgSizingClass = cappedContain
    ? 'h-auto w-auto max-h-full bg-transparent object-contain [image-rendering:auto]'
    : `h-full w-full bg-[var(--bg)] [transform:translateZ(0)] [image-rendering:auto] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none ${
        fit === 'contain' ? 'object-contain object-center' : 'object-cover group-hover:scale-[1.03]'
      }`;

  return (
    <article
      className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] transition-[background-color,box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--card-bg-hover)] hover:bg-[var(--card-bg-hover)] hover:shadow-[0_8px_32px_rgba(45,45,45,0.06)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div
        className={`grid grid-cols-1 gap-0.5 overflow-hidden ${mediaBg} [aspect-ratio:16/9] md:[aspect-ratio:16/9]`}
      >
        {!hasMockup ? (
          <div className="h-full min-h-0 w-full" aria-hidden />
        ) : cappedContain ? (
          <div className="flex h-full min-h-0 w-full items-center justify-center">
            <img
              src={project.image}
              alt={project.imageAlt ?? ''}
              width={intrinsicW}
              height={intrinsicH ?? undefined}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 768px) min(900px, 50vw), min(920px, 100vw)"
              style={{
                maxWidth: `min(100%, ${intrinsicW}px)`,
                maxHeight: '100%',
              }}
              className={imgSizingClass}
            />
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.imageAlt ?? ''}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) min(900px, 50vw), min(920px, 100vw)"
            className={imgSizingClass}
          />
        )}
      </div>
      <div className="p-5 md:px-9 md:py-7 md:pb-8">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h3 className="min-w-0 flex-1 text-lg font-medium leading-tight tracking-[-0.01em] text-[var(--ink)] md:text-[22px]">
            {project.title}
          </h3>
          <span className="flex-shrink-0 text-xs leading-none text-[var(--ink-muted)] tabular-nums">
            {project.period}
          </span>
        </div>
        <p className="mb-6 max-w-[640px] text-sm leading-relaxed text-[var(--ink-muted)] md:mb-6">
          {project.description}
        </p>
        <div className="flex justify-start">
          {project.comingSoon ? (
            <button
              type="button"
              onClick={() => onRequestAccess(project.caseStudyRoute)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-[18px] py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--bg)] transition-colors duration-150 hover:bg-[var(--ink-hover)] whitespace-nowrap"
            >
              Request Access
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onViewCaseStudy(project.caseStudyRoute)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-[18px] py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--bg)] transition-colors duration-150 hover:bg-[var(--ink-hover)] whitespace-nowrap"
            >
              View Case Study
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
