# GlassAdmin Screenshots

This directory contains screenshots and visual assets for the GlassAdmin project.

## Guidelines for Screenshots

### Required Screenshots

1. **Dashboard Views**
   - Analytics Dashboard (Light & Dark mode)
   - E-commerce Dashboard (Light & Dark mode)
   - Main landing page

2. **User Management**
   - User list page
   - User details page
   - User edit form

3. **Product Management**
   - Product list (Grid view)
   - Product list (Table view)
   - Product details
   - Product form

4. **Orders & Invoices**
   - Orders list
   - Order details
   - Invoices list
   - Invoice details

5. **Authentication**
   - Login page
   - Register page
   - Forgot password page
   - Reset password page

6. **Components Showcase**
   - Components page sections
   - Individual component demos

7. **Settings**
   - Settings page (all tabs)

8. **Responsiveness**
   - Mobile views (375px width)
   - Tablet views (768px width)
   - Desktop views (1920px width)

### Screenshot Specifications

- **Format**: PNG (for transparency) or JPG (for smaller file size)
- **Resolution**:
  - Desktop: 1920x1080 or 2560x1440
  - Tablet: 1024x768
  - Mobile: 375x667
- **File Naming Convention**:
  - `{page-name}-{theme}-{device}.png`
  - Example: `analytics-dashboard-dark-desktop.png`

### Tools for Taking Screenshots

- **Browser DevTools**: Use responsive design mode for different device sizes
- **Browser Extensions**:
  - Full Page Screen Capture (Chrome/Edge)
  - Awesome Screenshot (Chrome/Firefox)
- **Third-party Tools**:
  - Snagit
  - ShareX
  - Flameshot (Linux)

### Best Practices

1. **Clean State**:
   - Use demo data that looks realistic
   - Ensure no Lorem Ipsum unless intentional
   - Remove any development artifacts

2. **Consistency**:
   - Use the same browser
   - Use the same zoom level (100%)
   - Use the same viewport sizes

3. **Quality**:
   - Clear, high-resolution images
   - Proper lighting (for glassmorphic effects)
   - No personal information in screenshots

4. **Organization**:
   - Group by feature/page
   - Include both light and dark mode versions
   - Include mobile and desktop versions where applicable

## Creating a Demo Video

For creating a demo video/GIF:

1. **Tools**:
   - Screen recording: OBS Studio, ScreenToGif, Loom
   - GIF creation: ScreenToGif, Gifox, LICEcap

2. **Content to Show**:
   - Theme switching (Light ↔ Dark)
   - Language switching (English ↔ Arabic)
   - Responsive behavior
   - Navigation and routing
   - Interactive components
   - Form validation
   - Data filtering/searching
   - Animations and transitions

3. **Specifications**:
   - Length: 30-60 seconds for GIF, 2-3 minutes for video
   - Frame rate: 30 FPS minimum
   - Resolution: 1280x720 or 1920x1080
   - Format: MP4 for video, GIF for short demos

## Example File Structure

```
screenshots/
├── README.md (this file)
├── desktop/
│   ├── light/
│   │   ├── analytics-dashboard.png
│   │   ├── ecommerce-dashboard.png
│   │   ├── user-list.png
│   │   └── ...
│   └── dark/
│       ├── analytics-dashboard.png
│       ├── ecommerce-dashboard.png
│       └── ...
├── mobile/
│   ├── light/
│   └── dark/
├── tablet/
│   ├── light/
│   └── dark/
├── features/
│   ├── theme-switching.gif
│   ├── language-switching.gif
│   └── responsive-demo.gif
└── demo/
    └── full-demo.mp4
```

## Contributing Screenshots

When adding new screenshots:

1. Follow the naming conventions above
2. Ensure high quality and proper resolution
3. Update the main README.md to reference new screenshots
4. Compress images if they're over 500KB (use tools like TinyPNG)
5. Include both light and dark mode versions

---

**Note**: Screenshots are not included in the Git repository by default. Consider hosting them externally (GitHub Releases, CDN, etc.) or add them selectively to avoid large repository sizes.
