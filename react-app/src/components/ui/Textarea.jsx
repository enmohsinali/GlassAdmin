import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Textarea component with glassmorphic styling
 * Apple iOS 26 Liquid Glass UI inspired
 */
const Textarea = forwardRef(({
  label,
  error,
  helperText,
  rows = 4,
  className,
  containerClassName,
  ...props
}, ref) => {
  const { isDark } = useTheme();

  const baseStyles = cn(
    'w-full rounded-xl px-4 py-2.5 font-medium transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed resize-none',
    isDark
      ? 'bg-theme-dark-bg backdrop-blur-glass border border-border-dark text-[#f9fafb] placeholder-inactive-dark focus:ring-primary-blue focus:border-primary-blue'
      : 'bg-theme-light-bg backdrop-blur-glass border border-border-light text-[#1a1a1a] placeholder-inactive-light focus:ring-primary-blue focus:border-primary-blue',
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
      <textarea
        ref={ref}
        rows={rows}
        className={cn(baseStyles, className)}
        {...props}
      />
      {error && <p className={errorStyles}>{error}</p>}
      {helperText && !error && <p className={helperStyles}>{helperText}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
