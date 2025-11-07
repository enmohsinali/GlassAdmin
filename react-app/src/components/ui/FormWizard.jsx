import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

/**
 * Multi-step Form Wizard Component
 * Follows Apple design principles with smooth animations
 *
 * @param {Object} props
 * @param {Array} props.steps - Array of step objects with { title, description, content }
 * @param {Function} props.onComplete - Callback when wizard is completed
 * @param {Function} props.onStepChange - Callback when step changes
 * @param {boolean} props.showStepNumbers - Show step numbers
 */
const FormWizard = ({
  steps = [],
  onComplete,
  onStepChange,
  showStepNumbers = true,
  className,
}) => {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      setCompletedSteps((prev) => [...prev, currentStep]);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    } else {
      setCompletedSteps((prev) => [...prev, currentStep]);
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setDirection(-1);
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex < currentStep || completedSteps.includes(stepIndex)) {
      setDirection(stepIndex > currentStep ? 1 : -1);
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Step Indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = completedSteps.includes(index);
            const isClickable = index < currentStep || isCompleted;

            return (
              <div key={index} className="flex items-center flex-1">
                {/* Step Circle */}
                <motion.button
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    'relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ease-[0.3s]',
                    isActive && 'border-[#3a6df0] bg-[#3a6df0]',
                    isCompleted && 'border-primary-green bg-primary-green',
                    !isActive && !isCompleted && (isDark ? 'border-[rgba(249,250,251,0.3)]' : 'border-[rgba(0,0,0,0.2)]') + ` ${bgColor}`,
                    isClickable && 'cursor-pointer'
                  )}
                  whileHover={isClickable ? { scale: 1.1 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        className={cn(
                          'text-[15px] font-medium',
                          isActive ? 'text-white' : mutedColor
                        )}
                      >
                        {showStepNumbers ? index + 1 : ''}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Step Label */}
                <div className="ml-3 flex-1">
                  <div className={cn('text-[14px] font-medium', isActive ? textColor : mutedColor)}>
                    {step.title}
                  </div>
                  {step.description && (
                    <div className={cn('text-[12px]', mutedColor)}>
                      {step.description}
                    </div>
                  )}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="mx-4 flex-1 h-0.5 bg-gray-300">
                    <motion.div
                      className="h-full bg-[#3a6df0]"
                      initial={{ width: '0%' }}
                      animate={{
                        width: isCompleted ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className={cn('rounded-[14px] border p-6 mb-6 backdrop-blur-[20px] min-h-[400px]', bgColor, themeBg)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {/* Step Title */}
            <div className="mb-6">
              <h3 className={cn('text-[20px] font-semibold mb-2', textColor)}>
                {currentStepData.title}
              </h3>
              {currentStepData.description && (
                <p className={cn('text-[14px]', mutedColor)}>
                  {currentStepData.description}
                </p>
              )}
            </div>

            {/* Step Content */}
            <div>{currentStepData.content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="md"
          onClick={handlePrevious}
          disabled={isFirstStep}
          leftIcon={<ChevronLeft className="w-5 h-5" />}
        >
          Previous
        </Button>

        <div className={cn('text-[14px]', mutedColor)}>
          Step {currentStep + 1} of {steps.length}
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleNext}
          rightIcon={!isLastStep && <ChevronRight className="w-5 h-5" />}
        >
          {isLastStep ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

/**
 * Vertical Form Wizard Variant
 */
export const VerticalFormWizard = ({
  steps = [],
  onComplete,
  onStepChange,
  className,
}) => {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (!isLastStep) {
      setCompletedSteps((prev) => [...prev, currentStep]);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    } else {
      setCompletedSteps((prev) => [...prev, currentStep]);
      onComplete?.();
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex < currentStep || completedSteps.includes(stepIndex)) {
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  return (
    <div className={cn('flex gap-6', className)}>
      {/* Vertical Step Indicators */}
      <div className="w-64">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);
          const isClickable = index < currentStep || isCompleted;

          return (
            <motion.button
              key={index}
              onClick={() => handleStepClick(index)}
              disabled={!isClickable}
              className={cn(
                'w-full flex items-start gap-3 p-4 mb-3 rounded-[14px] border text-left transition-all ease-[0.3s]',
                isActive && 'border-[#3a6df0] bg-[rgba(58,109,240,0.1)]',
                !isActive && `${bgColor} ${themeBg}`,
                isClickable && 'cursor-pointer hover:bg-[rgba(58,109,240,0.05)]'
              )}
              whileHover={isClickable ? { x: 4 } : {}}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border-2 flex-shrink-0',
                  isActive && 'border-[#3a6df0] bg-[#3a6df0]',
                  isCompleted && 'border-primary-green bg-primary-green',
                  !isActive && !isCompleted && (isDark ? 'border-[rgba(249,250,251,0.3)]' : 'border-[rgba(0,0,0,0.2)]')
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className={cn('text-[14px] font-medium', isActive ? 'text-white' : mutedColor)}>
                    {index + 1}
                  </span>
                )}
              </div>
              <div>
                <div className={cn('text-[15px] font-medium', isActive ? textColor : mutedColor)}>
                  {step.title}
                </div>
                {step.description && (
                  <div className={cn('text-[13px] mt-1', mutedColor)}>
                    {step.description}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <div className={cn('rounded-[14px] border p-6 backdrop-blur-[20px] min-h-[500px]', bgColor, themeBg)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className={cn('text-[20px] font-semibold mb-2', textColor)}>
                  {currentStepData.title}
                </h3>
                {currentStepData.description && (
                  <p className={cn('text-[14px]', mutedColor)}>
                    {currentStepData.description}
                  </p>
                )}
              </div>

              <div>{currentStepData.content}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="primary" size="md" onClick={handleNext}>
            {isLastStep ? 'Complete' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormWizard;
