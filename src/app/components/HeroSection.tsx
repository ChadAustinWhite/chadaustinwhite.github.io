import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const HOME_OVERVIEW = [
  {
    label: 'Expertise',
    values: [
      'Product strategy',
      'Accessibility',
      'Collaboration',
      'Systems thinking',
    ],
  },
  {
    label: 'Industries',
    values: [
      'Travel',
      'Payments',
      'Automotive',
      'Finance',
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
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function CascadingWords({
  text,
  delay = 0,
  reduce,
  show,
  className,
}: {
  text: string;
  delay?: number;
  reduce: boolean;
  show: boolean;
  className?: string;
}) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-pre"
          initial={reduce ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={
            show
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 12, filter: 'blur(4px)' }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 0.7,
                  delay: delay + index * 0.06,
                  ease: easeOut,
                }
          }
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : null}
        </motion.span>
      ))}
    </span>
  );
}

function OverviewItem({
  children,
  delay,
  reduce,
  show,
  className,
}: {
  children: ReactNode;
  delay: number;
  reduce: boolean;
  show: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.6, delay, ease: easeOut }
      }
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const reduce = Boolean(prefersReducedMotion);
  const show = hasEntered || reduce;

  return (
    <section id="about" className="pt-[108px] pb-14 md:pt-36 md:pb-[72px]">
      <div className="max-w-[900px] px-5 md:px-10">
        <h1 className="serif-headline max-w-full font-normal text-[clamp(28px,7.2vw,64px)] leading-[1.12] text-[var(--ink)] [overflow-wrap:anywhere]">
          <CascadingWords
            className="block"
            text="I'm Chad 👋"
            delay={0.06}
            reduce={reduce}
            show={show}
          />
          <CascadingWords
            className="block"
            text="Product designer crafting intuitive experiences that solve user problems and drive business growth."
            delay={0.38}
            reduce={reduce}
            show={show}
          />
        </h1>

        <dl
          className="case-study-instrument__overview-categories mt-10 flex flex-col gap-y-8 md:mt-14 md:flex-row md:justify-between md:gap-x-10"
          aria-label="Profile overview"
        >
          {HOME_OVERVIEW.map((category, index) => {
            const hideOnMobile =
              category.label.toLowerCase() === 'location' ||
              category.label.toLowerCase() === 'industries';
            return (
              <OverviewItem
                key={category.label}
                className={`min-w-0 md:shrink-0${hideOnMobile ? ' max-md:hidden' : ''}`}
                delay={1.2 + index * 0.1}
                reduce={reduce}
                show={show}
              >
                <dt className="case-study-instrument__overview-label">{category.label}</dt>
                <dd className="case-study-instrument__overview-values">
                  {category.values.map((value) => (
                    <span key={value} className="case-study-instrument__overview-value">
                      {value}
                    </span>
                  ))}
                </dd>
              </OverviewItem>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
