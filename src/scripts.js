/* =====================================================
   THÈME (MODE CLAIR / SOMBRE)
   ===================================================== */
const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Vérification de sécurité au cas où le bouton ne serait pas trouvé
if (toggleBtn && themeIcon) {
  // Récupérer le thème sauvegardé
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.textContent = '🌙';
  }

  // Changer de thème au clic
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
      themeIcon.textContent = '🌙';
    } else {
      localStorage.setItem('theme', 'dark');
      themeIcon.textContent = '☀️';
    }
  });
}

/* =====================================================
   ANIMATIONS AU SCROLL (REVEAL)
   ===================================================== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Staggered reveal for children of grids
document.querySelectorAll('.about-cards, .steps, .projects-grid, .stack-categories, .contact-links').forEach((container) => {
  container.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
  });
});

/* =====================================================
   NAVIGATION (LIEN ACTIF AU SCROLL)
   ===================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));

// Nav active style
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--text); background: var(--surface-2); }`;
document.head.appendChild(style);

/* =====================================================
   FORMULAIRE DE CONTACT
   ===================================================== */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Veuillez remplir tous les champs.';
      status.className = 'form-status error';
      return;
    }

    const subject = encodeURIComponent(`Contact portfolio — ${name}`);
    const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`);
    window.location.href = `mailto:moiseperras2357@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = 'Votre client mail va s\'ouvrir pour envoyer le message.';
    status.className = 'form-status success';
  });
}