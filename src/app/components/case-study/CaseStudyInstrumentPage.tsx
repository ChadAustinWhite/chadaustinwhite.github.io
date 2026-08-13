import { useRef } from 'react';
import { useCaseStudyParallax } from '../../hooks/useCaseStudyParallax';
import { useCaseStudySectionBackground } from '../../hooks/useCaseStudySectionBackground';
import type {
  CaseStudyContent,
  CaseStudyInstrumentChapter,
  CaseStudyInstrumentImage,
  CaseStudyInstrumentMetricsPanel,
  CaseStudyInstrumentVideo,
  CaseStudySonosMetric,
} from './types';
import type { CaseStudyRoute } from '../../data/portfolioData';
import { projects } from '../../data/portfolioData';
import { CaseStudyWhoopNext } from './CaseStudyWhoopNext';
import { CaseStudyInstrumentBentoGrid } from './CaseStudyInstrumentBentoGrid';
import { CaseStudyInstrumentImageCarousel } from './CaseStudyInstrumentImageCarousel';
import { InstrumentMetricsHighlight } from './InstrumentMetricsHighlight';
import { InstrumentMetricsTicker } from './InstrumentMetricsTicker';
import { DisputeDefenderTableModalDemo } from './DisputeDefenderTableModalDemo';
import { MerchantDisputeEmotionMap } from './MerchantDisputeEmotionMap';
import { AcceleratorSearchVisibilityDemo } from './AcceleratorSearchVisibilityDemo';
import { AcceleratorPartnerJourneyMap } from './AcceleratorPartnerJourneyMap';
import { AcceleratorHookModelFlow } from './AcceleratorHookModelFlow';
import { AdPortalPaymentArchitecture } from './AdPortalPaymentArchitecture';
import { AdPortalAccessPaths } from './AdPortalAccessPaths';
import { LexusDrivingTourPhoneScroll } from './LexusDrivingTourPhoneScroll';
import { CaseStudySonosSubpointAccordion } from './CaseStudySonosSubpointAccordion';

const GUTTER = 'px-[var(--cs-page-gutter)]';
/** Left-aligned prose column (matches page lead; no horizontal centering). */
const CONTENT = 'w-full max-w-[46rem]';

const ROLE_COLUMNS: {
  key: 'design' | 'content' | 'strategy' | 'development';
  label: string;
}[] = [
  { key: 'design', label: 'Design' },
  { key: 'content', label: 'Content' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'development', label: 'Engineering' },
];

type InstrumentFigureVariant = 'hero' | 'content';

/** Renders `**bold**` markers in instrument copy strings. */
function renderInstrumentInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

function instrumentMediaBackground(image: CaseStudyInstrumentImage): string {
  switch (image.background) {
    case 'charcoal':
      return 'case-study-instrument__media--charcoal';
    case 'card':
      return 'case-study-instrument__media--card';
    default:
      return 'case-study-instrument__media--page';
  }
}

