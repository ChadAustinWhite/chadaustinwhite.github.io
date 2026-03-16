interface CaseStudyWhoopPaginationProps {
  current: number;
  total: number;
}

export function CaseStudyWhoopPagination({ current, total }: CaseStudyWhoopPaginationProps) {
  const currentStr = String(current).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');

  return (
    <section className="border-t border-[var(--border)] px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-[72rem] items-center justify-between">
        <span className="text-[15px] font-medium tabular-nums leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
          {currentStr}/{totalStr}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          DragDragDrag
        </span>
      </div>
    </section>
  );
}
