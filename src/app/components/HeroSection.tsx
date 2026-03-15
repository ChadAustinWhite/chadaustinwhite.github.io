import React from "react";

export function HeroSection() {
  return (
    <section
      id="about"
      className="max-w-[900px] px-5 pt-[108px] pb-14 md:px-10 md:pt-36 md:pb-[72px]"
    >
      <h1
        className="mb-7 text-[clamp(34px,5vw,64px)] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
        style={{ marginBottom: '28px' }}
      >
        I'm Chad 👋
        <br />
        A product designer crafting
        <br />
        <p className="font-normal text-[var(--ink-muted)]">human-centered experiences.</p>
      </h1>
      <p className="max-w-[560px] text-[15px] leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
        I'm mission-driven and passionate about delivering accessible, intuitive solutions that
        address real-world problems.
      </p>
    </section>
  );
}
