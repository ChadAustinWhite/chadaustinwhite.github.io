import { SiteNav } from './SiteNav';
import { HeroSection } from './HeroSection';
import { WorkSection } from './WorkSection';
import { Footer } from './Footer';
import type { CaseStudyRoute } from '../data/portfolioData';

interface HomeLayoutProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function HomeLayout({ onViewCaseStudy }: HomeLayoutProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteNav isHome />
      <main
        id="main-content"
        className="home-main-canvas min-h-screen antialiased"
        style={{
          background: 'var(--home-canvas, var(--bg))',
          color: 'var(--ink)',
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          lineHeight: 1.5,
        }}
      >
        <HeroSection />
        <WorkSection onViewCaseStudy={onViewCaseStudy} />
        <Footer />
      </main>
    </>
  );
}
