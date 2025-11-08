# Pa11y Automated WCAG Testing Guide
**GlassAdmin Template - Accessibility Testing with Pa11y**

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running Tests](#running-tests)
5. [CI/CD Integration](#cicd-integration)
6. [Interpreting Results](#interpreting-results)
7. [Common Issues & Solutions](#common-issues--solutions)

---

## 🎯 Overview

Pa11y is an automated accessibility testing tool that uses headless Chrome to analyze web pages against WCAG 2.0/2.1 standards. This guide shows you how to run Pa11y tests for the GlassAdmin template.

### What Pa11y Tests

- **WCAG 2.1 Level AA** compliance (default)
- HTML structure and semantics
- ARIA attributes and roles
- Color contrast ratios
- Keyboard accessibility
- Form labels and error messages
- Heading hierarchy
- Alternative text for images

### Test Coverage

✅ **Components Page** - Primary focus (most complex page)
✅ **All Dashboard Pages** - Analytics, Ecommerce
✅ **CRM Pages** - Messenger, Tasks, Contacts, Calendar
✅ **Project Management** - Scrum Board, Financial

---

## 📦 Prerequisites

### System Requirements
- **Node.js** 18+ or 20+
- **npm** 9+ or yarn/pnpm
- **Chrome/Chromium** browser (installed automatically by Puppeteer)
- **4GB RAM minimum** (for headless browser)

### Project Setup
```bash
# Ensure you're in the react-app directory
cd /path/to/GlassAdmin/react-app

# Verify Node version
node --version  # Should be v18.x.x or higher
```

---

## 🚀 Installation

### Step 1: Install Pa11y
Pa11y is already added to `package.json` as a dev dependency:

```bash
npm install
```

### Step 2: Verify Installation
```bash
# Check Pa11y version
npx pa11y --version

# Should output: 9.0.1 (or similar)
```

### Step 3: Install Chrome for Puppeteer
If Chrome wasn't automatically installed:

```bash
# Install Chrome browser for Puppeteer
npx puppeteer browsers install chrome

# Or install specific version
npx @puppeteer/browsers install chrome@stable
```

---

## 🧪 Running Tests

### Quick Start

**Option 1: Test Components Page (Recommended)**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run Pa11y test
npm run a11y
```

**Option 2: Test All Pages**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run comprehensive test
npm run a11y:ci
```

**Option 3: Generate HTML Report**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Generate HTML report
npm run a11y:html

# Open the report
open pa11y-report.html  # macOS
xdg-open pa11y-report.html  # Linux
start pa11y-report.html  # Windows
```

---

### Available NPM Scripts

| Script | Description | Output |
|--------|-------------|--------|
| `npm run a11y` | Test Components page | CLI output |
| `npm run a11y:ci` | Test all configured pages | CLI + JSON |
| `npm run a11y:components` | Test Components page with detailed CLI output | CLI |
| `npm run a11y:json` | Test Components page, save JSON report | `pa11y-report.json` |
| `npm run a11y:html` | Test Components page, save HTML report | `pa11y-report.html` |
| `npm run a11y:all` | Start server, test all, stop server | Auto-managed |

---

### Manual Testing Commands

**Test a Specific URL**
```bash
pa11y http://localhost:5173/components --standard WCAG2AA
```

**Test with Screenshots**
```bash
pa11y http://localhost:5173/components \
  --screen-capture ./screenshots/components.png
```

**Test with Custom Actions**
```bash
pa11y http://localhost:5173/components \
  --actions "wait for element h1 to be visible" \
  --actions "click element .open-modal-button"
```

**Test Multiple Standards**
```bash
# WCAG 2.0 Level A
pa11y http://localhost:5173/components --standard WCAG2A

# WCAG 2.0 Level AA (default)
pa11y http://localhost:5173/components --standard WCAG2AA

# WCAG 2.0 Level AAA
pa11y http://localhost:5173/components --standard WCAG2AAA

# Section 508
pa11y http://localhost:5173/components --standard Section508
```

---

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/accessibility.yml`:

```yaml
name: Accessibility Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  a11y-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: react-app/package-lock.json

      - name: Install dependencies
        working-directory: ./react-app
        run: npm ci

      - name: Build application
        working-directory: ./react-app
        run: npm run build

      - name: Start preview server
        working-directory: ./react-app
        run: |
          npm run preview &
          sleep 5

      - name: Run Pa11y tests
        working-directory: ./react-app
        run: npm run a11y:ci

      - name: Upload Pa11y results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: pa11y-results
          path: react-app/pa11y-*.json
          retention-days: 30

      - name: Upload screenshots
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: pa11y-screenshots
          path: react-app/pa11y-screenshots/
          retention-days: 7
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test

accessibility-tests:
  stage: test
  image: node:20
  before_script:
    - cd react-app
    - npm ci
    - npm run build
  script:
    - npm run preview &
    - sleep 5
    - npm run a11y:ci
  artifacts:
    when: always
    paths:
      - react-app/pa11y-*.json
      - react-app/pa11y-screenshots/
    expire_in: 30 days
  only:
    - main
    - develop
    - merge_requests
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                dir('react-app') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build') {
            steps {
                dir('react-app') {
                    sh 'npm run build'
                }
            }
        }

        stage('Accessibility Tests') {
            steps {
                dir('react-app') {
                    sh '''
                        npm run preview &
                        SERVER_PID=$!
                        sleep 5
                        npm run a11y:ci
                        kill $SERVER_PID
                    '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'react-app/pa11y-*.json', fingerprint: true
            archiveArtifacts artifacts: 'react-app/pa11y-screenshots/**/*', fingerprint: true
        }
    }
}
```

---

## 📊 Interpreting Results

### Understanding Pa11y Output

#### CLI Output Format
```
Running Pa11y on http://localhost:5173/components

Results for URL: http://localhost:5173/components

 • Error: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 3.2:1. Recommendation: change background to #1a1a1a.
   ├── WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
   ├── html > body > div#root > div > main > section#buttons > div > p
   └── <p class="text-gray-500">This is a button</p>

 • Warning: Check that the title element describes the document.
   ├── WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl
   ├── html > head
   └── <head>...</head>

0 Errors
2 Warnings
0 Notices
```

### Error Severity Levels

| Level | Severity | Action Required | Example |
|-------|----------|----------------|---------|
| **Error** | 🔴 Critical | **MUST FIX** | Insufficient color contrast, missing alt text, no form labels |
| **Warning** | 🟡 Medium | **SHOULD FIX** | Potential issues that need review, possible false positives |
| **Notice** | 🔵 Info | **REVIEW** | Best practice suggestions, informational items |

### Common WCAG Codes

| Code | Description | Severity |
|------|-------------|----------|
| `WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail` | Insufficient color contrast (4.5:1 minimum) | Error |
| `WCAG2AA.Principle1.Guideline1_1.1_1_1.H37` | Missing alt attribute on image | Error |
| `WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.` | Presentational markup (deprecated HTML) | Warning |
| `WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81` | Link purpose unclear from context | Warning |
| `WCAG2AA.Principle3.Guideline3_3.3_3_2.G131,G89,G184,H90` | Missing form label | Error |
| `WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.` | Missing ARIA attributes | Error |

---

### JSON Report Format

```json
{
  "documentTitle": "Components Showcase - GlassAdmin",
  "pageUrl": "http://localhost:5173/components",
  "issues": [
    {
      "code": "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "type": "error",
      "typeCode": 1,
      "message": "This element has insufficient contrast...",
      "context": "<p class=\"text-gray-500\">This is a button</p>",
      "selector": "html > body > div#root > main > section > p",
      "runner": "htmlcs",
      "runnerExtras": {}
    }
  ]
}
```

---

## 🔧 Configuration

### Pa11y Configuration File

The project includes `.pa11yci.json` for comprehensive testing:

```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 30000,
    "wait": 1000,
    "runners": ["axe", "htmlcs"],
    "includeWarnings": true,
    "screenCapture": "./pa11y-screenshots/{{url}}.png"
  },
  "urls": [
    "http://localhost:5173/components",
    "http://localhost:5173/dashboard/analytics"
  ]
}
```

### Customization Options

**Ignore Specific Issues**
```json
{
  "defaults": {
    "ignore": [
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "notice"
    ]
  }
}
```

**Test Specific Viewports**
```json
{
  "defaults": {
    "viewport": {
      "width": 1280,
      "height": 1024
    }
  }
}
```

**Add Custom Actions**
```json
{
  "urls": [{
    "url": "http://localhost:5173/components",
    "actions": [
      "wait for element h1 to be visible",
      "click element .open-modal",
      "wait for element .modal to be visible",
      "set field #email to test@example.com"
    ]
  }]
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Could not find Chrome"

**Error:**
```
Error: Could not find Chrome (ver. 142.0.7444.61)
```

**Solution:**
```bash
# Install Chrome for Puppeteer
npx puppeteer browsers install chrome

# Or set custom Chrome path
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
```

---

### Issue 2: "Failed to launch browser"

**Error:**
```
Error: Failed to launch the browser process
```

**Solution:**
```bash
# Linux: Install dependencies
sudo apt-get update
sudo apt-get install -y \
  libnss3 \
  libxss1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libgtk-3-0

# Run with no-sandbox (CI environments)
pa11y http://localhost:5173 --chromeLaunchConfig.args="--no-sandbox"
```

---

### Issue 3: "Connection Refused"

**Error:**
```
Error: net::ERR_CONNECTION_REFUSED at http://localhost:5173
```

**Solution:**
```bash
# Ensure dev server is running
npm run dev

# Or increase wait time
pa11y http://localhost:5173 --wait 3000
```

---

### Issue 4: Too Many Errors

**Error:**
```
53 Errors
127 Warnings
```

**Solution:**
```bash
# 1. Focus on errors only
pa11y http://localhost:5173 --include-warnings false

# 2. Ignore notices
pa11y http://localhost:5173 --include-notices false

# 3. Test specific elements
pa11y http://localhost:5173 --hide-elements "iframe,video"

# 4. Use threshold
pa11y http://localhost:5173 --threshold 10  # Fail if >10 errors
```

---

### Issue 5: False Positives

**Problem:** Pa11y reports issues that aren't actually problems

**Solution:**
Add to `.pa11yci.json`:
```json
{
  "defaults": {
    "ignore": [
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage",
      "WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.I"
    ]
  }
}
```

---

## 📈 Best Practices

### 1. **Run Tests Regularly**
- Before every commit
- In CI/CD pipeline
- After dependency updates
- Before production deploys

### 2. **Prioritize Errors**
- Fix errors first (WCAG violations)
- Review warnings case-by-case
- Use notices for improvements

### 3. **Combine with Manual Testing**
- Pa11y catches ~60% of issues
- Manual testing with screen readers essential
- Keyboard navigation testing required
- Real user testing recommended

### 4. **Track Progress**
```bash
# Save baseline
npm run a11y:json
mv pa11y-report.json pa11y-baseline.json

# Compare after fixes
npm run a11y:json
diff pa11y-baseline.json pa11y-report.json
```

### 5. **Document Ignored Issues**
Keep a `ACCESSIBILITY_DECISIONS.md` file documenting why certain issues are ignored.

---

## 📚 Additional Resources

### Official Documentation
- [Pa11y Documentation](https://github.com/pa11y/pa11y)
- [Pa11y CI](https://github.com/pa11y/pa11y-ci)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools & Extensions
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - WebAIM's evaluation tool
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Chrome DevTools
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/) - Desktop app

### Learning Resources
- [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)

---

## 🎯 Quick Reference

### Start Testing in 3 Commands
```bash
# 1. Start dev server
npm run dev

# 2. Open new terminal, run test
npm run a11y

# 3. View results in terminal
```

### Generate Report
```bash
npm run dev  # Terminal 1
npm run a11y:html  # Terminal 2
open pa11y-report.html  # Terminal 2
```

### CI/CD
```bash
npm run a11y:all  # Auto-starts server, runs tests, stops server
```

---

## ✅ Success Criteria

Your application passes when:
- ✅ **0 Errors** (WCAG violations)
- ✅ **<5 Warnings** (reviewed and documented)
- ✅ **All critical user paths tested**
- ✅ **Manual screen reader testing passed**
- ✅ **Keyboard navigation works**

---

**Last Updated:** 2025-11-08
**Maintained By:** GlassAdmin Team
**Questions?** Open an issue on GitHub
