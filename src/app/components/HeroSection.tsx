import React from "react";

export function HeroSection() {
  return (
    <section id="about" className="pt-[108px] pb-14 md:pt-36 md:pb-[72px]">
      <div className="max-w-[900px] px-5 md:px-10">
        <h1
          className="mb-7 text-[clamp(34px,5vw,64px)] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
          style={{ marginBottom: "28px" }}
        >
          I'm Chad 👋
          <br />
          A product designer crafting human-centered experiences.
        </h1>
        <p className="max-w-[560px] text-[15px] leading-[1.65] text-white md:text-[17px]">
          I'm mission-driven and passionate about delivering accessible, intuitive solutions that
          address real-world problems for users and businesses.
        </p>
      </div>
    </section>
  );
}
