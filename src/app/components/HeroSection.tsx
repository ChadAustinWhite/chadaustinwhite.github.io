import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const HOME_OVERVIEW = [
  {
    label: 'Expertise',
    values: [
      '0→1 & optimization',
      'AI prototyping',
      'Accessibility',
    ],
  },
  {
    label: 'Impact',
    values: [
      '$300M gross revenue',
      '+30% search visibility',
      '72.4K active users',
    ],
  },
  {
    label: 'Currently',
    values: [
      'Product Designer',
      'Expedia Group',
      'Los Angeles, CA',
    ],
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
      <div className="w-full max-w-[72rem] px-5 md:px-10">
        <h1 className="serif-headline max-w-none text-left font-normal text-[clamp(28px,7.2vw,64px)] leading-[1.12] text-[var(--ink)] [overflow-wrap:normal] [text-wrap:pretty]">
          <CascadingWords
            className="block"
            text="I'm Chad 👋"
            delay={0.06}
            reduce={reduce}
            show={show}
          />
          <CascadingWords
            className="block"
            text="I turn complex problems into experiences people understand,"
            delay={0.38}
            reduce={reduce}
            show={show}
          />
          <CascadingWords
            className="block"
            text="trust, and remember."
            delay={0.72}
            reduce={reduce}
            show={show}
          />
        </h1>

        <dl
          className="case-study-instrument__overview-categories mt-10 flex flex-col gap-y-8 md:mt-14 md:grid md:grid-cols-4 md:gap-x-10"
          aria-label="Profile overview"
        >
          {HOME_OVERVIEW.map((category, index) => {
            // Expertise | Impact | Currently | (trailing gap)
            const columnIndex = category.label === 'Currently' ? 2 : index;
            return (
              <OverviewItem
                key={category.label}
                className={`min-w-0${
                  category.label === 'Currently'
                    ? ' pl-3 md:col-start-3 md:pl-4'
                    : ''
                }`}
                delay={1.2 + columnIndex * 0.1}
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
