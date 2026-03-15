interface CaseStudySituationProps {
  heading: string;
  paragraphs: string[];
}

export function CaseStudySituation({ heading, paragraphs }: CaseStudySituationProps) {
  return (
    <>
      <h2
        className="mb-6 max-w-[720px] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--ink)]"
        style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
      >
        {heading}
      </h2>
      <div className="max-w-[640px] text-[15px] leading-[1.75] text-[var(--ink-muted)]">
        {paragraphs.map((p, i) => (
          <p key={i} className={i > 0 ? 'mt-3.5' : ''}>
            {p}
          </p>
        ))}
      </div>
    </>
  );
}
