import { useState } from 'react';
import type { CaseStudySonosSubpoint } from './types';

interface CaseStudySonosSubpointAccordionProps {
  items: CaseStudySonosSubpoint[];
}

function AccordionToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--ink-muted)] transition-colors duration-300 ease-out group-hover:text-[var(--ink)]"
      aria-hidden
    >
      <svg
        className="size-[18px]"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        aria-hidden
      >
        <path
          d="M8 4v8"
          className={`transition-opacity duration-300 ease-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
        />
        <path d="M4 8h8" />
      </svg>
    </span>
  );
}

export function CaseStudySonosSubpointAccordion({ items }: CaseStudySonosSubpointAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items.length) return null;

  return (
    <div className="sonos-subpoint-accordion mt-8 flex flex-col gap-2 md:mt-10 md:gap-2.5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={item.title}
            className={`group overflow-hidden bg-[var(--card-bg)] transition-[border-radius,background-color] duration-300 ease-out hover:bg-[color-mix(in_srgb,var(--card-bg)_88%,var(--ink)_12%)] ${
              isOpen ? 'rounded-3xl' : 'rounded-full'
            }`}
          >
            <button
              type="button"
              className="sonos-subpoint-accordion__trigger flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-7 md:py-[1.125rem]"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="serif-headline min-w-0 text-[17px] leading-snug tracking-[-0.02em] md:text-[19px]">
                <span className="font-medium text-[var(--ink)]">{item.title}</span>
                {item.label ? (
                  <>
                    <span className="font-normal text-[var(--ink-muted)]"> / </span>
                    <span className="font-normal text-[var(--ink-muted)]">{item.label}</span>
                  </>
                ) : null}
              </span>
              <AccordionToggleIcon isOpen={isOpen} />
            </button>

            <div
              className="sonos-subpoint-accordion__panel grid transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="min-h-0 overflow-hidden">
                <p
                  className={`cs-text-body max-w-[52ch] px-5 pb-5 text-[var(--ink-muted)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none md:px-7 md:pb-6 ${
                    isOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                  }`}
                >
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
