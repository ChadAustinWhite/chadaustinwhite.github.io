import type { CaseStudyContent } from './types';
import { ScrollReveal } from './ScrollReveal';
import { CaseStudySectionLayout } from './CaseStudySectionLayout';

interface CaseStudyWhoopChallengeProps {
  content: CaseStudyContent;
}

export function CaseStudyWhoopChallenge({ content }: CaseStudyWhoopChallengeProps) {
  const challenge = content.challenge;
  if (!challenge || !challenge.paragraphs || challenge.paragraphs.length === 0) return null;

  const headline = challenge.paragraphs[0];
  const body = challenge.paragraphs.slice(1).length ? challenge.paragraphs.slice(1) : [challenge.paragraphs[0]];

  return (
    <section
      id="cs-challenge"
      className="border-t border-[var(--border)] px-5 py-16 md:px-[100px] md:py-24"
    >
      <div className="mx-auto max-w-[72rem]">
        <ScrollReveal>
          <CaseStudySectionLayout
            sectionLabel="Challenge"
            headline={headline}
            body={body}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

