import type { ReactNode } from 'react';
import { SiteNav } from '../SiteNav';
import { Footer } from '../Footer';

interface CaseStudyLayoutProps {
  children: ReactNode;
  onNavigateHome: () => void;
}

export function CaseStudyLayout({ children, onNavigateHome }: CaseStudyLayoutProps) {
  return (
    <div
      data-case-study
      className="min-h-screen antialiased"
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
      }}
    >
      <SiteNav onNavigateHome={onNavigateHome} />
      <main>{children}</main>
      <Footer onNavigateHome={onNavigateHome} />
    </div>
  );
}
