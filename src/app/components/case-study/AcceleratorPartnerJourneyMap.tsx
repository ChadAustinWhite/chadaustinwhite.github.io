import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';

type PhaseTone = 'discover' | 'configure' | 'publish' | 'optimize';

type JourneyStep = {
  title: string;
  insight: string;
  facts: string[];
  /** Friction intensity 1–5, used as chart height and color. */
  friction: number;
  phaseId: PhaseTone;
  phaseLabel: string;
  tone: PhaseTone;
  number: number;
};

/**
 * Cool → warm sequential scale (color theory / arousal encoding):
 * cooler hues read as calmer / lower urgency; warmer hues advance and signal higher friction.
 */
const FRICTION_COLORS = {
  1: '#4A7085',
  2: '#3F8A7A',
  3: '#C49A3C',
  4: '#D06A32',
  5: '#B83A3A',
} as const;

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
        facts: [
          'Accelerator sits three levels deep under Marketing.',
          'Partners often confuse it with Promotions and Travel ads.',
          'Discovery relied on customer success tip-offs more than IA.',
        ],
      },
      {
        title: 'Learn about it',
        insight: 'Unclear how Accelerator differs from other visibility tools.',
        friction: 3,
        facts: [
          'Value proposition competed with other visibility products.',
          'Partners asked what “boost in sort order” meant in practice.',
          'No single comparison of Accelerator vs. adjacent offerings.',
        ],
      },
      {
        title: 'Start create',
        insight: 'First CTA to create is easy to miss; naming feels opaque.',
        friction: 3,
        facts: [
          'Primary create action competed with denser reporting chrome.',
          '“Accelerator” naming did not describe the partner outcome.',
          'First-time creators needed coaching to begin the flow.',
        ],
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
        facts: [
          'Partners often needed more than six stay-date ranges.',
          'Comparing overlapping ranges required external notes.',
          'Blockout dates were easy to miss beside stay-date controls.',
        ],
      },
      {
        title: 'Select margin',
        insight: 'Partners doubt recommendations and can’t see total spend.',
        friction: 5,
        facts: [
          'Recommended margins lacked transparent spend projections.',
          'Partners could not see total cost before committing.',
          'Highest friction moment in the create journey.',
        ],
      },
      {
        title: 'Preview performance',
        insight: 'Chart labels are easy to miss, so trust in the forecast drops.',
        friction: 4,
        facts: [
          'Forecast charts buried axis labels and units.',
          'Partners questioned whether the preview reflected live demand.',
          'Trust dropped when the chart and margin story disagreed.',
        ],
      },
      {
        title: 'Advanced visibility',
        insight: 'Rate and marketplace choices need clearer hierarchy.',
        friction: 3,
        facts: [
          'Defaults applied to all rate plans and marketplaces.',
          'Advanced controls were collapsed and easy to overlook.',
          'Partners wanted clearer defaults vs. intentional overrides.',
        ],
      },
      {
        title: 'Enable OneKeyCash',
        insight: 'Who pays, and what impact it has, is often unclear.',
        friction: 3,
        facts: [
          'Cost ownership between brand and traveler was ambiguous.',
          'Impact on eligibility and ranking was hard to preview.',
          'Partners paused to ask CS before enabling the option.',
        ],
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
        facts: [
          'Submit confirmation did not explain activation timing.',
          'Partners were unsure when the Accelerator would appear in search.',
          'No clear path from success state into monitoring.',
        ],
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
        facts: [
          'Metrics competed for attention without a clear hierarchy.',
          'Refresh cadence was not labeled on the reporting surface.',
          'Partners struggled to connect spend to booking lift.',
        ],
      },
      {
        title: 'Create another',
        insight: 'Path back into create is hard to find from reporting.',
        friction: 2,
        facts: [
          'Create entry points were weaker from the reporting view.',
          'Returning partners expected a faster second-create path.',
          'Lowest friction moment once the product was understood.',
        ],
      },
      {
        title: 'Manage accelerators',
        insight: 'Editing live campaigns needs more confidence and control.',
        friction: 4,
        facts: [
          'Editing live Accelerators felt riskier than creating new ones.',
          'Partners wanted clearer control over pause, edit, and end states.',
          'Confidence dropped without strong change-impact previews.',
        ],
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
const Y_TICKS = [1, 2, 3, 4, 5] as const;

function frictionColor(value: number) {
  const level = Math.min(FRICTION_MAX, Math.max(1, Math.round(value))) as keyof typeof FRICTION_COLORS;
  return FRICTION_COLORS[level];
}

function frictionLabel(value: number) {
  if (value >= 5) return 'Critical';
  if (value >= 4) return 'High';
  if (value >= 3) return 'Moderate';
  if (value >= 2) return 'Low';
  return 'Light';
}

function stepKey(step: Pick<JourneyStep, 'phaseId' | 'title'>) {
  return `${step.phaseId}-${step.title}`;
}

/** Scrollable friction timeline: journey moments plotted as a data visualization. */
export function AcceleratorPartnerJourneyMap() {
  const trendGradientId = useId().replace(/:/g, '');
  const popoverId = useId().replace(/:/g, '');
  const [phaseFilter, setPhaseFilter] = useState<PhaseTone | 'all'>('all');
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);

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
    setOpenKey(null);
  }, [phaseFilter, scrollToIndex]);

  const safeIndex = Math.min(activeIndex, Math.max(0, visibleSteps.length - 1));
  const activeStep = visibleSteps[safeIndex];
  const openStep = visibleSteps.find((step) => stepKey(step) === openKey) ?? null;

  useEffect(() => {
    if (!openKey) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenKey(null);
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.accelerator-journey__popover')) return;
      if (target.closest('.accelerator-journey__plot.is-open')) return;
      setOpenKey(null);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openKey]);

  useLayoutEffect(() => {
    if (!openKey) {
      setPopoverPos(null);
      return;
    }

    const updatePosition = () => {
      const dot = document.querySelector(
        '.accelerator-journey__plot.is-open .accelerator-journey__dot',
      );
      if (!(dot instanceof HTMLElement)) {
        setPopoverPos(null);
        return;
      }
      const rect = dot.getBoundingClientRect();
      const halfWidth = 156;
      const rawLeft = rect.left + rect.width / 2;
      setPopoverPos({
        top: rect.top,
        left: Math.min(window.innerWidth - halfWidth - 12, Math.max(halfWidth + 12, rawLeft)),
      });
    };

    updatePosition();
    const settleTimer = window.setTimeout(updatePosition, 720);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [openKey, safeIndex, visibleSteps.length]);

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

  const handlePhaseFilter = (next: PhaseTone | 'all') => {
    setPhaseFilter((current) => (current === next && next !== 'all' ? 'all' : next));
  };

  const handlePlotClick = (index: number, event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const step = visibleSteps[index];
    if (!step) return;
    const key = stepKey(step);
    scrollToIndex(index);
    setOpenKey((current) => (current === key ? null : key));
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
      </div>

      <div className="accelerator-journey__chart">
        <div className="accelerator-journey__y-axis" aria-hidden>
          <span className="accelerator-journey__y-label">Friction</span>
          <ol className="accelerator-journey__y-ticks">
            {[...Y_TICKS].reverse().map((tick) => (
              <li key={tick}>
                <span style={{ color: frictionColor(tick) }}>{tick}</span>
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
                        background: `color-mix(in srgb, ${frictionColor(tick)} 22%, transparent)`,
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
                  <defs>
                    <linearGradient
                      id={trendGradientId}
                      gradientUnits="userSpaceOnUse"
                      x1="50"
                      y1="0"
                      x2={(visibleSteps.length - 1) * 100 + 50}
                      y2="0"
                    >
                      {visibleSteps.map((step, index) => (
                        <stop
                          key={`${step.phaseId}-${step.title}-stop`}
                          offset={
                            visibleSteps.length === 1
                              ? '0%'
                              : `${(index / (visibleSteps.length - 1)) * 100}%`
                          }
                          stopColor={frictionColor(step.friction)}
                        />
                      ))}
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke={`url(#${trendGradientId})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    points={polylinePoints}
                  />
                </svg>

                <ol className="accelerator-journey__plots">
                  {visibleSteps.map((step, index) => {
                    const heightPct = ((step.friction - 1) / (FRICTION_MAX - 1)) * 100;
                    const isActive = index === safeIndex;
                    const key = stepKey(step);
                    const isOpen = openKey === key;
                    const color = frictionColor(step.friction);

                    return (
                      <li
                        key={key}
                        className={`accelerator-journey__plot accelerator-journey__plot--friction-${step.friction}${
                          isActive ? ' is-active' : ''
                        }${isOpen ? ' is-open' : ''}`}
                        style={
                          {
                            '--journey-friction': color,
                            '--journey-stem-h': `${Math.max(heightPct, 8)}%`,
                          } as CSSProperties
                        }
                      >
                        <button
                          type="button"
                          className="accelerator-journey__plot-hit"
                          onClick={(event) => handlePlotClick(index, event)}
                          aria-current={isActive ? 'true' : undefined}
                          aria-expanded={isOpen}
                          aria-controls={isOpen ? popoverId : undefined}
                          aria-label={`${step.number}. ${step.title}. Friction ${step.friction} of ${FRICTION_MAX}, ${frictionLabel(step.friction)}. ${step.insight}. Click for facts.`}
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
          <p className="accelerator-journey__readout-title">
            {openStep ? openStep.title : activeStep.title}
          </p>
          <p className="accelerator-journey__readout-insight">
            {openStep ? openStep.insight : activeStep.insight}
          </p>
        </div>

        <div className="accelerator-journey__controls" role="group" aria-label="Timeline controls">
          <button
            type="button"
            className="accelerator-journey__nav-btn"
            onClick={() => {
              setOpenKey(null);
              scrollPrev();
            }}
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
            onClick={() => {
              setOpenKey(null);
              scrollNext();
            }}
            disabled={!canScrollNext}
            aria-label="Next moment"
          >
            <NavArrow direction="right" />
          </button>
        </div>
      </div>

      {openStep && popoverPos
        ? createPortal(
            <JourneyMomentPopover
              id={popoverId}
              step={openStep}
              top={popoverPos.top}
              left={popoverPos.left}
              onClose={() => setOpenKey(null)}
            />,
            document.body,
          )
        : null}
    </figure>
  );
}

function JourneyMomentPopover({
  id,
  step,
  top,
  left,
  onClose,
}: {
  id: string;
  step: JourneyStep;
  top: number;
  left: number;
  onClose: () => void;
}) {
  const color = frictionColor(step.friction);
  const preferBelow = top < 280;

  return (
    <div
      id={id}
      className={`accelerator-journey__popover${preferBelow ? ' is-below' : ''}`}
      role="dialog"
      aria-label={`${step.title} journey facts`}
      style={
        {
          '--journey-friction': color,
          top: preferBelow ? top + 14 : top - 12,
          left,
        } as CSSProperties
      }
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="accelerator-journey__popover-arrow" aria-hidden />
      <div className="accelerator-journey__popover-header">
        <div>
          <p className="accelerator-journey__popover-kicker">
            <span style={{ color }}>{frictionLabel(step.friction)}</span>
            <span aria-hidden>·</span>
            <span>{step.phaseLabel}</span>
          </p>
          <p className="accelerator-journey__popover-title">{step.title}</p>
        </div>
        <button
          type="button"
          className="accelerator-journey__popover-close"
          aria-label="Close facts"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <p className="accelerator-journey__popover-insight">{step.insight}</p>
      <dl className="accelerator-journey__popover-facts">
        <div>
          <dt>Friction</dt>
          <dd style={{ color }}>
            {step.friction}/{FRICTION_MAX}
          </dd>
        </div>
        <div>
          <dt>Moment</dt>
          <dd>{String(step.number).padStart(2, '0')}</dd>
        </div>
        <div>
          <dt>Phase</dt>
          <dd>{step.phaseLabel}</dd>
        </div>
      </dl>
      <ul className="accelerator-journey__popover-list">
        {step.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </div>
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

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 3.5l7 7M10.5 3.5l-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
