/** Simplified relationship graph for Ad Portal Why It Matters. */
export function AdPortalPaymentArchitecture() {
  return (
    <figure
      className="ad-portal-arch"
      aria-label="Payment architecture: partner account, payment profile, campaigns, and stored cards"
    >
      <div className="ad-portal-arch__top">
        <p className="ad-portal-arch__eyebrow">Payment architecture</p>
        <p className="ad-portal-arch__title">How the system connects</p>
        <p className="ad-portal-arch__lead">
          One payment profile ties campaigns and billing to a partner account, with stored cards
          added for repeat payments.
        </p>
      </div>

      <div className="ad-portal-arch__board">
        <div className="ad-portal-arch__tree">
          <div className="ad-portal-arch__node ad-portal-arch__node--core">Partner account</div>
          <span className="ad-portal-arch__vline" aria-hidden="true" />
          <div className="ad-portal-arch__node ad-portal-arch__node--core ad-portal-arch__node--hub">
            Payment profile
          </div>
          <div className="ad-portal-arch__split" aria-hidden="true">
            <span className="ad-portal-arch__vline" />
            <span className="ad-portal-arch__hbar" />
          </div>
          <div className="ad-portal-arch__leaves">
            <div className="ad-portal-arch__leaf">
              <span className="ad-portal-arch__vline" aria-hidden="true" />
              <div className="ad-portal-arch__node ad-portal-arch__node--core">Campaigns</div>
            </div>
            <div className="ad-portal-arch__leaf">
              <span className="ad-portal-arch__vline" aria-hidden="true" />
              <div className="ad-portal-arch__node ad-portal-arch__node--new">
                Stored cards
                <span className="ad-portal-arch__badge">New</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
