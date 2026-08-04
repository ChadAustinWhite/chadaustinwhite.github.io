import type { CaseStudyInstrumentContent } from '../../components/case-study/types';
import expediaAdPortalPaymentProfiles from '../../../assets/expedia-ad-portal-payment-profiles.png';
import expediaAdPortalPaymentProfileForm from '../../../assets/expedia-ad-portal-payment-profile-form.png';
import expediaAdPortalTaxProfile from '../../../assets/expedia-ad-portal-tax-profile.png';
import expediaAdPortalAccessListPage from '../../../assets/expedia-ad-portal-partner-account.png';
import expediaAdPortalAccessListCard from '../../../assets/expedia-ad-portal-access-list-card.png';
import expediaAdPortalAddUsersStates from '../../../assets/expedia-ad-portal-add-users-states.png';
import expediaAdPortalAddUsersSearch from '../../../assets/expedia-ad-portal-add-users-search.png';
import expediaAdPortalReviewCampaigns from '../../../assets/expedia-ad-portal-review-campaigns.png';
import expediaAdPortalWalkthrough from '../../../assets/expedia-ad-portal-walkthrough.mp4';
import expediaAdPortalWalkthroughPoster from '../../../assets/expedia-ad-portal-walkthrough-poster.jpg';

/** Instrument-style narrative for Expedia Group Ad Portal (mirrors Accelerator layout). */
export const expediaAdPortalInstrument: CaseStudyInstrumentContent = {
  projectName: 'Ad Portal',
  breadcrumb: 'Expedia Group Ad Portal',
  tags: ['Travel', 'B2B', 'Advertising'],
  roundedMedia: true,
  overviewCategories: [
    {
      label: 'Role',
      values: [
        'Product strategy',
        'Product design',
        'User journey and flow',
        'Wireframing',
        'Prototyping',
        'Design system adoption',
        'Accessibility annotations',
      ],
    },
    {
      label: 'Company',
      values: ['Expedia Group'],
    },
    {
      label: 'Stakeholder',
      values: ['Product leadership', 'Design', 'Engineering'],
    },
    {
      label: 'Device',
      values: ['Desktop'],
    },
  ],
  lead:
    'Expedia ad portal gives advertising partners one place to manage campaigns, payments, and access with clarity across markets.',
  leadImages: [
    {
      src: expediaAdPortalPaymentProfileForm,
      alt: 'Expedia Group Advertising payment profile information form with billing address and primary billing contact',
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
        'Different user types need different access to campaigns, billing, and settings. A unified portal keeps those permissions clear so the right people see the right information and can take action with their campaigns.',
      subsections: [],
      chapterVisual: 'ad-portal-payment-architecture',
    },
    {
      title: 'Pain points identified',
      scrollGradientStart: true,
      lead:
        'Partners were forced to stitch together multiple tools to understand spend, performance, and billing, each with its own patterns and mental model. Friction showed up in campaign review, payment setup, tax compliance, and shared access.',
      subsections: [],
    },
    {
      title: 'Project complications',
      scrollGradientEnd: true,
      lead:
        'The main challenges and roadblocks the team faced, and how we tackled them with perseverance and flexibility.',
      subsections: [],
      accordion: [
        {
          title: 'Fragmented systems',
          body: 'Campaign and payment data lived across disconnected systems, so surfacing the right information in one view required careful orchestration.',
        },
        {
          title: 'Diverse partner needs',
          body: 'Partners ranged from independent advertisers to large agency buyers, each with distinct workflows and expectations for the same portal.',
        },
        {
          title: 'Access control complexity',
          body: 'Role-based permissions for multi-user accounts needed clear UX so teams could invite, edit, and restrict access without compromising security.',
        },
        {
          title: 'Design system alignment',
          body: "Aligning the portal with Expedia's evolving design system meant close collaboration with the platform team to stay consistent and shippable.",
        },
        {
          title: 'Payment edge cases',
          body: 'Failed payments, missing tax profiles, refunds, and billing disputes introduced complex states that had to stay clear without overwhelming the interface.',
        },
        {
          title: 'Stakeholder alignment',
          body: 'Finance, product, legal, and advertising all needed a say, while the experience still had to feel simple and actionable for partners.',
        },
      ],
    },
    {
      title: 'Evidence-led design',
      lead:
        'We grounded every flow in partner workflows, from payment profiles and tax compliance to campaign review and shared access.',
      stackedImages: [
        {
          src: expediaAdPortalPaymentProfiles,
          alt: 'Payment profiles list with tax profile missing status and add another payment profile action',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: expediaAdPortalPaymentProfileForm,
          alt: 'Payment profile information form with billing address and primary billing contact fields',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: expediaAdPortalTaxProfile,
          alt: 'Tax profile modal with missing tax profile alert, billing address, and ID number field',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: expediaAdPortalReviewCampaigns,
          alt: 'Review campaigns step listing eligible and ineligible campaigns for a payment profile',
          objectFit: 'contain',
          background: 'page',
        },
        {
          src: expediaAdPortalAccessListPage,
          alt: 'Edit access list page for a payment profile with searchable users and remove actions',
          objectFit: 'contain',
          background: 'page',
        },
      ],
      subsections: [
        {
          title: 'Access and collaboration',
          images: [
            {
              src: expediaAdPortalAccessListCard,
              alt: 'Access list card for adding or removing users on a payment profile',
              objectFit: 'contain',
              background: 'page',
              padded: true,
            },
            {
              src: expediaAdPortalAddUsersSearch,
              alt: 'Add users modal with search results and already added state',
              objectFit: 'contain',
              background: 'page',
              padded: true,
            },
          ],
        },
        {
          title: 'Add users flow',
          image: {
            src: expediaAdPortalAddUsersStates,
            alt: 'Add users modal states covering search, selection, recommended users, and done actions',
            objectFit: 'contain',
            background: 'page',
            padded: true,
          },
        },
      ],
    },
    {
      title: 'The Result',
      subsections: [
        {
          title: 'Launch impact',
          paragraphs: [
            'The portal gave partners a governed path through campaigns, billing, and access, reducing support escalations and making spend decisions easier to trust.',
            'By aligning payment profiles, tax compliance, and shared access in one flow, Ad Portal set a clearer baseline for how Expedia shows up for advertisers across markets.',
          ],
          video: {
            src: expediaAdPortalWalkthrough,
            poster: expediaAdPortalWalkthroughPoster,
            title: 'Ad Portal product walkthrough',
          },
        },
      ],
      metrics: [
        { value: '12+', label: 'Partner Markets' },
        { value: '-28%', label: 'Support Escalations' },
        { value: '1', label: 'Unified Portal' },
      ],
      metricsVariant: 'highlight',
      metricsPosition: 'beforeVideo',
    },
    {
      title: 'Reflecting on the journey and key lessons learned.',
      subsections: [],
      accordion: [
        {
          title: 'What worked well',
          body: 'Early alignment on permission models and payment profile ownership helped the team move through design decisions without backtracking on core architecture.',
        },
        {
          title: "What we'd do differently",
          body: 'More structured research with mid-market advertisers would have surfaced nuanced agency workflows earlier and reduced late-stage pivots.',
        },
        {
          title: 'Key takeaway',
          body: 'Effective ad management tools prioritize transparency and control. Partners do not just want to launch campaigns, they want confidence that spend, tax, and access are governed well.',
        },
      ],
    },
  ],
  closing: {
    paragraphs: [
      'Much like Expedia’s broader advertising ambitions, the work continues. What began as a unified portal for campaigns and payments is becoming a foundation for clearer partner trust across billing, access, and growth.',
    ],
  },
};
