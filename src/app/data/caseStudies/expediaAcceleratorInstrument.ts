import type { CaseStudyInstrumentContent } from '../../components/case-study/types';
import expediaAcceleratorCreateAcceleratorHero from '../../../assets/expedia-accelerator-create-accelerator-hero.png';
import expediaAcceleratorPerformanceMarketTrends from '../../../assets/expedia-accelerator-performance-market-trends.png';
import expediaAcceleratorCreateFlow from '../../../assets/expedia-accelerator-create-flow.png';
import expediaAcceleratorOneKeyCash from '../../../assets/expedia-accelerator-onekeycash.png';
import expediaAcceleratorUiRateSelection from '../../../assets/expedia-accelerator-ui-rate-selection.png';
import expediaAcceleratorObservationsCreateFlow from '../../../assets/expedia-accelerator-observations-create-flow.png';
import expediaAcceleratorObservationsImpactPhases from '../../../assets/expedia-accelerator-observations-impact-phases.png';
import expediaAcceleratorNorthstarVisionMiro from '../../../assets/expedia-accelerator-northstar-vision-miro.png';
import expediaAcceleratorAffinityMapping from '../../../assets/expedia-accelerator-affinity-mapping.png';
import expediaAcceleratorDataAnalysis from '../../../assets/expedia-accelerator-data-analysis.png';
/** Instrument ServiceNow-style narrative for Expedia Group Accelerator. */
export const expediaAcceleratorInstrument: CaseStudyInstrumentContent = {
  clientName: 'Expedia Group Accelerator',
  projectName: 'Accelerator',
  breadcrumb: 'Expedia Group Accelerator',
  tags: ['Travel', 'B2B', 'Product'],
  lead:
    'Empowering hotel partners across all Expedia entities to unlock stronger connections with travelers by helping them appear higher in search results.',
  leadImages: [
    {
      src: expediaAcceleratorCreateAcceleratorHero,
      alt: 'Create an Accelerator in Partner Central with stay dates, blockout dates, and advanced visibility settings',
      background: 'page',
    },
    {
      src: expediaAcceleratorPerformanceMarketTrends,
      alt: 'Partner Central performance and market trends with date range selection and competitive set chart',
    },
  ],
  leadBento: {
    primary: {
      src: expediaAcceleratorUiRateSelection,
      alt: 'Rate plan and marketplace selection with radio hierarchy and helper copy',
      background: 'charcoal',
    },
    secondary: {
      src: expediaAcceleratorOneKeyCash,
      alt: 'OneKeyCash promotion qualification and preview in Partner Central',
      background: 'page',
    },
    tertiary: {
      src: expediaAcceleratorCreateFlow,
      alt: 'Create an Accelerator flow in Partner Central',
      background: 'page',
    },
  },
  chapters: [
    {
      title: 'Why It Matters',
      beforeLeadBento: true,
      lead:
        "Search visibility directly impacts bookings and revenue. When hotel partners can't clearly understand or optimize their performance, they miss opportunities to reach travelers at the exact moment of intent.",
      subsections: [],
      chapterVisual: 'accelerator-search-visibility',
    },
    {
      title: 'Project complications',
      lead:
        'A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with perseverance and flexibility.',
      subsections: [],
      accordion: [
        {
          title: 'Product comprehension',
          body: 'Hotel partners were uncertain about whether Accelerator directly contributed to booking last-minute rooms or if it was the primary factor behind their success.',
        },
        {
          title: 'Interdependencies',
          body: 'Collaborating cross-functionally to identify offerings in other partner tools, their timing, and how Accelerator adds value at key moments of the partner journey.',
        },
        {
          title: 'Multi-stakeholder alignment',
          body: 'Balancing the needs of hotel partners, product, customer success, and design, while maintaining design system consistency and platform scalability.',
        },
        {
          title: 'Legacy design system',
          body: 'When I joined, the project used an outdated design system, and with feature parity, some approaches needed rethinking.',
        },
        {
          title: 'Technical limitations',
          body: 'Multi-property selection, date selection, forecast prediction, and performance data updates were key pain points for partners that required attention.',
        },
        {
          title: 'Time zone',
          body: 'Time zone differences between colleagues in Southern California, Chicago, New York, Seattle, and India encouraged early and late syncs, improving collaboration and delivering value to hotel partners at velocity.',
        },
      ],
    },
    {
      title: 'Inductive vs. Deductive',
      lead:
        'We paired inductive discovery (journey mapping and heuristic synthesis from partner feedback) with deductive validation through loyalty and performance data, so every design bet was grounded in what partners said and what the numbers showed.',
      subsections: [],
      stackedImages: [
        {
          src: expediaAcceleratorObservationsCreateFlow,
          alt: 'Figma observations and recommendations for Create an Accelerator impact phases',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: expediaAcceleratorObservationsImpactPhases,
          alt: 'Figma observations linking discovery insights and UX requirements on Create an Accelerator impact phases',
          objectFit: 'contain',
          background: 'page',
        },
      ],
      bentoGrid: {
        primary: {
          src: expediaAcceleratorNorthstarVisionMiro,
          alt: 'Accelerator Northstar Vision collaboration journey map on Miro',
          objectFit: 'contain',
          background: 'page',
        },
        secondary: {
          src: expediaAcceleratorAffinityMapping,
          alt: 'XLR and OneKeyCash heuristic evaluation affinity mapping on Miro',
          objectFit: 'contain',
          background: 'page',
        },
        tertiary: {
          src: expediaAcceleratorDataAnalysis,
          alt: 'XLR loyalty OneKeyCash Looker dashboard with spend, GBV, and booking metrics',
          objectFit: 'contain',
          background: 'page',
        },
      },
    },
    {
      title: 'The Result',
      subsections: [
        {
          title: 'Launch impact',
          paragraphs: [
            'Within three months of launch, partner visibility in search results rose roughly 30%. Campaign setup success reached 80% versus 54% with the previous solution. CSAT for the ads experience climbed 20 points; partner opt-in doubled in six months, contributing to a 15% lift in quarterly revenue from long-tail partners.',
            'CEO Ariane Gorin highlighted Accelerator as one of the company’s top-performing partner products at the Q1 2025 all-hands. The work was presented at an internal design summit and global partner forum, cited in QBR as a model for trust-first monetization, and reused as a template for next-gen partner tools.',
          ],
        },
      ],
      metrics: [
        { value: '$300M', label: 'Gross Revenue' },
        { value: '5.4%', label: 'Average Margin Spend' },
        { value: '72.4K', label: 'Active Hotel Partners' },
      ],
      testimonial: {
        quote:
          'Transparency mattered more than granular control for most partners. When design and data moved together, partners finally trusted what they saw in Partner Central.',
        name: 'Program leadership',
        role: 'Expedia Group — Monetization',
      },
    },
    {
      title: 'Reflecting on the journey and key lessons learned.',
      subsections: [],
      accordion: [
        {
          title: 'What worked well',
          body: 'Cross-functional collaboration between research, design, product, and engineering teams enabled rapid iteration and deployment of features that directly addressed hotel partner pain points.',
        },
        {
          title: "What we'd do differently",
          body: 'Conducting more structured evaluative testing with diverse partner types would have uncovered edge cases earlier and informed prioritization of feature rollouts.',
        },
        {
          title: 'Key takeaway',
          body: 'Successful hotel partner products blend automation, human input, and transparency. Partners seek tools that streamline processes and provide real-time results to guide their decisions.',
        },
      ],
    },
  ],
  closing: {
    paragraphs: [
      'Much like Expedia’s ambitions for Accelerator, the work is far from done. What began as a redesign of a legacy partner tool has become an ongoing playbook for trust-first monetization—from predictive campaign insights to personalized suggestions from performance and market signals, and expansion across email, retargeting, and in-app placements.',
    ],
  },
};
