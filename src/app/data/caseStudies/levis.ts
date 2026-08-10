import type { CaseStudyContent } from '../../components/case-study/types';
import levisTwoHorseImage from '../../../assets/levis-two-horse-brand.png';
import { levisInstrument } from './levisInstrument';

export const levisContent: CaseStudyContent = {
  layout: 'instrument',
  scrollGradient: 'to-dark',
  parallax: false,
  title: "Levi’s",
  heroTitleLines: ["Levi’s"],
  meta: {
    organization: "Levi’s",
    organizationNote:
      'Brand graphics for Levi’s merchandise: marks, badges, and print-ready illustrations built for apparel and product.',
    role: 'Brand Graphics',
    year: '',
    duration: '',
  },
  tagline:
    'Brand graphics for Levi’s merchandise: marks, badges, and print-ready illustrations built for apparel and product.',
  projectFocus: ['Brand', 'Campaign', 'Illustration'],
  images: levisTwoHorseImage,
  instrument: levisInstrument,
  heroResults: {
    heading: 'Work',
    sectionLabel: 'Campaign',
    metrics: [
      { value: '7', label: 'Pieces' },
      { value: 'Print', label: 'Primary medium' },
      { value: 'Heritage', label: 'Brand system' },
    ],
  },
  impact: {
    heading: 'Work',
    metrics: [
      { value: '7', label: 'Pieces' },
      { value: 'Print', label: 'Primary medium' },
      { value: 'Heritage', label: 'Brand system' },
    ],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
};
