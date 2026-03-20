import type { SectionImageCaption } from './types';

interface CaseStudyImageCaptionProps {
  /** When provided, render it; otherwise render nothing. */
  caption?: SectionImageCaption | null;
}

/** Block under a section image: bold heading + paragraphs (Fit Finder–style). */
export function CaseStudyImageCaption({ caption }: CaseStudyImageCaptionProps) {
  if (!caption?.paragraphs?.length) return null;

  const { heading, paragraphs } = caption;
  return (
    <div className="mt-10 max-w-[720px]">
      <h3 className="mb-3 text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--ink)] md:text-2xl">
        {heading}
      </h3>
      <div className="space-y-3 text-[15px] font-bold leading-[1.65] text-[var(--ink)] md:text-[17px]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
