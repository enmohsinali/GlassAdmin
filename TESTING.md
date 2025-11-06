# Testing & Quality Assurance Guide (Phase 8)

## Overview

This document outlines the testing strategy and QA processes for GlassAdmin.

## Testing Setup

### Installing Test Dependencies

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Configuration

Create `vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
});
```

## Test Types

### 1. Unit Tests

Test individual components and functions:

```jsx
// Example: Button.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('disables when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText('Click')).toBeDisabled();
  });
});
```

### 2. Integration Tests

Test component interactions:

```jsx
// Example: LoginForm.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits form with user credentials', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### 3. Accessibility Tests

```jsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Testing Best Practices

### 1. Component Testing

```jsx
✅ DO:
- Test user behavior, not implementation
- Use accessible queries (getByRole, getByLabelText)
- Test both happy and error paths
- Mock external dependencies

❌ DON'T:
- Test implementation details
- Use data-testid everywhere
- Write brittle tests tied to HTML structure
- Test third-party libraries
```

### 2. Query Priority

```jsx
// 1. Accessible by everyone (best)
getByRole('button', { name: /submit/i })
getByLabelText('Email')
getByPlaceholderText('Enter email')
getByText('Welcome')

// 2. Semantic queries
getByAltText('Profile picture')
getByTitle('Close')

// 3. Last resort
getByTestId('submit-button')
```

### 3. Async Testing

```jsx
// ✅ Good - Wait for elements
await screen.findByText('Loaded');

// ✅ Good - Wait for disappearance
await waitForElementToBeRemoved(() => screen.queryByText('Loading'));

// ❌ Bad - Don't use setTimeout
setTimeout(() => expect(screen.getByText('Loaded')), 1000);
```

## Test Coverage Goals

| Component Type | Target Coverage |
|---------------|----------------|
| UI Components | 80%+ |
| Utilities | 90%+ |
| Contexts | 85%+ |
| Pages | 70%+ |
| Overall | 75%+ |

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Button.test.jsx

# Run tests matching pattern
npm test -- --grep="Button"
```

## Manual QA Checklist

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] 4K displays (2560px+)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Semantic HTML used

### Internationalization
- [ ] English text displays correctly
- [ ] Arabic text displays correctly
- [ ] RTL layout works properly
- [ ] All UI text is translated
- [ ] Date/time formats localized

### Theme Testing
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Theme toggle works smoothly
- [ ] Colors meet contrast requirements

### Performance
- [ ] Pages load under 2s
- [ ] No layout shift (CLS < 0.1)
- [ ] Smooth animations (60fps)
- [ ] No memory leaks
- [ ] Optimized images

## Quality Metrics

### Code Quality
- ESLint: No errors
- Prettier: Formatted
- TypeScript: (Optional) No errors
- Bundle size: < 500KB (initial)

### Performance Metrics
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Blocking Time: < 300ms

### Accessibility Score
- Lighthouse Accessibility: 100
- WCAG 2.1 AA: Compliant
- Keyboard Navigation: Full support

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run lint
```

## Debugging Tests

```jsx
// Add debug output
import { render, screen, debug } from '@testing-library/react';

const { debug } = render(<Component />);
debug(); // Prints DOM tree

// Check what's in the document
screen.debug();

// Log queries
screen.logTestingPlaygroundURL();
```

## Next Steps

1. Set up Vitest and Testing Library
2. Write tests for critical components
3. Aim for 75%+ coverage
4. Set up CI/CD pipeline
5. Add pre-commit hooks for tests
6. Document test patterns

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://www.deque.com/axe/)
