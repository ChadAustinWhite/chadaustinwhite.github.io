import type { ReactNode } from 'react';

interface CaseStudySectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function CaseStudySection({ children, className = '', id }: CaseStudySectionProps) {
  return (
    <section id={id} className={`px-5 py-14 md:px-10 md:py-[4.5rem] ${className}`.trim()}>
      {children}
    </section>
  );
}
