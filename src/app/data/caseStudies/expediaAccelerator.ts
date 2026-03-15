import type { CaseStudyContent } from '../../components/case-study/types';
import expediaAcceleratorImage from '../../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';

export const expediaAcceleratorContent: CaseStudyContent = {
  title: 'Expedia Group Accelerator',
  meta: {
    organization: 'Expedia Group',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '2023–2025',
  },
  tagline:
    'Empowering hotel partners across all Expedia entities to unlock stronger connections with travelers by helping them appear higher in search results.',
  images: expediaAcceleratorImage,
  situation: {
    heading: 'Situation',
    paragraphs: [
      'Hotel partners face challenges in optimizing their advertising strategies and improving search rankings due to a lack of an intuitive, modern experience and actionable insights.',
      "Without a comprehensive, user-friendly product, partners struggle to make data-driven decisions, limiting their ability to engage guests effectively and maximize performance.",
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
