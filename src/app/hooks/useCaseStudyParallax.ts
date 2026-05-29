import { useEffect, type RefObject } from 'react';

const DEFAULT_SPEED = 0.12;

function parseNumber(value: string | undefined, fallback: number): number {
  if (value === undefined || value === '') return fallback;
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

/** Viewport-centered offset (copy, hero figures). */
function offsetFromViewportCenter(el: HTMLElement, rect: DOMRect, speed: number): number {
  const viewportMid = window.innerHeight * 0.5;
  const elementMid = rect.top + rect.height * 0.5;
  return (elementMid - viewportMid) * speed;
}

/**
 * Scroll-lag offset: each layer reacts at a different point in the scroll journey.
 * Used for bento cells so panels drift out of sync.
 */
function offsetFromScrollLag(el: HTMLElement, rect: DOMRect, speed: number): number {
  const delayPx = parseNumber(el.dataset.parallaxDelay, 0);
  const scrollY = window.scrollY;
  const viewportMid = window.innerHeight * 0.5;
  const elementAnchor = rect.top + scrollY + rect.height * 0.5;
  const scrollAnchor = scrollY + viewportMid - delayPx;
  return (scrollAnchor - elementAnchor) * speed;
}

/**
 * Scroll-linked translate on `[data-parallax]` descendants (GPU transform only).
 * `data-parallax-mode="scroll-lag"` + `data-parallax-delay` (px) for staggered bento panels.
 * Disabled when `prefers-reduced-motion: reduce`.
 */
export function useCaseStudyParallax(
  rootRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    if (!root) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (elements.length === 0) return;

    let rafId = 0;

    const update = () => {
      for (const el of elements) {
        const speed = parseNumber(el.dataset.parallaxSpeed, DEFAULT_SPEED);
        const rect = el.getBoundingClientRect();
        const mode = el.dataset.parallaxMode;
        const offset =
          mode === 'scroll-lag' || el.dataset.parallaxDelay !== undefined
            ? offsetFromScrollLag(el, rect, speed)
            : offsetFromViewportCenter(el, rect, speed);
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      }
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const onMotionChange = () => {
      if (motionQuery.matches) {
        for (const el of elements) {
          el.style.transform = '';
        }
      } else {
        scheduleUpdate();
      }
    };
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      motionQuery.removeEventListener('change', onMotionChange);
      cancelAnimationFrame(rafId);
      for (const el of elements) {
        el.style.transform = '';
      }
    };
  }, [enabled, rootRef]);
}
