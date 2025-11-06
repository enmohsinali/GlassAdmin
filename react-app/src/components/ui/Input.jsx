import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Input component with glassmorphic styling
 *
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right
 * @param {('sm'|'md'|'lg')} props.size - Input size
 * @param {string} props.className - Additional classes
 * @param {string} props.containerClassName - Container additional classes
 */
const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  size = 'md',
  className,
  containerClassName,
  ...props
}, ref) => {
  const { isDark } = useTheme();

  const baseStyles = cn(
    'w-full rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
    isDark
      ? 'bg-glass-dark backdrop-blur-glass-md border border-border-glass-dark text-text-dark-primary placeholder-text-dark-secondary focus:ring-primary-blue focus:border-primary-blue'
      : 'bg-glass-light backdrop-blur-glass-md border border-border-glass-light text-text-light-primary placeholder-text-light-secondary focus:ring-primary-blue focus:border-primary-blue',
    error && (isDark ? 'border-error focus:ring-error' : 'border-error focus:ring-error')
  );

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const labelStyles = cn(
    'block text-sm font-medium mb-2',
    isDark ? 'text-text-dark-primary' : 'text-text-light-primary'
  );

  const errorStyles = 'mt-1 text-sm text-error';
  const helperStyles = cn(
    'mt-1 text-sm',
    isDark ? 'text-text-dark-secondary' : 'text-text-light-secondary'
  );

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className={labelStyles}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            baseStyles,
            sizes[size],
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className={errorStyles}>{error}</p>}
      {helperText && !error && <p className={helperStyles}>{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
