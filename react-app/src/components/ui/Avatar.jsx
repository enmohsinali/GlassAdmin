import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Avatar component with status indicator
 * Inspired by iOS 26 Liquid Glass UI
 */
const Avatar = ({
  src,
  alt = '',
  size = 'md',
  status,
  initials,
  className,
  ...props
}) => {
  const { isDark } = useTheme();

  const sizes = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
  };

  const statusSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
  };

  const statusColors = {
    online: 'bg-success',
    away: 'bg-warning',
    busy: 'bg-error',
    offline: isDark ? 'bg-inactive-dark' : 'bg-inactive-light',
  };

  return (
    <div className={cn('relative inline-block', className)} {...props}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-medium',
          sizes[size],
          isDark
            ? 'bg-glass-dark text-text-dark-primary border-2 border-border-glass-dark'
            : 'bg-glass-light text-text-light-primary border-2 border-border-glass-light',
          'backdrop-blur-glass'
        )}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials || alt?.charAt(0).toUpperCase() || '?'}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2',
            isDark ? 'ring-theme-dark-bg' : 'ring-white',
            statusSizes[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
