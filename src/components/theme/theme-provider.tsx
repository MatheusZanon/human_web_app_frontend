import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  changeTheme: () => null,
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = 'light',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) ?? defaultTheme);

  useEffect(() => {
    const theme = localStorage.getItem(storageKey) as Theme;

    if (theme) {
      setTheme(theme);
    } else {
      localStorage.setItem(storageKey, defaultTheme);
    }
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-bs-theme', theme);
  });

  const value = {
    theme,
    changeTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
