/** Modern circumplex map: merchant stress → Dispute Defender momentum. */
export function MerchantDisputeEmotionMap() {
  return (
    <figure
      className="merchant-emotion-map"
      aria-label="Merchant dispute emotion map showing a shift from fearful and anxious toward calm and relaxed with Dispute Defender"
    >
      <div className="merchant-emotion-map__header">
        <figcaption className="merchant-emotion-map__title">Merchant emotion map</figcaption>
      </div>

      <div className="merchant-emotion-map__frame">
        <div className="merchant-emotion-map__axis-y" aria-hidden>
          <span>High arousal</span>
          <span>Low arousal</span>
        </div>

        <div className="merchant-emotion-map__plot">
          <div className="merchant-emotion-map__crosshair" aria-hidden />

          <article className="merchant-emotion-map__quad merchant-emotion-map__quad--merchant">
            <span className="merchant-emotion-map__chip merchant-emotion-map__chip--alert">
              Dispute
            </span>
            <p className="merchant-emotion-map__emotion">Fearful</p>
            <p className="merchant-emotion-map__emotion">Anxious</p>
          </article>

          <article className="merchant-emotion-map__quad merchant-emotion-map__quad--muted">
            <p className="merchant-emotion-map__emotion">Excited</p>
            <p className="merchant-emotion-map__emotion">Playful</p>
          </article>

          <article className="merchant-emotion-map__quad merchant-emotion-map__quad--muted">
            <p className="merchant-emotion-map__emotion">Bored</p>
            <p className="merchant-emotion-map__emotion">Depressed</p>
          </article>

          <article className="merchant-emotion-map__quad merchant-emotion-map__quad--defender">
            <span className="merchant-emotion-map__chip merchant-emotion-map__chip--success">
              Dispute Defender
            </span>
            <p className="merchant-emotion-map__emotion">Calm</p>
            <p className="merchant-emotion-map__emotion">Relaxed</p>
          </article>

          <div className="merchant-emotion-map__path" aria-hidden>
            <svg viewBox="0 0 200 120" preserveAspectRatio="none">
              <path d="M14 18 C70 28, 130 88, 186 102" />
            </svg>
            <span className="merchant-emotion-map__path-dot merchant-emotion-map__path-dot--start" />
            <span className="merchant-emotion-map__path-dot merchant-emotion-map__path-dot--end" />
          </div>
        </div>

        <div className="merchant-emotion-map__axis-x" aria-hidden>
          <span>Negative valence</span>
          <span>Positive valence</span>
        </div>
      </div>

      <p className="merchant-emotion-map__caption">
        Disputes push merchants into high-arousal negative valence. Dispute Defender guides them
        toward calm, confident resolution.
      </p>
    </figure>
  );
}
