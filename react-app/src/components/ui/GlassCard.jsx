import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Liquid Glass Card Component
 * Authentic three-layer glass effect using CSS pseudo-elements
 *
 * Features:
 * - Three-layer glass system (main, ::before, ::after)
 * - Backdrop blur with SVG distortion filter
 * - Inner shadows for depth
 * - Theme-aware styling
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Optional card title
 * @param {string} props.className - Additional classes
 * @param {Function} props.onClick - Click handler
 */
const GlassCard = ({ children, title, className, onClick, hover = false, animate = false, ...props }) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card',
        'w-full p-5',
        onClick && 'cursor-pointer hover:scale-[1.02]',
        className
      )}
      {...props}
    >
      {title && (
        <div className={cn('text-[17px] font-semibold mb-4 relative z-10', textColor)}>
          {title}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * Glass Card with Gradient Overlay
 * For backwards compatibility with existing code
 */
export const GlassCardGradient = ({ children, title, gradient = 'blue', className, onClick }) => {
  const { isDark } = useTheme();
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  const gradients = {
    blue: 'from-primary/20 to-transparent',
    green: 'from-success/20 to-transparent',
    red: 'from-danger/20 to-transparent',
    purple: 'from-purple/20 to-transparent',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card relative overflow-hidden cursor-pointer',
        'w-full p-5',
        className
      )}
    >
      {/* Gradient overlay */}
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50 -z-10', gradients[gradient])} />

      {title && (
        <div className={cn('text-[17px] font-semibold mb-4 relative z-10', textColor)}>
          {title}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
