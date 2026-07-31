import React from "react";

const HOME_OVERVIEW = [
  {
    label: 'Expertise',
    values: [
      'Product strategy',
      'Product design',
      'Design systems',
      'Workshop facilitation',
      'Prototyping',
      'Accessibility',
    ],
  },
  {
    label: 'Currently',
    values: ['Principal UX Designer'],
  },
  {
    label: 'Location',
    values: ['Southern California'],
  },
  {
    label: 'Domain',
    values: ['Travel & payments'],
  },
] as const;

export function HeroSection() {
  return (
    <section id="about" className="pt-[108px] pb-14 md:pt-36 md:pb-[72px]">
      <div className="max-w-[900px] px-5 md:px-10">
        <h1 className="serif-headline max-w-full font-normal text-[clamp(28px,7.2vw,64px)] leading-[1.12] text-[var(--ink)] [overflow-wrap:anywhere]">
          <span className="block">I'm Chad 👋</span>
          <span className="block">
            Product designer crafting intuitive experiences that solve customer
            problems and drive business growth.
          </span>
        </h1>

        <dl
          className="case-study-instrument__overview-categories mt-10 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-14 md:grid-cols-4 md:gap-x-10"
          aria-label="Profile overview"
        >
          {HOME_OVERVIEW.map((category) => (
            <div key={category.label} className="min-w-0">
              <dt className="case-study-instrument__overview-label">{category.label}</dt>
              <dd className="case-study-instrument__overview-values">
                {category.values.map((value) => (
                  <span key={value} className="case-study-instrument__overview-value">
                    {value}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
