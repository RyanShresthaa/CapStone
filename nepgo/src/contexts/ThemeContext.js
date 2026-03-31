import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    const root = document.documentElement;
    const body = document.body;
    const mode = isDarkMode ? 'dark' : 'light';

    root.setAttribute('data-theme', mode);
    root.style.colorScheme = mode;

    if (isDarkMode) {
      body.classList.add('dark');
      root.classList.add('dark');
    } else {
      body.classList.remove('dark');
      root.classList.remove('dark');
    }

    body.style.background = '';
    body.style.color = '';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: isDarkMode ? '#a5b4fc' : '#4f46e5',
      secondary: isDarkMode ? '#fb923c' : '#ea580c',
      accent: isDarkMode ? '#5eead4' : '#0d9488',
      background: isDarkMode ? '#06050f' : '#f4f2ff',
      surface: isDarkMode ? '#12101f' : '#ffffff',
      text: isDarkMode ? '#f1f5f9' : '#1e1b4b',
      textSecondary: isDarkMode ? '#a8b2d1' : '#64748b',
      border: isDarkMode ? 'rgba(165, 180, 252, 0.16)' : 'rgba(99, 102, 241, 0.14)',
      error: isDarkMode ? '#f87171' : '#dc2626',
      success: isDarkMode ? '#34d399' : '#059669',
      warning: isDarkMode ? '#fbbf24' : '#d97706',
    },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
