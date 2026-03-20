import { createContext, useContext, type ReactNode } from 'react';
import type { CaseStudyContent } from './types';

const DEFAULT_BRAND = 'Chad Austin White';

const CaseStudySectionBrandContext = createContext<string>(DEFAULT_BRAND);

/** Left label in section bars (e.g. … / OVERVIEW). */
export function getSectionHeaderBrand(content: CaseStudyContent): string {
  if (content.sectionHeaderBrand?.trim()) return content.sectionHeaderBrand.trim();
  if (content.heroTitleLines?.[1]?.trim()) return content.heroTitleLines[1].trim();
  return DEFAULT_BRAND;
}

export function CaseStudySectionBrandProvider({
  brand,
  children,
}: {
  brand: string;
  children: ReactNode;
}) {
  return (
    <CaseStudySectionBrandContext.Provider value={brand}>{children}</CaseStudySectionBrandContext.Provider>
  );
}

export function useCaseStudySectionBrand(): string {
  return useContext(CaseStudySectionBrandContext);
}
