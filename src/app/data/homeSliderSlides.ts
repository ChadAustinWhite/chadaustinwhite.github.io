import type { CaseStudyRoute } from './portfolioData';

export interface HomeSliderSlide {
  name: string;
  img: string;
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
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-driving-tour.png`, car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-coastal.jpg` },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-racecar.jpg`, car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-interior.jpg`, car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-mobile.png`, car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-desktop.png`, car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-experience.png`, car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-invited.png` },
  { name: 'McLaren FWD', img: `${BASE}/mclaren-fwd.png`, car: true },
  { name: "Levi's", img: `${BASE}/levis.png` },
  { name: "Levi's", img: `${BASE}/levis-quality-indigo.png` },
  { name: "Levi's", img: `${BASE}/levis-denim-supply.png` },
  { name: "Levi's", img: `${BASE}/levis-motorcycle.png` },
  { name: "Levi's", img: `${BASE}/levis-rider.png` },
  { name: "Levi's", img: `${BASE}/levis-eagle-bolt.png` },
  { name: "Levi's", img: `${BASE}/levis-classic.png` },
  { name: 'Quiksilver', img: `${BASE}/quiksilver.png` },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-tony.jpg` },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-riley.jpg` },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-kelly.jpg` },
  { name: 'First American Playbook', img: `${BASE}/first-american.png` },
  { name: 'First American Playbook', img: `${BASE}/first-american-process.jpg` },
  { name: 'First American Playbook', img: `${BASE}/first-american-discovery.jpg` },
  { name: 'Expedia Accelerator', img: `${BASE}/expedia-accelerator.png` },
  { name: 'Expedia Accelerator', img: `${BASE}/expedia-accelerator-laptop.png` },
  { name: 'Expedia Ad Portal', img: `${BASE}/expedia-ad-portal-access-list.png` },
  { name: 'Expedia Ad Portal', img: `${BASE}/expedia-ad-portal-campaign.png` },
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

/** Slides that should never sit directly next to each other in the deck. */
const areRelated = (a: HomeSliderSlide, b: HomeSliderSlide): boolean => {
  if (isCar(a) && isCar(b)) return true;
  if (isLevis(a) && isLevis(b)) return true;
  if (isExpedia(a) && isExpedia(b)) return true;
  if (a.name === b.name) return true;
  return false;
};

const deckIsValid = (deck: HomeSliderSlide[]): boolean => {
  for (let i = 0; i < deck.length; i++) {
    if (areRelated(deck[i], deck[(i + 1) % deck.length])) return false;
  }
  return true;
};

/**
 * Pin Expedia slides at evenly spaced ring positions first, then fill the
 * remaining slots so related work never sits side by side.
 */
function buildSlidesOnce(): HomeSliderSlide[] | null {
  const expedia = shuffle(rawSlides.filter(isExpedia));
  const rest = shuffle(rawSlides.filter((slide) => !isExpedia(slide)));
  const n = rawSlides.length;
  const k = expedia.length;
  if (k === 0) return null;

  const deck: Array<HomeSliderSlide | null> = Array(n).fill(null);
  const step = Math.floor(n / k);
  const start = Math.floor(Math.random() * n);

  for (let i = 0; i < k; i++) {
    deck[(start + i * step) % n] = expedia[i];
  }

  const empties = deck
    .map((slide, index) => (slide ? -1 : index))
    .filter((index) => index >= 0);

  if (empties.length !== rest.length) return null;

  const remaining = [...rest];

  for (const index of empties) {
    const left = deck[(index - 1 + n) % n];
    const right = deck[(index + 1) % n];
    const fit = remaining.findIndex((item) => {
      if (left && areRelated(left, item)) return false;
      if (right && areRelated(item, right)) return false;
      return true;
    });
    if (fit === -1) return null;
    deck[index] = remaining.splice(fit, 1)[0];
  }

  if (deck.some((slide) => !slide)) return null;
  const filled = deck as HomeSliderSlide[];
  return deckIsValid(filled) ? filled : null;
}

function buildSlides(): HomeSliderSlide[] {
  for (let attempt = 0; attempt < 400; attempt++) {
    const deck = buildSlidesOnce();
    if (deck) return deck;
  }
  return rawSlides;
}

/** Shuffled once per page load — matches the prototype deck order. */
export const homeSliderSlides = buildSlides();
