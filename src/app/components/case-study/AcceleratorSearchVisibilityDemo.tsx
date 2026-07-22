import expediaLogo from '../../../assets/expedia-logo.png';

const ORGANIC = [
  { id: 'listing-1', from: 0, to: 1 },
  { id: 'listing-2', from: 1, to: 2 },
  { id: 'listing-3', from: 2, to: 3 },
] as const;

function ListingCard({ variant }: { variant: 'organic' | 'ad' }) {
  return (
    <div
      className={`accelerator-srp-rank__card accelerator-srp-rank__card--${variant}`}
    >
      <div className="accelerator-srp-rank__thumb">
        {variant === 'ad' ? (
          <span className="accelerator-srp-rank__ad-badge">Ad</span>
        ) : null}
      </div>
      <div className="accelerator-srp-rank__body">
        <span className="accelerator-srp-rank__title-bar" />
      </div>
    </div>
  );
}

/** Search results demo: Accelerator ad rises above organic listings. */
export function AcceleratorSearchVisibilityDemo() {
  return (
    <figure
      className="accelerator-srp-rank"
      aria-label="Animated Expedia search results showing an Accelerator ad rising above organic hotel listings"
    >
      <div className="accelerator-srp-rank__stage">
        <div className="accelerator-srp-rank__chrome-bar" aria-hidden>
          <span className="accelerator-srp-rank__traffic">
            <i />
            <i />
            <i />
          </span>
        </div>

        <header className="accelerator-srp-rank__header">
          <img
            src={expediaLogo}
            alt="Expedia"
            className="accelerator-srp-rank__logo-img"
            width={849}
            height={188}
            draggable={false}
          />
        </header>

        <div className="accelerator-srp-rank__body-grid">
          <aside className="accelerator-srp-rank__sidebar" aria-hidden>
            <span className="accelerator-srp-rank__side-block" />
            <span className="accelerator-srp-rank__side-pill accelerator-srp-rank__side-pill--lg" />
            <span className="accelerator-srp-rank__side-pill accelerator-srp-rank__side-pill--md" />
            <span className="accelerator-srp-rank__side-pill accelerator-srp-rank__side-pill--sm" />
          </aside>

          <div className="accelerator-srp-rank__results" aria-hidden>
            {ORGANIC.map((item) => (
              <div
                key={item.id}
                className={`accelerator-srp-rank__item accelerator-srp-rank__item--from-${item.from} accelerator-srp-rank__item--to-${item.to}`}
              >
                <ListingCard variant="organic" />
              </div>
            ))}
            <div className="accelerator-srp-rank__item accelerator-srp-rank__item--ad accelerator-srp-rank__item--from-3 accelerator-srp-rank__item--to-0">
              <ListingCard variant="ad" />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
