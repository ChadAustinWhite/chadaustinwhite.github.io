import { useEffect, useRef, useState } from 'react';
import type { CaseStudySonosSubpoint } from './types';

interface CaseStudySonosSubpointAccordionProps {
  items: CaseStudySonosSubpoint[];
  className?: string;
}

function AccordionToggleIcon() {
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
        <path d="M8 4v8" className="sonos-subpoint-accordion__icon-vertical" />
        <path d="M4 8h8" />
      </svg>
    </span>
  );
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: CaseStudySonosSubpoint;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Panel height is animated in pixels; `grid-template-rows: 0fr → 1fr` and
  // `height: auto` interpolate inconsistently across browsers and read as a snap.
  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const measure = () => setContentHeight(node.getBoundingClientRect().height);
    measure();

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`sonos-subpoint-accordion__item group overflow-hidden bg-[var(--card-bg)] hover:bg-[color-mix(in_srgb,var(--card-bg)_88%,var(--ink)_12%)] ${
        isOpen ? 'is-open rounded-3xl' : 'rounded-full'
      }`}
    >
      <button
        type="button"
        className="sonos-subpoint-accordion__trigger flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-7 md:py-[1.125rem]"
        aria-expanded={isOpen}
        onClick={onToggle}
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
        <AccordionToggleIcon />
      </button>

      <div
        className="sonos-subpoint-accordion__panel"
        style={{ height: isOpen ? `${contentHeight}px` : '0px' }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="sonos-subpoint-accordion__panel-inner">
          <p className="sonos-subpoint-accordion__panel-body cs-text-body max-w-[52ch] whitespace-pre-line px-5 pb-5 text-[var(--ink-muted)] md:px-7 md:pb-6">
            {item.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CaseStudySonosSubpointAccordion({
  items,
  className = '',
}: CaseStudySonosSubpointAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items.length) return null;

  return (
    <div
      className={`sonos-subpoint-accordion flex flex-col gap-2 md:gap-2.5 ${className || 'mt-8 md:mt-10'}`.trim()}
    >
      {items.map((item, i) => (
        <AccordionRow
          key={item.title}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
