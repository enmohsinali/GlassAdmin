# 📦 GlassAdmin - Installation Guide

Complete step-by-step installation guide for GlassAdmin React Admin Template.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Methods](#installation-methods)
3. [Development Setup](#development-setup)
4. [Production Build](#production-build)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## System Requirements

### Minimum Requirements

| Requirement | Version | Download |
|------------|---------|----------|
| **Node.js** | 18.0.0+ | [Download](https://nodejs.org/) |
| **npm** | 9.0.0+ | Included with Node.js |
| **Modern Browser** | Latest | Chrome, Firefox, Safari, Edge |

### Recommended Specifications

- **RAM:** 4GB minimum, 8GB+ recommended
- **Storage:** 500MB free space
- **OS:** Windows 10+, macOS 10.15+, or Linux
- **Code Editor:** VS Code (recommended)

### Optional Tools

- **Git:** For version control
- **Yarn:** Alternative package manager
- **VS Code Extensions:**
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

---

## Installation Methods

### Method 1: Standard Installation (Recommended)

**Step 1: Download & Extract**

```bash
# Download from ThemeForest
# Extract the zip file to your desired location
unzip glassadmin-react-vX.X.X.zip
cd GlassAdmin
```

**Step 2: Navigate to React App**

```bash
cd react-app
```

**Step 3: Install Dependencies**

Using npm:
```bash
npm install
```

Using Yarn (if preferred):
```bash
yarn install
```

**Step 4: Start Development Server**

```bash
npm run dev
```

**Step 5: Open in Browser**

Navigate to: `http://localhost:5173`

✅ **You're all set!** The application should now be running.

---

### Method 2: Quick Start (Experienced Developers)

```bash
# Extract, install, and run in one go
unzip glassadmin-react-vX.X.X.zip && \
cd GlassAdmin/react-app && \
npm install && \
npm run dev
```

---

## Development Setup

### Project Structure Understanding

```
react-app/
├── public/              # Static assets
│   └── ...
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # UI component library (40+ components)
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── dashboards/ # Dashboard pages
│   │   ├── users/      # User management
│   │   └── ...
│   ├── context/        # React contexts (Theme, Language)
│   ├── i18n/           # Internationalization
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles & CSS variables
├── .eslintrc.cjs       # ESLint configuration
├── tailwind.config.js  # Tailwind CSS config
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies & scripts
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:5173 |
| `npm run build` | Create production build in `/dist` folder |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Environment Configuration

Create a `.env` file in the `react-app` directory if you need environment variables:

```env
# Example .env file
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=GlassAdmin
VITE_ENABLE_ANALYTICS=false
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Production Build

### Creating Production Build

**Step 1: Run Build Command**

```bash
npm run build
```

This will:
- Minify JavaScript and CSS
- Optimize assets
- Generate production-ready files in `/dist` folder
- Create source maps
- Split code into chunks for optimal loading

**Step 2: Verify Build**

Check the `/dist` folder:
```
dist/
├── assets/
│   ├── index-[hash].js      # Main JavaScript bundle
│   ├── index-[hash].css     # Compiled CSS
│   ├── vendor-[hash].js     # Third-party libraries
│   └── ...                  # Images, videos, fonts
└── index.html               # Entry HTML file
```

**Step 3: Test Production Build Locally**

```bash
npm run preview
```

Navigate to: `http://localhost:4173`

### Build Optimization Tips

1. **Remove Demo Data** - Remove mock data before production build
2. **Optimize Images** - Compress images using tools like TinyPNG
3. **Remove Unused Fonts** - Only include fonts you're using
4. **Check Bundle Size** - Run `npm run build -- --mode analyze` if analyzer is configured
5. **Enable Gzip** - Configure your server to enable gzip compression

---

## Deployment

### Deploy to Netlify

**Method 1: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd react-app
npm run build
netlify deploy --prod --dir=dist
```

**Method 2: Netlify UI**

1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" > "Deploy manually"
3. Drag and drop the `/dist` folder
4. Done!

**Method 3: Git Integration**

1. Push code to GitHub/GitLab
2. Connect repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `react-app`

---

### Deploy to Vercel

**Method 1: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd react-app
vercel --prod
```

**Method 2: Vercel UI**

1. Go to [Vercel](https://vercel.com)
2. Import your Git repository
3. Configure:
   - Framework Preset: Vite
   - Root Directory: `react-app`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

---

### Deploy to Traditional Hosting (cPanel, etc.)

**Step 1: Build the Project**

```bash
npm run build
```

**Step 2: Upload Files**

1. Open your hosting file manager or FTP client
2. Navigate to `public_html` or your web root
3. Upload ALL files from the `/dist` folder
4. Make sure `index.html` is in the root

**Step 3: Configure Server**

Create `.htaccess` file (for Apache):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

For Nginx, add to your config:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

### Deploy to AWS S3 + CloudFront

**Step 1: Build**

```bash
npm run build
```

**Step 2: Create S3 Bucket**

```bash
aws s3 mb s3://your-bucket-name
```

**Step 3: Upload Files**

```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

**Step 4: Configure Bucket for Static Hosting**

```bash
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

**Step 5: Set up CloudFront** (optional, for CDN)

1. Create CloudFront distribution
2. Point origin to S3 bucket
3. Set default root object to `index.html`
4. Configure error pages to redirect 404 to `index.html`

---

## Troubleshooting

### Common Issues & Solutions

#### Issue 1: `npm install` Fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue 2: Port 5173 Already in Use

**Solution:**
```bash
# Use a different port
npm run dev -- --port 3000
```

Or kill the process using port 5173:
```bash
# On Mac/Linux
lsof -ti:5173 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

#### Issue 3: Build Fails with Memory Error

**Solution:**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

On Windows:
```bash
set NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

#### Issue 4: Routing Doesn't Work After Deployment

**Solution:**

Make sure your server is configured to redirect all routes to `index.html`. See the deployment section for server configuration examples.

#### Issue 5: Styles Not Loading

**Solution:**

1. Check if `/dist/assets/*.css` files exist
2. Verify your base URL in `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/', // or '/your-subfolder/' if deployed to subfolder
   })
   ```
3. Rebuild the project

#### Issue 6: Module Not Found Errors

**Solution:**
```bash
# Make sure you're in the react-app directory
cd react-app

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

After successful installation:

### 1. Customize Branding

- Update `public/favicon.ico`
- Change app title in `index.html`
- Update meta tags for SEO

### 2. Configure Theme Colors

Edit `src/index.css`:
```css
:root {
  --color-primary: 58 109 240;  /* Your primary color */
  /* ...other colors */
}
```

### 3. Set Up API Integration

Create API service files in `src/services/`:
```javascript
// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};
```

### 4. Configure Authentication

Implement your auth logic in the auth pages:
- `src/pages/LoginPage.jsx`
- `src/pages/RegisterPage.jsx`

### 5. Add Your Content

- Replace demo data with real data
- Update page content
- Add your images and assets

### 6. Review Documentation

- Read [FEATURES.md](FEATURES.md) for component usage
- Check [README.md](README.md) for overview
- Review [SUPPORT.md](SUPPORT.md) for support info

---

## Need Help?

- 📧 **Email Support:** support@glassadmin.com
- 📚 **Documentation:** See `/docs` folder
- 🎫 **Support Ticket:** Through ThemeForest purchase page

---

**Happy Building! 🚀**

Last Updated: November 2025
Version: 1.0.0
