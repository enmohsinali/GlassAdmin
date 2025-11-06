import { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { X } from 'lucide-react';

/**
 * Modal/Dialog component following Apple design principles
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state
 * @param {function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} props.footer - Modal footer content
 * @param {('sm'|'md'|'lg'|'xl'|'full')} props.size - Modal size
 * @param {boolean} props.closeOnBackdrop - Close on backdrop click
 * @param {string} props.className - Additional classes
 */
const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  className,
}) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-theme-dark-bg' : 'bg-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => closeOnBackdrop && onClose()}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full rounded-[14px] backdrop-blur-[20px] shadow-2xl transform transition-all duration-300',
          bgColor,
          sizes[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className={cn('flex items-center justify-between p-5 border-b', borderColor)}>
            <h3 className={cn('text-[17px] font-medium m-0', textColor)}>{title}</h3>
            <button
              onClick={onClose}
              className={cn(
                'p-2 rounded-lg transition-all ease-[0.3s]',
                isDark ? 'hover:bg-[rgba(146,151,179,0.13)]' : 'hover:bg-[rgba(113,119,144,0.1)]'
              )}
            >
              <X className={cn('w-5 h-5', textColor)} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-5 max-h-[70vh] overflow-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={cn('flex items-center justify-end gap-3 p-5 border-t', borderColor)}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
