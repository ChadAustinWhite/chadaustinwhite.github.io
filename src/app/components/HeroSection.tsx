import React, { useState, useEffect, useRef } from "react";

const CHAD_PORTRAIT_SRCS = [
  "/chad-portrait.png",
  "/chad-portrait-2.png",
  "/chad-portrait-3.png",
];
const CYCLE_INTERVAL_MS = 900;

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
      setPortraitIndex((i) => (i + 1) % CHAD_PORTRAIT_SRCS.length);
    }, CYCLE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showPortrait]);

  return (
    <section
      id="about"
      className="max-w-[900px] px-5 pt-[108px] pb-14 md:px-[100px] md:pt-36 md:pb-[72px]"
    >
      <h1
        className="mb-7 text-[clamp(34px,5vw,64px)] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
        style={{ marginBottom: '28px' }}
      >
        I'm{" "}
        <span
          className="relative inline-block cursor-default underline decoration-2 underline-offset-2"
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
              className="absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg)] shadow-lg"
            >
              <img
                src={CHAD_PORTRAIT_SRCS[portraitIndex]}
                alt=""
                className="block h-auto w-[760px] object-cover md:w-[900px]"
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
