import type { CaseStudyContent } from './types';
import { ScrollReveal } from './ScrollReveal';
import { CaseStudySectionHeader } from './CaseStudySectionLayout';

interface CaseStudyWhoopRolesProps {
  content: CaseStudyContent;
}

const ROLE_COLUMNS: { key: keyof NonNullable<CaseStudyContent['roles']>; label: string }[] = [
  { key: 'design', label: 'DESIGN' },
  { key: 'strategy', label: 'STRATEGY' },
  { key: 'content', label: 'CONTENT' },
  { key: 'development', label: 'Development' },
];

export function CaseStudyWhoopRoles({ content }: CaseStudyWhoopRolesProps) {
  const roles = content.roles;
  const viewLiveUrl = content.viewLiveUrl;

  const columnsWithItems = ROLE_COLUMNS.filter((col) => {
    const items = roles?.[col.key];
    return items && items.length > 0;
  });

  if (columnsWithItems.length === 0 && !viewLiveUrl) return null;

  return (
    <section id="cs-roles" className="border-t border-[var(--border)] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[72rem]">
        <ScrollReveal>
          <CaseStudySectionHeader sectionLabel="OUR ROLE" />
          <div className="mt-10">
          {columnsWithItems.length > 0 && (
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
              {columnsWithItems.map((col) => {
                const items = roles![col.key]!;
                return (
                  <div key={col.key}>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                      {col.label}
                    </p>
                    <ul className="space-y-2 text-[15px] leading-[1.65] text-[var(--ink-muted)] md:text-[17px]">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
          {viewLiveUrl && (
            <a
              href={viewLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-[15px] font-medium text-[var(--ink)] underline underline-offset-2 transition-colors hover:text-[var(--ink-muted)] md:mt-10 md:text-[17px]"
            >
              View live site
            </a>
          )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
