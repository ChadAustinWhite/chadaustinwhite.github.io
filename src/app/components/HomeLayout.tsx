import { useMemo, useState } from 'react';
import { SiteNav } from './SiteNav';
import { HeroSection } from './HeroSection';
import { WorkSection } from './WorkSection';
import { ExperienceSection } from './ExperienceSection';
import { Footer } from './Footer';
import { useHomeScrollBackground } from '../hooks/useHomeScrollBackground';
import { projects, type CaseStudyRoute } from '../data/portfolioData';
import React from 'react';

interface HomeLayoutProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
  onRequestAccess: (route: CaseStudyRoute) => void;
}

export function HomeLayout({ onViewCaseStudy, onRequestAccess }: HomeLayoutProps) {
  const [hoveredProjectRoute, setHoveredProjectRoute] = useState<CaseStudyRoute | null>(null);

  const hoverCanvasColor = useMemo(() => {
    if (!hoveredProjectRoute) return null;
    const project = projects.find((p) => p.caseStudyRoute === hoveredProjectRoute);
    if (!project) return null;
    return project.hoverCanvas.light;
  }, [hoveredProjectRoute]);

  useHomeScrollBackground(hoverCanvasColor);

  return (
    <>
      <SiteNav isHome />
      <main
        className="home-main-canvas min-h-screen antialiased"
        style={{
          background: 'var(--home-canvas, var(--bg))',
          color: 'var(--ink)',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '15px',
          lineHeight: 1.5,
        }}
      >
        <HeroSection />
        <WorkSection
          onViewCaseStudy={onViewCaseStudy}
          onRequestAccess={onRequestAccess}
          onProjectHover={setHoveredProjectRoute}
        />
        <ExperienceSection />
        <Footer />
      </main>
    </>
  );
}
