import type { CaseStudyContent } from './types';

interface CaseStudyWhoopStatementProps {
  content: CaseStudyContent;
}

export function CaseStudyWhoopStatement({ content }: CaseStudyWhoopStatementProps) {
  const statement = content.statement ?? content.tagline;
  return (
    <section className="px-5 pb-12 md:px-10 md:pb-16" id="cs-intro">
      <div className="mx-auto max-w-[72rem]">
        <h2
          className="font-normal leading-[1.65] tracking-[-0.02em] text-[var(--ink)]"
          style={{ fontSize: 'clamp(17px, 2.5vw, 20px)' }}
        >
          {statement}
        </h2>
      </div>
    </section>
  );
}
