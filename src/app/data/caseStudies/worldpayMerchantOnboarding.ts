import type { CaseStudyContent } from '../../components/case-study/types';
import payrixOnboardingImage from '../../../assets/d37a1587dc67bf7c157730c623efab0af7f1c1e7.png';

export const worldpayMerchantOnboardingContent: CaseStudyContent = {
  title: 'Worldpay Merchant Onboarding',
  meta: {
    organization: 'Worldpay',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '2024–2025',
  },
  tagline:
    'Redesigning the merchant onboarding experience to reduce time-to-activation, enforce security compliance, and give partners confidence from day one.',
  images: payrixOnboardingImage,
  situation: {
    heading: 'Situation',
    paragraphs: [
      'Merchants onboarding to Worldpay faced a fragmented, high-friction experience that lacked clear guidance on access control, identity verification, and security compliance requirements.',
      'The existing flow resulted in significant drop-off and a high volume of support escalations, delaying merchant activation and creating compliance risk for the platform.',
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
