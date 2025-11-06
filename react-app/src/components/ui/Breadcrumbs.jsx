import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs component following Apple design principles
 *
 * @param {Object} props
 * @param {Array} props.items - Breadcrumb items [{label, href}]
 * @param {string} props.separator - Custom separator icon
 * @param {string} props.className - Additional classes
 */
const Breadcrumbs = ({ items = [], separator, className }) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  const SeparatorIcon = separator || ChevronRight;

  return (
    <nav className={cn('flex items-center space-x-2', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <Link
            to="/"
            className={cn('flex items-center transition-all ease-[0.3s] hover:opacity-80', inactiveColor)}
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <SeparatorIcon className={cn('w-4 h-4', inactiveColor)} />
              {isLast ? (
                <span className={cn('text-[15px] font-medium', textColor)}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className={cn('text-[15px] transition-all ease-[0.3s] hover:opacity-80', inactiveColor)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
