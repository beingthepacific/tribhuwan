/* ======================================
   TRIBHUWAN AADARSHA V3.0 ULTRA-ADVANCED
   AI-Powered Interactive Platform
   Complete JavaScript Engine
   ====================================== */

// ==================== INITIALIZE V3.0 ENGINE ====================
class SchoolWebsiteV3 {
  constructor() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.chatbotActive = false;
    this.particlesActive = true;
    this.init();
  }

  init() {
    this.setupTheme();
    this.initScrollProgress();
    this.initCounters();
    this.initParallax();
    this.initNavigation();
    this.initChatbot();
    this.initControls();
    this.initParticles();
    this.initRevealAnimations();
    this.initTiltEffect();
    this.initMagneticButtons();
    this.initFormHandling();
    this.initFastScroll();
  }

  // ==================== THEME ENGINE (V3) ====================
  setupTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');

    // Check system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('theme')) {
      this.isDarkMode = prefersDark;
    }

    // Apply theme
    html.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    if (themeToggle) {
      themeToggle.textContent = this.isDarkMode ? '☀️' : '🌙';
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.isDarkMode = e.matches;
        this.applyTheme();
      }
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    const html = document.documentElement;
    html.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = this.isDarkMode ? '☀️' : '🌙';
    }
  }

  // ==================== SCROLL PROGRESS BAR (V2 PRESERVED) ====================
  initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / scrollHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  // ==================== ANIMATED COUNTERS (V2 PRESERVED + V3 ENHANCED) ====================
  initCounters() {
    const animateCounter = (element, target, duration = 2000) => {
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
    };

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

  // ==================== PARALLAX SCROLLING (V2 PRESERVED) ====================
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // ==================== REVEAL ANIMATIONS (V3 NEW) ====================
  initRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
      element.style.animationPlayState = 'paused';
      revealObserver.observe(element);
    });
  }

  // ==================== TILT EFFECT (V3 NEW - Mouse-based 3D) ====================
  initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ==================== MAGNETIC BUTTON EFFECT (V3 NEW) ====================
  initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('[data-magnetic]');
    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        if (distance < 100) {
          button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        }
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ==================== CHATBOT WIDGET (V3 NEW - AI ASSISTANT) ====================
  initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (!chatbotToggle) return;

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
      this.chatbotActive = !this.chatbotActive;
      chatbotWindow.classList.toggle('active', this.chatbotActive);
      if (this.chatbotActive) {
        chatbotInput.focus();
      }
    });

    // Close chatbot
    chatbotClose?.addEventListener('click', () => {
      this.chatbotActive = false;
      chatbotWindow.classList.remove('active');
    });

    // Send message
    const sendMessage = () => {
      const message = chatbotInput.value.trim();
      if (!message) return;

      // User message
      const userMsg = document.createElement('div');
      userMsg.className = 'message user-message';
      userMsg.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
      chatbotMessages.appendChild(userMsg);

      // Clear input
      chatbotInput.value = '';

      // Simulate bot typing
      setTimeout(() => {
        const response = this.getChatbotResponse(message);
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.innerHTML = `<p>${response}</p>`;
        chatbotMessages.appendChild(botMsg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 500);

      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    chatbotSend?.addEventListener('click', sendMessage);
    chatbotInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // AI Chatbot Response Engine
  getChatbotResponse(input) {
    const lower = input.toLowerCase();

    // FAQ Knowledge Base
    const responses = {
      admission: "📝 To apply for admission, visit our Admissions page or fill the online form. We accept applications year-round!",
      academics: "📚 We offer School Level, +2 Science, and +2 Management programs. Check the Academics page for more details.",
      contact: "📞 You can reach us at +977-74-550-123 or info@tribhuwan-school.edu.np. Office hours: Mon-Fri 10AM-5PM.",
      fee: "💰 School Level: NPR 45,000/year | +2 Science: NPR 55,000/year | +2 Management: NPR 50,000/year",
      principal: "👨‍💼 Our Principal is Prem Narayan Paudel with 25+ years of experience in education.",
      teacher: "👨‍🏫 We have 50+ qualified faculty members dedicated to student success.",
      location: "📍 We are located in Putalibazar-1, Syangja, Gandaki Province, Nepal.",
      event: "🎉 Check our Events section for upcoming sports meets, exhibitions, and celebrations!",
      facilities: "🏢 We have labs, library, computer lab, sports complex, cafeteria, and more!",
      scholarship: "🏆 Merit-based scholarships (50% discount) and need-based financial aid available.",
      default: "👋 Great question! I can help with admissions, academics, contact info, fees, events, and more. What would you like to know?"
    };

    // Match keywords
    for (const [key, response] of Object.entries(responses)) {
      if (lower.includes(key)) return response;
    }

    return responses.default;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==================== CONTROL PANEL (V3 NEW) ====================
  initControls() {
    // Theme toggle already handled in setupTheme()

    // Accessibility toggle
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    accessibilityToggle?.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      alert('Accessibility mode toggled!');
    });

    // Font size toggle
    const fontSizeToggle = document.getElementById('font-size-toggle');
    fontSizeToggle?.addEventListener('click', () => {
      const currentSize = document.body.style.fontSize;
      if (currentSize === '16px') {
        document.body.style.fontSize = '18px';
      } else {
        document.body.style.fontSize = '16px';
      }
    });
  }

  // ==================== FLOATING PARTICLES (V3 NEW - ENHANCED) ====================
  initParticles() {
    const particleContainer = document.getElementById('particle-container');
    if (!particleContainer) return;

    const particleCount = window.innerWidth > 1024 ? 20 : 10;
    const particleTypes = ['type-1', 'type-2', 'type-3'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = `particle ${particleTypes[i % particleTypes.length]}`;
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = window.innerHeight + Math.random() * 100 + 'px';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = (10 + Math.random() * 15) + 's';
      particleContainer.appendChild(particle);

      // Regenerate particle when animation ends
      particle.addEventListener('animationend', () => {
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
      });
    }
  }

  // ==================== NAVIGATION (V2 PRESERVED + V3 ENHANCED) ====================
  initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger) return;

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        this.setActiveNav();
      });
    });

    // Set active navigation
    this.setActiveNav();
  }

  setActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href').split('/').pop() || 'index.html';
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ==================== FORM HANDLING (V2 PRESERVED) ====================
  initFormHandling() {
    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e, 'contact'));
    }

    // Admission Form
    const admissionForm = document.querySelector('.admission-form');
    if (admissionForm) {
      admissionForm.addEventListener('submit', (e) => this.handleFormSubmit(e, 'admission'));
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLoginSubmit(e));
    }

    // Quick Access Cards
    const quickAccessCards = document.querySelectorAll('.quick-access-card');
    quickAccessCards.forEach(card => {
      card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link && link !== '#') {
          window.location.href = link;
        }
      });
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const link = card.getAttribute('data-link');
          if (link && link !== '#') {
            window.location.href = link;
          }
        }
      });
    });
  }

  handleFormSubmit(e, formType) {
    e.preventDefault();
    const form = e.target;

    // Validate form
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#e74c3c';
      } else {
        input.style.borderColor = '';

        // Additional validation
        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
          }
        }
      }
    });

    if (!isValid) {
      this.showNotification('Please fill all required fields correctly.', 'error');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Submitting...';
    submitBtn.disabled = true;

    // Simulate submission
    setTimeout(() => {
      this.showNotification(`${formType} form submitted successfully!`, 'success');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      this.showNotification('Please enter email and password.', 'error');
      return;
    }

    // Simulate login
    setTimeout(() => {
      this.showNotification('Login successful! Redirecting...', 'success');
      document.getElementById('login-modal').classList.remove('active');
      setTimeout(() => {
        window.location.href = '#dashboard';
      }, 1500);
    }, 1500);
  }

  // ==================== NOTIFICATIONS (V2 PRESERVED) ====================
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
      font-weight: 500;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideInLeft 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ==================== FAST SCROLL (V3 NEW) ====================
  initFastScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

// ==================== INITIALIZE ON DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
  new SchoolWebsiteV3();

  // Portal card tilt effect (if data-tilt attribute exists)
  const portalCards = document.querySelectorAll('.portal-card[data-tilt]');
  portalCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Portal preview login button
  const portalLoginBtn = document.querySelector('.btn-login-portal');
  portalLoginBtn?.addEventListener('click', () => {
    const loginModal = document.getElementById('login-modal');
    loginModal?.classList.add('active');
  });

  // Modal close handlers
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    const backdrop = modal.querySelector('.modal-backdrop');
    const closeBtn = modal.querySelector('.modal-close');

    backdrop?.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    closeBtn?.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
      }
    });
  });

  // Split text animation for titles
  const titlesToSplit = document.querySelectorAll('[data-split-text]');
  titlesToSplit.forEach(title => {
    const text = title.textContent;
    title.innerHTML = text
      .split('')
      .map((char, i) => `<span style="display:inline-block; animation: titlesplit 0.6s ease-out ${i * 0.05}s both;">${char}</span>`)
      .join('');
  });

  console.log('🚀 Tribhuwan Aadarsha V3.0 Ultra-Advanced Platform loaded successfully!');
});

// ==================== END OF V3.0 SCRIPT ====================
