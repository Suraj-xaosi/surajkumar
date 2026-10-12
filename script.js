const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

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
