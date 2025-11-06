import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * SearchInput component matching the Header search bar design
 * Follows Apple iOS 26 Liquid Glass UI design principles
 *
 * @param {Object} props
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional classes
 * @param {function} props.onFocus - Focus handler
 * @param {function} props.onBlur - Blur handler
 */
const SearchInput = forwardRef(({
  placeholder = 'Search',
  className,
  ...props
}, ref) => {
  const { isDark } = useTheme();

  // Following the exact design from Header.jsx search bar
  const searchBg = isDark ? 'bg-[rgba(113,119,144,0.08)]' : 'bg-[rgba(113,119,144,0.06)]';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[#2a2a2a]';

  return (
    <div className={cn('relative w-full max-w-[400px]', className)}>
      <svg
        className={cn('absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4', inactiveColor)}
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
        ref={ref}
        type="text"
        placeholder={placeholder}
        className={cn(
          'w-full h-10 border-none rounded font-poppins text-[15px] font-medium px-5 pl-10 shadow-sm transition-all ease-[0.3s] focus:outline-none',
          searchBg,
          textColor,
          `placeholder:${inactiveColor}`
        )}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
