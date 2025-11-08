import { useState } from 'react';
import { useBackground } from '../context/BackgroundContext';
import { useTheme } from '../context/ThemeContext';
import { Card } from './ui';
import { cn } from '../utils/cn';

// Import background videos
import video1 from '../assets/background_videos/199015-909322188_tiny.mp4';
import video2 from '../assets/background_videos/171946-846113552_tiny.mp4';
import video3 from '../assets/background_videos/117921-713330867_tiny.mp4';
import video4 from '../assets/background_videos/171942-846113545_tiny.mp4';
import video5 from '../assets/background_videos/131999-751915336_tiny.mp4';

// Import background images
import bgImage1 from '../assets/background_videos/macOS-26.jpg';

const BackgroundSettings = () => {
  const { settings, updateSettings, resetToDefaults, presets } = useBackground();
  const { isDark, toggleTheme } = useTheme();
  const [newGradientColor, setNewGradientColor] = useState('#000000');

  // Video presets
  const videoPresets = [
    { id: 1, url: video1, name: 'Abstract Flow 1' },
    { id: 2, url: video2, name: 'Abstract Flow 2' },
    { id: 3, url: video3, name: 'Abstract Flow 3' },
    { id: 4, url: video4, name: 'Abstract Flow 4' },
    { id: 5, url: video5, name: 'Abstract Flow 5' },
    { id: 6, url: 'https://assets.codepen.io/3364143/7btrrd.mp4', name: 'Default (External)' },
  ];

  // Image presets
  const imagePresets = [
    { id: 1, url: bgImage1, name: 'macOS Wallpaper' },
  ];

  const backgroundTypes = [
    { value: 'video', label: 'Video Background', icon: '🎥' },
    { value: 'image', label: 'Image Background', icon: '🖼️' },
    { value: 'solid', label: 'Solid Color', icon: '🎨' },
    { value: 'gradient', label: 'Static Gradient', icon: '🌈' },
    { value: 'animated-gradient', label: 'Animated Gradient', icon: '✨' },
  ];

  const animationDirections = [
    { value: 'diagonal', label: 'Diagonal' },
    { value: 'left-right', label: 'Left to Right' },
    { value: 'top-bottom', label: 'Top to Bottom' },
    { value: 'radial', label: 'Radial' },
  ];

  const addGradientColor = () => {
    if (settings.type === 'gradient') {
      updateSettings({
        gradientColors: [...settings.gradientColors, newGradientColor]
      });
    } else if (settings.type === 'animated-gradient' && settings.animatedPreset === 'custom') {
      const newCustomGradients = settings.customGradients.map((gradient, idx) =>
        idx === 0 ? [...gradient, newGradientColor] : gradient
      );
      updateSettings({ customGradients: newCustomGradients });
    }
  };

  const removeGradientColor = (index) => {
    if (settings.type === 'gradient') {
      const newColors = settings.gradientColors.filter((_, i) => i !== index);
      if (newColors.length >= 2) {
        updateSettings({ gradientColors: newColors });
      }
    }
  };

  const titleColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const subtitleColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const labelColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#5a5a5a]';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={cn('text-3xl font-bold', titleColor)}>
          Background Settings
        </h1>
        <p className={cn('mt-2 text-[15px]', subtitleColor)}>
          Customize your app's background and theme preferences
        </p>
      </div>

      {/* Default Theme */}
      <Card title="Default Theme">
        <div className="flex gap-4">
          <button
            onClick={() => {
              updateSettings({ defaultTheme: 'light' });
              if (isDark) toggleTheme();
            }}
            className={cn(
              'flex-1 p-4 rounded-xl border-2 transition-all',
              settings.defaultTheme === 'light'
                ? 'border-primary-blue bg-primary-blue bg-opacity-10'
                : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
            )}
          >
            <div className="text-4xl mb-2">☀️</div>
            <div className={cn('font-semibold', titleColor)}>Light Mode</div>
          </button>
          <button
            onClick={() => {
              updateSettings({ defaultTheme: 'dark' });
              if (!isDark) toggleTheme();
            }}
            className={cn(
              'flex-1 p-4 rounded-xl border-2 transition-all',
              settings.defaultTheme === 'dark'
                ? 'border-primary-blue bg-primary-blue bg-opacity-10'
                : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
            )}
          >
            <div className="text-4xl mb-2">🌙</div>
            <div className={cn('font-semibold', titleColor)}>Dark Mode</div>
          </button>
        </div>
      </Card>

      {/* Background Type */}
      <Card title="Background Type">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {backgroundTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateSettings({ type: type.value })}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                settings.type === type.value
                  ? 'border-primary-blue bg-primary-blue bg-opacity-10'
                  : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
              )}
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <div className={cn('text-sm font-medium', titleColor)}>
                {type.label}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Video Settings */}
      {settings.type === 'video' && (
        <Card title="Select Video">
          <div className="space-y-4">
            {/* Video Presets */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {videoPresets.map((video) => (
                <button
                  key={video.id}
                  onClick={() => updateSettings({ videoUrl: video.url })}
                  className={cn(
                    'relative group overflow-hidden rounded-xl border-2 transition-all',
                    settings.videoUrl === video.url
                      ? 'border-primary-blue ring-2 ring-primary-blue ring-opacity-50'
                      : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
                  )}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎥</div>
                      <div className={cn('text-sm font-medium px-2', titleColor)}>
                        {video.name}
                      </div>
                    </div>
                  </div>
                  {settings.videoUrl === video.url && (
                    <div className="absolute top-2 right-2 bg-primary-blue text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Custom Video URL */}
            <div className="pt-4">
              <label className={cn('block mb-2 text-sm font-medium', labelColor)}>
                Or Enter Custom Video URL
              </label>
              <input
                type="url"
                value={settings.videoUrl}
                onChange={(e) => updateSettings({ videoUrl: e.target.value })}
                placeholder="Enter video URL"
                className={cn(
                  'w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-blue',
                  isDark
                    ? 'bg-[rgba(30,41,59,0.5)] border-border-dark text-[#f9fafb] placeholder-gray-500'
                    : 'bg-white border-border-light text-[#1a1a1a] placeholder-gray-400'
                )}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Image Settings */}
      {settings.type === 'image' && (
        <Card title="Select Background Image">
          <div className="space-y-4">
            {/* Image Presets */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagePresets.map((image) => (
                <button
                  key={image.id}
                  onClick={() => updateSettings({ imageUrl: image.url })}
                  className={cn(
                    'relative group overflow-hidden rounded-xl border-2 transition-all',
                    settings.imageUrl === image.url
                      ? 'border-primary-blue ring-2 ring-primary-blue ring-opacity-50'
                      : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
                  )}
                >
                  <div
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${image.url})` }}
                  >
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-end p-3">
                      <div className="text-sm font-medium text-white">
                        {image.name}
                      </div>
                    </div>
                  </div>
                  {settings.imageUrl === image.url && (
                    <div className="absolute top-2 right-2 bg-primary-blue text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Custom Image URL */}
            <div className="pt-4">
              <label className={cn('block mb-2 text-sm font-medium', labelColor)}>
                Or Enter Custom Image URL
              </label>
              <input
                type="url"
                value={settings.imageUrl || ''}
                onChange={(e) => updateSettings({ imageUrl: e.target.value })}
                placeholder="Enter image URL"
                className={cn(
                  'w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-blue',
                  isDark
                    ? 'bg-[rgba(30,41,59,0.5)] border-border-dark text-[#f9fafb] placeholder-gray-500'
                    : 'bg-white border-border-light text-[#1a1a1a] placeholder-gray-400'
                )}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Solid Color Settings */}
      {settings.type === 'solid' && (
        <Card title="Choose Color">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={settings.solidColor}
              onChange={(e) => updateSettings({ solidColor: e.target.value })}
              className={cn('w-20 h-20 rounded-xl cursor-pointer border-2', isDark ? 'border-border-dark' : 'border-border-light')}
            />
            <div className="flex-1">
              <input
                type="text"
                value={settings.solidColor}
                onChange={(e) => updateSettings({ solidColor: e.target.value })}
                className={cn(
                  'w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-blue',
                  isDark
                    ? 'bg-[rgba(30,41,59,0.5)] border-border-dark text-[#f9fafb]'
                    : 'bg-white border-border-light text-[#1a1a1a]'
                )}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Static Gradient Settings */}
      {settings.type === 'gradient' && (
        <Card title="Gradient Settings">
          <div className="space-y-4">
            {/* Gradient Type */}
            <div className="flex gap-4">
              <button
                onClick={() => updateSettings({ gradientType: 'linear' })}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg transition-colors',
                  settings.gradientType === 'linear'
                    ? 'bg-primary-blue text-white'
                    : isDark ? 'bg-[rgba(30,41,59,0.5)] text-[#f9fafb]' : 'bg-gray-200 text-[#1a1a1a]'
                )}
              >
                Linear
              </button>
              <button
                onClick={() => updateSettings({ gradientType: 'radial' })}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg transition-colors',
                  settings.gradientType === 'radial'
                    ? 'bg-primary-blue text-white'
                    : isDark ? 'bg-[rgba(30,41,59,0.5)] text-[#f9fafb]' : 'bg-gray-200 text-[#1a1a1a]'
                )}
              >
                Radial
              </button>
            </div>

            {/* Gradient Angle (for linear) */}
            {settings.gradientType === 'linear' && (
              <div>
                <label className={cn('block mb-2', labelColor)}>
                  Angle: {settings.gradientAngle}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={settings.gradientAngle}
                  onChange={(e) => updateSettings({ gradientAngle: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            )}

            {/* Gradient Colors */}
            <div>
              <label className={cn('block mb-2', labelColor)}>
                Colors
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {settings.gradientColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...settings.gradientColors];
                        newColors[index] = e.target.value;
                        updateSettings({ gradientColors: newColors });
                      }}
                      className={cn('w-12 h-12 rounded-lg cursor-pointer border-2', isDark ? 'border-border-dark' : 'border-border-light')}
                    />
                    {settings.gradientColors.length > 2 && (
                      <button
                        onClick={() => removeGradientColor(index)}
                        className="px-2 py-1 bg-primary-red text-white rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newGradientColor}
                  onChange={(e) => setNewGradientColor(e.target.value)}
                  className={cn('w-12 h-12 rounded-lg cursor-pointer border-2', isDark ? 'border-border-dark' : 'border-border-light')}
                />
                <button
                  onClick={addGradientColor}
                  className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Color
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Animated Gradient Settings */}
      {settings.type === 'animated-gradient' && (
        <Card title="Animated Gradient">
          <div className="space-y-4">
            {/* Preset Selection */}
            <div>
              <label className={cn('block mb-2', labelColor)}>
                Select Preset
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => updateSettings({ animatedPreset: key })}
                    className={cn(
                      'p-3 rounded-xl border-2 transition-all',
                      settings.animatedPreset === key
                        ? 'border-primary-blue bg-primary-blue bg-opacity-10'
                        : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
                    )}
                  >
                    <div className={cn('font-medium', titleColor)}>
                      {preset.name}
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => updateSettings({ animatedPreset: 'custom' })}
                  className={cn(
                    'p-3 rounded-xl border-2 transition-all',
                    settings.animatedPreset === 'custom'
                      ? 'border-primary-blue bg-primary-blue bg-opacity-10'
                      : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
                  )}
                >
                  <div className={cn('font-medium', titleColor)}>
                    Custom
                  </div>
                </button>
              </div>
            </div>

            {/* Animation Direction */}
            <div>
              <label className={cn('block mb-2', labelColor)}>
                Animation Direction
              </label>
              <select
                value={settings.animationDirection}
                onChange={(e) => updateSettings({ animationDirection: e.target.value })}
                className={cn(
                  'w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-blue',
                  isDark
                    ? 'bg-[rgba(30,41,59,0.5)] border-border-dark text-[#f9fafb]'
                    : 'bg-white border-border-light text-[#1a1a1a]'
                )}
              >
                {animationDirections.map((dir) => (
                  <option key={dir.value} value={dir.value}>
                    {dir.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Animation Speed */}
            <div>
              <label className={cn('block mb-2', labelColor)}>
                Animation Speed: {settings.animationSpeed / 1000}s
              </label>
              <input
                type="range"
                min="2000"
                max="20000"
                step="1000"
                value={settings.animationSpeed}
                onChange={(e) => updateSettings({ animationSpeed: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Reset Button */}
      <div className={cn('pt-4 border-t', isDark ? 'border-border-dark' : 'border-border-light')}>
        <button
          onClick={resetToDefaults}
          className="px-6 py-3 bg-primary-red hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default BackgroundSettings;
