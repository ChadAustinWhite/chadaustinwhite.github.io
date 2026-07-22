import type { CaseStudyContent } from '../../components/case-study/types';
import expediaAcceleratorImage from '../../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';
import { expediaAcceleratorInstrument } from './expediaAcceleratorInstrument';

export const expediaAcceleratorContent: CaseStudyContent = {
  layout: 'instrument',
  scrollGradient: false,
  parallax: false,
  title: 'Expedia Group Accelerator',
  heroTitleLines: ['Expedia Group Accelerator'],
  meta: {
    organization: 'Expedia Group Accelerator',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '8 Months',
  },
  tagline:
    'Pay-after-success visibility for hotel partners: transparent, trustworthy, and built for adoption at every scale.',
  projectFocus: ['Travel', 'B2B', 'Product'],
  images: expediaAcceleratorImage,
  instrument: expediaAcceleratorInstrument,
  heroResults: {
    heading: 'Impact and outcomes',
    sectionLabel: 'Impact',
    metrics: [
      { value: '$300M', label: 'Gross Revenue' },
      { value: '5.4%', label: 'Average Margin Spend' },
      { value: '72.4K', label: 'Active Hotel Partners' },
    ],
  },
  impact: {
    heading: 'Impact and outcomes',
    metrics: [
      { value: '$300M', label: 'Gross Revenue' },
      { value: '5.4%', label: 'Average Margin Spend' },
      { value: '72.4K', label: 'Active Hotel Partners' },
    ],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
};
