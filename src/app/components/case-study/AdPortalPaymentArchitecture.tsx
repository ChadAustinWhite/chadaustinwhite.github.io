/** Payment relationship graph for Ad Portal Why It Matters. */
export function AdPortalPaymentArchitecture() {
  return (
    <figure
      className="ad-portal-arch"
      aria-label="Payment architecture connecting campaigns, partner accounts, payment profiles, and stored cards"
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
        <ul className="ad-portal-arch__tree">
          <li className="ad-portal-arch__tree-root">
            <div className="ad-portal-arch__parents" role="presentation">
              <div className="ad-portal-arch__parent">
                <div className="ad-portal-arch__node ad-portal-arch__node--core">Campaign</div>
              </div>
              <div className="ad-portal-arch__parent">
                <div className="ad-portal-arch__node ad-portal-arch__node--core">Partner account</div>
              </div>
            </div>

            <ul className="ad-portal-arch__branch">
              <li className="ad-portal-arch__tree-node">
                <div className="ad-portal-arch__node ad-portal-arch__node--core ad-portal-arch__node--hub">
                  Payment profile
                </div>

                <ul className="ad-portal-arch__branch ad-portal-arch__branch--children">
                  <li className="ad-portal-arch__tree-node">
                    <div className="ad-portal-arch__node ad-portal-arch__node--core ad-portal-arch__node--detail">
                      Beneficiary
                      <span className="ad-portal-arch__node-meta">
                        Company name, address, billing contact
                      </span>
                    </div>
                  </li>
                  <li className="ad-portal-arch__tree-node">
                    <div className="ad-portal-arch__node ad-portal-arch__node--core ad-portal-arch__node--detail">
                      Payment setting
                      <span className="ad-portal-arch__node-meta">
                        Manual, or autopay + direct debit
                      </span>
                    </div>
                  </li>
                  <li className="ad-portal-arch__tree-node">
                    <div className="ad-portal-arch__node ad-portal-arch__node--new ad-portal-arch__node--detail">
                      <span className="ad-portal-arch__node-title">
                        Stored cards
                        <span className="ad-portal-arch__badge">New</span>
                      </span>
                      <span className="ad-portal-arch__node-meta">Saved for invoice payments</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </figure>
  );
}
