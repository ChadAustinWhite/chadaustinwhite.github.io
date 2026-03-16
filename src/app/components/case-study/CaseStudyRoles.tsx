import type { CaseStudyRoles } from './types';

interface CaseStudyRolesProps {
  roles?: CaseStudyRoles;
}

export function CaseStudyRoles({ roles }: CaseStudyRolesProps) {
  if (!roles) return null;

  const sections: { label: string; items?: string[] }[] = [
    { label: 'Design', items: roles.design },
    { label: 'Strategy', items: roles.strategy },
    { label: 'Content', items: roles.content },
    { label: 'Development', items: roles.development },
  ].filter((section) => section.items && section.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <section id="cs-roles" className="border-t border-[var(--border-subtle)] py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          Our Role
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <div key={section.label} className="space-y-3">
              <h3 className="text-sm font-semibold tracking-tight text-[var(--ink)]">
                {section.label}
              </h3>
              <ul className="space-y-1.5 text-base leading-relaxed text-[var(--ink-muted)]">
                {section.items!.map((item) => (
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

