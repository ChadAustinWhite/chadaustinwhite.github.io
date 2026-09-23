import type { CaseStudyRoute } from './portfolioData';

export type HomeSliderBackground = 'light' | 'dark';

export interface HomeSliderSlide {
  name: string;
  img: string;
  /** Dominant field behind the subject — prefer alternating adjacent slides. */
  background: HomeSliderBackground;
  car?: boolean;
  route?: CaseStudyRoute;
  /** Optional looping MP4 shown in place of the still while this frame is in view. */
  video?: string;
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

const EXPEDIA_ACCELERATOR_IMG = `${BASE}/expedia-accelerator.png`;

/**
 * Opening stack when the homepage loads (top → bottom).
 * Hero is the middle frame so all three sit in the first viewport.
 */
export const HOME_SLIDER_OPENING_IMGS = [
  `${BASE}/spork-v2.png`,
  `${BASE}/lexus-mobile-hero.png`,
  `${BASE}/levis-motorcycle.png`,
] as const;

/** First slide centered when the homepage loads. */
export const HOME_SLIDER_HERO_IMG = HOME_SLIDER_OPENING_IMGS[1];

const rawSlides: HomeSliderSlide[] = [
  // Dark photography / charcoal mats
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-racecar.jpg`, background: 'dark', car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-interior.jpg`, background: 'dark', car: true },
  { name: 'McLaren FWD', img: `${BASE}/mclaren-fwd.png`, background: 'dark', car: true },
  { name: "Levi's", img: `${BASE}/levis.png`, background: 'dark' },
  { name: "Levi's", img: `${BASE}/levis-motorcycle.png`, background: 'dark' },
  { name: "Levi's", img: `${BASE}/levis-rider.png`, background: 'dark' },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-riley.jpg`, background: 'dark' },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-kelly.jpg`, background: 'dark' },
  // Light UI / paper / bright photography
  { name: 'Progressive Controls', img: `${BASE}/spork-v2.png`, background: 'light', video: `${BASE}/spork-v2.mp4` },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-mobile-hero.png`, background: 'dark', car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-desktop.png`, background: 'light', car: true },
  { name: 'Lexus Driving Tour', img: `${BASE}/lexus-experience.png`, background: 'light', car: true },
  { name: "Levi's", img: `${BASE}/levis-denim-supply.png`, background: 'light' },
  { name: "Levi's", img: `${BASE}/levis-eagle-bolt.png`, background: 'light' },
  { name: 'Quiksilver', img: `${BASE}/quiksilver-tony.jpg`, background: 'light' },
  { name: 'Expedia Accelerator', img: EXPEDIA_ACCELERATOR_IMG, background: 'light' },
  { name: 'Expedia Ad Portal', img: `${BASE}/expedia-ad-portal-campaign-v3.png`, background: 'light' },
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

/** Product UI frames that should not form a consecutive stack. */
const SEPARATE_UI_IMGS = new Set([
  `${BASE}/expedia-ad-portal-campaign-v3.png`,
  EXPEDIA_ACCELERATOR_IMG,
  `${BASE}/mclaren-fwd.png`,
]);
const isSeparateUi = (slide: HomeSliderSlide) => SEPARATE_UI_IMGS.has(slide.img);

/** Project / family clashes — never adjacent. */
const areRelated = (a: HomeSliderSlide, b: HomeSliderSlide): boolean => {
  if (isCar(a) && isCar(b)) return true;
  if (isLevis(a) && isLevis(b)) return true;
  if (isExpedia(a) && isExpedia(b)) return true;
  if (isSeparateUi(a) && isSeparateUi(b)) return true;
  if (a.name === b.name) return true;
  return false;
};

