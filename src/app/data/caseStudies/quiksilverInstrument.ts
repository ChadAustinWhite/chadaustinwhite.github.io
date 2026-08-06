import type { CaseStudyInstrumentContent } from '../../components/case-study/types';
import qsKellySlater from '../../../assets/quiksilver/qs-kelly-slater.png';
import qsTonyHawk from '../../../assets/quiksilver/qs-tony-hawk.png';
import qsRileyHawkPortrait from '../../../assets/quiksilver/qs-riley-hawk-portrait.png';
import qsAustynGillette from '../../../assets/quiksilver/qs-austyn-gillette.png';
import qsCraigAnderson from '../../../assets/quiksilver/qs-craig-anderson.png';
import qsRileyHawkAction from '../../../assets/quiksilver/qs-riley-hawk-action.png';

/** Instrument-style narrative for Quiksilver campaign creative (same shell as Lexus Driving Tour). */
export const quiksilverInstrument: CaseStudyInstrumentContent = {
  projectName: 'Quiksilver',
  breadcrumb: 'Quiksilver',
  tags: ['Brand', 'Campaign', 'Print'],
  roundedMedia: true,
  compactLeadImages: true,
  overviewCategories: [
    {
      label: 'Role',
      values: ['Campaign creative'],
    },
    {
      label: 'Company',
      values: ['Quiksilver'],
    },
    {
      label: 'Stakeholder',
      values: ['Brand marketing'],
    },
  ],
  lead:
    'Campaign creative for Quiksilver: action and portrait storytelling that holds the brand’s ocean-rooted attitude.',
  leadImages: [
    {
      src: qsTonyHawk,
      alt: 'Quiksilver Tony Hawk campaign with half-pipe fisheye action shot and black-and-white portrait',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: qsAustynGillette,
      alt: 'Quiksilver Austyn Gillette: black-and-white stair set and coastal color portrait with brand mark',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: qsCraigAnderson,
      alt: 'Quiksilver Craig Anderson: aerial surf shot beside smiling lifestyle portrait',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: qsRileyHawkAction,
      alt: 'Quiksilver Riley Hawk: color ledge grind beside black-and-white portrait with brand mark',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: qsRileyHawkPortrait,
      alt: 'Quiksilver Riley Hawk: black-and-white portrait with color skate action and blue wash',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: qsKellySlater,
      alt: 'Quiksilver editorial collage: barreling surfer, store list, Kelly Slater quote, and guitar portrait',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
  ],
  chapters: [],
};
