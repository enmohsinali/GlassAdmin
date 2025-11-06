import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Enhanced Glass Card with refraction effects and animations
 * Follows Apple design principles with glasmorphic aesthetic
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {boolean} props.hover - Enable hover effects
 * @param {boolean} props.animate - Enable entrance animation
 * @param {number} props.delay - Animation delay
 * @param {string} props.className - Additional classes
 */
const GlassCard = ({ children, title, hover = false, animate = false, delay = 0, className, onClick }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  const hoverVariants = {
    rest: {
      scale: 1,
      boxShadow: isDark
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    hover: {
      scale: 1.02,
      boxShadow: isDark
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
        : '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const animateVariants = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: delay,
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        },
      }
    : {};

  const CardWrapper = hover || animate ? motion.div : 'div';

  const cardProps = hover
    ? {
        variants: hoverVariants,
        initial: 'rest',
        whileHover: 'hover',
        animate: 'rest',
        ...(animate && animateVariants),
      }
    : animate
    ? animateVariants
    : {};

  return (
    <CardWrapper
      onClick={onClick}
      className={cn(
        'w-full p-5 rounded-[14px] border backdrop-blur-[20px] transition-all ease-[0.3s]',
        bgColor,
        themeBg,
        hover && 'cursor-pointer',
        'relative overflow-hidden',
        className
      )}
      {...cardProps}
    >
      {/* Glass refraction effect overlay */}
      {hover && (
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          whileHover={{
            opacity: 1,
            background: isDark
              ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(58, 109, 240, 0.15) 0%, transparent 50%)'
              : 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(58, 109, 240, 0.1) 0%, transparent 50%)',
          }}
          transition={{ duration: 0.3 }}
          style={{
            '--mouse-x': '50%',
            '--mouse-y': '50%',
          }}
        />
      )}

      {title && (
        <div className={cn('text-[17px] font-semibold mb-4', textColor)}>
          {title}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </CardWrapper>
  );
};

/**
 * Glass Card with gradient overlay
 */
export const GlassCardGradient = ({ children, title, gradient = 'blue', className, onClick }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  const gradients = {
    blue: 'from-[#3a6df0]/20 to-transparent',
    green: 'from-primary-green/20 to-transparent',
    red: 'from-primary-red/20 to-transparent',
    purple: 'from-[#9333ea]/20 to-transparent',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
      onClick={onClick}
      className={cn(
        'w-full p-5 rounded-[14px] border backdrop-blur-[20px] transition-all ease-[0.3s] relative overflow-hidden cursor-pointer',
        bgColor,
        themeBg,
        className
      )}
    >
      {/* Gradient overlay */}
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', gradients[gradient])} />

      {title && (
        <div className={cn('text-[17px] font-semibold mb-4 relative z-10', textColor)}>
          {title}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
