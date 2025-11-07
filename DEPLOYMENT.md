# GlassAdmin Deployment Guide

This guide covers deploying GlassAdmin to various hosting platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build for Production](#build-for-production)
- [Deployment Options](#deployment-options)
  - [Vercel](#vercel-recommended)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [AWS S3 + CloudFront](#aws-s3--cloudfront)
  - [Docker](#docker)
  - [Traditional Web Server](#traditional-web-server)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- Node.js 18.x or higher
- npm or yarn package manager
- Production environment variables configured
- All tests passing (`npm test`)
- No ESLint errors (`npm run lint`)

---

## Build for Production

```bash
# Navigate to the React app directory
cd react-app

# Install dependencies
npm install

# Run tests to ensure everything works
npm test

# Build for production
npm run build
```

The production build will be created in `react-app/dist/` directory.

### Build Optimization Checklist

- [✅] All console.log statements removed
- [✅] ESLint errors fixed
- [✅] Tests passing
- [✅] Environment variables configured
- [✅] Source maps disabled (for security)
- [✅] Terser minification enabled
- [✅] Code splitting configured
- [✅] Lazy loading implemented

---

## Deployment Options

### Vercel (Recommended)

**Best for**: Easy setup, automatic deployments, great performance

#### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   cd react-app
   vercel
   ```

3. **Or deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set **Root Directory** to `react-app`
   - Set **Build Command** to `npm run build`
   - Set **Output Directory** to `dist`
   - Add environment variables (if any)
   - Deploy!

#### Configuration (vercel.json):

Create `react-app/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

### Netlify

**Best for**: Continuous deployment, form handling, serverless functions

#### Steps:

1. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   cd react-app
   netlify deploy --prod
   ```

2. **Or deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository
   - Set **Base directory** to `react-app`
   - Set **Build command** to `npm run build`
   - Set **Publish directory** to `react-app/dist`
   - Deploy!

#### Configuration (netlify.toml):

Create `react-app/netlify.toml`:

```toml
[build]
  base = "react-app"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### GitHub Pages

**Best for**: Free hosting, simple static sites

#### Steps:

1. **Install gh-pages**:
   ```bash
   cd react-app
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/glassadmin",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**:
   ```javascript
   export default defineConfig({
     base: '/glassadmin/', // Replace with your repo name
     // ... rest of config
   });
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select branch: `gh-pages`
   - Click Save

---

### AWS S3 + CloudFront

**Best for**: Custom domain, full control, scalability

#### Steps:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://glassadmin-app
   ```

3. **Configure bucket for static hosting**:
   ```bash
   aws s3 website s3://glassadmin-app \
     --index-document index.html \
     --error-document index.html
   ```

4. **Upload files**:
   ```bash
   aws s3 sync dist/ s3://glassadmin-app --delete
   ```

5. **Set proper permissions** (Bucket Policy):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::glassadmin-app/*"
       }
     ]
   }
   ```

6. **Create CloudFront Distribution** (optional, for CDN):
   - Origin: S3 bucket website endpoint
   - Default Root Object: `index.html`
   - Custom Error Response: 404 → `/index.html` (200)

---

### Docker

**Best for**: Containerized deployments, Kubernetes

#### Dockerfile:

Create `react-app/Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:

Create `react-app/nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
```

#### Build and Run:

```bash
# Build image
docker build -t glassadmin:latest .

# Run container
docker run -d -p 80:80 glassadmin:latest
```

---

### Traditional Web Server

**Best for**: Apache, Nginx on VPS

#### Apache (.htaccess):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

#### Nginx Configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/glassadmin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

---

## Environment Variables

### Setting Environment Variables:

1. **Create `.env` file** (for local development):
   ```bash
   cp react-app/.env.example react-app/.env
   ```

2. **For Vercel**:
   - Dashboard → Settings → Environment Variables
   - Add each variable with its value

3. **For Netlify**:
   - Dashboard → Site settings → Environment variables
   - Add each variable

4. **For AWS/Docker**:
   - Set environment variables in your deployment script or Docker run command

### Important Variables:

```bash
# Required
VITE_APP_NAME=GlassAdmin
VITE_APP_VERSION=1.0.0

# Optional (if using APIs)
# VITE_API_BASE_URL=https://api.example.com
```

---

## Post-Deployment

### Verification Checklist:

- [ ] Application loads successfully
- [ ] All routes work (no 404 errors on refresh)
- [ ] Assets load correctly (images, fonts, icons)
- [ ] Theme switching works (Light/Dark)
- [ ] Language switching works (EN/AR)
- [ ] Forms validate correctly
- [ ] No console errors in browser DevTools
- [ ] Mobile responsive design works
- [ ] Performance is acceptable (Lighthouse score > 90)

### Performance Testing:

```bash
# Run Lighthouse audit
npx lighthouse https://your-domain.com --view

# Or use online tools:
# - https://pagespeed.web.dev/
# - https://gtmetrix.com/
# - https://webpagetest.org/
```

### Monitoring:

Consider setting up:
- **Error tracking**: Sentry, Rollbar, or LogRocket
- **Analytics**: Google Analytics, Plausible, or Fathom
- **Uptime monitoring**: UptimeRobot, Pingdom, or StatusCake

---

## Troubleshooting

### Issue: 404 on page refresh

**Solution**: Configure your server to serve `index.html` for all routes (see server configurations above).

### Issue: Blank page after deployment

**Solution**:
1. Check browser console for errors
2. Verify `base` in `vite.config.js` is correct
3. Check if all assets are uploaded
4. Verify environment variables are set

### Issue: Assets not loading

**Solution**:
1. Check if assets are in the `dist` folder
2. Verify correct `base` path in vite.config.js
3. Check CORS headers if loading from CDN

### Issue: Build fails

**Solution**:
1. Run `npm run lint` and fix all errors
2. Check for TypeScript errors (if applicable)
3. Verify all dependencies are installed
4. Check Node.js version (should be 18+)

### Issue: Slow performance

**Solution**:
1. Enable gzip compression
2. Set proper cache headers
3. Use CDN for assets
4. Optimize images
5. Check bundle size with `npm run build -- --stats`

---

## CI/CD Pipeline Example

### GitHub Actions (.github/workflows/deploy.yml):

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd react-app
          npm ci

      - name: Run tests
        run: |
          cd react-app
          npm test

      - name: Run linter
        run: |
          cd react-app
          npm run lint

      - name: Build
        run: |
          cd react-app
          npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: react-app
```

---

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Never commit sensitive data
3. **CSP Headers**: Configure Content Security Policy
4. **CORS**: Set proper CORS headers if using APIs
5. **Dependencies**: Regularly update dependencies (`npm audit`)

---

## Support

For deployment issues:
- Check the [troubleshooting section](#troubleshooting)
- Review the platform-specific documentation
- Open an issue on GitHub

---

**Last Updated**: November 7, 2025
