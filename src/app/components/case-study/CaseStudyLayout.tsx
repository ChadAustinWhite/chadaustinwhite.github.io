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
      className="min-h-screen transition-colors duration-200 antialiased"
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '15px',
        lineHeight: 1.5,
      }}
    >
      <SiteNav onNavigateHome={onNavigateHome} />
      <main>{children}</main>
      <Footer onNavigateHome={onNavigateHome} />
    </div>
  );
}
