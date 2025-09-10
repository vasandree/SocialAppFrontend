import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { Theme } from '@/utils/api';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: Theme.Light,
  setTheme: () => {},
});

export const ThemeProvider = ({ children, defaultTheme = Theme.Light }: ThemeProviderProps) => {
  const initialized = useRef(false);

  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === Theme.Dark || stored === Theme.Light) {
        return stored as Theme;
      }
      return defaultTheme;
    }
    return defaultTheme;
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Синхронизируем тему с localStorage и html root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // --- Исправлено: всегда синхронизируем state с localStorage и root ---
      const stored = localStorage.getItem('theme');
      if (!initialized.current) {
        initialized.current = true;
        if (stored === Theme.Dark || stored === Theme.Light) {
          if (stored !== theme) {
            setThemeState(stored as Theme);
            // Не продолжаем, дождёмся следующего эффекта
            return;
          }
        }
      }
      // Применяем тему к html root и localStorage
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
