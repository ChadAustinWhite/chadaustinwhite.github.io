import { useState } from 'react';
import { SiteNav } from './SiteNav';
import { HeroSection } from './HeroSection';
import { WorkSection } from './WorkSection';
import { Footer } from './Footer';
import { useHomeScrollBackground } from '../hooks/useHomeScrollBackground';
import type { CaseStudyRoute } from '../data/portfolioData';

interface HomeLayoutProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function HomeLayout({ onViewCaseStudy }: HomeLayoutProps) {
  const [hoveredProjectRoute, setHoveredProjectRoute] = useState<CaseStudyRoute | null>(null);

  useHomeScrollBackground(hoveredProjectRoute !== null);

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
        <WorkSection
          onViewCaseStudy={onViewCaseStudy}
          onProjectHover={setHoveredProjectRoute}
        />
        <Footer />
      </main>
    </>
  );
}
