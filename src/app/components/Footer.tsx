import React from 'react';
import { LINKEDIN_URL, EMAIL, CV_URL } from '../data/contact';
import { ScrollToTopAffordance } from './ScrollToTopAffordance';

function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href');
  if (href?.startsWith('#')) {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

interface FooterProps {
  /** When set, "All work" / Work link navigates back to home instead of using hash. */
  onNavigateHome?: () => void;
}

export function Footer({ onNavigateHome }: FooterProps = {}) {
  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    } else {
      handleSmoothScroll(e);
    }
  };

  return (
    <footer className="site-footer px-[var(--cs-page-gutter)]">
      <div className="scroll-to-top-band">
        <ScrollToTopAffordance />
      </div>
      <div className="site-footer__bar flex flex-col items-start gap-4 border-t border-[var(--border)] py-7 md:flex-row md:items-center md:justify-between md:py-9">
        <span className="text-[13px] text-[var(--ink-muted)]">© 2026 Chad Austin White</span>
        <div className="flex gap-6">
          <a
            href="#work"
            onClick={handleWorkClick}
            className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]"
          >
            All work
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]"
          >
            LinkedIn
          </a>
          <a
            href={EMAIL}
            className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]"
          >
            Email
          </a>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]"
          >
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
