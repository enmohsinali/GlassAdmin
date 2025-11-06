import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Button component with glassmorphic styling
 *
 * @param {Object} props
 * @param {('primary'|'secondary'|'outline'|'ghost'|'glass')} props.variant - Button variant
 * @param {('xs'|'sm'|'md'|'lg'|'xl')} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional classes
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}) => {
  const { isDark } = useTheme();

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: isDark
      ? 'bg-primary-blue text-white hover:bg-opacity-90 shadow-lg hover:shadow-neon-blue focus:ring-primary-blue'
      : 'bg-primary-blue text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl focus:ring-primary-blue',
    secondary: isDark
      ? 'bg-primary-purple text-white hover:bg-opacity-90 shadow-lg hover:shadow-neon-purple focus:ring-primary-purple'
      : 'bg-primary-purple text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl focus:ring-primary-purple',
    outline: isDark
      ? 'bg-transparent border-2 border-border-dark text-text-dark-primary hover:bg-glass-dark-hover backdrop-blur-glass focus:ring-primary-blue'
      : 'bg-transparent border-2 border-border-light text-text-light-primary hover:bg-glass-light-hover backdrop-blur-glass focus:ring-primary-blue',
    ghost: isDark
      ? 'bg-transparent text-text-dark-primary hover:bg-glass-dark-hover focus:ring-primary-blue'
      : 'bg-transparent text-text-light-primary hover:bg-glass-light-hover focus:ring-primary-blue',
    glass: isDark
      ? 'bg-glass-dark backdrop-blur-glass-md border border-border-glass-dark text-text-dark-primary hover:bg-glass-dark-hover shadow-glass-dark focus:ring-primary-blue'
      : 'bg-glass-light backdrop-blur-glass-md border border-border-glass-light text-text-light-primary hover:bg-glass-light-hover shadow-glass-light focus:ring-primary-blue',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-10 py-4 text-xl',
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
