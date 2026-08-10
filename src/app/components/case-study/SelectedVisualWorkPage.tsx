import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useReducedMotion } from 'motion/react';
import levisTwoHorseImage from '../../../assets/levis-two-horse-brand.png';
import levisEagleBoltImage from '../../../assets/levis-eagle-bolt.png';
import levisRivetedImage from '../../../assets/levis-original-riveted.png';
import levisDenimSupplyImage from '../../../assets/levis-denim-supply-co.png';
import levisRiderImage from '../../../assets/levis-rider-graphic.png';
import levisCafeRacerImage from '../../../assets/levis-cafe-racer.png';
import levisClassicCarImage from '../../../assets/levis-classic-car.png';

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};

const gallery: GalleryItem[] = [
  {
    src: levisTwoHorseImage,
    alt: 'Two Horse Brand Crafted with the Finest Denim eagle graphic on a dark navy field',
    title: 'Two horse brand',
    subtitle: "Levi’s",
  },
  {
    src: levisRivetedImage,
    alt: "Levi’s Original Riveted heritage badge on a mustard field",
    title: 'Original riveted',
    subtitle: "Levi’s",
  },
  {
    src: levisDenimSupplyImage,
    alt: 'Levi Strauss and Co Denim Supply Co quality goods stamp on a tan field',
    title: 'Denim supply co',
    subtitle: "Levi’s",
  },
  {
    src: levisRiderImage,
    alt: 'Distressed graphic of a rider leaning into a cafe racer motorcycle',
    title: 'Cafe racer rider',
    subtitle: 'Illustration',
  },
  {
    src: levisCafeRacerImage,
    alt: 'Low-contrast line illustration of a cafe racer motorcycle on a dark field',
    title: 'Cafe racer',
    subtitle: 'Line study',
  },
  {
    src: levisEagleBoltImage,
    alt: 'Levi’s eagle illustration over a jagged bolt line with red batwing logo on a light field',
    title: 'Eagle mark',
    subtitle: "Levi’s",
  },
  {
    src: levisClassicCarImage,
    alt: 'Low-contrast illustration of a vintage fastback muscle car on a dark field',
    title: 'Fastback',
    subtitle: 'Line study',
  },
];

/** How many cards peek behind the active one (JAMS crate depth). */
const PEEK = 4;
/** Vertical stagger between peeked cards (px) — more air as cards get larger. */
const PEEK_Y = 48;
/** Wheel delta accumulated before stepping to next/prev. */
const WHEEL_THRESHOLD = 70;
/** Drag distance (px) before changing slide. */
const DRAG_THRESHOLD = 90;

interface SelectedVisualWorkPageProps {
  onBack: () => void;
}

/**
 * Levi’s / selected visual work — B/D JAMS “crate” card stack.
 * Scroll / swipe / arrow keys advance one cover at a time.
 * https://jams.basicagency.com/
 */
