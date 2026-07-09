import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

const DRAG_THRESHOLD_PX = 4;
const MOMENTUM_MIN_VELOCITY = 0.012;
const MOMENTUM_RELEASE_BOOST = 1.18;
const MOMENTUM_FRICTION = 3.6;
const DEFAULT_SLIDE_SELECTOR = '.work-section-stack__slide';

interface HorizontalDragScrollOptions {
  slideSelector?: string;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest('button, a, input, textarea, select, label'));
}

function getSlides(viewport: HTMLDivElement, slideSelector: string) {
  return Array.from(viewport.querySelectorAll<HTMLElement>(slideSelector));
}

function getActiveSlideIndex(viewport: HTMLDivElement, slides: HTMLElement[]) {
  const scrollLeft = viewport.scrollLeft;
  let activeIndex = 0;
  let minDistance = Infinity;

  for (let i = 0; i < slides.length; i++) {
    const distance = Math.abs(scrollLeft - slides[i].offsetLeft);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = i;
    }
  }

  return activeIndex;
}

function snapToNearestSlide(viewport: HTMLDivElement, slideSelector: string) {
  const slides = getSlides(viewport, slideSelector);
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
export function useHorizontalDragScroll(options: HorizontalDragScrollOptions = {}) {
  const slideSelector = options.slideSelector ?? DEFAULT_SLIDE_SELECTOR;
  const slideSelectorRef = useRef(slideSelector);
  slideSelectorRef.current = slideSelector;

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
  const [scrollState, setScrollState] = useState({
    canScrollPrev: false,
    canScrollNext: false,
  });

  const updateScrollState = useCallback(() => {
    const viewport = ref.current;
    if (!viewport) return;

    const slides = getSlides(viewport, slideSelectorRef.current);
    if (!slides.length) {
      setScrollState({ canScrollPrev: false, canScrollNext: false });
      return;
    }

    const index = getActiveSlideIndex(viewport, slides);
    setScrollState({
      canScrollPrev: index > 0,
      canScrollNext: index < slides.length - 1,
    });
  }, []);

  const scrollBySlide = useCallback((direction: -1 | 1) => {
    const viewport = ref.current;
    if (!viewport) return;

    isMomentumRef.current = false;
    velocityRef.current = 0;
    viewport.classList.remove('is-coasting', 'is-dragging');

    const slides = getSlides(viewport, slideSelectorRef.current);
    const index = getActiveSlideIndex(viewport, slides);
    const nextIndex = index + direction;
    const nextSlide = slides[nextIndex];
    if (!nextSlide) return;

    viewport.scrollTo({
      left: nextSlide.offsetLeft,
      behavior: reducedMotionRef.current ? 'auto' : 'smooth',
    });
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const viewport = ref.current;
    if (!viewport) return;

    updateScrollState();
    viewport.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      viewport.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

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
          snapToNearestSlide(viewport, slideSelectorRef.current);
        } else if (Math.abs(velocityRef.current) < MOMENTUM_MIN_VELOCITY) {
          isMomentumRef.current = false;
          velocityRef.current = 0;
          viewport.classList.remove('is-coasting');
          snapToNearestSlide(viewport, slideSelectorRef.current);
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
      if (didDragRef.current) snapToNearestSlide(viewport, slideSelectorRef.current);
      return;
    }

    const releaseVelocity = velocityRef.current * MOMENTUM_RELEASE_BOOST;
    if (Math.abs(releaseVelocity) > MOMENTUM_MIN_VELOCITY) {
      velocityRef.current = releaseVelocity;
      isMomentumRef.current = true;
      viewport.classList.add('is-coasting');
      return;
    }

    snapToNearestSlide(viewport, slideSelectorRef.current);
  };

  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
      didDragRef.current = false;
    }
  };

  const onFocusIn = (event: ReactFocusEvent<HTMLDivElement>) => {
    const viewport = ref.current;
    const target = event.target;
    if (!viewport || !(target instanceof HTMLElement)) return;
    if (!target.closest('button, a')) return;

    const slide = target.closest(slideSelectorRef.current);
    if (!(slide instanceof HTMLElement)) return;

    slide.scrollIntoView({
      behavior: reducedMotionRef.current ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    const viewport = ref.current;
    const target = event.target;
    if (!viewport || !(target instanceof HTMLElement)) return;

    const slide = target.closest(slideSelectorRef.current);
    if (!(slide instanceof HTMLElement)) return;

    const slides = getSlides(viewport, slideSelectorRef.current);
    const index = slides.indexOf(slide);
    if (index === -1) return;

    const nextIndex = event.key === 'ArrowRight' ? index + 1 : index - 1;
    const nextSlide = slides[nextIndex];
    if (!nextSlide) return;

    event.preventDefault();
    nextSlide.querySelector<HTMLElement>('button, a')?.focus();
  };

  return {
    ref,
    canScrollPrev: scrollState.canScrollPrev,
    canScrollNext: scrollState.canScrollNext,
    scrollPrev: () => scrollBySlide(-1),
    scrollNext: () => scrollBySlide(1),
    dragScrollProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onFocusIn,
      onKeyDown,
    },
  };
}
