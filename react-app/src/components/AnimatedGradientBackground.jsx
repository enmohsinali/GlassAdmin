import { useEffect, useRef } from 'react';
import Granim from 'granim';

/**
 * AnimatedGradientBackground - Liquid animated gradient background
 * Replacement for video background with smooth, fluid gradient animations
 * Inspired by iOS 26 Liquid Glass UI
 */
const AnimatedGradientBackground = () => {
  const canvasRef = useRef(null);
  const granimInstanceRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !granimInstanceRef.current) {
      granimInstanceRef.current = new Granim({
        element: canvasRef.current,
        name: 'liquid-gradient',
        direction: 'diagonal',
        isPausedWhenNotInView: true,
        opacity: [1, 1],
        stateTransitionSpeed: 2000,
        states: {
          "default-state": {
            gradients: [
              // Blue to Purple to Pink (iOS inspired)
              ['#1e3a8a', '#7c3aed', '#ec4899'],
              // Cyan to Orange to Purple
              ['#0ea5e9', '#f97316', '#a855f7'],
              // Indigo to Pink to Amber
              ['#6366f1', '#ec4899', '#f59e0b'],
              // Teal to Rose to Violet
              ['#14b8a6', '#f43f5e', '#8b5cf6'],
              // Blue to Fuchsia to Yellow
              ['#3b82f6', '#d946ef', '#facc15'],
            ],
            transitionSpeed: 8000,
            loop: true
          }
        }
      });
    }

    // Cleanup on unmount
    return () => {
      if (granimInstanceRef.current) {
        granimInstanceRef.current.destroy();
        granimInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10
      }}
    />
  );
};

export default AnimatedGradientBackground;
