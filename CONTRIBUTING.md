# Contributing to GlassAdmin

First off, thank you for considering contributing to GlassAdmin! It's people like you that make GlassAdmin such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to support@glassadmin.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** if possible.
* **Include your environment details** (OS, Browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps** or provide mockups.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most GlassAdmin users.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the [JavaScript](#javascript-styleguide) and [React](#react-styleguide) styleguides
* End all files with a newline
* Avoid platform-dependent code

## Development Process

### Getting Started

1. Fork the repo
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/GlassAdmin.git
   cd GlassAdmin/react-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

5. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug in component"
   ```

6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

7. Create a Pull Request from your fork to the main repository

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**
```
feat(button): add loading state to AnimatedButton component

fix(modal): resolve keyboard navigation issue

docs(readme): update installation instructions

style(card): format code according to prettier rules
```

## Styleguides

### JavaScript Styleguide

* Use 2 spaces for indentation
* Use semicolons
* Use single quotes for strings
* Use template literals for string interpolation
* Use arrow functions when possible
* Use destructuring when appropriate
* Use meaningful variable names

```javascript
// Good
const getUserName = (user) => {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
};

// Bad
function getName(u) {
  return u.firstName + ' ' + u.lastName;
}
```

### React Styleguide

* Use functional components with hooks
* Use descriptive component names (PascalCase)
* One component per file
* Export component as default at the end
* Use prop destructuring
* Use TypeScript-style JSDoc comments for prop documentation

```jsx
/**
 * Button Component
 *
 * @param {Object} props
 * @param {string} props.variant - Button variant (primary, secondary, etc.)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 */
const Button = ({ variant = 'primary', size = 'md', children, onClick }) => {
  return (
    <button className={`btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
```

### CSS/Tailwind Styleguide

* Use Tailwind utility classes when possible
* Follow the design tokens defined in `tailwind.config.js`
* Use exact pixel values in brackets for consistency: `text-[15px]`, `rounded-[14px]`
* Group related classes together
* Use `cn()` utility for conditional classes

```jsx
// Good
<div className={cn(
  'flex items-center gap-4',
  'p-4 rounded-[14px]',
  'bg-[rgba(255,255,255,0.7)]',
  'transition-all ease-[0.3s]',
  isActive && 'bg-[rgba(58,109,240,0.1)]'
)}>

// Bad
<div className="flex items-center gap-4 p-4 rounded-[14px] bg-[rgba(255,255,255,0.7)] transition-all ease-[0.3s]">
```

### Design Guidelines

* Follow Apple iOS 26 Liquid Glass UI design principles
* Use `rounded-[14px]` for cards and containers
* Use `rounded-[20px]` for buttons
* Use `text-[15px]` for normal text, `text-[17px]` for titles
* Use `transition-all ease-[0.3s]` for smooth transitions
* Maintain glassmorphic effects with backdrop blur
* Ensure components work in both light and dark modes
* Test RTL layout for Arabic language support

## Project Structure

When adding new components or features, follow the existing project structure:

```
react-app/src/
├── components/          # Reusable components
│   ├── ui/             # UI component library
│   │   ├── YourComponent.jsx
│   │   └── index.js    # Export your component here
│   └── YourComponent.jsx
├── context/            # React contexts
├── pages/              # Page components
├── utils/              # Utility functions
└── i18n/               # Internationalization
```

## Testing

* Write tests for new components (coming in Phase 8)
* Ensure all existing tests pass
* Test your changes in both light and dark modes
* Test responsive behavior on different screen sizes
* Test RTL layout if text is involved
* Test keyboard navigation for interactive components

## Documentation

* Update README.md if you change functionality
* Add JSDoc comments to your components
* Update relevant documentation in the `docs/` folder
* Include prop descriptions and examples
* Update CHANGELOG.md

## Questions?

Feel free to ask questions by:
* Opening an issue with the question label
* Joining our discussions on GitHub Discussions
* Emailing support@glassadmin.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to GlassAdmin! 🎨
