import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CaseStudyImageBreakProps {
  src: string;
  alt: string;
}

export function CaseStudyImageBreak({ src, alt }: CaseStudyImageBreakProps) {
  return (
    <div className="w-full px-[var(--cs-page-gutter)] leading-none">
      <ImageWithFallback
        src={src}
        alt={alt}
        loading="lazy"
        className="block h-[300px] w-full rounded-xl object-cover object-top md:h-[480px]"
      />
    </div>
  );
}
