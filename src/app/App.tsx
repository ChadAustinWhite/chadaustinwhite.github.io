import React, { useState } from 'react';
import { HomeLayout } from './components/HomeLayout';
import { CaseStudyLayout } from './components/case-study/CaseStudyLayout';
import { CaseStudyPage } from './components/case-study/CaseStudyPage';
import { CaseStudyPlaceholder } from './components/case-study/CaseStudyPlaceholder';
import {
  expediaAcceleratorContent,
  expediaAdPortalContent,
  worldpayMerchantOnboardingContent,
} from './data/caseStudies';
import type { CaseStudyRoute } from './data/portfolioData';

type PageType = 'home' | CaseStudyRoute;

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

  return (
    <div className="min-h-screen">
      {currentPage === 'home' ? (
        <HomeLayout onViewCaseStudy={handleViewCaseStudy} />
      ) : currentPage === 'case-study-expedia-accelerator' ? (
        <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
          <CaseStudyPage
            content={expediaAcceleratorContent}
            onBack={handleBackFromCaseStudy}
          />
        </CaseStudyLayout>
      ) : currentPage === 'case-study-expedia-ad-portal' ? (
        <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
          <CaseStudyPage
            content={expediaAdPortalContent}
            onBack={handleBackFromCaseStudy}
          />
        </CaseStudyLayout>
      ) : currentPage === 'case-study-worldpay-merchant-onboarding' ? (
        <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
          <CaseStudyPage
            content={worldpayMerchantOnboardingContent}
            onBack={handleBackFromCaseStudy}
          />
        </CaseStudyLayout>
      ) : currentPage === 'case-study-worldpay-sso' ? (
        <CaseStudyPlaceholder
          title="Worldpay SSO Management"
          onBack={handleBackFromCaseStudy}
          onNavigateHome={handleBackFromCaseStudy}
        />
      ) : null}
    </div>
  );
}
