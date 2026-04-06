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

const COMING_SOON_ROUTES: CaseStudyRoute[] = [
  'case-study-worldpay-merchant-onboarding',
  'case-study-worldpay-sso',
];

type PageType = 'home' | CaseStudyRoute;
const ACCESS_PASSWORD = import.meta.env.VITE_CASE_STUDY_ACCESS_PASSWORD ?? 'design';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [requestAccessRoute, setRequestAccessRoute] = useState<CaseStudyRoute | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    setPasswordInput('');
    setPasswordError('');
  };

  const closeRequestAccessModal = () => {
    setRequestAccessRoute(null);
    setPasswordInput('');
    setPasswordError('');
  };

  const handleRequestAccessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!requestAccessRoute) return;

    if (passwordInput === ACCESS_PASSWORD) {
      const route = requestAccessRoute;
      closeRequestAccessModal();
      goToRoute(route);
      return;
    }

    setPasswordError('Incorrect password. Please try again.');
    setPasswordInput('');
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

  return (
    <div className="min-h-screen">
      {currentPage === 'home' ? (
        <HomeLayout
          onViewCaseStudy={handleViewCaseStudy}
          onRequestAccess={handleRequestAccess}
        />
      ) : currentPage === 'case-study-expedia-accelerator' ? (
        <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
          <CaseStudyPage
            content={expediaAcceleratorContent}
            onBack={handleBackFromCaseStudy}
            currentRoute="case-study-expedia-accelerator"
            onViewCaseStudy={handleViewCaseStudy}
          />
        </CaseStudyLayout>
      ) : currentPage === 'case-study-expedia-ad-portal' ? (
        <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
          <CaseStudyPage
            content={expediaAdPortalContent}
            onBack={handleBackFromCaseStudy}
            currentRoute="case-study-expedia-ad-portal"
            onViewCaseStudy={handleViewCaseStudy}
          />
        </CaseStudyLayout>
      ) : currentPage === 'case-study-worldpay-merchant-onboarding' ? (
        <CaseStudyLayout onNavigateHome={handleBackFromCaseStudy}>
          <CaseStudyPage
            content={worldpayMerchantOnboardingContent}
            onBack={handleBackFromCaseStudy}
            currentRoute="case-study-worldpay-merchant-onboarding"
            onViewCaseStudy={handleViewCaseStudy}
          />
        </CaseStudyLayout>
      ) : currentPage === 'case-study-worldpay-sso' ? (
        <CaseStudyPlaceholder
          title="Worldpay SSO Management"
          onBack={handleBackFromCaseStudy}
          onNavigateHome={handleBackFromCaseStudy}
          currentRoute="case-study-worldpay-sso"
          onViewCaseStudy={handleViewCaseStudy}
        />
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
              Enter the case study password to continue.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleRequestAccessSubmit}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Password"
                autoFocus
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
              />
              {passwordError ? (
                <p className="text-sm text-red-500">{passwordError}</p>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeRequestAccessModal}
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)] transition-opacity hover:opacity-75"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[var(--ink)] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--bg)] transition-opacity hover:opacity-75"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
