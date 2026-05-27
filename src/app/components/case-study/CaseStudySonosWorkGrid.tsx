import type { CaseStudySonosWorkGrid as WorkGridData, CaseStudySonosWorkGridCell } from './types';

const GUTTER = 'px-[var(--cs-page-gutter)]';

const ASPECT: Record<NonNullable<CaseStudySonosWorkGridCell['aspect']>, string> = {
  landscape: '3 / 2',
  portrait: '4 / 5',
  square: '1 / 1',
};

function cellAspect(cell: CaseStudySonosWorkGridCell): string {
  if (cell.aspect) return ASPECT[cell.aspect];
  return cell.size === 'large' ? ASPECT.landscape : ASPECT.portrait;
}

function WorkGridCell({ cell }: { cell: CaseStudySonosWorkGridCell }) {
  const sizeClass = cell.size === 'large' ? 'is-large' : 'is-small';

  return (
    <figure
      className={`case-study-sonos-work-grid__cell ${sizeClass}`}
      data-aspect={cell.aspect ?? (cell.size === 'large' ? 'landscape' : 'portrait')}
    >
      <div
        className="case-study-sonos-work-grid__media overflow-hidden rounded-2xl bg-[var(--card-bg)] md:rounded-3xl"
        style={{ aspectRatio: cellAspect(cell) }}
      >
        <img
          src={cell.src}
          alt={cell.alt ?? ''}
          className="block h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      {(cell.title || cell.caption) && (
        <figcaption className="case-study-sonos-work-grid__caption mt-4 md:mt-5">
          {cell.title ? (
            <p className="text-[15px] font-medium text-[var(--ink)] md:text-base">{cell.title}</p>
          ) : null}
          {cell.caption ? (
            <p className="cs-text-body mt-1 text-[var(--ink-muted)]">{cell.caption}</p>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}

interface CaseStudySonosWorkGridProps {
  grid: WorkGridData;
}

export function CaseStudySonosWorkGrid({ grid }: CaseStudySonosWorkGridProps) {
  if (!grid.rows.length) return null;

  return (
    <div className={`case-study-sonos-work-grid ${GUTTER}`} aria-label="Project imagery">
      {grid.rows.map((row, rowIndex) => (
        <div key={`work-grid-row-${rowIndex}`} className="case-study-sonos-work-grid__row">
          {row.cells.map((cell, cellIndex) => (
            <WorkGridCell key={`work-grid-${rowIndex}-${cellIndex}-${cell.src}`} cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}
