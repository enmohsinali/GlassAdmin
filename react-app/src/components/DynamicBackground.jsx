import { useEffect, useRef } from 'react';
import { useBackground } from '../context/BackgroundContext';
import Granim from 'granim';

const DynamicBackground = () => {
  const { settings, presets } = useBackground();
  const canvasRef = useRef(null);
  const granimInstanceRef = useRef(null);
  const videoRef = useRef(null);

  // Cleanup Granim instance
  useEffect(() => {
    return () => {
      if (granimInstanceRef.current) {
        granimInstanceRef.current.destroy();
        granimInstanceRef.current = null;
      }
    };
  }, []);

  // Handle animated gradient
  useEffect(() => {
    if (settings.type === 'animated-gradient' && canvasRef.current) {
      // Destroy existing instance
      if (granimInstanceRef.current) {
        granimInstanceRef.current.destroy();
      }

      const gradients = settings.animatedPreset === 'custom'
        ? settings.customGradients
        : presets[settings.animatedPreset]?.gradients || presets.default.gradients;

      granimInstanceRef.current = new Granim({
        element: canvasRef.current,
        name: 'dynamic-gradient',
        direction: settings.animationDirection,
        isPausedWhenNotInView: true,
        opacity: [1, 1],
        stateTransitionSpeed: 2000,
        states: {
          "default-state": {
            gradients: gradients,
            transitionSpeed: settings.animationSpeed,
            loop: true
          }
        }
      });
    }

    return () => {
      if (granimInstanceRef.current && settings.type !== 'animated-gradient') {
        granimInstanceRef.current.destroy();
        granimInstanceRef.current = null;
      }
    };
  }, [settings.type, settings.animatedPreset, settings.animationSpeed, settings.animationDirection, settings.customGradients, presets]);

  // Video Background
  if (settings.type === 'video') {
    return (
      <div className="fixed inset-0 w-full h-full -z-10">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          key={settings.videoUrl}
        >
          <source src={settings.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Solid Color Background
  if (settings.type === 'solid') {
    return (
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{ backgroundColor: settings.solidColor }}
      />
    );
  }

  // Static Gradient Background
  if (settings.type === 'gradient') {
    const gradientString = settings.gradientType === 'linear'
      ? `linear-gradient(${settings.gradientAngle}deg, ${settings.gradientColors.join(', ')})`
      : `radial-gradient(circle, ${settings.gradientColors.join(', ')})`;

    return (
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{ background: gradientString }}
      />
    );
  }

  // Animated Gradient Background
  if (settings.type === 'animated-gradient') {
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
  }

  return null;
};

export default DynamicBackground;
