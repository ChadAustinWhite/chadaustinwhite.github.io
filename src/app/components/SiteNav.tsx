import { useScrollBorder } from '../hooks/useScrollBorder';
import { LINKEDIN_URL, EMAIL, CV_URL } from '../data/contact';

function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href');
  if (href?.startsWith('#')) {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

interface SiteNavProps {
  /** When set, logo and in-page links (Work, Experience) navigate back to home instead of using hash. */
  onNavigateHome?: () => void;
}

export function SiteNav({ onNavigateHome }: SiteNavProps = {}) {
  const scrolled = useScrollBorder(20);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    } else {
      handleSmoothScroll(e);
    }
  };

  return (
    <nav
      id="site-nav"
      className="site-nav-surface fixed left-0 right-0 top-0 z-[100] flex h-14 md:h-16 items-center justify-between border-b px-[var(--cs-page-gutter)] motion-reduce:transition-none"
      style={{
        background: 'var(--home-canvas, var(--nav-bg))',
        borderBottomColor: scrolled ? 'var(--border)' : 'transparent',
      }}
    >
      <div className="flex items-center gap-3.5">
        <a
          href={onNavigateHome ? '#work' : '#about'}
          onClick={handleNavClick}
          className="whitespace-nowrap text-sm font-normal tracking-[0.03em] text-[var(--ink)]"
        >
          Chad Austin White
        </a>
      </div>
      <div className="flex items-center gap-7 md:gap-6">
        <ul className="flex items-center gap-4 md:gap-6">
          <li>
            <a href="#work" onClick={handleNavClick} className="text-xs text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)] md:text-[13px]">
              Work
            </a>
          </li>
          <li>
            <a href="#experience" onClick={handleNavClick} className="text-xs text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)] md:text-[13px]">
              Experience
            </a>
          </li>
          <li className="hidden md:list-item">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]">
              LinkedIn
            </a>
          </li>
          <li className="hidden md:list-item">
            <a href={EMAIL} className="text-[13px] text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)]">
              Email
            </a>
          </li>
          <li>
            <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)] md:text-[13px]">
              CV
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
