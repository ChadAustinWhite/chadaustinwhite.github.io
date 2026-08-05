type DisplayMode = 'stack' | 'grid';

interface DisplayToggleProps {
  value: DisplayMode;
  onChange: (mode: DisplayMode) => void;
}

function StackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden>
      <rect x="1" y="1" width="11" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1" y="8" width="11" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden>
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="7" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="7" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

const buttonBase =
  'display-toggle__btn inline-flex items-center gap-2.5 rounded-full border-2 px-6 py-3 text-[15px] font-normal transition-[background,color,border-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]';

const buttonActive =
  'border-[var(--ink)] bg-[var(--card-bg)] text-[var(--ink)]';

const buttonInactive =
  'border-[var(--border)] bg-transparent text-[var(--ink-muted)] hover:border-[color-mix(in_srgb,var(--ink)_20%,var(--border))] hover:bg-[var(--card-bg)] hover:text-[var(--ink)]';

export function DisplayToggle({ value, onChange }: DisplayToggleProps) {
  return (
    <div className="display-toggle flex items-center gap-2.5">
      <span
        id="display-toggle-label"
        className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]"
      >
        Display
      </span>
      <div className="flex gap-1.5" role="group" aria-labelledby="display-toggle-label">
        <button
          type="button"
          onClick={() => onChange('stack')}
          aria-label="Stack layout"
          aria-pressed={value === 'stack'}
          className={`${buttonBase} ${value === 'stack' ? buttonActive : buttonInactive}`}
        >
          <StackIcon />
          Stack
        </button>
        <button
          type="button"
          onClick={() => onChange('grid')}
          aria-label="Grid layout"
          aria-pressed={value === 'grid'}
          className={`${buttonBase} ${value === 'grid' ? buttonActive : buttonInactive}`}
        >
          <GridIcon />
          Grid
        </button>
      </div>
    </div>
  );
}
