import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('backgroundSettings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        return settings.defaultTheme === 'dark';
      } catch {
        return true; // default to dark
      }
    }
    return true; // default to dark
  });

  // Listen for changes to background settings in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('backgroundSettings');
      if (saved) {
        try {
          const settings = JSON.parse(saved);
          const shouldBeDark = settings.defaultTheme === 'dark';
          if (shouldBeDark !== isDark) {
            setIsDark(shouldBeDark);
          }
        } catch {
          // ignore parse errors
        }
      }
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for changes in the same tab
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isDark]);

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
