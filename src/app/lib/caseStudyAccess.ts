import type { CaseStudyRoute } from '../data/portfolioData';

export const CASE_STUDY_PASSWORD = 'Livingwithcomplexity';

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
