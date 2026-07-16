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

const DRAG_THRESHOLD_PX = 6;
/** Prefer next/prev when release velocity exceeds this (px/ms). */
const FLICK_VELOCITY_PX_MS = 0.35;
/** Ignore velocity samples older than this. */
const VELOCITY_STALE_MS = 64;
/** Fraction of slide width that commits to an adjacent card. */
const COMMIT_RATIO = 0.28;
const SNAP_DURATION_MS = 680;
const DEFAULT_SLIDE_SELECTOR = '.work-section-stack__slide';

interface HorizontalDragScrollOptions {
  slideSelector?: string;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest('button, a, input, textarea, select, label'));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getSlides(viewport: HTMLDivElement, slideSelector: string) {
  return Array.from(viewport.querySelectorAll<HTMLElement>(slideSelector));
}

/** Leading inset before the first slide (spacer / track padding measured via first slide offset). */
function getLeadingGutter(slides: HTMLElement[]) {
  return slides[0]?.offsetLeft ?? 0;
}

function getSlideScrollLeft(slide: HTMLElement, slides: HTMLElement[]) {
  const gutter = getLeadingGutter(slides);
  return Math.max(0, slide.offsetLeft - gutter);
}

function getActiveSlideIndex(viewport: HTMLDivElement, slides: HTMLElement[]) {
  const scrollLeft = viewport.scrollLeft;
  const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  // Last card often can't fully align to the leading edge; treat end scroll as last slide.
  if (slides.length > 1 && maxScroll > 0 && scrollLeft >= maxScroll - 2) {
    return slides.length - 1;
  }

  const gutter = getLeadingGutter(slides);
  let activeIndex = 0;
  let minDistance = Infinity;

  for (let i = 0; i < slides.length; i++) {
    const target = slides[i].offsetLeft - gutter;
    const distance = Math.abs(scrollLeft - target);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = i;
    }
  }

  return activeIndex;
}

function getSlideStride(slides: HTMLElement[]) {
  if (slides.length < 2) return slides[0]?.offsetWidth ?? 1;
  return Math.max(1, slides[1].offsetLeft - slides[0].offsetLeft);
}

function resolveReleaseIndex(
  startIndex: number,
  slideCount: number,
  dragDeltaPx: number,
  releaseVelocity: number,
  stride: number,
) {
  if (slideCount <= 1) return 0;

  if (Math.abs(releaseVelocity) >= FLICK_VELOCITY_PX_MS) {
    const dir = releaseVelocity >= 0 ? 1 : -1;
    return clamp(startIndex + dir, 0, slideCount - 1);
  }

  if (Math.abs(dragDeltaPx) >= stride * COMMIT_RATIO) {
    const dir = dragDeltaPx >= 0 ? 1 : -1;
    return clamp(startIndex + dir, 0, slideCount - 1);
  }

  // Spring back to the card the drag started on.
  return clamp(startIndex, 0, slideCount - 1);
}

