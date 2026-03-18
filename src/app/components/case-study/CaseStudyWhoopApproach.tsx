import type { CaseStudyContent } from './types';
import { PLACEHOLDER_IMAGE_SECTION } from './constants';
import { CaseStudyImageCaption } from './CaseStudyImageCaption';
import { ScrollReveal } from './ScrollReveal';
import { CaseStudySectionLayout } from './CaseStudySectionLayout';

interface CaseStudyWhoopApproachProps {
  content: CaseStudyContent;
}

function getApproachParagraphs(content: CaseStudyContent): string[] {
  if (content.approach?.paragraphs?.length) return content.approach.paragraphs;
  if (content.challenge?.paragraphs?.length) return content.challenge.paragraphs;
  if (content.narrativeSections?.[0]?.body?.length) return content.narrativeSections[0].body;
  return [];
}

export function CaseStudyWhoopApproach({ content }: CaseStudyWhoopApproachProps) {
  const paragraphs = getApproachParagraphs(content);
  if (paragraphs.length === 0) return null;

  const headline = paragraphs.length > 1 ? paragraphs[0] : 'Approach';
  const body = paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs;

  return (
    <section id="cs-approach" className="border-t border-[var(--border)] px-5 py-16 md:px-[100px] md:py-24">
      <div className="mx-auto max-w-[72rem]">
        <ScrollReveal>
          <CaseStudySectionLayout
            sectionLabel="APPROACH"
            headline={headline}
            body={body}
          >
            <div className="mt-10 w-full overflow-hidden rounded-xl">
              <img
                src={PLACEHOLDER_IMAGE_SECTION}
                alt=""
                className="h-auto w-full object-cover"
              />
            </div>
            <CaseStudyImageCaption caption={content.approach?.imageCaption} />
          </CaseStudySectionLayout>
        </ScrollReveal>
      </div>
    </section>
  );
}
