import type { CaseStudyContent } from '../../components/case-study/types';
import expediaAcceleratorImage from '../../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';
import expediaAcceleratorCreateFlow from '../../../assets/expedia-accelerator-create-flow.png';
import expediaAcceleratorOneKeyCash from '../../../assets/expedia-accelerator-onekeycash.png';
import expediaAcceleratorMiroAudit from '../../../assets/expedia-accelerator-miro-audit.png';
import expediaAcceleratorExclusiveFeature from '../../../assets/expedia-accelerator-exclusive-feature.png';
import expediaAcceleratorUsabilitySynthesis from '../../../assets/expedia-accelerator-usability-synthesis.png';
import expediaAcceleratorUserTesting from '../../../assets/expedia-accelerator-user-testing.png';
import expediaAcceleratorCreateStayDates from '../../../assets/expedia-accelerator-create-stay-dates.png';
import expediaAcceleratorOneKeyCashHypothesis from '../../../assets/expedia-accelerator-onekeycash-hypothesis.png';
import expediaAcceleratorPrototype3Synthesis from '../../../assets/expedia-accelerator-prototype-3-synthesis.png';
import expediaAcceleratorPartnerCentral from '../../../assets/expedia-accelerator-partner-central.png';
import expediaAcceleratorStudyOverview from '../../../assets/expedia-accelerator-study-overview.png';
import expediaAcceleratorCollaborationPlanning from '../../../assets/expedia-accelerator-collaboration-planning.png';
import expediaAcceleratorResearchBrief from '../../../assets/expedia-accelerator-research-brief.png';
import expediaAcceleratorAffinityMapping from '../../../assets/expedia-accelerator-affinity-mapping.png';
import expediaAcceleratorDataIteration from '../../../assets/expedia-accelerator-data-iteration.png';
import expediaAcceleratorDesignSystem from '../../../assets/expedia-accelerator-design-system.png';
import expediaAcceleratorDataAnalysis from '../../../assets/expedia-accelerator-data-analysis.png';
import expediaAcceleratorPartnerResearch from '../../../assets/expedia-accelerator-partner-research.png';
import expediaAcceleratorIdeationFigma from '../../../assets/expedia-accelerator-ideation-figma.png';
import expediaAcceleratorDesignCritique from '../../../assets/expedia-accelerator-design-critique.png';
import expediaAcceleratorLofiWireframe from '../../../assets/expedia-accelerator-lofi-wireframe.png';
import expediaAcceleratorUiCreateCalendar from '../../../assets/expedia-accelerator-ui-create-calendar.png';
import expediaAcceleratorUiPerformanceDashboard from '../../../assets/expedia-accelerator-ui-performance-dashboard.png';
import expediaAcceleratorUiMetricCards from '../../../assets/expedia-accelerator-ui-metric-cards.png';
import expediaAcceleratorUiStayDates from '../../../assets/expedia-accelerator-ui-stay-dates.png';
import expediaAcceleratorUiRateSelection from '../../../assets/expedia-accelerator-ui-rate-selection.png';

/** Padded duo break: wide process or product screen left, supporting screen right. */
const sonosDuoImage = (
  primary: string,
  secondary: string,
  primaryVariant: 'wide' | 'wideShort' = 'wideShort',
) => ({
  display: 'duo' as const,
  src: primary,
  variant: primaryVariant,
  duoSecondary: { src: secondary, variant: 'portrait' as const },
  padded: true,
  background: 'none' as const,
  objectFit: 'contain' as const,
});

