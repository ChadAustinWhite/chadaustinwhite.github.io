import type { CaseStudyRoute } from '../data/portfolioData';

/** Default unlock password for case studies without a route-specific override. */
export const CASE_STUDY_PASSWORD = 'Justenoughresearch';

const CASE_STUDY_PASSWORDS: Partial<Record<CaseStudyRoute, string>> = {
  'case-study-expedia-accelerator': 'Justenoughresearch',
  'case-study-worldpay-disputes': 'Justenoughresearch',
  'case-study-expedia-ad-portal': 'Livingwithcomplexity',
  'case-study-worldpay-merchant-onboarding': 'Livingwithcomplexity',
};

export function getCaseStudyPassword(route: CaseStudyRoute): string {
  return CASE_STUDY_PASSWORDS[route] ?? CASE_STUDY_PASSWORD;
}

const unlockStorageKey = (route: CaseStudyRoute) => `portfolio-case-study-unlocked:${route}`;

export function isCaseStudyUnlocked(route: CaseStudyRoute): boolean {
  try {
    return sessionStorage.getItem(unlockStorageKey(route)) === 'true';
  } catch {
    return false;
  }
}

export function setCaseStudyUnlocked(route: CaseStudyRoute): void {
  try {
    sessionStorage.setItem(unlockStorageKey(route), 'true');
  } catch {
    /* private mode / blocked storage */
  }
}
