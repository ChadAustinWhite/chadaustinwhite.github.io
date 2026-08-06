import { useEffect, type RefObject } from 'react';

/**
 * Hoodzpah-style card reveal driven by native vertical scroll.
 *
 * Each `.wow` item maps viewport position → `--reveal` (0–1):
 * media leads, caption trails. No wheel hijack, no scroll libraries, no pins.
 * Once fully revealed, an item stays visible.
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
        el.classList.add('is-revealed');
        el.style.setProperty('--reveal', '1');
        el.style.setProperty('--reveal-media', '1');
        el.style.setProperty('--reveal-caption', '1');
      });
      return;
    }

    const current = new Map<HTMLElement, number>();
    const settled = new Set<HTMLElement>();
    let frame = 0;

    targets.forEach((el) => {
      current.set(el, 0);
      el.style.setProperty('--reveal', '0');
      el.style.setProperty('--reveal-media', '0');
      el.style.setProperty('--reveal-caption', '0');
      el.classList.remove('is-revealed', 'animated');
    });

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const writeReveal = (el: HTMLElement, value: number) => {
      const eased = easeOutCubic(value);
      el.style.setProperty('--reveal', eased.toFixed(4));
      el.style.setProperty('--reveal-media', easeOutCubic(Math.min(1, value * 1.08)).toFixed(4));
      el.style.setProperty(
        '--reveal-caption',
        easeOutCubic(Math.max(0, (value - 0.08) / 0.92)).toFixed(4),
      );
    };

    const complete = (el: HTMLElement) => {
      current.set(el, 1);
      el.style.setProperty('--reveal', '1');
      el.style.setProperty('--reveal-media', '1');
      el.style.setProperty('--reveal-caption', '1');
      el.classList.add('is-revealed');
      settled.add(el);
    };

    const measureTargets = () => {
      frame = 0;
      const vh = window.innerHeight;
      let keepGoing = false;

      for (const el of targets) {
        if (settled.has(el)) continue;

        const rect = el.getBoundingClientRect();

        // Fully above the viewport — finish so it never re-animates on the way back
        if (rect.bottom < 0) {
          complete(el);
          continue;
        }

        // Far below the fold — stay hidden, no rAF churn
        if (rect.top > vh * 1.25) {
          if ((current.get(el) ?? 0) > 0.001) {
            current.set(el, 0);
            writeReveal(el, 0);
          }
          continue;
        }

        const stagger = Number(el.dataset.wowStagger ?? '0') || 0;
        // Enter near bottom; finish in the upper third. Stagger shifts later cards.
        const start = vh * (0.98 + stagger * 0.14);
        const end = vh * (0.32 + stagger * 0.06);
        const raw = (start - rect.top) / Math.max(1, start - end);
        const target = Math.min(1, Math.max(0, raw));

        const prev = current.get(el) ?? 0;
        // Soft follow so values track scroll without frame-to-frame jitter
        let next = prev + (target - prev) * 0.18;
        if (target >= 0.995) next = 1;
        if (next < 0.004 && target < 0.004) next = 0;

        current.set(el, next);
        writeReveal(el, next);

        if (next >= 0.995) {
          complete(el);
        } else if (Math.abs(target - next) > 0.002 || Math.abs(target - prev) > 0.002) {
          keepGoing = true;
        }
      }

      if (keepGoing && settled.size < targets.length) {
        frame = requestAnimationFrame(measureTargets);
      }
    };

    const kick = () => {
      if (frame) return;
      frame = requestAnimationFrame(measureTargets);
    };

    kick();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, [rootRef]);
}
