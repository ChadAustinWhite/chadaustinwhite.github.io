import React from "react";

const HOME_OVERVIEW = [
  {
    label: 'Expertise',
    values: [
      'Product strategy',
      '0→1 product design',
      'Accessibility',
      'Collaboration',
      'Systems thinking',
    ],
  },
  {
    label: 'Organization',
    values: ['Expedia Group'],
  },
  {
    label: 'Location',
    values: ['Los Angeles, Ca.'],
  },
  {
    label: 'Focus',
    values: [
      'Enterprise products',
      'Complex workflows',
      'AI-powered tooling',
    ],
  },
] as const;

export function HeroSection() {
  return (
    <section id="about" className="pt-[108px] pb-14 md:pt-36 md:pb-[72px]">
      <div className="max-w-[900px] px-5 md:px-10">
        <h1 className="serif-headline max-w-full font-normal text-[clamp(28px,7.2vw,64px)] leading-[1.12] text-[var(--ink)] [overflow-wrap:anywhere]">
          <span className="block">I'm Chad 👋</span>
          <span className="block">
            Product designer crafting intuitive experiences that solve user
            problems and drive business growth.
          </span>
        </h1>

        <dl
          className="case-study-instrument__overview-categories mt-10 grid grid-cols-1 gap-y-8 md:mt-14 md:grid-cols-4 md:gap-x-10 md:gap-y-8"
          aria-label="Profile overview"
        >
          {HOME_OVERVIEW.map((category) => {
            const hideOnMobile =
              category.label.toLowerCase() === 'location' ||
              category.label.toLowerCase() === 'focus';
            return (
            <div
              key={category.label}
              className={`min-w-0${hideOnMobile ? ' max-md:hidden' : ''}`}
            >
              <dt className="case-study-instrument__overview-label">{category.label}</dt>
              <dd className="case-study-instrument__overview-values">
                {category.values.map((value) => (
                  <span key={value} className="case-study-instrument__overview-value">
                    {value}
                  </span>
                ))}
              </dd>
            </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
