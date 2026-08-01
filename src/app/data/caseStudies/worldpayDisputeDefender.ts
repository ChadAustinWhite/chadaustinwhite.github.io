import type { CaseStudyContent } from '../../components/case-study/types';
import worldpayDisputesImage from '../../../assets/worldpay-disputes-experience.png';
import { worldpayDisputeDefenderInstrument } from './worldpayDisputeDefenderInstrument';

export const worldpayDisputeDefenderContent: CaseStudyContent = {
  layout: 'instrument',
  scrollGradient: false,
  parallax: true,
  title: 'Dispute Defender',
  heroTitleLines: ['Dispute Defender'],
  meta: {
    organization: 'Worldpay',
    role: 'Lead UX Designer',
    year: '2026',
    duration: '12 Months',
  },
  tagline:
    'Dispute Defender is an AI-powered automation tool that protects merchant revenue by gathering and submitting evidence on their behalf.',
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
