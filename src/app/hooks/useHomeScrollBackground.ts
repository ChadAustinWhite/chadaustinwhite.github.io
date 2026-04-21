import { useEffect } from 'react';
import { useTheme } from 'next-themes';

/** Page canvas only; components keep token --bg / --ink / etc. */
const CANVAS_START = '#000000';
const CANVAS_END = '#1f1f1f';

function clearCanvas() {
  const root = document.documentElement;
  root.classList.remove('home-canvas-drive');
  root.removeAttribute('data-canvas-lift');
  root.style.removeProperty('--home-canvas');
  root.style.removeProperty('background-color');
  document.body.style.removeProperty('background-color');
}

function hexToRgb(hex: string) {
  const sanitized = hex.replace('#', '');
  const value = Number.parseInt(sanitized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function blendHexColor(startHex: string, endHex: string, t: number): string {
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const clamped = Math.max(0, Math.min(1, t));
  const r = Math.round(start.r + (end.r - start.r) * clamped);
  const g = Math.round(start.g + (end.g - start.g) * clamped);
  const b = Math.round(start.b + (end.b - start.b) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
}

function resolveCanvasColor(): string {
  const vh = window.innerHeight || 1;
  const maxScroll = document.documentElement.scrollHeight - vh;
  if (maxScroll <= 0) return CANVAS_START;

  const rawProgress = window.scrollY / maxScroll;
  const easedProgress = Math.max(0, Math.min(1, rawProgress)) ** 1.35;
  return blendHexColor(CANVAS_START, CANVAS_END, easedProgress);
}

/**
 * Dark theme only: homepage canvas starts black and gradually tints to charcoal.
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
      root.removeAttribute('data-canvas-lift');
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
