import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown } from 'lucide-react';

/**
 * Select component with glassmorphic styling
 * Apple iOS 26 Liquid Glass UI inspired
 */
const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  className,
  containerClassName,
  ...props
}, ref) => {
  const { isDark } = useTheme();

  const baseStyles = cn(
    'w-full rounded-xl px-4 py-2.5 font-medium transition-all duration-300 appearance-none focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
    isDark
      ? 'bg-theme-dark-bg backdrop-blur-glass border border-border-dark text-[#f9fafb] focus:ring-primary-blue focus:border-primary-blue'
      : 'bg-theme-light-bg backdrop-blur-glass border border-border-light text-[#1a1a1a] focus:ring-primary-blue focus:border-primary-blue',
    error && (isDark ? 'border-primary-red focus:ring-primary-red' : 'border-primary-red focus:ring-primary-red')
  );

  const labelStyles = cn(
    'block text-sm font-medium mb-2',
    isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
  );

  const errorStyles = 'mt-1 text-sm text-primary-red';
  const helperStyles = cn(
    'mt-1 text-sm',
    isDark ? 'text-inactive-dark' : 'text-inactive-light'
  );

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && <label className={labelStyles}>{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={cn(baseStyles, 'pr-10', className)}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            'absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none',
            isDark ? 'text-inactive-dark' : 'text-inactive-light'
          )}
        />
      </div>
      {error && <p className={errorStyles}>{error}</p>}
      {helperText && !error && <p className={helperStyles}>{helperText}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
