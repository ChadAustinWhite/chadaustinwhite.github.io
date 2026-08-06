import { useScrollProgress } from '../hooks/useScrollProgress';

/**
 * Fixed vertical chrome on the home page: side rails with a scroll-progress fill.
 * Stays put while center content scrolls (native, no jacking).
 */
export function HomeChrome() {
  const progress = useScrollProgress();
  const fill = `${Math.round(progress * 10000) / 100}%`;

  return (
    <div className="home-chrome" aria-hidden>
      <div className="home-chrome__rail home-chrome__rail--left">
        <div className="home-chrome__fill" style={{ height: fill }} />
      </div>
      <div className="home-chrome__rail home-chrome__rail--right">
        <div className="home-chrome__fill home-chrome__fill--from-bottom" style={{ height: fill }} />
      </div>
    </div>
  );
}
