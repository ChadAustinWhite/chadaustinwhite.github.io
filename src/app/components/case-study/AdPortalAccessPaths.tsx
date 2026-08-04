const STEPS = [
  'Payment profile',
  'Payment method',
  'Campaigns',
  'Access list',
] as const;

const ROLES: {
  role: string;
  access: boolean[];
}[] = [
  {
    role: 'Advertiser Admin',
    access: [true, true, true, true],
  },
  {
    role: 'Payment profile owner',
    access: [true, true, true, true],
  },
  {
    role: 'Advertiser user',
    access: [false, false, true, false],
  },
  {
    role: 'View-only',
    access: [false, false, true, false],
  },
];

/** Compact role × capability access for Evidence-led design. */
export function AdPortalAccessPaths() {
  return (
    <figure
      className="ad-portal-access"
      aria-label="Access by user type across payment profile, payment method, campaigns, and access list"
    >
      <div className="ad-portal-access__top">
        <p className="ad-portal-access__eyebrow">Role-based access</p>
        <p className="ad-portal-access__title">Who can touch what</p>
        <p className="ad-portal-access__lead">
          Admins and profile owners can manage the full setup. Campaign operators and view-only
          roles stay limited to campaigns.
        </p>
      </div>

      <div className="ad-portal-access__table-wrap">
        <table className="ad-portal-access__table">
          <caption className="sr-only">
            Access for each user type to payment profile, payment method, campaigns, and access list
          </caption>
          <thead>
            <tr>
              <th scope="col" className="ad-portal-access__corner">
                User type
              </th>
              {STEPS.map((step) => (
                <th key={step} scope="col">
                  {step}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLES.map((row) => (
              <tr key={row.role}>
                <th scope="row">{row.role}</th>
                {row.access.map((canAccess, i) => (
                  <td key={`${row.role}-${STEPS[i]}`}>
                    <span
                      className={`ad-portal-access__mark ad-portal-access__mark--${canAccess ? 'yes' : 'no'}`}
                      aria-label={canAccess ? 'Can access' : 'No access'}
                    >
                      {canAccess ? 'Yes' : '—'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="ad-portal-access__cards">
        {ROLES.map((row) => (
          <li key={`mobile-${row.role}`} className="ad-portal-access__card">
            <p className="ad-portal-access__card-role">{row.role}</p>
            <ul className="ad-portal-access__card-list">
              {row.access.map((canAccess, i) => (
                <li key={`${row.role}-m-${STEPS[i]}`} className="ad-portal-access__card-item">
                  <span>{STEPS[i]}</span>
                  <span
                    className={`ad-portal-access__mark ad-portal-access__mark--${canAccess ? 'yes' : 'no'}`}
                  >
                    {canAccess ? 'Yes' : '—'}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </figure>
  );
}
