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
      ? 'bg-[rgba(146,151,179,0.2)] text-[#f9fafb] border-[rgba(146,151,179,0.3)]'
      : 'bg-[rgba(0,0,0,0.08)] text-[#1a1a1a] border-[rgba(0,0,0,0.15)]',
    primary: 'bg-primary-blue text-white border-primary-blue',
    success: 'bg-success text-[#0a0a0a] border-success font-medium',
    warning: 'bg-warning text-[#0a0a0a] border-warning font-medium',
    error: 'bg-error text-white border-error font-medium',
    info: 'bg-info text-white border-info font-medium',
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
