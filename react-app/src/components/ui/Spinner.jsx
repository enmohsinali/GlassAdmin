import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Circular Spinner component following Apple design principles
 */
export const Spinner = ({ size = 'md', color = 'blue', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colors = {
    blue: 'border-primary',
    green: 'border-success',
    red: 'border-danger',
    white: 'border-white',
  };

  return (
    <div
      className={cn(
        'inline-block rounded-full border-2 border-t-transparent animate-spin',
        sizes[size],
        colors[color],
        className
      )}
    />
  );
};

/**
 * Dots Spinner component
 */
export const DotsSpinner = ({ size = 'md', color = 'blue', className }) => {
  const { isDark } = useTheme();

  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const colors = {
    blue: 'bg-primary',
    green: 'bg-success',
    red: 'bg-danger',
    current: isDark ? 'bg-[#f9fafb]' : 'bg-[#1a1a1a]',
  };

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <div className={cn('rounded-full animate-bounce', sizes[size], colors[color])} style={{ animationDelay: '0ms' }} />
      <div className={cn('rounded-full animate-bounce', sizes[size], colors[color])} style={{ animationDelay: '150ms' }} />
      <div className={cn('rounded-full animate-bounce', sizes[size], colors[color])} style={{ animationDelay: '300ms' }} />
    </div>
  );
};

/**
 * Pulse Spinner component
 */
export const PulseSpinner = ({ size = 'md', color = 'blue', className }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const colors = {
    blue: 'bg-primary',
    green: 'bg-success',
    red: 'bg-danger',
  };

  return (
    <div className={cn('relative', sizes[size], className)}>
      <div className={cn('absolute inset-0 rounded-full opacity-75 animate-ping', colors[color])} />
      <div className={cn('relative rounded-full', sizes[size], colors[color])} />
    </div>
  );
};

export default Spinner;
