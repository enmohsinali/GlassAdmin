import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from './ui';
import { cn } from '../utils/cn';

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

  const titleColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const subtitleColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const labelColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#5a5a5a]';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={cn('text-3xl font-bold', titleColor)}>
          Font Settings
        </h1>
        <p className={cn('mt-2 text-[15px]', subtitleColor)}>
          Customize typography, font sizes, and colors across the application
        </p>
      </div>

      {/* Body Font */}
      <Card title="Body Font">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {googleFonts.map((font) => (
            <button
              key={font.name}
              onClick={() => updateSetting('primaryFont', font.name)}
              className={cn(
                'p-3 rounded-xl border-2 transition-all text-left',
                fontSettings.primaryFont === font.name
                  ? 'border-primary-blue bg-primary-blue bg-opacity-10'
                  : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
              )}
              style={{ fontFamily: font.name }}
            >
              <div className={cn('font-medium', titleColor)}>
                {font.name}
              </div>
              <div className={cn('text-xs', labelColor)}>
                {font.category}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Heading Font */}
      <Card title="Heading Font">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {googleFonts.map((font) => (
            <button
              key={font.name}
              onClick={() => updateSetting('headingFont', font.name)}
              className={cn(
                'p-3 rounded-xl border-2 transition-all text-left',
                fontSettings.headingFont === font.name
                  ? 'border-primary-blue bg-primary-blue bg-opacity-10'
                  : isDark ? 'border-border-dark hover:border-[rgba(148,163,184,0.3)]' : 'border-border-light hover:border-[rgba(0,0,0,0.2)]'
              )}
              style={{ fontFamily: font.name }}
            >
              <div className={cn('font-medium', titleColor)}>
                {font.name}
              </div>
              <div className={cn('text-xs', labelColor)}>
                {font.category}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Font Sizes */}
      <Card title="Font Sizes">
        <div className="space-y-4">
          {/* Base Font Size */}
          <div>
            <label className={cn('block mb-2', labelColor)}>
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
              <span className={labelColor}>12px</span>
              <span className={labelColor}>24px</span>
            </div>
          </div>

          {/* Heading Font Size */}
          <div>
            <label className={cn('block mb-2', labelColor)}>
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
              <span className={labelColor}>24px</span>
              <span className={labelColor}>48px</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Font Colors */}
      <Card title="Text Colors">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Body Text Color */}
          <div>
            <label className={cn('block mb-2', labelColor)}>
              Body Text Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={fontSettings.textColor}
                onChange={(e) => updateSetting('textColor', e.target.value)}
                className={cn('w-20 h-20 rounded-xl cursor-pointer border-2', isDark ? 'border-border-dark' : 'border-border-light')}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={fontSettings.textColor}
                  onChange={(e) => updateSetting('textColor', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-blue',
                    isDark
                      ? 'bg-[rgba(30,41,59,0.5)] border-border-dark text-[#f9fafb]'
                      : 'bg-white border-border-light text-[#1a1a1a]'
                  )}
                />
              </div>
            </div>
          </div>

          {/* Heading Color */}
          <div>
            <label className={cn('block mb-2', labelColor)}>
              Heading Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={fontSettings.headingColor}
                onChange={(e) => updateSetting('headingColor', e.target.value)}
                className={cn('w-20 h-20 rounded-xl cursor-pointer border-2', isDark ? 'border-border-dark' : 'border-border-light')}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={fontSettings.headingColor}
                  onChange={(e) => updateSetting('headingColor', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-blue',
                    isDark
                      ? 'bg-[rgba(30,41,59,0.5)] border-border-dark text-[#f9fafb]'
                      : 'bg-white border-border-light text-[#1a1a1a]'
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Preview */}
      <Card title="Preview">
        <div className={cn(
          'p-6 rounded-xl border',
          isDark ? 'bg-[rgba(30,41,59,0.5)] border-border-dark' : 'bg-white border-border-light'
        )}>
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
      </Card>

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

export default FontSettings;
