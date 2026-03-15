import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const PAGE_BG: Record<string, Record<string, string>> = {
  light: {
    about: '#f2f2f0',
    work: '#ede9e1',
    experience: '#e8ecf5',
    education: '#f0ecf6',
  },
  dark: {
    about: '#111110',
    work: '#17140e',
    experience: '#0d1219',
    education: '#130e19',
  },
};

function applyPageBg(sectionId: string, theme: string | undefined) {
  const resolved = theme === 'dark' ? 'dark' : 'light';
  const map = PAGE_BG[resolved] ?? PAGE_BG.light;
  const color = map[sectionId] ?? map.about;
  document.body.style.backgroundColor = color;
  const nav = document.getElementById('site-nav');
  if (nav) nav.style.backgroundColor = color;
}

const DEFAULT_BG = { light: PAGE_BG.light.about, dark: PAGE_BG.dark.about };

export function useSectionBackground() {
  const activeSectionId = useRef('about');
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    applyPageBg(activeSectionId.current, resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target.id) {
            activeSectionId.current = e.target.id;
            applyPageBg(e.target.id, resolvedTheme);
          }
        }
      },
      { threshold: 0.1, rootMargin: '-25% 0px -25% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      const theme = document.documentElement.getAttribute('data-theme');
      const resolved = theme === 'dark' ? 'dark' : 'light';
      const color = DEFAULT_BG[resolved];
      document.body.style.backgroundColor = color;
      const nav = document.getElementById('site-nav');
      if (nav) nav.style.backgroundColor = color;
    };
  }, [resolvedTheme]);
}
