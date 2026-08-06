import React, { useCallback, useState } from 'react';
import { HomeLayout } from './components/HomeLayout';
import { CaseStudyLayout } from './components/case-study/CaseStudyLayout';
import { CaseStudyPage } from './components/case-study/CaseStudyPage';
import { CaseStudyPlaceholder } from './components/case-study/CaseStudyPlaceholder';
import { SelectedVisualWorkPage } from './components/case-study/SelectedVisualWorkPage';
import {
  PageTransitionOverlay,
  PageTransitionProvider,
  usePageTransition,
} from './components/PageTransition';
import {
  expediaAcceleratorContent,
  expediaAdPortalContent,
  lexusDrivingTourContent,
  quiksilverContent,
  worldpayDisputeDefenderContent,
  worldpayMerchantOnboardingContent,
} from './data/caseStudies';
import type { CaseStudyRoute } from './data/portfolioData';
import { projects } from './data/portfolioData';
import { PasswordProtectedCaseStudy } from './components/PasswordProtectedCaseStudy';

const COMING_SOON_ROUTES: CaseStudyRoute[] = [
  'case-study-worldpay-sso',
  'case-study-worldpay-merchant-onboarding',
  'case-study-first-american-playbook',
  'case-study-mclaren-fwd',
];

/** Case studies that open without a password gate. */
const PUBLIC_CASE_STUDY_ROUTES: CaseStudyRoute[] = [
  'case-study-expedia-accelerator',
  'case-study-expedia-ad-portal',
  'case-study-worldpay-disputes',
  'case-study-lexus-driving-tour',
  'case-study-quiksilver',
  'illustrations',
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
    case 'case-study-first-american-playbook':
      return 'First American Research and Design Playbook';
    case 'case-study-quiksilver':
      return quiksilverContent.title;
    case 'case-study-mclaren-fwd':
      return 'McLaren FWD';
    case 'case-study-lexus-driving-tour':
      return lexusDrivingTourContent.title;
    case 'case-study-worldpay-disputes':
      return worldpayDisputeDefenderContent.title;
    case 'illustrations':
      return 'Selected visual work';
    default:
      return 'Case study';
  }
}

function AppRoutes() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const { overlayRef, surfaceRef, transitionTo } = usePageTransition();

  const handleViewCaseStudy = useCallback(
    (route: CaseStudyRoute) => {
      if (COMING_SOON_ROUTES.includes(route)) return;
      const project = projects.find((item) => item.caseStudyRoute === route);
      if (project?.comingSoon) return;
      if (currentPage === route) {
        window.scrollTo(0, 0);
        return;
      }

      transitionTo(() => {
        setCurrentPage(route);
      });
    },
    [currentPage, transitionTo],
  );

  const handleBackFromCaseStudy = useCallback(() => {
    if (currentPage === 'home') return;
    transitionTo(() => {
      setCurrentPage('home');
    });
  }, [currentPage, transitionTo]);

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
      case 'case-study-lexus-driving-tour':
        return (
          <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
            <CaseStudyPage
              content={lexusDrivingTourContent}
              onBack={handleBackFromCaseStudy}
              currentRoute={route}
              onViewCaseStudy={handleViewCaseStudy}
            />
          </CaseStudyLayout>
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
      case 'case-study-quiksilver':
        return (
          <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
            <CaseStudyPage
              content={quiksilverContent}
              onBack={handleBackFromCaseStudy}
              currentRoute={route}
              onViewCaseStudy={handleViewCaseStudy}
            />
          </CaseStudyLayout>
        );
      case 'illustrations':
        return (
          <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
            <SelectedVisualWorkPage onBack={handleBackFromCaseStudy} />
          </CaseStudyLayout>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PageTransitionOverlay overlayRef={overlayRef} />
      <div ref={surfaceRef} className="page-transition-surface min-h-screen bg-[var(--bg)]">
        {currentPage === 'home' ? <HomeLayout onViewCaseStudy={handleViewCaseStudy} /> : null}
        {isCaseStudyRoute(currentPage) ? (
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
    </>
  );
}

export default function App() {
  return (
    <PageTransitionProvider>
      <AppRoutes />
    </PageTransitionProvider>
  );
}
