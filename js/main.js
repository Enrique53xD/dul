// main.js — counter + back-to-top

const START_DATE = new Date('2025-04-13T00:00:00');

function pad(n, digits) {
  return String(n).padStart(digits, '0');
}

function tick() {
  const now  = new Date();
  const diff = now - START_DATE;
  if (diff < 0) return;

  const totalSec = Math.floor(diff / 1000);
  const secs     = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const mins     = totalMin % 60;
  const totalHrs = Math.floor(totalMin / 60);
  const hrs      = totalHrs % 24;
  const days     = Math.floor(totalHrs / 24);

  const cDays = document.getElementById('c-days');
  const cHrs  = document.getElementById('c-hours');
  const cMins = document.getElementById('c-minutes');
  const cSecs = document.getElementById('c-seconds');

  if (cDays) cDays.textContent = pad(days, 3);
  if (cHrs)  cHrs.textContent  = pad(hrs, 2);
  if (cMins) cMins.textContent = pad(mins, 2);
  if (cSecs) cSecs.textContent = pad(secs, 2);
}

tick();
setInterval(tick, 1000);

// Back to top button (wired in animations.js after GSAP loads, but click handler here)
document.getElementById('back-to-top')?.addEventListener('click', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
    gsap.to(window, { duration: 2, scrollTo: 0, ease: 'power2.inOut' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
