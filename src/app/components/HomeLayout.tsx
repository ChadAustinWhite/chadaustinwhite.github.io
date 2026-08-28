import { HomeSlider } from './HomeSlider';
import type { CaseStudyRoute } from '../data/portfolioData';

interface HomeLayoutProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function HomeLayout({ onViewCaseStudy }: HomeLayoutProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main id="main-content">
        <HomeSlider onViewCaseStudy={onViewCaseStudy} />
      </main>
    </>
  );
}
