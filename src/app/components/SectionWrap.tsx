import { type ReactNode } from 'react';

interface SectionWrapProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrap({ id, children, className = '' }: SectionWrapProps) {
  return (
    <section
      id={id}
      className={`border-t border-[var(--border)] py-14 px-5 md:py-[72px] md:px-[100px] ${className}`}
    >
      {children}
    </section>
  );
}
