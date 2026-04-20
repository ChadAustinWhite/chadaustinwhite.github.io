import type { ExperienceItem } from '../data/portfolioData';

interface TimelineCardProps {
  item: ExperienceItem;
}

export function TimelineCard({ item }: TimelineCardProps) {
  return (
    <div className="experience-card rounded-xl border border-[var(--experience-card-border,var(--border))] bg-[var(--experience-card-surface,var(--card-bg))] p-7 md:p-9 md:pb-8">
      <div className="flex flex-col items-start gap-4">
        <div
          className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--experience-card-border,var(--border))] bg-[var(--experience-card-surface,var(--card-bg))]"
          style={{ marginTop: '1px' }}
        >
          <span className="text-[9px] font-bold tracking-[0.04em] text-[var(--experience-card-ink-muted,var(--ink-muted))]">
            {item.logoText}
          </span>
        </div>
        <div>
          <div className="text-[22px] font-medium leading-tight text-[var(--experience-card-ink,var(--ink))]">
            {item.company}
          </div>
          <div className="mt-0.5 text-sm text-[var(--experience-card-ink-muted,var(--ink-muted))]">{item.role}</div>
          <p className="mt-2 max-w-[560px] text-sm leading-[1.55] text-[var(--experience-card-ink-muted,var(--ink-muted))]">
            {item.detail}
          </p>
          <div className="mt-2 font-mono text-xs tabular-nums text-[var(--experience-card-ink-muted,var(--ink-muted))]">
            {item.period}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded-full border border-[var(--experience-card-border,var(--border))] bg-[var(--experience-tag-bg,var(--bg))] px-3 py-1.5 text-xs text-[var(--experience-card-ink-muted,var(--ink-muted))]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
