import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Alert component following Apple design principles
 *
 * @param {Object} props
 * @param {('info'|'success'|'warning'|'error')} props.variant - Alert variant
 * @param {string} props.title - Alert title
 * @param {React.ReactNode} props.children - Alert content
 * @param {boolean} props.dismissible - Show close button
 * @param {function} props.onClose - Close handler
 * @param {string} props.className - Additional classes
 */
const Alert = ({ variant = 'info', title, children, dismissible = false, onClose, className }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  const variants = {
    info: {
      icon: Info,
      color: 'text-[#3a6df0]',
      bg: 'bg-[rgba(58,109,240,0.1)]',
      border: 'border-[#3a6df0]',
    },
    success: {
      icon: CheckCircle,
      color: 'text-primary-green',
      bg: 'bg-[rgba(59,240,131,0.1)]',
      border: 'border-primary-green',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-[#ffbd2e]',
      bg: 'bg-[rgba(255,189,46,0.1)]',
      border: 'border-[#ffbd2e]',
    },
    error: {
      icon: AlertCircle,
      color: 'text-primary-red',
      bg: 'bg-[rgba(255,112,92,0.1)]',
      border: 'border-primary-red',
    },
  };

  const { icon: Icon, color, bg, border } = variants[variant];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-[14px] border',
        bgColor,
        themeBg,
        bg,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', color)} />
      <div className="flex-1">
        {title && <div className={cn('text-[15px] font-medium mb-1', textColor)}>{title}</div>}
        <div className={cn('text-[14px]', isDark ? 'text-[rgba(249,250,251,0.75)]' : 'text-[rgba(74,74,74,0.85)]')}>
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={onClose}
          className={cn('p-1 rounded-lg transition-all ease-[0.3s] hover:bg-[rgba(0,0,0,0.1)]')}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
