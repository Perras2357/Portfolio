/* ==============================
   script.js – Portfolio interactions
   ============================== */

// ── Dynamic year in footer ────────────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ── Navbar: add "scrolled" class after user scrolls down ─────────────────────
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load

// ── Mobile burger menu ────────────────────────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

function toggleMenu(open) {
  const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
  navLinks.classList.toggle('open', isOpen);
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
}

burger.addEventListener('click', () => toggleMenu());

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// ── Active nav link highlight on scroll ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(section => sectionObserver.observe(section));

// ── Scroll-reveal animation ───────────────────────────────────────────────────
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .about-grid, .contact-grid'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(el => revealObserver.observe(el));

// ── Contact form – client-side validation & feedback ─────────────────────────
const contactForm = document.getElementById('contact-form');
const formNotice = document.getElementById('form-notice');

function validateField(id, errorId, validator) {
  const field = document.getElementById(id);
  const errorEl = document.getElementById(errorId);
  const message = validator(field.value.trim());
  field.classList.toggle('error', Boolean(message));
  errorEl.textContent = message;
  return !message;
}

const validators = {
  name: value => (value.length < 2 ? 'Veuillez entrer votre nom (au moins 2 caractères).' : ''),
  email: value => {
    // Use the browser's native email validity algorithm via a temporary input element
    const input = document.createElement('input');
    input.type = 'email';
    input.value = value;
    return !input.checkValidity() ? 'Veuillez entrer une adresse e-mail valide.' : '';
  },
  message: value => (value.length < 10 ? 'Votre message doit contenir au moins 10 caractères.' : ''),
};

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const nameValid = validateField('name', 'name-error', validators.name);
    const emailValid = validateField('email', 'email-error', validators.email);
    const messageValid = validateField('message', 'message-error', validators.message);

    if (nameValid && emailValid && messageValid) {
      // Static site: show a confirmation message.
      // In the Django version, this will submit via fetch() to the backend API.
      formNotice.textContent = 'Merci ! Votre message a été enregistré. Je vous répondrai bientôt.';
      formNotice.classList.remove('error');
      contactForm.reset();
    } else {
      formNotice.textContent = 'Veuillez corriger les erreurs ci-dessus.';
      formNotice.classList.add('error');
    }
  });

  // Live validation on blur
  ['name', 'email', 'message'].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('blur', () => {
      validateField(id, `${id}-error`, validators[id]);
    });
    // Clear notice on new input
    field.addEventListener('input', () => {
      formNotice.textContent = '';
      formNotice.classList.remove('error');
    });
  });
}
