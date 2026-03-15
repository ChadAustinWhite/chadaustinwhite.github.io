import { ThemeToggle } from './ThemeToggle';
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

export function SiteNav() {
  const scrolled = useScrollBorder(20);

  return (
    <nav
      id="site-nav"
      className="fixed left-0 right-0 top-0 z-[100] flex h-14 md:h-16 items-center justify-between border-b px-5 transition-[border-color,background-color] duration-[0.2s] ease-out md:px-10"
      style={{
        background: 'var(--nav-bg)',
        borderBottomColor: scrolled ? 'var(--border)' : 'transparent',
      }}
    >
      <div className="flex items-center gap-3.5">
        <a
          href="#about"
          onClick={handleSmoothScroll}
          className="whitespace-nowrap text-sm font-bold tracking-[0.03em] text-[var(--ink)]"
        >
          Chad Austin White
        </a>
      </div>
      <div className="flex items-center gap-7 md:gap-6">
        <ul className="flex items-center gap-4 md:gap-6">
          <li>
            <a href="#work" onClick={handleSmoothScroll} className="text-xs text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)] md:text-[13px]">
              Work
            </a>
          </li>
          <li>
            <a href="#experience" onClick={handleSmoothScroll} className="text-xs text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink)] md:text-[13px]">
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
        <ThemeToggle />
      </div>
    </nav>
  );
}
