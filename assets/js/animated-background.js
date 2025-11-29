/* ==================== ANIMATED BACKGROUND SYSTEM - JAVASCRIPT ==================== */
/* Handles: Particle generation, mouse parallax, color animation */

class AnimatedBackgroundSystem {
  constructor() {
    this.particleContainer = null;
    this.particles = [];
    this.particleCount = window.innerWidth > 768 ? 50 : 25; // Fewer particles on mobile
    this.colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6'];
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.parallaxElements = [];
    
    this.init();
  }

  init() {
    this.createParticleContainer();
    this.generateParticles();
    this.setupMouseTracking();
    this.setupParallaxElements();
    this.handleResize();
  }

  /* ==================== 1. PARTICLE GENERATION & ANIMATION ==================== */
  createParticleContainer() {
    this.particleContainer = document.querySelector('.particle-container');
    if (!this.particleContainer) {
      console.warn('Particle container not found');
    }
  }

  generateParticles() {
    if (!this.particleContainer) return;

    // Clear existing particles
    this.particleContainer.innerHTML = '';
    this.particles = [];

    for (let i = 0; i < this.particleCount; i++) {
      const particle = this.createParticle();
      this.particleContainer.appendChild(particle);
      this.particles.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1 - 0.5, // bias toward upward movement
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10
      });
    }

    this.animateParticles();
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = `particle ${this.colors[Math.floor(Math.random() * this.colors.length)]}`;
    
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    return particle;
  }

  animateParticles() {
    this.particles.forEach((p, index) => {
      const tx = (Math.random() - 0.5) * 200;
      const ty = -200 - Math.random() * 200;
      const duration = p.duration;

      p.element.style.setProperty('--tx', tx + 'px');
      p.element.style.setProperty('--ty', ty + 'px');
      p.element.style.animation = `particleFloat ${duration}s ease-out forwards`;
      p.element.style.animationDelay = (Math.random() * 5) + 's';

      // Regenerate particle after animation completes
      setTimeout(() => {
        this.regenerateParticle(p, index);
      }, (duration + 5) * 1000);
    });
  }

  regenerateParticle(p, index) {
    if (!this.particleContainer || !this.particleContainer.contains(p.element)) return;

    p.element.style.left = Math.random() * 100 + '%';
    p.element.style.top = Math.random() * 100 + '%';
    p.element.className = `particle ${this.colors[Math.floor(Math.random() * this.colors.length)]}`;
    
    const tx = (Math.random() - 0.5) * 200;
    const ty = -200 - Math.random() * 200;
    const newDuration = Math.random() * 15 + 10;

    p.duration = newDuration;
    p.element.style.setProperty('--tx', tx + 'px');
    p.element.style.setProperty('--ty', ty + 'px');
    p.element.style.animation = `particleFloat ${newDuration}s ease-out forwards`;
    p.element.style.animationDelay = (Math.random() * 5) + 's';

    // Schedule next regeneration
    setTimeout(() => {
      this.regenerateParticle(p, index);
    }, (newDuration + 5) * 1000);
  }

  /* ==================== 2. MOUSE TRACKING FOR PARALLAX ==================== */
  setupMouseTracking() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.updateParallaxWithMouse();
    });

    // Scroll-based parallax
    window.addEventListener('scroll', () => {
      this.updateParallaxWithScroll();
    });
  }

  updateParallaxWithMouse() {
    const xPercent = (this.mouseX / window.innerWidth - 0.5) * 2;
    const yPercent = (this.mouseY / window.innerHeight - 0.5) * 2;

    this.parallaxElements.forEach((el, index) => {
      const depth = (index + 1) * 10;
      const x = xPercent * depth;
      const y = yPercent * depth;

      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  updateParallaxWithScroll() {
    const scrollY = window.scrollY;

    this.parallaxElements.forEach((el, index) => {
      const depth = (index + 1) * 0.5;
      const y = scrollY * depth;

      el.style.transform = `translateY(${y}px)`;
    });
  }

  setupParallaxElements() {
    this.parallaxElements = document.querySelectorAll('.parallax-layer');
  }

  /* ==================== 3. RESPONSIVE HANDLING ==================== */
  handleResize() {
    window.addEventListener('resize', () => {
      // Regenerate particles on resize
      const newCount = window.innerWidth > 768 ? 50 : 25;
      if (newCount !== this.particleCount) {
        this.particleCount = newCount;
        this.generateParticles();
      }
    });
  }

  /* ==================== 4. COLOR CUSTOMIZATION ==================== */
  changeGradientColor(colorStops) {
    /* colorStops: ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607'] */
    const bg = document.querySelector('.animated-gradient-bg');
    if (bg) {
      const gradientString = colorStops.join(',');
      bg.style.backgroundImage = `linear-gradient(-45deg, ${gradientString}, ${colorStops[0]})`;
    }
  }

  changeAnimationSpeed(speedMultiplier) {
    /* speedMultiplier: 1 = normal, 0.5 = half speed, 2 = double speed */
    const style = document.createElement('style');
    const duration = 15 * speedMultiplier;
    const waveDurations = [12, 15, 18, 20];
    const beamDurations = [8, 10, 12];

    style.textContent = `
      .animated-gradient-bg { animation-duration: ${duration}s !important; }
      .wave:nth-child(1) { animation-duration: ${waveDurations[0] * speedMultiplier}s !important; }
      .wave:nth-child(2) { animation-duration: ${waveDurations[1] * speedMultiplier}s !important; }
      .wave:nth-child(3) { animation-duration: ${waveDurations[2] * speedMultiplier}s !important; }
      .wave:nth-child(4) { animation-duration: ${waveDurations[3] * speedMultiplier}s !important; }
      .orb-1 { animation-duration: ${20 * speedMultiplier}s !important; }
      .orb-2 { animation-duration: ${22 * speedMultiplier}s !important; }
      .orb-3 { animation-duration: ${25 * speedMultiplier}s !important; }
      .orb-4 { animation-duration: ${28 * speedMultiplier}s !important; }
      .orb-5 { animation-duration: ${24 * speedMultiplier}s !important; }
      .beam-1 { animation-duration: ${beamDurations[0] * speedMultiplier}s !important; }
      .beam-2 { animation-duration: ${beamDurations[1] * speedMultiplier}s !important; }
      .beam-3 { animation-duration: ${beamDurations[2] * speedMultiplier}s !important; }
    `;

    document.head.appendChild(style);
  }

  /* ==================== 5. PARTICLE COUNT ADJUSTMENT ==================== */
  setParticleCount(count) {
    this.particleCount = Math.min(count, 100); // Cap at 100 for performance
    this.generateParticles();
  }

  /* ==================== 6. ORB COLORS CUSTOMIZATION ==================== */
  changeOrbColors(colors) {
    /* colors: ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b'] */
    const style = document.createElement('style');
    const orbStyles = colors.map((color, i) => {
      return `.orb-${i + 1} { background: radial-gradient(circle, ${color}99, ${color}00) !important; }`;
    }).join('\n');

    style.textContent = orbStyles;
    document.head.appendChild(style);
  }
}

/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
  window.animatedBG = new AnimatedBackgroundSystem();
});

/* ==================== EXAMPLE CUSTOMIZATION (Uncomment to use) ==================== */
/*
// Change gradient colors
window.addEventListener('load', () => {
  // Example: Set to blue-to-purple gradient
  // animatedBG.changeGradientColor(['#0066ff', '#6633ff', '#ff00ff', '#00ffff', '#00ff66']);
  
  // Change animation speed (2x faster)
  // animatedBG.changeAnimationSpeed(2);
  
  // Set particle count
  // animatedBG.setParticleCount(75);
  
  // Change orb colors
  // animatedBG.changeOrbColors(['#ff0066', '#6600ff', '#00ffff', '#ffff00', '#ff6600']);
});
*/
