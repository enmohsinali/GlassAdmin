import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Linear Progress Bar component following Apple design principles
 *
 * @param {Object} props
 * @param {number} props.value - Progress value (0-100)
 * @param {string} props.color - Progress color (blue, green, red, purple)
 * @param {('sm'|'md'|'lg')} props.size - Progress bar size
 * @param {boolean} props.showLabel - Show percentage label
 * @param {string} props.className - Additional classes
 */
export const Progress = ({ value = 0, color = 'blue', size = 'md', showLabel = false, className }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  const colors = {
    blue: 'bg-[#3a6df0]',
    green: 'bg-primary-green',
    red: 'bg-primary-red',
    purple: 'bg-[#9b5de5]',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full rounded-full overflow-hidden', bgColor, sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colors[color])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <div className={cn('text-[14px] mt-1 text-right', textColor)}>
          {clampedValue}%
        </div>
      )}
    </div>
  );
};

/**
 * Circular Progress component
 *
 * @param {Object} props
 * @param {number} props.value - Progress value (0-100)
 * @param {number} props.size - Circle size in pixels
 * @param {string} props.color - Progress color
 * @param {number} props.strokeWidth - Stroke width
 * @param {boolean} props.showLabel - Show percentage label
 */
export const CircularProgress = ({
  value = 0,
  size = 120,
  color = 'blue',
  strokeWidth = 8,
  showLabel = true
}) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'rgba(146,151,179,0.13)' : 'rgba(255,255,255,0.7)';
  const textColor = isDark ? '#f9fafb' : '#1a1a1a';

  const colors = {
    blue: '#3a6df0',
    green: '#3bf083',
    red: '#ff705c',
    purple: '#9b5de5',
  };

  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showLabel && (
        <div
          className="absolute inset-0 flex items-center justify-center text-[17px] font-medium"
          style={{ color: textColor }}
        >
          {clampedValue}%
        </div>
      )}
    </div>
  );
};

/**
 * Step Progress component
 *
 * @param {Object} props
 * @param {number} props.currentStep - Current active step (1-based)
 * @param {number} props.totalSteps - Total number of steps
 * @param {Array} props.labels - Step labels
 */
export const StepProgress = ({ currentStep = 1, totalSteps = 4, labels = [] }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-medium transition-all ease-[0.3s]',
                    isCompleted || isActive
                      ? 'bg-[#3a6df0] text-white'
                      : `${bgColor} ${inactiveColor}`
                  )}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                {labels[index] && (
                  <span className={cn('mt-2 text-[14px]', isActive ? textColor : inactiveColor)}>
                    {labels[index]}
                  </span>
                )}
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className={cn('flex-1 h-0.5 mx-2', isCompleted ? 'bg-[#3a6df0]' : bgColor)} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
