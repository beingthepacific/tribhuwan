# AI Coding Agent Instructions for Tribhuwan Aadarsha School Website

## Project Overview

A static HTML5/CSS3/vanilla JavaScript school website for Tribhuwan Aadarsha Model Secondary School (Putalibazar-1, Syangja, Nepal). **No build process, no server required** — pure frontend with client-side form validation and DOM manipulation.

**Key Constraint**: Maintain portability — all files must work when opened directly via `file://` or simple HTTP server without build tools.

---

## Architecture & Data Flow

### File Organization
```
root/
├── index.html                    # Home page (hero + quick access cards)
├── config.json                   # Centralized school data (single source of truth)
├── pages/                        # Sub-pages: about.html, academics.html, admissions.html, gallery.html, contact.html
├── assets/
│   ├── css/styles.css           # All styling + CSS variables + animations
│   ├── js/script.js             # All JavaScript functionality (544 lines, no frameworks)
│   ├── js/three-hero.js         # Optional: 3D hero (Three.js, lazy-loaded on index.html)
│   ├── images/                  # Placeholder for school photos
│   ├── documents/               # PDFs (syllabi, admission guides)
│   └── models/                  # Optional: hero.glb (3D model for hero scene)
```

### Data Source Pattern
**`config.json` is the system of record** for school metadata:
- Leadership profiles (principal, vice-principal)
- Academic programs (School Level, +2 Science, +2 Management)
- Contact info, office hours, facilities, scholarships
- Color palette (also as CSS variables for consistency)

When adding new school info, update `config.json` first, then reference it in HTML or JavaScript if needed. This avoids duplication.

### Key Data Flows
1. **Navigation**: All pages link relatively (e.g., `pages/about.html` from root, `../assets/css/styles.css` from pages/)
2. **Forms**: Contact and Admission forms submit client-side only (simulate 1.5s delay, show success notification, reset form)
3. **Gallery**: Image filtering via `data-category` attributes; modal opens on click
4. **3D Hero** (index.html only): Lazy-loaded `three-hero.js` checks device capability, respects `prefers-reduced-motion`, reads CSS variables for colors

---

## Code Patterns & Conventions

### CSS Architecture
- **CSS Variables** (`:root`): All colors, spacing, transitions, shadows defined once
  - Primary: `--primary-color: #0b63a6` (trust blue, used for headers, buttons)
  - Secondary: `--secondary-color: #f6b042` (gold accent for CTAs)
  - Spacing: `--spacing-sm`, `--spacing-md`, `--spacing-lg`, etc.
- **Mobile-first breakpoints**: Base styles for mobile, then `@media (min-width: 768px)` for tablet+, `@media (min-width: 1400px)` for desktop
- **Animations**: Pre-defined keyframes (`fadeIn`, `slideInUp`, `slideInRight`, `float`, `bounce`) applied via `animation` property, respecting `prefers-reduced-motion`
- **Grid/Flexbox**: Use `.container` (max-width 1400px) for layout, `.grid` for multi-column cards
- **Component classes**: `.btn`, `.card`, `.form-group`, `.section` reused across pages

### JavaScript Patterns
- **No frameworks**: Vanilla JS only. Use `document.querySelector()`, `addEventListener()`, `IntersectionObserver`
- **Scroll animations**: `IntersectionObserver` triggers fade-in when elements enter viewport
- **Form validation**: Email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, phone basic check `^\+?[\d\s\-()]+$`
- **DOM manipulation**: Functions like `setActiveNav()` update active class on navigation based on current page
- **Notifications**: Helper `showNotification(message, type)` creates temporary toast messages (success/error)
- **Hamburger menu**: Toggle class on `.nav-menu` when hamburger button clicked; `display: none` on mobile via CSS

### HTML Structure
- **Semantic HTML5**: Use `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`, proper heading hierarchy
- **Accessibility**: `aria-label` on icons/buttons, `<label>` tags in forms, `role` attributes where needed
- **Meta tags**: Viewport, charset, description, keywords on each page
- **Comments**: Section dividers like `<!-- ==================== HERO SECTION ==================== -->` for readability

---

## Critical Developer Workflows

### Adding a New Page
1. Create `pages/new-page.html` with same header/nav/footer structure as existing pages
2. Update nav menu in header with new link (relative path `pages/new-page.html`)
3. Ensure CSS link: `<link rel="stylesheet" href="../assets/css/styles.css">`
4. JS link: `<script src="../assets/js/script.js"></script>`
5. Add page title to `<title>` tag (include "Tribhuwan Aadarsha Model Secondary School -" prefix)

### Updating School Information
1. **First**: Edit `config.json` with new data (contact, programs, leadership, etc.)
2. **Then**: If HTML hardcodes this info, find and replace it (e.g., principal name in `pages/about.html`)
3. **Avoid duplication**: Don't repeat config data in multiple HTML files

### Adding Form Fields
1. Add `<input>` or `<select>` inside `.form-group` div
2. Add validation rule in `script.js` form validation section (e.g., email check)
3. Add error message display (optional: use `data-error` attribute)
4. Test form submission in browser console for errors

### Testing Responsive Design
1. **Browser DevTools**: Press F12, then Ctrl+Shift+M for Device Toolbar
2. **Manual resize**: Drag browser window to test breakpoints (768px, 1400px)
3. **Mobile emulation**: Test hamburger menu, touch interactions, font sizes
4. **Reduced motion**: In DevTools, search "prefers-reduced-motion" in settings to test accessibility

