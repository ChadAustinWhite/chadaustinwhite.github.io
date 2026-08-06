import { useEffect, type RefObject } from 'react';

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

/**
 * Smooth card motion driven by native vertical scroll.
 * Maps intersection progress → opacity/translate (no wheel hijack, no scroll libs).
 * Once a card reaches full reveal it stays fully visible.
 */
export function useWowReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('.wow'));

    if (targets.length === 0) return;

    if (reduce) {
      targets.forEach((el) => {
        el.classList.add('animated');
        el.style.setProperty('--reveal', '1');
      });
      return;
    }

    const settled = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (settled.has(entry.target)) continue;

          const el = entry.target as HTMLElement;
          // Ease into full opacity a bit early for a calmer finish.
          const progress = Math.min(1, entry.intersectionRatio * 1.35);
          el.style.setProperty('--reveal', progress.toFixed(3));

          if (progress >= 0.98 || (entry.isIntersecting && entry.intersectionRatio >= 0.55)) {
            el.style.setProperty('--reveal', '1');
            el.classList.add('animated');
            settled.add(el);
            observer.unobserve(el);
          }
        }
      },
      {
        threshold: THRESHOLDS,
        rootMargin: '0px 0px -4% 0px',
      },
    );

    targets.forEach((el) => {
      el.style.setProperty('--reveal', '0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [rootRef]);
}
