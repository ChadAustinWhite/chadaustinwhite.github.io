import React, { useEffect, useRef, useState } from "react";

const PORTRAIT_SRCS = [
  "/chad-portrait-1.png",
  "/chad-portrait-2.png",
  "/chad-portrait-3.png",
  "/chad-portrait-4.png",
  "/chad-portrait-5.png",
];

const CYCLE_INTERVAL_MS = 400;

/** One full pass of the ticker; duplicated in the DOM for a seamless loop. */
const HERO_PROCESS_LABELS = [
  "Discovery",
  "Research",
  "Problem framing",
  "Synthesis",
  "Ideation",
  "Sketching",
  "Wireframing",
  "Prototyping",
  "Usability testing",
  "Iteration",
  "Design systems",
  "Accessibility",
  "Journey mapping",
  "Handoff",
] as const;

function HeroProcessMarqueeSegment({ segmentId }: { segmentId: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-x-5 px-5 md:gap-x-7 md:px-7">
      {HERO_PROCESS_LABELS.map((label, i) => (
        <React.Fragment key={`${segmentId}-${label}-${i}`}>
          {i > 0 ? (
            <span className="select-none text-[var(--ink-muted)] opacity-40" aria-hidden>
              ·
            </span>
          ) : null}
          <span className="whitespace-nowrap font-semibold uppercase tracking-[0.12em] text-[var(--ink-muted)]">
            {label}
          </span>
        </React.Fragment>
      ))}
      <span className="select-none text-[var(--ink-muted)] opacity-40" aria-hidden>
        ·
      </span>
    </span>
  );
}

export function HeroSection() {
  const [showPortrait, setShowPortrait] = useState(false);
  const [portraitIndex, setPortraitIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!showPortrait) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setPortraitIndex(0);
    intervalRef.current = setInterval(() => {
      setPortraitIndex((i) => (i + 1) % PORTRAIT_SRCS.length);
    }, CYCLE_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [showPortrait]);

  return (
    <section id="about" className="pt-[108px] pb-2 md:pt-36 md:pb-3">
      <div className="max-w-[900px] px-5 md:px-10">
        <h1
          className="mb-7 text-[clamp(34px,5vw,64px)] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
          style={{ marginBottom: "28px" }}
        >
          I'm{" "}
          <span
            className="relative inline-block cursor-default underline decoration-2 underline-offset-4 pb-[1px]"
            onMouseEnter={() => setShowPortrait(true)}
            onMouseLeave={() => setShowPortrait(false)}
            aria-describedby="chad-portrait-tooltip"
          >
            Chad
            {showPortrait && (
              <span
                id="chad-portrait-tooltip"
                role="img"
                aria-label="Portrait of Chad"
                className="absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-lg md:h-[140px] md:w-[140px]"
              >
                <img
                  src={PORTRAIT_SRCS[portraitIndex]}
                  alt=""
                  className="block h-full w-full rounded-2xl object-cover"
                />
              </span>
            )}
          </span>{" "}
          👋
          <br />
          A product designer crafting human-centered experiences.
        </h1>
        <p className="max-w-[560px] text-[15px] leading-[1.65] text-white md:text-[17px]">
          I'm mission-driven and passionate about delivering accessible, intuitive solutions that
          address real-world problems for users and businesses.
        </p>
      </div>

      <div
        className="hero-brand-marquee mt-6 w-full min-w-0 overflow-x-hidden md:mt-8"
        role="region"
        aria-label="Product design process"
      >
        <div className="hero-brands-marquee__track text-[11px] md:text-[12px]">
          <HeroProcessMarqueeSegment segmentId="a" />
          <span aria-hidden="true">
            <HeroProcessMarqueeSegment segmentId="b" />
          </span>
        </div>
      </div>
    </section>
  );
}
