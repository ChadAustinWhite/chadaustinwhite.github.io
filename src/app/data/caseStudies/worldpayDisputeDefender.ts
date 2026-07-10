import type { CaseStudyContent } from '../../components/case-study/types';
import worldpayDisputesImage from '../../../assets/worldpay-disputes-experience.png';
import { worldpayDisputeDefenderInstrument } from './worldpayDisputeDefenderInstrument';

export const worldpayDisputeDefenderContent: CaseStudyContent = {
  layout: 'instrument',
  scrollGradient: false,
  parallax: true,
  title: 'Worldpay Dispute Defender',
  heroTitleLines: ['Worldpay Dispute Defender'],
  meta: {
    organization: 'Worldpay Dispute Defender',
    role: 'Lead UX Designer',
    year: '2026',
    duration: '12 Months',
  },
  tagline:
    'Automated dispute resolution that protects merchant revenue and replaces manual triage with clarity operators can trust.',
  projectFocus: ['Fintech', 'B2B', 'Product'],
  images: worldpayDisputesImage,
  instrument: worldpayDisputeDefenderInstrument,
  heroResults: {
    heading: 'Impact and outcomes',
    sectionLabel: 'Impact',
    metrics: [
      { value: '$44.6M', label: 'Protected revenue annually' },
      { value: '147K', label: 'Disputes automated per month' },
    ],
  },
  impact: {
    heading: 'Impact and outcomes',
    metrics: [
      { value: '$44.6M', label: 'Protected revenue annually' },
      { value: '147K', label: 'Disputes automated per month' },
    ],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
};
