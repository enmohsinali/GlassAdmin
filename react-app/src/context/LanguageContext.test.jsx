import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: vi.fn((lang) => Promise.resolve()),
    },
  }),
}));

describe('LanguageContext', () => {
  beforeEach(() => {
    // Reset document attributes before each test
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
    document.body.className = '';
    localStorage.clear();
  });

  describe('LanguageProvider', () => {
    it('renders children', () => {
      render(
        <LanguageProvider>
          <div>Test Content</div>
        </LanguageProvider>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('provides default language as English', () => {
      const TestComponent = () => {
        const { language } = useLanguage();
        return <div>{language}</div>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByText('en')).toBeInTheDocument();
    });

    it('provides default direction as LTR', () => {
      const TestComponent = () => {
        const { direction } = useLanguage();
        return <div>{direction}</div>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByText('ltr')).toBeInTheDocument();
    });
  });

  describe('useLanguage hook', () => {
    it('throws error when used outside LanguageProvider', () => {
      const originalError = console.error;
      console.error = () => {};

      const TestComponent = () => {
        useLanguage();
        return null;
      };

      expect(() => render(<TestComponent />)).toThrow(
        'useLanguage must be used within LanguageProvider'
      );

      console.error = originalError;
    });

    it('returns language context value', () => {
      const TestComponent = () => {
        const context = useLanguage();
        return (
          <div>
            <div data-testid="has-language">{context.language ? 'yes' : 'no'}</div>
            <div data-testid="has-direction">{context.direction ? 'yes' : 'no'}</div>
            <div data-testid="has-change">{context.changeLanguage ? 'yes' : 'no'}</div>
            <div data-testid="has-toggle">{context.toggleLanguage ? 'yes' : 'no'}</div>
            <div data-testid="has-isrtl">{context.isRTL ? 'yes' : 'no'}</div>
          </div>
        );
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('has-language')).toHaveTextContent('yes');
      expect(screen.getByTestId('has-direction')).toHaveTextContent('yes');
      expect(screen.getByTestId('has-change')).toHaveTextContent('yes');
      expect(screen.getByTestId('has-toggle')).toHaveTextContent('yes');
      expect(screen.getByTestId('has-isrtl')).toHaveTextContent('yes');
    });
  });

  describe('changeLanguage function', () => {
    it('changes language from English to Arabic', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { language, changeLanguage } = useLanguage();
        return (
          <div>
            <div data-testid="language">{language}</div>
            <button onClick={() => changeLanguage('ar')}>Change to Arabic</button>
          </div>
        );
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('language')).toHaveTextContent('en');

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByTestId('language')).toHaveTextContent('ar');
      });
    });

    it('updates localStorage when language changes', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { changeLanguage } = useLanguage();
        return <button onClick={() => changeLanguage('ar')}>Change</button>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('language', 'ar');
      });
    });
  });

  describe('Direction handling', () => {
    it('updates direction to RTL for Arabic', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { direction, changeLanguage } = useLanguage();
        return (
          <div>
            <div data-testid="direction">{direction}</div>
            <button onClick={() => changeLanguage('ar')}>Arabic</button>
          </div>
        );
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('direction')).toHaveTextContent('ltr');

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByTestId('direction')).toHaveTextContent('rtl');
      });
    });

    it('updates document.documentElement.dir attribute', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { changeLanguage } = useLanguage();
        return <button onClick={() => changeLanguage('ar')}>Arabic</button>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(document.documentElement.dir).toBe('rtl');
      });
    });

    it('updates document.documentElement.lang attribute', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { changeLanguage } = useLanguage();
        return <button onClick={() => changeLanguage('ar')}>Arabic</button>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(document.documentElement.lang).toBe('ar');
      });
    });

    it('adds RTL class to body for Arabic', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { changeLanguage } = useLanguage();
        return <button onClick={() => changeLanguage('ar')}>Arabic</button>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(document.body.classList.contains('rtl')).toBe(true);
        expect(document.body.classList.contains('ltr')).toBe(false);
      });
    });
  });

  describe('toggleLanguage function', () => {
    it('toggles from English to Arabic', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { language, toggleLanguage } = useLanguage();
        return (
          <div>
            <div data-testid="language">{language}</div>
            <button onClick={toggleLanguage}>Toggle</button>
          </div>
        );
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('language')).toHaveTextContent('en');

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByTestId('language')).toHaveTextContent('ar');
      });
    });

    it('toggles from Arabic back to English', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { language, toggleLanguage } = useLanguage();
        return (
          <div>
            <div data-testid="language">{language}</div>
            <button onClick={toggleLanguage}>Toggle</button>
          </div>
        );
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      const button = screen.getByRole('button');

      // Toggle to Arabic
      await user.click(button);
      await waitFor(() => {
        expect(screen.getByTestId('language')).toHaveTextContent('ar');
      });

      // Toggle back to English
      await user.click(button);
      await waitFor(() => {
        expect(screen.getByTestId('language')).toHaveTextContent('en');
      });
    });
  });

  describe('isRTL function', () => {
    it('returns false for English', () => {
      const TestComponent = () => {
        const { isRTL } = useLanguage();
        return <div>{isRTL() ? 'RTL' : 'LTR'}</div>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByText('LTR')).toBeInTheDocument();
    });

    it('returns true for Arabic', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { isRTL, changeLanguage } = useLanguage();
        return (
          <div>
            <div data-testid="dir">{isRTL() ? 'RTL' : 'LTR'}</div>
            <button onClick={() => changeLanguage('ar')}>Arabic</button>
          </div>
        );
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByTestId('dir')).toHaveTextContent('RTL');
      });
    });
  });

  describe('availableLanguages', () => {
    it('provides list of available languages', () => {
      const TestComponent = () => {
        const { availableLanguages } = useLanguage();
        return (
          <div>
            {availableLanguages.map((lang) => (
              <div key={lang.code} data-testid={`lang-${lang.code}`}>
                {lang.name}
              </div>
            ))}
          </div>
        );
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('lang-en')).toHaveTextContent('English');
      expect(screen.getByTestId('lang-ar')).toHaveTextContent('Arabic');
    });

    it('includes correct language metadata', () => {
      const TestComponent = () => {
        const { availableLanguages } = useLanguage();
        const english = availableLanguages.find((l) => l.code === 'en');
        const arabic = availableLanguages.find((l) => l.code === 'ar');

        return (
          <div>
            <div data-testid="en-native">{english.nativeName}</div>
            <div data-testid="ar-native">{arabic.nativeName}</div>
            <div data-testid="en-dir">{english.dir}</div>
            <div data-testid="ar-dir">{arabic.dir}</div>
          </div>
        );
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('en-native')).toHaveTextContent('English');
      expect(screen.getByTestId('ar-native')).toHaveTextContent('العربية');
      expect(screen.getByTestId('en-dir')).toHaveTextContent('ltr');
      expect(screen.getByTestId('ar-dir')).toHaveTextContent('rtl');
    });
  });
});
