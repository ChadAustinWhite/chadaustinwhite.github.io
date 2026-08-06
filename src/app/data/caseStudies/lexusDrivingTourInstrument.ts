import type { CaseStudyInstrumentContent } from '../../components/case-study/types';
import lexusDrivingTourCaseLead from '../../../assets/lexus-driving-tour-case-lead.png';
import lexusDrivingTourHero from '../../../assets/lexus-driving-tour-hero.png';

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
      alt: 'Lexus Driving Tour site on desktop and mobile: Experience Amazing hero with blue LC sports car, Register Now and Event Details, and You’re Invited section',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
  ],
  chapters: [
    {
      title: 'Why It Matters',
      lead: [
        'Event attendance is won or lost in the first moments of the invitation. Guests need immediate clarity: what the experience is, why it feels exclusive, and what to do next, without wading through dealer form noise.',
        'The Driving Tour website needed to carry the same craft as the cars themselves: cinematic presence, decisive hierarchy, and a registration path that feels personal rather than procedural.',
      ],
      chapterVisual: 'lexus-driving-tour-phone',
      subsections: [
        {
          title: 'Brand as product',
          paragraphs: [
            'Lexus already communicates “Experience Amazing” across markets. Our job was to make that line land on a small screen: car photography as the hero stage, type lockup as the brand voice, and two clear actions (Register now and Event details) so guests never had to parse a long page before committing interest.',
          ],
        },
      ],
    },
    {
      title: 'Project complications',
      lead:
        'A focused look at the constraints that shaped the experience, and how we kept the invitation feeling exclusive without becoming opaque.',
      subsections: [],
      accordion: [
        {
          title: 'Invitation, not campaign spam',
          body: 'The tour is limited-session hospitality, not an open lead form. UI copy, hierarchy, and CTAs had to feel curated for invitees while still converting browsers into registrants for operations.',
        },
        {
          title: 'Hero media under real conditions',
          body: 'Cinematic vehicle photography carries the emotion of the event. The mobile composition had to protect brand type, logo, and primary CTA across aspect ratios without cropping the story out of the frame.',
        },
        {
          title: 'Dual-audience clarity',
          body: 'Guests arrive from email, partners, and social. Register now and Event details had to sit as equal peers for people ready to commit and people still evaluating logistics.',
        },
        {
          title: 'Cross-channel continuity',
          body: 'Landing art, event brief, and on-site hospitality needed a single visual system of color, type, and pacing so the digital experience anticipated the track-day moment rather than competing with it.',
        },
        {
          title: 'Performance on the road',
          body: 'Many sessions start on mobile, often on imperfect networks. We prioritized a lean first paint of the hero story and deferred secondary content so the invitation stayed fast and legible.',
        },
      ],
    },
    {
      title: 'Evidence-led design',
      lead:
        'We anchored decisions in how invitation media is actually read: first the vehicle and place, then the brand promise, then a single decisive next step.',
      subsections: [
        {
          title: 'Composition system',
          paragraphs: [
            'The hero is a full-bleed visual plane of road, sky, and the LC line, with logo and menu held quiet at the top. The type lockup sits low in the composition so “LEXUS DRIVING TOUR” reads as part of the cinematic stage, not a floating marketing block.',
            'Register now uses solid high-contrast fill; Event details remains available as a secondary path for guests still building confidence. Below the fold, You’re Invited and Experience Amazing extend the same language without restaging the entire brand.',
          ],
        },
        {
          title: 'Content architecture',
          bullets: [
            'One promise above the fold: experience the tour the way Lexus intended.',
            'Two actions only: commit (register) or learn (details) before logistics expand.',
            'Hospitality language under the fold for session scarcity, complimentary care, and what guests should expect off the course.',
          ],
        },
      ],
    },
    {
      title: 'The Result',
      subsections: [
        {
          title: 'An invitation that feels like the event',
          paragraphs: [
            'The finished experience treats the Driving Tour as a brand product: immersive first screen, precise CTAs, and a calm scroll into hospitality detail. Guests can move from desire to registration without friction that would break the exclusive tone.',
            'For stakeholders, the site became a reusable shell for future tour markets with the same drama and structure, and swappable photography and session details, while keeping registration operations straightforward.',
          ],
        },
      ],
      metrics: [
        { value: 'Live', label: 'Brand invitation moments' },
        { value: '2', label: 'Primary guest actions' },
        { value: 'Mobile-first', label: 'Experience surface' },
      ],
      metricsVariant: 'highlight',
      metricsPosition: 'afterContent',
      metricsEyebrow: 'Experience outcomes',
    },
  ],
  closing: {
    paragraphs: [
      'Lexus Driving Tour proves that high-touch automotive events need digital spaces with the same restraint as the showroom: one strong image, one clear promise, and a path that respects the guest’s time.',
    ],
    image: {
      src: lexusDrivingTourHero,
      alt: 'Lexus Driving Tour: Experience Amazing invitation composition',
      objectFit: 'contain',
      background: 'page',
      padded: true,
    },
  },
};
