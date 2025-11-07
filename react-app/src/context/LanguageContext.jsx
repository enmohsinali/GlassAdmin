import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

// RTL languages list
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

/**
 * Language Context Provider
 * Handles language switching and RTL/LTR direction
 *
 * Supported languages:
 * - en: English (LTR)
 * - ar: Arabic (RTL)
 */
export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [direction, setDirection] = useState('ltr');

  // Update direction when language changes
  useEffect(() => {
    const isRTL = RTL_LANGUAGES.includes(language);
    setDirection(isRTL ? 'rtl' : 'ltr');

    // Update HTML dir attribute
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    // Update body class for styling
    if (isRTL) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [language]);

  /**
   * Change application language
   * @param {string} newLang - Language code (e.g., 'en', 'ar')
   */
  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  /**
   * Toggle between available languages
   */
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  };

  /**
   * Check if current language is RTL
   * @returns {boolean}
   */
  const isRTL = () => {
    return direction === 'rtl';
  };

  const value = {
    language,
    direction,
    changeLanguage,
    toggleLanguage,
    isRTL,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
    ],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to use language context
 * @returns {Object} Language context value
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default LanguageContext;
