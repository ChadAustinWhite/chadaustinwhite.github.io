import React, { FormEvent, useEffect, useState } from 'react';
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
import { PasswordProtectedCaseStudy } from './components/PasswordProtectedCaseStudy';
import { isValidEmail, notifyCaseStudyAccess } from './lib/notifyCaseStudyAccess';

const COMING_SOON_ROUTES: CaseStudyRoute[] = ['case-study-worldpay-sso'];

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
      return 'Worldpay Disputes Experience';
    default:
      return 'Case study';
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [requestAccessRoute, setRequestAccessRoute] = useState<CaseStudyRoute | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [accessError, setAccessError] = useState('');
  const [isSubmittingAccess, setIsSubmittingAccess] = useState(false);

  const goToRoute = (route: CaseStudyRoute) => {
    setCurrentPage(route);
    window.scrollTo(0, 0);
  };

  const handleViewCaseStudy = (route: CaseStudyRoute) => {
    if (COMING_SOON_ROUTES.includes(route)) return;
    goToRoute(route);
  };

  const handleRequestAccess = (route: CaseStudyRoute) => {
    setRequestAccessRoute(route);
    setEmailInput('');
    setAccessError('');
    setIsSubmittingAccess(false);
  };

  const closeRequestAccessModal = () => {
    if (isSubmittingAccess) return;
    setRequestAccessRoute(null);
    setEmailInput('');
    setAccessError('');
  };

  const handleRequestAccessSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!requestAccessRoute || isSubmittingAccess) return;

    if (!isValidEmail(emailInput)) {
      setAccessError('Enter a valid email address.');
      return;
    }

    setIsSubmittingAccess(true);
    setAccessError('');

    try {
      await notifyCaseStudyAccess(emailInput, requestAccessRoute);
      const route = requestAccessRoute;
      setRequestAccessRoute(null);
      setEmailInput('');
      setIsSubmittingAccess(false);
      goToRoute(route);
    } catch {
      setAccessError('Could not send your request. Please try again in a moment.');
      setIsSubmittingAccess(false);
    }
  };

  const handleBackFromCaseStudy = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!requestAccessRoute) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRequestAccessModal();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [requestAccessRoute]);

  useEffect(() => {
    if (!requestAccessRoute) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [requestAccessRoute]);

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
          <CaseStudyPlaceholder
            title="Worldpay Disputes Experience"
            onBack={handleBackFromCaseStudy}
            onNavigateHome={handleBackFromCaseStudy}
            currentRoute={route}
            onViewCaseStudy={handleViewCaseStudy}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'home' ? (
        <HomeLayout
          onViewCaseStudy={handleViewCaseStudy}
          onRequestAccess={handleRequestAccess}
        />
      ) : isCaseStudyRoute(currentPage) ? (
        <PasswordProtectedCaseStudy
          key={currentPage}
          route={currentPage}
          title={getCaseStudyTitle(currentPage)}
        >
          {renderCaseStudy(currentPage)}
        </PasswordProtectedCaseStudy>
      ) : null}

      {requestAccessRoute ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5"
          onClick={closeRequestAccessModal}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-2xl md:p-7"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-access-title"
          >
            <h2
              id="request-access-title"
              className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]"
            >
              Request Access
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-[var(--ink-muted)]">
              Enter your email to request access to this case study.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleRequestAccessSubmit}>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setAccessError('');
                }}
                placeholder="Email"
                autoFocus
                required
                disabled={isSubmittingAccess}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ink)] disabled:opacity-60"
              />
              {accessError ? (
                <p className="text-sm text-red-500">{accessError}</p>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeRequestAccessModal}
                  disabled={isSubmittingAccess}
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)] transition-opacity hover:opacity-75 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAccess}
                  className="rounded-full bg-[var(--ink)] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--bg)] transition-opacity hover:opacity-75 disabled:opacity-50"
                >
                  {isSubmittingAccess ? 'Sending…' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
