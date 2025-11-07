import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Slider/Range component with glassmorphic styling
 *
 * @param {Object} props
 * @param {string} props.label - Slider label
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {number} props.min - Minimum value (default: 0)
 * @param {number} props.max - Maximum value (default: 100)
 * @param {number} props.step - Step increment (default: 1)
 * @param {boolean} props.showValue - Show current value (default: true)
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional classes
 */
const Slider = ({
  label,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  disabled = false,
  className,
}) => {
  const { isDark } = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const trackBg = isDark
    ? 'bg-[rgba(146,151,179,0.3)]'
    : 'bg-[rgba(0,0,0,0.1)]';
  const fillBg = 'bg-[#3a6df0]';
  const thumbBg = isDark ? 'bg-[#f9fafb]' : 'bg-white';
  const thumbBorder = 'border-[#3a6df0]';

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-3">
          {label && (
            <label className={cn('block text-[15px] font-medium', textColor)}>
              {label}
            </label>
          )}
          {showValue && (
            <span className={cn('text-[14px] font-medium', mutedColor)}>
              {value}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        {/* Track */}
        <div
          className={cn(
            'relative h-2 rounded-full overflow-hidden',
            trackBg,
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {/* Fill */}
          <div
            className={cn(
              'absolute top-0 left-0 h-full transition-all ease-[0.3s]',
              fillBg,
              isDragging && 'transition-none'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb */}
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          style={{
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
        />

        {/* Custom Thumb */}
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 shadow-lg transition-all ease-[0.3s] pointer-events-none',
            thumbBg,
            thumbBorder,
            isDragging && 'scale-110 shadow-xl',
            disabled && 'opacity-50'
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/**
 * Range Slider with min and max values
 */
export const RangeSlider = ({
  label,
  minValue = 0,
  maxValue = 100,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
}) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label className={cn('block text-[15px] font-medium', textColor)}>
          {label}
        </label>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={cn('text-[14px]', mutedColor)}>Min: {minValue}</span>
          <span className={cn('text-[14px]', mutedColor)}>Max: {maxValue}</span>
        </div>

        <Slider
          value={minValue}
          onChange={(val) => onChange({ min: val, max: maxValue })}
          min={min}
          max={maxValue}
          step={step}
          showValue={false}
          disabled={disabled}
        />

        <Slider
          value={maxValue}
          onChange={(val) => onChange({ min: minValue, max: val })}
          min={minValue}
          max={max}
          step={step}
          showValue={false}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Slider;
