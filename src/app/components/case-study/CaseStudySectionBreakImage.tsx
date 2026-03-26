import { PLACEHOLDER_IMAGE_SECTION } from './constants';

/** Full-width placeholder image between case study sections (matches section image framing). */
export function CaseStudySectionBreakImage() {
  return (
    <div className="px-[var(--cs-page-gutter)] py-8 md:py-12" aria-hidden>
      <div className="mx-auto max-w-[72rem] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
        <img src={PLACEHOLDER_IMAGE_SECTION} alt="" className="h-auto w-full object-cover" />
      </div>
    </div>
  );
}
