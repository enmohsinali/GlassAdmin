import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Switch/Toggle component with glassmorphic styling
 * Apple iOS 26 Liquid Glass UI inspired
 */
const Switch = forwardRef(({
  label,
  checked,
  onChange,
  className,
  ...props
}, ref) => {
  const { isDark } = useTheme();

  return (
    <label className={cn('flex items-center cursor-pointer group', className)}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(
          'relative w-11 h-6 rounded-full transition-all duration-300',
          checked
            ? 'bg-primary-blue'
            : isDark
            ? 'bg-theme-dark-bg border border-border-dark'
            : 'bg-theme-light-bg border border-border-light',
          'backdrop-blur-glass'
        )}
      >
        <div
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-lg',
            checked && 'transform translate-x-5'
          )}
        />
      </div>
      {label && (
        <span
          className={cn(
            'ml-3 text-sm font-medium',
            isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
});

Switch.displayName = 'Switch';

export default Switch;
