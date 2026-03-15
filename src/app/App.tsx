import React, { useState } from 'react';
import { HomeLayout } from './components/HomeLayout';
import { CaseStudy } from './components/CaseStudy';
import { CaseStudyCreativeSpace } from './components/CaseStudyCreativeSpace';
import { CaseStudyLuxuryGoods } from './components/CaseStudyLuxuryGoods';
import { CaseStudyFashionForward } from './components/CaseStudyFashionForward';
import { CaseStudyTechInnovation } from './components/CaseStudyTechInnovation';
import type { CaseStudyRoute } from './data/portfolioData';

type PageType =
  | 'home'
  | CaseStudyRoute;

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleViewCaseStudy = (route: CaseStudyRoute) => {
    setCurrentPage(route);
    window.scrollTo(0, 0);
  };

  const handleBackFromCaseStudy = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (_page: 'home' | 'services' | 'about') => {
    setCurrentPage('home');
  };

  const handleNavigateToProject = (projectTitle: string) => {
    const routeMap: Record<string, CaseStudyRoute> = {
      'Expedia Group Accelerator': 'case-study-modern-architecture',
      'Expedia Group Ad Portal': 'case-study-luxury-goods',
      'Worldpay Merchant Onboarding': 'case-study-creative-space',
      'Worldpay SSO Management': 'case-study-tech-innovation',
    };
    const route = routeMap[projectTitle];
    if (route) handleViewCaseStudy(route);
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'home' ? (
        <HomeLayout onViewCaseStudy={handleViewCaseStudy} />
      ) : currentPage === 'case-study-modern-architecture' ? (
        <div className="bg-black text-white min-h-screen">
          <CaseStudy
            onBack={handleBackFromCaseStudy}
            onNavigate={handleNavigate}
            onNavigateToProject={handleNavigateToProject}
          />
        </div>
      ) : currentPage === 'case-study-creative-space' ? (
        <div className="bg-black text-white min-h-screen">
          <CaseStudyCreativeSpace
            onBack={handleBackFromCaseStudy}
            onNavigateToProject={handleNavigateToProject}
          />
        </div>
      ) : currentPage === 'case-study-luxury-goods' ? (
        <div className="bg-black text-white min-h-screen">
          <CaseStudyLuxuryGoods
            onBack={handleBackFromCaseStudy}
            onNavigateToProject={handleNavigateToProject}
          />
        </div>
      ) : currentPage === 'case-study-fashion-forward' ? (
        <div className="bg-black text-white min-h-screen">
          <CaseStudyFashionForward
            onBack={handleBackFromCaseStudy}
            onNavigateToProject={handleNavigateToProject}
          />
        </div>
      ) : currentPage === 'case-study-tech-innovation' ? (
        <div className="bg-black text-white min-h-screen">
          <CaseStudyTechInnovation
            onBack={handleBackFromCaseStudy}
            onNavigateToProject={handleNavigateToProject}
          />
        </div>
      ) : null}
    </div>
  );
}