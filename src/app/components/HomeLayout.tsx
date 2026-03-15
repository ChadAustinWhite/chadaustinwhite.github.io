import { SiteNav } from './SiteNav';
import { HeroSection } from './HeroSection';
import { WorkSection } from './WorkSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { Footer } from './Footer';
import { useSectionBackground } from '../hooks/useSectionBackground';
import type { CaseStudyRoute } from '../data/portfolioData';
import React from 'react';

interface HomeLayoutProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function HomeLayout({ onViewCaseStudy }: HomeLayoutProps) {
  useSectionBackground();

  return (
    <>
      <SiteNav />
      <main
        className="min-h-screen transition-colors duration-700 ease-out antialiased"
        style={{
          background: 'var(--bg)',
          color: 'var(--ink)',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '15px',
          lineHeight: 1.5,
        }}
      >
        <HeroSection />
        <WorkSection onViewCaseStudy={onViewCaseStudy} />
        <ExperienceSection />
        <EducationSection />
        <Footer />
      </main>
    </>
  );
}
