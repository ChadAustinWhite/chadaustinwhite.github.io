import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'motion/react';
import type { CaseStudySonosMetric } from './types';

function parsePercentValue(raw: string): number {
  const parsed = Number.parseFloat(raw.replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function AnimatedPercent({
  value,
  active,
  reducedMotion,
  delay,
}: {
  value: string;
  active: boolean;
  reducedMotion: boolean;
  delay: number;
}) {
  const target = parsePercentValue(value);
  const [display, setDisplay] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (!active) return;

    if (reducedMotion) {
      setDisplay(target);
      return;
    }

    setDisplay(0);
    const controls = animate(0, target, {
      duration: 1.65,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [active, delay, reducedMotion, target]);

  const suffix = value.includes('%') ? '%' : '';

  return (
    <>
      {display.toFixed(2)}
      {suffix}
    </>
  );
}

export function InstrumentMetricsHighlight({ metrics }: { metrics: CaseStudySonosMetric[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.45, once: true });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <div ref={rootRef} className="case-study-instrument__metrics-highlight" role="list">
      {metrics.map((metric, index) => (
        <motion.article
          key={metric.label}
          className="case-study-instrument__metrics-highlight-row"
          role="listitem"
          aria-label={`${metric.label} ${metric.value}`}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        >
          <p className="case-study-instrument__metrics-highlight-value serif-headline tabular-nums">
            <AnimatedPercent
              value={metric.value}
              active={inView}
              reducedMotion={reducedMotion}
              delay={0.15 + index * 0.14}
            />
          </p>
          <p className="case-study-instrument__metrics-highlight-label serif-headline">
            {metric.label}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