export const expediaAcceleratorContent: CaseStudyContent = {
  layout: 'sonos',
  scrollGradient: true,
  title: 'Expedia Group Accelerator',
  heroTitleLines: ['Expedia Group', 'Accelerator'],
  meta: {
    organization: 'Expedia Group',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '8 Months',
  },
  tagline:
    'Pay-after-success visibility for hotel partners: transparent, trustworthy, and built for adoption at every scale.',
  projectFocus: ['Travel', 'B2B', 'Product'],
  images: expediaAcceleratorImage,
  sonos: {
    lead:
      'Empowering hotel partners across all Expedia entities to unlock stronger connections with travelers by helping them appear higher in search results.',
    heroCarousel: [
      {
        src: expediaAcceleratorCreateFlow,
        variant: 'landscapeWide',
        alt: 'Create an Accelerator flow in Partner Central with annotated design feedback',
      },
      {
        src: expediaAcceleratorOneKeyCash,
        variant: 'landscape',
        alt: 'OneKeyCash promotion qualification and preview in Partner Central',
      },
      {
        src: expediaAcceleratorImage,
        variant: 'landscapeWide',
        alt: 'Partner Central performance and market trends',
      },
      {
        src: expediaAcceleratorMiroAudit,
        variant: 'landscapeWide',
        alt: 'XLR and OneKeyCash UX audit synthesis on a Miro board',
      },
      {
        src: expediaAcceleratorExclusiveFeature,
        variant: 'landscape',
        alt: 'Create an Accelerator with OneKeyCash exclusive feature card',
      },
      {
        src: expediaAcceleratorCreateStayDates,
        variant: 'landscapeWide',
        alt: 'Create an Accelerator stay dates, blockout dates, and visibility settings in Partner Central',
      },
      {
        src: expediaAcceleratorUsabilitySynthesis,
        variant: 'landscapeWide',
        alt: 'Usability testing synthesis: successes and opportunities for OneKeyCash',
      },
      {
        src: expediaAcceleratorUserTesting,
        variant: 'landscapeWide',
        alt: 'Live user testing session alongside Miro research synthesis',
      },
      {
        src: expediaAcceleratorOneKeyCashHypothesis,
        variant: 'landscapeWide',
        alt: 'OneKeyCash design explorations and Create an Accelerator hypothesis screens',
      },
      {
        src: expediaAcceleratorPrototype3Synthesis,
        variant: 'landscapeWide',
        alt: 'Prototype 3 usability synthesis: successes and opportunities',
      },
    ],
    sections: [
      {
        heading: 'Why it matters',
        paragraphs: [
          'Search visibility directly impacts bookings and revenue. When hotel partners can’t clearly understand or optimize their performance, they miss opportunities to reach travelers at the exact moment of intent.',
        ],
        subpoints: [
          {
            title: 'Customer expectations',
            body: 'Customers expect seamless, on-demand booking for last-minute rooms and have access to similar tools through competitor products.',
          },
          {
            title: 'Brand reputation',
            body: 'Maintaining Expedia’s brand reputation through modern, intuitive tools ensures hotel partner trust, loyalty, and long-term business growth.',
          },
          {
            title: 'Revenue generator',
            body: 'Expedia earns revenue through Accelerator after a guest books, driving value through premium service charges.',
          },
        ],
        subpointsVariant: 'accordion',
        image: {
          src: expediaAcceleratorPartnerCentral,
          variant: 'wideShort',
          objectFit: 'contain',
          background: 'none',
          padded: true,
        },
      },
      {
        heading: 'Project complications',
        workGrid: {
          position: 'below',
          rows: [
            {
              cells: [
                {
                  src: expediaAcceleratorStudyOverview,
                  size: 'large',
                  aspect: 'landscape',
                  alt: 'UR brief outlining study dates, recruitment criteria, and interview methodology',
                  title: 'Evaluative study brief',
                  caption:
                    'Aligned research, CX, and design on recruitment, sessions, and goals before post-launch partner interviews.',
                },
                {
                  src: expediaAcceleratorCollaborationPlanning,
                  size: 'small',
                  aspect: 'portrait',
                  alt: 'Zoom working session reviewing the Q3 Accelerator study plan with the full team',
                  title: 'Planning as a team',
                  caption:
                    'Live working session to refine research questions and partner criteria across time zones.',
                },
              ],
            },
            {
              cells: [
                {
                  src: expediaAcceleratorResearchBrief,
                  size: 'small',
                  aspect: 'landscape',
                  alt: 'XLR and OneKeyCash study plan with structured interview sections',
                  title: 'Discussion guide',
                  caption:
                    'Structured script for Accelerator usage, OneKeyCash perception, and prototype walkthroughs.',
                },
                {
                  src: expediaAcceleratorAffinityMapping,
                  size: 'large',
                  aspect: 'portrait',
                  alt: 'Miro affinity map clustering partner research findings',
                  title: 'Synthesis workshop',
                  caption:
                    'Affinity mapping to turn partner feedback into themes, opportunities, and design priorities.',
                },
              ],
            },
            {
              cells: [
                {
                  src: expediaAcceleratorDataIteration,
                  size: 'large',
                  aspect: 'landscape',
                  alt: 'Excel transaction analysis reviewed in Zoom alongside successive Figma prototypes',
                  title: 'Data-informed iteration',
                  caption:
                    'Partner transaction data reviewed alongside successive prototypes to validate direction.',
                },
                {
                  src: expediaAcceleratorDesignSystem,
                  size: 'small',
                  aspect: 'landscape',
                  alt: 'FDS component library and variables in Figma',
                  title: 'Design system alignment',
                  caption:
                    'Bridging legacy Partner Central patterns with shared components, tokens, and variables.',
                },
              ],
            },
          ],
        },
        paragraphs: [
          'A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with perseverance and flexibility.',
        ],
        subpoints: [
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
        subpointsVariant: 'accordion',
      },
      {
        heading: 'Defining what success looks like',
        paragraphs: [
          'We anchored the program around measurable outcomes by clearly defining what success looked like.',
        ],
        subpoints: [
          {
            title: 'WCAG AA',
            body: 'Adherence to WCAG AA web accessibility standards from the start, so the experience worked for every partner and every ability.',
          },
          {
            title: 'Happiness',
            body: 'Partner satisfaction (CSAT) and confidence in the product: an intuitive, trustworthy ad experience with clear value so partners understood what they were buying and why.',
          },
          {
            title: 'Engagement',
            body: 'Depth and frequency of use. Analytics from the prior quarter: 89k properties active on Accelerator at least once year-to-date; 52k created at least one new campaign; 17k created only one; 10k of those single-campaign partners still had an active campaign today. That funnel pointed us toward repeat usage, literacy, and transparency.',
          },
          {
            title: 'Adoption',
            body: 'Drive uptake of Accelerator among both new and existing hotel partners, from large chains to independent, family-run properties.',
          },
          {
            title: 'Retention',
            body: 'Increase partner bookings and retention by making performance visible and actionable in the product, and keep partners investing in Accelerator over time.',
          },
          {
            title: 'Task success',
            body: 'Feature adoption, successful campaign setup rate, and a decrease in support requests as signals that partners could set up and run campaigns without friction.',
          },
        ],
        subpointsVariant: 'accordion',
        image: sonosDuoImage(
          expediaAcceleratorDataAnalysis,
          expediaAcceleratorPartnerResearch,
          'wide',
        ),
      },
      {
        heading: 'Product strategy foundations',
        paragraphs: [
          'We grounded the experience in behavioral insights and usability heuristics while aligning teams around a shared definition of partner and business success.',
        ],
        subpointsVariant: 'accordion',
        subpoints: [
          {
            title: 'Cross-functional alignment',
            body: 'Product management, engineering, customer experience, marketing, content design, user research, and UX worked from a shared understanding of partner needs and business goals.',
          },
          {
            title: 'Research insights',
            body: 'Behavioral interviews, journey mapping, and usability testing surfaced a consistent pattern: partners hesitated when ad tools lacked transparency; smaller partners had low ad literacy and limited time; everyone wanted visibility without financial risk.',
          },
          {
            title: 'Usability heuristics',
            body: 'We applied established heuristics across campaign setup and performance surfaces: clear system status, consistency with Partner Central patterns, error prevention and recovery, and recognition over recall so partners could act without memorizing the product.',
          },
          {
            title: 'Pay-after-success framing',
            body: 'Behavioral design positioned Accelerator as pay-after-success rather than a traditional ad product, so partners invested only when a booking succeeded.',
          },
          {
            title: 'Anchoring and smart defaults',
            body: 'Historical performance data anchored expectations and powered smart defaults that reduced guesswork during campaign setup.',
          },
          {
            title: 'Choice architecture',
            body: 'We limited choice to reduce cognitive load and kept flows focused on the decisions that mattered most during campaign setup.',
          },
          {
            title: 'Loss aversion and reciprocity',
            body: '“You could have won this booking” messaging applied loss aversion; clear reporting and spend limits built reciprocity and trust.',
          },
          {
            title: 'Motivation and progress',
            body: 'Picture superiority, goal-gradient progress, and Zeigarnik-style incomplete states kept partners moving through setup without overwhelm.',
          },
        ],
        image: sonosDuoImage(
          expediaAcceleratorIdeationFigma,
          expediaAcceleratorDesignCritique,
        ),
      },
      {
        heading: 'System thinking and data-informed iteration',
        paragraphs: [
          'We mapped touchpoints across search results, listing pages, partner dashboards, and billing, then partnered with adjacent product teams to align UI and reduce fragmentation. Reusable components were proposed for future monetization tools.',
          'With data science, we tracked funnel drop-off, refined activation, A/B tested CTA language and default budgets, and used clickstream data to validate setup abandonment hypotheses, keeping design and data in lockstep so partners could trust what they saw.',
        ],
      },
      {
        heading: 'Vision, leadership, and team impact',
        paragraphs: [
          'A north-star prototype envisioned a self-optimizing, AI-assisted ad platform; a modular system was roadmapped for budget recommendations, predictive bidding, and ROI forecasting. I co-led strategy with PM and engineering, advocated for UX in quarterly planning, and facilitated crits, retros, and co-creation workshops.',
          'I mentored two mid-level designers on complementary monetization features, hosted a behavioral-design lunch and learn, and helped introduce experience principles that now guide monetization product decisions org-wide.',
        ],
      },
      {
        heading: 'Impact and outcomes',
        paragraphs: [
          'Accelerator empowers hotel partners to optimize their advertising strategies, improve search rankings, and drive better results with a modern, intuitive experience and comprehensive insights.',
          'Within three months of launch, partner visibility in search results rose roughly 30%. Campaign setup success reached 80% versus 54% with the previous solution. CSAT for the ads experience climbed 20 points; partner opt-in doubled in six months, contributing to a 15% lift in quarterly revenue from long-tail partners.',
        ],
        image: {
          ...sonosDuoImage(expediaAcceleratorLofiWireframe, expediaAcceleratorCreateFlow, 'wide'),
          caption:
            'From low-fidelity exploration to shipped Partner Central flows: transparency, behavioral design, and clear performance storytelling.',
        },
      },
      {
        heading: 'Interface refinement',
        paragraphs: [
          'The shipped Partner Central experience balances information density with clarity: consistent spacing, predictable components, and interaction patterns that scale from campaign setup through performance reporting.',
          'Surfaces were designed for real edge cases (multi-date ranges, OneKeyCash eligibility, unavailable metrics) so partners always understood what they configured and what they could expect in return.',
        ],
        screenStack: {
          position: 'below',
          items: [
            {
              src: expediaAcceleratorUiPerformanceDashboard,
              objectFit: 'contain',
              alt: 'Accelerator performance dashboard showing standard, OneKeyCash, and unavailable data states',
              title: 'Performance reporting',
              caption:
                'Three dashboard states: standard Accelerator, OneKeyCash overlay, and graceful handling when metrics are unavailable.',
            },
            {
              src: expediaAcceleratorUiMetricCards,
              objectFit: 'contain',
              alt: 'Sort order, page views, and search impressions metric cards with comparison to estimated performance without Accelerator',
              title: 'Impact at a glance',
              caption:
                'Modular metric cards with clear baselines so partners see lift versus running without Accelerator.',
            },
            {
              src: expediaAcceleratorUiCreateCalendar,
              objectFit: 'contain',
              alt: 'Create an Accelerator flow with stay date calendar picker and compensation preview chart',
              title: 'Create flow',
              caption:
                'Stay dates, blockouts, compensation preview, and launch review in a single guided setup path.',
            },
            {
              src: expediaAcceleratorUiStayDates,
              objectFit: 'contain',
              alt: 'Stay dates and blockout date fields with advanced visibility settings',
              title: 'Date and visibility controls',
              caption:
                'Structured inputs for stay windows, optional blockouts, and advanced visibility in one scannable form.',
            },
            {
              src: expediaAcceleratorUiRateSelection,
              objectFit: 'contain',
              alt: 'Rate plan and marketplace selection with radio hierarchy and helper copy',
              title: 'Rate plan and marketplace selection',
              caption:
                'Radio hierarchy, helper copy, and WCAG-aligned contrast for long-form decisions.',
            },
          ],
        },
      },
      {
        heading: 'Recognition and what’s next',
        paragraphs: [
          'CEO Ariane Gorin highlighted Accelerator as one of the company’s top-performing partner products at the Q1 2025 all-hands. The work was presented at an internal design summit and global partner forum, cited in QBR as a model for trust-first monetization, and reused as a template for next-gen partner tools.',
          'Behavioral design drove adoption beyond expectations; transparency mattered more than granular control for most partners; and data plus design had to move together to earn confidence. Next steps include predictive campaign insights, personalized suggestions from performance and market signals, and expanding Accelerator across email, retargeting, and in-app placements.',
        ],
      },
    ],
  },
  heroResults: {
    heading: 'Impact and outcomes',
    sectionLabel: 'Impact',
    metrics: [
      { value: '$300M', label: 'Gross Revenue' },
      { value: '5.4%', label: 'Average Margin Spend' },
      { value: '72.4K', label: 'Active Hotel Partners' },
    ],
  },
  impact: {
    heading: 'Impact and outcomes',
    metrics: [
      { value: '$300M', label: 'Gross Revenue' },
      { value: '5.4%', label: 'Average Margin Spend' },
      { value: '72.4K', label: 'Active Hotel Partners' },
    ],
  },
  roles: {
    strategy: [
      'UX strategy, behavioral design, and ideation',
      'Stakeholder alignment across product, engineering, CX, marketing, research, and content design',
      'Co-led product strategy with PM and engineering; quarterly planning advocacy',
    ],
    design: [
      'Campaign creation, performance dashboard, budget, and billing flows',
      'Experience principles: Transparent, Empowering, Easy-to-Start',
      'Figma, Miro, and internal design system delivery',
      'Usability testing across four global markets',
    ],
    content: [
      'Content strategy, terminology, and in-product education',
      'Localization across twelve languages',
      'Contextual tips and milestone-based guidance',
    ],
    development: [
      'WCAG AA accessibility from the start',
      'Prototyping, handoff, and design QA with engineering',
      'Reusable components for monetization tooling',
    ],
  },
  hidePagination: true,
  hideRelatedCaseStudies: true,
};
