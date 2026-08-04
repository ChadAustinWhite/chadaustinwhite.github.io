import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const HOLD_MS = 900;
const EXIT_MS = 900;
const SESSION_KEY = 'cwhite-splash-entered';

interface SplashScreenProps {
  /** Mount home under the splash as soon as hold completes. */
  onReveal: () => void;
  /** Remove the splash after the exit animation. */
  onComplete: () => void;
}

/**
 * Entry splash inspired by BASIC Moves® (hold-to-enter),
 * adapted to this portfolio’s warm editorial materials.
 * https://moves.basicagency.com/
 */
export function SplashScreen({ onReveal, onComplete }: SplashScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);

  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [entered, setEntered] = useState(false);

  const holdStartRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const completedRef = useRef(false);

  const finishHold = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(1);
    setHolding(false);
    setEntered(true);
    setExiting(true);
    onReveal();

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // ignore private mode write failures
    }

    window.setTimeout(
      () => {
        onComplete();
      },
      reduce ? 120 : EXIT_MS,
    );
  }, [onComplete, onReveal, reduce]);

  const stopHold = useCallback(() => {
    if (completedRef.current || exiting) return;
    holdStartRef.current = null;
    setHolding(false);
    cancelAnimationFrame(rafRef.current);
    setProgress((p) => (p < 1 ? Math.max(0, p * 0.35) : p));
  }, [exiting]);

  const tickHold = useCallback(() => {
    if (holdStartRef.current == null || completedRef.current) return;
    const elapsed = performance.now() - holdStartRef.current;
    const next = Math.min(1, elapsed / HOLD_MS);
    setProgress(next);
    if (next >= 1) {
      finishHold();
      return;
    }
    rafRef.current = requestAnimationFrame(tickHold);
  }, [finishHold]);

  const startHold = useCallback(() => {
    if (completedRef.current || exiting) return;
    if (reduce) {
      finishHold();
      return;
    }
    setHolding(true);
    holdStartRef.current = performance.now() - progress * HOLD_MS;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tickHold);
  }, [exiting, finishHold, progress, reduce, tickHold]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startHold();
      }
      if (event.key === 'Escape') {
        finishHold();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        stopHold();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [finishHold, startHold, stopHold]);

  const ringStyle = {
    background: `conic-gradient(from -90deg, var(--splash-ink) ${progress * 360}deg, transparent 0deg)`,
  };

  return (
    <div
      className={`splash-screen${exiting ? ' splash-screen--exit' : ''}${entered ? ' splash-screen--entered' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-title"
      aria-describedby="splash-desc"
    >
      <div className="splash-screen__grain" aria-hidden />
      <div className="splash-screen__vignette" aria-hidden />

      <header className="splash-screen__top">
        <p className="splash-screen__mark">Chad Austin White</p>
        <p className="splash-screen__locale">Los Angeles</p>
      </header>

      <div className="splash-screen__center">
        <p className="splash-screen__eyebrow">Portfolio</p>
        <h1 id="splash-title" className="splash-screen__title serif-headline">
          Work that moves
          <span className="splash-screen__title-line">people &amp; products</span>
        </h1>
        <p id="splash-desc" className="splash-screen__lede">
          Product design for platforms, partners, and growth — from search to payments.
        </p>
      </div>

      <div className="splash-screen__bottom">
        <button
          type="button"
          className={`splash-screen__hold${holding ? ' is-holding' : ''}${progress >= 1 ? ' is-complete' : ''}`}
          aria-label={reduce ? 'Enter site' : 'Click and hold to enter the site'}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
            startHold();
          }}
          onPointerUp={stopHold}
          onPointerCancel={stopHold}
          onPointerLeave={() => {
            if (holding) stopHold();
          }}
        >
          <span className="splash-screen__hold-ring" style={ringStyle} aria-hidden>
            <span className="splash-screen__hold-core">
              <span className="splash-screen__hold-label">
                {reduce ? 'Enter' : 'Hold'}
              </span>
              <span className="splash-screen__hold-sub">
                {reduce ? 'to continue' : 'to enter'}
              </span>
            </span>
          </span>
        </button>
        <p className="splash-screen__hint">
          {reduce ? 'Press Enter or click to continue' : 'Click & hold to enter'}
        </p>
      </div>
    </div>
  );
}

/** Returns true when this browser session has already passed the splash. */
export function hasCompletedSplash(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}
