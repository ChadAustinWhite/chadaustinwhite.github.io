import { useEffect, type RefObject } from 'react';

/**
 * Homepage work scroll motion (native vertical scroll only):
 * 1. Entrance: each card fades/lifts into place as it enters the viewport
 * 2. Drift: whole-card parallax with soft, scrub-style easing so motion
 *    coasts to rest on a ~0.45s pace (matches smooth trackpad fling settle)
 * 3. Layer drift: `[data-layer-drift]` product windows move independently
 */
export function useWowReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('.wow'));
    const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-layer-drift]'));
    if (targets.length === 0) return;

    if (reduce) {
      targets.forEach((el) => {
        el.classList.add('is-revealed');
        el.style.setProperty('--reveal', '1');
        el.style.setProperty('--reveal-media', '1');
        el.style.setProperty('--reveal-caption', '1');
        el.style.setProperty('--drift-y', '0px');
      });
      layers.forEach((el) => {
        el.style.setProperty('--layer-y', '0px');
      });
      return;
    }

    /** Seconds to approach target — lower = cards catch up faster after scroll. */
    const SCRUB_SEC = 0.18;
    const REVEAL_SCRUB_SEC = 0.16;

    const current = new Map<HTMLElement, number>();
    const driftNow = new Map<HTMLElement, number>();
    const layerDriftNow = new Map<HTMLElement, number>();
    const settled = new Set<HTMLElement>();
    let frame = 0;
    let lastTs = 0;
    let lastScrollY = window.scrollY;
    let scrollDelta = 0;

    targets.forEach((el) => {
      current.set(el, 0);
      driftNow.set(el, 0);
      el.style.setProperty('--reveal', '0');
      el.style.setProperty('--reveal-media', '0');
      el.style.setProperty('--reveal-caption', '0');
      el.style.setProperty('--drift-y', '0px');
      el.classList.remove('is-revealed', 'animated');
    });
    layers.forEach((el) => {
      layerDriftNow.set(el, 0);
      el.style.setProperty('--layer-y', '0px');
    });

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const damp = (dt: number, scrub: number) => 1 - Math.exp(-dt / scrub);

    const writeReveal = (el: HTMLElement, value: number) => {
      const eased = easeOutCubic(value);
      el.style.setProperty('--reveal', eased.toFixed(4));
      el.style.setProperty('--reveal-media', easeOutCubic(Math.min(1, value * 1.06)).toFixed(4));
      el.style.setProperty(
        '--reveal-caption',
        easeOutCubic(Math.max(0, (value - 0.06) / 0.94)).toFixed(4),
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

    const measureTargets = (ts: number) => {
      frame = 0;
      const rawDt = lastTs ? (ts - lastTs) / 1000 : 1 / 60;
      lastTs = ts;
      const dt = Math.min(0.05, Math.max(0.001, rawDt));
      const driftDamp = damp(dt, SCRUB_SEC);
      const revealDamp = damp(dt, REVEAL_SCRUB_SEC);

      const vh = window.innerHeight;
      const mid = vh * 0.5;
      const delta = scrollDelta;
      scrollDelta = 0;
      let keepGoing = false;

      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        const inBand = rect.bottom > -vh * 0.4 && rect.top < vh * 1.4;

        // Continuous multi-speed drift while near the viewport
        if (inBand) {
          const speed = Number(el.dataset.scrollSpeed ?? '0.1') || 0.1;
          const prevDrift = driftNow.get(el) ?? 0;
          // Strip live transform so speed math uses layout position, not feedback
          const layoutCenterY = rect.top + rect.height * 0.5 - prevDrift;
          // Higher speed → more lag (sits lower while rising through the viewport)
          const targetDrift = (layoutCenterY - mid) * speed;
          const maxAbs = Number(el.dataset.scrollMax ?? '96') || 96;
          const clamped = Math.max(-maxAbs, Math.min(maxAbs, targetDrift));
          const nextDrift = prevDrift + (clamped - prevDrift) * driftDamp;
          driftNow.set(el, nextDrift);
          el.style.setProperty('--drift-y', `${nextDrift.toFixed(2)}px`);

          if (Math.abs(clamped - nextDrift) > 0.08) keepGoing = true;
        } else if (Math.abs(driftNow.get(el) ?? 0) > 0.05) {
          const prevDrift = driftNow.get(el) ?? 0;
          const nextDrift = prevDrift * (1 - driftDamp);
          driftNow.set(el, Math.abs(nextDrift) < 0.05 ? 0 : nextDrift);
          el.style.setProperty('--drift-y', `${(driftNow.get(el) ?? 0).toFixed(2)}px`);
          if ((driftNow.get(el) ?? 0) !== 0) keepGoing = true;
        } else if ((driftNow.get(el) ?? 0) !== 0) {
          driftNow.set(el, 0);
          el.style.setProperty('--drift-y', '0px');
        }

        if (settled.has(el)) continue;

        // Fully above the viewport — finish so it never re-animates on the way back
        if (rect.bottom < 0) {
          complete(el);
          continue;
        }

        // Far below the fold — stay hidden, no entrance churn
        if (rect.top > vh * 1.3) {
          if ((current.get(el) ?? 0) > 0.001) {
            current.set(el, 0);
            writeReveal(el, 0);
          }
          continue;
        }

        const stagger = Number(el.dataset.wowStagger ?? '0') || 0;
        // Wider band = reveal rides a longer scroll distance (deliberate pace)
        const start = vh * (1.08 + stagger * 0.12);
        const end = vh * (0.22 + stagger * 0.05);
        const raw = (start - rect.top) / Math.max(1, start - end);
        const target = Math.min(1, Math.max(0, raw));

        const prev = current.get(el) ?? 0;
        let next = prev + (target - prev) * revealDamp;
        if (target >= 0.995 && next > 0.97) next = 1;
        if (next < 0.003 && target < 0.003) next = 0;

        current.set(el, next);
        writeReveal(el, next);

        if (next >= 0.995) {
          complete(el);
        } else if (Math.abs(target - next) > 0.001 || Math.abs(target - prev) > 0.001) {
          keepGoing = true;
        }
      }

      // Independent product-window drift — tied to scroll delta so both
      // layers respond as soon as the user scrolls (same direction, different speed).
      for (const el of layers) {
        const host = el.closest('.wow') as HTMLElement | null;
        if (!host) continue;

        const hostRect = host.getBoundingClientRect();
        // Wide band: start moving whenever the card is near or in view
        const hostInBand = hostRect.bottom > -vh * 0.15 && hostRect.top < vh * 1.05;
        const prevLayer = layerDriftNow.get(el) ?? 0;
        const speed = Number(el.dataset.layerSpeed ?? '0.35') || 0.35;
        const maxAbs = Number(el.dataset.layerMax ?? '72') || 72;

        if (!hostInBand) {
          if (Math.abs(prevLayer) > 0.05) {
            const nextLayer = prevLayer * (1 - driftDamp);
            const settledLayer = Math.abs(nextLayer) < 0.05 ? 0 : nextLayer;
            layerDriftNow.set(el, settledLayer);
            el.style.setProperty('--layer-y', `${settledLayer.toFixed(2)}px`);
            if (settledLayer !== 0) keepGoing = true;
          } else if (prevLayer !== 0) {
            layerDriftNow.set(el, 0);
            el.style.setProperty('--layer-y', '0px');
          }
          continue;
        }

        // scroll down (delta > 0) → screens move up (negative y)
        const target = Math.max(-maxAbs, Math.min(maxAbs, prevLayer - delta * speed));
        const nextLayer = prevLayer + (target - prevLayer) * Math.min(1, damp(dt, 0.08));
        layerDriftNow.set(el, nextLayer);
        el.style.setProperty('--layer-y', `${nextLayer.toFixed(2)}px`);
        if (Math.abs(delta) > 0.01 || Math.abs(target - nextLayer) > 0.08) keepGoing = true;
      }

      if (keepGoing) {
        frame = requestAnimationFrame(measureTargets);
      } else {
        lastTs = 0;
      }
    };

    const kick = () => {
      const y = window.scrollY;
      scrollDelta += y - lastScrollY;
      lastScrollY = y;
      if (frame) return;
      lastTs = 0;
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
