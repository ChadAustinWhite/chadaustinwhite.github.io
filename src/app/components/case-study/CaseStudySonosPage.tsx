import { useCaseStudySectionBackground } from '../../hooks/useCaseStudySectionBackground';
import { CaseStudySonosSubpointAccordion } from './CaseStudySonosSubpointAccordion';
import { CaseStudySonosImageCarousel } from './CaseStudySonosImageCarousel';
import { CaseStudySonosWorkGrid } from './CaseStudySonosWorkGrid';
import { CaseStudySonosScreenStack } from './CaseStudySonosScreenStack';
import { CaseStudyPageHeader } from './CaseStudyPageHeader';
import {
  getSonosRasterStyle,
  SONOS_IMAGE_FRAME_CLASS,
  SONOS_RASTER_IMG_CLASS,
  SONOS_SCREENSHOT_MAX_WIDTH_PX,
} from './constants';
import type {
  CaseStudyContent,
  CaseStudySonosImage,
  CaseStudySonosImageVariant,
  CaseStudySonosMetric,
  CaseStudySonosNumberedItem,
  CaseStudySonosSubpoint,
  CaseStudySonosSection,
} from './types';

const GUTTER = 'px-[var(--cs-page-gutter)]';
const PROSE = 'mx-auto w-full max-w-[42rem]';
const MEDIA_SHELL = 'mx-auto w-full max-w-[72rem]';

const BODY = 'cs-text-body text-[var(--ink-muted)]';
const BODY_INK = 'cs-text-body text-[var(--ink)]';

const SONOS_ASPECT: Record<CaseStudySonosImageVariant, string> = {
  portrait: '2880 / 3840',
  wide: '3840 / 2400',
  wideShort: '3840 / 2000',
  wideTall: '3840 / 2548',
};

function getSonosSections(content: CaseStudyContent): CaseStudySonosSection[] {
  if (content.sonos?.sections?.length) return content.sonos.sections;
  return [];
}

function SonosImageCaption({ image }: { image: CaseStudySonosImage }) {
  if (!image.title && !image.caption) return null;

  return (
    <figcaption className={`${MEDIA_SHELL} mt-4 md:mt-5`}>
      {image.title ? (
        <p className="text-[15px] font-medium text-[var(--ink)] md:text-base">{image.title}</p>
      ) : null}
      {image.caption ? (
        <p className="cs-text-body mt-1 text-[var(--ink-muted)]">{image.caption}</p>
      ) : null}
    </figcaption>
  );
}

