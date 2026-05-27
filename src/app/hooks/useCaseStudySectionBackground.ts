import { useEffect } from 'react';

const BG_START = '#0a0a0a';
const BG_END = '#f5f4f0';
const INK_START = '#f0f0ee';
const INK_END = '#2d2d2d';
const INK_MUTED_START = '#9c9890';
const INK_MUTED_END = '#636363';
const INK_SUBTLE_START = '#7a7670';
const INK_SUBTLE_END = '#8a8a8a';
const BORDER_START = '#2a2a28';
const BORDER_END = '#e8e7e3';
const CARD_BG_START = '#1c1c1a';
const CARD_BG_END = '#efeeea';
const NAV_PILL_START = '#2a2a28';
const NAV_PILL_END = '#e8e7e3';

const TRANSITION = 'background-color 0.4s ease-out, color 0.4s ease-out';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = hex.slice(1);
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
}

function interpolateHex(hexStart: string, hexEnd: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(hexStart);
  const [r2, g2, b2] = hexToRgb(hexEnd);
  return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t));
}

/** Fraction of total scroll over which the black→white transition completes (e.g. 0.35 = done by 35% scroll). */
const TRANSITION_SCROLL_FRACTION = 0.35;

/** Ease t so we stay dark then snap to light—reduces time in gray. Cubic ease-in. */
function easeInCubic(t: number): number {
  return t * t * t;
}

function getScrollProgress(): number {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  const raw = Math.max(0, scrollY / maxScroll);
  const linear = Math.min(1, raw / TRANSITION_SCROLL_FRACTION);
  return easeInCubic(linear);
}

function applyScrollGradient(t: number) {
  const bg = interpolateHex(BG_START, BG_END, t);
  const ink = interpolateHex(INK_START, INK_END, t);
  const inkMuted = interpolateHex(INK_MUTED_START, INK_MUTED_END, t);
  const inkSubtle = interpolateHex(INK_SUBTLE_START, INK_SUBTLE_END, t);
  const border = interpolateHex(BORDER_START, BORDER_END, t);
  const cardBg = interpolateHex(CARD_BG_START, CARD_BG_END, t);
  const navPillBg = interpolateHex(NAV_PILL_START, NAV_PILL_END, t);

  document.body.style.transition = TRANSITION;
  document.body.style.backgroundColor = bg;

  const nav = document.getElementById('site-nav');
  if (nav) {
    nav.style.transition = TRANSITION;
    nav.style.backgroundColor = bg;
  }

  const wrapper = document.querySelector('[data-case-study]') as HTMLElement | null;
  if (wrapper) {
    wrapper.style.setProperty('--bg', bg);
    wrapper.style.setProperty('--ink', ink);
    wrapper.style.setProperty('--ink-muted', inkMuted);
    wrapper.style.setProperty('--ink-subtle', inkSubtle);
    wrapper.style.setProperty('--border', border);
    wrapper.style.setProperty('--card-bg', cardBg);
    wrapper.style.setProperty('--nav-pill-bg', navPillBg);
    wrapper.style.setProperty('--nav-bg', bg);
    wrapper.style.setProperty('--home-canvas-base', bg);
  }
}

function clearScrollGradient() {
  document.body.style.backgroundColor = '';
  document.body.style.transition = '';
  const nav = document.getElementById('site-nav');
  if (nav) {
    nav.style.backgroundColor = '';
    nav.style.transition = '';
  }
  const wrapper = document.querySelector('[data-case-study]') as HTMLElement | null;
  if (wrapper) {
    wrapper.removeAttribute('data-scroll-gradient');
    wrapper.style.removeProperty('--bg');
    wrapper.style.removeProperty('--ink');
    wrapper.style.removeProperty('--ink-muted');
    wrapper.style.removeProperty('--ink-subtle');
    wrapper.style.removeProperty('--border');
    wrapper.style.removeProperty('--card-bg');
    wrapper.style.removeProperty('--nav-pill-bg');
    wrapper.style.removeProperty('--nav-bg');
    wrapper.style.removeProperty('--home-canvas-base');
  }
}

/** Dark → warm editorial gradient driven by vertical scroll on case study pages. */
export function useCaseStudySectionBackground(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const wrapper = document.querySelector('[data-case-study]') as HTMLElement | null;
    wrapper?.setAttribute('data-scroll-gradient', '');

    let rafId = 0;

    const update = () => {
      applyScrollGradient(getScrollProgress());
    };

    const onScroll = () => {
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      clearScrollGradient();
    };
  }, [enabled]);
}
