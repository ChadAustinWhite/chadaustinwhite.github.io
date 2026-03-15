import { CaseStudyLayout } from './CaseStudyLayout';
import { CaseStudyHero } from './CaseStudyHero';

interface CaseStudyPlaceholderProps {
  title: string;
  onBack: () => void;
  onNavigateHome: () => void;
}

export function CaseStudyPlaceholder({ title, onBack, onNavigateHome }: CaseStudyPlaceholderProps) {
  return (
    <CaseStudyLayout onNavigateHome={onNavigateHome}>
      <CaseStudyHero
        onBack={onBack}
        title={title}
        meta={{
          organization: '—',
          role: '—',
          year: '—',
          duration: '—',
        }}
        tagline=""
      />
      <section className="px-5 py-14 md:px-10 md:py-[4.5rem]">
        <p
          className="max-w-[640px] text-[15px] leading-[1.75] text-[var(--ink-muted)]"
        >
          Case study coming soon.
        </p>
      </section>
    </CaseStudyLayout>
  );
}
