import type { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  onViewCaseStudy: (route: ProjectItem['caseStudyRoute']) => void;
  onRequestAccess: (route: ProjectItem['caseStudyRoute']) => void;
  onCtaHoverStart?: () => void;
  onCtaHoverEnd?: () => void;
}

const projectCtaClass =
  'project-cta inline-flex items-center gap-2 rounded-full bg-[var(--project-cta-bg)] px-4 py-2 text-xs font-normal text-[var(--ink)] transition-colors duration-150 hover:bg-[var(--project-cta-bg-hover)] whitespace-nowrap md:px-5 md:text-[13px]';

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
  onCtaHoverStart,
  onCtaHoverEnd,
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
    : `h-full w-full bg-[var(--bg)] [transform:translateZ(0)] [image-rendering:auto] ${
        fit === 'contain' ? 'object-contain object-center' : 'object-cover'
      }`;

  return (
    <article
      className="project-card overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
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
          <h3 className="serif-headline min-w-0 flex-1 text-lg leading-tight text-[var(--ink)] md:text-[22px]">
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
              onMouseEnter={onCtaHoverStart}
              onMouseLeave={onCtaHoverEnd}
              className={projectCtaClass}
            >
              Request access
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onViewCaseStudy(project.caseStudyRoute)}
              onMouseEnter={onCtaHoverStart}
              onMouseLeave={onCtaHoverEnd}
              className={projectCtaClass}
            >
              View case study
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
