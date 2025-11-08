import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Select component with glassmorphic styling following Apple design principles
 */
const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  size = 'md',
  className,
  containerClassName,
  ...props
}, ref) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const placeholderColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  const baseStyles = cn(
    'w-full rounded-[14px] border font-normal transition-all ease-[0.3s] focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed appearance-none',
    bgColor,
    error ? 'border-primary-red focus:ring-primary-red' : themeBg,
    textColor
  );

  const sizes = {
    sm: 'px-3 py-2 text-[14px]',
    md: 'px-4 py-2.5 text-[15px]',
    lg: 'px-5 py-3 text-base',
  };

  const labelStyles = cn(
    'block text-[15px] font-medium mb-2',
    isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
  );

  const errorStyles = 'mt-1 text-[14px] text-primary-red';
  const helperStyles = cn(
    'mt-1 text-[14px]',
    isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]'
  );

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && <label className={labelStyles}>{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={cn(baseStyles, sizes[size], 'pr-10', className)}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className={cn('w-5 h-5', placeholderColor)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className={errorStyles}>{error}</p>}
      {helperText && !error && <p className={helperStyles}>{helperText}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
