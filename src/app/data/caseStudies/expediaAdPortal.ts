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
  images: expediaAdPortalImage,
  situation: {
    heading: 'Situation',
    paragraphs: [
      'Advertising partners needed a centralized platform to manage their campaigns, budgets, and payment profiles — but existing tooling was fragmented, inconsistent, and difficult to navigate.',
      'Without a cohesive experience, partners struggled to make informed decisions about their advertising spend, leading to underutilization and missed revenue opportunities.',
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
