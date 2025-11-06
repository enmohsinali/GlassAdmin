import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { Inbox } from 'lucide-react';
import Button from './Button';

/**
 * Empty State component following Apple design principles
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon element
 * @param {string} props.title - Empty state title
 * @param {string} props.description - Empty state description
 * @param {React.ReactNode} props.action - Action button or element
 * @param {string} props.className - Additional classes
 */
const EmptyState = ({ icon, title, description, action, className }) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  const DefaultIcon = icon || <Inbox className="w-16 h-16" />;

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4', className)}>
      <div className={cn('mb-4', inactiveColor)}>
        {DefaultIcon}
      </div>
      {title && (
        <h3 className={cn('text-[17px] font-medium mb-2', textColor)}>
          {title}
        </h3>
      )}
      {description && (
        <p className={cn('text-[15px] text-center max-w-md mb-6', inactiveColor)}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
