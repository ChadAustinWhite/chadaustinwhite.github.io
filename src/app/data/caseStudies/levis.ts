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
      'Heritage denim graphics and brand marks: riveted badges, Two Horse Brand craft, and lifestyle illustration rooted in Levi’s visual craft.',
    role: 'Print graphics',
    year: '',
    duration: '',
  },
  tagline:
    'Heritage-led denim graphics and brand marks: Riveted and Denim Supply Co system work rooted in Levi’s visual craft.',
  projectFocus: ['Brand', 'Campaign', 'Illustration'],
  images: levisTwoHorseImage,
  instrument: levisInstrument,
  heroResults: {
    heading: 'Work',
    sectionLabel: 'Campaign',
    metrics: [
      { value: '6', label: 'Pieces' },
      { value: 'Print', label: 'Primary medium' },
      { value: 'Heritage', label: 'Brand system' },
    ],
  },
  impact: {
    heading: 'Work',
    metrics: [
      { value: '6', label: 'Pieces' },
      { value: 'Print', label: 'Primary medium' },
      { value: 'Heritage', label: 'Brand system' },
    ],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
};
