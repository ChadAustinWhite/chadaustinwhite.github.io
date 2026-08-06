import { useEffect } from 'react';

const HOME_CANVAS_BASE = '#f5f4f0';

function applyCanvasColor(color: string) {
  const root = document.documentElement;
  root.style.setProperty('--home-canvas', color);
  root.style.backgroundColor = color;
  document.body.style.backgroundColor = color;
}

function clearCanvas() {
  const root = document.documentElement;
  root.classList.remove('home-canvas-drive', 'home-card-dark', 'home-card-hover');
  root.removeAttribute('data-canvas-lift');
  root.style.removeProperty('--home-canvas');
  root.style.removeProperty('background-color');
  document.body.style.removeProperty('background-color');
}

/** Perceived luminance 0–255 (sRGB relative). */
function luminance(hex: string): number {
  const raw = hex.replace('#', '').trim();
  if (raw.length !== 6) return 0;
  const n = Number.parseInt(raw, 16);
  if (Number.isNaN(n)) return 0;
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Homepage canvas:
 * - warm cream by default
 * - on project hover, morphs to the card’s brand color (Hoodzpah-style)
 * - flips to light type when the hover color is dark
 */
export function useHomeScrollBackground(hoverColor: string | null) {
  useEffect(() => {
    document.documentElement.classList.add('home-canvas-interactive');
    return () => {
      document.documentElement.classList.remove('home-canvas-interactive');
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion && !hoverColor) {
      clearCanvas();
      applyCanvasColor(HOME_CANVAS_BASE);
      return () => clearCanvas();
    }

    root.classList.add('home-canvas-drive');

    if (hoverColor) {
      const darkHover = luminance(hoverColor) < 150;
      root.classList.add('home-card-hover');
      root.classList.toggle('home-card-dark', darkHover);
      applyCanvasColor(hoverColor);
    } else {
      root.classList.remove('home-card-hover', 'home-card-dark');
      applyCanvasColor(HOME_CANVAS_BASE);
    }

    return () => {
      clearCanvas();
    };
  }, [hoverColor]);
}
