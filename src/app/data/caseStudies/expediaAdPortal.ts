import type { CaseStudyContent } from '../../components/case-study/types';
import expediaAdPortalImage from '../../../assets/b49c7b7ab770e07828d62a9294af1b3f992959ec.png';

export const expediaAdPortalContent: CaseStudyContent = {
  title: 'Expedia Group Ad Portal',
  meta: {
    organization: 'Expedia Group',
    role: 'Lead UX Designer',
    year: '2025',
    duration: '2025',
  },
  tagline:
    'Enabling advertising partners to manage campaigns and payments through a unified, modern portal built for scale and clarity.',
  projectFocus: ['Travel', 'B2B', 'Advertising'],
  uxEfforts: [
    {
      title: 'Partner workflow & portal IA',
      description:
        'Unified campaign management, billing, and payment history into a single portal so partners have one source of truth for spend, performance, and payments.',
      tags: ['Information Architecture', 'Workflow Design', 'Stakeholder Alignment'],
    },
    {
      title: 'Billing & payment flows',
      description:
        'Designed clear billing and payment management flows with explicit error states and reconciliation views to reduce support load and build partner trust.',
      tags: ['UX Design', 'Forms & Validation', 'Design Systems'],
    },
  ],
  statement:
    'Expedia Group Ad Portal — A unified, modern portal for advertising partners to manage campaigns, payments, and performance with confidence.',
  heroIntro:
    'We brought fragmented advertising tools together into a single portal so partners can manage campaigns, payments, and performance with confidence — all in one place.',
  images: expediaAdPortalImage,
  challenge: {
    heading: 'The Challenge',
    paragraphs: [
      'Advertising partners were forced to stitch together multiple tools to understand spend, performance, and billing — each with its own interaction patterns and mental model.',
      'This fragmentation created friction, reduced trust, and made it difficult for partners to take decisive action on their campaigns or plan future investment.',
    ],
  },
  narrativeSections: [
    {
      heading: 'Creating a single source of truth',
      body: [
        'We aligned stakeholders across product, finance, legal, and advertising to define what a unified portal needed to own from day one.',
        'The resulting experience centralizes campaign management, billing, and payment history so partners no longer have to guess where to look or who to contact to get answers.',
      ],
    },
    {
      heading: 'Designing for diverse partner workflows',
      body: [
        'From independent advertisers to large agencies, partners bring very different expectations to the same interface. The portal had to flex without becoming complex.',
        'We grounded the information architecture, navigation, and key flows in real partner scenarios, ensuring that core tasks — like adjusting budgets or resolving billing issues — feel fast and intuitive for everyone.',
      ],
    },
    {
      heading: 'Building on an evolving system',
      body: [
        'The portal became an important expression of Expedia’s design system. We worked closely with the platform team to adopt emerging components and patterns while feeding learnings back into the system.',
        'This collaboration kept the experience feeling fresh and cohesive across the broader ecosystem, and made it easier to ship future enhancements with confidence.',
      ],
    },
  ],
  rallyingCry: {
    heading: 'A foundation for long-term partnership',
    paragraphs: [
      'By giving partners a clear, governed view of their campaigns and billing, the Ad Portal reframes the relationship from transactional to strategic.',
      'The work sets a new baseline for how Expedia shows up for advertisers — as a transparent, reliable partner invested in helping them grow.',
    ],
  },
  whyItMatters: {
    intro:
      'A well-designed ad portal directly influences partner confidence and spend. When partners can easily manage campaigns and understand performance, they invest more — driving mutual growth for Expedia and its advertising ecosystem.',
    cards: [
      {
        title: 'Partner Efficiency',
        description:
          'Partners expect self-serve tools that reduce dependency on support teams and allow real-time campaign adjustments without friction.',
      },
      {
        title: 'Revenue Growth',
        description:
          'Simplified campaign and payment management reduces drop-off and encourages partners to increase their advertising investment on the platform.',
      },
      {
        title: 'Trust & Transparency',
        description:
          'Clear billing and payment visibility builds trust with partners, reducing disputes and strengthening long-term advertiser relationships.',
      },
    ],
  },
  complications: {
    intro:
      'A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with perseverance and flexibility.',
    items: [
      {
        number: '01',
        title: 'Fragmented Systems',
        description:
          'Campaign and payment data lived across multiple disconnected systems, requiring careful orchestration to surface the right information in a unified view.',
      },
      {
        number: '02',
        title: 'Diverse Partner Needs',
        description:
          'Partners ranged from small independent advertisers to large agency buyers, each with distinct workflows and expectations for the portal.',
      },
      {
        number: '03',
        title: 'Access Control Complexity',
        description:
          'Defining role-based permissions for multi-user accounts required careful UX planning to avoid confusion while maintaining security compliance.',
      },
      {
        number: '04',
        title: 'Design System Alignment',
        description:
          "Aligning the portal's visual language with Expedia's evolving design system required close collaboration with the platform team to ensure consistency.",
      },
      {
        number: '05',
        title: 'Payment Edge Cases',
        description:
          'Handling failed payments, refunds, and billing disputes introduced complex states that had to be communicated clearly without overwhelming the interface.',
      },
      {
        number: '06',
        title: 'Stakeholder Alignment',
        description:
          'Balancing input from finance, product, legal, and advertising teams while keeping the experience simple and actionable for partners required ongoing negotiation.',
      },
    ],
  },
  impact: {
    heading: 'Impact and Outcomes',
    intro:
      'The Ad Portal streamlined campaign and payment management for advertising partners, reducing friction and increasing engagement across the platform.',
    metrics: [
      { value: '—', label: 'Metric Coming Soon' },
      { value: '—', label: 'Metric Coming Soon' },
      { value: '—', label: 'Metric Coming Soon' },
    ],
  },
  roles: {
    design: [
      'Information architecture and navigation design',
      'Interface design for campaigns, billing, and payments',
      'Design system adoption and pattern definition',
    ],
    strategy: [
      'Partner workflow mapping across advertiser segments',
      'Portal positioning within the broader product ecosystem',
    ],
    content: [
      'Interface copy for billing, payments, and error states',
      'Narrative framing for spend, performance, and value',
    ],
    development: [
      'Collaboration with engineering on state handling and edge cases',
      'Design QA across complex billing scenarios',
    ],
  },
  reflections: {
    heading: 'Lessons Learned',
    items: [
      {
        label: 'What Worked Well',
        text: 'Early alignment on permission models and user roles helped the team move quickly through design decisions without backtracking on core architecture.',
      },
      {
        label: "What We'd Do Differently",
        text: "More upfront research with mid-market advertisers would have surfaced nuanced workflows earlier and reduced the number of late-stage design pivots.",
      },
      {
        label: 'Key Takeaway',
        text: "Effective ad management tools prioritize transparency and control. Partners don't just want to launch campaigns — they want confidence that their investment is being managed well.",
      },
    ],
  },
};
