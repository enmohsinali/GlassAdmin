import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { Check } from 'lucide-react';

/**
 * Checkbox component with glassmorphic styling
 * Apple iOS 26 Liquid Glass UI inspired
 */
const Checkbox = forwardRef(({
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
          'w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center',
          checked
            ? 'bg-primary-blue border-primary-blue'
            : isDark
            ? 'border-border-dark bg-theme-dark-bg group-hover:border-primary-blue'
            : 'border-border-light bg-theme-light-bg group-hover:border-primary-blue',
          'backdrop-blur-glass'
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      {label && (
        <span
          className={cn(
            'ml-2 text-sm font-medium',
            isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
