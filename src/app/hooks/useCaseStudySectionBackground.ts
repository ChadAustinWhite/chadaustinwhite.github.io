import { useEffect } from 'react';

const BG_DARK = '#0a0a0a';
const BG_LIGHT = '#f5f4f0';
const INK_ON_DARK = '#f0f0ee';
const INK_ON_LIGHT = '#2d2d2d';
const INK_MUTED_ON_DARK = '#9c9890';
const INK_MUTED_ON_LIGHT = '#636363';
const INK_SUBTLE_ON_DARK = '#7a7670';
const INK_SUBTLE_ON_LIGHT = '#8a8a8a';
const BORDER_ON_DARK = '#2a2a28';
const BORDER_ON_LIGHT = '#e8e7e3';
const CARD_BG_ON_DARK = '#1c1c1a';
const CARD_BG_ON_LIGHT = '#efeeea';
const NAV_PILL_ON_DARK = '#2a2a28';
const NAV_PILL_ON_LIGHT = '#e8e7e3';

const TRANSITION = 'background-color 0.4s ease-out, color 0.4s ease-out';

export type CaseStudyScrollGradientMode = 'to-light' | 'to-dark';

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

/** Fraction of total scroll over which the transition completes (e.g. 0.35 = done by 35% scroll). */
const TRANSITION_SCROLL_FRACTION = 0.35;

/** Ease t so we linger at the start color, then commit — reduces time in gray. Cubic ease-in. */
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

function resolveMode(mode: boolean | CaseStudyScrollGradientMode): CaseStudyScrollGradientMode | null {
  if (!mode) return null;
  if (mode === 'to-dark') return 'to-dark';
  return 'to-light';
}

function applyScrollGradient(t: number, direction: CaseStudyScrollGradientMode) {
  const fromBg = direction === 'to-dark' ? BG_LIGHT : BG_DARK;
  const toBg = direction === 'to-dark' ? BG_DARK : BG_LIGHT;
  const fromInk = direction === 'to-dark' ? INK_ON_LIGHT : INK_ON_DARK;
  const toInk = direction === 'to-dark' ? INK_ON_DARK : INK_ON_LIGHT;
  const fromInkMuted = direction === 'to-dark' ? INK_MUTED_ON_LIGHT : INK_MUTED_ON_DARK;
  const toInkMuted = direction === 'to-dark' ? INK_MUTED_ON_DARK : INK_MUTED_ON_LIGHT;
  const fromInkSubtle = direction === 'to-dark' ? INK_SUBTLE_ON_LIGHT : INK_SUBTLE_ON_DARK;
  const toInkSubtle = direction === 'to-dark' ? INK_SUBTLE_ON_DARK : INK_SUBTLE_ON_LIGHT;
  const fromBorder = direction === 'to-dark' ? BORDER_ON_LIGHT : BORDER_ON_DARK;
  const toBorder = direction === 'to-dark' ? BORDER_ON_DARK : BORDER_ON_LIGHT;
  const fromCardBg = direction === 'to-dark' ? CARD_BG_ON_LIGHT : CARD_BG_ON_DARK;
  const toCardBg = direction === 'to-dark' ? CARD_BG_ON_DARK : CARD_BG_ON_LIGHT;
  const fromNavPill = direction === 'to-dark' ? NAV_PILL_ON_LIGHT : NAV_PILL_ON_DARK;
  const toNavPill = direction === 'to-dark' ? NAV_PILL_ON_DARK : NAV_PILL_ON_LIGHT;

  const bg = interpolateHex(fromBg, toBg, t);
  const ink = interpolateHex(fromInk, toInk, t);
  const inkMuted = interpolateHex(fromInkMuted, toInkMuted, t);
  const inkSubtle = interpolateHex(fromInkSubtle, toInkSubtle, t);
  const border = interpolateHex(fromBorder, toBorder, t);
  const cardBg = interpolateHex(fromCardBg, toCardBg, t);
  const navPillBg = interpolateHex(fromNavPill, toNavPill, t);

  document.documentElement.style.transition = TRANSITION;
  document.documentElement.style.backgroundColor = bg;
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
    const preferDark =
      (direction === 'to-dark' && t > 0.5) || (direction === 'to-light' && t < 0.5);
    wrapper.style.colorScheme = preferDark ? 'dark' : 'light';
  }
}

function clearScrollGradient() {
  document.documentElement.style.backgroundColor = '';
  document.documentElement.style.transition = '';
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
    wrapper.style.removeProperty('color-scheme');
  }
}

/**
 * Scroll-driven case study background.
 * - `true` / `'to-light'`: black → warm editorial
 * - `'to-dark'`: warm editorial → black
 */
export function useCaseStudySectionBackground(mode: boolean | CaseStudyScrollGradientMode) {
  useEffect(() => {
    const direction = resolveMode(mode);
    if (!direction) return;

    const wrapper = document.querySelector('[data-case-study]') as HTMLElement | null;
    wrapper?.setAttribute('data-scroll-gradient', direction);

    let rafId = 0;

    const update = () => {
      applyScrollGradient(getScrollProgress(), direction);
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
  }, [mode]);
}
