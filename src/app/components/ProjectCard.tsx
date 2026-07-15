import type { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  onViewCaseStudy: (route: ProjectItem['caseStudyRoute']) => void;
  onRequestAccess: (route: ProjectItem['caseStudyRoute']) => void;
  onCtaHoverStart?: () => void;
  onCtaHoverEnd?: () => void;
}

const projectCtaClass =
  'project-cta inline-flex items-center gap-2 rounded-full bg-[var(--bg)] px-4 py-2 text-xs font-normal text-[var(--ink)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--ink)_6%,var(--bg))] whitespace-nowrap md:px-5 md:text-[13px]';

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
  const mediaBg =
    project.imageMediaMatteTone === 'charcoal' ? 'bg-[#2d2d2d]' : 'bg-[var(--border)]';
  const intrinsicW = project.imageIntrinsicWidthPx;
  const intrinsicH = project.imageIntrinsicHeightPx;
  const cappedContain = hasMockup && fit === 'contain' && intrinsicW != null;

  const imgSizingClass = cappedContain
    ? 'h-auto w-auto max-h-full bg-transparent object-contain [image-rendering:auto]'
    : `h-full w-full bg-transparent [transform:translateZ(0)] [image-rendering:auto] ${
        fit === 'contain' ? 'object-contain object-center' : 'object-cover object-center'
      }`;

  return (
    <article className="project-card overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--card-bg)] md:rounded-[2rem]">
      <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-10 md:pb-9">
        <header className="flex flex-col items-start gap-4 md:gap-5">
          <span className="inline-flex rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-medium leading-none tracking-[-0.01em] text-[var(--ink)] tabular-nums md:text-[13px]">
            {project.period}
          </span>
          <h3 className="serif-headline whitespace-nowrap text-[1.65rem] leading-[1.12] tracking-[-0.02em] text-[var(--ink)] md:text-[2.15rem]">
            {project.title}
          </h3>
        </header>

        <div className={`project-card__media overflow-hidden rounded-2xl ${mediaBg}`}>
          {!hasMockup ? (
            <div className="h-full min-h-0 w-full" aria-hidden />
          ) : cappedContain ? (
            <div className="flex h-full min-h-0 w-full items-center justify-center p-3 md:p-5">
              <img
                src={project.image}
                alt={project.imageAlt ?? ''}
                width={intrinsicW}
                height={intrinsicH ?? undefined}
                loading="lazy"
                decoding="async"
                draggable={false}
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
              draggable={false}
              sizes="(min-width: 768px) min(900px, 50vw), min(920px, 100vw)"
              className={imgSizingClass}
            />
          )}
        </div>

        <div className="flex flex-col gap-7 md:gap-8">
          <p className="max-w-[40rem] text-[0.95rem] leading-relaxed text-[var(--ink)] md:text-[1.05rem] md:leading-[1.55]">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <p className="serif-headline text-[1.85rem] font-medium leading-none tracking-[-0.03em] text-[var(--ink)] tabular-nums md:text-[2.35rem]">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-[var(--ink-muted)] md:text-[0.95rem]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

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
      </div>
    </article>
  );
}
