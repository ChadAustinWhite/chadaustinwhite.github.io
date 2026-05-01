import type { CaseStudyContent } from '../../components/case-study/types';
import disputesHeroImage from '../../../assets/worldpay-merchant-onboarding.png';

export const worldpayMerchantOnboardingContent: CaseStudyContent = {
  title: 'Worldpay Disputes Experience',
  meta: {
    organization: 'Worldpay',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '2024–2025',
  },
  tagline:
    'Redesigning the merchant onboarding experience to reduce time-to-activation, enforce security compliance, and give partners confidence from day one.',
  projectFocus: ['Fintech', 'B2B', 'Compliance'],
  uxEfforts: [
    {
      title: 'Onboarding journey mapping',
      description:
        'Mapped end-to-end onboarding from sign-up through verification to identify drop-off points and reframe compliance steps as a guided narrative.',
      tags: ['Journey Mapping', 'UX Research', 'Compliance'],
    },
    {
      title: 'Guided flows & verification',
      description:
        'Redesigned verification and document capture so merchants see clear progress and get actionable feedback without exposing sensitive system logic.',
      tags: ['Interaction Design', 'Forms', 'Accessibility'],
      quote: 'Clear, guided flows that make compliance feel straightforward.',
    },
  ],
  statement:
    'Worldpay Disputes Experience — A dashboard that surfaces case strength, deadlines, and next steps so merchants can respond with clarity and confidence.',
  heroIntro:
    'We rebuilt Worldpay’s merchant onboarding journey from the ground up, turning a fragmented, compliance-heavy process into a guided experience that feels clear, secure, and fast.',
  images: disputesHeroImage,
  heroImageObjectFit: 'contain',
  heroIntrinsicWidthPx: 1024,
  heroIntrinsicHeightPx: 575,
  challenge: {
    heading: 'The Challenge',
    paragraphs: [
      'New merchants encountered a maze of forms, document requests, and unclear requirements — all in the name of compliance, but at the expense of clarity.',
      'The result was avoidable drop-off, delayed activations, and a heavy support burden as teams stepped in to explain what the product itself should have made obvious.',
    ],
  },
  narrativeSections: [
    {
      heading: 'Centering merchants in a compliance-first world',
      body: [
        'We started by mapping the end-to-end onboarding journey, from initial sign-up through verification and first transaction, to understand where friction and confusion spiked.',
        'By reframing compliance steps as part of a guided narrative — not just a checklist — we gave merchants a clearer sense of progress and purpose at every stage.',
      ],
    },
    {
      heading: 'Designing intuitive access control',
      body: [
        'Role-based access can quickly become abstract for non-technical users. We translated complex permission structures into approachable language and patterns.',
        'Merchants now configure who can do what through flows that mirror how they think about their own teams, reducing errors and helping security feel like a feature, not a hurdle.',
      ],
    },
    {
      heading: 'Working within legacy constraints',
      body: [
        'The experience had to sit on top of existing infrastructure. Rather than fight those constraints, we used them to prioritize what would deliver the most value fastest.',
        'We layered clearer messaging, resilient error states, and thoughtful orchestration over legacy systems, proving impact while paving the way for deeper technical investment.',
      ],
    },
  ],
  rallyingCry: {
    heading: 'Onboarding as a promise, not a formality',
    paragraphs: [
      'Worldpay’s onboarding is now a statement about the kind of partner merchants can expect — one that values clarity, security, and momentum equally.',
      'The redesigned journey sets a new bar for how regulated products can welcome new customers: by making compliance feel like confidence, not compromise.',
    ],
  },
  whyItMatters: {
    intro:
      "First impressions in fintech are everything. A merchant's onboarding experience directly shapes their long-term trust in the platform — and compliance failures at onboarding can have serious downstream consequences.",
    cards: [
      {
        title: 'Merchant Confidence',
        description:
          'A clear, guided onboarding flow reduces uncertainty and builds trust with merchants before they process their first transaction.',
      },
      {
        title: 'Security & Compliance',
        description:
          'Properly enforced access controls and identity verification protect both merchants and the platform from fraud and regulatory risk.',
      },
      {
        title: 'Activation Velocity',
        description:
          'Reducing onboarding friction accelerates time-to-revenue for merchants and decreases operational burden on support teams.',
      },
    ],
  },
  complications: {
    intro:
      'A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with perseverance and flexibility.',
    items: [
      {
        number: '01',
        title: 'Compliance Complexity',
        description:
          'Translating dense regulatory requirements into a clear, user-friendly interface required close collaboration with legal and compliance teams throughout the design process.',
      },
      {
        number: '02',
        title: 'Varied Merchant Profiles',
        description:
          'Onboarding flows needed to accommodate sole proprietors, small businesses, and enterprise merchants — each with distinct documentation and verification needs.',
      },
      {
        number: '03',
        title: 'Access Control Design',
        description:
          'Designing role-based permissions that were intuitive for non-technical merchants while meeting strict security standards was a significant UX challenge.',
      },
      {
        number: '04',
        title: 'Legacy Infrastructure',
        description:
          'The onboarding flow sat on top of aging backend systems that constrained certain interaction patterns and required creative workarounds to improve the front-end experience.',
      },
      {
        number: '05',
        title: 'Error State Clarity',
        description:
          'Verification failures and document rejections needed to communicate clearly without alarming merchants or exposing sensitive system logic.',
      },
      {
        number: '06',
        title: 'Cross-Team Dependencies',
        description:
          'Coordinating design decisions across product, engineering, compliance, and operations teams required structured alignment rituals to maintain momentum.',
      },
    ],
  },
  impact: {
    heading: 'Impact and Outcomes',
    intro:
      'The redesigned onboarding experience reduced drop-off, improved compliance pass rates, and decreased support escalations during the activation process.',
    metrics: [
      { value: '—', label: 'Metric Coming Soon' },
      { value: '—', label: 'Metric Coming Soon' },
      { value: '—', label: 'Metric Coming Soon' },
    ],
  },
  roles: {
    design: [
      'End-to-end journey mapping and service design',
      'Interaction and flow design for onboarding and verification',
      'Error state and recovery experience design',
    ],
    strategy: [
      'Alignment across product, compliance, and operations',
      'Prioritization of high-impact improvements within technical constraints',
    ],
    content: [
      'UX writing for requirements, guidance, and error messaging',
      'Framing complex compliance steps in approachable language',
    ],
    development: [
      'Partnering with engineering on orchestration and technical limitations',
      'Design QA across environments and edge cases',
    ],
  },
  reflections: {
    heading: 'Lessons Learned',
    items: [
      {
        label: 'What Worked Well',
        text: 'Embedding compliance requirements into the design process early — rather than treating them as a final review gate — prevented costly rework and accelerated delivery.',
      },
      {
        label: "What We'd Do Differently",
        text: 'More usability testing with first-time merchants early in the process would have surfaced language and terminology issues before they reached development.',
      },
      {
        label: 'Key Takeaway',
        text: "In regulated industries, great UX doesn't simplify away compliance — it makes compliance feel natural. The goal is to guide merchants through requirements with confidence, not around them.",
      },
    ],
  },
};
