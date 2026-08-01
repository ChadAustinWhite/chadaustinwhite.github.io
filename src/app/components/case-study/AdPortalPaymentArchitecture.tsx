type AccessLevel = 'Full' | 'Edit' | 'Act' | 'View' | '—';

const CAPABILITIES = ['Campaigns', 'Billing', 'Access list', 'Stored cards'] as const;

const ROLES: {
  role: string;
  summary: string;
  access: AccessLevel[];
}[] = [
  {
    role: 'Advertiser Admin',
    summary: 'The advertiser contracted to work with Expedia Group.',
    access: ['Full', 'Full', 'Full', 'Full'],
  },
  {
    role: 'Payment profile owner',
    summary:
      'Manages payment profile information and which campaigns are tied to which payment methods and accounts.',
    access: ['Edit', 'Full', 'Full', 'Full'],
  },
  {
    role: 'Advertiser user',
    summary:
      'Can be an agency consulting on behalf of the Advertiser Admin. Cannot see payment information.',
    access: ['Act', '—', '—', '—'],
  },
  {
    role: 'View-only',
    summary:
      'Internal Expedia employee who can view some information on behalf of the advertiser.',
    access: ['View', '—', '—', '—'],
  },
];

const SYSTEM_STRIP = ['Partner account', 'Payment profile', 'Campaigns', 'Stored cards'] as const;

/** Access-first permission model for Ad Portal Why It Matters. */
export function AdPortalPaymentArchitecture() {
  return (
    <figure
      className="ad-portal-arch"
      aria-label="Access model showing what each user type can do on a payment profile"
    >
      <div className="ad-portal-arch__top">
        <div>
          <p className="ad-portal-arch__eyebrow">Access model</p>
          <p className="ad-portal-arch__title">The right people see the right controls.</p>
          <p className="ad-portal-arch__lead">
            Each payment profile has a clear access list, so billing stays shared without exposing every setting to every teammate.
          </p>
        </div>
      </div>

      <div className="ad-portal-arch__matrix-wrap">
        <table className="ad-portal-arch__matrix">
          <caption className="sr-only">
            Permission levels by user type across campaigns, billing, access list, and stored cards
          </caption>
          <thead>
            <tr>
              <th scope="col" className="ad-portal-arch__matrix-corner">
                User type
              </th>
              {CAPABILITIES.map((capability) => (
                <th key={capability} scope="col">
                  {capability}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLES.map((row) => (
              <tr key={row.role}>
                <th scope="row">
                  <span className="ad-portal-arch__role-name">{row.role}</span>
                  <span className="ad-portal-arch__role-summary">{row.summary}</span>
                </th>
                {row.access.map((level, i) => (
                  <td key={`${row.role}-${CAPABILITIES[i]}`}>
                    <span
                      className={`ad-portal-arch__level ad-portal-arch__level--${level === '—' ? 'none' : level.toLowerCase()}`}
                    >
                      {level}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="ad-portal-arch__mobile-roles">
        {ROLES.map((row) => (
          <li key={row.role} className="ad-portal-arch__mobile-role">
            <div className="ad-portal-arch__mobile-role-head">
              <span className="ad-portal-arch__role-name">{row.role}</span>
              <span className="ad-portal-arch__role-summary">{row.summary}</span>
            </div>
            <ul className="ad-portal-arch__chips">
              {row.access.map((level, i) => (
                <li key={`${row.role}-chip-${CAPABILITIES[i]}`} className="ad-portal-arch__chip">
                  <span className="ad-portal-arch__chip-label">{CAPABILITIES[i]}</span>
                  <span
                    className={`ad-portal-arch__level ad-portal-arch__level--${level === '—' ? 'none' : level.toLowerCase()}`}
                  >
                    {level}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="ad-portal-arch__strip" aria-label="System context">
        <p className="ad-portal-arch__strip-eyebrow">System context</p>
        <ol className="ad-portal-arch__strip-flow">
          {SYSTEM_STRIP.map((item, i) => (
            <li key={item} className="ad-portal-arch__strip-item">
              {i > 0 ? <span className="ad-portal-arch__strip-arrow" aria-hidden /> : null}
              <span className="ad-portal-arch__strip-node">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