/** Pointer drag-to-scroll with an eased snap settle for horizontal overflow containers. */
export function useHorizontalDragScroll(options: HorizontalDragScrollOptions = {}) {
  const slideSelector = options.slideSelector ?? DEFAULT_SLIDE_SELECTOR;
  const slideSelectorRef = useRef(slideSelector);
  slideSelectorRef.current = slideSelector;

  const ref = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const velocityRef = useRef(0);
  const velocitySampleAtRef = useRef(0);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0, slideIndex: 0 });
  const dragSampleRef = useRef({ scrollLeft: 0, time: 0 });
  const settleRafRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [scrollState, setScrollState] = useState({
    canScrollPrev: false,
    canScrollNext: false,
    activeIndex: 0,
  });

  const setInteractionLock = useCallback((viewport: HTMLDivElement, locked: boolean) => {
    // Keep CSS scroll-snap off while JS owns scrolling to avoid snap fights.
    viewport.classList.toggle('is-coasting', locked);
  }, []);

  const cancelSettle = useCallback(() => {
    if (settleRafRef.current) {
      cancelAnimationFrame(settleRafRef.current);
      settleRafRef.current = 0;
    }
  }, []);

  const animateScrollTo = useCallback(
    (viewport: HTMLDivElement, targetLeft: number) => {
      cancelSettle();

      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const end = Math.max(0, Math.min(targetLeft, maxScroll));
      const start = viewport.scrollLeft;
      const distance = end - start;

      if (Math.abs(distance) < 0.5 || reducedMotionRef.current) {
        viewport.scrollLeft = end;
        setInteractionLock(viewport, false);
        return;
      }

      setInteractionLock(viewport, true);
      const startedAt = performance.now();

      const step = (now: number) => {
        if (!ref.current) {
          settleRafRef.current = 0;
          return;
        }

        const t = Math.min(1, (now - startedAt) / SNAP_DURATION_MS);
        viewport.scrollLeft = start + distance * easeOutCubic(t);

        if (t < 1) {
          settleRafRef.current = requestAnimationFrame(step);
          return;
        }

        viewport.scrollLeft = end;
        settleRafRef.current = 0;
        setInteractionLock(viewport, false);
      };

      settleRafRef.current = requestAnimationFrame(step);
    },
    [cancelSettle, setInteractionLock],
  );

  const snapToIndex = useCallback(
    (viewport: HTMLDivElement, index: number) => {
      const slides = getSlides(viewport, slideSelectorRef.current);
      if (!slides.length) return;
      const target = slides[clamp(index, 0, slides.length - 1)];
      animateScrollTo(viewport, getSlideScrollLeft(target, slides));
    },
    [animateScrollTo],
  );

  const snapToNearest = useCallback(
    (viewport: HTMLDivElement) => {
      const slides = getSlides(viewport, slideSelectorRef.current);
      if (!slides.length) return;
      snapToIndex(viewport, getActiveSlideIndex(viewport, slides));
    },
    [snapToIndex],
  );

  const updateScrollState = useCallback(() => {
    const viewport = ref.current;
    if (!viewport) return;

    const slides = getSlides(viewport, slideSelectorRef.current);
    if (!slides.length) {
      setScrollState({ canScrollPrev: false, canScrollNext: false, activeIndex: 0 });
      return;
    }

    const index = getActiveSlideIndex(viewport, slides);
    setScrollState({
      canScrollPrev: index > 0,
      canScrollNext: index < slides.length - 1,
      activeIndex: index,
    });
  }, []);

  const scrollBySlide = useCallback(
    (direction: -1 | 1) => {
      const viewport = ref.current;
      if (!viewport) return;

      cancelSettle();
      velocityRef.current = 0;
      viewport.classList.remove('is-dragging');
      setInteractionLock(viewport, true);

      const slides = getSlides(viewport, slideSelectorRef.current);
      const index = getActiveSlideIndex(viewport, slides);
      const nextSlide = slides[index + direction];
      if (!nextSlide) {
        setInteractionLock(viewport, false);
        return;
      }

      animateScrollTo(viewport, getSlideScrollLeft(nextSlide, slides));
    },
    [animateScrollTo, cancelSettle, setInteractionLock],
  );

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const viewport = ref.current;
    if (!viewport) return;

    updateScrollState();
    viewport.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    let wheelSnapTimer = 0;
    const onWheel = () => {
      if (isDraggingRef.current || settleRafRef.current) return;
      window.clearTimeout(wheelSnapTimer);
      wheelSnapTimer = window.setTimeout(() => {
        if (isDraggingRef.current || settleRafRef.current) return;
        snapToNearest(viewport);
      }, 120);
    };
    viewport.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      viewport.removeEventListener('scroll', updateScrollState);
      viewport.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', updateScrollState);
      window.clearTimeout(wheelSnapTimer);
      cancelSettle();
    };
  }, [cancelSettle, snapToNearest, updateScrollState]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || isInteractiveTarget(event.target)) return;

    const viewport = ref.current;
    if (!viewport) return;

    // Lock before cancel so CSS snap never re-engages mid-transition.
    viewport.classList.add('is-dragging');
    setInteractionLock(viewport, true);
    cancelSettle();

    isDraggingRef.current = true;
    velocityRef.current = 0;
    velocitySampleAtRef.current = 0;
    didDragRef.current = false;
    viewport.setPointerCapture(event.pointerId);

    const slides = getSlides(viewport, slideSelectorRef.current);
    dragStartRef.current = {
      x: event.clientX,
      scrollLeft: viewport.scrollLeft,
      slideIndex: getActiveSlideIndex(viewport, slides),
    };
    dragSampleRef.current = { scrollLeft: viewport.scrollLeft, time: performance.now() };
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
    if (sampleDt > 12) {
      velocityRef.current = (viewport.scrollLeft - sample.scrollLeft) / sampleDt;
      velocitySampleAtRef.current = now;
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

    // Keep interaction lock on; settle animation will clear it.
    viewport.classList.remove('is-dragging');
    setInteractionLock(viewport, true);

    const slides = getSlides(viewport, slideSelectorRef.current);
    if (!slides.length) {
      setInteractionLock(viewport, false);
      return;
    }

    if (!didDragRef.current) {
      snapToNearest(viewport);
      return;
    }

    const dragDeltaPx = dragStartRef.current.scrollLeft - viewport.scrollLeft;
    const stride = getSlideStride(slides);
    const now = performance.now();
    const releaseVelocity =
      now - velocitySampleAtRef.current > VELOCITY_STALE_MS ? 0 : velocityRef.current;

    const targetIndex = resolveReleaseIndex(
      dragStartRef.current.slideIndex,
      slides.length,
      dragDeltaPx,
      releaseVelocity,
      stride,
    );

    snapToIndex(viewport, targetIndex);
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

    const slides = getSlides(viewport, slideSelectorRef.current);
    const index = slides.indexOf(slide);
    if (index === -1) return;

    cancelSettle();
    setInteractionLock(viewport, true);
    snapToIndex(viewport, index);
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

  const scrollToIndex = useCallback(
    (index: number) => {
      const viewport = ref.current;
      if (!viewport) return;
      cancelSettle();
      velocityRef.current = 0;
      viewport.classList.remove('is-dragging');
      setInteractionLock(viewport, true);
      snapToIndex(viewport, index);
    },
    [cancelSettle, setInteractionLock, snapToIndex],
  );

  return {
    ref,
    canScrollPrev: scrollState.canScrollPrev,
    canScrollNext: scrollState.canScrollNext,
    activeIndex: scrollState.activeIndex,
    scrollPrev: () => scrollBySlide(-1),
    scrollNext: () => scrollBySlide(1),
    scrollToIndex,
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
