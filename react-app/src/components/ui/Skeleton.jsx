import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Skeleton loader component following Apple design principles
 *
 * @param {Object} props
 * @param {('text'|'circle'|'rectangle')} props.variant - Skeleton variant
 * @param {string} props.width - Width (CSS value)
 * @param {string} props.height - Height (CSS value)
 * @param {number} props.count - Number of skeleton items
 * @param {string} props.className - Additional classes
 */
const Skeleton = ({ variant = 'text', width, height, count = 1, className }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';

  const variants = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-[14px]',
  };

  const skeletonElement = (
    <div
      className={cn(
        'animate-pulse',
        bgColor,
        variants[variant],
        className
      )}
      style={{
        width: width || (variant === 'circle' ? height : '100%'),
        height: height || (variant === 'text' ? '1rem' : variant === 'circle' ? '3rem' : '10rem'),
      }}
    />
  );

  if (count === 1) {
    return skeletonElement;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{skeletonElement}</div>
      ))}
    </div>
  );
};

/**
 * Card Skeleton component
 */
export const SkeletonCard = () => {
  const { isDark } = useTheme();
  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';

  return (
    <div className={cn('p-5 rounded-[14px] border', bgColor, themeBg)}>
      <Skeleton variant="rectangle" height="200px" className="mb-4" />
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" width="80%" />
    </div>
  );
};

/**
 * Table Skeleton component
 */
export const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * Avatar Skeleton component
 */
export const SkeletonAvatar = ({ size = 'md' }) => {
  const sizes = {
    sm: '32px',
    md: '48px',
    lg: '64px',
    xl: '96px',
  };

  return <Skeleton variant="circle" width={sizes[size]} height={sizes[size]} />;
};

export default Skeleton;
