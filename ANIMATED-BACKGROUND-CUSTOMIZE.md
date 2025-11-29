Animated Background — quick customization guide

Files:
- assets/css/animated-background.css  — All styles for gradient/waves/orbs/particles/noise/beams
- assets/js/animated-background.js   — Particle system, parallax and run-time helpers

Quick goals covered:
- Smooth, colorful animated gradient (8+ color cycles)
- Multi-layer motion waves with parallax speeds
- Floating orbs with blur/soft glow
- Particles with slow float and color trails
- Parallax layers react to scroll + mouse
- Noise texture overlay and subtle film-grain
- Soft diagonal light beams / cinematic shine
- Smooth page transitions via .page-transition

How to tweak colors
-------------------
1) Gradient (global background)
Open `assets/css/animated-background.css` and edit the `.animated-gradient-bg` color stops near the top.
Example:
  background: linear-gradient(-45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e);

Pick 6–12 hex colors. Keep high saturation for neon pops and include softer pastel stops for balance.

2) Orbs (soft ambient glow)
Edit `.orb-1`, `.orb-2`, `.orb-3`, etc. in `animated-background.css` and replace the radial-gradient colors.
Colors accept transparency (use `XX` hex suffix for alpha or rgba).

3) Particles (color palette)
Edit `assets/js/animated-background.js` - `this.colors` array contains class names `color-1`..`color-6` which map to `.particle.color-*` in the CSS. Update the hex values inside `animated-background.css` under the .particle.color-* rules.

Change speeds and motion
-----------------------
1) Global speed multiplier
Call `animatedBG.changeAnimationSpeed(n)` from console (n: 0.5 = half speed, 2 = double speed). Example in browser console:

  animatedBG.changeAnimationSpeed(0.75);

2) Per-element speed in CSS
Change animation-duration values for the `@keyframes` usage (e.g., `animation-duration: 20s;` for `.orb-1`). Smaller values = faster motion.

3) Particle behavior
- New particle count: `animatedBG.setParticleCount(40)`
- Particle drift / randomness is controlled inside `animated-background.js`.

Parallax & interactivity
------------------------
- Mouse-based parallax is enabled by default. Move the cursor to get subtle depth shifts.
- Scroll-based parallax is active as well; elements respond to `window.scrollY`.
- To temporarily disable both in production, comment out `this.setupMouseTracking()` in the `AnimatedBackgroundSystem` constructor.

Accessibility & performance
---------------------------
- Respects `prefers-reduced-motion` media query and disables animations in that mode.
- Particle count is intentionally limited for mobile to reduce CPU load (`<= 50` desktop, `<= 25` mobile by default).
- If you observe stutter on low-end devices, reduce particle count, increase animation durations, or change `filter: blur()` to smaller values.

Page transitions
----------------
- The `.page-transition` overlay is present in `index.html`. Add logic to show/hide it when navigating SPA routes or between pages.
Example show/hide snippet (vanilla):

  const overlay = document.querySelector('.page-transition');
  overlay.style.opacity = '1';
  // wait 600ms then navigate

Customization examples
----------------------
// set new gradient colors
animatedBG.changeGradientColor(['#00f7ff', '#7f00ff', '#ff00c7', '#ffd166']);

// make animations slower globally
animatedBG.changeAnimationSpeed(1.6);

// reduce particle count
animatedBG.setParticleCount(20);

Notes
-----
- All effects are implemented with GPU-friendly transforms & opacity changes.
- For production, combine and minify CSS/JS and convert images to WebP for best Lighthouse scores.
- If you want GSAP-style timelines added, I can integrate a small timeline helper but I kept code dependency-free as requested.

If you want, I can now:
- Reduce intensity to make it more subtle
- Provide sample color palettes (neon-soft, cinematic, sunset)
- Add a small UI to toggle features (particles/orbs/waves) at runtime

