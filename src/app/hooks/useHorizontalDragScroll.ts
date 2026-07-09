import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';

const DRAG_THRESHOLD_PX = 4;
const MOMENTUM_MIN_VELOCITY = 0.012;
const MOMENTUM_RELEASE_BOOST = 1.18;
const MOMENTUM_FRICTION = 3.6;
const SNAP_SLIDE_SELECTOR = '.work-section-stack__slide';

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest('button, a, input, textarea, select, label'));
}

function snapToNearestSlide(viewport: HTMLDivElement) {
  const slides = Array.from(
    viewport.querySelectorAll<HTMLElement>(SNAP_SLIDE_SELECTOR),
  );
  if (!slides.length) return;

  const scrollLeft = viewport.scrollLeft;
  let nearestLeft = scrollLeft;
  let minDistance = Infinity;

  for (const slide of slides) {
    const target = slide.offsetLeft;
    const distance = Math.abs(scrollLeft - target);
    if (distance < minDistance) {
      minDistance = distance;
      nearestLeft = target;
    }
  }

  viewport.scrollTo({ left: nearestLeft, behavior: 'smooth' });
}

/** Pointer drag-to-scroll with release momentum for horizontal overflow containers. */
export function useHorizontalDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isMomentumRef = useRef(false);
  const didDragRef = useRef(false);
  const velocityRef = useRef(0);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const dragSampleRef = useRef({ scrollLeft: 0, time: 0 });
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const onFrame = (time: number) => {
      const viewport = ref.current;
      const dt = lastFrameRef.current ? time - lastFrameRef.current : 0;
      lastFrameRef.current = time;

      if (!viewport || dt <= 0) {
        rafRef.current = requestAnimationFrame(onFrame);
        return;
      }

      if (isMomentumRef.current && !isDraggingRef.current) {
        viewport.scrollLeft += velocityRef.current * dt;
        velocityRef.current *= Math.exp(-MOMENTUM_FRICTION * (dt / 1000));

        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (viewport.scrollLeft <= 0 || viewport.scrollLeft >= maxScroll) {
          viewport.scrollLeft = Math.max(0, Math.min(viewport.scrollLeft, maxScroll));
          velocityRef.current = 0;
          isMomentumRef.current = false;
          viewport.classList.remove('is-coasting');
          snapToNearestSlide(viewport);
        } else if (Math.abs(velocityRef.current) < MOMENTUM_MIN_VELOCITY) {
          isMomentumRef.current = false;
          velocityRef.current = 0;
          viewport.classList.remove('is-coasting');
          snapToNearestSlide(viewport);
        }
      }

      rafRef.current = requestAnimationFrame(onFrame);
    };

    rafRef.current = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || isInteractiveTarget(event.target)) return;

    const viewport = ref.current;
    if (!viewport) return;

    isDraggingRef.current = true;
    isMomentumRef.current = false;
    velocityRef.current = 0;
    didDragRef.current = false;
    viewport.classList.remove('is-coasting');
    viewport.setPointerCapture(event.pointerId);
    dragStartRef.current = { x: event.clientX, scrollLeft: viewport.scrollLeft };
    dragSampleRef.current = { scrollLeft: viewport.scrollLeft, time: performance.now() };
    viewport.classList.add('is-dragging');
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const viewport = ref.current;
    if (!viewport) return;

    const delta = event.clientX - dragStartRef.current.x;
    if (Math.abs(delta) > DRAG_THRESHOLD_PX) {
      didDragRef.current = true;
    }

    viewport.scrollLeft = dragStartRef.current.scrollLeft - delta;

    const now = performance.now();
    const sample = dragSampleRef.current;
    const sampleDt = now - sample.time;
    if (sampleDt > 8) {
      velocityRef.current = (viewport.scrollLeft - sample.scrollLeft) / sampleDt;
      dragSampleRef.current = { scrollLeft: viewport.scrollLeft, time: now };
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const viewport = ref.current;
    if (!viewport) return;

    isDraggingRef.current = false;
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    viewport.classList.remove('is-dragging');

    if (reducedMotionRef.current || !didDragRef.current) {
      if (didDragRef.current) snapToNearestSlide(viewport);
      return;
    }

    const releaseVelocity = velocityRef.current * MOMENTUM_RELEASE_BOOST;
    if (Math.abs(releaseVelocity) > MOMENTUM_MIN_VELOCITY) {
      velocityRef.current = releaseVelocity;
      isMomentumRef.current = true;
      viewport.classList.add('is-coasting');
      return;
    }

    snapToNearestSlide(viewport);
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
      didDragRef.current = false;
    }
  };

  return {
    ref,
    dragScrollProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
    },
  };
}
