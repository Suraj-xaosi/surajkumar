
// ── LOADER ─────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ── CUSTOM CURSOR ───────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    ring.style.opacity = '0.4';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity = '0.7';
  });
});

// ── NAVBAR ──────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateSideNav();
});

// ── MOBILE MENU ─────────────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ── SIDE NAV ACTIVE ─────────────────────────────────────────
const sections = ['hero','about','work','skills','contact'];
const sideLinks = document.querySelectorAll('.side-nav a');

function updateSideNav() {
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  sideLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// ── SCROLL REVEAL ────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// ── SMOOTH ANCHOR ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── PARALLAX HERO PHOTO ──────────────────────────────────────
const heroImg = document.querySelector('.hero-photo-frame img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `translateY(${y * 0.12}px)`;
    }
  });
}

// ── STAT COUNTER ANIMATION ───────────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = true;
      const text = e.target.innerText;
      const target = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      let start = 0;
      const dur = 1500;
      const step = dur / target;
      const timer = setInterval(() => {
        start++;
        e.target.innerText = start + suffix;
        if (start >= target) clearInterval(timer);
      }, step);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(n => statsObserver.observe(n));

// ── WEEKLY REPORT ────────────────────────────────────────────
const RAW_URL = 'https://raw.githubusercontent.com/Suraj-xaosi/SumUpWEEK/main/reportHistory.md';
const weeklyReport = document.getElementById('weekly-report');

if (weeklyReport && window.marked) {
  fetch(RAW_URL)
    .then(response => {
      if (!response.ok) throw new Error(`Report request failed: ${response.status}`);
      return response.text();
    })
    .then(markdownText => {
      weeklyReport.innerHTML = marked.parse(markdownText);
    })
    .catch(error => {
      console.error('Report load nahi hua:', error);
      weeklyReport.innerHTML = '<p class="weekly-report-status">The weekly report is not available right now.</p>';
    });
} else if (weeklyReport) {
  weeklyReport.innerHTML = '<p class="weekly-report-status">The weekly report could not be loaded.</p>';
}

// ── HERO NAME LETTER HOVER ────────────────────────────────────
document.querySelectorAll('.hero-name span').forEach(span => {
  const letters = span.innerText.split('');
  span.innerHTML = letters.map(l =>
    `<span style="display:inline-block;transition:transform 0.3s,color 0.3s" class="letter">${l}</span>`
  ).join('');
  span.querySelectorAll('.letter').forEach((letter, i) => {
    letter.addEventListener('mouseenter', () => {
      letter.style.transform = 'translateY(-8px)';
      letter.style.color = 'var(--gold)';
    });
    letter.addEventListener('mouseleave', () => {
      letter.style.transform = 'translateY(0)';
      letter.style.color = '';
    });
  });
});

// ── CLICK RIPPLE ON BUTTONS ───────────────────────────────────
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = document.createElement('span');
    const rect = this.getBoundingClientRect();
    r.style.cssText = `
      position:absolute;width:4px;height:4px;background:rgba(201,169,110,0.5);
      border-radius:50%;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;
      transform:translate(-50%,-50%) scale(0);
      animation:ripple 0.6s ease-out forwards;pointer-events:none;z-index:10;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform:translate(-50%,-50%) scale(80); opacity:0; } }`;
document.head.appendChild(rippleStyle);

