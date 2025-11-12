import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Card component with glassmorphic styling following Apple design principles
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.header - Custom header content
 * @param {React.ReactNode} props.footer - Footer content
 * @param {boolean} props.hover - Enable hover effect
 * @param {string} props.className - Additional classes
 * @param {string} props.bodyClassName - Additional classes for body
 */
const Card = ({
  children,
  title,
  header,
  footer,
  hover = false,
  className,
  bodyClassName,
  ...props
}) => {
  const { isDark } = useTheme();

  // Following the exact design pattern from InstalledApps.jsx
  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const hoverBg = hover ? (isDark ? 'hover:bg-theme-dark-bg' : 'hover:bg-theme-light-bg') : '';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const titleColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  const cardStyles = cn(
    'w-full rounded-[14px] border',
    bgColor,
    themeBg,
    hover && `cursor-pointer transition-all ease-[0.3s] ${hoverBg}`,
    className
  );

  return (
    <div className={cardStyles} {...props}>
      {(header || title) && (
        <div className={cn('px-5 py-4 border-b', borderColor)}>
          {header || (
            <h3 className={cn('text-[17px] font-medium m-0', titleColor)}>
              {title}
            </h3>
          )}
        </div>
      )}
      <div className={cn('p-5', bodyClassName)}>
        {children}
      </div>
      {footer && (
        <div className={cn('px-5 py-4 border-t', borderColor)}>
          {footer}
        </div>
      )}
    </div>
  );
};

/**
 * CardContent - Flexible content container for Card
 * Can be used independently or as a child of Card
 */
export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * CardHeader - Header section for Card
 */
export const CardHeader = ({ className, children, ...props }) => {
  const { isDark } = useTheme();
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  return (
    <div className={cn('px-5 py-4 border-b', borderColor, className)} {...props}>
      {children}
    </div>
  );
};

/**
 * CardTitle - Title component for Card
 */
export const CardTitle = ({ className, children, ...props }) => {
  const { isDark } = useTheme();
  const titleColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  return (
    <h3 className={cn('text-[17px] font-medium m-0', titleColor, className)} {...props}>
      {children}
    </h3>
  );
};

/**
 * CardFooter - Footer section for Card
 */
export const CardFooter = ({ className, children, ...props }) => {
  const { isDark } = useTheme();
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  return (
    <div className={cn('px-5 py-4 border-t', borderColor, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
