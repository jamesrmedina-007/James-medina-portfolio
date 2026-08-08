
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('jm-theme');
if (savedTheme) root.dataset.theme = savedTheme;

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('jm-theme', next);
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('.counter');
let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (countersStarted) return;
  if (entries.some(e => e.isIntersecting)) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = Number(counter.dataset.target || 0);
      const suffix = counter.dataset.suffix || '';
      const start = performance.now();
      const duration = 1100;
      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }
}, { threshold: .35 });

const strip = document.querySelector('.impact-strip');
if (strip) counterObserver.observe(strip);
