import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlassCard, { GlassCardGradient } from './GlassCard';
import { ThemeProvider } from '../../context/ThemeContext';

const renderWithTheme = (ui) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('GlassCard Component', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      renderWithTheme(<GlassCard>Test content</GlassCard>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with title', () => {
      renderWithTheme(<GlassCard title="Card Title">Content</GlassCard>);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('renders without title', () => {
      renderWithTheme(<GlassCard>Content only</GlassCard>);
      expect(screen.getByText('Content only')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderWithTheme(
        <GlassCard className="custom-class">Content</GlassCard>
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Styling', () => {
    it('applies glassmorphic base styles', () => {
      const { container } = renderWithTheme(<GlassCard>Content</GlassCard>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-[14px]', 'backdrop-blur-[20px]', 'border');
    });

    it('applies proper padding', () => {
      const { container } = renderWithTheme(<GlassCard>Content</GlassCard>);
      expect(container.firstChild).toHaveClass('p-5');
    });

    it('has transition class', () => {
      const { container } = renderWithTheme(<GlassCard>Content</GlassCard>);
      expect(container.firstChild).toHaveClass('transition-all', 'ease-[0.3s]');
    });
  });

  describe('Hover Effects', () => {
    it('applies cursor-pointer when hover is enabled', () => {
      const { container } = renderWithTheme(<GlassCard hover>Content</GlassCard>);
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });

    it('does not apply cursor-pointer when hover is disabled', () => {
      const { container } = renderWithTheme(<GlassCard>Content</GlassCard>);
      expect(container.firstChild).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      const { container } = renderWithTheme(
        <GlassCard onClick={handleClick}>Clickable Content</GlassCard>
      );

      await user.click(container.firstChild);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not crash when onClick is not provided', async () => {
      const user = userEvent.setup();

      const { container } = renderWithTheme(<GlassCard>Content</GlassCard>);

      await expect(user.click(container.firstChild)).resolves.not.toThrow();
    });
  });

  describe('Animation Props', () => {
    it('accepts animate prop', () => {
      const { container } = renderWithTheme(<GlassCard animate>Content</GlassCard>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('accepts delay prop', () => {
      const { container } = renderWithTheme(
        <GlassCard animate delay={0.5}>
          Content
        </GlassCard>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('works with both hover and animate enabled', () => {
      const { container } = renderWithTheme(
        <GlassCard hover animate>
          Content
        </GlassCard>
      );
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });
  });

  describe('Title Styling', () => {
    it('applies correct title styles', () => {
      renderWithTheme(<GlassCard title="Styled Title">Content</GlassCard>);
      const title = screen.getByText('Styled Title');
      expect(title).toHaveClass('text-[17px]', 'font-semibold', 'mb-4');
    });
  });
});

describe('GlassCardGradient Component', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      renderWithTheme(<GlassCardGradient>Gradient content</GlassCardGradient>);
      expect(screen.getByText('Gradient content')).toBeInTheDocument();
    });

    it('renders with title', () => {
      renderWithTheme(
        <GlassCardGradient title="Gradient Title">Content</GlassCardGradient>
      );
      expect(screen.getByText('Gradient Title')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderWithTheme(
        <GlassCardGradient className="custom-gradient">Content</GlassCardGradient>
      );
      expect(container.firstChild).toHaveClass('custom-gradient');
    });
  });

  describe('Styling', () => {
    it('applies glassmorphic base styles', () => {
      const { container } = renderWithTheme(
        <GlassCardGradient>Content</GlassCardGradient>
      );
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-[14px]', 'backdrop-blur-[20px]', 'border');
    });

    it('has cursor-pointer class', () => {
      const { container } = renderWithTheme(
        <GlassCardGradient>Content</GlassCardGradient>
      );
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });
  });

  describe('Gradient Variants', () => {
    it('renders with blue gradient by default', () => {
      const { container } = renderWithTheme(
        <GlassCardGradient>Content</GlassCardGradient>
      );
      expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    });

    it('accepts green gradient', () => {
      const { container } = renderWithTheme(
        <GlassCardGradient gradient="green">Content</GlassCardGradient>
      );
      expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    });

    it('accepts red gradient', () => {
      const { container } = renderWithTheme(
        <GlassCardGradient gradient="red">Content</GlassCardGradient>
      );
      expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    });

    it('accepts purple gradient', () => {
      const { container } = renderWithTheme(
        <GlassCardGradient gradient="purple">Content</GlassCardGradient>
      );
      expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      const { container } = renderWithTheme(
        <GlassCardGradient onClick={handleClick}>
          Clickable Gradient
        </GlassCardGradient>
      );

      await user.click(container.firstChild);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Layout', () => {
    it('has gradient overlay', () => {
      const { container } = renderWithTheme(
        <GlassCardGradient>Content</GlassCardGradient>
      );
      const overlay = container.querySelector('.bg-gradient-to-br.opacity-50');
      expect(overlay).toBeInTheDocument();
    });

    it('positions content above gradient with z-index', () => {
      renderWithTheme(
        <GlassCardGradient title="Title">Content</GlassCardGradient>
      );
      const title = screen.getByText('Title');
      expect(title).toHaveClass('z-10');
    });
  });
});
