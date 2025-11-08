import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Button component with glassmorphic styling following Apple design principles
 * Uses CSS variables for theme colors - customize in index.css
 *
 * @param {Object} props
 * @param {('primary'|'secondary'|'danger'|'outline'|'ghost'|'glass')} props.variant - Button variant
 * @param {('sm'|'md'|'lg')} props.size - Button size
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

  // Base styles following Apple iOS 26 Liquid Glass UI design
  const baseStyles = 'inline-flex items-center justify-center font-normal transition-all ease-[0.3s] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

  // Variants using CSS variables for easy theme customization
  const variants = {
    primary: 'bg-primary border-none text-white hover:bg-primary-hover rounded-[20px]',
    secondary: 'bg-success border-none text-white hover:bg-success-hover rounded-[20px]',
    danger: 'bg-danger border-none text-white hover:bg-danger-hover rounded-[20px]',
    outline: isDark
      ? 'bg-transparent text-[rgba(249,250,251,0.55)] border border-[rgba(249,250,251,0.55)] hover:text-[#f9fafb] hover:border-[#f9fafb] rounded-[20px]'
      : 'bg-transparent text-[rgba(74,74,74,0.75)] border border-[rgba(74,74,74,0.5)] hover:text-[#1a1a1a] hover:border-[#1a1a1a] rounded-[20px]',
    ghost: isDark
      ? 'bg-transparent text-[#f9fafb] hover:bg-[rgba(146,151,179,0.13)] rounded-[20px]'
      : 'bg-transparent text-[#1a1a1a] hover:bg-[rgba(255,255,255,0.7)] rounded-[20px]',
    glass: isDark
      ? 'bg-[rgba(146,151,179,0.13)] text-[#f9fafb] border border-[rgba(146,151,179,0.3)] hover:bg-[rgba(146,151,179,0.2)] rounded-[20px] backdrop-blur-[20px]'
      : 'bg-[rgba(255,255,255,0.7)] text-[#1a1a1a] border border-[rgba(0,0,0,0.1)] hover:bg-[rgba(255,255,255,0.9)] rounded-[20px] backdrop-blur-[20px]',
  };

  // Sizes following Apple design principles
  const sizes = {
    sm: 'px-4 py-1 text-[14px]',
    md: 'px-6 py-1.5 text-[15px]',
    lg: 'px-[26px] py-2 text-[15px]',
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
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
