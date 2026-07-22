import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';

type PhaseTone = 'discover' | 'configure' | 'publish' | 'optimize';

const PHASES = [
  {
    id: 'discover' as const,
    label: 'Discover',
    tone: 'discover' as const,
    steps: [
      {
        title: 'Find Accelerator',
        insight: 'Partners dig through left nav — the product is hard to locate.',
      },
      {
        title: 'Learn about it',
        insight: 'Unclear how Accelerator differs from other visibility tools.',
      },
      {
        title: 'Start create',
        insight: 'First CTA to create is easy to miss; naming feels opaque.',
      },
    ],
  },
  {
    id: 'configure' as const,
    label: 'Configure',
    tone: 'configure' as const,
    steps: [
      {
        title: 'Set stay dates',
        insight: 'Date ranges are hard to compare; six-range limits frustrate.',
      },
      {
        title: 'Select margin',
        insight: 'Partners doubt recommendations and can’t see total spend.',
      },
      {
        title: 'Preview performance',
        insight: 'Chart labels are easy to miss — trust in the forecast drops.',
      },
      {
        title: 'Advanced visibility',
        insight: 'Rate and marketplace choices need clearer hierarchy.',
      },
      {
        title: 'Enable OneKeyCash',
        insight: 'Who pays, and what impact it has, is often unclear.',
      },
    ],
  },
  {
    id: 'publish' as const,
    label: 'Publish',
    tone: 'publish' as const,
    steps: [
      {
        title: 'Create / publish',
        insight: 'After submit: “What happens next?” goes unanswered.',
      },
    ],
  },
  {
    id: 'optimize' as const,
    label: 'Optimize',
    tone: 'optimize' as const,
    steps: [
      {
        title: 'Performance overview',
        insight: 'Reporting metrics are dense; update cadence is unclear.',
      },
      {
        title: 'Create another',
        insight: 'Path back into create is hard to find from reporting.',
      },
      {
        title: 'Manage accelerators',
        insight: 'Editing live campaigns needs more confidence and control.',
      },
    ],
  },
];

const ALL_STEPS = PHASES.flatMap((phase) =>
  phase.steps.map((step) => ({
    ...step,
    phaseId: phase.id,
    phaseLabel: phase.label,
    tone: phase.tone,
  })),
).map((step, index) => ({ ...step, number: index + 1 }));

const AUTOPLAY_MS = 4200;
const SETTLE_MS = 700;

function JourneyArrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={direction === 'left' ? 'M10 3.5L5.5 8 10 12.5' : 'M6 3.5L10.5 8 6 12.5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inductive discovery: partner Create Accelerator journey synthesized from research. */
export function AcceleratorPartnerJourneyMap() {
  const [phaseFilter, setPhaseFilter] = useState<PhaseTone | 'all'>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRafRef = useRef(0);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const activeIndexRef = useRef(0);
  const isPlayingRef = useRef(true);

  const visibleSteps = useMemo(
    () =>
      phaseFilter === 'all'
        ? ALL_STEPS
        : ALL_STEPS.filter((step) => step.tone === phaseFilter),
    [phaseFilter],
  );

  const {
    ref: viewportRef,
    canScrollPrev,
    canScrollNext,
    activeIndex,
    scrollPrev,
    scrollNext,
    scrollToIndex,
    dragScrollProps,
  } = useHorizontalDragScroll({
    slideSelector: '.accelerator-journey__slide',
  });

  activeIndexRef.current = activeIndex;
  isPlayingRef.current = isPlaying;

  const clearAutoplayTimers = useCallback(() => {
    if (progressRafRef.current) {
      cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = 0;
    }
    if (settleTimeoutRef.current) {
      clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = undefined;
    }
  }, []);

  const stopAutoplay = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setProgress(0);
    clearAutoplayTimers();
  }, [clearAutoplayTimers]);

  const handleTogglePlay = () => {
    if (isPlayingRef.current) {
      stopAutoplay();
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setIsPlaying(true);
    setProgress(0);
  };

  const handlePhaseFilter = (next: PhaseTone | 'all') => {
    stopAutoplay();
    setPhaseFilter((current) => (current === next && next !== 'all' ? 'all' : next));
  };

  useEffect(() => {
    scrollToIndex(0);
  }, [phaseFilter, scrollToIndex]);

  useEffect(() => {
    if (!isPlaying) {
      clearAutoplayTimers();
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stopAutoplay();
      return undefined;
    }

    let cycleStartedAt = performance.now();
    let isSettling = false;

    const tick = (now: number) => {
      if (!isPlayingRef.current || isSettling) return;

      const nextProgress = Math.min(1, (now - cycleStartedAt) / AUTOPLAY_MS);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        const current = activeIndexRef.current;
        const nextIndex = current >= visibleSteps.length - 1 ? 0 : current + 1;
        setProgress(1);
        isSettling = true;
        scrollToIndex(nextIndex);

        settleTimeoutRef.current = setTimeout(() => {
          if (!isPlayingRef.current) return;
          isSettling = false;
          setProgress(0);
          cycleStartedAt = performance.now();
          progressRafRef.current = requestAnimationFrame(tick);
        }, SETTLE_MS);
        return;
      }

      progressRafRef.current = requestAnimationFrame(tick);
    };

    progressRafRef.current = requestAnimationFrame(tick);

    return () => {
      clearAutoplayTimers();
    };
  }, [isPlaying, clearAutoplayTimers, scrollToIndex, stopAutoplay, visibleSteps.length]);

  const activeStep = visibleSteps[activeIndex];

  return (
    <figure
      className="accelerator-journey"
      aria-label="Partner journey map for creating an Accelerator, from discovery through reporting"
    >
      <div
        className="accelerator-journey__phases"
        role="toolbar"
        aria-label="Filter journey by phase"
      >
        <button
          type="button"
          className={`accelerator-journey__phase-chip accelerator-journey__phase-chip--all${
            phaseFilter === 'all' ? ' accelerator-journey__phase-chip--active' : ''
          }`}
          aria-pressed={phaseFilter === 'all'}
          onClick={() => handlePhaseFilter('all')}
        >
          All
        </button>
        {PHASES.map((phase) => (
          <button
            key={phase.id}
            type="button"
            className={`accelerator-journey__phase-chip accelerator-journey__phase-chip--${phase.tone}${
              phaseFilter === phase.tone ? ' accelerator-journey__phase-chip--active' : ''
            }`}
            aria-pressed={phaseFilter === phase.tone}
            onClick={() => handlePhaseFilter(phase.tone)}
          >
            {phase.label}
            <span className="accelerator-journey__phase-count">{phase.steps.length}</span>
          </button>
        ))}
      </div>

      <div className="accelerator-journey__viewport-wrap">
        <div
          className={`accelerator-journey__fade accelerator-journey__fade--left${
            canScrollPrev ? ' is-visible' : ''
          }`}
          aria-hidden
        />
        <div
          className={`accelerator-journey__fade accelerator-journey__fade--right${
            canScrollNext ? ' is-visible' : ''
          }`}
          aria-hidden
        />

        <div
          ref={viewportRef}
          className="accelerator-journey__viewport touch-pan-x"
          role="region"
          aria-roledescription="carousel"
          aria-label="Partner journey pain points"
          {...dragScrollProps}
          onPointerDown={(event) => {
            stopAutoplay();
            dragScrollProps.onPointerDown?.(event);
          }}
        >
          <ol className="accelerator-journey__track">
            {visibleSteps.map((step, index) => (
              <li
                key={`${step.phaseId}-${step.title}`}
                className={`accelerator-journey__slide accelerator-journey__slide--${step.tone}${
                  index === activeIndex ? ' is-active' : ''
                }`}
              >
                <article className="accelerator-journey__card">
                  <div className="accelerator-journey__card-top">
                    <span className="accelerator-journey__num">
                      {String(step.number).padStart(2, '0')}
                    </span>
                    <span className="accelerator-journey__pain-badge">Pain point</span>
                  </div>
                  <h3 className="accelerator-journey__step-title">{step.title}</h3>
                  <div className="accelerator-journey__pain">
                    <p className="accelerator-journey__step-insight">{step.insight}</p>
                  </div>
                  <span className="accelerator-journey__phase-tag">{step.phaseLabel}</span>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div
        className="accelerator-journey__controls"
        role="group"
        aria-label="Journey carousel controls"
      >
        <button
          type="button"
          className="accelerator-journey__nav-btn"
          onClick={() => {
            stopAutoplay();
            scrollPrev();
          }}
          disabled={!canScrollPrev}
          aria-label="Previous step"
        >
          <JourneyArrow direction="left" />
        </button>

        <div className="accelerator-journey__meter">
          <button
            type="button"
            className="accelerator-journey__play"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause journey autoplay' : 'Play journey autoplay'}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <rect x="2" y="1.5" width="2.5" height="9" rx="0.5" />
                <rect x="7.5" y="1.5" width="2.5" height="9" rx="0.5" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <path d="M3.2 1.6v8.8L10.4 6 3.2 1.6Z" />
              </svg>
            )}
          </button>

          <div className="accelerator-journey__segments">
            {visibleSteps.map((step, index) => {
              const fill =
                index < activeIndex ? 1 : index === activeIndex ? (isPlaying ? progress : 1) : 0;
              return (
                <button
                  key={`${step.phaseId}-${step.title}`}
                  type="button"
                  className="accelerator-journey__segment"
                  onClick={() => {
                    stopAutoplay();
                    scrollToIndex(index);
                  }}
                  aria-label={`Go to step ${step.number}: ${step.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  <span
                    className="accelerator-journey__segment-fill"
                    style={{
                      width: `${fill * 100}%`,
                      transition:
                        index === activeIndex && isPlaying ? 'none' : 'width 200ms ease',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="accelerator-journey__nav-btn"
          onClick={() => {
            stopAutoplay();
            scrollNext();
          }}
          disabled={!canScrollNext}
          aria-label="Next step"
        >
          <JourneyArrow direction="right" />
        </button>
      </div>

      {activeStep ? (
        <p className="accelerator-journey__live-pain" aria-live="polite">
          <span className="accelerator-journey__live-pain-label">Current pain</span>
          {activeStep.insight}
        </p>
      ) : null}
    </figure>
  );
}
