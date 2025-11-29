# Tribhuwan Aadarsha Model Secondary School - Website

A modern, fully functional school website built with HTML5, CSS3, and vanilla JavaScript. Designed with CRPUSD (Cotati Rohnert Park Unified School District) aesthetics and best practices.

## 📋 Project Overview

This website is a comprehensive digital platform for Tribhuwan Aadarsha Model Secondary School located in Putalibazar-1, Syangja, Nepal. The site showcases school information, academics, admissions, gallery, and contact details with a modern, professional design.

### 🎯 Key Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, minimalistic design inspired by CRPUSD
- **Quick Access Dashboard**: Fast-access resource cards on homepage
- **Functional Forms**: Working admission and contact forms with validation
- **Interactive Gallery**: Photo gallery with category filtering
- **Google Maps Integration**: Location mapping for easy navigation
- **Smooth Animations**: Professional fade and slide animations
- **Accessibility**: WCAG compliant with proper semantic HTML
- **Performance Optimized**: Fast-loading with optimized assets

## 📁 Project Structure

```
school-website/
├── index.html                      # Home page
├── pages/
│   ├── about.html                 # About Us page
│   ├── academics.html             # Academic Programs page
│   ├── admissions.html            # Admissions page
│   ├── gallery.html               # Photo Gallery page
│   └── contact.html               # Contact page
├── assets/
│   ├── css/
│   │   └── styles.css             # Main stylesheet
│   ├── js/
│   │   └── script.js              # Main JavaScript file
│   ├── images/                    # Placeholder for images
│   └── documents/                 # Placeholder for PDFs/documents
└── README.md                      # This file
```

## 🎨 Design Features

### Color Palette
- **Primary Blue**: #0b63a6 (Trustworthy / confident blue)
- **Light Blue**: #2e8bc0
- **Dark Blue**: #06314a
- **Secondary Gold**: #f6b042 (Warmth and optimism)
- **Accent Light**: #f4f8fb

## New features: 3D visuals & color psychology

- A lightweight, GPU-friendly 3D hero scene was added to the home page (index.html) using Three.js. It is lazy-loaded and built to be performant on low-power devices. Canvas is intentionally transparent so the existing hero CSS gradient integrates with the scene.

Tethered controls & models
- The home page now includes a small control panel (bottom-right of the hero) with three toggles:
	• 3D — enable/disable the hero 3D scene (lazy-loads `assets/js/three-hero.js` if needed). The scene will adapt to your device (reduced particles on low-power / reduced-motion settings).
	• Dark — toggle site-wide dark theme (saves choice in localStorage).
	• Present — presentation mode: hides header/footer and makes the hero full-screen for exhibition / demo use. This also requests browser fullscreen.

glTF model support
- The 3D hero tries to load an optional model at `assets/models/hero.glb` (if present). If you have a glTF/GLB file you want to show, drop it there and the hero will use it automatically.

Performance tuning & accessibility
- Visuals respect `prefers-reduced-motion` and avoid heavy animations for low-power devices. 3D is lazy-loaded and can be toggled off for best battery/performance during the presentation.

