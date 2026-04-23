import { Accessibility } from 'lucide-react';
import { SectionWrap } from './SectionWrap';
import { principlesContent } from '../data/portfolioData';
import { EMAIL } from '../data/contact';

/** Same fluid type scale as hero `<h1>`. */
const lineTextClass =
  'm-0 w-full max-w-none text-left text-[clamp(34px,5vw,64px)] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]';

const tallyClass =
  'hidden md:inline ml-[0.08em] align-super text-[0.28em] font-normal tracking-[-0.025em] text-[var(--ink)] no-underline';

/** Underline the whole phrase so it remains continuous across spaces. */
const wordUnderlineClass =
  'underline decoration-2 underline-offset-4 decoration-[var(--ink)]';

export function PrinciplesSection() {
  const { sectionLabel, lines, metaBar } = principlesContent;

  return (
    <SectionWrap id="technologies" className="!py-14 md:!py-[72px]">
      <div className="max-w-[min(100%,1100px)]">
        <h2
          className="mb-7 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]"
          style={{ marginBottom: '28px' }}
        >
          {sectionLabel} ({lines.length})
        </h2>
        <ul className="m-0 w-full max-w-none list-none p-0" aria-label="Tools and technologies">
          {lines.map((line, index) => {
            const tally = String(index + 1).padStart(2, '0');
            return (
              <li key={`${index}-${line}`} className="m-0 p-0">
                <p className={lineTextClass}>
                  <span className={wordUnderlineClass}>{line}</span>
                  <span aria-hidden="true" className={tallyClass}>
                    /{tally}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Full-bleed footer (same width pattern as Work marquee) */}
      <div className="relative -mx-5 mt-16 w-[calc(100%+2.5rem)] min-w-0 md:-mx-10 md:mt-24 md:w-[calc(100%+5rem)]">
        <div className="flex flex-wrap items-center justify-between gap-6 px-5 pt-5 md:px-10 md:pt-6">
          <a
            href={EMAIL}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink-muted)] transition-colors hover:border-[var(--ink-muted)] hover:text-[var(--ink)]"
            aria-label="Contact regarding accessibility"
          >
            <Accessibility className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </a>
          <div className="ml-auto flex items-center gap-8 text-sm font-semibold tracking-[0.12em] text-[var(--ink-muted)] md:gap-10 md:text-base">
            <span>{metaBar.left}</span>
            <span>{metaBar.center}</span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--ink)]" aria-hidden />
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}
