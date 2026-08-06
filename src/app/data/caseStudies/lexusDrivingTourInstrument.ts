import type { CaseStudyInstrumentContent } from '../../components/case-study/types';
import lexusDrivingTourCaseLead from '../../../assets/lexus-driving-tour-case-lead.png';
import lexusDrivingTourCaseMobileScreens from '../../../assets/lexus-driving-tour-case-mobile-screens.png';

/** Instrument-style narrative for the Lexus Driving Tour event experience. */
export const lexusDrivingTourInstrument: CaseStudyInstrumentContent = {
  projectName: 'Lexus Driving Tour',
  breadcrumb: 'Lexus Driving Tour',
  tags: ['Automotive', 'Event', 'Brand'],
  roundedMedia: true,
  overviewCategories: [
    {
      label: 'Role',
      values: [
        'Experience design',
        'Visual design',
        'Interaction design',
        'Responsive web',
        'Prototyping',
      ],
    },
    {
      label: 'Company',
      values: ['Lexus'],
    },
    {
      label: 'Stakeholder',
      values: ['Brand marketing', 'Event operations'],
    },
    {
      label: 'Device',
      values: ['Mobile web', 'Desktop'],
    },
  ],
  lead:
    'An exclusive, invitation-led digital journey that takes guests from first glance to RSVP.',
  leadImages: [
    {
      src: lexusDrivingTourCaseLead,
      alt: 'Lexus Driving Tour desktop site: full-width Experience Amazing hero with blue LC sports car, navigation, Register Now and Event Details, and You’re Invited event details',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: lexusDrivingTourCaseMobileScreens,
      alt: 'Lexus Driving Tour mobile screens: hero invitation, You’re Invited details, Experience gallery, and Event Highlights with registration',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
  ],
  chapters: [],
};