### Customizing Colors
1. Open `assets/css/styles.css`, find `:root` section (lines 6–17)
2. Update hex values (e.g., `--primary-color: #0b63a6`)
3. **All pages automatically update** (colors cascade from CSS variables)
4. For consistency, also update `config.json` `colors` object

---

## Project-Specific Patterns

### Color Psychology Integration
- **Primary Blue** (#0b63a6): Trust, clarity, authority — used for headers, buttons, links
- **Gold Accent** (#f6b042): Warmth, optimism, CTA emphasis — used for buttons, highlights
- **Soft Neutral** (#f4f8fb): Calm, readable backgrounds
- **Why**: Chosen for school/education context to signal trustworthiness and professionalism

### Lazy-Loading & Performance
- **3D Hero**: Only loaded on `index.html`, uses `setTimeout` + feature detection (check device capability)
- **Intersection Observer**: Images fade in as user scrolls (scroll-triggered animations)
- **No external dependencies** except Google Fonts (ensure HTTPS for production)

### Form Handling (Client-Side Only)
- **No backend**: Forms simulate submission with `setTimeout(1500)`
- **Validation**: Email, phone, required fields checked before "submission"
- **User feedback**: Success/error toast notifications, form reset on success
- **To enable real submission**: Replace `setTimeout` with `fetch('/api/endpoint', {...})` and add CORS headers

### Modal Gallery
- **Trigger**: Click image in gallery → modal opens with `display: flex`
- **Close**: Click X button or outside modal (click-outside handler in JS)
- **Filtering**: Click category button → show only images with matching `data-category`

---

## Cross-File Dependencies & Integration Points

| File | Dependencies | Provides |
|------|---|---|
| `index.html` | `assets/css/styles.css`, `assets/js/script.js`, `assets/js/three-hero.js` (optional) | Home page with 3D hero, quick access cards |
| `pages/*.html` | `../assets/css/styles.css`, `../assets/js/script.js`, `config.json` (data reference) | Subject-specific content pages |
| `styles.css` | CSS variables only; Google Fonts CDN | Applied to all HTML pages |
| `script.js` | `config.json` (optional data reads); DOM elements from all pages | Navigation, forms, gallery, scroll animations |
| `config.json` | No dependencies | Reference data for school info (not auto-loaded; for manual lookup) |
| `three-hero.js` | Three.js CDN (GLTFLoader optional); `config.json` colors; `styles.css` variables | 3D scene on index.html hero section |

---

## Editing Patterns & Common Tasks

### Fix Broken Links
- From root page: `<a href="pages/about.html">` ✅
- From pages folder: `<a href="../assets/css/styles.css">` ✅
- Test: Open page in browser, click links, check console for 404s

### Update Navigation
1. Edit header nav list in `index.html`
2. **Copy identical header to all pages in `pages/` folder** (or keep consistent structure)
3. Script auto-highlights active page based on current URL

### Add New Quick Access Card (Home Page)
1. Find `.quick-access` section in `index.html`
2. Duplicate a `.card` div, update icon, title, description
3. Add `data-link` attribute if it should navigate: `data-link="pages/admissions.html"`

### Create New Gallery Section
1. In `pages/gallery.html`, duplicate a gallery grid section
2. Add images with `data-category="category-name"`
3. Add filter button with `data-filter="category-name"`
4. JavaScript auto-wires filtering (no new code needed)

---

## When Adding Features

- **Animations**: Add keyframe to CSS, apply via class (respect `prefers-reduced-motion`)
- **New form**: Use same validation pattern as Contact/Admission forms
- **New API endpoint** (future): Create `fetch()` wrapper in `script.js`, handle errors gracefully
- **New component**: Define `.component-name` in CSS with mobile-first approach, add JS handlers if interactive
- **Performance concern**: Check DevTools Performance tab, avoid layout thrashing, batch DOM reads/writes

---

## Quick Reference: File Sizes & Limits

| File | Size | Lines | Status |
|------|------|-------|--------|
| `styles.css` | ~19.78 KB | 1,435 | Comprehensive; few new additions needed |
| `script.js` | ~10.62 KB | 544 | Feature-complete for current scope |
| `index.html` | ~15.23 KB | 404 | Home page (hero, cards, announcements, map) |
| Each page | ~14–20 KB | 300–400 | Content-heavy but maintainable |

**Recommendation**: If adding substantial new functionality, consider splitting `script.js` into modules (e.g., `gallery.js`, `forms.js`) for better maintainability — but **ensure they're still loaded without a build process** (via `<script>` tags).

---

## Git & Deployment Considerations

- **No build step**: Deploy entire folder as-is to static hosting (Netlify, Vercel, GitHub Pages, S3)
- **Folder structure must be preserved**: If hosting in subdirectory, update relative paths
- **config.json**: Keep in root; optional—currently not auto-loaded, used as reference doc
- **Security**: Forms are client-side only; no sensitive data processed. For production, add backend validation + HTTPS

---

## Summary of "How We Build Here"

1. **CSS first**: Define variables, animations, responsive breakpoints in `styles.css`
2. **HTML structure**: Semantic, accessible, progressive enhancement
3. **JavaScript enhancement**: Vanilla JS, IntersectionObserver for animations, form validation on submit
4. **Data centralization**: `config.json` for school info to avoid duplication
5. **Mobile-first**: Base styles for mobile, enhance for larger screens
6. **No dependencies**: Except Google Fonts; no NPM, Webpack, or frameworks
7. **Accessibility**: ARIA labels, proper heading hierarchy, color contrast
8. **Performance**: Lazy-load 3D scene, Intersection Observer for scroll animations, minimal reflow

This approach prioritizes **simplicity, portability, and maintainability** over architectural complexity.
