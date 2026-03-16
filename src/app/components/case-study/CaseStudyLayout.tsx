import type { ReactNode } from 'react';
import { SiteNav } from '../SiteNav';
import { Footer } from '../Footer';
import { useCaseStudySectionBackground } from '../../hooks/useCaseStudySectionBackground';

interface CaseStudyLayoutProps {
  children: ReactNode;
  onNavigateHome: () => void;
}

export function CaseStudyLayout({ children, onNavigateHome }: CaseStudyLayoutProps) {
  useCaseStudySectionBackground();

  return (
    <div
      data-case-study
      className="min-h-screen transition-colors duration-700 ease-out antialiased"
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '15px',
        lineHeight: 1.65,
      }}
    >
      <SiteNav onNavigateHome={onNavigateHome} />
      <main>{children}</main>
      <Footer onNavigateHome={onNavigateHome} />
    </div>
  );
}
