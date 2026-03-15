import React from 'react';
import { LINKEDIN_URL, EMAIL, CV_URL } from '../data/contact';

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

export function Footer() {
  return (
    <footer className="flex flex-col items-start gap-4 border-t border-[var(--border)] px-5 py-7 md:flex-row md:items-center md:justify-between md:px-10 md:py-9">
      <span className="text-[13px] text-[var(--ink-muted)]">© 2026 Chad Austin White</span>
      <div className="flex gap-6">
        <a href="#work" onClick={handleSmoothScroll} className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]">
          Work
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]">
          LinkedIn
        </a>
        <a href={EMAIL} className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]">
          Email
        </a>
        <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]">
          CV
        </a>
      </div>
    </footer>
  );
}
