import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const FontSettings = () => {
  const { isDark } = useTheme();

  // Popular Google Fonts
  const googleFonts = [
    { name: 'Inter', category: 'sans-serif' },
    { name: 'Roboto', category: 'sans-serif' },
    { name: 'Open Sans', category: 'sans-serif' },
    { name: 'Lato', category: 'sans-serif' },
    { name: 'Montserrat', category: 'sans-serif' },
    { name: 'Poppins', category: 'sans-serif' },
    { name: 'Raleway', category: 'sans-serif' },
    { name: 'Nunito', category: 'sans-serif' },
    { name: 'Playfair Display', category: 'serif' },
    { name: 'Merriweather', category: 'serif' },
    { name: 'Lora', category: 'serif' },
    { name: 'PT Serif', category: 'serif' },
    { name: 'Fira Code', category: 'monospace' },
    { name: 'Source Code Pro', category: 'monospace' },
    { name: 'JetBrains Mono', category: 'monospace' },
  ];

  const [fontSettings, setFontSettings] = useState(() => {
    const saved = localStorage.getItem('fontSettings');
    return saved ? JSON.parse(saved) : {
      primaryFont: 'Inter',
      headingFont: 'Inter',
      baseFontSize: 16,
      headingFontSize: 32,
      textColor: isDark ? '#f9fafb' : '#1a1a1a',
      headingColor: isDark ? '#ffffff' : '#000000',
    };
  });

  useEffect(() => {
    localStorage.setItem('fontSettings', JSON.stringify(fontSettings));

    // Apply font to document
    document.documentElement.style.setProperty('--font-primary', fontSettings.primaryFont);
    document.documentElement.style.setProperty('--font-heading', fontSettings.headingFont);
    document.documentElement.style.setProperty('--font-size-base', `${fontSettings.baseFontSize}px`);
    document.documentElement.style.setProperty('--font-size-heading', `${fontSettings.headingFontSize}px`);
    document.documentElement.style.setProperty('--color-text', fontSettings.textColor);
    document.documentElement.style.setProperty('--color-heading', fontSettings.headingColor);

    // Load Google Font dynamically
    const loadFont = (fontName) => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`;
      link.rel = 'stylesheet';

      // Remove old font link if exists
      const existingLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
      existingLinks.forEach(oldLink => {
        if (oldLink.href.includes(fontName.replace(/ /g, '+'))) {
          return; // Font already loaded
        }
      });

      document.head.appendChild(link);
    };

    loadFont(fontSettings.primaryFont);
    if (fontSettings.headingFont !== fontSettings.primaryFont) {
      loadFont(fontSettings.headingFont);
    }
  }, [fontSettings]);

  const updateSetting = (key, value) => {
    setFontSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    const defaults = {
      primaryFont: 'Inter',
      headingFont: 'Inter',
      baseFontSize: 16,
      headingFontSize: 32,
      textColor: isDark ? '#f9fafb' : '#1a1a1a',
      headingColor: isDark ? '#ffffff' : '#000000',
    };
    setFontSettings(defaults);
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
            Font Settings
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Customize typography, font sizes, and colors across the application
          </p>
        </div>

        {/* Primary Font */}
        <div className="space-y-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Body Font
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {googleFonts.map((font) => (
              <button
                key={font.name}
                onClick={() => updateSetting('primaryFont', font.name)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  fontSettings.primaryFont === font.name
                    ? 'border-blue-500 bg-blue-500/10'
                    : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ fontFamily: font.name }}
              >
                <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {font.name}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {font.category}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Heading Font */}
        <div className="space-y-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Heading Font
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {googleFonts.map((font) => (
              <button
                key={font.name}
                onClick={() => updateSetting('headingFont', font.name)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  fontSettings.headingFont === font.name
                    ? 'border-blue-500 bg-blue-500/10'
                    : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ fontFamily: font.name }}
              >
                <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {font.name}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {font.category}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Sizes */}
        <div className="space-y-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Font Sizes
          </h3>
          <div className="space-y-4">
            {/* Base Font Size */}
            <div>
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Body Text Size: {fontSettings.baseFontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSettings.baseFontSize}
                onChange={(e) => updateSetting('baseFontSize', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>12px</span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>24px</span>
              </div>
            </div>

            {/* Heading Font Size */}
            <div>
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Heading Size: {fontSettings.headingFontSize}px
              </label>
              <input
                type="range"
                min="24"
                max="48"
                value={fontSettings.headingFontSize}
                onChange={(e) => updateSetting('headingFontSize', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>24px</span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>48px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Font Colors */}
        <div className="space-y-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Text Colors
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Body Text Color */}
            <div>
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Body Text Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={fontSettings.textColor}
                  onChange={(e) => updateSetting('textColor', e.target.value)}
                  className="w-20 h-20 rounded-xl cursor-pointer border-2 border-gray-700"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={fontSettings.textColor}
                    onChange={(e) => updateSetting('textColor', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isDark
                        ? 'bg-[rgba(30,41,59,0.5)] border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
            </div>

            {/* Heading Color */}
            <div>
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Heading Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={fontSettings.headingColor}
                  onChange={(e) => updateSetting('headingColor', e.target.value)}
                  className="w-20 h-20 rounded-xl cursor-pointer border-2 border-gray-700"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={fontSettings.headingColor}
                    onChange={(e) => updateSetting('headingColor', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isDark
                        ? 'bg-[rgba(30,41,59,0.5)] border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Preview
          </h3>
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-[rgba(30,41,59,0.5)]' : 'bg-white'
          } border ${
            isDark ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <h1
              style={{
                fontFamily: fontSettings.headingFont,
                fontSize: `${fontSettings.headingFontSize}px`,
                color: fontSettings.headingColor
              }}
              className="font-bold mb-4"
            >
              Sample Heading
            </h1>
            <p
              style={{
                fontFamily: fontSettings.primaryFont,
                fontSize: `${fontSettings.baseFontSize}px`,
                color: fontSettings.textColor
              }}
              className="mb-2"
            >
              This is how your body text will look with the selected font and size.
              The quick brown fox jumps over the lazy dog.
            </p>
            <p
              style={{
                fontFamily: fontSettings.primaryFont,
                fontSize: `${fontSettings.baseFontSize}px`,
                color: fontSettings.textColor
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

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

export default FontSettings;
