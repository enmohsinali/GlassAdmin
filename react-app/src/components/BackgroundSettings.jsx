import { useState } from 'react';
import { useBackground } from '../context/BackgroundContext';
import { useTheme } from '../context/ThemeContext';

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

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-2xl ${
      isDark ? 'bg-[rgba(30,41,59,0.7)]' : 'bg-[rgba(255,255,255,0.7)]'
    } backdrop-blur-xl border ${
      isDark ? 'border-[rgba(148,163,184,0.1)]' : 'border-[rgba(0,0,0,0.1)]'
    }`}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Background Settings
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Customize your app's background and theme preferences
          </p>
        </div>

        {/* Default Theme */}
        <div className="space-y-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Default Theme
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                updateSettings({ defaultTheme: 'light' });
                if (isDark) toggleTheme();
              }}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                settings.defaultTheme === 'light'
                  ? 'border-blue-500 bg-blue-500/10'
                  : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-4xl mb-2">☀️</div>
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Light Mode</div>
            </button>
            <button
              onClick={() => {
                updateSettings({ defaultTheme: 'dark' });
                if (!isDark) toggleTheme();
              }}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                settings.defaultTheme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10'
                  : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-4xl mb-2">🌙</div>
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dark Mode</div>
            </button>
          </div>
        </div>

        {/* Background Type */}
        <div className="space-y-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Background Type
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {backgroundTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => updateSettings({ type: type.value })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.type === type.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {type.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Video Settings */}
        {settings.type === 'video' && (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Select Video
            </h3>

            {/* Video Presets */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {videoPresets.map((video) => (
                <button
                  key={video.id}
                  onClick={() => updateSettings({ videoUrl: video.url })}
                  className={`relative group overflow-hidden rounded-xl border-2 transition-all ${
                    settings.videoUrl === video.url
                      ? 'border-blue-500 ring-2 ring-blue-500/50'
                      : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎥</div>
                      <div className={`text-sm font-medium px-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {video.name}
                      </div>
                    </div>
                  </div>
                  {settings.videoUrl === video.url && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
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
              <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Or Enter Custom Video URL
              </label>
              <input
                type="url"
                value={settings.videoUrl}
                onChange={(e) => updateSettings({ videoUrl: e.target.value })}
                placeholder="Enter video URL"
                className={`w-full px-4 py-3 rounded-xl border ${
                  isDark
                    ? 'bg-[rgba(30,41,59,0.5)] border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        )}

        {/* Image Settings */}
        {settings.type === 'image' && (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Select Background Image
            </h3>

            {/* Image Presets */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagePresets.map((image) => (
                <button
                  key={image.id}
                  onClick={() => updateSettings({ imageUrl: image.url })}
                  className={`relative group overflow-hidden rounded-xl border-2 transition-all ${
                    settings.imageUrl === image.url
                      ? 'border-blue-500 ring-2 ring-blue-500/50'
                      : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${image.url})` }}
                  >
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-end p-3">
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-white'}`}>
                        {image.name}
                      </div>
                    </div>
                  </div>
                  {settings.imageUrl === image.url && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
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
              <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Or Enter Custom Image URL
              </label>
              <input
                type="url"
                value={settings.imageUrl || ''}
                onChange={(e) => updateSettings({ imageUrl: e.target.value })}
                placeholder="Enter image URL"
                className={`w-full px-4 py-3 rounded-xl border ${
                  isDark
                    ? 'bg-[rgba(30,41,59,0.5)] border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        )}

        {/* Solid Color Settings */}
        {settings.type === 'solid' && (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Choose Color
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={settings.solidColor}
                onChange={(e) => updateSettings({ solidColor: e.target.value })}
                className="w-20 h-20 rounded-xl cursor-pointer border-2 border-gray-700"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={settings.solidColor}
                  onChange={(e) => updateSettings({ solidColor: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isDark
                      ? 'bg-[rgba(30,41,59,0.5)] border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Static Gradient Settings */}
        {settings.type === 'gradient' && (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Gradient Settings
            </h3>

            {/* Gradient Type */}
            <div className="flex gap-4">
              <button
                onClick={() => updateSettings({ gradientType: 'linear' })}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  settings.gradientType === 'linear'
                    ? 'bg-blue-500 text-white'
                    : isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                }`}
              >
                Linear
              </button>
              <button
                onClick={() => updateSettings({ gradientType: 'radial' })}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  settings.gradientType === 'radial'
                    ? 'bg-blue-500 text-white'
                    : isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                }`}
              >
                Radial
              </button>
            </div>

            {/* Gradient Angle (for linear) */}
            {settings.gradientType === 'linear' && (
              <div>
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-700"
                    />
                    {settings.gradientColors.length > 2 && (
                      <button
                        onClick={() => removeGradientColor(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
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
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-700"
                />
                <button
                  onClick={addGradientColor}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Color
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animated Gradient Settings */}
        {settings.type === 'animated-gradient' && (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Animated Gradient
            </h3>

            {/* Preset Selection */}
            <div>
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Preset
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => updateSettings({ animatedPreset: key })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      settings.animatedPreset === key
                        ? 'border-blue-500 bg-blue-500/10'
                        : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {preset.name}
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => updateSettings({ animatedPreset: 'custom' })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    settings.animatedPreset === 'custom'
                      ? 'border-blue-500 bg-blue-500/10'
                      : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Custom
                  </div>
                </button>
              </div>
            </div>

            {/* Animation Direction */}
            <div>
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Animation Direction
              </label>
              <select
                value={settings.animationDirection}
                onChange={(e) => updateSettings({ animationDirection: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  isDark
                    ? 'bg-[rgba(30,41,59,0.5)] border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
        )}

        {/* Reset Button */}
        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={resetToDefaults}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettings;
