import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CaseStudyImageBreakProps {
  src: string;
  alt: string;
}

export function CaseStudyImageBreak({ src, alt }: CaseStudyImageBreakProps) {
  return (
    <div className="w-full px-5 leading-none md:px-[100px]">
      <ImageWithFallback
        src={src}
        alt={alt}
        loading="lazy"
        className="block h-[300px] w-full rounded-xl object-cover object-top md:h-[480px]"
      />
    </div>
  );
}
