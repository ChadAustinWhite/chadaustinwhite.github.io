import type { CaseStudyContent } from '../../components/case-study/types';
import {
  PLACEHOLDER_IMAGE_HERO,
  PLACEHOLDER_IMAGE_SECTION,
  PLACEHOLDER_IMAGE_SECTION_DUO,
  PLACEHOLDER_IMAGE_SECTION_WIDE,
  PLACEHOLDER_IMAGE_SECTION_WIDE_2,
  PLACEHOLDER_IMAGE_SUB,
  PLACEHOLDER_SONOS_PORTRAIT,
  PLACEHOLDER_SONOS_WIDE,
  PLACEHOLDER_SONOS_WIDE_SHORT,
  PLACEHOLDER_SONOS_WIDE_TALL,
} from '../../components/case-study/constants';
import merchantOnboardingHero from '../../../assets/worldpay-merchant-onboarding-card.png';

export const worldpayMerchantOnboardingContent: CaseStudyContent = {
  layout: 'sonos',
  title: 'Worldpay Merchant Onboarding',
  heroTitleLines: ['Worldpay', 'Merchant Onboarding'],
  meta: {
    organization: 'Worldpay',
    organizationNote:
      'Guided onboarding for new merchants — verification, compliance, and role-based access — so partners reach first transaction with clarity instead of confusion.',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '2024–2025',
  },
  tagline:
    'Turning a compliance-heavy sign-up maze into a guided journey merchants actually trust.',
  projectFocus: ['Fintech', 'B2B', 'Product'],
  sonos: {
    lead:
      'Worldpay helps businesses accept payments with confidence — across verification, compliance, and team access. Over twelve months, we helped Worldpay evolve merchant onboarding into a guided, transparent journey that stands apart from checklist-first competitors.',
    tags: ['Fintech', 'B2B', 'Product'],
    sections: [
      {
        heading: 'A digital foundation',
        paragraphs: [
          'Our work on merchant onboarding started with a simple question: could compliance feel as intentional as the rest of the product? We partnered with product, legal, and engineering to evaluate every step through sign-up, verification, and activation — starting with the merchant portal.',
          'We had a unique opportunity to align journey maps, interaction patterns, and UX writing at the same time. That level of collaboration is what makes the experience feel coherent: merchants always know where they are, what’s next, and what happens if something fails.',
        ],
        testimonial: {
          quote:
            'We made sure onboarding would work on our most complex brand experience — the path from first sign-up to first transaction.',
          name: 'Product leadership',
          role: 'Worldpay — Merchant onboarding',
        },
        image: { src: PLACEHOLDER_SONOS_PORTRAIT, variant: 'portrait' },
      },
      {
        heading: 'Simply clear',
        paragraphs: [
          'We built a messaging framework that positions each onboarding step in plain language, and let it influence layout, progress, and error recovery. Written and visual communication were simplified across the board — with persistent progress and chaptered flows that respect both novice and experienced operators.',
          'The typographic and spacing system creates a clear hierarchy across desktop and mobile, so dense policy content still feels scannable and actionable.',
          'A key breakthrough was pairing verification and document capture with status timelines merchants could trust — not a black box that ended in support calls.',
        ],
        testimonial: {
          quote:
            'Merchants finally see what we need from them — and what happens next — without making compliance feel like a dead end.',
          name: 'Lead UX',
          role: 'Worldpay',
        },
        image: { src: merchantOnboardingHero, variant: 'wide' },
      },
      {
        heading: 'Verification that communicates',
        paragraphs: [
          'Streamlining verification meant explicit next steps when documents or identity checks failed — human-readable reasons, timelines, and re-entry paths without exposing sensitive system logic.',
          'Camera-native capture, inline quality hints, and resilient empty states reduced resubmission loops while keeping standards intact.',
        ],
        image: { src: PLACEHOLDER_SONOS_WIDE_SHORT, variant: 'wideShort' },
      },
      {
        heading: 'Access for real teams',
        paragraphs: [
          'Role-based permissions are security-critical and cognitively hostile. We translated scopes into jobs merchants already use — owner, finance, operations — and showed consequences before confirmation.',
          'Invite flows, role edits, and audit-friendly summaries made team access legible for non-technical admins without dumbing down enforcement.',
        ],
        image: { src: PLACEHOLDER_SONOS_WIDE_TALL, variant: 'wideTall' },
      },
      {
        heading: 'Smart activation',
        paragraphs: [
          'Beyond screens, we influenced the merchant journey across email, portal, and support touchpoints — curating communication so activation feels like a single story.',
          'We leaned into post-sign-up engagement, directing merchants toward features that build confidence before the first transaction and reduce “where am I stuck?” escalations.',
        ],
        image: {
          src: PLACEHOLDER_SONOS_WIDE,
          variant: 'wide',
          caption:
            'We helped Worldpay reimagine how they guide new merchants — driving completion with clearer paths to activation and self-serve recovery.',
        },
      },
      {
        heading: 'Evolving onboarding',
        paragraphs: [
          'Iteration is a constant in regulated fintech. The new onboarding patterns are highly adaptable — unified progress, consistent headers, and orchestration copy that hides backend seams while platform teams consolidate services.',
          'Early cohorts showed stronger completion, faster time-to-activate, and fewer in-flow support escalations — signals that clarity compounds into revenue and trust.',
        ],
      },
    ],
  },
  firstBlockLabel: 'SITUATION',
  overview: {
    introHeadline: 'Situation',
    serviceList: [
      'Experience strategy',
      'Journey mapping',
      'UX research',
      'Interaction design',
      'Compliance UX',
      'Design systems',
      'UX writing',
    ],
    paragraphs: [
      'For years, new Worldpay merchants proved identity, business details, and team permissions across disconnected screens — dense legal copy and opaque verification states standing between them and their first transaction.',
      'Worldpay engaged us to elevate onboarding from a compliance checklist into a guided, luxuriously clear experience — from first sign-up through activation, with progress merchants can trust and errors they can recover from.',
    ],
    introBelowImage: {
      label: 'Zoom out',
      headline: 'Onboarding is where fintech earns trust',
      body:
        'Everyone sees the forms. The wider story is what happens next: faster activation means revenue sooner; clearer verification means less fraud exposure; calmer error recovery means fewer angry calls to support. We reframed onboarding as the first product experience — not an administrative prelude to the real product.',
      image: PLACEHOLDER_IMAGE_SECTION,
    },
  },
  heroIntro:
    'We rebuilt merchant onboarding as a single, guided journey — progress you can see, language you can act on, and verification that fails with dignity instead of mystery.',
  heroResults: {
    sectionLabel: 'Impact',
    heading: 'Impact and outcomes',
    sectionSubtitle:
      'Selective metrics with outsized qualitative impact — the “wow” test from stakeholder reviews and pilot cohorts.',
    imageAbove: PLACEHOLDER_IMAGE_SECTION_WIDE,
    imageBelowAbove: PLACEHOLDER_IMAGE_SECTION_WIDE_2,
    metrics: [
      { value: '+32%', label: 'Onboarding completion' },
      { value: '-40%', label: 'Time to activate' },
      { value: '-28%', label: 'Support escalations in flow' },
    ],
    gallery: [PLACEHOLDER_IMAGE_SUB, PLACEHOLDER_IMAGE_SUB, PLACEHOLDER_IMAGE_SUB],
  },
  heroWhyItMatters: true,
  heroDiscovery: {
    sectionLabel: 'Discovery',
    headline: 'What merchants—and the business—were really buying',
    sections: [
      {
        type: 'paragraph',
        text: 'Stakeholders assumed merchants wanted speed above all else. Research showed they wanted predictability: knowing what was required, why it was required, and what would happen if something failed.',
      },
      {
        type: 'numbered',
        number: '01',
        title: 'Compliance complexity',
        body: 'Regulatory requirements couldn’t be simplified away — but they could be sequenced, explained, and paired with recovery paths when documents or identity checks failed.',
      },
      {
        type: 'numbered',
        number: '02',
        title: 'Varied merchant profiles',
        body: 'Sole proprietors, franchises, and enterprise teams share one portal but not one mental model. The experience had to flex without fragmenting into separate products.',
      },
      {
        type: 'numbered',
        number: '03',
        title: 'Access control abstraction',
        body: 'Role-based permissions are security-critical and cognitively hostile. We translated “scopes” into jobs merchants already use: who can view payouts, who can manage users, who can sign agreements.',
      },
      {
        type: 'numbered',
        number: '04',
        title: 'Legacy orchestration',
        body: 'Multiple backend services owned slices of the journey. UX had to stitch coherent progress and messaging on top without waiting for a greenfield platform rewrite.',
      },
      {
        type: 'numbered',
        number: '05',
        title: 'Error state drama',
        body: 'A rejected document is an emotional moment — not a toast notification. We designed explicit next steps, timelines, and human-readable reasons without exposing sensitive system logic.',
      },
      {
        type: 'numbered',
        number: '06',
        title: 'Cross-functional velocity',
        body: 'Legal, compliance, operations, and engineering each held veto power. Structured design reviews and shared journey maps kept decisions moving without diluting standards.',
      },
    ],
  },
  heroBetweenDiscoveryAndResults: [...PLACEHOLDER_IMAGE_SECTION_DUO],
  images: merchantOnboardingHero,
  heroImageObjectFit: 'contain',
  approach: {
    paragraphs: [
      'We treated storytelling as a design material: every screen answers where am I, what’s next, and what happens if this goes wrong.',
      'Instead of a checklist disguised as a wizard, we built a chaptered flow — identity, business, verification, team access — with visible progress and contextual help that respects both novice and experienced operators.',
    ],
  },
  challenge: {
    heading: 'The Challenge',
    paragraphs: [
      'Merchants arrived ready to sell. The product greeted them with compliance — necessary, but presented as friction.',
      'Without a clear narrative, capable businesses abandoned onboarding, support absorbed explain-the-form work, and Worldpay paid the cost in delayed activation and eroded confidence.',
    ],
  },
  strategySections: [
    {
      category: 'Strategy',
      heading: 'Centering merchants in a compliance-first world',
      body: [
        'We mapped sign-up through first transaction and marked every moment merchants asked a human for help. Those peaks became design priorities.',
        'Compliance steps became scenes in a story: what we need, why it matters, how long it takes, and how to recover — turning abstract policy into actionable plot points.',
      ],
      image: PLACEHOLDER_IMAGE_SECTION,
      imageCaption: {
        heading: 'Journey map excerpt',
        paragraphs: [
          'Placeholder for end-to-end service blueprint highlighting verification spikes and support contact reasons.',
        ],
      },
    },
    {
      category: 'Design',
      heading: 'Designing access control people understand',
      body: [
        'We replaced permission jargon with role templates merchants recognize — owner, finance, operations — and showed consequences before confirmation.',
        'Invite flows, role edits, and audit-friendly summaries made security legible for non-technical admins without dumbing down enforcement.',
      ],
      image: PLACEHOLDER_IMAGE_SECTION,
      subsections: [
        {
          label: 'Flows',
          heading: 'Verification & document capture',
          body: [
            'Camera-native capture, inline quality hints, and status timelines reduced resubmission loops.',
            'When verification failed, merchants saw specific remediation — not a generic error code.',
          ],
          images: [PLACEHOLDER_IMAGE_SUB, PLACEHOLDER_IMAGE_SUB],
        },
      ],
    },
    {
      category: 'Design',
      heading: 'Working within legacy constraints',
      body: [
        'We shipped narrative wins on top of existing services: unified progress, consistent headers, resilient empty states, and orchestration copy that hid backend seams.',
        'Each release proved that clarity compounds — paving the way for deeper platform investment without waiting for perfect infrastructure.',
      ],
      image: PLACEHOLDER_IMAGE_SECTION,
    },
  ],
  rallyingCry: {
    heading: 'Onboarding as a promise, not a formality',
    paragraphs: [
      'The redesigned experience tells merchants what kind of partner Worldpay intends to be: rigorous where it must be, respectful everywhere else.',
      'For employers and product teams, the lesson is simple — in regulated domains, the best UX doesn’t remove rules; it makes people feel capable inside them.',
    ],
  },
  situation: {
    heading: 'Situation',
    paragraphs: [
      'Worldpay needed new merchants live faster without weakening compliance. The legacy onboarding path optimized for policy coverage, not comprehension.',
      'Our mandate: keep the guardrails, change the story.',
    ],
  },
  whyItMatters: {
    intro:
      'Onboarding is the moment a merchant decides whether Worldpay feels like infrastructure they can build on — or bureaucracy they have to endure. Get it wrong and you lose revenue before the first swipe.',
    cards: [
      {
        title: 'Merchant confidence',
        description:
          'Clear progress and plain language reduce anxiety before the first transaction — the emotional bar is as high as the technical one.',
      },
      {
        title: 'Risk & compliance',
        description:
          'Strong verification protects the network; opaque verification trains merchants to call support instead of self-serve.',
      },
      {
        title: 'Activation velocity',
        description:
          'Every day a qualified merchant stays in limbo is a day of lost processing volume — and a support ticket waiting to happen.',
      },
    ],
  },
  complications: {
    intro:
      'The obstacles were structural, not cosmetic — and each required a story-first response, not a skin-deep UI pass.',
    items: [
      {
        number: '01',
        title: 'Compliance complexity',
        description:
          'Translating regulatory requirements into merchant-facing copy demanded continuous partnership with legal and compliance — design led, policy informed.',
      },
      {
        number: '02',
        title: 'Varied merchant profiles',
        description:
          'Flows adapted to business type and documentation needs without multiplying into unmaintainable product variants.',
      },
      {
        number: '03',
        title: 'Access control design',
        description:
          'Balancing intuitive team management with strict security standards required prototypes with real admin personas, not hypothetical permission matrices.',
      },
      {
        number: '04',
        title: 'Legacy infrastructure',
        description:
          'Front-end coherence had to mask multi-service orchestration until platform teams could consolidate backends.',
      },
      {
        number: '05',
        title: 'Error state clarity',
        description:
          'Failures needed to feel recoverable — with timelines, human-readable reasons, and clear re-entry paths.',
      },
      {
        number: '06',
        title: 'Cross-team dependencies',
        description:
          'Weekly journey reviews and shared success metrics aligned product, engineering, compliance, and operations on outcomes, not outputs.',
      },
    ],
  },
  impact: {
    heading: 'Impact and Outcomes',
    intro:
      'Pilot and rollout cohorts showed completion rising, time-to-activate falling, and support volume shifting from “where am I stuck?” to product-led self-recovery.',
    metrics: [
      { value: '+32%', label: 'Onboarding completion' },
      { value: '-40%', label: 'Time to activate' },
      { value: '-28%', label: 'Support escalations in flow' },
    ],
  },
  uxEfforts: [
    {
      title: 'Onboarding journey mapping',
      description:
        'Service blueprint from marketing landing through first settlement, with emotional peaks, policy gates, and support triggers annotated for the team.',
      tags: ['Journey Mapping', 'Service Design', 'Stakeholder Workshops'],
      image: PLACEHOLDER_IMAGE_SUB,
      metric: { value: '40+', label: 'Journey touchpoints mapped' },
    },
    {
      title: 'Guided flows & verification',
      description:
        'Chaptered wizard with persistent progress, document capture, and verification timelines — designed for mobile-first merchants on the go.',
      tags: ['Interaction Design', 'Forms', 'Accessibility'],
      image: PLACEHOLDER_IMAGE_SUB,
      quote: '“I finally know what you need from me — and what happens next.”',
    },
    {
      title: 'Team access & roles',
      description:
        'Role templates, invite flows, and pre-commit summaries that make permissions legible before they are enforced.',
      tags: ['Information Architecture', 'UX Writing', 'Security UX'],
      image: PLACEHOLDER_IMAGE_SUB,
    },
  ],
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
    heading: 'Lessons learned',
    items: [
      {
        label: 'What worked well',
        text: 'Embedding compliance partners in design critiques early turned “no” into “not yet — here’s how we say it.” That shift saved rework and accelerated release.',
      },
      {
        label: "What we'd do differently",
        text: 'More moderated tests with first-time merchants in week one would have surfaced terminology debt before it shipped — especially around verification statuses.',
      },
      {
        label: 'Key takeaway',
        text: 'Great fintech storytelling zooms out: connect every field and checkpoint to time, money, and trust. When employers and PMs see that arc, design stops looking like polish and starts looking like strategy.',
      },
    ],
  },
};
