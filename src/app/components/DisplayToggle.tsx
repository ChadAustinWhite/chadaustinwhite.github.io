import React from 'react';
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
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
        Display
      </span>
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => onChange('grid')}
          aria-label="Grid layout"
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-[background,color,border-color] duration-150 ${
            value === 'grid'
              ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]'
              : 'border-[var(--border)] bg-transparent text-[var(--ink-muted)] hover:bg-[var(--card-bg)] hover:text-[var(--ink)]'
          }`}
        >
          <GridIcon />
          Grid
        </button>
        <button
          type="button"
          onClick={() => onChange('stack')}
          aria-label="Stack layout"
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-[background,color,border-color] duration-150 ${
            value === 'stack'
              ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]'
              : 'border-[var(--border)] bg-transparent text-[var(--ink-muted)] hover:bg-[var(--card-bg)] hover:text-[var(--ink)]'
          }`}
        >
          <StackIcon />
          Stack
        </button>
      </div>
    </div>
  );
}
