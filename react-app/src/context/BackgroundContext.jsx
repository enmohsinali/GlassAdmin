import { createContext, useContext, useState, useEffect } from 'react';

const BackgroundContext = createContext();

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

const DEFAULT_SETTINGS = {
  type: 'animated-gradient', // 'video' | 'image' | 'solid' | 'gradient' | 'animated-gradient'
  defaultTheme: 'dark', // 'light' | 'dark'

  // Video settings
  videoUrl: 'https://assets.codepen.io/3364143/7btrrd.mp4',

  // Image settings
  imageUrl: '',

  // Solid color settings
  solidColor: '#1e3a8a',

  // Static gradient settings
  gradientType: 'linear', // 'linear' | 'radial'
  gradientAngle: 45,
  gradientColors: ['#1e3a8a', '#7c3aed', '#ec4899'],

  // Animated gradient settings
  animatedPreset: 'default', // 'default' | 'ocean' | 'sunset' | 'forest' | 'custom'
  animationSpeed: 8000, // milliseconds
  animationDirection: 'diagonal', // 'diagonal' | 'left-right' | 'top-bottom' | 'radial'
  customGradients: [
    ['#1e3a8a', '#7c3aed', '#ec4899'],
    ['#0ea5e9', '#f97316', '#a855f7'],
    ['#6366f1', '#ec4899', '#f59e0b'],
  ],
};

const PRESET_ANIMATED_GRADIENTS = {
  default: {
    name: 'Default',
    gradients: [
      ['#1e3a8a', '#7c3aed', '#ec4899'],
      ['#0ea5e9', '#f97316', '#a855f7'],
      ['#6366f1', '#ec4899', '#f59e0b'],
      ['#14b8a6', '#f43f5e', '#8b5cf6'],
      ['#3b82f6', '#d946ef', '#facc15'],
    ],
  },
  ocean: {
    name: 'Ocean Breeze',
    gradients: [
      ['#0c4a6e', '#0e7490', '#06b6d4'],
      ['#164e63', '#0891b2', '#22d3ee'],
      ['#075985', '#0284c7', '#38bdf8'],
    ],
  },
  sunset: {
    name: 'Sunset Glow',
    gradients: [
      ['#7c2d12', '#dc2626', '#f97316'],
      ['#991b1b', '#dc2626', '#fb923c'],
      ['#9a3412', '#ea580c', '#fdba74'],
    ],
  },
  forest: {
    name: 'Forest Dream',
    gradients: [
      ['#14532d', '#15803d', '#22c55e'],
      ['#166534', '#16a34a', '#4ade80'],
      ['#064e3b', '#059669', '#34d399'],
    ],
  },
  aurora: {
    name: 'Aurora Borealis',
    gradients: [
      ['#581c87', '#7c3aed', '#a78bfa'],
      ['#4c1d95', '#8b5cf6', '#c4b5fd'],
      ['#5b21b6', '#9333ea', '#d8b4fe'],
    ],
  },
  candy: {
    name: 'Candy Pop',
    gradients: [
      ['#ec4899', '#f472b6', '#fbcfe8'],
      ['#db2777', '#ec4899', '#f9a8d4'],
      ['#be185d', '#db2777', '#f472b6'],
    ],
  },
};

export const BackgroundProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('backgroundSettings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('backgroundSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('backgroundSettings');
  };

  const value = {
    settings,
    updateSettings,
    resetToDefaults,
    presets: PRESET_ANIMATED_GRADIENTS,
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
};
