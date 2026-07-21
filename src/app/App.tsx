import React, { useState } from 'react';
import { HomeLayout } from './components/HomeLayout';
import { CaseStudyLayout } from './components/case-study/CaseStudyLayout';
import { CaseStudyPage } from './components/case-study/CaseStudyPage';
import { CaseStudyPlaceholder } from './components/case-study/CaseStudyPlaceholder';
import {
  expediaAcceleratorContent,
  expediaAdPortalContent,
  worldpayDisputeDefenderContent,
  worldpayMerchantOnboardingContent,
} from './data/caseStudies';
import type { CaseStudyRoute } from './data/portfolioData';
import { projects } from './data/portfolioData';
import { PasswordProtectedCaseStudy } from './components/PasswordProtectedCaseStudy';

const COMING_SOON_ROUTES: CaseStudyRoute[] = [
  'case-study-worldpay-sso',
  'case-study-worldpay-merchant-onboarding',
  'case-study-expedia-ad-portal',
];

/** Case studies that open without a password gate. */
const PUBLIC_CASE_STUDY_ROUTES: CaseStudyRoute[] = [
  'case-study-expedia-accelerator',
  'case-study-worldpay-disputes',
];

type PageType = 'home' | CaseStudyRoute;

function isCaseStudyRoute(page: PageType): page is CaseStudyRoute {
  return page !== 'home';
}

function getCaseStudyTitle(route: CaseStudyRoute): string {
  switch (route) {
    case 'case-study-expedia-accelerator':
      return expediaAcceleratorContent.title;
    case 'case-study-expedia-ad-portal':
      return expediaAdPortalContent.title;
    case 'case-study-worldpay-merchant-onboarding':
      return worldpayMerchantOnboardingContent.title;
    case 'case-study-worldpay-sso':
      return 'Worldpay SSO Management';
    case 'case-study-worldpay-disputes':
      return worldpayDisputeDefenderContent.title;
    default:
      return 'Case study';
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const goToRoute = (route: CaseStudyRoute) => {
    setCurrentPage(route);
    window.scrollTo(0, 0);
  };

  const handleViewCaseStudy = (route: CaseStudyRoute) => {
    if (COMING_SOON_ROUTES.includes(route)) return;
    const project = projects.find((item) => item.caseStudyRoute === route);
    if (project?.comingSoon) return;
    goToRoute(route);
  };

  const handleBackFromCaseStudy = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const renderCaseStudy = (route: CaseStudyRoute) => {
    switch (route) {
      case 'case-study-expedia-accelerator':
        return (
          <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
            <CaseStudyPage
              content={expediaAcceleratorContent}
              onBack={handleBackFromCaseStudy}
              currentRoute={route}
              onViewCaseStudy={handleViewCaseStudy}
            />
          </CaseStudyLayout>
        );
      case 'case-study-expedia-ad-portal':
        return (
          <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
            <CaseStudyPage
              content={expediaAdPortalContent}
              onBack={handleBackFromCaseStudy}
              currentRoute={route}
              onViewCaseStudy={handleViewCaseStudy}
            />
          </CaseStudyLayout>
        );
      case 'case-study-worldpay-merchant-onboarding':
        return (
          <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
            <CaseStudyPage
              content={worldpayMerchantOnboardingContent}
              onBack={handleBackFromCaseStudy}
              currentRoute={route}
              onViewCaseStudy={handleViewCaseStudy}
            />
          </CaseStudyLayout>
        );
      case 'case-study-worldpay-sso':
        return (
          <CaseStudyPlaceholder
            title="Worldpay SSO Management"
            onBack={handleBackFromCaseStudy}
            onNavigateHome={handleBackFromCaseStudy}
            currentRoute={route}
            onViewCaseStudy={handleViewCaseStudy}
          />
        );
      case 'case-study-worldpay-disputes':
        return (
          <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
            <CaseStudyPage
              content={worldpayDisputeDefenderContent}
              onBack={handleBackFromCaseStudy}
              currentRoute={route}
              onViewCaseStudy={handleViewCaseStudy}
            />
          </CaseStudyLayout>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'home' ? (
        <HomeLayout onViewCaseStudy={handleViewCaseStudy} />
      ) : isCaseStudyRoute(currentPage) ? (
        PUBLIC_CASE_STUDY_ROUTES.includes(currentPage) ? (
          <React.Fragment key={currentPage}>{renderCaseStudy(currentPage)}</React.Fragment>
        ) : (
          <PasswordProtectedCaseStudy
            key={currentPage}
            route={currentPage}
            title={getCaseStudyTitle(currentPage)}
            onBack={handleBackFromCaseStudy}
          >
            {renderCaseStudy(currentPage)}
          </PasswordProtectedCaseStudy>
        )
      ) : null}
    </div>
  );
}
