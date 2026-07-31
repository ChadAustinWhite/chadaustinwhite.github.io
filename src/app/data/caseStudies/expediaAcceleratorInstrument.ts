import type { CaseStudyInstrumentContent } from '../../components/case-study/types';
import expediaAcceleratorPerformanceMarketTrends from '../../../assets/expedia-accelerator-performance-market-trends.png';
import expediaAcceleratorObservationsCreateFlow from '../../../assets/expedia-accelerator-observations-create-flow.png';
import expediaAcceleratorObservationsImpactPhases from '../../../assets/expedia-accelerator-observations-impact-phases.png';
import expediaAcceleratorUiRatePlanMarketplace from '../../../assets/expedia-accelerator-ui-rate-plan-marketplace.png';
import expediaAcceleratorUiMetricCardsLift from '../../../assets/expedia-accelerator-ui-metric-cards-lift.png';
import expediaAcceleratorProductUiCreate from '../../../assets/expedia-accelerator-product-ui-create.png';
import expediaAcceleratorProductUiPerformance from '../../../assets/expedia-accelerator-product-ui-performance.png';
import expediaAcceleratorUiCreateStayDatesRedesign from '../../../assets/expedia-accelerator-ui-create-stay-dates-redesign.png';
import expediaAcceleratorWalkthrough from '../../../assets/expedia-accelerator-walkthrough.mp4';
import expediaAcceleratorWalkthroughPoster from '../../../assets/expedia-accelerator-walkthrough-poster.jpg';
/** Instrument ServiceNow-style narrative for Expedia Group Accelerator. */
export const expediaAcceleratorInstrument: CaseStudyInstrumentContent = {
  projectName: 'Accelerator',
  breadcrumb: 'Expedia Group Accelerator',
  tags: ['Travel', 'B2B', 'Product'],
  overviewCategories: [
    {
      label: 'Role',
      values: [
        'Product strategy',
        'Product design',
        'Workshop facilitator',
        'User journey and flow',
        'Wireframing',
        'Prototyping',
        'Accessibility annotations',
      ],
    },
    {
      label: 'Company',
      values: ['Expedia Group'],
    },
    {
      label: 'Stakeholder',
      values: ['Product leadership'],
    },
    {
      label: 'Device',
      values: ['Desktop'],
    },
  ],
  lead:
    'Accelerator empowers hotel partners to unlock stronger connections with travelers by helping them appear higher in search results.',
  leadImages: [
    {
      src: expediaAcceleratorPerformanceMarketTrends,
      alt: 'Partner Central performance and market trends with date range selection and competitive set chart',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
  ],
  chapters: [
    {
      title: 'Why It Matters',
      beforeLeadBento: true,
      lead:
        'Search visibility drives bookings and revenue. Accelerator runs on a cost-per-click model, so Expedia earns a share when a traveler engages with the ad.',
      subsections: [],
      chapterVisual: 'accelerator-search-visibility',
    },
    {
      title: 'Pain points identified',
      scrollGradientStart: true,
      lead:
        'Twelve friction points emerged across discovery, setup, launch, and ongoing management, moments where partners stalled, guessed, or lost trust in Accelerator.',
      subsections: [],
      chapterVisual: 'accelerator-partner-journey',
    },
    {
      title: 'Project complications',
      scrollGradientEnd: true,
      lead:
        'The main challenges and roadblocks the team faced, and how we tackled them with perseverance and flexibility.',
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
      title: 'Evidence-led design',
      lead:
        'We combined partner feedback, heuristics, and behavioral data to guide every design decision.',
      chapterVisual: 'accelerator-hook-model',
      stackedImages: [
        {
          src: expediaAcceleratorProductUiCreate,
          alt: 'Partner Central Create an Accelerator form',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: expediaAcceleratorProductUiPerformance,
          alt: 'Partner Central Accelerator performance report',
          objectFit: 'contain',
          background: 'page',
        },
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
        {
          src: expediaAcceleratorUiCreateStayDatesRedesign,
          alt: 'Redesigned Partner Central Create an Accelerator page with stay dates and blockout dates',
          objectFit: 'contain',
          background: 'page',
        },
      ],
      subsections: [
        {
          title: 'Product UI',
          images: [
            {
              src: expediaAcceleratorUiRatePlanMarketplace,
              alt: 'Accelerator rate plan and marketplace targeting options with radio selections',
              objectFit: 'contain',
              background: 'page',
              padded: true,
            },
            {
              src: expediaAcceleratorUiMetricCardsLift,
              alt: 'Accelerator performance metric cards for sort order, page views, and search impressions',
              objectFit: 'contain',
              background: 'page',
              padded: true,
            },
          ],
        },
      ],
    },
    {
      title: 'The Result',
      subsections: [
        {
          title: 'Launch impact',
          paragraphs: [
            'Within three months of launch, partner visibility in search results rose roughly 30%. Campaign setup success reached 80% versus 54% with the previous solution. CSAT for the ads experience climbed 20 points; partner opt-in doubled in six months, contributing to a 15% lift in quarterly revenue from long-tail partners.',
            'CEO Ariane Gorin highlighted Accelerator as one of the company’s top-performing partner products at the company all-hands. The work was presented at an internal design summit and global partner forum, cited in QBR as a model for trust-first monetization, and reused as a template for next-gen partner tools.',
          ],
          video: {
            src: expediaAcceleratorWalkthrough,
            poster: expediaAcceleratorWalkthroughPoster,
            title: 'Accelerator product walkthrough',
          },
        },
      ],
      metrics: [
        { value: '$300M', label: 'Gross Revenue' },
        { value: '5.4%', label: 'Average Margin Spend' },
        { value: '72.4K', label: 'Active Hotel Partners' },
      ],
      metricsVariant: 'highlight',
      metricsPosition: 'beforeVideo',
      testimonial: {
        quote:
          'Transparency mattered more than granular control for most partners. When design and data moved together, partners finally trusted what they saw in Accelerator.',
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
      'Much like Expedia’s ambitions for Accelerator, the work is far from done. What began as a redesign of a legacy partner tool has become an ongoing playbook for trust-first monetization, from predictive campaign insights to personalized suggestions from performance and market signals, and expansion across email, retargeting, and in-app placements.',
    ],
  },
};
