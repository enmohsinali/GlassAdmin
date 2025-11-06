import { describe, it, expect } from 'vitest';
import { render, screen, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeContext';

describe('ThemeContext', () => {
  describe('ThemeProvider', () => {
    it('renders children', () => {
      render(
        <ThemeProvider>
          <div>Test Content</div>
        </ThemeProvider>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('provides default isDark value as true', () => {
      const TestComponent = () => {
        const { isDark } = useTheme();
        return <div>{isDark ? 'Dark' : 'Light'}</div>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByText('Dark')).toBeInTheDocument();
    });
  });

  describe('useTheme hook', () => {
    it('throws error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = () => {};

      const TestComponent = () => {
        useTheme();
        return null;
      };

      expect(() => render(<TestComponent />)).toThrow(
        'useTheme must be used within a ThemeProvider'
      );

      console.error = originalError;
    });

    it('returns theme context value', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current).toHaveProperty('isDark');
      expect(result.current).toHaveProperty('toggleTheme');
      expect(typeof result.current.toggleTheme).toBe('function');
    });

    it('starts with dark theme by default', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.isDark).toBe(true);
    });
  });

  describe('toggleTheme function', () => {
    it('toggles theme from dark to light', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { isDark, toggleTheme } = useTheme();
        return (
          <div>
            <div>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
            <button onClick={toggleTheme}>Toggle</button>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByText('Dark Mode')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /toggle/i }));

      expect(screen.getByText('Light Mode')).toBeInTheDocument();
    });

    it('toggles theme from light back to dark', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { isDark, toggleTheme } = useTheme();
        return (
          <div>
            <div>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
            <button onClick={toggleTheme}>Toggle</button>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /toggle/i });

      // Toggle to light
      await user.click(button);
      expect(screen.getByText('Light Mode')).toBeInTheDocument();

      // Toggle back to dark
      await user.click(button);
      expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    });

    it('can be called multiple times', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { isDark, toggleTheme } = useTheme();
        return (
          <div>
            <div data-testid="theme-indicator">{isDark ? 'dark' : 'light'}</div>
            <button onClick={toggleTheme}>Toggle</button>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /toggle/i });
      const indicator = screen.getByTestId('theme-indicator');

      expect(indicator).toHaveTextContent('dark');

      await user.click(button);
      expect(indicator).toHaveTextContent('light');

      await user.click(button);
      expect(indicator).toHaveTextContent('dark');

      await user.click(button);
      expect(indicator).toHaveTextContent('light');
    });
  });

  describe('Multiple consumers', () => {
    it('provides same context to multiple consumers', () => {
      const Consumer1 = () => {
        const { isDark } = useTheme();
        return <div data-testid="consumer1">{isDark ? 'dark' : 'light'}</div>;
      };

      const Consumer2 = () => {
        const { isDark } = useTheme();
        return <div data-testid="consumer2">{isDark ? 'dark' : 'light'}</div>;
      };

      render(
        <ThemeProvider>
          <Consumer1 />
          <Consumer2 />
        </ThemeProvider>
      );

      expect(screen.getByTestId('consumer1')).toHaveTextContent('dark');
      expect(screen.getByTestId('consumer2')).toHaveTextContent('dark');
    });

    it('updates all consumers when theme is toggled', async () => {
      const user = userEvent.setup();

      const Consumer1 = () => {
        const { isDark } = useTheme();
        return <div data-testid="consumer1">{isDark ? 'dark' : 'light'}</div>;
      };

      const Consumer2 = () => {
        const { isDark } = useTheme();
        return <div data-testid="consumer2">{isDark ? 'dark' : 'light'}</div>;
      };

      const ToggleButton = () => {
        const { toggleTheme } = useTheme();
        return <button onClick={toggleTheme}>Toggle</button>;
      };

      render(
        <ThemeProvider>
          <Consumer1 />
          <Consumer2 />
          <ToggleButton />
        </ThemeProvider>
      );

      const consumer1 = screen.getByTestId('consumer1');
      const consumer2 = screen.getByTestId('consumer2');

      expect(consumer1).toHaveTextContent('dark');
      expect(consumer2).toHaveTextContent('dark');

      await user.click(screen.getByRole('button', { name: /toggle/i }));

      expect(consumer1).toHaveTextContent('light');
      expect(consumer2).toHaveTextContent('light');
    });
  });
});
