import { useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

/**
 * End-of-page control that smooth-scrolls back to the top.
 * Renders above the footer breakline.
 */
export function ScrollToTopAffordance() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="scroll-to-top__icon" aria-hidden strokeWidth={1.75} />
      <span>Top</span>
    </button>
  );
}
