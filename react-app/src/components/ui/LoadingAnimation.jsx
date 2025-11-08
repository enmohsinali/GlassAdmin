import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Pulsing Loader Animation
 */
export const PulsingLoader = ({ size = 'md', color = 'blue', className }) => {
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
      <motion.div
        className={cn('absolute inset-0 rounded-full opacity-75', colors[color])}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.75, 0, 0.75],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={cn('relative rounded-full', sizes[size], colors[color])}
        animate={{
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

/**
 * Bouncing Dots Loader
 */
export const BouncingDots = ({ size = 'md', color = 'blue', className }) => {
  const { isDark } = useTheme();

  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
  };

  const colors = {
    blue: 'bg-[#3a6df0]',
    green: 'bg-primary-green',
    red: 'bg-primary-red',
    current: isDark ? 'bg-[#f9fafb]' : 'bg-[#1a1a1a]',
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.15,
            ease: 'easeInOut',
          }}
          className={cn('rounded-full', sizes[size], colors[color])}
        />
      ))}
    </div>
  );
};

/**
 * Wave Loader Animation
 */
export const WaveLoader = ({ size = 'md', color = 'blue', className }) => {
  const sizes = {
    sm: { width: 'w-8', height: 'h-4', bar: 'w-0.5' },
    md: { width: 'w-12', height: 'h-6', bar: 'w-1' },
    lg: { width: 'w-16', height: 'h-8', bar: 'w-1.5' },
  };

  const colors = {
    blue: 'bg-primary',
    green: 'bg-success',
    red: 'bg-danger',
  };

  return (
    <div className={cn('flex items-center gap-0.5', sizes[size].width, className)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full', sizes[size].bar, colors[color])}
          animate={{
            height: ['20%', '100%', '20%'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Glass Shimmer Loader
 */
export const GlassShimmer = ({ className }) => {
  const { isDark } = useTheme();

  return (
    <div className={cn('relative overflow-hidden rounded-[14px]', className)}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(146,151,179,0.05) 0%, rgba(146,151,179,0.2) 50%, rgba(146,151,179,0.05) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

/**
 * Full Page Loader
 */
export const FullPageLoader = ({ message = 'Loading...' }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-theme-dark-bg' : 'bg-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 backdrop-blur-[20px]',
        bgColor
      )}
    >
      <PulsingLoader size="lg" color="blue" />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={cn('text-[15px] font-medium', textColor)}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default {
  PulsingLoader,
  BouncingDots,
  WaveLoader,
  GlassShimmer,
  FullPageLoader,
};
