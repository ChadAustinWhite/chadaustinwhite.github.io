import type { CaseStudyContent, CaseStudyEditorialSection } from './types';
import type { CaseStudyRoute, ProjectItem } from '../../data/portfolioData';
import { projects } from '../../data/portfolioData';
import { PLACEHOLDER_IMAGE_HERO } from './constants';

const SECTION_PAD = 'py-16 md:py-24';
const GUTTER = 'px-[var(--cs-page-gutter)]';

function getHeroImageSrc(content: CaseStudyContent): string {
  const images = content.images;
  if (typeof images === 'string') return images || PLACEHOLDER_IMAGE_HERO;
  if (Array.isArray(images) && images.length > 0 && images[0]) return images[0];
  return PLACEHOLDER_IMAGE_HERO;
}

function getEditorialSections(content: CaseStudyContent): CaseStudyEditorialSection[] {
  if (content.editorial?.sections?.length) return content.editorial.sections;

  const fromStrategy: CaseStudyEditorialSection[] =
    content.strategySections?.map((s) => ({
      heading: s.heading,
      body: s.body.join(' '),
      bodyParagraphs: s.body.length > 1 ? s.body : undefined,
      images: s.image ? [s.image] : s.subsections?.flatMap((sub) => sub.images ?? []),
      imageGrid: Boolean(s.subsections?.some((sub) => (sub.images?.length ?? 0) > 1)),
      fullBleedImage: Boolean(s.image && !s.subsections?.length),
    })) ?? [];

  const sections: CaseStudyEditorialSection[] = [];

  if (content.overview?.introBelowImage) {
    const block = content.overview.introBelowImage;
    sections.push({
      heading: block.headline ?? 'Context',
      body: block.body,
    });
  } else if (content.whyItMatters?.intro) {
    sections.push({
      heading: 'Why it matters',
      body: content.whyItMatters.intro,
    });
  }

  sections.push(...fromStrategy);

  if (content.rallyingCry) {
    sections.push({
      heading: content.rallyingCry.heading,
      body: content.rallyingCry.paragraphs.join(' '),
      bodyParagraphs:
        content.rallyingCry.paragraphs.length > 1 ? content.rallyingCry.paragraphs : undefined,
    });
  }

  if (sections.length > 0) return sections;

  return (
    content.narrativeSections?.map((n) => ({
      heading: n.heading,
      body: n.body.join(' '),
      bodyParagraphs: n.body.length > 1 ? n.body : undefined,
    })) ?? []
  );
}

function ServiceMarqueeSeparator() {
  return (
    <span
      className="inline-flex w-10 shrink-0 items-center justify-center text-[clamp(32px,5vw,52px)] leading-none text-[var(--ink-subtle)] select-none md:w-14"
      aria-hidden
    >
      ⁕
    </span>
  );
}

function renderServiceMarqueeItems(segmentId: string, labels: string[]) {
  return labels.flatMap((label, i) => {
    const labelEl = (
      <span
        key={`${segmentId}-label-${label}-${i}`}
        className="serif-headline shrink-0 whitespace-nowrap text-[clamp(32px,5vw,52px)] leading-[1.05] text-[var(--ink)]"
      >
        {label}
      </span>
    );
    if (i === 0) return [labelEl];
    return [<ServiceMarqueeSeparator key={`${segmentId}-sep-${i}`} />, labelEl];
  }).concat(<ServiceMarqueeSeparator key={`${segmentId}-sep-end`} />);
}

function SectionBody({ section }: { section: CaseStudyEditorialSection }) {
  const paragraphs =
    section.bodyParagraphs && section.bodyParagraphs.length > 0
      ? section.bodyParagraphs
      : section.body
        ? [section.body]
        : [];
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {paragraphs.map((text, i) => (
        <p
          key={`${section.heading}-p-${i}`}
          className="case-study-editorial__section-body serif-headline max-w-[42ch] text-[var(--ink-muted)]"
        >
          {text}
        </p>
      ))}
    </div>
  );
}

