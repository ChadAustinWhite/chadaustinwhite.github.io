import { useEffect } from 'react';
import { useTheme } from 'next-themes';

/** Page canvas only; components keep token --bg / --ink / etc. */
const CANVAS_DEFAULT = '#000000';
/** Warm off-white (~#f7f7f0): Experience / Education band and footer zone. */
const CANVAS_LIFT = '#f7f7f0';

function clearCanvas() {
  const root = document.documentElement;
  root.classList.remove('home-canvas-drive');
  root.removeAttribute('data-canvas-lift');
  root.style.removeProperty('--home-canvas');
  root.style.removeProperty('background-color');
  document.body.style.removeProperty('background-color');
}

/** Pick which `section[id]` owns the viewport focus band (same idea as prior section-bg hook). */
function computeActiveSectionId(): string {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
  if (sections.length === 0) return 'about';

  const vh = window.innerHeight || 1;
  const bandTop = vh * 0.2;
  const bandBottom = vh * 0.72;

  let bestId = 'about';
  let bestOverlap = -1;

  for (const el of sections) {
    const id = el.id;
    if (!id) continue;
    const r = el.getBoundingClientRect();
    const overlap = Math.max(0, Math.min(r.bottom, bandBottom) - Math.max(r.top, bandTop));
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      bestId = id;
    }
  }

  if (bestOverlap > 0) return bestId;

  const targetY = vh * 0.35;
  let closestId = 'about';
  let minDist = Infinity;
  for (const el of sections) {
    const id = el.id;
    if (!id) continue;
    const r = el.getBoundingClientRect();
    const mid = (r.top + r.bottom) / 2;
    const d = Math.abs(mid - targetY);
    if (d < minDist) {
      minDist = d;
      closestId = id;
    }
  }
  return closestId;
}

function isNearBottom(): boolean {
  const footer = document.querySelector('main footer');
  const vh = window.innerHeight || 1;
  if (footer) {
    const r = footer.getBoundingClientRect();
    if (r.top < vh * 0.88) return true;
  }
  const maxScroll = document.documentElement.scrollHeight - vh;
  if (maxScroll <= 0) return false;
  return window.scrollY / maxScroll > 0.88;
}

function resolveCanvasColor(): string {
  if (isNearBottom()) return CANVAS_LIFT;
  const activeId = computeActiveSectionId();
  if (activeId === 'experience' || activeId === 'education') return CANVAS_LIFT;
  return CANVAS_DEFAULT;
}

/**
 * Dark theme only: homepage canvas steps from black to warm off-white (#f7f7f0) in
 * Experience/Education and near the footer. Sets data-canvas-lift for Experience card palette.
 * Other sections’ components still use global --bg / --ink / --card-bg tokens.
 */
export function useHomeScrollBackground() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || resolvedTheme !== 'dark') {
      clearCanvas();
      return;
    }

    const root = document.documentElement;
    root.classList.add('home-canvas-drive');

    let raf = 0;

    const tick = () => {
      const color = resolveCanvasColor();
      root.style.setProperty('--home-canvas', color);
      root.style.backgroundColor = color;
      document.body.style.backgroundColor = color;
      if (color === CANVAS_LIFT) {
        root.setAttribute('data-canvas-lift', '');
      } else {
        root.removeAttribute('data-canvas-lift');
      }
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      clearCanvas();
    };
  }, [resolvedTheme]);
}
