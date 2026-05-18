import type { CaseStudyRoute } from '../data/portfolioData';
import { projects } from '../data/portfolioData';

const NOTIFY_EMAIL =
  import.meta.env.VITE_ACCESS_NOTIFY_EMAIL ?? 'chadaustnwhite@gmail.com';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

function caseStudyLabel(route: CaseStudyRoute): string {
  return projects.find((p) => p.caseStudyRoute === route)?.title ?? route;
}

/** Sends an access-request notification to the portfolio owner (FormSubmit on static hosting). */
export async function notifyCaseStudyAccess(
  visitorEmail: string,
  route: CaseStudyRoute,
): Promise<void> {
  const email = visitorEmail.trim();
  const label = caseStudyLabel(route);
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `Case study access: ${label}`,
      _template: 'table',
      _captcha: 'false',
      email,
      case_study: label,
      case_study_route: route,
      _replyto: email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Notification failed (${response.status})`);
  }

  const payload = (await response.json()) as { success?: string };
  if (payload.success !== 'true' && payload.success !== true) {
    throw new Error('Notification was not accepted');
  }
}
