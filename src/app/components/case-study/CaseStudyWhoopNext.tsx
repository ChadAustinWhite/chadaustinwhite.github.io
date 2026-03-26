import type { CaseStudyRoute } from '../../data/portfolioData';
import type { ProjectItem } from '../../data/portfolioData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CaseStudySectionHeader } from './CaseStudySectionLayout';

interface CaseStudyWhoopNextProps {
  relatedProjects: ProjectItem[];
  onViewCaseStudy: (route: CaseStudyRoute) => void;
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

export function CaseStudyWhoopNext({ relatedProjects, onViewCaseStudy }: CaseStudyWhoopNextProps) {
  return (
    <section
      id="cs-related"
      className="border-t border-[var(--border)] px-[var(--cs-page-gutter)] py-16 md:py-24"
      aria-labelledby="cs-related-heading"
    >
      <div className="mx-auto max-w-[72rem]">
        <CaseStudySectionHeader sectionLabel="RELATED CASE STUDIES" />
        <div id="cs-related-heading" className="mt-10">
        {relatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 min-[900px]:grid-cols-3">
            {relatedProjects.map((project) => (
              <article
                key={project.caseStudyRoute}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="mb-2 text-[15px] font-medium leading-tight tracking-[-0.01em] text-[var(--ink)] md:text-[17px]">
                    {project.title}
                  </h3>
                  <p className="mb-5 max-w-[640px] text-[15px] leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
                    {project.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => onViewCaseStudy(project.caseStudyRoute)}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-[18px] py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--bg)] transition-opacity duration-150 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
                  >
                    View case study
                    <ArrowIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[15px] leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
            More case studies coming soon.
          </p>
        )}
        </div>
      </div>
    </section>
  );
}
