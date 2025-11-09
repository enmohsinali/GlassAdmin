import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ onMenuClick, isFullscreen, onToggleFullscreen, isMobile }) => {
  const { isDark } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';
  const searchBg = isDark ? 'bg-[rgba(113,119,144,0.08)]' : 'bg-[rgba(113,119,144,0.06)]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[#2a2a2a]';
  const placeholderColor = isDark ? 'placeholder:text-[rgba(249,250,251,0.5)]' : 'placeholder:text-[rgba(0,0,0,0.5)]';

  return (
    <header className={`header flex items-center flex-shrink-0 h-[58px] w-full border-b ${borderColor} px-[30px] whitespace-nowrap transition-all-300`}>
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className={`md:hidden mr-4 p-2 rounded-lg ${textColor} hover:bg-[rgba(113,119,144,0.1)] transition-all-300`}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menu Circles */}
      <div className={`menu-circles flex gap-1.5 flex-shrink-0 ${isSearchFocused ? 'mr-0' : 'mr-[195px]'} max-md:hidden transition-all-300`}>
        <span className="w-3 h-3 bg-[#ff5f56] rounded-full"></span>
        <span className="w-3 h-3 bg-[#ffbd2e] rounded-full"></span>
        <span className="w-3 h-3 bg-[#27c93f] rounded-full"></span>
      </div>

      {/* Header Menu */}
      <div className={`header-menu flex items-center ${isSearchFocused ? 'hidden' : ''} transition-all-300`}>
        <Link
          to="/dashboard/pricing"
          className={`menu-link px-[30px] py-5 no-underline ${inactiveColor} border-b-2 border-transparent transition-all-300 hover:${textColor} hover:border-current max-[610px]:hidden font-medium`}
        >
          Pricing
        </Link>
        <Link
          to="/dashboard/subscription"
          className={`menu-link px-[30px] py-5 no-underline ${inactiveColor} border-b-2 border-transparent transition-all-300 hover:${textColor} hover:border-current max-[610px]:hidden font-medium`}
        >
          Subscription
        </Link>
        <Link
          to="/dashboard/about"
          className={`menu-link px-[30px] py-5 no-underline ${inactiveColor} border-b-2 border-transparent transition-all-300 hover:${textColor} hover:border-current max-[610px]:hidden font-medium`}
        >
          About
        </Link>

        {/* Nested Dropdown */}
        <div className="relative max-[610px]:hidden" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`menu-link px-[30px] py-5 no-underline ${inactiveColor} border-b-2 border-transparent transition-all-300 hover:${textColor} hover:border-current font-medium flex items-center gap-1`}
          >
            Dropdown
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className={`absolute top-full left-0 mt-2 w-48 ${isDark ? 'bg-[rgba(26,26,26,0.95)]' : 'bg-white'} backdrop-blur-xl border ${borderColor} rounded-[14px] shadow-lg overflow-hidden z-50`}>
              <div className="py-2">
                <Link
                  to="#"
                  className={`block px-4 py-2 ${textColor} hover:bg-primary/10 transition-all-300`}
                  onClick={() => setShowDropdown(false)}
                >
                  Dropdown 1
                </Link>
                <Link
                  to="#"
                  className={`block px-4 py-2 ${textColor} hover:bg-primary/10 transition-all-300`}
                  onClick={() => setShowDropdown(false)}
                >
                  Dropdown 2
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className={`search-bar h-10 flex w-full ${isSearchFocused ? 'max-w-[600px] mx-auto' : 'max-w-[400px]'} pl-4 rounded relative transition-all-300`}>
        <svg
          className={`absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 ${inactiveColor}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className={`search-input w-full h-full border ${borderColor} ${searchBg} rounded font-poppins text-[15px] font-medium px-5 pl-10 shadow-sm ${textColor} ${placeholderColor} focus:border-primary-blue focus:ring-1 focus:ring-primary-blue`}
        />
      </div>

      {/* Header Profile */}
      <div className={`header-profile flex items-center px-4 pl-10 ml-auto flex-shrink-0 ${isSearchFocused ? 'hidden' : ''} transition-all-300`}>
        {/* Notification Dropdown */}
        <div className="notification relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative focus:outline-none"
            aria-label="Notifications"
          >
            <span className="notification-number absolute bg-[#3a6df0] w-5 h-5 rounded-full text-[11px] font-semibold flex items-center justify-center text-white -right-1.5 -top-1.5">
              3
            </span>
            <svg
              className={`w-[22px] ${textColor} flex-shrink-0 cursor-pointer hover:text-primary transition-colors`}
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>

          {showNotifications && (
            <div className={`absolute top-full right-0 mt-4 w-80 ${isDark ? 'bg-[rgba(26,26,26,0.95)]' : 'bg-white'} backdrop-blur-xl border ${borderColor} rounded-[14px] shadow-lg overflow-hidden z-50`}>
              <div className="p-4 border-b border-border">
                <h3 className={`font-semibold text-lg ${textColor}`}>Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Notification Items */}
                <div className={`p-4 hover:bg-primary/5 transition-all-300 cursor-pointer border-b ${borderColor}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className={`${textColor} text-sm font-medium`}>New order received</p>
                      <p className={`${inactiveColor} text-xs mt-1`}>Order #1234 has been placed</p>
                      <p className={`${inactiveColor} text-xs mt-1`}>2 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className={`p-4 hover:bg-primary/5 transition-all-300 cursor-pointer border-b ${borderColor}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className={`${textColor} text-sm font-medium`}>New user registered</p>
                      <p className={`${inactiveColor} text-xs mt-1`}>Sarah Johnson joined your platform</p>
                      <p className={`${inactiveColor} text-xs mt-1`}>1 hour ago</p>
                    </div>
                  </div>
                </div>
                <div className={`p-4 hover:bg-primary/5 transition-all-300 cursor-pointer border-b ${borderColor}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className={`${textColor} text-sm font-medium`}>Payment successful</p>
                      <p className={`${inactiveColor} text-xs mt-1`}>$299.00 received from client</p>
                      <p className={`${inactiveColor} text-xs mt-1`}>3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`p-3 border-t ${borderColor} text-center`}>
                <Link
                  to="#"
                  className={`text-sm text-primary hover:text-primary/80 transition-colors font-medium`}
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Cloud Icon */}
        <svg
          className={`w-[22px] ${textColor} flex-shrink-0 ml-[22px] max-md:hidden`}
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M448.773 235.551A135.893 135.893 0 00451 211c0-74.443-60.557-135-135-135-47.52 0-91.567 25.313-115.766 65.537-32.666-10.59-66.182-6.049-93.794 12.979-27.612 19.013-44.092 49.116-45.425 82.031C24.716 253.788 0 290.497 0 331c0 7.031 1.703 13.887 3.006 20.537l.015.015C12.719 400.492 56.034 436 106 436h300c57.891 0 106-47.109 106-105 0-40.942-25.053-77.798-63.227-95.449z" />
        </svg>

        {/* Language Switcher */}
        <div className="ml-[22px] max-md:hidden">
          <LanguageSwitcher />
        </div>

        {/* Fullscreen Toggle - Hidden on mobile */}
        {!isMobile && (
          <button
            onClick={onToggleFullscreen}
            className={`ml-[22px] p-2 rounded-lg ${textColor} hover:bg-[rgba(113,119,144,0.1)] transition-all-300`}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75m15 15v4.5m0-4.5h4.5m-4.5 0l5.25 5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
          </button>
        )}

        {/* Profile Image */}
        <Link to="/dashboard/profile" className="ml-[22px]">
          <img
            className={`profile-img w-8 h-8 rounded-full object-cover border-2 ${isDark ? 'border-[#f9fafb]' : 'border-[#3c3a3a]'} cursor-pointer hover:opacity-80 transition-opacity`}
            src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Profile"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
