import { useEffect, useRef, useState } from 'react';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';

type HomeSliderCursorProps = {
  /** True while a frame that opens a case study sits under the pointer. */
  open: boolean;
};

/**
 * Stands in for the native cursor over the slider: a dot that swells into a blush
 * prompt over frames that open a case study, then collapses again during a drag.
 */
export function HomeSliderCursor({ open }: HomeSliderCursorProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(FINE_POINTER).matches,
  );
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER);
    const sync = () => setEnabled(query.matches);
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const badge = badgeRef.current;
    if (!enabled || !badge) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const place = () => {
      frame = 0;
      badge.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      setVisible(
        event.target instanceof Element &&
          Boolean(event.target.closest('.home-slider__viewport')),
      );
      if (!frame) frame = requestAnimationFrame(place);
    };

    const hide = () => setVisible(false);
    const hold = () => setHeld(true);
    const release = () => setHeld(false);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', hold);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    document.addEventListener('pointerleave', hide);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', hold);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      document.removeEventListener('pointerleave', hide);
    };
  }, [enabled]);

  if (!enabled) return null;

  const className = [
    'home-slider__cursor',
    visible ? 'home-slider__cursor--visible' : '',
    open && !held ? 'home-slider__cursor--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={badgeRef} className={className} aria-hidden>
      <span>Click to view</span>
    </div>
  );
}