export function SelectedVisualWorkPage({ onBack }: SelectedVisualWorkPageProps) {
  const [view, setView] = useState<'crate' | 'grid'>('crate');
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const reduce = Boolean(useReducedMotion());
  const crateRef = useRef<HTMLElement | null>(null);
  const wheelAccRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartYRef = useRef(0);
  const lockRef = useRef(false);

  const total = gallery.length;
  const goTo = useCallback(
    (next: number) => {
      setActive(Math.max(0, Math.min(total - 1, next)));
      setDragOffset(0);
    },
    [total],
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      setActive((i) => {
        const next = i + dir;
        if (next < 0 || next > total - 1) return i;
        return next;
      });
      setDragOffset(0);
      if (!reduce) {
        lockRef.current = true;
        window.setTimeout(() => {
          lockRef.current = false;
        }, 420);
      }
    },
    [reduce, total],
  );

  // Non-passive wheel so we can prevent page scroll while browsing the deck.
  useEffect(() => {
    if (view !== 'crate') return;
    const el = crateRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      wheelAccRef.current += event.deltaY;
      if (wheelAccRef.current >= WHEEL_THRESHOLD) {
        wheelAccRef.current = 0;
        step(1);
      } else if (wheelAccRef.current <= -WHEEL_THRESHOLD) {
        wheelAccRef.current = 0;
        step(-1);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [step, view]);

  // Keyboard
  useEffect(() => {
    if (view !== 'crate') return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        step(1);
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, view]);

  const onPointerDown = (event: ReactPointerEvent) => {
    if (view !== 'crate') return;
    pointerIdRef.current = event.pointerId;
    dragStartYRef.current = event.clientY;
    setIsDragging(true);
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    if (pointerIdRef.current !== event.pointerId || !isDragging) return;
    const dy = event.clientY - dragStartYRef.current;
    setDragOffset(dy);
  };

  const endDrag = (event: ReactPointerEvent) => {
    if (pointerIdRef.current !== event.pointerId) return;
    pointerIdRef.current = null;
    setIsDragging(false);
    const dy = event.clientY - dragStartYRef.current;
    if (dy <= -DRAG_THRESHOLD) {
      step(1);
    } else if (dy >= DRAG_THRESHOLD) {
      step(-1);
    } else {
      setDragOffset(0);
    }
  };

  return (
    <article className={`visual-jams visual-jams--${view}`}>
      <header className="visual-jams__bar">
        <button
          type="button"
          onClick={onBack}
          className="visual-jams__bar-link"
          aria-label="Back to all work"
        >
          ← All work
        </button>

        <div className="visual-jams__bar-views" role="group" aria-label="Gallery layout">
          <button
            type="button"
            className={`visual-jams__bar-view${view === 'crate' ? ' is-active' : ''}`}
            aria-pressed={view === 'crate'}
            onClick={() => setView('crate')}
          >
            Crate
          </button>
          <span className="visual-jams__bar-sep" aria-hidden>
            ,
          </span>
          <button
            type="button"
            className={`visual-jams__bar-view${view === 'grid' ? ' is-active' : ''}`}
            aria-pressed={view === 'grid'}
            onClick={() => setView('grid')}
          >
            Grid
          </button>
        </div>

        <p className="visual-jams__bar-counter" aria-live="polite">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </header>

      {view === 'crate' ? (
        <section
          ref={crateRef}
          className="visual-crate"
          aria-label="Levi’s visual work. Scroll or swipe to browse."
          aria-roledescription="carousel"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="visual-crate__stage">
            {gallery.map((item, index) => {
              const depth = index - active;
              // Only render a small window around the active index for performance.
              if (depth < -1 || depth > PEEK) return null;

              // Front card (depth 0): can drag. Positive depth = queued behind, fanned up.
              // Depth -1 = previous card leaving downward.
              let y = 0;
              let scale = 1;
              let opacity = 1;
              let z = 20 - depth;
              let widthFactor = 1;

              if (depth === 0) {
                y = Math.min(90, Math.max(-140, dragOffset * 0.55));
                scale = 1;
                z = 40;
              } else if (depth > 0) {
                const peek = Math.min(depth, PEEK);
                // Each layer sits higher and slightly narrower — classic JAMS fan.
                y = -peek * PEEK_Y + Math.min(0, dragOffset * 0.08);
                scale = 1 - peek * 0.028;
                widthFactor = 1 - peek * 0.026;
                opacity = 1 - peek * 0.03;
                z = 30 - depth;
              } else {
                // Previous: slips down out of the deck
                y = 36 - dragOffset * 0.22;
                scale = 0.985;
                opacity = Math.max(0, 0.5 + dragOffset * 0.004);
                z = 10;
              }

              const isFront = depth === 0;

              return (
                <figure
                  key={item.src}
                  className={`visual-crate__card${isFront ? ' is-front' : ''}${
                    isDragging && isFront ? ' is-dragging' : ''
                  }`}
                  style={{
                    zIndex: z,
                    opacity,
                    transform: `translate3d(-50%, ${y}px, 0) scale(${scale})`,
                    width: `${widthFactor * 100}%`,
                    transition: isDragging && isFront ? 'none' : undefined,
                  }}
                  aria-hidden={!isFront}
                >
                  <div className="visual-crate__media">
                    <img
                      src={item.src}
                      alt={isFront ? item.alt : ''}
                      className="visual-crate__img"
                      draggable={false}
                      loading={Math.abs(depth) <= 1 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  {isFront ? (
                    <figcaption className="visual-crate__caption">
                      <div className="visual-crate__caption-left">
                        <p className="visual-crate__caption-index">
                          ({String(index + 1).padStart(2, '0')})
                        </p>
                        <p className="visual-crate__caption-title">{item.title}</p>
                      </div>
                      <p className="visual-crate__caption-sub">{item.subtitle}</p>
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>

          <p className="visual-crate__hint">
            {active < total - 1
              ? 'Scroll or swipe to browse'
              : 'End of stack — scroll up to go back'}
          </p>

          {/* Accessible list controls */}
          <div className="visual-crate__controls">
            <button
              type="button"
              className="visual-crate__control"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous work"
            >
              Prev
            </button>
            <button
              type="button"
              className="visual-crate__control"
              onClick={() => goTo(active + 1)}
              disabled={active === total - 1}
              aria-label="Next work"
            >
              Next
            </button>
          </div>
        </section>
      ) : (
        <section className="visual-jams__gallery visual-jams__gallery--grid px-[var(--cs-page-gutter)] pb-20">
          <div className="visual-jams__intro visual-jams__intro--grid">
            <h1 className="visual-jams__title serif-headline">Levi’s</h1>
            <p className="visual-jams__lede">
              Brand graphics for Levi’s merchandise: marks, badges, and print-ready illustrations
              built for apparel and product.
            </p>
          </div>
          <div className="visual-jams__gallery-inner">
            {gallery.map((image, index) => (
              <article key={image.src} className="visual-jams__card">
                <div className="visual-jams__media">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="visual-jams__img"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div className="visual-jams__meta">
                  <p className="visual-jams__meta-title">{image.title}</p>
                  <p className="visual-jams__meta-sub">{image.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
