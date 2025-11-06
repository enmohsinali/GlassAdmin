import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Tooltip component following Apple design principles
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Trigger element
 * @param {string} props.content - Tooltip content
 * @param {('top'|'bottom'|'left'|'right')} props.position - Tooltip position
 * @param {string} props.className - Additional classes
 */
const Tooltip = ({ children, content, position = 'top', className }) => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const bgColor = isDark ? 'bg-[rgba(16,18,27,0.95)]' : 'bg-[rgba(0,0,0,0.85)]';
  const textColor = 'text-white';

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-3 py-1.5 text-[14px] rounded-lg whitespace-nowrap backdrop-blur-[10px] shadow-lg pointer-events-none transition-opacity duration-200',
            bgColor,
            textColor,
            positions[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
