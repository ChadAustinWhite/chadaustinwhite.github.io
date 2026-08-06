import type { CaseStudyContent } from '../../components/case-study/types';
import qsAustynGillette from '../../../assets/quiksilver/qs-austyn-gillette.png';
import { quiksilverInstrument } from './quiksilverInstrument';

export const quiksilverContent: CaseStudyContent = {
  layout: 'instrument',
  scrollGradient: 'to-dark',
  parallax: false,
  title: 'Quiksilver',
  heroTitleLines: ['Quiksilver'],
  meta: {
    organization: 'Quiksilver',
    organizationNote:
      'Campaign and retail creative spanning skate and surf talent, promotional postings, and magazine-format storytelling for Quiksilver’s ocean-rooted brand.',
    role: 'Campaign creative',
    year: '2011',
    duration: '2011',
  },
  tagline:
    'Campaign creative for Quiksilver: action and portrait storytelling that holds the brand’s ocean-rooted attitude.',
  projectFocus: ['Brand', 'Campaign', 'Print'],
  images: qsAustynGillette,
  instrument: quiksilverInstrument,
  heroResults: {
    heading: 'Work',
    sectionLabel: 'Campaign',
    metrics: [
      { value: '6', label: 'Campaign pieces' },
      { value: 'Print', label: 'Primary medium' },
      { value: 'Global', label: 'Brand market' },
    ],
  },
  impact: {
    heading: 'Work',
    metrics: [
      { value: '6', label: 'Campaign pieces' },
      { value: 'Print', label: 'Primary medium' },
      { value: 'Global', label: 'Brand market' },
    ],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
};
