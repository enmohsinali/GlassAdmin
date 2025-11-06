import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

/**
 * Language Switcher Component
 * Allows users to switch between available languages (English, Arabic, etc.)
 * Automatically handles RTL/LTR direction switching
 */
const LanguageSwitcher = ({ className }) => {
  const { language, changeLanguage, availableLanguages, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';
  const hoverBg = isDark ? 'hover:bg-[rgba(146,151,179,0.2)]' : 'hover:bg-[rgba(0,0,0,0.05)]';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage = availableLanguages.find((lang) => lang.code === language);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 p-2 rounded-[14px] border transition-all ease-[0.3s]',
          bgColor,
          themeBg,
          textColor,
          hoverBg
        )}
        aria-label="Change Language"
      >
        <Globe className="w-5 h-5" />
        <span className="text-[14px] font-medium">{currentLanguage?.nativeName}</span>
        <motion.svg
          className="w-4 h-4"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute z-50 mt-2 min-w-[200px] rounded-[14px] border backdrop-blur-[20px] shadow-lg overflow-hidden',
              bgColor,
              themeBg,
              isRTL() ? 'left-0' : 'right-0'
            )}
          >
            <div className="p-2">
              {availableLanguages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  whileHover={{ x: isRTL() ? -4 : 4 }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ease-[0.3s]',
                    language === lang.code ? 'bg-[rgba(58,109,240,0.1)]' : hoverBg,
                    textColor
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[20px]">{lang.code === 'en' ? '🇬🇧' : '🇸🇦'}</div>
                    <div>
                      <div className="text-[15px] font-medium">{lang.nativeName}</div>
                      <div className={cn('text-[12px]', mutedColor)}>{lang.name}</div>
                    </div>
                  </div>
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-5 h-5 text-[#3a6df0]" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Direction Indicator */}
            <div className={cn('px-3 py-2 border-t text-[12px]', themeBg, mutedColor)}>
              {isRTL() ? 'نص من اليمين إلى اليسار (RTL)' : 'Left-to-Right Text (LTR)'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
