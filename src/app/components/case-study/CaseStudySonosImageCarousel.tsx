import { useCallback, useEffect, useRef } from 'react';
import type { CaseStudySonosCarouselCardVariant, CaseStudySonosCarouselImage } from './types';

/** Large mixed-aspect strip (Instrument services / Sonos case study scale). */
const CARD_CLASS: Record<CaseStudySonosCarouselCardVariant, string> = {
  square: 'w-[min(78vw,520px)] aspect-square md:w-[560px] lg:w-[620px]',
  landscape: 'w-[min(85vw,600px)] aspect-[16/10] md:w-[680px] lg:w-[760px]',
  landscapeWide: 'w-[min(94vw,820px)] aspect-[3/2] md:w-[880px] lg:w-[960px]',
  tall: 'w-[min(52vw,300px)] aspect-[9/16] md:w-[340px] lg:w-[380px]',
};

const AUTO_SCROLL_DURATION_MS = 55_000;
/** px/ms — coast stops below this */
const MOMENTUM_MIN_VELOCITY = 0.015;
/** Slight boost on release so the strip keeps moving a bit longer */
const MOMENTUM_RELEASE_BOOST = 1.2;
/** Higher = faster slowdown */
const MOMENTUM_FRICTION = 4.5;

function CarouselCard({
  image,
  id,
}: {
  image: CaseStudySonosCarouselImage;
  id: string;
}) {
  const variant: CaseStudySonosCarouselCardVariant = image.variant ?? 'landscape';

  return (
    <figure
      key={id}
      className={`relative shrink-0 overflow-hidden rounded-[1.75rem] bg-[var(--card-bg)] md:rounded-[2rem] ${CARD_CLASS[variant]}`}
    >
      <img
        src={image.src}
        alt={image.alt ?? ''}
        className="pointer-events-none block h-full w-full object-cover select-none"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </figure>
  );
}

function renderCarouselSegment(images: CaseStudySonosCarouselImage[], segmentId: string) {
  return images.map((image, i) => (
    <CarouselCard key={`${segmentId}-${i}`} image={image} id={`${segmentId}-${i}`} />
  ));
}

interface CaseStudySonosImageCarouselProps {
  images: CaseStudySonosCarouselImage[];
}

/** Horizontal gallery: auto-scrolls, pauses on hover, draggable with release momentum. */
export function CaseStudySonosImageCarousel({ images }: CaseStudySonosImageCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isHoverPausedRef = useRef(false);
  const isMomentumRef = useRef(false);
  const velocityRef = useRef(0);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const dragSampleRef = useRef({ scrollLeft: 0, time: 0 });
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);

  const normalizeScroll = useCallback((viewport: HTMLDivElement) => {
    const half = viewport.scrollWidth / 2;
    if (half <= 0) return;
    if (viewport.scrollLeft >= half) viewport.scrollLeft -= half;
    if (viewport.scrollLeft < 0) viewport.scrollLeft += half;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const onFrame = (time: number) => {
      const dt = lastFrameRef.current ? time - lastFrameRef.current : 0;
      lastFrameRef.current = time;

      if (dt <= 0) {
        rafRef.current = requestAnimationFrame(onFrame);
        return;
      }

      if (isMomentumRef.current && !isDraggingRef.current) {
        viewport.scrollLeft += velocityRef.current * dt;
        normalizeScroll(viewport);
        velocityRef.current *= Math.exp(-MOMENTUM_FRICTION * (dt / 1000));

        if (Math.abs(velocityRef.current) < MOMENTUM_MIN_VELOCITY) {
          isMomentumRef.current = false;
          velocityRef.current = 0;
        }
      } else if (!isDraggingRef.current && !isHoverPausedRef.current) {
        const half = viewport.scrollWidth / 2;
        if (half > 0) {
          viewport.scrollLeft += (half / AUTO_SCROLL_DURATION_MS) * dt;
          normalizeScroll(viewport);
        }
      }

      rafRef.current = requestAnimationFrame(onFrame);
    };

    rafRef.current = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [images, normalizeScroll]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    isDraggingRef.current = true;
    isMomentumRef.current = false;
    velocityRef.current = 0;
    viewport.setPointerCapture(event.pointerId);
    dragStartRef.current = { x: event.clientX, scrollLeft: viewport.scrollLeft };
    dragSampleRef.current = { scrollLeft: viewport.scrollLeft, time: performance.now() };
    viewport.classList.add('is-dragging');
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const now = performance.now();
    const sample = dragSampleRef.current;
    const sampleDt = now - sample.time;
    if (sampleDt > 5) {
      velocityRef.current = (viewport.scrollLeft - sample.scrollLeft) / sampleDt;
      dragSampleRef.current = { scrollLeft: viewport.scrollLeft, time: now };
    }

    const delta = event.clientX - dragStartRef.current.x;
    viewport.scrollLeft = dragStartRef.current.scrollLeft - delta;
    normalizeScroll(viewport);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    isDraggingRef.current = false;
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    viewport.classList.remove('is-dragging');

    const releaseVelocity = velocityRef.current * MOMENTUM_RELEASE_BOOST;
    if (Math.abs(releaseVelocity) > MOMENTUM_MIN_VELOCITY) {
      velocityRef.current = releaseVelocity;
      isMomentumRef.current = true;
    }
  };

  if (!images.length) return null;

  return (
    <div className="case-study-sonos-carousel" aria-label="Project screens gallery">
      <div
        ref={viewportRef}
        className="case-study-sonos-carousel__viewport -mx-[var(--cs-page-gutter)] touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => {
          isHoverPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isHoverPausedRef.current = false;
        }}
      >
        <div className="case-study-sonos-carousel__track">
          {renderCarouselSegment(images, 'a')}
          <span className="contents" aria-hidden="true">
            {renderCarouselSegment(images, 'b')}
          </span>
        </div>
      </div>
    </div>
  );
}
