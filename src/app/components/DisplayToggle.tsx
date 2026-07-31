type DisplayMode = 'stack' | 'grid';

interface DisplayToggleProps {
  value: DisplayMode;
  onChange: (mode: DisplayMode) => void;
}

function StackIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0">
      <rect x="1" y="1" width="11" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1" y="8" width="11" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="7" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="7" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function DisplayToggle({ value, onChange }: DisplayToggleProps) {
  return (
    <div className="flex items-center gap-2.5">
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
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-normal transition-[background,color,border-color] duration-150 md:text-[13px] ${
            value === 'stack'
              ? 'border-[var(--nav-pill-bg)] bg-[var(--nav-pill-bg)] text-[var(--ink)]'
              : 'border-[var(--border)] bg-transparent text-[var(--ink-muted)] hover:bg-[var(--card-bg)] hover:text-[var(--ink)]'
          }`}
        >
          <StackIcon />
          Stack
        </button>
        <button
          type="button"
          onClick={() => onChange('grid')}
          aria-label="Grid layout"
          aria-pressed={value === 'grid'}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-normal transition-[background,color,border-color] duration-150 md:text-[13px] ${
            value === 'grid'
              ? 'border-[var(--nav-pill-bg)] bg-[var(--nav-pill-bg)] text-[var(--ink)]'
              : 'border-[var(--border)] bg-transparent text-[var(--ink-muted)] hover:bg-[var(--card-bg)] hover:text-[var(--ink)]'
          }`}
        >
          <GridIcon />
          Grid
        </button>
      </div>
    </div>
  );
}
