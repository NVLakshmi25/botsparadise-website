/* TechNova Solutions — shared interactions */
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  // Colour theme preference. localStorage is optional; the default is light.
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('i');
  const applyTheme = (dark) => {
    document.body.classList.toggle('dark-theme', dark);
    if (themeIcon) themeIcon.className = dark ? 'bi bi-sun' : 'bi bi-moon-stars';
    if (themeToggle) themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  };
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('technova-theme'); } catch (_) { /* storage may be unavailable */ }
  applyTheme(savedTheme === 'dark');
  themeToggle?.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-theme');
    applyTheme(dark);
    try { localStorage.setItem('technova-theme', dark ? 'dark' : 'light'); } catch (_) { /* keep theme for this page only */ }
  });

  // Back-to-top control.
  const backToTop = document.getElementById('backToTop');
  const updateBackToTop = () => backToTop?.classList.toggle('visible', window.scrollY > 450);
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Animated statistics: values on the home page are explicitly illustrative.
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';
    const target = Number(el.dataset.count || 0);
    const duration = 1000;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
    }), { threshold: 0.35 });
    counters.forEach(counter => observer.observe(counter));
  } else counters.forEach(animateCounter);

  // Portfolio category filtering.
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectItems = document.querySelectorAll('.project-item');
  const noProjects = document.getElementById('noProjects');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    projectItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('d-none', !show);
      if (show) visible++;
    });
    noProjects?.classList.toggle('d-none', visible !== 0);
  }));

  // Reusable browser-only form validation. This does not send or store data.
  const toast = document.getElementById('siteToast');
  let toastTimeout;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove('show'), 4500);
  };
  const bindDemoForm = (formId, statusId, message) => {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    if (!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      form.classList.add('was-validated');
      if (!form.checkValidity()) {
        if (status) { status.textContent = 'Please review the highlighted fields and try again.'; status.className = 'form-status error mt-3'; }
        form.querySelector(':invalid')?.focus();
        return;
      }
      if (status) { status.textContent = message; status.className = 'form-status success mt-3'; }
      showToast('Demo form validated. No information was sent or saved.');
      form.reset();
      form.classList.remove('was-validated');
    });
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        if (form.classList.contains('was-validated')) field.classList.toggle('is-invalid', !field.checkValidity());
      });
      field.addEventListener('change', () => {
        if (form.classList.contains('was-validated')) field.classList.toggle('is-invalid', !field.checkValidity());
      });
    });
  };
  bindDemoForm('contactForm', 'contactStatus', 'Thank you! Your form is valid. This demo has not sent your enquiry; connect a backend or form service to receive real messages.');
  bindDemoForm('careerForm', 'careerStatus', 'Your application preview is valid. This demo has not sent or stored your information.');

  // Apply buttons preselect the relevant role and bring the application form into view.
  document.querySelectorAll('.apply-role').forEach(button => button.addEventListener('click', () => {
    const roleSelect = document.getElementById('appRole');
    if (roleSelect) {
      const role = button.dataset.role;
      const matchingOption = [...roleSelect.options].find(option => option.value === role || option.textContent.trim() === role);
      if (matchingOption) roleSelect.value = matchingOption.value;
      document.getElementById('application')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => document.getElementById('appName')?.focus({ preventScroll: true }), 450);
    }
  }));
});
