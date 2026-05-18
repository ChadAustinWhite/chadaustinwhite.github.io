import { useEffect } from 'react';

const HOME_CANVAS_BASE = '#f5f4f0';
const HOME_CANVAS_DARK = '#1c1c1a';

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

/**
 * Homepage canvas: warm cream by default; switches to dark mode while a project CTA is hovered.
 */
export function useHomeScrollBackground(isCardHovered: boolean) {
  useEffect(() => {
    document.documentElement.classList.add('home-canvas-interactive');
    return () => {
      document.documentElement.classList.remove('home-canvas-interactive');
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isCardHovered) {
      root.classList.add('home-card-dark');
    } else {
      root.classList.remove('home-card-dark');
    }
    return () => root.classList.remove('home-card-dark');
  }, [isCardHovered]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion && !isCardHovered) {
      clearCanvas();
      applyCanvasColor(HOME_CANVAS_BASE);
      return;
    }

    document.documentElement.classList.add('home-canvas-drive');
    applyCanvasColor(isCardHovered ? HOME_CANVAS_DARK : HOME_CANVAS_BASE);

    return () => {
      clearCanvas();
    };
  }, [isCardHovered]);
}
