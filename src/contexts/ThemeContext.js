import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEME_CONFIG, ERROR_MESSAGES } from '../config/settings';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia(THEME_CONFIG.DEFAULT_MEDIA_QUERY).matches;
    return savedTheme || (prefersDark ? THEME_CONFIG.THEMES.DARK : THEME_CONFIG.THEMES.LIGHT);
  });

  useEffect(() => {
    // Update localStorage and document class when theme changes
    localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme === THEME_CONFIG.THEMES.LIGHT 
        ? THEME_CONFIG.THEMES.DARK 
        : THEME_CONFIG.THEMES.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(ERROR_MESSAGES.THEME_CONTEXT_ERROR);
  }
  return context;
};
