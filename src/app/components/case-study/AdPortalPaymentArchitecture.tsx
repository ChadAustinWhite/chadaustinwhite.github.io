const USER_TYPES = [
  {
    role: 'Profile owner',
    access: 'Owns the payment profile, manages billing settings, and controls who is on the access list.',
  },
  {
    role: 'Administrator',
    access: 'Edits payment details, campaigns, and users. Cannot remove other administrators or the owner.',
  },
  {
    role: 'User',
    access: 'Works with campaigns and payments tied to the profile. Can be added or removed by admins.',
  },
  {
    role: 'Viewer',
    access: 'Sees campaign and billing information without editing profiles, payments, or access.',
  },
] as const;

/** Modern payment architecture diagram for Ad Portal Evidence-led design. */
export function AdPortalPaymentArchitecture() {
  return (
    <figure
      className="ad-portal-arch"
      aria-label="Payment architecture and user access across payment profiles"
    >
      <div className="ad-portal-arch__top">
        <div>
          <p className="ad-portal-arch__eyebrow">Payment architecture</p>
          <p className="ad-portal-arch__title">Profiles carry identity. Cards stay reusable.</p>
        </div>
        <ul className="ad-portal-arch__legend" aria-label="Phase legend">
          <li>
            <span className="ad-portal-arch__swatch ad-portal-arch__swatch--existing" />
            Existing
          </li>
          <li>
            <span className="ad-portal-arch__swatch ad-portal-arch__swatch--new" />
            New for this phase
          </li>
        </ul>
      </div>

      <div className="ad-portal-arch__board">
        <div className="ad-portal-arch__column ad-portal-arch__column--existing">
          <div className="ad-portal-arch__row ad-portal-arch__row--top">
            <div className="ad-portal-arch__node ad-portal-arch__node--existing">Campaign</div>
            <span className="ad-portal-arch__link" aria-hidden />
            <div className="ad-portal-arch__node ad-portal-arch__node--existing">Partner account</div>
          </div>

          <div className="ad-portal-arch__stem" aria-hidden />

          <div className="ad-portal-arch__node ad-portal-arch__node--existing ad-portal-arch__node--primary">
            Payment profile
          </div>

          <div className="ad-portal-arch__fork" aria-hidden />

          <div className="ad-portal-arch__row ad-portal-arch__row--split">
            <div className="ad-portal-arch__node ad-portal-arch__node--existing ad-portal-arch__node--detail">
              <span className="ad-portal-arch__node-label">Beneficiary</span>
              <span className="ad-portal-arch__node-meta">Company, address, billing contact</span>
            </div>
            <div className="ad-portal-arch__node ad-portal-arch__node--existing ad-portal-arch__node--detail">
              <span className="ad-portal-arch__node-label">Payment setting</span>
              <span className="ad-portal-arch__node-meta">Manual or autopay with bank details</span>
            </div>
          </div>
        </div>

        <div className="ad-portal-arch__divider" aria-hidden>
          <span>Phase 2</span>
        </div>

        <div className="ad-portal-arch__column ad-portal-arch__column--new">
          <div className="ad-portal-arch__node ad-portal-arch__node--new ad-portal-arch__node--primary">
            Stored payment methods
          </div>
          <div className="ad-portal-arch__fork ad-portal-arch__fork--new" aria-hidden />
          <div className="ad-portal-arch__row ad-portal-arch__row--split">
            <div className="ad-portal-arch__node ad-portal-arch__node--new">Credit card 1</div>
            <div className="ad-portal-arch__node ad-portal-arch__node--new">Credit card 2</div>
          </div>
          <p className="ad-portal-arch__note">
            Partners save a card once, then reuse it across invoices without rebuilding billing identity.
          </p>
        </div>
      </div>

      <div className="ad-portal-arch__access">
        <div className="ad-portal-arch__access-head">
          <p className="ad-portal-arch__access-eyebrow">Access by user type</p>
          <p className="ad-portal-arch__access-lead">
            Each payment profile has a clear access list so the right people can see or change billing without exposing everything to everyone.
          </p>
        </div>
        <ul className="ad-portal-arch__roles">
          {USER_TYPES.map((item) => (
            <li key={item.role} className="ad-portal-arch__role">
              <span className="ad-portal-arch__role-name">{item.role}</span>
              <span className="ad-portal-arch__role-access">{item.access}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