function InstrumentFigure({
  image,
  variant = 'content',
}: {
  image: CaseStudyInstrumentImage;
  variant?: InstrumentFigureVariant;
}) {
  const isHero = variant === 'hero';
  const fit = image.objectFit ?? (isHero ? 'natural' : 'cover');
  const figureImgClass =
    fit === 'natural'
      ? 'case-study-instrument__figure-img case-study-instrument__img--natural'
      : `case-study-instrument__figure-img case-study-instrument__img--${fit}`;
  const parallaxSpeed = image.parallaxSpeed ?? (isHero ? '0.06' : '0.1');
  const parallaxEnabled = parallaxSpeed !== '0' && Number.parseFloat(parallaxSpeed) !== 0;

  return (
    <figure
      className={`case-study-instrument__figure ${
        image.padded
          ? 'case-study-instrument__figure--padded'
          : 'case-study-instrument__figure--bleed'
      } case-study-instrument__figure--${variant}`}
    >
      <div
        className={`case-study-instrument__figure-media ${instrumentMediaBackground(image)}`}
      >
        <div
          className="case-study-instrument__parallax-media case-study-instrument__parallax-media--figure"
          {...(parallaxEnabled
            ? {
                'data-parallax': true,
                'data-parallax-speed': parallaxSpeed,
                ...(image.parallaxMode ? { 'data-parallax-mode': image.parallaxMode } : {}),
                ...(image.parallaxDelay ? { 'data-parallax-delay': image.parallaxDelay } : {}),
              }
            : {})}
        >
          <img
            src={image.src}
            alt={image.alt ?? ''}
            className={figureImgClass}
            loading={isHero ? 'eager' : 'lazy'}
            decoding="async"
            sizes="100vw"
          />
        </div>
      </div>
      {image.caption ? (
        <figcaption
          className={`${GUTTER} case-study-instrument__caption mx-auto mt-4 max-w-[72rem] md:mt-5`}
        >
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function InstrumentMetricsList({ metrics }: { metrics: CaseStudySonosMetric[] }) {
  return (
    <div className="case-study-instrument__metrics" role="list">
      {metrics.map((m) => (
        <div key={m.label} className="case-study-instrument__metric" role="listitem">
          <p className="case-study-instrument__metric-label">{m.label}</p>
          <p className="case-study-instrument__metric-value">{m.value}</p>
        </div>
      ))}
    </div>
  );
}

function InstrumentMetricsStrip({ metrics }: { metrics: CaseStudySonosMetric[] }) {
  const columns = `repeat(${metrics.length}, minmax(0, 1fr))`;

  return (
    <div className="case-study-instrument__metrics-strip">
      <div
        className="case-study-instrument__metrics-strip-row case-study-instrument__metrics-strip-row--head"
        style={{ gridTemplateColumns: columns }}
      >
        {metrics.map((m) => (
          <div key={`${m.label}-head`} className="case-study-instrument__metrics-strip-cell">
            {m.label}
          </div>
        ))}
      </div>
      <div className="case-study-instrument__metrics-strip-row" style={{ gridTemplateColumns: columns }}>
        {metrics.map((m) => (
          <div
            key={`${m.label}-value`}
            className="case-study-instrument__metrics-strip-cell case-study-instrument__metrics-strip-cell--value serif-headline tabular-nums"
          >
            {m.value}
          </div>
        ))}
      </div>
    </div>
  );
}

function InstrumentMetrics({
  metrics,
  variant = 'kpi',
  eyebrow,
}: {
  metrics: CaseStudySonosMetric[];
  variant?: 'kpi' | 'strip' | 'ticker' | 'highlight';
  eyebrow?: string;
}) {
  if (variant === 'highlight') {
    return <InstrumentMetricsHighlight metrics={metrics} eyebrow={eyebrow} />;
  }

  if (variant === 'ticker') {
    return <InstrumentMetricsTicker metrics={metrics} />;
  }

  if (variant === 'strip') {
    return <InstrumentMetricsStrip metrics={metrics} />;
  }

  return <InstrumentMetricsList metrics={metrics} />;
}

function InstrumentMetricsPanel({ panel }: { panel: CaseStudyInstrumentMetricsPanel }) {
  const { image, metrics } = panel;
  const imgClass = `case-study-instrument__figure-img case-study-instrument__img--${image.objectFit ?? 'contain'}`;

  return (
    <div className={`${GUTTER} case-study-instrument__metrics-panel mt-12 md:mt-16`}>
      <div className="case-study-instrument__metrics-panel-grid">
        <figure className="case-study-instrument__metrics-panel-figure">
          <div
            className={`case-study-instrument__figure-media ${instrumentMediaBackground(image)}`}
          >
            <img src={image.src} alt={image.alt ?? ''} className={imgClass} loading="lazy" decoding="async" />
          </div>
          {image.caption ? (
            <figcaption className="case-study-instrument__caption mt-4">{image.caption}</figcaption>
          ) : null}
        </figure>
        <InstrumentMetricsList metrics={metrics} />
      </div>
    </div>
  );
}

function InstrumentSubsectionCopy({
  title,
  paragraphs,
  bullets,
}: Pick<CaseStudyInstrumentChapter['subsections'][number], 'title' | 'paragraphs' | 'bullets'>) {
  return (
    <div className="case-study-instrument__subsection">
      <h3 className="case-study-instrument__subsection-title">{title}</h3>
      <div className="case-study-instrument__subsection-body">
        {bullets?.length ? (
          <ul className="case-study-instrument__bullet-list">
            {bullets.map((text, i) => (
              <li key={`${title}-bullet-${i}`} className="case-study-instrument__body">
                {text}
              </li>
            ))}
          </ul>
        ) : null}
        {paragraphs?.map((text, i) => (
          <p key={`${title}-p-${i}`} className="case-study-instrument__body">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}


function InstrumentVideo({ video }: { video: CaseStudyInstrumentVideo }) {
  return (
    <figure className="case-study-instrument__video">
      <video
        className="case-study-instrument__video-player"
        controls
        playsInline
        preload="metadata"
        poster={video.poster}
        aria-label={video.title}
      >
        <source src={video.src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
      {video.caption ? (
        <figcaption className="case-study-instrument__caption mt-4">{video.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function InstrumentChapter({ chapter }: { chapter: CaseStudyInstrumentChapter }) {
  const hasAccordion = (chapter.accordion?.length ?? 0) > 0;
  const metricsAfterLead =
    chapter.metricsPosition === 'afterLead' && (chapter.metrics?.length ?? 0) > 0;
  const metricsBeforeVideo =
    chapter.metricsPosition === 'beforeVideo' && (chapter.metrics?.length ?? 0) > 0;
  const metricsAfterContent =
    chapter.metricsPosition !== 'afterLead' &&
    chapter.metricsPosition !== 'beforeVideo' &&
    (chapter.metrics?.length ?? 0) > 0;
  const firstVideoSubsectionIndex = chapter.subsections.findIndex((sub) => Boolean(sub.video));

  return (
    <section
      className={`${GUTTER} case-study-instrument__chapter-wrap`}
      {...(chapter.scrollGradientStart ? { 'data-scroll-gradient-start': '' } : {})}
      {...(chapter.scrollGradientEnd ? { 'data-scroll-gradient-end': '' } : {})}
    >
      <div className={CONTENT} data-parallax data-parallax-speed="0.05">
        <h2 className="case-study-instrument__chapter serif-headline text-left">{chapter.title}</h2>
        {(Array.isArray(chapter.lead) ? chapter.lead : chapter.lead ? [chapter.lead] : []).map(
          (text, i) => {
            const className = `case-study-instrument__chapter-lead serif-headline text-left${i > 0 ? ' mt-6' : ''}`;
            return (
              <p key={`chapter-lead-${i}`} className={className}>
                {renderInstrumentInlineText(text)}
              </p>
            );
          },
        )}
        {hasAccordion ? (
          <CaseStudySonosSubpointAccordion
            items={chapter.accordion!}
            className="mt-10 md:mt-14"
          />
        ) : null}
      </div>

      {metricsAfterLead ? (
        <div
          className={`${CONTENT} mt-10 md:mt-12${
            chapter.metricsVariant === 'strip' ||
            chapter.metricsVariant === 'ticker' ||
            chapter.metricsVariant === 'highlight'
              ? ''
              : ' case-study-instrument__metrics'
          }`}
        >
          <InstrumentMetrics
            metrics={chapter.metrics!}
            variant={chapter.metricsVariant}
            eyebrow={chapter.metricsEyebrow}
          />
        </div>
      ) : null}

      {chapter.chapterVisual === 'merchant-dispute-emotion-map' ? (
        <div className={`${CONTENT} case-study-instrument__chapter-visual mt-10 md:mt-14`}>
          <MerchantDisputeEmotionMap />
        </div>
      ) : null}

      {chapter.chapterVisual === 'accelerator-search-visibility' ? (
        <div className={`${CONTENT} case-study-instrument__chapter-visual case-study-instrument__chapter-visual--start mt-10 md:mt-14`}>
          <AcceleratorSearchVisibilityDemo />
        </div>
      ) : null}

      {chapter.chapterVisual === 'accelerator-partner-journey' ? (
        <div className="case-study-instrument__chapter-visual case-study-instrument__chapter-visual--start mt-6 md:mt-8 w-full max-w-[72rem]">
          <AcceleratorPartnerJourneyMap />
        </div>
      ) : null}

      {chapter.chapterVisual === 'accelerator-hook-model' ? (
        <div className="case-study-instrument__chapter-visual case-study-instrument__chapter-visual--start mt-8 md:mt-10 w-full max-w-[90rem]">
          <AcceleratorHookModelFlow />
        </div>
      ) : null}

      {chapter.chapterVisual === 'ad-portal-payment-architecture' ? (
        <div className="case-study-instrument__chapter-visual case-study-instrument__chapter-visual--start mt-10 md:mt-14 w-full max-w-[72rem]">
          <AdPortalPaymentArchitecture />
        </div>
      ) : null}

      {chapter.chapterVisual === 'ad-portal-access-paths' ? (
        <div className="case-study-instrument__chapter-visual case-study-instrument__chapter-visual--start mt-10 md:mt-14 w-full max-w-[72rem]">
          <AdPortalAccessPaths />
        </div>
      ) : null}

      {chapter.chapterVisual === 'lexus-driving-tour-phone' ? (
        <div className="case-study-instrument__chapter-visual case-study-instrument__chapter-visual--start mt-10 md:mt-14 w-full max-w-[28rem]">
          <LexusDrivingTourPhoneScroll />
        </div>
      ) : null}

      {chapter.chapterDemo === 'dispute-defender-table-modal' ? (
        <div className="case-study-instrument__chapter-demo mt-10 md:mt-14">
          <DisputeDefenderTableModalDemo />
        </div>
      ) : null}

      {chapter.stackedImages && chapter.stackedImages.length > 0 ? (
        chapter.stackedImagesLayout === 'carousel' ? (
          <CaseStudyInstrumentImageCarousel
            images={chapter.stackedImages}
            width={chapter.stackedImagesWidth}
            autoRotate={chapter.stackedImagesAutoRotate}
          />
        ) : (
        <div
          className={`case-study-instrument__stacked-figures${
            chapter.stackedImagesWidth === 'prose'
              ? ' case-study-instrument__stacked-figures--prose'
              : ''
          }`}
          data-parallax
          data-parallax-speed="0.05"
        >
          {chapter.stackedImages.map((image, i) => (
            <InstrumentFigure key={`${chapter.title}-stack-${i}`} image={image} variant="content" />
          ))}
        </div>
        )
      ) : null}

      {chapter.bentoGrid ? <CaseStudyInstrumentBentoGrid grid={chapter.bentoGrid} /> : null}
      {chapter.bentoGrids?.map((grid, i) => (
        <CaseStudyInstrumentBentoGrid key={`${chapter.title}-bento-${i}`} grid={grid} />
      ))}

      {chapter.subsections.map((sub, subIndex) => {
        const hasCopy =
          (sub.paragraphs?.length ?? 0) > 0 || (sub.bullets?.length ?? 0) > 0;

        return (
        <div key={sub.title} className="case-study-instrument__subsection-block">
          {hasCopy ? (
            <div className={CONTENT}>
              <InstrumentSubsectionCopy
                title={sub.title}
                paragraphs={sub.paragraphs}
                bullets={sub.bullets}
              />
            </div>
          ) : null}
          {metricsBeforeVideo && subIndex === firstVideoSubsectionIndex ? (
            <div className={`${CONTENT} mt-10 md:mt-12`}>
              <InstrumentMetrics
                metrics={chapter.metrics!}
                variant={chapter.metricsVariant}
                eyebrow={chapter.metricsEyebrow}
              />
            </div>
          ) : null}
          {sub.video ? <InstrumentVideo video={sub.video} /> : null}
          {sub.bentoGrid ? <CaseStudyInstrumentBentoGrid grid={sub.bentoGrid} /> : null}
          {sub.bentoGrids?.map((grid, i) => (
            <CaseStudyInstrumentBentoGrid key={`${sub.title}-bento-${i}`} grid={grid} />
          ))}
          {sub.image ? <InstrumentFigure image={sub.image} variant="content" /> : null}
          {sub.images?.length ? (
            <div className="case-study-instrument__figure-row">
              {sub.images.map((img, i) => (
                <InstrumentFigure key={`${sub.title}-img-${i}`} image={img} variant="content" />
              ))}
            </div>
          ) : null}
        </div>
        );
      })}

      {chapter.metricsPanel ? (
        <InstrumentMetricsPanel panel={chapter.metricsPanel} />
      ) : metricsAfterContent ? (
        <div className={`${CONTENT} case-study-instrument__metrics mt-12 md:mt-16`}>
          <InstrumentMetrics
            metrics={chapter.metrics!}
            variant={chapter.metricsVariant}
            eyebrow={chapter.metricsEyebrow}
          />
        </div>
      ) : null}

      {chapter.testimonial ? (
        <div className={`${CONTENT} case-study-instrument__testimonial`}>
          <blockquote className="case-study-instrument__quote serif-headline">
            “{chapter.testimonial.quote}”
          </blockquote>
          <footer className="case-study-instrument__quote-footer">
            <p className="case-study-instrument__quote-name">{chapter.testimonial.name}</p>
            <p className="case-study-instrument__quote-role">{chapter.testimonial.role}</p>
          </footer>
        </div>
      ) : null}
    </section>
  );
}

interface CaseStudyInstrumentPageProps {
  content: CaseStudyContent;
  onBack: () => void;
  currentRoute: CaseStudyRoute;
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function CaseStudyInstrumentPage({
  content,
  onBack,
  currentRoute,
  onViewCaseStudy,
}: CaseStudyInstrumentPageProps) {
  const articleRef = useRef<HTMLElement>(null);
  const parallaxEnabled = content.parallax !== false;

  useCaseStudySectionBackground(content.scrollGradient ?? false);
  useCaseStudyParallax(articleRef, parallaxEnabled);

  const instrument = content.instrument;
  if (!instrument) return null;

  const roles = content.roles;
  const roleColumns = ROLE_COLUMNS.filter((col) => (roles?.[col.key]?.length ?? 0) > 0);
  const relatedProjects = projects
    .filter((p) => p.caseStudyRoute !== currentRoute && !p.comingSoon)
    .slice(0, 3);
  const leadImages = instrument.leadImages?.length
    ? instrument.leadImages
    : instrument.leadImage
      ? [instrument.leadImage]
      : [];

  return (
    <article
      ref={articleRef}
      className={`case-study-instrument bg-[var(--bg)] pb-16 text-[var(--ink)] md:pb-24${parallaxEnabled ? ' case-study-instrument--parallax' : ''}${instrument.roundedMedia ? ' case-study-instrument--rounded-media' : ''}${instrument.compactLeadImages ? ' case-study-instrument--compact-lead' : ''}`}
    >
      <header className={`${GUTTER} pt-[7.5rem] pb-10 md:pb-14`}>
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
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

        {instrument.clientName ? (
          <p className="case-study-instrument__client serif-headline text-[var(--ink)]">
            {instrument.clientName}
          </p>
        ) : null}

        <p
          className={`case-study-instrument__lead serif-headline max-w-[48rem] text-[var(--ink)]${
            instrument.clientName ? ' mt-6 md:mt-8' : ''
          }`}
        >
          {instrument.lead}
        </p>

        {instrument.overviewCategories && instrument.overviewCategories.length > 0 ? (
          <dl
            className="case-study-instrument__overview-categories mt-10 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-14 md:grid-cols-4 md:gap-x-10"
            aria-label="Project overview"
          >
            {instrument.overviewCategories.map((category) => {
              const hideOnMobile =
                category.label.toLowerCase() === 'stakeholder' ||
                category.label.toLowerCase() === 'device';
              return (
              <div
                key={category.label}
                className={`min-w-0${hideOnMobile ? ' max-md:hidden' : ''}`}
              >
                <dt className="case-study-instrument__overview-label">{category.label}</dt>
                <dd className="case-study-instrument__overview-values">
                  {category.values.map((value) =>
                    category.href ? (
                      <a
                        key={value}
                        href={category.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="case-study-instrument__overview-value case-study-instrument__overview-value--link"
                      >
                        <span>{value}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path
                            d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span key={value} className="case-study-instrument__overview-value">
                        {value}
                      </span>
                    ),
                  )}
                </dd>
              </div>
              );
            })}
          </dl>
        ) : null}
      </header>

      {leadImages.length > 0 ? (
        <div
          className={
            leadImages.length > 1
              ? 'case-study-instrument__lead-image-stack'
              : undefined
          }
        >
          {leadImages.map((image, i) => (
            <InstrumentFigure key={`lead-hero-${i}`} image={image} variant="hero" />
          ))}
        </div>
      ) : null}

      {instrument.chapters
        .filter((chapter) => chapter.beforeLeadBento)
        .map((chapter) => (
          <InstrumentChapter key={chapter.title} chapter={chapter} />
        ))}

      {instrument.leadBento ? (
        <CaseStudyInstrumentBentoGrid grid={instrument.leadBento} />
      ) : (
        instrument.heroImages?.map((image, i) => (
          <InstrumentFigure key={`hero-${i}`} image={image} variant="hero" />
        ))
      )}

      {instrument.chapters
        .filter((chapter) => !chapter.beforeLeadBento)
        .map((chapter) => (
          <InstrumentChapter key={chapter.title} chapter={chapter} />
        ))}

      {instrument.closing ? (
        <section className={`${GUTTER} case-study-instrument__chapter-wrap`}>
          <div className={CONTENT}>
            {instrument.closing.paragraphs.map((text, i) => (
              <p key={`closing-${i}`} className="case-study-instrument__body">
                {text}
              </p>
            ))}
          </div>
          {instrument.closing.image ? <InstrumentFigure image={instrument.closing.image} /> : null}
        </section>
      ) : null}

      {roleColumns.length > 0 ? (
        <section className={`${GUTTER} case-study-instrument__roles border-t border-[var(--border)]`}>
          <div className="mx-auto w-full max-w-[72rem]">
            <h2 className="case-study-instrument__roles-heading">
              {instrument.rolesHeading ?? 'Our Role'}
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {roleColumns.map((col) => (
                <div key={col.key}>
                  <h3 className="case-study-instrument__role-column">{col.label}</h3>
                  <ul className="case-study-instrument__role-list mt-5 space-y-2.5">
                    {roles![col.key]!.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {!content.hideRelatedCaseStudies && relatedProjects.length > 0 ? (
        <CaseStudyWhoopNext relatedProjects={relatedProjects} onViewCaseStudy={onViewCaseStudy} />
      ) : null}
    </article>
  );
}
