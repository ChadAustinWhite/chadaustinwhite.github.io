import { type CSSProperties, type ReactNode } from 'react';

interface SectionWrapProps {
  id: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function SectionWrap({ id, children, className = '', style }: SectionWrapProps) {
  return (
    <section
      id={id}
      style={style}
      className={`border-t border-[var(--border)] py-14 px-5 md:py-[72px] md:px-10 ${className}`}
    >
      {children}
    </section>
  );
}
