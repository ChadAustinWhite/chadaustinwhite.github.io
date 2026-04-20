import { useEffect } from 'react';
import { useTheme } from 'next-themes';

/** Page canvas above Experience; components keep token --bg / --ink / etc. */
const CANVAS_DEFAULT = '#000000';
const CANVAS_EXPERIENCE = '#282828';

function clearCanvas() {
  const root = document.documentElement;
  root.classList.remove('home-canvas-drive');
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

function canvasForSection(activeId: string): string {
  if (activeId === 'experience' || activeId === 'education') return CANVAS_EXPERIENCE;
  return CANVAS_DEFAULT;
}

/**
 * Dark theme only: homepage canvas is black until the Experience band wins focus, then eases to
 * charcoal (#282828) and stays there through Education (and footer while Education still “owns”
 * the band). Does not change --bg / --ink / cards.
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
      const color = canvasForSection(computeActiveSectionId());
      root.style.setProperty('--home-canvas', color);
      root.style.backgroundColor = color;
      document.body.style.backgroundColor = color;
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
