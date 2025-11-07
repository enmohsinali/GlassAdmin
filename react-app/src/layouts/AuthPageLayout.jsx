import { useTheme } from '../context/ThemeContext';

/**
 * AuthPageLayout - Shared layout for authentication pages
 * Provides:
 * - Theme toggle button (top-right)
 * - Centered content container
 * - Consistent styling for auth pages (Login, Register, ForgotPassword, etc.)
 */
const AuthPageLayout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="auth-page-wrapper min-h-screen flex items-center justify-center p-6">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full ${
          isDark ? 'bg-[rgba(146,151,179,0.2)]' : 'bg-[rgba(255,255,255,0.9)]'
        } border ${
          isDark ? 'border-[rgba(146,151,179,0.3)]' : 'border-[rgba(0,0,0,0.15)]'
        } backdrop-blur-[20px] transition-all duration-300 hover:scale-110 z-50 shadow-lg`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg className="w-5 h-5 text-[#f9fafb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Auth Content */}
      {children}
    </div>
  );
};

export default AuthPageLayout;