function SonosImagePanel({
  image,
  panel,
  className = '',
}: {
  image: CaseStudySonosImage;
  panel: 'primary' | 'secondary';
  className?: string;
}) {
  const useCardBg = image.background !== 'none';
  const src = panel === 'primary' ? image.src : image.duoSecondary!.src;
  const alt = panel === 'primary' ? image.alt : image.duoSecondary?.alt;
  const variant =
    panel === 'primary' ? image.variant : image.duoSecondary!.variant;
  const maxW = image.intrinsicWidthPx ?? SONOS_SCREENSHOT_MAX_WIDTH_PX;
  const useRasterCap = image.fitContent || image.padded;
  const imgClass = useRasterCap
    ? SONOS_RASTER_IMG_CLASS
    : `block h-full w-full ${image.objectFit === 'contain' ? 'object-contain' : 'object-cover'} [image-rendering:auto]`;

  return (
    <div
      className={`${SONOS_IMAGE_FRAME_CLASS} ${useCardBg ? 'bg-[var(--card-bg)]' : ''} ${useRasterCap ? 'flex justify-center' : ''} ${image.fitContent ? 'overflow-hidden' : ''} ${className}`.trim()}
      style={useRasterCap ? undefined : { aspectRatio: SONOS_ASPECT[variant] }}
    >
      <img
        src={src}
        alt={alt ?? ''}
        width={useRasterCap ? maxW : undefined}
        height={useRasterCap ? image.intrinsicHeightPx : undefined}
        className={imgClass}
        style={useRasterCap ? getSonosRasterStyle(maxW) : undefined}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Image break between narrative sections (full-bleed or inset within prose column). */
function SonosImageBlock({ image }: { image: CaseStudySonosImage }) {
  const captions = image.caption && !image.title ? [image.caption, image.caption] : [];
  const display = image.display ?? 'fullBleed';
  const useCardBg = image.background !== 'none';
  const imgClass = `block h-full w-full ${image.objectFit === 'contain' ? 'object-contain' : 'object-cover'}`;
  const shellClass = image.padded ? MEDIA_SHELL : 'w-full';

  if (display === 'duo' && image.duoSecondary) {
    return (
      <figure className="case-study-sonos-duo my-12 md:my-16">
        <div className={GUTTER}>
          <div
            className={`${shellClass} grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,2fr)_minmax(200px,1fr)] md:gap-5 lg:gap-6`}
          >
            <SonosImagePanel image={image} panel="primary" />
            <SonosImagePanel
              image={image}
              panel="secondary"
              className="mx-auto w-full max-w-[280px] md:mx-0 md:max-w-none"
            />
          </div>
        </div>
        <div className={GUTTER}>
          <SonosImageCaption image={image} />
        </div>
      </figure>
    );
  }

  if (display === 'inset') {
    return (
      <figure className={`${GUTTER} my-10 md:my-12`}>
        <div className={`${PROSE} mx-auto w-full`}>
          <div
            className={`${SONOS_IMAGE_FRAME_CLASS} ${useCardBg ? 'bg-[var(--card-bg)]' : ''}`}
            style={{ aspectRatio: SONOS_ASPECT[image.variant] }}
          >
            <img
              src={image.src}
              alt=""
              className={imgClass}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        {captions.map((text, i) => (
          <figcaption
            key={`${text}-${i}`}
            className={`${PROSE} cs-text-meta mx-auto w-full pt-4 text-center text-[var(--ink-muted)]`}
          >
            {text}
          </figcaption>
        ))}
      </figure>
    );
  }

  if (image.padded) {
    const maxW = image.intrinsicWidthPx ?? SONOS_SCREENSHOT_MAX_WIDTH_PX;
    return (
      <figure className={`${GUTTER} my-12 md:my-16`}>
        <div className={`${shellClass} flex justify-center`}>
          <div
            className={`${SONOS_IMAGE_FRAME_CLASS} ${useCardBg ? 'bg-[var(--card-bg)]' : ''} ${image.fitContent ? 'flex w-full justify-center' : ''}`}
            style={image.fitContent ? undefined : { aspectRatio: SONOS_ASPECT[image.variant] }}
          >
            <img
              src={image.src}
              alt={image.alt ?? ''}
              width={image.fitContent ? maxW : undefined}
              height={image.fitContent ? image.intrinsicHeightPx : undefined}
              className={image.fitContent ? SONOS_RASTER_IMG_CLASS : imgClass}
              style={image.fitContent ? getSonosRasterStyle(maxW) : undefined}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        {captions.length > 0
          ? captions.map((text, i) => (
              <figcaption
                key={`${text}-${i}`}
                className={`${PROSE} cs-text-meta mx-auto w-full pt-4 text-center text-[var(--ink-muted)]`}
              >
                {text}
              </figcaption>
            ))
          : (
            <div className={GUTTER}>
              <SonosImageCaption image={image} />
            </div>
          )}
      </figure>
    );
  }

  return (
    <figure className={`${GUTTER} my-12 md:my-16`}>
      <div
        className={`w-full ${SONOS_IMAGE_FRAME_CLASS} ${useCardBg ? 'bg-[var(--card-bg)]' : ''}`}
        style={{ aspectRatio: SONOS_ASPECT[image.variant] }}
      >
        <img src={image.src} alt="" className={imgClass} loading="lazy" decoding="async" />
      </div>
      {captions.map((text, i) => (
        <figcaption
          key={`${text}-${i}`}
          className={`${PROSE} cs-text-meta mx-auto w-full pt-4 text-center text-[var(--ink-muted)]`}
        >
          {text}
        </figcaption>
      ))}
    </figure>
  );
}

function SonosMetricsGrid({
  metrics,
  className = 'mt-8 md:mt-10',
}: {
  metrics: CaseStudySonosMetric[];
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 ${className}`.trim()}>
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0">
          <dt className="serif-headline text-[11px] leading-snug text-[var(--ink-muted)] md:text-xs">
            {metric.label}
          </dt>
          <dd className="serif-headline mt-1 text-base font-medium leading-tight tracking-[-0.02em] text-[var(--ink)] tabular-nums md:text-lg">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function SonosSubpointList({
  items,
  variant = 'bullet',
  className,
}: {
  items: CaseStudySonosSubpoint[];
  variant?: 'bullet' | 'stacked' | 'accordion';
  className?: string;
}) {
  if (variant === 'accordion') {
    return <CaseStudySonosSubpointAccordion items={items} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <ul className="mt-8 list-none space-y-0 p-0">
        {items.map((item) => (
          <li key={item.title} className="border-t border-[var(--border)] py-6 md:py-7">
            <p className="mb-2 text-[15px] font-semibold text-[var(--ink)] md:text-[17px]">
              {item.title}
            </p>
            <p className={BODY}>{item.body}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`${BODY} mt-6 list-disc space-y-3 pl-5 marker:text-[var(--ink-subtle)]`}>
      {items.map((item) => (
        <li key={item.title} className="text-[var(--ink-muted)]">
          <span className="font-semibold text-[var(--ink)]">{item.title}. </span>
          {item.body}
        </li>
      ))}
    </ul>
  );
}

function SonosNumberedList({ items }: { items: CaseStudySonosNumberedItem[] }) {
  return (
    <ol className="mt-8 list-none space-y-0 p-0">
      {items.map((item) => (
        <li key={`${item.number}-${item.title}`} className="border-t border-[var(--border)] py-6 md:py-8">
          <div className="flex gap-5 md:gap-10">
            <span
              className="serif-headline w-12 shrink-0 text-[clamp(36px,5vw,52px)] leading-none tabular-nums text-[var(--ink-subtle)] md:w-14"
              aria-hidden
            >
              {item.number}
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="mb-2 text-[15px] font-semibold text-[var(--ink)] md:text-[17px]">
                {item.title}
              </p>
              <p className={BODY}>{item.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function SonosTagPills({ tags }: { tags: string[] }) {
  return (
    <ul className="mb-8 flex flex-wrap gap-2" aria-label="Project tags">
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--nav-pill-bg)] px-3 py-1.5 text-[11px] font-medium leading-none text-[var(--ink-muted)] md:px-3.5 md:py-2 md:text-[13px]">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SonosSectionExtras({ section }: { section: CaseStudySonosSection }) {
  return (
    <>
      {section.metrics && section.metrics.length > 0 ? (
        <SonosMetricsGrid metrics={section.metrics} />
      ) : null}
      {section.numberedItems && section.numberedItems.length > 0 ? (
        <SonosNumberedList items={section.numberedItems} />
      ) : null}
      {section.testimonial ? (
        <SonosTestimonial
          quote={section.testimonial.quote}
          name={section.testimonial.name}
          role={section.testimonial.role}
        />
      ) : null}
    </>
  );
}

function SonosSectionHeading({ section }: { section: CaseStudySonosSection }) {
  return (
    <>
      {section.phase ? (
        <p className="cs-text-label mb-3 text-[var(--ink-muted)]">{section.phase}</p>
      ) : null}
      <h2
        className={
          section.layout === 'editorial' || section.phase
            ? 'case-study-editorial__section-heading serif-headline max-w-[14ch] text-[var(--ink)]'
            : 'cs-text-title text-[var(--ink)]'
        }
      >
        {section.heading}
      </h2>
    </>
  );
}

function SonosSectionParagraphs({ section }: { section: CaseStudySonosSection }) {
  return (
    <>
      {section.paragraphs.map((p, j) => (
        <p
          key={`${section.heading}-p-${j}`}
          className={
            section.layout === 'editorial'
              ? 'case-study-editorial__section-body serif-headline max-w-[42ch] text-[var(--ink-muted)]'
              : 'text-[var(--ink-muted)]'
          }
        >
          {p}
        </p>
      ))}
    </>
  );
}

function SonosSectionCopy({ section }: { section: CaseStudySonosSection }) {
  return (
    <>
      <SonosSectionHeading section={section} />
      <SonosSectionParagraphs section={section} />
    </>
  );
}

function SonosSectionNarrative({
  section,
  narrativeLayout,
}: {
  section: CaseStudySonosSection;
  narrativeLayout: 'default' | 'editorial';
}) {
  const useEditorial =
    narrativeLayout === 'editorial' || section.layout === 'editorial' || Boolean(section.phase);

  if (useEditorial) {
    return (
      <div className="mx-auto w-full max-w-[72rem] cs-text-body">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
          <div className="md:col-span-5">
            <SonosSectionHeading section={{ ...section, layout: 'editorial' }} />
          </div>
          <div className="min-w-0 space-y-5 md:col-span-6 md:col-start-7">
            <SonosSectionParagraphs section={{ ...section, layout: 'editorial' }} />
            {section.subpoints && section.subpoints.length > 0 ? (
              <SonosSubpointList
                items={section.subpoints}
                variant={section.subpointsVariant ?? 'accordion'}
                className="mt-2"
              />
            ) : null}
            <SonosSectionExtras section={section} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${PROSE} cs-text-body sonos-section-copy space-y-5`}>
      <SonosSectionCopy section={section} />
      {section.subpoints && section.subpoints.length > 0 ? (
        <SonosSubpointList
          items={section.subpoints}
          variant={section.subpointsVariant ?? 'accordion'}
        />
      ) : null}
      <SonosSectionExtras section={section} />
    </div>
  );
}

function SonosTestimonial({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <blockquote className="my-10 border-0 md:my-12">
      <p className={BODY}>“{quote}”</p>
      <footer className="mt-6">
        <p className={`${BODY_INK} font-medium`}>{name}</p>
        <p className="cs-text-label mt-1 text-[var(--ink-muted)]">{role}</p>
      </footer>
    </blockquote>
  );
}

const ROLE_COLUMNS: {
  key: keyof NonNullable<CaseStudyContent['roles']>;
  label: string;
}[] = [
  { key: 'strategy', label: 'Strategy' },
  { key: 'content', label: 'Content' },
  { key: 'design', label: 'Design' },
  { key: 'development', label: 'Engineering' },
];

function SonosRoles({ content }: { content: CaseStudyContent }) {
  const roles = content.roles;
  const columns = ROLE_COLUMNS.filter((col) => (roles?.[col.key]?.length ?? 0) > 0);
  if (columns.length === 0) return null;

  return (
    <section className={`${GUTTER} border-t border-[var(--border)] py-16 md:py-24`}>
      <div className="max-w-[72rem]">
        <h2 className="cs-text-label text-left text-[var(--ink-muted)]">My Roles</h2>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {columns.map((col) => (
          <div key={col.key}>
            <h3 className="cs-text-label mb-4 text-[var(--ink-muted)]">{col.label}</h3>
            <ul className={`${BODY} space-y-2`}>
              {roles![col.key]!.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

interface CaseStudySonosPageProps {
  content: CaseStudyContent;
  onBack: () => void;
}

export function CaseStudySonosPage({ content, onBack }: CaseStudySonosPageProps) {
  useCaseStudySectionBackground(Boolean(content.scrollGradient));

  const sonos = content.sonos;
  const narrativeLayout = sonos?.narrativeLayout ?? 'default';
  const sections = getSonosSections(content);
  const tags = sonos ? (sonos.tags ?? []) : (content.projectFocus ?? []);
  const headerLead = sonos?.lead?.trim() || content.meta.organizationNote?.trim() || undefined;

  return (
    <article className="case-study-sonos bg-[var(--bg)] pb-8 text-[var(--ink)]">
      <div
        className={`${GUTTER} pt-[7.5rem] ${
          sonos?.heroCarousel?.length ? 'pb-0' : 'pb-14 md:pb-20'
        }`}
      >
        <CaseStudyPageHeader
          content={content}
          onBack={onBack}
          metrics={sonos?.heroMetrics}
          lead={headerLead}
        />

        {tags.length > 0 ? (
          <div className="mt-10 md:mt-12">
            <SonosTagPills tags={tags} />
          </div>
        ) : null}

        {sonos?.introImage && !sonos?.heroCarousel ? (
          <div className="mt-10 md:mt-12">
            <SonosImageBlock image={sonos.introImage} />
          </div>
        ) : null}

      </div>

      {sonos?.heroCarousel && sonos.heroCarousel.length > 0 ? (
        <CaseStudySonosImageCarousel images={sonos.heroCarousel} />
      ) : null}

      {sections.map((section, i) => (
        <div key={`${section.heading}-${i}`} className="case-study-sonos-chapter">
          {section.screenStack &&
          section.screenStack.items.length > 0 &&
          (section.screenStack.position ?? 'below') === 'above' ? (
            <CaseStudySonosScreenStack stack={section.screenStack} />
          ) : null}
          {section.workGrid &&
          section.workGrid.rows.length > 0 &&
          (section.workGrid.position ?? 'below') === 'above' ? (
            <CaseStudySonosWorkGrid grid={section.workGrid} />
          ) : null}
          <section
            className={`${GUTTER} pb-10 md:pb-14 ${i > 0 ? 'border-t border-[var(--border)] pt-12 md:pt-16' : 'pt-2 md:pt-4'}`}
          >
            {section.layout === 'split' && section.subpoints && section.subpoints.length > 0 ? (
              <div className="mx-auto w-full max-w-[72rem] cs-text-body space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                  <div className="min-w-0 space-y-5 md:max-w-[34rem]">
                    <SonosSectionCopy section={section} />
                  </div>
                  <div className="min-w-0 md:pt-1">
                    <SonosSubpointList
                      items={section.subpoints}
                      variant={section.subpointsVariant ?? 'accordion'}
                      className="mt-0"
                    />
                  </div>
                </div>
                <div className={`${PROSE} space-y-5`}>
                  <SonosSectionExtras section={section} />
                </div>
              </div>
            ) : (
              <SonosSectionNarrative section={section} narrativeLayout={narrativeLayout} />
            )}
          </section>
          {section.imageCarousel && section.imageCarousel.length > 0 ? (
            <CaseStudySonosImageCarousel images={section.imageCarousel} />
          ) : null}
          {section.workGrid &&
          section.workGrid.rows.length > 0 &&
          (section.workGrid.position ?? 'below') === 'below' ? (
            <CaseStudySonosWorkGrid grid={section.workGrid} />
          ) : null}
          {section.screenStack &&
          section.screenStack.items.length > 0 &&
          (section.screenStack.position ?? 'below') === 'below' ? (
            <CaseStudySonosScreenStack stack={section.screenStack} />
          ) : null}
          {section.image ? <SonosImageBlock image={section.image} /> : null}
          {section.imageSequence?.map((img, seqIndex) => (
            <SonosImageBlock key={`${section.heading}-seq-${seqIndex}`} image={img} />
          ))}
          {section.imageDuos?.map((duo, duoIndex) => (
            <SonosImageBlock key={`${section.heading}-duo-${duoIndex}`} image={duo} />
          ))}
        </div>
      ))}

      <SonosRoles content={content} />
    </article>
  );
}
