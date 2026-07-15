import type { CaseStudyInstrumentContent } from '../../components/case-study/types';
import worldpayDisputesPerformance from '../../../assets/worldpay-disputes-experience.png';
import worldpayDisputeDashboardOverview from '../../../assets/worldpay-dispute-dashboard-overview.png';
import worldpayDisputeOptOutOverview from '../../../assets/worldpay-dispute-opt-out-overview.png';
import worldpayDisputeCaseWon from '../../../assets/worldpay-dispute-case-won.png';
import worldpayDisputeSettings from '../../../assets/worldpay-dispute-settings.png';
import worldpayDisputeDisableModal from '../../../assets/worldpay-dispute-disable-modal.png';

/** Instrument-style narrative for Worldpay Dispute Defender. */
export const worldpayDisputeDefenderInstrument: CaseStudyInstrumentContent = {
  clientName: 'Worldpay Dispute Defender',
  projectName: 'Dispute Defender',
  breadcrumb: 'Worldpay Dispute Defender',
  tags: ['Fintech', 'B2B', 'Product'],
  lead:
    'The leaky faucet: disputes are a hidden operational tax on merchants. A dripping faucet may seem insignificant at first, but over time the wasted water adds up.',
  leadImages: [
    {
      src: worldpayDisputesPerformance,
      alt: 'Worldpay Dispute Defender — performance summary with sales protected, time saved, and disputes handled',
      objectFit: 'contain',
      background: 'page',
    },
  ],
  chapters: [
    {
      title: 'Why It Matters',
      lead: [
        'Every day, merchants are focused on running their businesses: serving customers, managing operations, and driving growth. The last thing they need is another complex operational burden: navigating disputes.',
        'For many merchants, especially smaller businesses, disputes are not a workflow problem; they are a capacity problem.',
      ],
      metrics: [
        { value: '26.95%', label: 'Merchant response rate before service' },
        { value: '13.78%', label: 'Win rate before service' },
      ],
      metricsVariant: 'highlight',
      metricsPosition: 'afterLead',
      metricsEyebrow: 'Baseline before Dispute Defender',
      chapterVisual: 'merchant-dispute-emotion-map',
      subsections: [],
      stackedImagesWidth: 'bleed',
      stackedImagesLayout: 'carousel',
      stackedImagesAutoRotate: true,
      stackedImages: [
        {
          src: worldpayDisputeDashboardOverview,
          alt: 'Worldpay Disputes dashboard overview with dispute list, filters, and Dispute Defender banner',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: worldpayDisputeCaseWon,
          alt: 'Dispute case detail showing Won outcome, progress timeline, and dispute summary',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: worldpayDisputeSettings,
          alt: 'Disputes settings with Dispute Defender and notifications toggles enabled',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: worldpayDisputeDisableModal,
          alt: 'Disable Dispute Defender confirmation modal with billing and intervention notice',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: worldpayDisputesPerformance,
          alt: 'Dispute Defender performance summary modal showing protected sales, time saved, and disputes handled',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: worldpayDisputeOptOutOverview,
          alt: 'Disputes overview after opting out of Dispute Defender, with loss warning banner and dispute list',
          objectFit: 'contain',
          background: 'page',
        },
      ],
    },
    {
      title: 'Project complications',
      lead:
        'A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with perseverance and flexibility.',
      subsections: [],
      accordion: [
        {
          title: 'Dispute literacy',
          body: 'Merchants and internal operators often lacked a shared vocabulary for dispute stages, reason codes, and evidence requirements — making automation feel risky until the experience explained each step.',
        },
        {
          title: 'Legacy workflows',
          body: 'Manual review queues, spreadsheet exports, and fragmented status updates meant automation had to earn trust incrementally without breaking compliance or audit trails.',
        },
        {
          title: 'Multi-stakeholder alignment',
          body: 'Balancing risk, operations, customer success, and product priorities while keeping the design system consistent across merchant portal surfaces.',
        },
        {
          title: 'Evidence complexity',
          body: 'Dispute outcomes depend on timely, complete evidence packages. The UX had to guide merchants through submission without exposing sensitive backend logic.',
        },
        {
          title: 'Performance visibility',
          body: 'Leaders needed roll-up metrics — protected revenue, time saved, disputes handled — while operators still needed drill-down detail for individual cases.',
        },
        {
          title: 'Cross-team velocity',
          body: 'Risk, engineering, and design spanned multiple time zones. Shared journey maps and weekly design critiques kept decisions moving without diluting standards.',
        },
      ],
    },
    {
      title: 'From manual triage to automated defense',
      chapterDemo: 'dispute-defender-table-modal',
      lead:
        'We paired qualitative merchant interviews with dispute-volume and win-rate data to define where automation could safely take over, and where human review still earned its place.',
      subsections: [
        {
          title: 'Clarity before automation',
          bullets: [
            'Before scaling auto-resolution, we redesigned how merchants see dispute status, deadlines, and recommended actions. Plain-language summaries replaced reason-code jargon so operators could trust what the system was doing on their behalf.',
            'Performance roll-ups, including protected sales, time saved, and disputes handled, gave leadership a single view of program impact while preserving case-level detail for operators who needed it.',
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
            'Dispute Defender automated high-volume dispute handling at scale, reducing manual triage while giving merchants a clearer picture of protected revenue and program performance.',
            'The performance summary became a trust anchor: operators could see outcomes in one place instead of reconciling exports, emails, and portal tabs.',
          ],
        },
      ],
      metrics: [
        { value: '$44.6M', label: 'Protected revenue annually' },
        { value: '147K', label: 'Disputes automated per month' },
      ],
      testimonial: {
        quote:
          'Merchants needed to see that disputes were being handled, not just that automation existed. When performance was visible and language was plain, adoption followed.',
        name: 'Product leadership',
        role: 'Worldpay — Dispute operations',
      },
    },
    {
      title: 'Reflecting on the journey and key lessons learned.',
      subsections: [],
      accordion: [
        {
          title: 'What worked well',
          body: 'Pairing automation with transparent status and outcome summaries helped merchants adopt Dispute Defender without feeling they had lost control of chargeback workflows.',
        },
        {
          title: "What we'd do differently",
          body: 'Earlier moderated testing with operators handling high dispute volume would have surfaced edge cases in evidence submission and status copy before broader rollout.',
        },
        {
          title: 'Key takeaway',
          body: 'In regulated fintech, automation earns trust when the product narrates what happened, what is protected, and what to do next — not when it hides complexity behind a black box.',
        },
      ],
    },
  ],
  closing: {
    paragraphs: [
      'Dispute Defender is an ongoing platform bet: as dispute patterns evolve, the experience must keep connecting automation, evidence guidance, and performance visibility so merchants feel defended — not deflected.',
    ],
  },
};
