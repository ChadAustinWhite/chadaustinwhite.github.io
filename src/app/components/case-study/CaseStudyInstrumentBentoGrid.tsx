import type { CaseStudyInstrumentBentoGrid as BentoGridData } from './types';

const GUTTER = 'px-[var(--cs-page-gutter)]';

interface CaseStudyInstrumentBentoGridProps {
  grid: BentoGridData;
}

/** Staggered scroll-lag: primary moves first, tertiary last. */
const BENTO_PARALLAX: Record<
  string,
  { speed: string; delay: string }
> = {
  'case-study-instrument__bento-cell--primary': { speed: '0.09', delay: '0' },
  'case-study-instrument__bento-cell--secondary': { speed: '0.14', delay: '160' },
  'case-study-instrument__bento-cell--tertiary': { speed: '0.19', delay: '320' },
};

function BentoCell({ image, className }: { image: BentoGridData['primary']; className: string }) {
  const { speed, delay } = BENTO_PARALLAX[className] ?? { speed: '0.12', delay: '0' };

  return (
    <div className={`case-study-instrument__bento-cell ${className}`}>
      <div
        className="case-study-instrument__parallax-media"
        data-parallax
        data-parallax-mode="scroll-lag"
        data-parallax-speed={speed}
        data-parallax-delay={delay}
      >
        <img
          src={image.src}
          alt={image.alt ?? ''}
          className="case-study-instrument__bento-img"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 768px) 55vw, 100vw"
        />
      </div>
    </div>
  );
}

export function CaseStudyInstrumentBentoGrid({ grid }: CaseStudyInstrumentBentoGridProps) {
  return (
    <figure className="case-study-instrument__bento-figure">
      <div className={`${GUTTER} case-study-instrument__bento-shell`}>
        <div className="case-study-instrument__bento">
          <BentoCell image={grid.primary} className="case-study-instrument__bento-cell--primary" />
          <BentoCell image={grid.secondary} className="case-study-instrument__bento-cell--secondary" />
          <BentoCell image={grid.tertiary} className="case-study-instrument__bento-cell--tertiary" />
        </div>
      </div>
      {grid.caption ? (
        <figcaption
          className={`${GUTTER} case-study-instrument__caption mx-auto mt-4 max-w-[72rem] md:mt-5`}
        >
          {grid.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
