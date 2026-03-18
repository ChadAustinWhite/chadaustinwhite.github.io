import type { CaseStudyContent } from './types';
import { PLACEHOLDER_IMAGE_SECTION } from './constants';
import { CaseStudyImageCaption } from './CaseStudyImageCaption';
import { ScrollReveal } from './ScrollReveal';
import { CaseStudySectionLayout } from './CaseStudySectionLayout';

interface CaseStudyWhoopOverviewProps {
  content: CaseStudyContent;
}

function getFirstBlockParagraphs(content: CaseStudyContent): string[] {
  const label = content.firstBlockLabel ?? 'OVERVIEW';
  if (label === 'CHALLENGE' && content.challenge?.paragraphs?.length)
    return content.challenge.paragraphs;
  if (content.overview?.paragraphs?.length) return content.overview.paragraphs;
  if (content.heroIntro) return [content.heroIntro];
  return content.situation.paragraphs;
}

export function CaseStudyWhoopOverview({ content }: CaseStudyWhoopOverviewProps) {
  const paragraphs = getFirstBlockParagraphs(content);
  const label = content.firstBlockLabel ?? 'OVERVIEW';
  if (paragraphs.length === 0) return null;

  const headline = paragraphs.length > 1 ? paragraphs[0] : label;
  const body = paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs;

  return (
    <section id="cs-overview" className="border-t border-[var(--border)] px-5 py-16 md:px-[100px] md:py-24">
      <div className="mx-auto max-w-[72rem]">
        <ScrollReveal>
          <CaseStudySectionLayout
            sectionLabel={label}
            brandLabel="Situation"
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
            <CaseStudyImageCaption caption={content.overview?.imageCaption} />
          </CaseStudySectionLayout>
        </ScrollReveal>
      </div>
    </section>
  );
}
