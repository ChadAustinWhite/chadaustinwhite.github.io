import type { CaseStudyRoute } from './portfolioData';

export type HomeSliderBackground = 'light' | 'dark';

export interface HomeSliderSlide {
  name: string;
  img: string;
  /** Dominant field behind the subject — prefer alternating adjacent slides. */
  background: HomeSliderBackground;
  car?: boolean;
  route?: CaseStudyRoute;
}

const SLIDE_ROUTES: Record<string, CaseStudyRoute> = {
  'Lexus Driving Tour': 'case-study-lexus-driving-tour',
  'McLaren FWD': 'case-study-mclaren-fwd',
  "Levi's": 'illustrations',
  Quiksilver: 'case-study-quiksilver',
  'First American Playbook': 'case-study-first-american-playbook',
  'Expedia Accelerator': 'case-study-expedia-accelerator',
  'Expedia Ad Portal': 'case-study-expedia-ad-portal',
};

const BASE = '/home-slider';

const rawSlides: HomeSliderSlide[] = [
  // Dark photography / charcoal mats
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-driving-tour.png`, background: 'dark', car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-coastal.jpg`, background: 'dark' },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-racecar.jpg`, background: 'dark', car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-interior.jpg`, background: 'dark', car: true },
  { name: 'McLaren FWD', img: `${BASE}/mclaren-fwd.png`, background: 'dark', car: true },
  { name: "Levi's", img: `${BASE}/levis.png`, background: 'dark' },
  { name: "Levi's", img: `${BASE}/levis-quality-indigo.png`, background: 'dark' },
  { name: "Levi's", img: `${BASE}/levis-motorcycle.png`, background: 'dark' },
  { name: "Levi's", img: `${BASE}/levis-rider.png`, background: 'dark' },
  { name: 'Quiksilver', img: `${BASE}/quiksilver.png`, background: 'dark' },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-riley.jpg`, background: 'dark' },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-kelly.jpg`, background: 'dark' },
  { name: 'First American Playbook', img: `${BASE}/first-american.png`, background: 'dark' },
  // Light UI / paper / bright photography
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-mobile.png`, background: 'light', car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-desktop.png`, background: 'light', car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-experience.png`, background: 'light', car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-invited.png`, background: 'light' },
  { name: "Levi's", img: `${BASE}/levis-denim-supply.png`, background: 'light' },
  { name: "Levi's", img: `${BASE}/levis-eagle-bolt.png`, background: 'light' },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-tony.jpg`, background: 'light' },
  { name: 'First American Playbook', img: `${BASE}/first-american-discovery.jpg`, background: 'light' },
  { name: 'Expedia Accelerator', img: `${BASE}/expedia-accelerator.png`, background: 'light' },
  { name: 'Expedia Accelerator', img: `${BASE}/expedia-accelerator-laptop.png`, background: 'light' },
  { name: 'Expedia Ad Portal', img: `${BASE}/expedia-ad-portal-campaign.png`, background: 'light' },
].map((slide) => ({
  ...slide,
  route: SLIDE_ROUTES[slide.name],
}));

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const isLevis = (slide: HomeSliderSlide) => slide.name === "Levi's";
const isCar = (slide: HomeSliderSlide) => Boolean(slide.car);
const isExpedia = (slide: HomeSliderSlide) => slide.name.startsWith('Expedia');
const sameBackground = (a: HomeSliderSlide, b: HomeSliderSlide) =>
  a.background === b.background;

/** Project / family clashes — never adjacent. */
const areRelated = (a: HomeSliderSlide, b: HomeSliderSlide): boolean => {
  if (isCar(a) && isCar(b)) return true;
  if (isLevis(a) && isLevis(b)) return true;
  if (isExpedia(a) && isExpedia(b)) return true;
  if (a.name === b.name) return true;
  return false;
};

const deckIsValid = (deck: HomeSliderSlide[]): boolean => {
  for (let i = 0; i < deck.length; i++) {
    const next = deck[(i + 1) % deck.length];
    if (areRelated(deck[i], next)) return false;
    if (sameBackground(deck[i], next)) return false;
  }
  return true;
};

const fitsAt = (
  item: HomeSliderSlide,
  left: HomeSliderSlide | null | undefined,
  right: HomeSliderSlide | null | undefined,
  requireOppositeBackground: boolean,
): boolean => {
  if (left && areRelated(left, item)) return false;
  if (right && areRelated(item, right)) return false;
  if (requireOppositeBackground) {
    if (left && sameBackground(left, item)) return false;
    if (right && sameBackground(item, right)) return false;
  }
  return true;
};

/**
 * Pin the scarcer background evenly around the ring, then fill remaining
 * slots so light/dark alternate and related work never sits side by side.
 */
function buildSlidesOnce(): HomeSliderSlide[] | null {
  const lights = shuffle(rawSlides.filter((s) => s.background === 'light'));
  const darks = shuffle(rawSlides.filter((s) => s.background === 'dark'));
  const n = rawSlides.length;
  if (lights.length + darks.length !== n) return null;

  // Equal (or off-by-one) counts can fully alternate when the scarcer tone is pinned.
  const pinned = lights.length <= darks.length ? lights : darks;
  const fillers = lights.length <= darks.length ? darks : lights;
  const k = pinned.length;
  if (k === 0) return null;

  const deck: Array<HomeSliderSlide | null> = Array(n).fill(null);
  const step = Math.floor(n / k);
  const start = Math.floor(Math.random() * n);

  for (let i = 0; i < k; i++) {
    deck[(start + i * step) % n] = pinned[i];
  }

  const empties = deck
    .map((slide, index) => (slide ? -1 : index))
    .filter((index) => index >= 0);

  if (empties.length !== fillers.length) return null;

  const remaining = [...fillers];

  for (const index of empties) {
    const left = deck[(index - 1 + n) % n];
    const right = deck[(index + 1) % n];
    let fit = remaining.findIndex((item) => fitsAt(item, left, right, true));
    if (fit === -1) return null;
    deck[index] = remaining.splice(fit, 1)[0];
  }

  if (deck.some((slide) => !slide)) return null;
  const filled = deck as HomeSliderSlide[];
  return deckIsValid(filled) ? filled : null;
}

/**
 * When light/dark counts differ, a perfect ring alternation is impossible.
 * Keep project separation and minimize same-background adjacencies.
 */
function buildSlidesBestEffort(): HomeSliderSlide[] | null {
  let best: HomeSliderSlide[] | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let attempt = 0; attempt < 600; attempt++) {
    const lights = shuffle(rawSlides.filter((s) => s.background === 'light'));
    const darks = shuffle(rawSlides.filter((s) => s.background === 'dark'));
    const n = rawSlides.length;
    const pinned = lights.length <= darks.length ? lights : darks;
    const fillers = lights.length <= darks.length ? darks : lights;
    const deck: Array<HomeSliderSlide | null> = Array(n).fill(null);
    const step = Math.floor(n / pinned.length);
    const start = Math.floor(Math.random() * n);

    for (let i = 0; i < pinned.length; i++) {
      deck[(start + i * step) % n] = pinned[i];
    }

    const empties = deck
      .map((slide, index) => (slide ? -1 : index))
      .filter((index) => index >= 0);
    const remaining = [...fillers];
    let ok = true;

    for (const index of empties) {
      const left = deck[(index - 1 + n) % n];
      const right = deck[(index + 1) % n];
      let fit = remaining.findIndex((item) => fitsAt(item, left, right, true));
      if (fit === -1) {
        fit = remaining.findIndex((item) => fitsAt(item, left, right, false));
      }
      if (fit === -1) {
        ok = false;
        break;
      }
      deck[index] = remaining.splice(fit, 1)[0];
    }

    if (!ok || deck.some((s) => !s)) continue;
    const filled = deck as HomeSliderSlide[];
    if (filled.some((slide, i) => areRelated(slide, filled[(i + 1) % n]))) continue;

    let sameBg = 0;
    for (let i = 0; i < n; i++) {
      if (sameBackground(filled[i], filled[(i + 1) % n])) sameBg += 1;
    }
    if (sameBg < bestScore) {
      bestScore = sameBg;
      best = filled;
      if (sameBg === 0) return filled;
    }
  }

  return best;
}

function buildSlides(): HomeSliderSlide[] {
  for (let attempt = 0; attempt < 400; attempt++) {
    const deck = buildSlidesOnce();
    if (deck) return deck;
  }
  return buildSlidesBestEffort() ?? rawSlides;
}

/** Shuffled once per page load — matches the prototype deck order. */
export const homeSliderSlides = buildSlides();