const deckHasRelatedNeighbors = (deck: HomeSliderSlide[]): boolean => {
  const n = deck.length;
  for (let i = 0; i < n; i++) {
    if (areRelated(deck[i], deck[(i + 1) % n])) return true;
  }
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

/**
 * Build a ring that never places two light (or two dark, when counts allow)
 * slides back-to-back. Related-project rules are best-effort on top of that.
 */
function buildSlides(): HomeSliderSlide[] {
  for (let attempt = 0; attempt < 600; attempt++) {
    const deck = buildSlidesOnce();
    if (deck) return deck;
  }

  const best = buildSlidesBestEffort();
  if (best) {
    const hasLightClump = best.some(
      (slide, i) =>
        slide.background === 'light' &&
        best[(i + 1) % best.length].background === 'light',
    );
    if (!hasLightClump) return best;
  }

  return forceLightDarkAlternate();
}

/** Guarantees no two light slides are neighbors, even if darks must clump. */
function forceLightDarkAlternate(): HomeSliderSlide[] {
  const lights = shuffle(rawSlides.filter((s) => s.background === 'light'));
  const darks = shuffle(rawSlides.filter((s) => s.background === 'dark'));
  const n = rawSlides.length;
  const deck: Array<HomeSliderSlide | null> = Array(n).fill(null);

  // Spread lights around the ring with at least one slot between each.
  const lightSlots: number[] = [];
  for (let i = 0; i < lights.length; i++) {
    lightSlots.push(Math.floor((i * n) / lights.length));
  }
  // Ensure uniqueness if floor collisions occur
  const used = new Set<number>();
  for (let i = 0; i < lightSlots.length; i++) {
    let slot = lightSlots[i];
    while (used.has(slot)) slot = (slot + 1) % n;
    // Avoid adjacent light slots
    const prev = [...used].find(
      (s) => (s + 1) % n === slot || (slot + 1) % n === s,
    );
    if (prev !== undefined) {
      let guard = 0;
      while (
        used.has(slot) ||
        [...used].some((s) => (s + 1) % n === slot || (slot + 1) % n === s)
      ) {
        slot = (slot + 1) % n;
        if (++guard > n) break;
      }
    }
    used.add(slot);
    lightSlots[i] = slot;
  }

  lightSlots.forEach((slot, i) => {
    deck[slot] = lights[i];
  });

  const remaining = [...darks];
  for (let i = 0; i < n; i++) {
    if (deck[i]) continue;
    deck[i] = remaining.shift()!;
  }

  return deck as HomeSliderSlide[];
}

/**
 * Place the remaining slides after the opening trio without related neighbors —
 * including the ring seam where the last slide meets the pinned Ad Portal frame
 * (so Accelerator / Ad Portal never sit next to each other).
 */
function arrangeRestAfterOpening(
  trio: HomeSliderSlide[],
  rest: HomeSliderSlide[],
): HomeSliderSlide[] {
  if (rest.length === 0) return rest;

  for (let attempt = 0; attempt < 500; attempt++) {
    const remaining = shuffle([...rest]);
    const placed: HomeSliderSlide[] = [];
    let ok = true;

    while (remaining.length > 0) {
      const isLast = remaining.length === 1;
      const left = placed.length === 0 ? trio[trio.length - 1] : placed[placed.length - 1];
      const idx = remaining.findIndex((item) => {
        if (areRelated(left, item)) return false;
        if (isLast && areRelated(item, trio[0])) return false;
        return true;
      });
      if (idx === -1) {
        ok = false;
        break;
      }
      placed.push(remaining.splice(idx, 1)[0]);
    }

    if (ok && !deckHasRelatedNeighbors([...trio, ...placed])) return placed;
  }

  return rest;
}

/**
 * Keep the opening trio consecutive (Progressive Controls → Lexus phone → motorcycle)
 * so the first viewport shows that stack with the phone centered.
 */
function pinOpeningTrio(deck: HomeSliderSlide[]): HomeSliderSlide[] {
  const openingSet = new Set<string>(HOME_SLIDER_OPENING_IMGS);
  const trio = HOME_SLIDER_OPENING_IMGS.map(
    (img) => deck.find((slide) => slide.img === img)!,
  );
  if (trio.some((slide) => !slide)) return deck;

  const rest = arrangeRestAfterOpening(
    trio,
    deck.filter((slide) => !openingSet.has(slide.img)),
  );
  return [...trio, ...rest];
}

/** Shuffled once per page load — matches the prototype deck order. */
export const homeSliderSlides = pinOpeningTrio(buildSlides());
