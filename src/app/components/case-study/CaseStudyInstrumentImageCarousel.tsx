import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';
import type { CaseStudyInstrumentImage } from './types';

interface CaseStudyInstrumentImageCarouselProps {
  images: CaseStudyInstrumentImage[];
  /** Matches chapter `stackedImagesWidth`. */
  width?: 'prose' | 'wide';
}

function StackScrollArrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="flex-shrink-0"
    >
      <path
        d={direction === 'left' ? 'M9 2.5L4.5 7L9 11.5' : 'M5 2.5L9.5 7L5 11.5'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stackNavButtonClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-transparent text-[var(--ink-muted)] transition-[background,color,border-color,opacity] duration-150 hover:bg-[var(--card-bg)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-35';

function instrumentMediaBackground(image: CaseStudyInstrumentImage): string {
  switch (image.background) {
    case 'charcoal':
      return 'case-study-instrument__media--charcoal';
    case 'card':
      return 'case-study-instrument__media--card';
    default:
      return 'case-study-instrument__media--page';
  }
}

export function CaseStudyInstrumentImageCarousel({
  images,
  width = 'wide',
}: CaseStudyInstrumentImageCarouselProps) {
  const {
    ref,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    dragScrollProps,
  } = useHorizontalDragScroll({
    slideSelector: '.case-study-instrument__image-carousel__slide',
  });

  if (!images.length) return null;

  return (
    <div
      className={`case-study-instrument__image-carousel${
        width === 'prose' ? ' case-study-instrument__image-carousel--prose' : ''
      }`}
    >
      <div className="mb-4 hidden items-center justify-end gap-1.5 md:flex">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous image"
          className={stackNavButtonClass}
        >
          <StackScrollArrow direction="left" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next image"
          className={stackNavButtonClass}
        >
          <StackScrollArrow direction="right" />
        </button>
      </div>

      <div
        ref={ref}
        className="work-section-stack case-study-instrument__image-carousel__stack touch-pan-x"
        role="region"
        aria-label="Chapter image gallery"
        {...dragScrollProps}
      >
        <div className="work-section-stack__track">
          {images.map((image, index) => {
            const imgClass = `case-study-instrument__figure-img case-study-instrument__img--${image.objectFit ?? 'contain'}`;

            return (
              <figure
                key={`${image.alt ?? 'slide'}-${index}`}
                className="work-section-stack__slide case-study-instrument__image-carousel__slide"
              >
                <div
                  className={`case-study-instrument__image-carousel__frame ${instrumentMediaBackground(image)}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt ?? ''}
                    className={imgClass}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </div>
                {image.caption ? (
                  <figcaption className="case-study-instrument__caption mt-4">{image.caption}</figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
