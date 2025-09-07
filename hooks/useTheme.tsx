
import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'akatsuki';

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('shinobi-theme') as Theme;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
        const preferredTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setThemeState(preferredTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Clean slate: remove all theme classes
    root.classList.remove('light', 'dark', 'akatsuki-theme');

    if (theme === 'light') {
      // Light is the default, but we can add a class if needed for overrides
    } else if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'akatsuki') {
      // Akatsuki theme is a dark theme variant
      root.classList.add('dark', 'akatsuki-theme');
    }
    
    localStorage.setItem('shinobi-theme', theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  return [theme, setTheme];
};
