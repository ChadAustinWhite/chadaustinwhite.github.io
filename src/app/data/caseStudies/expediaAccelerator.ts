import type { CaseStudyContent } from '../../components/case-study/types';
import expediaAcceleratorImage from '../../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';

export const expediaAcceleratorContent: CaseStudyContent = {
  title: 'Expedia Group Accelerator',
  heroTitleLines: ['Expedia Group', 'Accelerator'],
  meta: {
    organization: 'Expedia Group',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '2023–2025',
  },
  tagline:
    'Empowering hotel partners across all Expedia entities to unlock stronger connections with travelers by helping them appear higher in search results.',
  projectFocus: ['Travel', 'B2B', 'Partner Tools'],
  testimonial: {
    quote:
      'The design team brought clarity and structure to a complex product. Partner feedback has been overwhelmingly positive, and we are seeing stronger engagement with the tool.',
    name: 'Product Lead, Expedia Group',
    role: 'Partner Solutions',
  },
  uxEfforts: [
    {
      title: 'User research & discovery',
      description:
        'Partner interviews and workflow mapping revealed how hoteliers make budget and placement decisions, informing a clearer information architecture and prioritization of key metrics.',
      tags: ['UX Research', 'Interviews', 'Synthesis'],
    },
    {
      title: 'Campaign & performance experience',
      description:
        'Redesigned campaign setup and performance dashboards so partners can see spend, position, and outcomes in one place with sensible defaults and progressive disclosure.',
      tags: ['Interaction Design', 'Information Architecture', 'Prototyping'],
      metric: { value: '72.4K', label: 'Active partners' },
    },
  ],
  statement:
    'Empowering hotel partners across all Expedia entities to unlock stronger connections with travelers by helping them appear higher in search results.',
  firstBlockLabel: 'SITUATION',
  overview: {
    paragraphs: [
      'Situation',
      'Without a comprehensive, user-friendly product, partners struggle to make data-driven decisions, limiting their ability to engage guests effectively and maximize performance.',
    ],
  },
  heroIntro:
    'We reimagined Accelerator as a modern, insight-led experience that helps hotel partners understand, optimize, and grow their visibility in Expedia search — without sacrificing clarity or control.',
  images: expediaAcceleratorImage,
  approach: { paragraphs: [] },
  challenge: {
    heading: 'The Challenge',
    paragraphs: [
      'Hotel partners struggled to understand how Accelerator influenced their placement in search, how much to invest, and where to focus in order to drive meaningful results.',
      'The existing experience was fragmented and opaque, making it difficult for partners to connect their spend to outcomes — and even harder to build trust in the tool.',
    ],
  },
  narrativeSections: [
    {
      heading: 'Designing for clarity and confidence',
      body: [
        'We partnered closely with product, research, and data teams to simplify how Accelerator communicates value. Rather than exposing raw levers and metrics, we focused on the decisions partners needed to make day to day.',
        'The new experience brings together campaign configuration, performance insights, and guidance into a single, opinionated flow so partners always know what is happening, why it matters, and what they can do next.',
      ],
    },
    {
      heading: 'Balancing flexibility with guardrails',
      body: [
        'Accelerator serves hotel partners of all sizes, from independent properties to global brands. The design needed to honor their different levels of sophistication without overwhelming less-technical users.',
        'We introduced sensible defaults, contextual recommendations, and inline education that keep power and control available for advanced users while ensuring that every partner can activate and optimize with confidence.',
      ],
    },
    {
      heading: 'Evolving with the platform',
      body: [
        'Because Accelerator sits at the intersection of multiple Expedia platforms, we aligned closely with the evolving design system and patterns used across the partner ecosystem.',
        'This work not only refreshed the interface but also set a foundation for future experimentation, performance surfaces, and new optimization features that can be layered in over time.',
      ],
    },
  ],
  rallyingCry: {
    heading: 'A shared vision for partner growth',
    paragraphs: [
      'Accelerator is more than a performance lever — it is a promise that Expedia will help partners grow in a way that is both transparent and sustainable.',
      'By building an experience that hotel partners, product teams, and account managers can all stand behind, we created a unified foundation for future investment in performance tooling across the ecosystem.',
    ],
  },
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
    intro:
      'Accelerator empowers hotel partners to optimize their advertising strategies, improve search rankings, and drive better results with a modern, intuitive experience and comprehensive insights.',
    metrics: [
      { value: '$300M', label: 'Gross Revenue' },
      { value: '5.4%', label: 'Average Margin Spend' },
      { value: '72.4K', label: 'Active Hotel Partners' },
    ],
  },
  reflections: {
    heading: 'Lessons Learned',
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
