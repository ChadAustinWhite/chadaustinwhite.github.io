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
  { name: 'McLaren FWD', img: `${BASE}/mclaren-fwd.png`, car: true },
  { name: 'McLaren FWD', img: `${BASE}/mclaren-coastal.jpg`, car: true },
  { name: "Levi's", img: `${BASE}/levis.png` },
  { name: "Levi's", img: `${BASE}/levis-classic.png`, car: true },
  { name: "Levi's", img: `${BASE}/levis-motorcycle.png` },
  { name: "Levi's", img: `${BASE}/levis-rider.png` },
  { name: 'Quiksilver', img: `${BASE}/quiksilver.png` },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-tony.jpg` },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-riley.jpg` },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-kelly.jpg` },
  { name: 'First American Playbook', img: `${BASE}/first-american.png` },
  { name: 'Expedia Accelerator', img: `${BASE}/expedia-accelerator.png` },
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

/** Slides that should never sit directly next to each other in the deck. */
const areRelated = (a: HomeSliderSlide, b: HomeSliderSlide): boolean => {
  if (isCar(a) && isCar(b)) return true;
  if (isLevis(a) && isLevis(b)) return true;
  if (a.name === b.name) return true;
  return false;
};

const deckIsValid = (deck: HomeSliderSlide[]): boolean => {
  for (let i = 0; i < deck.length; i++) {
    if (areRelated(deck[i], deck[(i + 1) % deck.length])) return false;
  }
  return true;
};

const canPlaceBetween = (
  item: HomeSliderSlide,
  left: HomeSliderSlide,
  right: HomeSliderSlide,
): boolean => !areRelated(item, left) && !areRelated(item, right);

const insertIntoGaps = (
  base: HomeSliderSlide[],
  extras: HomeSliderSlide[],
  canPlace: (item: HomeSliderSlide, left: HomeSliderSlide, right: HomeSliderSlide) => boolean,
): HomeSliderSlide[] | null => {
  const count = base.length;
  const gaps = shuffle([...Array(count).keys()]);
  const placed: Array<HomeSliderSlide | null> = Array(count).fill(null);

  for (const item of extras) {
    const gap = gaps.find((index) => {
      if (placed[index]) return false;
      const left = base[index];
      const right = base[(index + 1) % count];
      return canPlace(item, left, right);
    });
    if (gap === undefined) return null;
    placed[gap] = item;
    gaps.splice(gaps.indexOf(gap), 1);
  }

  const mixed: HomeSliderSlide[] = [];
  for (let i = 0; i < count; i++) {
    mixed.push(base[i]);
    if (placed[i]) mixed.push(placed[i]);
  }
  return mixed;
};

function buildSlidesOnce(): HomeSliderSlide[] | null {
  const cars = shuffle(rawSlides.filter(isCar));
  const nonCars = rawSlides.filter((slide) => !isCar(slide));
  const nonCarLevis = shuffle(nonCars.filter(isLevis));
  const nonCarRest = shuffle(nonCars.filter((slide) => !isLevis(slide)));

  const spacedNonCars = insertIntoGaps(nonCarRest, nonCarLevis, canPlaceBetween);
  const mixed =
    spacedNonCars && insertIntoGaps(spacedNonCars, cars, canPlaceBetween);

  if (!mixed || !deckIsValid(mixed)) return null;
  return mixed;
}

function buildSlides(): HomeSliderSlide[] {
  for (let attempt = 0; attempt < 200; attempt++) {
    const deck = buildSlidesOnce();
    if (deck) return deck;
  }
  return rawSlides;
}

/** Shuffled once per page load — matches the prototype deck order. */
export const homeSliderSlides = buildSlides();