function EditorialSectionBlock({
  section,
  index,
}: {
  section: CaseStudyEditorialSection;
  index: number;
}) {
  const hasImages = section.images && section.images.length > 0;

  return (
    <section
      className={`${GUTTER} ${SECTION_PAD} ${index > 0 ? 'border-t border-[var(--border)]' : ''}`}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
        <h2 className="case-study-editorial__section-heading serif-headline col-span-1 text-[var(--ink)] md:col-span-5 md:max-w-[14ch]">
          {section.heading}
        </h2>
        <div className="md:col-span-6 md:col-start-7">
          <SectionBody section={section} />
        </div>
      </div>

      {hasImages ? (
        <div
          className={
            section.imageGrid
              ? 'mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-16 md:grid-cols-4 md:gap-3'
              : `mt-12 md:mt-16 ${section.fullBleedImage ? '-mx-[var(--cs-page-gutter)] w-[calc(100%+2*var(--cs-page-gutter))]' : ''}`
          }
        >
          {section.images!.map((src, j) => (
            <div
              key={`${section.heading}-img-${j}`}
              className={
                section.imageGrid
                  ? 'overflow-hidden bg-[var(--card-bg)]'
                  : section.fullBleedImage
                    ? ''
                    : 'overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)]'
              }
            >
              <img
                src={src}
                alt=""
                className={
                  section.imageGrid
                    ? 'aspect-square w-full object-cover'
                    : 'block h-auto w-full object-cover'
                }
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

interface CaseStudyEditorialPageProps {
  content: CaseStudyContent;
  onBack: () => void;
  currentRoute: CaseStudyRoute;
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function CaseStudyEditorialPage({
  content,
  onBack,
  currentRoute,
  onViewCaseStudy,
}: CaseStudyEditorialPageProps) {
  const statement =
    content.editorial?.statement ?? content.statement ?? content.tagline;
  const services = content.overview?.serviceList ?? content.projectFocus ?? [];
  const overviewLead = content.overview?.paragraphs?.[0] ?? '';
  const overviewDetail =
    content.overview?.paragraphs?.[1] ?? content.heroIntro ?? '';
  const sections = getEditorialSections(content);
  const metrics = content.heroResults?.metrics ?? content.impact.metrics ?? [];
  const metricsHeading =
    content.editorial?.metricsHeading ??
    content.heroResults?.heading ??
    content.impact.heading;
  const testimonial = content.editorial?.testimonial ?? content.testimonial;
  const showGallery = content.editorial?.showGallery !== false;
  const gallery = showGallery ? (content.heroResults?.gallery ?? []) : [];
  const galleryHeading = content.editorial?.galleryHeading ?? 'Flow highlights';
  const heroFullBleed = content.editorial?.heroImageFullBleed !== false;

  const nextProject: ProjectItem | undefined = (() => {
    const i = projects.findIndex((p) => p.caseStudyRoute === currentRoute);
    if (i < 0 || i >= projects.length - 1) return undefined;
    return projects[i + 1];
  })();

  const nextLabel =
    content.editorial?.nextProjectTitle ??
    (nextProject
      ? nextProject.title.replace(/^Expedia Group /, '').replace(/^Worldpay /, '')
      : 'the next project');

  const heroAlt =
    content.heroTitleLines?.join(' ') ?? content.title;

  return (
    <article className="case-study-editorial bg-[var(--bg)] text-[var(--ink)]">
      <div className={`${GUTTER} pt-[7.5rem] pb-6 md:pb-8`}>
        <button
          type="button"
          onClick={onBack}
          className="mb-10 inline-flex items-center gap-1.5 text-[11px] text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
          aria-label="Back to Work"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M8.5 2.5L4 7l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Work
        </button>

        <header>
          <p className="mb-4 text-[11px] text-[var(--ink-muted)]">
            {content.meta.role} · {content.meta.year}
          </p>
          <h1 className="case-study-editorial__statement serif-headline text-[var(--ink)]">
            {statement}
          </h1>
        </header>
      </div>

      {services.length > 0 ? (
        <div
          className="relative mb-14 overflow-x-hidden py-4 md:mb-20 md:py-6"
          role="region"
          aria-label="Project focus areas"
        >
          <div className="case-study-service-marquee__track gap-6 md:gap-10">
            {renderServiceMarqueeItems('a', services)}
            <span className="contents" aria-hidden="true">
              {renderServiceMarqueeItems('b', services)}
            </span>
          </div>
        </div>
      ) : null}

      <section className={`${GUTTER} ${SECTION_PAD} border-t border-[var(--border)]`}>
        <h2 className="case-study-editorial__overview-title serif-headline mb-12 text-[var(--ink)] md:mb-16">
          Project
          <span className="block">Overview</span>
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          {overviewLead ? (
            <p className="case-study-editorial__overview-lead serif-headline text-[var(--ink)]">
              {overviewLead}
            </p>
          ) : null}
          {overviewDetail ? (
            <p className="case-study-editorial__overview-lead serif-headline text-[var(--ink-muted)]">
              {overviewDetail}
            </p>
          ) : null}
        </div>
      </section>

      <div
        className={
          heroFullBleed
            ? 'mb-0 border-y border-[var(--border)] bg-[var(--card-bg)]'
            : `${GUTTER} pb-14 md:pb-20`
        }
      >
        <div
          className={
            heroFullBleed
              ? 'flex min-h-[min(52vh,640px)] items-center justify-center p-6 md:p-12'
              : 'overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)]'
          }
        >
          <img
            src={getHeroImageSrc(content)}
            alt={heroAlt}
            className={
              heroFullBleed
                ? 'max-h-[min(48vh,560px)] w-full max-w-5xl object-contain'
                : 'block h-auto w-full object-contain'
            }
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {sections.map((section, i) => (
        <EditorialSectionBlock key={`${section.heading}-${i}`} section={section} index={i} />
      ))}

      {gallery.length > 0 ? (
        <section className={`${GUTTER} ${SECTION_PAD} border-t border-[var(--border)]`}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
            <h2 className="case-study-editorial__section-heading serif-headline col-span-1 text-[var(--ink)] md:col-span-5 md:max-w-[14ch]">
              {galleryHeading}
            </h2>
            <p className="case-study-editorial__section-body serif-headline col-span-1 max-w-[42ch] text-[var(--ink-muted)] md:col-span-6 md:col-start-7">
              Key screens from verification, team access, and progress states — placeholders until
              final assets are cleared for publication.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-16 md:grid-cols-3 md:gap-4">
            {gallery.map((src, i) => (
              <div key={`gallery-${i}`} className="overflow-hidden bg-[var(--card-bg)]">
                <img src={src} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {metrics.length > 0 ? (
        <section className={`${GUTTER} ${SECTION_PAD} border-t border-[var(--border)]`}>
          <h2 className="case-study-editorial__section-heading serif-headline mb-14 max-w-[16ch] text-[var(--ink)] md:mb-20">
            {metricsHeading}
          </h2>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            {metrics.map((m, i) => (
              <div
                key={`${m.label}-${i}`}
                className={`flex min-w-0 flex-1 flex-col py-10 first:pt-0 md:py-0 ${
                  i > 0
                    ? 'border-t border-[var(--border)] md:border-t-0 md:border-l md:pl-10 lg:pl-14'
                    : ''
                } ${i < metrics.length - 1 ? 'md:pr-10 lg:pr-14' : ''}`}
              >
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                  {m.label}
                </p>
                <p className="case-study-editorial__metric-value serif-headline text-[var(--ink)] tabular-nums">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {testimonial ? (
        <section className={`${GUTTER} ${SECTION_PAD} border-t border-[var(--border)]`}>
          <div className="mb-10 md:mb-12">
            <p className="text-[15px] font-semibold text-[var(--ink)] md:text-[17px]">
              {testimonial.name}
            </p>
            <p className="mt-1 text-[13px] text-[var(--ink-muted)] md:text-[14px]">
              {testimonial.role}
            </p>
          </div>
          <blockquote className="serif-headline max-w-[32ch] text-[clamp(24px,3.2vw,36px)] leading-[1.25] tracking-[-0.02em] text-[var(--ink)]">
            “{testimonial.quote}”
          </blockquote>
        </section>
      ) : null}

      <section className={`${GUTTER} border-t border-[var(--border)] py-20 md:py-28`}>
        {nextProject ? (
          <button
            type="button"
            onClick={() => onViewCaseStudy(nextProject.caseStudyRoute)}
            className="serif-headline group inline-flex items-baseline gap-3 text-left text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.03em] text-[var(--ink)] transition-opacity hover:opacity-65"
          >
            <span>Next is {nextLabel}</span>
            <span
              className="inline-block translate-y-[0.05em] text-[0.55em] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              aria-hidden
            >
              →
            </span>
          </button>
        ) : (
          <p className="serif-headline text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
            Next is {nextLabel}
          </p>
        )}
      </section>
    </article>
  );
}
