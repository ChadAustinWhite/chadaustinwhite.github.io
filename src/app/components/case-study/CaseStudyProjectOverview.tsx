import type { CaseStudyContent } from './types';
import { PLACEHOLDER_IMAGE_SECTION } from './constants';
import { CaseStudySectionHeader } from './CaseStudySectionLayout';

interface CaseStudyProjectOverviewProps {
  content: CaseStudyContent;
}

function getIntroHeadline(content: CaseStudyContent): string {
  if (content.overview?.introHeadline) return content.overview.introHeadline;
  if (content.statement) return content.statement;
  return `${content.title} — ${content.tagline}`;
}

function getServiceList(content: CaseStudyContent): string[] {
  if (content.overview?.serviceList?.length) return content.overview.serviceList;
  return content.projectFocus ?? [];
}

function getApproachParagraphs(content: CaseStudyContent): string[] {
  if (content.approach?.paragraphs?.length) return content.approach.paragraphs;
  const first = content.narrativeSections?.[0]?.body;
  if (first?.length) return first;
  if (content.heroIntro) return [content.heroIntro];
  return [];
}

/**
 * Fender-style overview under the first hero image: header bar, left headline + services,
 * right CHALLENGE + APPROACH columns.
 */
export function CaseStudyProjectOverview({ content }: CaseStudyProjectOverviewProps) {
  const headline = getIntroHeadline(content);
  const services = getServiceList(content);
  const challengeParagraphs = content.challenge?.paragraphs ?? [];
  const approachParagraphs = getApproachParagraphs(content);

  const hasRightColumn = challengeParagraphs.length > 0 || approachParagraphs.length > 0;
  if (!hasRightColumn && !headline) return null;

  const challengeLabel = (content.challenge?.heading ?? 'Challenge').replace(/^the\s+/i, '');

  const introStrip = content.overview?.introBelowImage;
  const stripLabel = introStrip?.label?.trim();
  const stripHeadline = introStrip?.headline?.trim();

  return (
    <section
      className="border-t border-[var(--border)] px-5 py-14 md:px-10 md:py-20"
      style={{ color: 'var(--ink)' }}
      aria-labelledby="cs-overview-heading"
    >
      <div className="mx-auto max-w-[72rem]">
        <CaseStudySectionHeader sectionLabel="OVERVIEW" />

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <h2
              id="cs-overview-heading"
              className="font-normal leading-[1.15] tracking-[-0.02em] text-[var(--ink)]"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
            >
              {headline}
            </h2>
            {services.length > 0 ? (
              <ul
                className="mt-8 max-w-md space-y-1.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--ink)] md:text-[11px]"
              >
                {services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-col gap-14 md:gap-16">
            {challengeParagraphs.length > 0 ? (
              <div>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
                  {challengeLabel}
                </h3>
                <div className="space-y-4 text-[15px] font-normal leading-[1.65] text-[var(--ink)] md:text-[17px]">
                  {challengeParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ) : null}
            {approachParagraphs.length > 0 ? (
              <div>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
                  Approach
                </h3>
                <div className="space-y-4 text-[15px] font-normal leading-[1.65] text-[var(--ink)] md:text-[17px]">
                  {approachParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-12 -mx-5 overflow-hidden rounded-xl md:mt-16 md:-mx-10">
        <div className="max-h-[80vh] w-full overflow-hidden">
          <img
            src={content.overview?.introImage ?? PLACEHOLDER_IMAGE_SECTION}
            alt=""
            className="h-full min-h-[400px] w-full object-cover"
          />
        </div>
      </div>

      {introStrip ? (
        <div className="mx-auto mt-12 max-w-[72rem] text-left md:mt-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="min-w-0">
              {stripLabel ? (
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
                  {introStrip.label}
                </p>
              ) : null}
              {stripHeadline ? (
                <h3
                  className={`font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)] ${
                    stripLabel ? 'mt-4' : ''
                  }`}
                  style={{ fontSize: 'clamp(20px, 2.6vw, 30px)' }}
                >
                  {introStrip.headline}
                </h3>
              ) : null}
              <p
                className={`text-[15px] font-normal leading-[1.65] text-[var(--ink-muted)] md:text-[17px] ${
                  stripLabel || stripHeadline ? 'mt-5' : ''
                }`}
              >
                {introStrip.body}
              </p>
            </div>
            <div className="hidden min-w-0 md:block" aria-hidden="true" />
          </div>
        </div>
      ) : null}
    </section>
  );
}
