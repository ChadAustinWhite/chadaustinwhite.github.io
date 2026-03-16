import type { CaseStudyContent } from './types';
import { CaseStudySection } from './CaseStudySection';

interface CaseStudyIntroProps {
  content: CaseStudyContent;
  id?: string;
}

export function CaseStudyIntro({ content, id }: CaseStudyIntroProps) {
  if (!content.heroIntro) return null;

  return (
    <CaseStudySection id={id}>
      <p className="max-w-3xl text-base leading-relaxed text-[var(--ink-muted)]">
        {content.heroIntro}
      </p>
    </CaseStudySection>
  );
}

