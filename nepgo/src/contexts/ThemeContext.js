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
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    // Save theme preference to local storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update document attributes and classes
    const root = document.documentElement;
    const body = document.body;
    
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
      body.classList.add('dark');
      root.classList.add('dark');
      
      // Set CSS custom properties for dark mode
      root.style.setProperty('--background', '#0f172a');
      root.style.setProperty('--surface', '#1e293b');
      root.style.setProperty('--glass', 'rgba(30,41,59,0.85)');
      root.style.setProperty('--glass-blur', '16px');
      root.style.setProperty('--text-main', '#f1f5f9');
      root.style.setProperty('--text-light', '#94a3b8');
      root.style.setProperty('--primary', '#38bdf8');
      root.style.setProperty('--primary-light', '#7dd3fc');
      root.style.setProperty('--secondary', '#64748b');
      root.style.setProperty('--accent', '#f59e0b');
      root.style.setProperty('--shadow', '0 8px 32px rgba(14,165,233,0.13)');
      root.style.setProperty('--card-bg', '#1e293b');
      root.style.setProperty('--text-primary', '#f1f5f9');
      root.style.setProperty('--text-secondary', '#94a3b8');
      root.style.setProperty('--border-color', '#334155');
      
      // Update body styles
      body.style.background = '#0f172a';
      body.style.color = '#f1f5f9';
    } else {
      root.setAttribute('data-theme', 'light');
      body.classList.remove('dark');
      root.classList.remove('dark');
      
      // Set CSS custom properties for light mode
      root.style.setProperty('--background', '#f7fafc');
      root.style.setProperty('--surface', '#fff');
      root.style.setProperty('--glass', 'rgba(255,255,255,0.35)');
      root.style.setProperty('--glass-blur', '12px');
      root.style.setProperty('--text-main', '#2d3748');
      root.style.setProperty('--text-light', '#718096');
      root.style.setProperty('--primary', '#2e8b57');
      root.style.setProperty('--primary-light', '#4fd1c5');
      root.style.setProperty('--secondary', '#3182ce');
      root.style.setProperty('--accent', '#f6ad55');
      root.style.setProperty('--shadow', '0 8px 32px rgba(44,62,80,0.12)');
      root.style.setProperty('--card-bg', '#fff');
      root.style.setProperty('--text-primary', '#1e293b');
      root.style.setProperty('--text-secondary', '#64748b');
      root.style.setProperty('--border-color', '#e2e8f0');
      
      // Update body styles
      body.style.background = '#f7fafc';
      body.style.color = '#2d3748';
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: isDarkMode ? '#38bdf8' : '#2e8b57',
      secondary: isDarkMode ? '#64748b' : '#3182ce',
      accent: isDarkMode ? '#f59e0b' : '#f6ad55',
      background: isDarkMode ? '#0f172a' : '#f7fafc',
      surface: isDarkMode ? '#1e293b' : '#ffffff',
      text: isDarkMode ? '#f1f5f9' : '#2d3748',
      textSecondary: isDarkMode ? '#94a3b8' : '#718096',
      border: isDarkMode ? '#334155' : '#e2e8f0',
      error: isDarkMode ? '#ef4444' : '#dc2626',
      success: isDarkMode ? '#10b981' : '#059669',
      warning: isDarkMode ? '#f59e0b' : '#d97706',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
