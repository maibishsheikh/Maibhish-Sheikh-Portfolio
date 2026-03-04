// ============================================
// NAVBAR — scroll effect & active link tracking
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Shrink navbar on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll);
onScroll();

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ============================================
// SCROLL REVEAL — animate elements into view
// ============================================
function setupReveal() {
  const revealElements = document.querySelectorAll(
    '.skill-category, .project-card, .stat-card, .about-text, .contact-form'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

setupReveal();

// ============================================
// CONTACT FORM — basic client-side handling
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  // Simulate form submission
  const btn = contactForm.querySelector('.btn-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 1200);
});

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // Style the toast
  const isMobile = window.innerWidth <= 480;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: isMobile ? '16px' : '32px',
    right: isMobile ? '16px' : '32px',
    left: isMobile ? '16px' : 'auto',
    padding: isMobile ? '14px 20px' : '16px 28px',
    borderRadius: '8px',
    fontSize: '0.92rem',
    fontWeight: '500',
    fontFamily: 'Inter, sans-serif',
    color: '#fff',
    zIndex: '9999',
    opacity: '0',
    transform: 'translateY(16px)',
    transition: 'all 0.3s ease',
    background: type === 'success' ? '#059669' : '#dc2626',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    maxWidth: isMobile ? 'none' : '400px',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  // Auto-remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================
// SMOOTH SCROLL for anchor links (fallback)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
