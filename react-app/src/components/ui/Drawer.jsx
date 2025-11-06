import { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { X } from 'lucide-react';

/**
 * Drawer/Offcanvas component following Apple design principles
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Drawer open state
 * @param {function} props.onClose - Close handler
 * @param {string} props.title - Drawer title
 * @param {React.ReactNode} props.children - Drawer content
 * @param {('left'|'right'|'top'|'bottom')} props.position - Drawer position
 * @param {string} props.size - Drawer size (sm, md, lg, xl, full)
 * @param {string} props.className - Additional classes
 */
const Drawer = ({
  isOpen = false,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  className,
}) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-theme-dark-bg' : 'bg-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  // Prevent body scroll when drawer is open
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

  const sizes = {
    sm: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
    md: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    lg: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    xl: position === 'left' || position === 'right' ? 'w-[40rem]' : 'h-[40rem]',
    full: position === 'left' || position === 'right' ? 'w-full' : 'h-full',
  };

  const positions = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  const slideAnimations = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed z-50 backdrop-blur-[20px] shadow-2xl transition-transform duration-300',
          bgColor,
          positions[position],
          sizes[size],
          slideAnimations[position],
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
        <div className="p-5 overflow-auto h-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
