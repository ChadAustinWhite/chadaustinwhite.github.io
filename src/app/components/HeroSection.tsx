import React from "react";

export function HeroSection() {
  return (
    <section id="about" className="pt-[108px] pb-14 md:pt-36 md:pb-[72px]">
      <div className="max-w-[900px] px-5 md:px-10">
        <h1 className="serif-headline max-w-full font-normal text-[clamp(28px,7.2vw,64px)] leading-[1.12] text-[var(--ink)] [overflow-wrap:anywhere]">
          <span className="block">I'm Chad 👋</span>
          <span className="block">
            A product designer crafting{' '}
            <span className="md:whitespace-nowrap">human-centered experiences.</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
