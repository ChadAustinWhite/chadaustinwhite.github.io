import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';
import { flushSync } from 'react-dom';

type PageTransitionContextValue = {
  overlayRef: RefObject<HTMLDivElement | null>;
  surfaceRef: RefObject<HTMLDivElement | null>;
  /** Swap the route, then reveal the new page with a soft wipe/fade. */
  transitionTo: (commit: () => void) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

/** Smooth ease used for both the wipe and fade. */
const REVEAL_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const REVEAL_MS = 900;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function clearSurfaceStyles(surface: HTMLElement) {
  surface.style.position = '';
  surface.style.zIndex = '';
  surface.style.willChange = '';
  surface.style.transition = '';
  surface.style.transform = '';
  surface.style.opacity = '';
  surface.style.clipPath = '';
  surface.style.filter = '';
}

/**
 * Soft wipe + lift: new page starts clipped from the bottom and slightly settled,
 * then uncovers upward with a gentle fade/unblur — different from a full translate slide.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const runningRef = useRef(false);

  const transitionTo = useCallback((commit: () => void) => {
    if (runningRef.current) return;

    const overlay = overlayRef.current;
    const surface = surfaceRef.current;

    if (!overlay || !surface || prefersReducedMotion()) {
      commit();
      window.scrollTo(0, 0);
      return;
    }

    runningRef.current = true;
    document.documentElement.classList.add('page-transition-active');

    overlay.style.display = 'block';
    surface.style.position = 'relative';
    surface.style.zIndex = '999';
    surface.style.willChange = 'clip-path, opacity, transform, filter';

    surface.style.transition = 'none';
    flushSync(() => {
      commit();
    });
    window.scrollTo(0, 0);

    // Start fully covered from the bottom, slightly soft and settled.
    surface.style.clipPath = 'inset(100% 0 0 0)';
    surface.style.opacity = '0.88';
    surface.style.transform = 'translate3d(0, 28px, 0) scale(0.992)';
    surface.style.filter = 'blur(6px)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const t = `clip-path ${REVEAL_MS}ms ${REVEAL_EASE}, opacity ${REVEAL_MS * 0.85}ms ${REVEAL_EASE}, transform ${REVEAL_MS}ms ${REVEAL_EASE}, filter ${REVEAL_MS * 0.75}ms ${REVEAL_EASE}`;
        surface.style.transition = t;
        surface.style.clipPath = 'inset(0 0 0 0)';
        surface.style.opacity = '1';
        surface.style.transform = 'translate3d(0, 0, 0) scale(1)';
        surface.style.filter = 'blur(0px)';

        const finish = (event?: TransitionEvent) => {
          if (event && event.target !== surface) return;
          // Wait for the main wipe to complete.
          if (event && event.propertyName && event.propertyName !== 'clip-path') return;

          surface.removeEventListener('transitionend', finish);
          window.clearTimeout(fallback);
          clearSurfaceStyles(surface);
          overlay.style.display = 'none';
          document.documentElement.classList.remove('page-transition-active');
          runningRef.current = false;
        };

        const fallback = window.setTimeout(() => finish(), REVEAL_MS + 80);
        surface.addEventListener('transitionend', finish);
      });
    });
  }, []);

  return (
    <PageTransitionContext.Provider value={{ overlayRef, surfaceRef, transitionTo }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return ctx;
}

/** Soft veil under the revealing page surface. */
export function PageTransitionOverlay({
  overlayRef,
}: {
  overlayRef: RefObject<HTMLDivElement | null>;
}) {
  return <div ref={overlayRef} className="page-transition-overlay" aria-hidden />;
}
