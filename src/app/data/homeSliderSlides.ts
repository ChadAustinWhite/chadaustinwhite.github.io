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

/** Interleave Levi's with everything else while respecting adjacency rules. */
function buildSlidesOnce(): HomeSliderSlide[] | null {
  let levis = shuffle(rawSlides.filter(isLevis));
  let others = shuffle(rawSlides.filter((slide) => !isLevis(slide)));
  const deck: HomeSliderSlide[] = [];

  while (levis.length > 0 || others.length > 0) {
    const last = deck.at(-1);
    const canAddLevis = levis.length > 0 && (!last || !areRelated(last, levis[0]));
    const canAddOther = others.length > 0 && (!last || !areRelated(last, others[0]));

    if (!canAddLevis && !canAddOther) return null;

    if (canAddLevis && (levis.length >= others.length || !canAddOther)) {
      deck.push(levis.shift()!);
    } else {
      deck.push(others.shift()!);
    }
  }

  return deckIsValid(deck) ? deck : null;
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
