import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Badge component with glassmorphic styling
 * Inspired by iOS 26 Liquid Glass UI
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const { isDark } = useTheme();

  const variants = {
    default: isDark
      ? 'bg-glass-dark text-text-dark-primary border-border-glass-dark'
      : 'bg-glass-light text-text-light-primary border-border-glass-light',
    primary: 'bg-primary-blue text-white border-primary-blue',
    success: 'bg-success text-white border-success',
    warning: 'bg-warning text-white border-warning',
    error: 'bg-error text-white border-error',
    info: 'bg-info text-white border-info',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border backdrop-blur-glass transition-all duration-300',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
