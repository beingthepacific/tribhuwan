# Tribhuwan Aadarsha School Website - Developer Documentation

## 📚 Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Key Features](#key-features)
4. [Customization Guide](#customization-guide)
5. [Code Structure](#code-structure)
6. [Form Handling](#form-handling)
7. [Responsive Design](#responsive-design)
8. [Performance Optimization](#performance-optimization)
9. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Website Name**: Tribhuwan Aadarsha Model Secondary School
**Location**: Putalibazar-1, Syangja, Nepal
**Design Inspiration**: Cotati Rohnert Park Unified School District (CRPUSD)
**Technology Stack**: HTML5, CSS3, Vanilla JavaScript
**Hosting**: Static files (no server required)

### Design Philosophy
- Clean and minimalistic interface
- Professional appearance with soft colors
- Smooth animations and transitions
- Mobile-first responsive approach
- Accessibility-focused implementation

---

## File Structure

```
school-website/
├── index.html                    # Home page
├── pages/                        # Sub-pages directory
│   ├── about.html               # About page
│   ├── academics.html           # Academics page
│   ├── admissions.html          # Admissions page
│   ├── gallery.html             # Gallery page
│   └── contact.html             # Contact page
├── assets/                       # All assets
│   ├── css/
│   │   └── styles.css           # Main stylesheet (1200+ lines)
│   ├── js/
│   │   └── script.js            # Main JavaScript file
│   ├── images/                  # Image placeholders
│   └── documents/               # PDF documents
├── config.json                  # Configuration file
├── README.md                    # Main documentation
└── DEVELOPER.md                 # This file
```

### File Sizes
- `styles.css`: ~1200 lines (Full styling with animations)
- `script.js`: ~300 lines (All JavaScript functionality)
- `index.html`: ~250 lines
- Each page: ~300-400 lines

---

## Key Features

### 1. Header & Navigation
- Fixed sticky header that stays at top while scrolling
- Top info bar with contact details
- Responsive hamburger menu for mobile
- Active page highlighting
- Smooth navigation transitions

### 2. Hero Section
- Full-width banner with gradient background
- Animated background elements
- Call-to-action buttons
- Mobile-responsive sizing

### 3. Quick Access Section
- 6 icon-based quick access cards
- Hover animations and transitions
- Clickable cards with data-link attributes
- Responsive grid layout

### 4. Forms
Two functional forms implemented:
- **Contact Form**: Name, Email, Subject, Message
- **Admission Form**: Comprehensive form with validation

Features:
- Client-side validation
- Success/error notifications
- Real-time feedback
- Accessibility labels

### 5. Gallery
- Categorized photo gallery (Events, Achievements, Sports, Facilities)
- Filter functionality
- Hover overlays
- Modal viewing for images
- Responsive masonry grid

### 6. Footer
- Multi-column footer layout
- Quick links section
- Contact information
- Social media links
- Copyright information

### 7. Map Integration
- Google Maps embedded iframe
- Location information card
- Directions guide
- Accessibility note

---

## Customization Guide

### 1. School Information

**Location**: Throughout all HTML files

```html
<!-- Header contact -->
<span>📞 +977-74-550-123</span>

<!-- Logo section -->
<div>Tribhuwan Aadarsha</div>
<div>Model School</div>

<!-- Footer -->
<p>© 2025 Tribhuwan Aadarsha Model Secondary School</p>
```

**To Change**:
1. Search and replace school name in all files
2. Update phone numbers in header and footer
3. Update email addresses throughout
4. Change office hours as needed

### 2. Colors

**Location**: `assets/css/styles.css` (Lines 6-17)

```css
:root {
  --primary-color: #0b63a6;      /* Main blue - trust & clarity */
  --secondary-color: #f6b042;    /* Gold accent - warmth & optimism */

3D HERO (three-hero.js)
-----------------------
- The home page now includes a lightweight 3D hero built with Three.js. It's lazy-loaded only on the home page to avoid extra overhead for inner pages.
- The scene is intentionally low-poly and optimized: dynamic particle count and pixel ratio adapt depending on device capability and the user's 'prefers-reduced-motion' setting.
- The 3D script reads colors from CSS variables to keep the visuals consistent with the global theme. It also pauses rendering while the tab is hidden to save CPU/battery.

glTF / Model support
--------------------
- To display a custom 3D model in the hero, drop a `hero.glb` file into `assets/models/hero.glb`.
- The script checks if `assets/models/hero.glb` is present and attempts to load with the GLTFLoader (fetched from the Three.js examples CDN if not available locally). Keep models simple (low-poly) and under ~2-4 MB for best performance in-browser.

Developer notes
---------------
- If you want to bundle Three.js and GLTFLoader locally (avoid CDN), copy `three.min.js` and `GLTFLoader.js` into `assets/js/` and update `three-hero.js` loader path accordingly.
- When testing locally, prefer a quick HTTP server (python -m http.server) — some browsers have stricter fetch/HEAD limitations when opened via file://

COLOR PSYCHOLOGY
-----------------
- Palette decisions are based on readability, trust signaling and emotional tone:
  • Trust & Authority - Primary blue: #0b63a6
  • Warmth & Optimism - Accent gold: #f6b042
  • Supportive accents - Lighter blues or soft neutrals for calm backgrounds and surfaces

These values are exposed as CSS variables in `assets/css/styles.css` and in `config.json` for easy customization.
  /* ... more colors ... */
}
```

**To Change**:
1. Open `styles.css`
2. Modify hex color values in `:root` selector
3. All elements using these colors will update automatically

### 3. Images

**Default**: Placeholder backgrounds with emojis

**To Add Images**:
1. Create folder: `assets/images/`
2. Add your images there
3. Update HTML to use image paths

Example:
```html
<!-- Replace this -->
<div style="background: linear-gradient(...); display: flex;...">🏫</div>

<!-- With this -->
<img src="../assets/images/school-building.jpg" alt="School Building">
```

### 4. Documents (PDFs)

**Location**: `assets/documents/`

**To Add**:
1. Place PDF files in documents folder
2. Update download links in `academics.html`

Example:
```html
<a href="../assets/documents/syllabus.pdf" class="btn">📥 Download PDF</a>
```

### 5. Contact Information

**Config File**: `config.json` - Update these fields:
```json
{
  "contact": {
    "phone": "+977-74-550-123",
    "email": "info@tribhuwan-school.edu.np",
    "address": "Putalibazar-1, Syangja, Nepal"
  }
}
```

### 6. Google Maps

**Location**: `index.html` and `contact.html`

**To Update**:
1. Go to Google Maps
2. Create your location embed code
3. Replace the `<iframe>` src attribute

```html
<iframe src="YOUR_NEW_EMBED_CODE"></iframe>
```

---

## Code Structure

### CSS Architecture

**File**: `assets/css/styles.css`

**Organization**:
1. CSS Variables (`:root`)
2. Reset & Base Styles
3. Typography
4. Header & Navigation
5. Hero Section
6. Quick Access
7. Buttons
8. Containers & Grids
9. Cards
10. Forms
11. Footer
12. Utilities
13. Responsive Media Queries

**Key Classes**:
- `.container` - Max-width wrapper (1400px)
- `.section` - Content sections with padding
- `.card` - Reusable card component
- `.btn` - Button styles (multiple variants)
- `.grid` - CSS Grid layouts
- `.form-group` - Form field containers

### JavaScript Structure

**File**: `assets/js/script.js`

**Sections**:
1. DOM Element Selection
2. Navigation Functions
3. Active Navigation Highlighting
4. Scroll Animations
5. Form Handling (Contact & Admission)
6. Utility Functions
7. Gallery Modal
8. Smooth Scroll
9. Quick Access Cards
10. Accessibility Features
11. Performance Optimization

**Key Functions**:
- `setActiveNav()` - Highlights current page
- `showNotification()` - Display success/error messages
- `initGallery()` - Initialize gallery functionality
- Form validation functions

---

## Form Handling

### Contact Form

**HTML ID**: `contact-form`
**Fields**: Name, Email, Phone, Subject, Message

**Validation**:
- Email format check
- Required field validation
- Phone number format

**Submission**:
- Simulated 1.5s delay
- Success notification
- Form reset after submission

### Admission Form

**HTML ID**: `admission-form`
**Sections**:
1. Personal Information
2. Contact Information
3. Academic Information
4. Parent/Guardian Information
5. Additional Information

**Validation**:
- All required fields checked
- Email validation
- Phone validation
- Checkbox agreement required

**Submission**:
- Simulated processing
- Success message
- Form reset

### Adding Backend Integration

To use actual form submission:

```javascript
// Replace this in script.js
fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  showNotification('Form submitted successfully!', 'success');
})
.catch(error => {
  showNotification('An error occurred. Please try again.', 'error');
});
```

---

## Responsive Design

### Breakpoints

```css
@media (max-width: 768px)  /* Tablet and down */
@media (max-width: 480px)  /* Mobile */
```

### Mobile Optimizations
1. Hamburger menu instead of full navigation
2. Single-column layouts
3. Smaller font sizes
4. Touch-friendly button sizes
5. Reduced padding and spacing
6. Optimized image sizes

### Testing Responsive Design
1. Open DevTools (F12)
2. Click Device Toolbar (Ctrl+Shift+M)
3. Test at various screen sizes
4. Check touch interactions

---

## Performance Optimization

### Current Optimizations
1. **Lazy Loading**: Images with `data-src` attribute
2. **CSS Variables**: Reduced repetition
3. **Minimal External Dependencies**: Only Google Fonts
4. **Optimized Animations**: Using CSS transforms
5. **Intersection Observer**: Scroll-based image loading

### Further Optimization Options
1. Minify CSS and JavaScript
2. Use WebP image format
3. Implement image compression
4. Enable gzip compression
5. Add service workers for caching
6. Consider CDN for assets

---

## Troubleshooting

### Common Issues

#### 1. Images Not Loading
**Symptom**: Placeholder backgrounds show instead of images
**Solution**: 
- Check image file paths
- Ensure images are in `assets/images/`
- Verify file extensions (.jpg, .png, etc.)
- Check browser console for 404 errors

#### 2. Navigation Links Broken
**Symptom**: Links to other pages don't work
**Solution**:
- Verify file paths in `href` attributes
- For pages folder: use `pages/page-name.html`
- For assets in pages: use `../assets/...`

#### 3. Forms Not Submitting
**Symptom**: Submit button doesn't work
**Solution**:
- Check browser console for JavaScript errors
- Verify form has `class="contact-form"` or `class="admission-form"`
- Ensure all required fields are filled
- Check form validation rules

#### 4. Styles Not Applied
**Symptom**: Page looks unstyled
**Solution**:
- Check CSS file link: `<link rel="stylesheet" href="assets/css/styles.css">`
- Verify styles.css exists in correct location
- Clear browser cache (Ctrl+F5)
- Check browser console for CSS errors

#### 5. Mobile Menu Not Working
**Symptom**: Hamburger menu doesn't toggle on mobile
**Solution**:
- Check viewport meta tag exists
- Verify hamburger button HTML structure
- Check JavaScript console for errors
- Test at actual mobile width (< 768px)

#### 6. Google Maps Not Embedding
**Symptom**: Map shows blank area
**Solution**:
- Verify iframe embed code is correct
- Check for CORS issues
- Allow maps in browser security settings
- Try different embed URL

### Debug Mode

Enable console logging:

```javascript
// In script.js, uncomment:
console.log('Navigation updated');
console.log('Form submitted:', data);
console.log('Gallery initialized');
```

---

## Browser Compatibility

### Tested On
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 8+)

### Known Limitations
- CSS Grid has limited support in IE11
- Modern animations may not work in older browsers
- Requires ES6 JavaScript support

---

## Deployment

### Local Testing
1. Simply open `index.html` in a browser
2. No server required

### Web Hosting
1. Upload all files to hosting provider
2. Maintain folder structure
3. Set index.html as default page
4. Ensure .htaccess configured for routing (if needed)

### Platform Recommendations
- **Shared Hosting**: Any provider with FTP
- **Cloud**: AWS S3, Google Cloud Storage, Azure Blob
- **CDN**: Cloudflare, AWS CloudFront

---

## Future Enhancements

1. **Backend Integration**
   - Form submission to database
   - Email notifications

2. **Features**
   - Student portal with login
   - Online fee payment
   - Blog/News section
   - Multi-language support

3. **Performance**
   - Build tool setup
   - Minification
   - Caching strategy

4. **Analytics**
   - Google Analytics integration
   - User behavior tracking

5. **SEO**
   - Meta tags optimization
   - Sitemap generation
   - Robots.txt

---

## Support & Maintenance

### Regular Maintenance Tasks
- Monthly content updates
- Check for broken links
- Update contact information
- Refresh gallery images
- Monitor form submissions

### Security Updates
- Keep browser compatibility in mind
- Update dependencies (Google Fonts, etc.)
- Validate all user inputs
- Implement HTTPS

### Backup Strategy
- Backup all files regularly
- Version control using Git
- Document configuration changes

---

## Contact Information

**School**: Tribhuwan Aadarsha Model Secondary School
**Email**: info@tribhuwan-school.edu.np
**Phone**: +977-74-550-123
**Location**: Putalibazar-1, Syangja, Nepal

---

**Last Updated**: November 28, 2025
**Version**: 1.0
**Created By**: IT Department

---

*This documentation is provided to help developers maintain and extend the school website.*
