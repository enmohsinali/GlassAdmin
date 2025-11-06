import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AnalyticsDashboard from './AnalyticsDashboard';

/**
 * Analytics Dashboard Page
 * Follows MainPage.jsx structure with glassmorphic design
 */
const AnalyticsDashboardPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const bgColor = isDark ? 'bg-theme-dark-bg' : 'bg-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  return (
    <div className={`app max-w-[1250px] max-h-[860px] h-[90vh] w-full flex flex-col overflow-hidden relative rounded-[14px] ${bgColor} backdrop-blur-[20px] ${textColor}`}>
      <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

      <div className="app-container flex flex-col flex-grow h-[calc(100%-58px)] overflow-hidden">
        <div className="flex flex-grow overflow-hidden">
          {/* Mobile Sidebar Overlay */}
          {isMobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}

          <Sidebar
            isMobileOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className="flex flex-col flex-grow overflow-hidden">
            {/* Main Header */}
            <div className={`main-header flex items-center border-b ${borderColor} h-[58px] flex-shrink-0`}>
              <div className={`menu-link-main ${textColor} px-[30px] font-medium text-lg`}>
                Analytics Dashboard
              </div>
            </div>

            {/* Content Wrapper */}
            <div className="app-content w-full px-[30px] pb-[20px] overflow-auto max-[565px]:px-5">
              <AnalyticsDashboard />
            </div>
          </main>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="mode-switch fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[rgba(113,119,144,0.15)] backdrop-blur-[10px] flex items-center justify-center cursor-pointer transition-all-300 hover:bg-[rgba(113,119,144,0.25)] z-10"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg className="w-5 h-5 text-[#f9fafb]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#3c3a3a]" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AnalyticsDashboardPage;
