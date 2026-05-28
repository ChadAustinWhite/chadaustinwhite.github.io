import { SONOS_SCREENSHOT_MAX_WIDTH_PX } from '../../components/case-study/constants';
import type { CaseStudyContent, CaseStudySonosImage } from '../../components/case-study/types';
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
import expediaAcceleratorHookModel from '../../../assets/expedia-accelerator-hook-model.png';
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
import expediaAcceleratorUiSearchImpressions from '../../../assets/expedia-accelerator-ui-search-impressions.png';

/** Full-width process image below a narrative section. */
const processImage = (
  src: string,
  options: {
    variant?: 'wide' | 'wideShort' | 'wideTall';
    title?: string;
    caption?: string;
    alt?: string;
    fitContent?: boolean;
  } = {},
): CaseStudySonosImage => ({
  src,
  variant: options.variant ?? 'wideShort',
  padded: true,
  background: 'none',
  objectFit: 'contain',
  fitContent: options.fitContent ?? true,
  intrinsicWidthPx: SONOS_SCREENSHOT_MAX_WIDTH_PX,
  title: options.title,
  caption: options.caption,
  alt: options.alt,
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
    narrativeLayout: 'editorial',
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
        phase: 'Empathize',
        heading: 'Why it matters',
        layout: 'editorial',
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
        image: processImage(expediaAcceleratorPartnerCentral, {
          title: 'Partner Central at scale',
          caption:
            'The performance and campaign surfaces partners rely on every day — the starting point for understanding their mental model.',
          alt: 'Partner Central performance and campaign management',
        }),
      },
      {
        phase: 'Empathize',
        heading: 'Listening to hotel partners',
        layout: 'editorial',
        paragraphs: [
          'Post-launch evaluative research grounded the program in how partners actually use Accelerator — not how we assumed they would. Live sessions and synthesis workshops surfaced trust, literacy, and transparency as the through-line.',
        ],
        imageSequence: [
          processImage(expediaAcceleratorCollaborationPlanning, {
            title: 'Planning as a team',
            caption:
              'Cross-functional working sessions aligned research questions and partner criteria across time zones.',
            alt: 'Zoom working session reviewing the Q3 Accelerator study plan with the full team',
          }),
          processImage(expediaAcceleratorUserTesting, {
            title: 'Live partner sessions',
            caption:
              'Usability testing alongside Miro synthesis so insights fed directly into the next design iteration.',
            alt: 'Live user testing session alongside Miro research synthesis',
          }),
          processImage(expediaAcceleratorPartnerResearch, {
            title: 'Qualitative depth',
            caption: 'Partner interviews captured hesitation, literacy gaps, and what “pay-after-success” needed to mean.',
            alt: 'Partner research session notes and synthesis',
          }),
        ],
      },
      {
        phase: 'Define',
        heading: 'Project complications',
        layout: 'editorial',
        paragraphs: [
          'Before we could optimize flows, we had to name the constraints: legacy systems, cross-team dependencies, technical limits, and partners who were unsure whether Accelerator drove their results.',
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
        image: processImage(expediaAcceleratorStudyOverview, {
          title: 'Evaluative study brief',
          caption:
            'Aligned research, CX, and design on recruitment, sessions, and goals before post-launch partner interviews.',
          alt: 'UR brief outlining study dates, recruitment criteria, and interview methodology',
        }),
      },
      {
        phase: 'Define',
        heading: 'Defining what success looks like',
        layout: 'editorial',
        paragraphs: [
          'We anchored the program around measurable outcomes — accessibility, partner confidence, engagement, adoption, retention, and task success — so design decisions had a shared scorecard.',
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
        imageSequence: [
          processImage(expediaAcceleratorDataAnalysis, {
            variant: 'wide',
            title: 'Quantitative signals',
            caption: 'Transaction analysis validated where partners struggled and where Accelerator showed lift.',
            alt: 'Excel transaction analysis reviewed alongside partner performance data',
          }),
          processImage(expediaAcceleratorResearchBrief, {
            title: 'Structured discovery',
            caption:
              'Discussion guides kept interviews focused on Accelerator usage, OneKeyCash perception, and prototype walkthroughs.',
            alt: 'XLR and OneKeyCash study plan with structured interview sections',
          }),
        ],
      },
      {
        phase: 'Discover',
        heading: 'Synthesizing partner feedback',
        layout: 'editorial',
        paragraphs: [
          'Affinity mapping turned hours of partner conversations into themes, opportunities, and priorities the whole squad could act on — bridging research and design without losing nuance.',
        ],
        image: processImage(expediaAcceleratorAffinityMapping, {
          title: 'Synthesis workshop',
          caption:
            'Clustered findings on Miro to connect partner quotes to concrete product and UX opportunities.',
          alt: 'Miro affinity map clustering partner research findings',
        }),
      },
      {
        phase: 'Ideate',
        heading: 'Product strategy foundations',
        layout: 'editorial',
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
        image: processImage(expediaAcceleratorHookModel, {
          variant: 'wide',
          title: 'Hook model for partner habits',
          caption:
            'Mapped triggers, actions, variable rewards, and investment so Accelerator felt trustworthy and repeatable — not a one-off ad buy.',
          alt: 'Hook model diagram for Accelerator partner journey',
        }),
      },
      {
        phase: 'Ideate',
        heading: 'Exploring flows in Figma',
        layout: 'editorial',
        paragraphs: [
          'Ideation paired behavioral framing with concrete UI explorations — campaign setup, OneKeyCash eligibility, and performance reporting — before we committed to hi-fi.',
        ],
        imageSequence: [
          processImage(expediaAcceleratorIdeationFigma, {
            title: 'Figma exploration',
            caption: 'Campaign setup and performance patterns explored with PM, research, and engineering in the loop.',
            alt: 'Figma ideation boards for Accelerator flows',
          }),
          processImage(expediaAcceleratorOneKeyCashHypothesis, {
            title: 'OneKeyCash hypotheses',
            caption:
              'Alternative Create an Accelerator paths tested how partners understood exclusive promotions and compensation.',
            alt: 'OneKeyCash design explorations and Create an Accelerator hypothesis screens',
          }),
        ],
      },
      {
        phase: 'Prototype',
        heading: 'From audit to iteration',
        layout: 'editorial',
        paragraphs: [
          'We audited existing Partner Central patterns, sketched low-fidelity flows, and iterated in Figma while reviewing partner transaction data — design and evidence moving together.',
        ],
        imageSequence: [
          processImage(expediaAcceleratorMiroAudit, {
            title: 'UX audit synthesis',
            caption: 'XLR and OneKeyCash flows mapped on Miro to find gaps before rebuilding in the design system.',
            alt: 'XLR and OneKeyCash UX audit synthesis on a Miro board',
          }),
          processImage(expediaAcceleratorLofiWireframe, {
            title: 'Low-fidelity structure',
            caption: 'Early wireframes validated information hierarchy before visual polish.',
            alt: 'Low-fidelity Accelerator wireframes',
          }),
          processImage(expediaAcceleratorDataIteration, {
            title: 'Data-informed iteration',
            caption:
              'Partner transaction data reviewed alongside successive prototypes to validate direction.',
            alt: 'Excel transaction analysis reviewed in Zoom alongside successive Figma prototypes',
          }),
        ],
      },
      {
        phase: 'Test',
        heading: 'Validation with partners',
        layout: 'editorial',
        paragraphs: [
          'Usability testing across global markets, synthesis readouts, and design critique kept partners at the center as flows hardened — especially around OneKeyCash and campaign setup edge cases.',
        ],
        imageSequence: [
          processImage(expediaAcceleratorUsabilitySynthesis, {
            title: 'Usability synthesis',
            caption: 'Successes and opportunities from OneKeyCash testing distilled for the squad.',
            alt: 'Usability testing synthesis: successes and opportunities for OneKeyCash',
          }),
          processImage(expediaAcceleratorPrototype3Synthesis, {
            title: 'Prototype 3 readout',
            caption: 'Third-round testing highlighted remaining friction before engineering handoff.',
            alt: 'Prototype 3 usability synthesis: successes and opportunities',
          }),
          processImage(expediaAcceleratorDesignCritique, {
            title: 'Design critique',
            caption: 'Cross-functional critique pressure-tested flows before build.',
            alt: 'Design critique session reviewing Accelerator flows',
          }),
        ],
      },
      {
        phase: 'Deliver',
        heading: 'Design system alignment',
        layout: 'editorial',
        paragraphs: [
          'We bridged legacy Partner Central patterns with the shared FDS library so new Accelerator surfaces scaled across brands without one-off UI debt.',
        ],
        image: processImage(expediaAcceleratorDesignSystem, {
          title: 'FDS in Figma',
          caption: 'Components, tokens, and variables kept campaign and reporting UI consistent with the platform.',
          alt: 'FDS component library and variables in Figma',
        }),
      },
      {
        phase: 'Deliver',
        heading: 'Interface refinement',
        layout: 'editorial',
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
              src: expediaAcceleratorUiRateSelection,
              objectFit: 'contain',
              alt: 'Rate plan and marketplace selection with radio hierarchy and helper copy',
              title: 'Rate plan and marketplace selection',
              caption:
                'Radio hierarchy, helper copy, and WCAG-aligned contrast for long-form decisions.',
            },
            {
              src: expediaAcceleratorUiStayDates,
              objectFit: 'contain',
              alt: 'Create an Accelerator stay dates, blockout dates, and advanced visibility settings',
              title: 'Date and visibility controls',
              caption:
                'Structured inputs for stay windows, optional blockouts, and advanced visibility in one scannable form.',
            },
            {
              src: expediaAcceleratorUiSearchImpressions,
              objectFit: 'contain',
              alt: 'Search impressions performance chart with Accelerator lift, blackout dates, and rate plan breakdown',
              title: 'Search impressions and rate plan performance',
              caption:
                'Partners compare estimated versus Accelerator-driven impressions over time, then drill into revenue, room nights, and bookings by rate plan.',
            },
          ],
        },
      },
      {
        phase: 'Impact',
        heading: 'Recognition and what’s next',
        layout: 'editorial',
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
