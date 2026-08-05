/**
 * Scrollable phone frame for the Lexus Driving Tour prototype site
 * (sourced from the standalone Lexus-driving-school project, served from /public).
 */
export function LexusDrivingTourPhoneScroll() {
  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const src = `${normalizedBase}lexus-driving-tour/index.html`;

  return (
    <figure className="lexus-phone-scroll">
      <div className="lexus-phone-scroll__stage">
        <div className="lexus-phone-scroll__device">
          <div className="lexus-phone-scroll__bezel" aria-hidden>
            <span className="lexus-phone-scroll__notch" />
          </div>
          <div className="lexus-phone-scroll__screen">
            <iframe
              className="lexus-phone-scroll__frame"
              src={src}
              title="Lexus Driving Tour mobile site, scrollable preview"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
      <figcaption className="lexus-phone-scroll__caption">
        Scroll inside the device to explore the full registration experience.
      </figcaption>
    </figure>
  );
}
