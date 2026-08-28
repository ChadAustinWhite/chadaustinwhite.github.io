import type { CaseStudyRoute } from '../data/portfolioData';
import { projects } from '../data/portfolioData';

export const COMING_SOON_ROUTES: CaseStudyRoute[] = [
  'case-study-worldpay-sso',
  'case-study-worldpay-merchant-onboarding',
  'case-study-first-american-playbook',
  'case-study-mclaren-fwd',
];

export function canNavigateToCaseStudyRoute(
  route: CaseStudyRoute | undefined,
): route is CaseStudyRoute {
  if (!route) return false;
  if (COMING_SOON_ROUTES.includes(route)) return false;
  const project = projects.find((item) => item.caseStudyRoute === route);
  if (project?.comingSoon) return false;
  return true;
}
