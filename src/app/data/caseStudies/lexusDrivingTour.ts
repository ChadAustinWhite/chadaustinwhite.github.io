import type { CaseStudyContent } from '../../components/case-study/types';
import lexusDrivingTourHero from '../../../assets/lexus-driving-tour-hero.png';
import { lexusDrivingTourInstrument } from './lexusDrivingTourInstrument';

export const lexusDrivingTourContent: CaseStudyContent = {
  layout: 'instrument',
  scrollGradient: 'to-dark',
  parallax: false,
  title: 'Lexus Driving Tour',
  heroTitleLines: ['Lexus Driving Tour'],
  meta: {
    organization: 'Lexus',
    organizationNote:
      'An invitation-led digital experience for an exclusive Driving Tour — cinematic brand presence on mobile and a clear path from curiosity to registration.',
    role: 'Lead UX Designer',
    year: '2024',
    duration: '2024',
  },
  tagline:
    'An exclusive invitation to feel the road the way Lexus intended — event experience design for the Lexus Driving Tour.',
  projectFocus: ['Automotive', 'Event', 'Brand'],
  images: lexusDrivingTourHero,
  instrument: lexusDrivingTourInstrument,
  heroResults: {
    heading: 'Impact and outcomes',
    sectionLabel: 'Impact',
    metrics: [
      { value: 'Live', label: 'Brand invitation moments' },
      { value: '2', label: 'Primary guest actions' },
      { value: 'Mobile-first', label: 'Experience surface' },
    ],
  },
  impact: {
    heading: 'Impact and outcomes',
    metrics: [
      { value: 'Live', label: 'Brand invitation moments' },
      { value: '2', label: 'Primary guest actions' },
      { value: 'Mobile-first', label: 'Experience surface' },
    ],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
};
