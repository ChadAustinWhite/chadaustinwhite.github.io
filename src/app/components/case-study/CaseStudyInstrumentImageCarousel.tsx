import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';
import type { CaseStudyInstrumentImage } from './types';

const AUTO_SCROLL_SPEED_PX_PER_SEC = 68;
const AUTO_SCROLL_RESUME_MS = 12000;
const SLIDE_SELECTOR = '.case-study-instrument__image-carousel__slide';

interface CaseStudyInstrumentImageCarouselProps {
  images: CaseStudyInstrumentImage[];
  /** Matches chapter `stackedImagesWidth`. */
  width?: 'prose' | 'wide' | 'bleed';
  /** Slow continuous auto-scroll; pauses on hover, drag, or when off-screen. */
  autoRotate?: boolean;
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
  autoRotate = false,
}: CaseStudyInstrumentImageCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const inView = useInView(rootRef, { amount: 0.35 });

  const {
    ref,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    dragScrollProps,
  } = useHorizontalDragScroll({
    slideSelector: SLIDE_SELECTOR,
  });

  const pauseAutoScroll = (resumeAfterMs = AUTO_SCROLL_RESUME_MS) => {
    pausedRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, resumeAfterMs);
  };

  const loopSlides = autoRotate && images.length > 1;
  const displayImages = loopSlides ? [...images, ...images] : images;

  useEffect(() => {
    if (!autoRotate || images.length <= 1 || !inView) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    let rafId = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      const viewport = ref.current;

      if (viewport && !pausedRef.current && !viewport.classList.contains('is-dragging')) {
        const deltaMs = lastTime ? time - lastTime : 0;
        lastTime = time;

        if (deltaMs > 0) {
          viewport.scrollLeft += (AUTO_SCROLL_SPEED_PX_PER_SEC * deltaMs) / 1000;

          if (loopSlides) {
            const loopWidth = viewport.scrollWidth / 2;
            if (loopWidth > 0 && viewport.scrollLeft >= loopWidth) {
              viewport.scrollLeft -= loopWidth;
            }
          } else {
            const maxScroll = viewport.scrollWidth - viewport.clientWidth;
            if (maxScroll > 0 && viewport.scrollLeft >= maxScroll) {
              viewport.scrollLeft = 0;
            }
          }
        }
      } else {
        lastTime = time;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(rafId);
  }, [autoRotate, images.length, inView, loopSlides, ref]);

  useEffect(() => {
    return () => clearTimeout(resumeTimeoutRef.current);
  }, []);

  useEffect(() => {
    const viewport = ref.current;
    const root = rootRef.current;
    if (!viewport || !root || !autoRotate) return undefined;

    const onPointerDown = () => pauseAutoScroll();
    const onFocusIn = () => pauseAutoScroll();
    const onMouseEnter = () => {
      pausedRef.current = true;
    };
    const onMouseLeave = () => {
      pausedRef.current = false;
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('mouseenter', onMouseEnter);
    root.addEventListener('mouseleave', onMouseLeave);
    root.addEventListener('focusin', onFocusIn);

    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('mouseenter', onMouseEnter);
      root.removeEventListener('mouseleave', onMouseLeave);
      root.removeEventListener('focusin', onFocusIn);
    };
  }, [autoRotate, ref]);

  if (!images.length) return null;

  const isBleed = width === 'bleed';

  return (
    <div
      ref={rootRef}
      className={`case-study-instrument__image-carousel${
        width === 'prose' ? ' case-study-instrument__image-carousel--prose' : ''
      }${isBleed ? ' case-study-instrument__image-carousel--bleed' : ''}`}
    >
      <div
        className={`mb-4 hidden items-center justify-end gap-1.5 md:flex${
          isBleed ? ' case-study-instrument__image-carousel__nav px-[var(--cs-page-gutter)]' : ''
        }`}
      >
        <button
          type="button"
          onClick={() => {
            pauseAutoScroll();
            scrollPrev();
          }}
          disabled={!canScrollPrev}
          aria-label="Previous image"
          className={stackNavButtonClass}
        >
          <StackScrollArrow direction="left" />
        </button>
        <button
          type="button"
          onClick={() => {
            pauseAutoScroll();
            scrollNext();
          }}
          disabled={!canScrollNext}
          aria-label="Next image"
          className={stackNavButtonClass}
        >
          <StackScrollArrow direction="right" />
        </button>
      </div>

      <div
        ref={ref}
        className={`work-section-stack case-study-instrument__image-carousel__stack touch-pan-x${
          autoRotate ? ' case-study-instrument__image-carousel__stack--auto-scroll' : ''
        }`}
        role="region"
        aria-label="Chapter image gallery"
        {...dragScrollProps}
      >
        <div className="work-section-stack__track">
          {displayImages.map((image, index) => {
            const imgClass = `case-study-instrument__figure-img case-study-instrument__img--${image.objectFit ?? 'contain'}`;
            const isDuplicate = loopSlides && index >= images.length;

            return (
              <figure
                key={`${image.alt ?? 'slide'}-${index}`}
                className="work-section-stack__slide case-study-instrument__image-carousel__slide"
                aria-hidden={isDuplicate ? true : undefined}
              >
                <div
                  className={`case-study-instrument__image-carousel__frame ${instrumentMediaBackground(image)}`}
                >
                  <img
                    src={image.src}
                    alt={isDuplicate ? '' : (image.alt ?? '')}
                    className={imgClass}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </div>
                {image.caption && !isDuplicate ? (
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
