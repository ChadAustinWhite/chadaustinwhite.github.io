import { useEffect } from 'react';
import { useTheme } from 'next-themes';

/** Page canvas only; components keep token --bg / --ink / etc. */
const CANVAS_START = '#000000';
const CANVAS_END = '#2a2a2a';

function applyCanvasColor(color: string) {
  const root = document.documentElement;
  root.style.setProperty('--home-canvas', color);
  root.style.backgroundColor = color;
  document.body.style.backgroundColor = color;
}

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

function resolveScrollCanvasColor(): string {
  const vh = window.innerHeight || 1;
  const maxScroll = document.documentElement.scrollHeight - vh;
  if (maxScroll <= 0) return CANVAS_START;

  const rawProgress = window.scrollY / maxScroll;
  const easedProgress = Math.max(0, Math.min(1, rawProgress)) ** 1.35;
  return blendHexColor(CANVAS_START, CANVAS_END, easedProgress);
}

/**
 * Homepage canvas: scroll-driven gradient in dark mode, or a project-card hover tint.
 */
export function useHomeScrollBackground(hoverCanvasColor: string | null) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.add('home-canvas-interactive');
    return () => {
      document.documentElement.classList.remove('home-canvas-interactive');
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    if (reducedMotion && !hoverCanvasColor) {
      clearCanvas();
      return;
    }

    if (hoverCanvasColor) {
      root.classList.add('home-canvas-drive');
      applyCanvasColor(hoverCanvasColor);
      return () => {
        if (resolvedTheme !== 'dark') {
          clearCanvas();
        }
      };
    }

    if (resolvedTheme !== 'dark') {
      clearCanvas();
      return;
    }

    root.classList.add('home-canvas-drive');

    let raf = 0;

    const tick = () => {
      applyCanvasColor(resolveScrollCanvasColor());
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
  }, [resolvedTheme, hoverCanvasColor]);
}
