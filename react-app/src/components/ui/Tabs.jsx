import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Tabs component following Apple design principles
 *
 * @param {Object} props
 * @param {Array} props.tabs - Tab items [{label, content, icon}]
 * @param {number} props.defaultTab - Default active tab index
 * @param {('horizontal'|'vertical')} props.orientation - Tab orientation
 * @param {string} props.className - Additional classes
 */
const Tabs = ({ tabs = [], defaultTab = 0, orientation = 'horizontal', className }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';
  const borderColor = isDark ? 'border-[#f9fafb]' : 'border-[#3c3a3a]';
  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div
        className={cn(
          'flex',
          isHorizontal ? 'flex-row border-b border-border-dark' : 'flex-col space-y-1'
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'flex items-center space-x-2 px-6 py-3 text-[15px] font-normal transition-all ease-[0.3s] border-b-2',
              activeTab === index
                ? `${textColor} ${borderColor}`
                : `${inactiveColor} border-transparent hover:${textColor}`,
              isHorizontal ? '' : 'w-full text-left rounded-[14px]',
              !isHorizontal && activeTab === index && bgColor
            )}
          >
            {tab.icon && <span className="w-5 h-5">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
