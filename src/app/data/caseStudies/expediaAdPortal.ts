import type { CaseStudyContent } from '../../components/case-study/types';
import expediaAdPortalImage from '../../../assets/expedia-ad-portal-card.png';
import {
  expediaAdPortalImpactMetrics,
  expediaAdPortalInstrument,
} from './expediaAdPortalInstrument';

export const expediaAdPortalContent: CaseStudyContent = {
  layout: 'instrument',
  scrollGradient: 'to-dark',
  parallax: false,
  title: 'Expedia Group Ad Portal',
  heroTitleLines: ['Expedia Group Ad Portal'],
  meta: {
    organization: 'Expedia Group Ad Portal',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '2025',
  },
  tagline:
    'Expedia ad portal gives different partner types one place to manage campaigns, payments, and access across markets with clarity.',
  projectFocus: ['Travel', 'B2B', 'Advertising'],
  images: expediaAdPortalImage,
  instrument: expediaAdPortalInstrument,
  heroResults: {
    heading: 'Impact and outcomes',
    sectionLabel: 'Impact',
    metrics: [...expediaAdPortalImpactMetrics],
  },
  impact: {
    heading: 'Impact and outcomes',
    metrics: [...expediaAdPortalImpactMetrics],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
};
