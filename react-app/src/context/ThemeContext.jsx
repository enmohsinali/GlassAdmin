import { createContext, useContext, useState, useEffect } from 'react';
import { useBackground } from './BackgroundContext';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const backgroundContext = useBackground();
  const defaultTheme = backgroundContext?.settings?.defaultTheme || 'dark';
  const [isDark, setIsDark] = useState(defaultTheme === 'dark');

  // Sync with background context default theme
  useEffect(() => {
    if (defaultTheme === 'dark' && !isDark) {
      setIsDark(true);
    } else if (defaultTheme === 'light' && isDark) {
      setIsDark(false);
    }
  }, [defaultTheme]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const value = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
