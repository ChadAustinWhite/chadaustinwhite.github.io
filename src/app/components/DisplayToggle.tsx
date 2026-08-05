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

export function DisplayToggle({ value, onChange }: DisplayToggleProps) {
  return (
    <div className="display-toggle flex items-center gap-2.5">
      <span id="display-toggle-label" className="display-toggle__label">
        Display
      </span>
      <div className="display-toggle__group" role="group" aria-labelledby="display-toggle-label">
        <button
          type="button"
          onClick={() => onChange('stack')}
          aria-label="Stack layout"
          aria-pressed={value === 'stack'}
          className={`display-toggle__btn${value === 'stack' ? ' is-active' : ''}`}
        >
          <StackIcon />
          Stack
        </button>
        <button
          type="button"
          onClick={() => onChange('grid')}
          aria-label="Grid layout"
          aria-pressed={value === 'grid'}
          className={`display-toggle__btn${value === 'grid' ? ' is-active' : ''}`}
        >
          <GridIcon />
          Grid
        </button>
      </div>
    </div>
  );
}
