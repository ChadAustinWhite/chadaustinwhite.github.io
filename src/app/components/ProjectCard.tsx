import type { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  onViewCaseStudy: (route: ProjectItem['caseStudyRoute']) => void;
  onRequestAccess: (route: ProjectItem['caseStudyRoute']) => void;
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

export function ProjectCard({ project, onViewCaseStudy, onRequestAccess }: ProjectCardProps) {
  const fit = project.imageObjectFit ?? 'cover';
  const mediaBg = fit === 'contain' ? 'bg-[var(--bg)]' : 'bg-[var(--border)]';

  return (
    <article className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
      <div
        className={`grid grid-cols-1 gap-0.5 overflow-hidden ${mediaBg} [aspect-ratio:16/9] md:[aspect-ratio:16/9]`}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className={`h-full w-full bg-[var(--bg)] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${fit === 'contain' ? 'object-contain object-center' : 'object-cover group-hover:scale-[1.03]'}`}
        />
      </div>
      <div className="p-5 md:px-9 md:py-7 md:pb-8">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1" />
          <span className="flex-shrink-0 text-xs text-[var(--ink-muted)]">{project.period}</span>
        </div>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium leading-tight tracking-[-0.01em] text-[var(--ink)] md:text-[22px]">
            {project.title}
          </h3>
        </div>
        <p className="mb-6 max-w-[640px] text-sm leading-relaxed text-[var(--ink-muted)] md:mb-6">
          {project.description}
        </p>
        <div className="flex justify-start">
          {project.comingSoon ? (
            <button
              type="button"
              onClick={() => onRequestAccess(project.caseStudyRoute)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-[18px] py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--bg)] transition-opacity duration-150 hover:opacity-75 whitespace-nowrap"
            >
              Request Access
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onViewCaseStudy(project.caseStudyRoute)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-[18px] py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--bg)] transition-opacity duration-150 hover:opacity-75 whitespace-nowrap"
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
