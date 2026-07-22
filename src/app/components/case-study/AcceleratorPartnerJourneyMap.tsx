import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';

type PhaseTone = 'discover' | 'configure' | 'publish' | 'optimize';

type JourneyStep = {
  title: string;
  insight: string;
  /** Friction intensity 1–5, used as chart height. */
  friction: number;
  phaseId: PhaseTone;
  phaseLabel: string;
  tone: PhaseTone;
  number: number;
};

const PHASES = [
  {
    id: 'discover' as const,
    label: 'Discover',
    tone: 'discover' as const,
    steps: [
      {
        title: 'Find Accelerator',
        insight: 'Partners dig through left nav. The product is hard to locate.',
        friction: 4,
      },
      {
        title: 'Learn about it',
        insight: 'Unclear how Accelerator differs from other visibility tools.',
        friction: 3,
      },
      {
        title: 'Start create',
        insight: 'First CTA to create is easy to miss; naming feels opaque.',
        friction: 3,
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
        friction: 3,
      },
      {
        title: 'Select margin',
        insight: 'Partners doubt recommendations and can’t see total spend.',
        friction: 5,
      },
      {
        title: 'Preview performance',
        insight: 'Chart labels are easy to miss, so trust in the forecast drops.',
        friction: 4,
      },
      {
        title: 'Advanced visibility',
        insight: 'Rate and marketplace choices need clearer hierarchy.',
        friction: 3,
      },
      {
        title: 'Enable OneKeyCash',
        insight: 'Who pays, and what impact it has, is often unclear.',
        friction: 3,
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
        friction: 4,
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
        friction: 3,
      },
      {
        title: 'Create another',
        insight: 'Path back into create is hard to find from reporting.',
        friction: 2,
      },
      {
        title: 'Manage accelerators',
        insight: 'Editing live campaigns needs more confidence and control.',
        friction: 4,
      },
    ],
  },
];

const ALL_STEPS: JourneyStep[] = PHASES.flatMap((phase) =>
  phase.steps.map((step) => ({
    ...step,
    phaseId: phase.id,
    phaseLabel: phase.label,
    tone: phase.tone,
  })),
).map((step, index) => ({ ...step, number: index + 1 }));

const FRICTION_MAX = 5;
const Y_TICKS = [1, 2, 3, 4, 5];

function frictionLabel(value: number) {
  if (value >= 5) return 'Critical';
  if (value >= 4) return 'High';
  if (value >= 3) return 'Moderate';
  if (value >= 2) return 'Low';
  return 'Light';
}

