import type { CaseStudyContent } from './types';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyImageBreak } from './CaseStudyImageBreak';
import { CaseStudySection } from './CaseStudySection';
import { CaseStudySituation } from './CaseStudySituation';
import { CaseStudyWhyMatters } from './CaseStudyWhyMatters';
import { CaseStudyComplications } from './CaseStudyComplications';
import { CaseStudyMetrics } from './CaseStudyMetrics';
import { CaseStudyReflections } from './CaseStudyReflections';

const IMAGE_BREAK_COUNT = 5;

function getImageList(images: string | string[]): string[] {
  if (typeof images === 'string') {
    return Array(IMAGE_BREAK_COUNT).fill(images);
  }
  const list: string[] = [];
  for (let i = 0; i < IMAGE_BREAK_COUNT; i++) {
    list.push(images[i % images.length] ?? images[0]);
  }
  return list;
}

interface CaseStudyPageProps {
  content: CaseStudyContent;
  onBack: () => void;
}

export function CaseStudyPage({ content, onBack }: CaseStudyPageProps) {
  const imageList = getImageList(content.images);
  const heroAlt = `${content.title} — hero`;

  return (
    <>
      <CaseStudyHero
        onBack={onBack}
        title={content.title}
        meta={content.meta}
        tagline={content.tagline}
      />

      <CaseStudyImageBreak src={imageList[0]} alt={heroAlt} />

      <CaseStudySection>
        <CaseStudySituation
          heading={content.situation.heading}
          paragraphs={content.situation.paragraphs}
        />
      </CaseStudySection>

      <CaseStudyImageBreak src={imageList[1]} alt="" />

      <CaseStudySection>
        <CaseStudyWhyMatters
          heading="Why It Matters"
          intro={content.whyItMatters.intro}
          cards={content.whyItMatters.cards}
        />
      </CaseStudySection>

      <CaseStudyImageBreak src={imageList[2]} alt="" />

      <CaseStudySection>
        <CaseStudyComplications
          heading="Project Complications"
          intro={content.complications.intro}
          items={content.complications.items}
        />
      </CaseStudySection>

      <CaseStudyImageBreak src={imageList[3]} alt="" />

      <CaseStudySection>
        <CaseStudyMetrics
          heading={content.impact.heading}
          intro={content.impact.intro}
          metrics={content.impact.metrics}
        />
      </CaseStudySection>

      <CaseStudyImageBreak src={imageList[4]} alt="" />

      <CaseStudySection className="border-b-0">
        <CaseStudyReflections
          heading={content.reflections.heading}
          reflections={content.reflections.items}
        />
      </CaseStudySection>
    </>
  );
}
