import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { X } from 'lucide-react';

/**
 * Tag/Chip component following Apple design principles
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Tag content
 * @param {('blue'|'green'|'red'|'purple'|'gray')} props.color - Tag color
 * @param {('sm'|'md'|'lg')} props.size - Tag size
 * @param {boolean} props.removable - Show remove button
 * @param {function} props.onRemove - Remove handler
 * @param {React.ReactNode} props.icon - Icon element
 * @param {string} props.className - Additional classes
 */
const Tag = ({ children, color = 'blue', size = 'md', removable = false, onRemove, icon, className }) => {
  const { isDark } = useTheme();

  const colors = {
    blue: {
      bg: 'bg-primary/15',
      text: 'text-primary',
      border: 'border-primary/30',
    },
    green: {
      bg: 'bg-success/15',
      text: 'text-success',
      border: 'border-success/30',
    },
    red: {
      bg: 'bg-danger/15',
      text: 'text-danger',
      border: 'border-danger/30',
    },
    purple: {
      bg: 'bg-purple/15',
      text: 'text-purple',
      border: 'border-purple/30',
    },
    gray: {
      bg: isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]',
      text: isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]',
      border: isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg',
    },
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[12px]',
    md: 'px-3 py-1 text-[14px]',
    lg: 'px-4 py-1.5 text-[15px]',
  };

  const { bg, text, border } = colors[color];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[20px] border font-medium transition-all ease-[0.3s]',
        bg,
        text,
        border,
        sizes[size],
        className
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className={cn('p-0.5 rounded-full hover:bg-[rgba(0,0,0,0.1)] transition-all ease-[0.3s]')}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default Tag;
