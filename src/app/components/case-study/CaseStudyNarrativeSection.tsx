interface CaseStudyNarrativeSectionProps {
  heading: string;
  paragraphs: string[];
  id?: string;
}

export function CaseStudyNarrativeSection({
  heading,
  paragraphs,
  id,
}: CaseStudyNarrativeSectionProps) {
  return (
    <section id={id} className="border-b border-[var(--border-subtle)] py-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--ink)]">
          {heading}
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-[var(--ink-muted)]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

