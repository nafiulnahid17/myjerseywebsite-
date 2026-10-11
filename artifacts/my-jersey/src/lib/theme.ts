import { useEffect, useState } from 'react';
import tokens from '@workspace/my-jersey-design';

export type Theme = 'light' | 'dark';
export const THEME_KEY = 'mj-theme';

/** Device-persisted theme. index.html applies the stored choice before first paint. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.classList.contains('dark') ? 'dark' : 'light'));
  useEffect(() => {
    const r = document.documentElement;
    r.classList.toggle('dark', theme === 'dark');
    r.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', tokens.source[theme].bg);
    try { window.localStorage.setItem(THEME_KEY, theme); } catch { /* preference stays for this tab only */ }
  }, [theme]);
  return [theme, setTheme] as const;
}
