import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useInView } from 'motion/react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  onViewCaseStudy: (route: ProjectItem['caseStudyRoute']) => void;
  onCtaHoverStart?: () => void;
  onCtaHoverEnd?: () => void;
}

const projectCtaClass =
  'project-cta inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--bg)] px-6 py-4 text-[16px] font-normal text-[var(--ink)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--ink)_6%,var(--bg))] whitespace-nowrap md:w-auto md:justify-start md:gap-2.5 md:px-6 md:py-3 md:text-[15px]';

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      className="h-3.5 w-3.5 flex-shrink-0"
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Silent looping recording sized exactly like a card screenshot. */
function ProjectCardVideo({
  src,
  poster,
  label,
  aspectRatio,
  startSeconds = 0,
  fill = false,
}: {
  src: string;
  poster?: string;
  label?: string;
  aspectRatio?: string;
  startSeconds?: number;
  /** When true, video fills its parent (used inside a device frame). */
  fill?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(videoRef, { amount: 0.4 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || startSeconds <= 0) return;

    const clampToStart = () => {
      if (el.currentTime < startSeconds) {
        el.currentTime = startSeconds;
      }
    };

    el.addEventListener('loadedmetadata', clampToStart);
    el.addEventListener('timeupdate', clampToStart);
    clampToStart();

    return () => {
      el.removeEventListener('loadedmetadata', clampToStart);
      el.removeEventListener('timeupdate', clampToStart);
    };
  }, [src, startSeconds]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reducedMotion) return;

    if (inView) {
      if (startSeconds > 0 && el.currentTime < startSeconds) {
        el.currentTime = startSeconds;
      }
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, reducedMotion, startSeconds]);

  if (fill) {
    return (
      <video
        ref={videoRef}
        className="h-full w-full bg-transparent object-cover [transform:translateZ(0)]"
        poster={poster}
        preload="metadata"
        muted
        loop
        playsInline
        controls={reducedMotion}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center">
      <video
        ref={videoRef}
        className="m-auto max-h-full w-full overflow-hidden rounded-2xl bg-transparent object-cover"
        style={{ aspectRatio, maxWidth: aspectRatio ? undefined : '100%' }}
        poster={poster}
        preload="metadata"
        muted
        loop
        playsInline
        controls={reducedMotion}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export function ProjectCard({
  project,
  onViewCaseStudy,
  onCtaHoverStart,
  onCtaHoverEnd,
}: ProjectCardProps) {
  const hasVideo = Boolean(project.video);
  const hasMockup = hasVideo || Boolean(project.image);
  const fit = project.imageObjectFit ?? 'cover';
  const objectPosition = project.imageObjectPosition ?? 'top';
  const mediaBg =
    project.imageMediaMatteTone === 'charcoal' ? 'bg-[#2d2d2d]' : 'bg-transparent';
  const intrinsicW = project.imageIntrinsicWidthPx;
  const intrinsicH = project.imageIntrinsicHeightPx;
  const cappedContain = hasMockup && !hasVideo && fit === 'contain' && intrinsicW != null;
  const canOpen = !project.comingSoon;
  const isDevicePresentation = project.cardPresentation === 'device';
  const isImagePresentation = project.cardPresentation === 'image';

  const openCaseStudy = () => {
    if (!canOpen) return;
    onViewCaseStudy(project.caseStudyRoute);
  };

  const imgSizingClass = cappedContain
    ? 'h-auto w-auto max-h-full bg-transparent object-contain [image-rendering:auto]'
    : `h-full w-full bg-transparent [transform:translateZ(0)] [image-rendering:auto] ${
        fit === 'contain' ? 'object-contain' : 'object-cover'
      }`;

  const mediaOpenProps = canOpen
    ? {
        role: 'link' as const,
        tabIndex: 0,
        'aria-label': `View case study: ${project.title}`,
        onClick: openCaseStudy,
        onKeyDown: (event: KeyboardEvent) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openCaseStudy();
          }
        },
        onMouseEnter: onCtaHoverStart,
        onMouseLeave: onCtaHoverEnd,
      }
    : {
        'aria-label': project.title,
        onMouseEnter: onCtaHoverStart,
        onMouseLeave: onCtaHoverEnd,
      };

  if (isImagePresentation && project.image) {
    return (
      <article className="project-card project-card--image w-full">
        <div
          className={`project-card--image__media${canOpen ? ' project-card--image__media--openable' : ''}`}
          {...mediaOpenProps}
        >
          <img
            src={project.image}
            alt={project.imageAlt ?? ''}
            loading="lazy"
            decoding="async"
            draggable={false}
            sizes="(min-width: 768px) min(900px, 50vw), min(920px, 100vw)"
          />
        </div>
      </article>
    );
  }

  if (isDevicePresentation && hasMockup) {
    // Screenshots already include browser chrome; stills use a thin outline only.
    const showChromeBar = hasVideo && !project.image;
    const screenAspect =
      project.videoAspectRatio ??
      (project.imageIntrinsicWidthPx && project.imageIntrinsicHeightPx
        ? `${project.imageIntrinsicWidthPx} / ${project.imageIntrinsicHeightPx}`
        : '16 / 10');
    const stillFit = fit === 'contain' ? 'object-contain' : 'object-cover';

    return (
      <article className="project-card project-card--device w-full">
        <div
          className={`project-device${showChromeBar ? '' : ' project-device--still'}${
            canOpen ? ' project-device--openable' : ''
          }`}
          {...mediaOpenProps}
        >
          {showChromeBar ? (
            <div className="project-device__chrome" aria-hidden>
              <span className="project-device__dot" />
              <span className="project-device__dot" />
              <span className="project-device__dot" />
            </div>
          ) : null}
          <div className="project-device__screen" style={{ aspectRatio: screenAspect }}>
            {hasVideo ? (
              <ProjectCardVideo
                src={project.video!}
                poster={project.videoPoster}
                label={project.imageAlt}
                startSeconds={project.videoStartSeconds}
                fill
              />
            ) : (
              <img
                src={project.image}
                alt={project.imageAlt ?? ''}
                loading="lazy"
                decoding="async"
                draggable={false}
                sizes="(min-width: 768px) min(900px, 50vw), min(920px, 100vw)"
                className={`h-full w-full bg-transparent ${stillFit} object-center [transform:translateZ(0)]`}
              />
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="project-card h-full overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--card-bg)] md:rounded-[2rem]">
      <div className="flex h-full flex-col gap-6 p-6 md:gap-8 md:p-10 md:pb-9">
        <header className="flex flex-col items-start gap-4 md:gap-5">
          <span className="inline-flex rounded-full bg-[var(--bg)] px-5 py-3.5 text-xs font-medium leading-none tracking-[-0.01em] text-[var(--ink)] tabular-nums md:px-5 md:py-2 md:text-[13px]">
            {project.period}
          </span>
          <h3 className="serif-headline max-w-full font-normal text-[1.85rem] leading-[1.12] tracking-[-0.02em] text-[var(--ink)] [overflow-wrap:anywhere] md:text-[2.4rem]">
            {project.title}
          </h3>
        </header>

        <div
          className={`project-card__media overflow-hidden rounded-2xl ${mediaBg}${
            canOpen && hasMockup ? ' project-card__media--openable cursor-pointer' : ''
          }`}
          {...(canOpen && hasMockup
            ? {
                role: 'link',
                tabIndex: 0,
                'aria-label': `View case study: ${project.title}`,
                onClick: openCaseStudy,
                onKeyDown: (event: KeyboardEvent) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openCaseStudy();
                  }
                },
                onMouseEnter: onCtaHoverStart,
                onMouseLeave: onCtaHoverEnd,
              }
            : {})}
        >
          {!hasMockup ? (
            <div className="h-full min-h-0 w-full" aria-hidden />
          ) : hasVideo ? (
            <ProjectCardVideo
              src={project.video!}
              poster={project.videoPoster}
              label={project.imageAlt}
              aspectRatio={project.videoAspectRatio}
              startSeconds={project.videoStartSeconds}
            />
          ) : cappedContain ? (
            <div className="flex h-full min-h-0 w-full items-center justify-center p-3 md:p-5">
              <img
                src={project.image}
                alt={project.imageAlt ?? ''}
                width={intrinsicW}
                height={intrinsicH ?? undefined}
                loading="lazy"
                decoding="async"
                draggable={false}
                sizes="(min-width: 768px) min(900px, 50vw), min(920px, 100vw)"
                style={{
                  maxWidth: `min(100%, ${intrinsicW}px)`,
                  maxHeight: '100%',
                  objectPosition,
                }}
                className={imgSizingClass}
              />
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.imageAlt ?? ''}
              loading="lazy"
              decoding="async"
              draggable={false}
              sizes="(min-width: 768px) min(900px, 50vw), min(920px, 100vw)"
              style={{ objectPosition }}
              className={imgSizingClass}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-7 md:gap-8">
          <p className="max-w-[40rem] text-[0.95rem] leading-relaxed text-[var(--ink)] md:text-[1.05rem] md:leading-[1.55]">
            {project.description}
          </p>

          {project.metrics?.length ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="min-w-0">
                  <p className="serif-headline text-[1.85rem] font-normal leading-none tracking-[-0.03em] text-[var(--ink)] tabular-nums md:text-[2.35rem]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-[var(--ink-muted)] md:text-[0.95rem]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex w-full justify-stretch md:justify-start">
            {project.comingSoon ? (
              <button
                type="button"
                disabled
                className={`${projectCtaClass} cursor-default opacity-100 hover:bg-[var(--bg)] disabled:opacity-100`}
              >
                Coming soon
              </button>
            ) : (
              <button
                type="button"
                onClick={openCaseStudy}
                onMouseEnter={onCtaHoverStart}
                onMouseLeave={onCtaHoverEnd}
                className={projectCtaClass}
              >
                View case study
                <ArrowIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
