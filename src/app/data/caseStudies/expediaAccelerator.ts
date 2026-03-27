import type { CaseStudyContent } from '../../components/case-study/types';
import { PLACEHOLDER_IMAGE_SECTION_DUO } from '../../components/case-study/constants';
import expediaAcceleratorImage from '../../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';

export const expediaAcceleratorContent: CaseStudyContent = {
  title: 'Expedia Group Accelerator',
  heroTitleLines: ['Expedia Group', 'Accelerator'],
  meta: {
    organization: 'Expedia Group',
    organizationNote:
      'Empowering hotel partners across all Expedia entities to unlock stronger connections with travelers by helping them appear higher in search results.',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '8 Months',
  },
  tagline:
    'Hotel partners struggle to optimize their advertising strategies because the product lacks actionable insights.',
  projectFocus: ['Travel', 'B2B', 'Partner Tools'],
  statement:
    'Hotel partners struggle to optimize their advertising strategies because the product lacks actionable insights.',
  firstBlockLabel: 'SITUATION',
  overview: {
    introHeadline: 'Situation',
    serviceList: [
      'Experience strategy',
      'UX research',
      'Interaction design',
      'Information architecture',
      'Design systems',
      'Partner tooling',
      'Data-informed UX',
    ],
    paragraphs: [
      'Hotel partners struggle to optimize their advertising strategies because the product lacks actionable insights.',
      'Without a robust reporting experience, partners struggle to make data-driven decisions, hindering their ability to effectively engage with guests and maximize performance.',
    ],
    introBelowImage: {
      body:
        'Their identity was created in-house, with us as their agency running parallel. Our design and copy team were in lock-step, rigorously exploring to create a narrative thread — a collaborative effort that compelled the client to think differently.',
      image: expediaAcceleratorImage,
    },
  },
  heroIntro:
    'We reimagined Accelerator as a modern, insight-led experience that helps hotel partners understand, optimize, and grow their visibility in Expedia search — without sacrificing clarity or control.',
  heroResults: {
    sectionLabel: 'Impact and outcomes',
    heading: 'Impact and outcomes',
    imageBelowAbove: 'https://placehold.co/1600x720/1c1c1a/2a2a28?text=Image+4',
    metrics: [
      { value: '$300M', label: 'Gross Revenue' },
      { value: '5.4%', label: 'Average Margin Spend' },
      { value: '72.4K', label: 'Active Hotel Partners' },
    ],
  },
  heroWhyItMatters: true,
  heroDiscovery: {
    sectionLabel: 'DISCOVERY',
    headline: 'Project complications',
    sections: [
      {
        type: 'numbered',
        number: '01',
        title: 'Product Comprehension',
        body: 'Hotel partners were uncertain about whether Accelerator directly contributed to booking last-minute rooms or if it was the primary factor behind their success.',
      },
      {
        type: 'numbered',
        number: '02',
        title: 'Interdependencies',
        body: 'Collaborating cross-functionally to identify offerings in other partner tools, their timing, and how Accelerator adds value at key moments of the partner journey.',
      },
      {
        type: 'numbered',
        number: '03',
        title: 'Multi-Stakeholder Alignment',
        body: 'Balancing the needs of hotel partners, product, customer success, and design, while maintaining design system consistency and platform scalability.',
      },
      {
        type: 'numbered',
        number: '04',
        title: 'Legacy Design System',
        body: 'When I joined, the project used an outdated design system, and with feature parity, some approaches needed rethinking.',
      },
      {
        type: 'numbered',
        number: '05',
        title: 'Technical Limitations',
        body: 'Multi-property selection, date selection, forecast prediction, and performance data updates were key pain points for partners that required attention.',
      },
      {
        type: 'numbered',
        number: '06',
        title: 'Time Zone',
        body: 'Time zone differences between colleagues in Southern California, Chicago, New York, Seattle, and India encouraged early and late syncs, improving collaboration and delivering value to hotel partners at velocity.',
      },
    ],
  },
  heroBetweenDiscoveryAndResults: [...PLACEHOLDER_IMAGE_SECTION_DUO],
  images: expediaAcceleratorImage,
  approach: {
    paragraphs: [
      'Our strategy focused on revolutionizing how partners perceive performance tooling: a curriculum of clear defaults, contextual recommendations, and inline education — stimulating for advanced users and approachable for everyone else.',
      'Instead of fragmented dashboards and opaque levers, we proposed a single incentivized flow — campaign configuration, insights, and next steps in one place — that engages partners and serves as the resource they trust to grow on Expedia.',
    ],
  },
  challenge: {
    heading: 'The Challenge',
    paragraphs: [
      'Hotel partners face challenges in optimizing their advertising strategies and improving search rankings due to a lack of an intuitive, modern experience and actionable insights.',
      'Without a comprehensive, user-friendly product, partners struggle to make data-driven decisions, limiting their ability to engage guests effectively and maximize performance.',
    ],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
  whyItMatters: {
    intro:
      "Search visibility directly impacts bookings and revenue. When hotel partners can't clearly understand or optimize their performance, they miss opportunities to reach travelers at the exact moment of intent.",
    cards: [
      {
        title: 'Customer Expectations',
        description:
          "Customers expect seamless, on-demand booking for last-minute rooms and have access to similar tools through competitor products.",
      },
      {
        title: 'Brand Reputation',
        description:
          "Maintaining Expedia's brand reputation through modern, intuitive tools ensures hotel partner trust, loyalty, and long-term business growth.",
      },
      {
        title: 'Revenue Generator',
        description:
          'Expedia earns revenue through Accelerator when partners leverage it and a guest books, driving value through premium service charges.',
      },
    ],
  },
  complications: {
    intro:
      'A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with perseverance and flexibility.',
    items: [
      {
        number: '01',
        title: 'Product Comprehension',
        description:
          "Hotel partners were uncertain about whether Accelerator directly contributed to booking last-minute rooms or if it was the primary factor behind their success.",
      },
      {
        number: '02',
        title: 'Interdependencies',
        description:
          'Collaborating cross-functionally to identify offerings in other partner tools, their timing, and how Accelerator adds value at key moments of the partner journey.',
      },
      {
        number: '03',
        title: 'Multi-Stakeholder Alignment',
        description:
          'Balancing the needs of hotel partners, product, customer success, and design, while maintaining design system consistency and platform scalability.',
      },
      {
        number: '04',
        title: 'Legacy Design System',
        description:
          'When I joined, the project used an outdated design system, and with feature parity, some approaches needed rethinking.',
      },
      {
        number: '05',
        title: 'Technical Limitations',
        description:
          'Multi-property selection, date selection, forecast prediction, and performance data updates were key pain points for partners that required attention.',
      },
      {
        number: '06',
        title: 'Time Zone',
        description:
          'Time zone differences between colleagues in Southern California, Chicago, New York, Seattle, and India encouraged early and late syncs, improving collaboration and delivering value to hotel partners at velocity.',
      },
    ],
  },
  impact: {
    heading: 'Impact and Outcomes',
    metrics: [
      { value: '$300M', label: 'Gross Revenue' },
      { value: '5.4%', label: 'Average Margin Spend' },
      { value: '72.4K', label: 'Active Hotel Partners' },
    ],
  },
  reflections: {
    heading: 'Reflecting on the journey and key lessons learned.',
    items: [
      {
        label: 'What Worked Well',
        text: 'Cross-functional collaboration between research, design, product, and engineering teams enabled rapid iteration and deployment of features that directly addressed hotel partner pain points.',
      },
      {
        label: "What We'd Do Differently",
        text: 'Conducting more structured evaluative testing with diverse partner types would have uncovered edge cases earlier and informed prioritization of feature rollouts.',
      },
      {
        label: 'Key Takeaway',
        text: 'Successful hotel partner products blend automation, human input, and transparency. Partners seek tools that streamline processes and provide real-time results to guide their decisions.',
      },
    ],
  },
};
