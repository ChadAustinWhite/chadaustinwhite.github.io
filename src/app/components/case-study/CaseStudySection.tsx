import type { ReactNode } from 'react';

interface CaseStudySectionProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudySection({ children, className = '' }: CaseStudySectionProps) {
  return (
    <section className={`px-5 py-14 md:px-10 md:py-[4.5rem] ${className}`.trim()}>
      {children}
    </section>
  );
}
