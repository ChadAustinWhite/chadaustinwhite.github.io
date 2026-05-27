import type { CaseStudyContent } from '../../components/case-study/types';
import {
  PLACEHOLDER_SONOS_PORTRAIT,
  PLACEHOLDER_SONOS_WIDE,
  PLACEHOLDER_SONOS_WIDE_SHORT,
} from '../../components/case-study/constants';
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

/** Instrument-style section break: wide landscape left, portrait right, gutter-padded. */
const sonosDuoPlaceholder = (
  primary: string = PLACEHOLDER_SONOS_WIDE_SHORT,
  primaryVariant: 'wide' | 'wideShort' = 'wideShort',
  secondary: string = PLACEHOLDER_SONOS_PORTRAIT,
) => ({
  display: 'duo' as const,
  src: primary,
  variant: primaryVariant,
  duoSecondary: { src: secondary, variant: 'portrait' as const },
  padded: true,
  background: 'none' as const,
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
          'Empowering hotel partners across all Expedia entities to unlock stronger connections with travelers by helping them appear higher in search results.',
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
          position: 'above',
          rows: [
            {
              cells: [
                {
                  src: PLACEHOLDER_SONOS_WIDE_SHORT,
                  size: 'large',
                  aspect: 'landscape',
                  alt: '',
                  title: 'Partner Central overview',
                  caption: 'Placeholder for Accelerator performance and market context.',
                },
                {
                  src: PLACEHOLDER_SONOS_PORTRAIT,
                  size: 'small',
                  aspect: 'portrait',
                  alt: '',
                  title: 'Campaign setup',
                  caption: 'Placeholder for create-flow and configuration screens.',
                },
              ],
            },
            {
              cells: [
                {
                  src: PLACEHOLDER_SONOS_WIDE_SHORT,
                  size: 'small',
                  aspect: 'landscape',
                  alt: '',
                  title: 'Research synthesis',
                  caption: 'Placeholder for usability and testing artifacts.',
                },
                {
                  src: PLACEHOLDER_SONOS_PORTRAIT,
                  size: 'large',
                  aspect: 'portrait',
                  alt: '',
                  title: 'OneKeyCash exploration',
                  caption: 'Placeholder for hypothesis and prototype screens.',
                },
              ],
            },
            {
              cells: [
                {
                  src: PLACEHOLDER_SONOS_WIDE,
                  size: 'large',
                  aspect: 'landscape',
                  alt: '',
                  title: 'Cross-product journey',
                  caption: 'Placeholder for interdependencies across partner tools.',
                },
                {
                  src: PLACEHOLDER_SONOS_WIDE_SHORT,
                  size: 'small',
                  aspect: 'landscape',
                  alt: '',
                  title: 'Legacy system constraints',
                  caption: 'Placeholder for design system and technical limitation context.',
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
        image: sonosDuoPlaceholder(PLACEHOLDER_SONOS_WIDE, 'wide'),
      },
      {
        heading: 'Product strategy foundations',
        paragraphs: [
          'We grounded the experience in behavioral insights and usability heuristics while aligning teams around a shared definition of partner and business success.',
        ],
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
        image: sonosDuoPlaceholder(),
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
          ...sonosDuoPlaceholder(PLACEHOLDER_SONOS_WIDE, 'wide'),
          caption:
            'We helped partners reimagine pay-after-success advertising, driving adoption with transparency, behavioral design, and clear performance storytelling.',
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
