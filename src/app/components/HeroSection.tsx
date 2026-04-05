import React, { useEffect, useRef, useState } from "react";

const PORTRAIT_SRCS = [
  "/chad-portrait-1.png",
  "/chad-portrait-2.png",
  "/chad-portrait-3.png",
  "/chad-portrait-4.png",
  "/chad-portrait-5.png",
];

const CYCLE_INTERVAL_MS = 400;

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
    <section
      id="about"
      className="max-w-[900px] px-5 pt-[108px] pb-14 md:px-10 md:pt-36 md:pb-[72px]"
    >
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
    </section>
  );
}
