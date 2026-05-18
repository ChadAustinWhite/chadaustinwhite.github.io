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
  root.classList.remove('home-canvas-drive');
  root.removeAttribute('data-canvas-lift');
  root.style.removeProperty('--home-canvas');
  root.style.removeProperty('background-color');
  document.body.style.removeProperty('background-color');
}

/**
 * Homepage canvas: warm cream base (#f5f4f0) or a project-card hover tint.
 */
export function useHomeScrollBackground(hoverCanvasColor: string | null) {
  useEffect(() => {
    document.documentElement.classList.add('home-canvas-interactive');
    return () => {
      document.documentElement.classList.remove('home-canvas-interactive');
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion && !hoverCanvasColor) {
      clearCanvas();
      applyCanvasColor(HOME_CANVAS_BASE);
      return;
    }

    root.classList.add('home-canvas-drive');

    if (hoverCanvasColor) {
      applyCanvasColor(hoverCanvasColor);
      return () => {
        applyCanvasColor(HOME_CANVAS_BASE);
      };
    }

    applyCanvasColor(HOME_CANVAS_BASE);

    return () => {
      clearCanvas();
    };
  }, [hoverCanvasColor]);
}
