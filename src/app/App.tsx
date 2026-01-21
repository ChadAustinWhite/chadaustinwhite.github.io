import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { FeaturedWork } from './components/FeaturedWork';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { CaseStudy } from './components/CaseStudy';
import { CaseStudyCreativeSpace } from './components/CaseStudyCreativeSpace';
import { CaseStudyLuxuryGoods } from './components/CaseStudyLuxuryGoods';
import { CaseStudyFashionForward } from './components/CaseStudyFashionForward';
import { CaseStudyTechInnovation } from './components/CaseStudyTechInnovation';

type PageType = 
  | 'home' 
  | 'case-study-modern-architecture'
  | 'case-study-creative-space'
  | 'case-study-luxury-goods'
  | 'case-study-fashion-forward'
  | 'case-study-tech-innovation';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleProjectClick = (projectTitle: string) => {
    const pageMap: Record<string, PageType> = {
      'Expedia Group Accelerator': 'case-study-modern-architecture',
      'Worldpay API Key Management': 'case-study-creative-space',
      'Expedia Group Ad Portal': 'case-study-luxury-goods',
      'First American Title Galileo': 'case-study-fashion-forward',
    };

    const page = pageMap[projectTitle];
    if (page) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleBackFromCaseStudy = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: 'home') => {
    setCurrentPage(page);
  };

  const handleNavigateToProject = (projectTitle: string) => {
    handleProjectClick(projectTitle);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation onNavigate={handleNavigate} />
      {currentPage === 'home' ? (
        <>
          <Hero />
          <FeaturedWork onProjectClick={handleProjectClick} />
          <Clients />
          <Contact />
        </>
      ) : currentPage === 'case-study-modern-architecture' ? (
        <CaseStudy onBack={handleBackFromCaseStudy} onNavigate={handleNavigate} onNavigateToProject={handleNavigateToProject} />
      ) : currentPage === 'case-study-creative-space' ? (
        <CaseStudyCreativeSpace onBack={handleBackFromCaseStudy} onNavigateToProject={handleNavigateToProject} />
      ) : currentPage === 'case-study-luxury-goods' ? (
        <CaseStudyLuxuryGoods onBack={handleBackFromCaseStudy} onNavigateToProject={handleNavigateToProject} />
      ) : currentPage === 'case-study-fashion-forward' ? (
        <CaseStudyFashionForward onBack={handleBackFromCaseStudy} onNavigateToProject={handleNavigateToProject} />
      ) : currentPage === 'case-study-tech-innovation' ? (
        <CaseStudyTechInnovation onBack={handleBackFromCaseStudy} onNavigateToProject={handleNavigateToProject} />
      ) : null}
    </div>
  );
}