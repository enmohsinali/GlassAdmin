import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Card component with glassmorphic styling
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.header - Custom header content
 * @param {React.ReactNode} props.footer - Footer content
 * @param {boolean} props.hover - Enable hover effect
 * @param {boolean} props.gradient - Use gradient background
 * @param {string} props.className - Additional classes
 * @param {string} props.bodyClassName - Additional classes for body
 */
const Card = ({
  children,
  title,
  header,
  footer,
  hover = false,
  gradient = false,
  className,
  bodyClassName,
  ...props
}) => {
  const { isDark } = useTheme();

  const cardStyles = isDark
    ? cn(
        'bg-glass-dark backdrop-blur-glass-md border border-border-glass-dark rounded-glass shadow-glass-dark',
        hover && 'hover:bg-glass-dark-hover hover:shadow-glass-lg transition-all duration-300 cursor-pointer',
        gradient && 'bg-glass-gradient-dark',
        className
      )
    : cn(
        'bg-glass-light backdrop-blur-glass-md border border-border-glass-light rounded-glass shadow-glass-light',
        hover && 'hover:bg-glass-light-hover hover:shadow-glass-lg transition-all duration-300 cursor-pointer',
        gradient && 'bg-glass-gradient-light',
        className
      );

  const titleStyles = isDark ? 'text-text-dark-primary' : 'text-text-light-primary';

  return (
    <div className={cardStyles} {...props}>
      {(header || title) && (
        <div className={cn('px-6 py-4 border-b', isDark ? 'border-border-dark' : 'border-border-light')}>
          {header || (
            <h3 className={cn('text-lg font-semibold', titleStyles)}>
              {title}
            </h3>
          )}
        </div>
      )}
      <div className={cn('px-6 py-4', bodyClassName)}>
        {children}
      </div>
      {footer && (
        <div className={cn('px-6 py-4 border-t', isDark ? 'border-border-dark' : 'border-border-light')}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
