import { useCaseStudySectionBackground } from '../../hooks/useCaseStudySectionBackground';
import { CaseStudySonosSubpointAccordion } from './CaseStudySonosSubpointAccordion';
import { CaseStudySonosImageCarousel } from './CaseStudySonosImageCarousel';
import { CaseStudyPageHeader } from './CaseStudyPageHeader';
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

/** Image break between narrative sections (full-bleed or inset within prose column). */
function SonosImageBlock({ image }: { image: CaseStudySonosImage }) {
  const captions = image.caption ? [image.caption, image.caption] : [];
  const display = image.display ?? 'fullBleed';
  const useCardBg = image.background !== 'none';
  const imgClass = `block h-full w-full ${image.objectFit === 'contain' ? 'object-contain' : 'object-cover'}`;

  if (display === 'duo' && image.duoSecondary) {
    const secondary = image.duoSecondary;

    return (
      <figure className={`${GUTTER} my-12 md:my-16`}>
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-5 md:gap-6">
          <div
            className="overflow-hidden rounded-2xl bg-[var(--card-bg)] md:rounded-3xl"
            style={{ aspectRatio: SONOS_ASPECT[image.variant] }}
          >
            <img src={image.src} alt="" className={imgClass} loading="lazy" decoding="async" />
          </div>
          <div
            className="mx-auto w-full max-w-[200px] shrink-0 overflow-hidden rounded-2xl bg-[var(--card-bg)] sm:mx-0 sm:w-[clamp(180px,22vw,260px)] md:rounded-3xl"
            style={{ aspectRatio: SONOS_ASPECT[secondary.variant] }}
          >
            <img
              src={secondary.src}
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

  if (display === 'inset') {
    return (
      <figure className={`${GUTTER} my-10 md:my-12`}>
        <div className={`${PROSE} mx-auto w-full`}>
          <div
            className={`overflow-hidden rounded-2xl md:rounded-3xl ${useCardBg ? 'bg-[var(--card-bg)]' : ''}`}
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
    return (
      <figure className={`${GUTTER} my-12 md:my-16`}>
        <div
          className={`w-full overflow-hidden ${useCardBg ? 'bg-[var(--card-bg)]' : ''}`}
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

  return (
    <figure className="my-12 md:my-16">
      <div
        className={`-mx-[var(--cs-page-gutter)] w-[calc(100%+2*var(--cs-page-gutter))] overflow-hidden ${useCardBg ? 'bg-[var(--card-bg)]' : ''}`}
      >
        <div className="w-full" style={{ aspectRatio: SONOS_ASPECT[image.variant] }}>
          <img src={image.src} alt="" className={imgClass} loading="lazy" decoding="async" />
        </div>
      </div>
      {captions.map((text, i) => (
        <figcaption
          key={`${text}-${i}`}
          className={`${GUTTER} cs-text-meta mx-auto max-w-[42rem] pt-4 text-center text-[var(--ink-muted)]`}
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
}: {
  items: CaseStudySonosSubpoint[];
  variant?: 'bullet' | 'stacked' | 'accordion';
}) {
  if (variant === 'accordion') {
    return <CaseStudySonosSubpointAccordion items={items} />;
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
  const sections = getSonosSections(content);
  const lead =
    sonos?.lead ??
    content.overview?.paragraphs?.[1] ??
    content.heroIntro ??
    content.tagline;
  const tags = sonos ? (sonos.tags ?? []) : (content.projectFocus ?? []);
  const showLeadBelowHero = Boolean(sonos?.lead?.trim() && !content.meta.organizationNote);

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

        {showLeadBelowHero ? (
          <div className={`${PROSE} mt-10 md:mt-12`}>
            <p className="cs-text-lead text-[var(--ink-muted)]">{lead}</p>
          </div>
        ) : null}
      </div>

      {sonos?.heroCarousel && sonos.heroCarousel.length > 0 ? (
        <CaseStudySonosImageCarousel images={sonos.heroCarousel} />
      ) : null}

      {sections.map((section, i) => (
        <div key={`${section.heading}-${i}`}>
          <section className={`${GUTTER} pb-10 md:pb-14`}>
            <div className={`${PROSE} cs-text-body space-y-5`}>
              <h2 className="cs-text-title text-[var(--ink)]">{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={`${section.heading}-p-${j}`} className="text-[var(--ink-muted)]">
                  {p}
                </p>
              ))}
              {section.metrics && section.metrics.length > 0 ? (
                <SonosMetricsGrid metrics={section.metrics} />
              ) : null}
              {section.subpoints && section.subpoints.length > 0 ? (
                <SonosSubpointList
                  items={section.subpoints}
                  variant={section.subpointsVariant ?? 'bullet'}
                />
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
            </div>
          </section>
          {section.imageCarousel && section.imageCarousel.length > 0 ? (
            <CaseStudySonosImageCarousel images={section.imageCarousel} />
          ) : null}
          {section.image ? <SonosImageBlock image={section.image} /> : null}
        </div>
      ))}

      <SonosRoles content={content} />
    </article>
  );
}
