import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ onMenuClick }) => {
  const { isDark } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';
  const searchBg = isDark ? 'bg-[rgba(113,119,144,0.08)]' : 'bg-[rgba(113,119,144,0.06)]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[#2a2a2a]';

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
      <div className={`menu-circles flex gap-1.5 flex-shrink-0 ${isSearchFocused ? 'mr-0' : 'mr-[195px]'} max-[945px]:hidden transition-all-300`}>
        <span className="w-3 h-3 bg-[#ff5f56] rounded-full"></span>
        <span className="w-3 h-3 bg-[#ffbd2e] rounded-full"></span>
        <span className="w-3 h-3 bg-[#27c93f] rounded-full"></span>
      </div>

      {/* Header Menu */}
      <div className={`header-menu flex items-center ${isSearchFocused ? 'hidden' : ''} transition-all-300`}>
        <a
          href="#"
          className={`menu-link is-active px-[30px] py-5 no-underline ${inactiveColor} border-b-2 border-transparent transition-all-300 hover:${textColor} hover:border-current max-[610px]:hidden`}
        >
          Apps
        </a>
        <a
          href="#"
          className={`menu-link notify-dot relative px-[30px] py-5 no-underline ${inactiveColor} border-b-2 border-transparent transition-all-300 hover:${textColor} hover:border-current max-[610px]:hidden max-[1055px]:hidden`}
        >
          Your work
        </a>
        <a
          href="#"
          className={`menu-link px-[30px] py-5 no-underline ${inactiveColor} border-b-2 border-transparent transition-all-300 hover:${textColor} hover:border-current max-[610px]:hidden`}
        >
          Discover
        </a>
        <a
          href="#"
          className={`menu-link notify-dot relative px-[30px] py-5 no-underline ${inactiveColor} border-b-2 border-transparent transition-all-300 hover:${textColor} hover:border-current max-[610px]:hidden max-[1055px]:hidden`}
        >
          Market
        </a>
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
          className={`search-input w-full h-full border-none ${searchBg} rounded font-poppins text-[15px] font-medium px-5 pl-10 shadow-sm ${textColor} placeholder:${inactiveColor}`}
        />
      </div>

      {/* Header Profile */}
      <div className={`header-profile flex items-center px-4 pl-10 ml-auto flex-shrink-0 ${isSearchFocused ? 'hidden' : ''} transition-all-300`}>
        {/* Notification */}
        <div className="notification relative">
          <span className="notification-number absolute bg-[#3a6df0] w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white -right-1.5 -top-1.5">
            3
          </span>
          <svg
            className={`w-[22px] ${textColor} flex-shrink-0`}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>

        {/* Cloud Icon */}
        <svg
          className={`w-[22px] ${textColor} flex-shrink-0 ml-[22px] max-[945px]:hidden`}
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M448.773 235.551A135.893 135.893 0 00451 211c0-74.443-60.557-135-135-135-47.52 0-91.567 25.313-115.766 65.537-32.666-10.59-66.182-6.049-93.794 12.979-27.612 19.013-44.092 49.116-45.425 82.031C24.716 253.788 0 290.497 0 331c0 7.031 1.703 13.887 3.006 20.537l.015.015C12.719 400.492 56.034 436 106 436h300c57.891 0 106-47.109 106-105 0-40.942-25.053-77.798-63.227-95.449z" />
        </svg>

        {/* Language Switcher */}
        <div className="ml-[22px] max-[945px]:hidden">
          <LanguageSwitcher />
        </div>

        {/* Profile Image */}
        <img
          className={`profile-img w-8 h-8 rounded-full object-cover border-2 ${isDark ? 'border-[#f9fafb]' : 'border-[#3c3a3a]'} ml-[22px]`}
          src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Profile"
        />
      </div>
    </header>
  );
};

export default Header;
