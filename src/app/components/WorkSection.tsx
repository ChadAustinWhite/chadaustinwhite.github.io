import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { SectionWrap } from './SectionWrap';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import type { CaseStudyRoute } from '../data/portfolioData';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';

const AUTO_ADVANCE_MS = 4500;
/** Match useHorizontalDragScroll settle so the next progress cycle starts after the card lands. */
const SCROLL_SETTLE_MS = 720;

function StackScrollArrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="flex-shrink-0"
    >
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

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M3.2 1.6v8.8L10.4 6 3.2 1.6Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <rect x="2.5" y="2" width="2.5" height="8" rx="0.5" />
      <rect x="7" y="2" width="2.5" height="8" rx="0.5" />
    </svg>
  );
}

const stackNavButtonClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--ink)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[background,color,border-color,opacity] duration-150 hover:bg-[var(--card-bg)] disabled:pointer-events-none disabled:opacity-35';

interface WorkSectionProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
  onProjectHover: (route: CaseStudyRoute | null) => void;
}

export function WorkSection({ onViewCaseStudy, onProjectHover }: WorkSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { amount: 0.15 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRafRef = useRef(0);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const activeIndexRef = useRef(0);
  const isPlayingRef = useRef(false);

  const {
    ref: stackRef,
    canScrollPrev,
    canScrollNext,
    activeIndex,
    scrollPrev,
    scrollNext,
    scrollToIndex,
    dragScrollProps,
  } = useHorizontalDragScroll({
    slideSelector: '.work-section-stack__slide',
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

  const handlePrev = () => {
    stopAutoplay();
    scrollPrev();
  };

  const handleNext = () => {
    stopAutoplay();
    scrollNext();
  };

  const handleTogglePlay = () => {
    if (isPlayingRef.current) {
      stopAutoplay();
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setIsPlaying(true);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying) {
      clearAutoplayTimers();
      return undefined;
    }

    let cycleStartedAt = performance.now();
    let isSettling = false;

    const tick = (now: number) => {
      if (!isPlayingRef.current || isSettling) return;

      const nextProgress = Math.min(1, (now - cycleStartedAt) / AUTO_ADVANCE_MS);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        const current = activeIndexRef.current;
        const nextIndex = current >= projects.length - 1 ? 0 : current + 1;
        setProgress(1);
        isSettling = true;
        scrollToIndex(nextIndex);

        settleTimeoutRef.current = setTimeout(() => {
          if (!isPlayingRef.current) return;
          isSettling = false;
          setProgress(0);
          cycleStartedAt = performance.now();
          progressRafRef.current = requestAnimationFrame(tick);
        }, SCROLL_SETTLE_MS);
        return;
      }

      progressRafRef.current = requestAnimationFrame(tick);
    };

    progressRafRef.current = requestAnimationFrame(tick);

    return () => {
      clearAutoplayTimers();
    };
  }, [isPlaying, scrollToIndex, clearAutoplayTimers]);

  useEffect(() => {
    if (!sectionInView && isPlayingRef.current) stopAutoplay();
  }, [sectionInView, stopAutoplay]);

  useEffect(() => {
    const viewport = stackRef.current;
    if (!viewport) return undefined;

    const pauseOnInteract = () => {
      if (isPlayingRef.current) stopAutoplay();
    };

    viewport.addEventListener('pointerdown', pauseOnInteract);
    return () => viewport.removeEventListener('pointerdown', pauseOnInteract);
  }, [stackRef, stopAutoplay]);

  return (
    <SectionWrap
      id="work"
      className="!pt-8 !pb-14 md:!pt-10 md:!pb-[72px]"
    >
      <div ref={sectionRef}>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="mb-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            Recent Projects ({projects.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onViewCaseStudy={onViewCaseStudy}
              onCtaHoverStart={() => onProjectHover(project.caseStudyRoute)}
              onCtaHoverEnd={() => onProjectHover(null)}
            />
          ))}
        </div>
        <div className="hidden md:block">
          <div
            ref={stackRef}
            className="work-section-stack work-section-stack--projects touch-pan-x"
            role="region"
            aria-label="Recent projects, horizontal scroll"
            {...dragScrollProps}
          >
            <div className="work-section-stack__track">
              {projects.map((project) => (
                <div key={project.title} className="work-section-stack__slide">
                  <ProjectCard
                    project={project}
                    onViewCaseStudy={onViewCaseStudy}
                    onCtaHoverStart={() => onProjectHover(project.caseStudyRoute)}
                    onCtaHoverEnd={() => onProjectHover(null)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-8 flex items-center justify-center gap-2.5"
            role="group"
            aria-label="Project carousel controls"
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canScrollPrev}
              aria-label="Previous project"
              className={stackNavButtonClass}
            >
              <StackScrollArrow direction="left" />
            </button>

            <div className="flex h-11 items-center gap-3.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <button
                type="button"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
                className="inline-flex h-7 w-7 items-center justify-center text-[var(--ink)] transition-opacity hover:opacity-70"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div className="flex items-center gap-2">
                {projects.map((project, index) => {
                  const fill =
                    index < activeIndex
                      ? 1
                      : index === activeIndex
                        ? isPlaying
                          ? progress
                          : 1
                        : 0;

                  return (
                    <button
                      key={project.title}
                      type="button"
                      onClick={() => {
                        stopAutoplay();
                        scrollToIndex(index);
                      }}
                      aria-label={`Go to ${project.title}`}
                      aria-current={index === activeIndex ? 'true' : undefined}
                      className="relative h-1.5 w-10 overflow-hidden rounded-full bg-[var(--border)]"
                    >
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-[var(--ink)]"
                        style={{
                          width: `${fill * 100}%`,
                          transition: index === activeIndex && isPlaying ? 'none' : 'width 200ms ease',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canScrollNext}
              aria-label="Next project"
              className={stackNavButtonClass}
            >
              <StackScrollArrow direction="right" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}
