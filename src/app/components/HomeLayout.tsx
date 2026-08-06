import { useCallback, useState } from 'react';
import { SiteNav } from './SiteNav';
import { HeroSection } from './HeroSection';
import { WorkSection } from './WorkSection';
import { Footer } from './Footer';
import { HomeChrome } from './HomeChrome';
import { useHomeScrollBackground } from '../hooks/useHomeScrollBackground';
import type { CaseStudyRoute } from '../data/portfolioData';

interface HomeLayoutProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function HomeLayout({ onViewCaseStudy }: HomeLayoutProps) {
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  useHomeScrollBackground(hoverColor);

  const handleProjectHover = useCallback((color: string | null) => {
    setHoverColor(color);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <HomeChrome />
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
        <WorkSection onViewCaseStudy={onViewCaseStudy} onProjectHover={handleProjectHover} />
        <Footer />
      </main>
    </>
  );
}
