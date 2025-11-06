import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import Card from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Stats card component for dashboards
 * Inspired by iOS 26 Liquid Glass UI with fluid animations
 */
const Stats = ({
  title,
  value,
  change,
  changeType = 'increase',
  icon: Icon,
  iconColor = 'primary-blue',
  description,
  className,
  ...props
}) => {
  const { isDark } = useTheme();

  const iconColors = {
    'primary-blue': 'bg-primary-blue',
    'primary-purple': 'bg-primary-purple',
    'primary-pink': 'bg-primary-pink',
    'primary-green': 'bg-primary-green',
    'primary-orange': 'bg-primary-orange',
    'primary-cyan': 'bg-primary-cyan',
  };

  return (
    <Card
      className={cn('hover:scale-105 transition-transform duration-300', className)}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className={cn(
              'text-sm font-medium',
              isDark ? 'text-text-dark-secondary' : 'text-text-light-secondary'
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              'text-3xl font-bold mt-2',
              isDark ? 'text-text-dark-primary' : 'text-text-light-primary'
            )}
          >
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2 gap-1">
              {changeType === 'increase' ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-error" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  changeType === 'increase' ? 'text-success' : 'text-error'
                )}
              >
                {change}
              </span>
              {description && (
                <span
                  className={cn(
                    'text-sm',
                    isDark ? 'text-text-dark-secondary' : 'text-text-light-secondary'
                  )}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              'p-3 rounded-2xl',
              iconColors[iconColor],
              'bg-opacity-20 backdrop-blur-glass'
            )}
          >
            <Icon className={cn('w-6 h-6', `text-${iconColor}`)} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Stats;
