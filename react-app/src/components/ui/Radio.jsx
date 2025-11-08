import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Radio component with glassmorphic styling
 *
 * @param {Object} props
 * @param {string} props.label - Radio label
 * @param {string} props.name - Radio group name
 * @param {string} props.value - Radio value
 * @param {boolean} props.checked - Checked state
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional classes
 */
const Radio = ({ label, name, value, checked = false, onChange, disabled = false, className }) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const borderColor = isDark
    ? 'border-[rgba(249,250,251,0.3)]'
    : 'border-[rgba(0,0,0,0.2)]';
  const checkedBorder = 'border-primary';
  const checkedBg = 'bg-primary';
  const hoverBg = isDark
    ? 'hover:bg-[rgba(249,250,251,0.05)]'
    : 'hover:bg-[rgba(0,0,0,0.03)]';
  const disabledOpacity = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <label
      className={cn(
        'flex items-center gap-3 cursor-pointer transition-all ease-[0.3s] p-2 rounded-lg',
        !disabled && hoverBg,
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <div
        className={cn(
          'relative w-5 h-5 rounded-full border-2 transition-all ease-[0.3s] flex items-center justify-center',
          checked ? checkedBorder : borderColor,
          checked && checkedBg,
          disabledOpacity
        )}
      >
        {checked && (
          <div className="w-2 h-2 rounded-full bg-white transition-all ease-[0.3s]" />
        )}
      </div>
      {label && <span className={cn('text-[15px]', textColor)}>{label}</span>}
    </label>
  );
};

/**
 * Radio Group component
 */
export const RadioGroup = ({ label, options, name, value, onChange, className }) => {
  const { isDark } = useTheme();
  const labelColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className={cn('block text-[15px] font-medium mb-3', labelColor)}>
          {label}
        </label>
      )}
      <div className="space-y-1">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={option.disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Radio;
