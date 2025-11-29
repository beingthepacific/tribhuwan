/* ======================================
   TRIBHUWAN AADARSHA MODEL SECONDARY SCHOOL
   Main JavaScript File - Advanced Interactive Features
   ====================================== */

// ==================== SCROLL PROGRESS BAR ====================
window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.pageYOffset;
  const progress = (scrolled / scrollHeight) * 100;
  
  // Create progress indicator if it doesn't exist
  if (!document.getElementById('scroll-progress')) {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #0b63a6, #f6b042);
      z-index: 999;
      transition: width 0.1s ease;
      box-shadow: 0 2px 8px rgba(11, 99, 166, 0.3);
    `;
    document.body.appendChild(progressBar);
  }
  
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ==================== ANIMATED COUNTERS ====================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        entry.target.dataset.animated = 'true';
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// ==================== PARALLAX SCROLLING ====================
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      element.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

// ==================== SMOOTH SCROLL WITH EASING ====================
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(element, duration = 1000) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutCubic(timeElapsed / duration);
    
    window.scrollTo(0, startPosition + distance * run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// ==================== PAGE TRANSITION EFFECTS ====================
function addPageTransition() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^=""]');
    if (link && !link.target && !link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      
      const transitionOverlay = document.createElement('div');
      transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0b63a6, #f6b042);
        z-index: 9999;
        animation: pageTransition 0.6s ease both;
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pageTransition {
          0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          100% { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(transitionOverlay);
      
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    }
  });
}

// ==================== FLOATING PARTICLES ====================
function createFloatingParticles() {
  const container = document.createElement('div');
  container.id = 'particles-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;
  document.body.insertBefore(container, document.body.firstChild);
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(11, 99, 166, 0.8), rgba(11, 99, 166, 0));
      border-radius: 50%;
      left: ${posX}px;
      top: ${posY}px;
      animation: floatParticle ${duration}s infinite ease-in-out;
      box-shadow: 0 0 ${size * 2}px rgba(11, 99, 166, 0.5);
    `;
    container.appendChild(particle);
  }
}

// ==================== NAVIGATION ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navMenu.classList.contains('active') 
    ? 'rotate(45deg) translate(10px, 10px)' 
    : '';
  spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
  spans[2].style.transform = navMenu.classList.contains('active') 
    ? 'rotate(-45deg) translate(7px, -7px)' 
    : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active');
    hamburger.querySelectorAll('span').forEach(span => {
      span.style.transform = '';
      span.style.opacity = '1';
    });
    
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) smoothScrollTo(target);
    }
  });
});

// ==================== ACTIVE NAVIGATION HIGHLIGHT ====================
function setActiveNav() {
  const currentLocation = location.pathname;
  const pages = {
    '/school-website/index.html': 'home',
    '/school-website/pages/about.html': 'about',
    '/school-website/pages/academics.html': 'academics',
    '/school-website/pages/admissions.html': 'admissions',
    '/school-website/pages/gallery.html': 'gallery',
    '/school-website/pages/contact.html': 'contact'
  };

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (currentLocation.includes(pages[href]) || 
        (href === '/' || href === 'index.html') && currentLocation.includes('index')) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNav);

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('fade-in');
        entry.target.style.animation = `slideInUp 0.8s ease-out ${index * 0.1}s both`;
      }, 0);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card, .team-card, .section, .quick-access-card').forEach((el, index) => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});

// ==================== FORM HANDLING ====================
const contactForm = document.querySelector('.contact-form');
const admissionForm = document.querySelector('.admission-form');

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInLeft 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  if (!data.name || !data.email || !data.message) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  if (!isValidEmail(data.email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

admissionForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(admissionForm);
  const data = Object.fromEntries(formData);
  
  if (!data.fullname || !data.email || !data.phone || !data.class) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  if (!isValidEmail(data.email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  if (!isValidPhone(data.phone)) {
    showNotification('Please enter a valid phone number', 'error');
    return;
  }

  const submitBtn = admissionForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showNotification('Your admission form has been submitted successfully!', 'success');
    admissionForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// ==================== GALLERY MODAL ====================
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        openModal(img.src);
      }
    });
  });
}

function openModal(imageSrc) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <img src="${imageSrc}" alt="Gallery image">
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5000;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(5px);
  `;

  const modalContent = modal.querySelector('.modal-content');
  modalContent.style.cssText = `
    position: relative;
    background: white;
    border-radius: 16px;
    max-width: 90%;
    max-height: 90vh;
    overflow: auto;
    animation: scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;

  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    color: white;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5001;
    transition: all 0.3s ease;
  `;

  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.background = 'rgba(0, 0, 0, 0.9)';
    closeBtn.style.transform = 'scale(1.1)';
  });

  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.background = 'rgba(0, 0, 0, 0.7)';
    closeBtn.style.transform = 'scale(1)';
  });

  const img = modal.querySelector('img');
  img.style.cssText = `
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
  `;

  closeBtn.addEventListener('click', () => {
    modal.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => modal.remove(), 300);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => modal.remove(), 300);
    }
  });

  document.body.appendChild(modal);
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const element = document.querySelector(href);
      smoothScrollTo(element);
    }
  });
});

// ==================== QUICK ACCESS CARDS ====================
document.querySelectorAll('.quick-access-card').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.getAttribute('data-link');
    if (link) {
      window.location.href = link;
    }
  });

  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const link = card.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    }
  });
});

// ==================== ACCESSIBILITY ====================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navMenu?.classList.remove('active');
    document.querySelectorAll('.modal').forEach(modal => modal.remove());
  }
});

// ==================== SIMPLE CAROUSEL ====================
let slideIndex = 0;
const slides = [
  'assets/images/slide-1.png',
  'assets/images/slide-2.jpg',
  'assets/images/slide-3.jpg',
  'assets/images/slide-4.jpg'
];

function currentSlide(n) {
  slideIndex = n;
  showSlide();
}

function showSlide() {
  const img = document.getElementById('carousel-image');
  const dots = document.querySelectorAll('.dot');
  
  if (!img) return;
  
  img.src = slides[slideIndex];
  
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === slideIndex) {
      dot.classList.add('active');
    }
  });
}

function autoSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide();
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  showSlide();
  setInterval(autoSlide, 2000); // Change slide every 2 seconds
  
  initGallery();
  initCounters();
  initParallax();
  addPageTransition();
  createFloatingParticles();
  
  console.log('🚀 Tribhuwan Aadarsha Model Secondary School - Advanced Interactive Website Loaded');
});

// ==================== PERFORMANCE OPTIMIZATION ====================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Reduce motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('*').forEach(el => {
    el.style.animationDuration = '0.01ms !important';
    el.style.transitionDuration = '0.01ms !important';
  });
}