- Color palette updated using color psychology principles: a trust-building blue (#0b63a6) as the primary color, a warm gold accent (#f6b042) for CTAs and highlights, and a very soft neutral background (#f4f8fb) to provide calm, readable layouts. The new color variables are used consistently across the site.

### Typography
- Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Heading Weight: 600-700 (Semi-bold to Bold)
- Body Weight: 400 (Regular)

### Responsive Breakpoints
- Desktop: 1400px+
- Tablet: 768px - 1399px
- Mobile: 320px - 767px

## 🚀 Getting Started

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. No server or build process required - it runs locally!

### File Setup
- Place all files in a single directory
- Maintain the folder structure as shown above
- Ensure `assets/` folder is at the same level as `pages/` folder

## 📄 Page Descriptions

### Home Page (index.html)
- Hero banner with school name and tagline
- Quick access resource cards
- Latest announcements and events ticker
- About school preview
- Academic programs showcase
- School leadership profiles
- Interactive map section

### About Us (pages/about.html)
- School history and milestones
- Mission, Vision, and Core Values
- Principal's message
- Administration team profiles
- Facilities and achievements

### Academics (pages/academics.html)
- Curriculum overview
- Academic programs (School Level, +2 Science, +2 Management)
- Teaching methodology
- Downloadable syllabi and resources
- Academic calendar

### Admissions (pages/admissions.html)
- Eligibility criteria
- Step-by-step admission process
- Required documents checklist
- Fully functional online admission form
- Fee structure and scholarship information

### Gallery (pages/gallery.html)
- Categorized photo gallery (Events, Achievements, Sports, Facilities)
- Gallery filtering functionality
- Year-wise photo albums
- Video gallery section

### Contact (pages/contact.html)
- Contact information cards
- Office hours and department contacts
- Google Maps embed with location
- Functional contact form
- FAQ accordion section

## 💻 Technical Features

### JavaScript Functionality
- Hamburger menu toggle for mobile
- Navigation highlighting
- Form validation and submission handling
- Gallery filtering and modal viewing
- Smooth scroll behavior
- Intersection Observer for scroll animations
- FAQ accordion functionality

### CSS Features
- CSS Grid and Flexbox layouts
- CSS animations and transitions
- CSS variables for easy customization
- Mobile-first responsive design
- Gradient backgrounds
- Box shadows and hover effects

### HTML Features
- Semantic HTML5 structure
- Proper heading hierarchy
- Accessible form labels
- ARIA attributes where needed
- Meta tags for SEO

## 🔧 Customization Guide

### Changing School Name
1. Open each HTML file
2. Replace "Tribhuwan Aadarsha Model Secondary School" with your school name
3. Update contact details in header and footer

### Changing Colors
1. Open `assets/css/styles.css`
2. Update CSS variables in `:root` section
3. All colors will update throughout the site

### Changing Contact Information
1. Update phone numbers in header-top and footer
2. Update email addresses throughout pages
3. Update office hours as needed

### Adding Images
1. Place images in `assets/images/` folder
2. Replace placeholder background colors with image URLs
3. Update image alt text for accessibility

### Adding Documents
1. Place PDFs in `assets/documents/` folder
2. Update download links in relevant pages
3. Change link hrefs to point to document paths

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 School Information

**School Name**: Tribhuwan Aadarsha Model Secondary School
**Location**: Putalibazar-1, Syangja, Nepal
**Principal**: Prem Narayan Paudel
**Vice-Principal**: Bishnu Pokhrel
**Contact**: +977-74-550-123
**Email**: info@tribhuwan-school.edu.np

## 📝 Form Features

### Admission Form
- Personal information section
- Contact information section
- Academic information section
- Parent/Guardian details
- Additional information fields
- Form validation with error messages
- Success notification after submission

### Contact Form
- Name and email validation
- Subject selection dropdown
- Message textarea
- Consent checkbox
- Success notification system

## 🎯 Best Practices Implemented

- Responsive mobile-first design
- Semantic HTML structure
- CSS variables for maintainability
- Organized file structure
- Clear code comments
- Form validation and user feedback
- Accessibility considerations
- Performance optimization
- Cross-browser compatibility

## 🔒 Security Notes

- Contact forms simulate submission (no backend)
- In production, implement server-side validation
- Add CSRF protection for actual forms
- Use HTTPS for sensitive data
- Implement proper email verification

## 📈 Future Enhancements

- Backend integration for form submissions
- Student login portal
- Online fee payment system
- News blog section
- Mobile app
- Multi-language support
- Dark mode option
- Advanced search functionality

## 📄 License

This website template is provided for educational purposes. Customize as needed for your institution.

## 👨‍💼 Contact & Support

For modifications or support, contact the IT department or the school administration.

---

**Created**: November 2025
**Version**: 1.0
**Last Updated**: November 28, 2025

---

*This website was created as an educational project for demonstration purposes.*
