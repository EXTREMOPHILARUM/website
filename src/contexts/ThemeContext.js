import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEME_CONFIG, ERROR_MESSAGES } from '../config/settings';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check if theme preference exists in localStorage
      const savedTheme = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia(THEME_CONFIG.DEFAULT_MEDIA_QUERY).matches;
      return savedTheme || (prefersDark ? THEME_CONFIG.THEMES.DARK : THEME_CONFIG.THEMES.LIGHT);
    }
    return THEME_CONFIG.THEMES.LIGHT;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the old theme class and add the new one
    root.classList.remove(THEME_CONFIG.THEMES.LIGHT, THEME_CONFIG.THEMES.DARK);
    root.classList.add(theme);
    
    // Update data-theme attribute for shadcn components
    root.setAttribute('data-theme', theme);
    
    // Store the theme preference
    localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia(THEME_CONFIG.DEFAULT_MEDIA_QUERY);
    
    const handleChange = (e) => {
      setTheme(e.matches ? THEME_CONFIG.THEMES.DARK : THEME_CONFIG.THEMES.LIGHT);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
