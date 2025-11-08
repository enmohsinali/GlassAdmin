import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * AnimatedButton component with micro-interactions
 * Follows Apple design principles with smooth animations
 *
 * @param {Object} props
 * @param {('primary'|'secondary'|'outline'|'ghost'|'danger'|'success')} props.variant - Button variant
 * @param {('sm'|'md'|'lg')} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} props.leftIcon - Icon on the left
 * @param {React.ReactNode} props.rightIcon - Icon on the right
 * @param {string} props.className - Additional classes
 */
const AnimatedButton = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  leftIcon,
  rightIcon,
  className,
  onClick,
  ...props
}) => {
  const { isDark } = useTheme();

  const variants = {
    primary: 'bg-primary border-none text-white hover:bg-primary-hover rounded-[20px]',
    secondary: isDark
      ? 'bg-[rgba(146,151,179,0.13)] text-[#f9fafb] border border-theme-dark-bg rounded-[20px]'
      : 'bg-[rgba(255,255,255,0.7)] text-[#1a1a1a] border border-theme-light-bg rounded-[20px]',
    outline: isDark
      ? 'bg-transparent text-[rgba(249,250,251,0.55)] border border-[rgba(249,250,251,0.55)] hover:text-[#f9fafb] rounded-[20px]'
      : 'bg-transparent text-[rgba(74,74,74,0.75)] border border-[rgba(74,74,74,0.5)] rounded-[20px]',
    ghost: isDark
      ? 'bg-transparent text-[#f9fafb] hover:bg-[rgba(146,151,179,0.13)] rounded-[20px]'
      : 'bg-transparent text-[#1a1a1a] hover:bg-[rgba(0,0,0,0.05)] rounded-[20px]',
    danger: 'bg-danger border-none text-white hover:bg-danger-hover rounded-[20px]',
    success: 'bg-success border-none text-white hover:bg-success-hover rounded-[20px]',
  };

  const sizes = {
    sm: 'px-4 py-1 text-[14px]',
    md: 'px-6 py-1.5 text-[15px]',
    lg: 'px-[26px] py-2 text-[15px]',
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    pressed: { scale: 0.98 },
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="rest"
      whileHover={!disabled && !loading ? 'hover' : 'rest'}
      whileTap={!disabled && !loading ? 'pressed' : 'rest'}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all ease-[0.3s] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};

export default AnimatedButton;
