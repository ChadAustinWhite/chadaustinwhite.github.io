import type { SectionImageCaption } from './types';

const PLACEHOLDER_CAPTION: SectionImageCaption = {
  heading: 'Section detail',
  paragraphs: [
    'Add a short description of what this image shows and how it supports the section narrative.',
  ],
};

interface CaseStudyImageCaptionProps {
  /** When provided, use this; otherwise show placeholder. */
  caption?: SectionImageCaption | null;
}

/** Block under a section image: bold heading + paragraphs (Fit Finder–style). */
export function CaseStudyImageCaption({ caption }: CaseStudyImageCaptionProps) {
  const { heading, paragraphs } =
    caption?.paragraphs?.length ? caption : PLACEHOLDER_CAPTION;
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
