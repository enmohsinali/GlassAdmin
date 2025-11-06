import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown } from 'lucide-react';

/**
 * Accordion component following Apple design principles
 *
 * @param {Object} props
 * @param {Array} props.items - Accordion items [{title, content}]
 * @param {boolean} props.multiple - Allow multiple items open
 * @param {string} props.className - Additional classes
 */
const Accordion = ({ items = [], multiple = false, className }) => {
  const { isDark } = useTheme();
  const [openItems, setOpenItems] = useState([]);

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  const toggleItem = (index) => {
    if (multiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  const isOpen = (index) => openItems.includes(index);

  return (
    <div className={cn('w-full space-y-3', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn('rounded-[14px] border overflow-hidden', bgColor, themeBg)}
        >
          {/* Header */}
          <button
            onClick={() => toggleItem(index)}
            className={cn(
              'w-full flex items-center justify-between p-5 text-left transition-all ease-[0.3s]',
              textColor
            )}
          >
            <span className="text-[15px] font-medium">{item.title}</span>
            <ChevronDown
              className={cn(
                'w-5 h-5 transition-transform duration-300',
                isOpen(index) ? 'transform rotate-180' : '',
                inactiveColor
              )}
            />
          </button>

          {/* Content */}
          <div
            className={cn(
              'transition-all duration-300 overflow-hidden',
              isOpen(index) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className={cn('p-5 pt-0 text-[15px]', inactiveColor, 'border-t', borderColor)}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