/** Scrollable friction timeline: journey moments plotted as a data visualization. */
export function AcceleratorPartnerJourneyMap() {
  const [phaseFilter, setPhaseFilter] = useState<PhaseTone | 'all'>('all');

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
    slideSelector: '.accelerator-journey__plot',
  });

  useEffect(() => {
    scrollToIndex(0);
  }, [phaseFilter, scrollToIndex]);

  const safeIndex = Math.min(activeIndex, Math.max(0, visibleSteps.length - 1));
  const activeStep = visibleSteps[safeIndex];

  const phaseBands = useMemo(() => {
    if (phaseFilter !== 'all') {
      const phase = PHASES.find((entry) => entry.id === phaseFilter);
      if (!phase) return [];
      return [{ id: phase.id, label: phase.label, tone: phase.tone, count: visibleSteps.length }];
    }

    return PHASES.map((phase) => ({
      id: phase.id,
      label: phase.label,
      tone: phase.tone,
      count: phase.steps.length,
    }));
  }, [phaseFilter, visibleSteps.length]);

  const peakFriction = useMemo(
    () => visibleSteps.reduce((max, step) => Math.max(max, step.friction), 0),
    [visibleSteps],
  );

  const handlePhaseFilter = (next: PhaseTone | 'all') => {
    setPhaseFilter((current) => (current === next && next !== 'all' ? 'all' : next));
  };

  if (!activeStep) return null;

  const polylinePoints = visibleSteps
    .map((step, index) => {
      const x = index * 100 + 50;
      const y = ((FRICTION_MAX - step.friction) / (FRICTION_MAX - 1)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <figure
      className="accelerator-journey"
      aria-label="Partner journey friction timeline from discovery through reporting"
    >
      <div className="accelerator-journey__meta">
        <div
          className="accelerator-journey__phases"
          role="toolbar"
          aria-label="Filter journey by phase"
        >
          <button
            type="button"
            className={`accelerator-journey__phase-chip accelerator-journey__phase-chip--all${
              phaseFilter === 'all' ? ' is-active' : ''
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
                phaseFilter === phase.tone ? ' is-active' : ''
              }`}
              aria-pressed={phaseFilter === phase.tone}
              onClick={() => handlePhaseFilter(phase.tone)}
            >
              {phase.label}
            </button>
          ))}
        </div>

        <dl className="accelerator-journey__stats" aria-label="Journey summary">
          <div>
            <dt>Moments</dt>
            <dd>{visibleSteps.length}</dd>
          </div>
          <div>
            <dt>Phases</dt>
            <dd>{phaseBands.length}</dd>
          </div>
          <div>
            <dt>Peak friction</dt>
            <dd>{frictionLabel(peakFriction)}</dd>
          </div>
        </dl>
      </div>

      <div className="accelerator-journey__chart">
        <div className="accelerator-journey__y-axis" aria-hidden>
          <span className="accelerator-journey__y-label">Friction</span>
          <ol className="accelerator-journey__y-ticks">
            {[...Y_TICKS].reverse().map((tick) => (
              <li key={tick}>
                <span>{tick}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="accelerator-journey__viewport-wrap">
          <div
            ref={viewportRef}
            className="accelerator-journey__viewport"
            {...dragScrollProps}
            aria-label="Scrollable journey timeline"
          >
            <div
              className="accelerator-journey__track"
              style={{ '--journey-count': visibleSteps.length } as CSSProperties}
            >
              <div className="accelerator-journey__bands" aria-hidden>
                {phaseBands.map((band) => (
                  <div
                    key={band.id}
                    className={`accelerator-journey__band accelerator-journey__band--${band.tone}`}
                    style={{ flex: band.count }}
                  >
                    <span>{band.label}</span>
                  </div>
                ))}
              </div>

              <div className="accelerator-journey__plot-area">
                <div className="accelerator-journey__grid" aria-hidden>
                  {Y_TICKS.map((tick) => (
                    <span
                      key={tick}
                      className="accelerator-journey__grid-line"
                      style={{
                        top: `${((FRICTION_MAX - tick) / (FRICTION_MAX - 1)) * 100}%`,
                      }}
                    />
                  ))}
                </div>

                <svg
                  className="accelerator-journey__trend"
                  viewBox={`0 0 ${visibleSteps.length * 100} 100`}
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    points={polylinePoints}
                  />
                </svg>

                <ol className="accelerator-journey__plots">
                  {visibleSteps.map((step, index) => {
                    const heightPct = ((step.friction - 1) / (FRICTION_MAX - 1)) * 100;
                    const isActive = index === safeIndex;

                    return (
                      <li
                        key={`${step.phaseId}-${step.title}`}
                        className={`accelerator-journey__plot accelerator-journey__plot--${step.tone}${
                          isActive ? ' is-active' : ''
                        }`}
                      >
                        <button
                          type="button"
                          className="accelerator-journey__plot-hit"
                          onClick={() => scrollToIndex(index)}
                          aria-current={isActive ? 'true' : undefined}
                          aria-label={`${step.number}. ${step.title}. Friction ${step.friction} of ${FRICTION_MAX}. ${step.insight}`}
                        >
                          <span
                            className="accelerator-journey__stem"
                            style={{ height: `${Math.max(heightPct, 8)}%` }}
                          >
                            <span className="accelerator-journey__dot" />
                          </span>
                          <span className="accelerator-journey__x-label">
                            <span className="accelerator-journey__x-num">
                              {String(step.number).padStart(2, '0')}
                            </span>
                            <span className="accelerator-journey__x-title">{step.title}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="accelerator-journey__readout" aria-live="polite">
        <div className="accelerator-journey__readout-copy">
          <p className="accelerator-journey__readout-kicker">
            <span>{activeStep.phaseLabel}</span>
            <span aria-hidden>·</span>
            <span>
              Friction {activeStep.friction}/{FRICTION_MAX} · {frictionLabel(activeStep.friction)}
            </span>
          </p>
          <p className="accelerator-journey__readout-title">{activeStep.title}</p>
          <p className="accelerator-journey__readout-insight">{activeStep.insight}</p>
        </div>

        <div className="accelerator-journey__controls" role="group" aria-label="Timeline controls">
          <button
            type="button"
            className="accelerator-journey__nav-btn"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous moment"
          >
            <NavArrow direction="left" />
          </button>
          <p className="accelerator-journey__position" aria-hidden>
            {String(safeIndex + 1).padStart(2, '0')}
            <span>/</span>
            {String(visibleSteps.length).padStart(2, '0')}
          </p>
          <button
            type="button"
            className="accelerator-journey__nav-btn"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next moment"
          >
            <NavArrow direction="right" />
          </button>
        </div>
      </div>
    </figure>
  );
}

function NavArrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d={direction === 'left' ? 'M9 2.5L4.5 7L9 11.5' : 'M5 2.5L9.5 7L5 11.5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
