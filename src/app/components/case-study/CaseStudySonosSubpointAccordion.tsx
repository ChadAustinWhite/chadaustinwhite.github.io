import { useState } from 'react';
import type { CaseStudySonosSubpoint } from './types';

interface CaseStudySonosSubpointAccordionProps {
  items: CaseStudySonosSubpoint[];
}

export function CaseStudySonosSubpointAccordion({ items }: CaseStudySonosSubpointAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <div className="sonos-subpoint-accordion mt-8 md:mt-10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={item.title}
            className="border-t border-[var(--border)] last:border-b last:border-[var(--border)]"
          >
            <button
              type="button"
              className="sonos-subpoint-accordion__trigger group flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="text-[15px] font-normal text-[var(--ink)] md:text-[17px]">
                {item.title}
              </span>
              <span
                className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--border)] text-[var(--ink-muted)] transition-[border-color,color] duration-300 ease-out group-hover:border-[var(--ink-muted)] group-hover:text-[var(--ink)]"
                aria-hidden
              >
                <span
                  className={`absolute inset-0 grid place-items-center text-[17px] font-light leading-none transition-[opacity,transform] duration-300 ease-out ${
                    isOpen ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
                  }`}
                >
                  +
                </span>
                <span
                  className={`absolute inset-0 grid place-items-center text-[17px] font-light leading-none transition-[opacity,transform] duration-300 ease-out ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}
                >
                  −
                </span>
              </span>
            </button>

            <div
              className="sonos-subpoint-accordion__panel grid transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="min-h-0 overflow-hidden">
                <p
                  className={`cs-text-body max-w-[52ch] pb-5 text-[var(--ink-muted)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none md:pb-6 ${
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
