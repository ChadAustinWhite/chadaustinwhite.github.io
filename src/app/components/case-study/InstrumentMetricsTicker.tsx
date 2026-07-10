import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import type { CaseStudySonosMetric } from './types';

type ValueToken = { type: 'digit'; value: number } | { type: 'char'; value: string };

const REEL_CYCLES = 2;

function parseTickerValue(raw: string): ValueToken[] {
  return [...raw].map((char) => {
    const digit = Number.parseInt(char, 10);
    if (!Number.isNaN(digit)) {
      return { type: 'digit', value: digit } satisfies ValueToken;
    }
    return { type: 'char', value: char } satisfies ValueToken;
  });
}

function buildReelCells(finalDigit: number, cycles = REEL_CYCLES): number[] {
  const cells: number[] = [];

  for (let cycle = 0; cycle < cycles; cycle += 1) {
    for (let digit = 0; digit < 10; digit += 1) {
      cells.push(digit);
    }
  }

  for (let digit = 0; digit <= finalDigit; digit += 1) {
    cells.push(digit);
  }

  return cells;
}

function TickerReel({
  digit,
  delay,
  active,
  reducedMotion,
}: {
  digit: number;
  delay: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  const cells = buildReelCells(digit);
  const finalIndex = cells.length - 1;
  const restingY = `-${(finalIndex / cells.length) * 100}%`;

  return (
    <span className="case-study-instrument__ticker-reel" aria-hidden>
      <motion.span
        className="case-study-instrument__ticker-reel-column"
        initial={{ y: reducedMotion ? restingY : '0%' }}
        animate={{ y: active || reducedMotion ? restingY : '0%' }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 2.1,
                delay,
                ease: [0.12, 0.85, 0.2, 1],
              }
        }
      >
        {cells.map((cell, index) => (
          <span key={`${digit}-${index}`} className="case-study-instrument__ticker-reel-cell">
            {cell}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function TickerValue({
  value,
  active,
  reducedMotion,
  baseDelay = 0,
}: {
  value: string;
  active: boolean;
  reducedMotion: boolean;
  baseDelay?: number;
}) {
  const tokens = parseTickerValue(value);
  let digitIndex = 0;

  return (
    <span className="case-study-instrument__ticker-value tabular-nums" aria-hidden>
      {tokens.map((token, index) => {
        if (token.type === 'digit') {
          const delay = baseDelay + digitIndex * 0.08;
          digitIndex += 1;
          return (
            <TickerReel
              key={`${value}-digit-${index}`}
              digit={token.value}
              delay={delay}
              active={active}
              reducedMotion={reducedMotion}
            />
          );
        }

        return (
          <span key={`${value}-char-${index}`} className="case-study-instrument__ticker-char">
            {token.value}
          </span>
        );
      })}
    </span>
  );
}

export function InstrumentMetricsTicker({ metrics }: { metrics: CaseStudySonosMetric[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.5, once: true });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <div ref={rootRef} className="case-study-instrument__ticker-rail" role="list">
      <div className="case-study-instrument__ticker-rail-head" aria-hidden>
        <span className="case-study-instrument__ticker-rail-live">
          <span className="case-study-instrument__ticker-rail-live-dot" />
          Benchmarks
        </span>
      </div>

      <div className="case-study-instrument__ticker-rail-track">
        {metrics.map((metric, statIndex) => (
          <div key={metric.label} className="case-study-instrument__ticker-rail-item" role="listitem">
            <p className="case-study-instrument__ticker-rail-label">{metric.label}</p>
            <p className="case-study-instrument__ticker-rail-value" aria-label={`${metric.label} ${metric.value}`}>
              <TickerValue
                value={metric.value}
                active={inView}
                reducedMotion={reducedMotion}
                baseDelay={statIndex * 0.18}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
