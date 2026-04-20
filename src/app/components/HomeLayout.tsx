import { SiteNav } from './SiteNav';
import { HeroSection } from './HeroSection';
import { WorkSection } from './WorkSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { Footer } from './Footer';
import { useHomeScrollBackground } from '../hooks/useHomeScrollBackground';
import type { CaseStudyRoute } from '../data/portfolioData';
import React from 'react';

interface HomeLayoutProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
  onRequestAccess: (route: CaseStudyRoute) => void;
}

export function HomeLayout({ onViewCaseStudy, onRequestAccess }: HomeLayoutProps) {
  useHomeScrollBackground();

  return (
    <>
      <SiteNav />
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
        />
        <ExperienceSection />
        <EducationSection />
        <Footer />
      </main>
    </>
  );
}
