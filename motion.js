(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const targets = document.querySelectorAll('.section-heading, .entry-product-card, .results-list article, .case-card, .materials-links, .entry-process li, .team-portrait, .team-copy, .extra-grid > a, .faq-list details, .contact-copy, .lead-form, .production-frame, .entry-situation-grid article');
  let observer;
  let userPaused = false;
  const motionToggle = document.querySelector('[data-motion-toggle]');
  function setMotion() {
    observer?.disconnect();
    const off = reduced.matches || userPaused;
    root.classList.toggle('motion-ready', !off);
    root.classList.toggle('effects-off', off);
    if (motionToggle) {
      motionToggle.disabled = reduced.matches;
      motionToggle.setAttribute('aria-pressed', String(off));
      motionToggle.textContent = reduced.matches ? 'Движение отключено' : userPaused ? 'Включить движение' : 'Остановить движение';
    }
    targets.forEach(el => { el.classList.remove('reveal-pending'); });
    if (off || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
    targets.forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('reveal-pending'); observer.observe(el); }
    });
  }
  setMotion();
  reduced.addEventListener?.('change', setMotion);
  motionToggle?.addEventListener('click', () => { userPaused = !userPaused; setMotion(); update(); });
  let frame = 0;
  function update() {
    frame = 0;
    header?.classList.toggle('is-scrolled', scrollY > 40);
    const travel = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    root.style.setProperty('--page-progress', String(Math.min(1, scrollY / travel)));
    if (hero && !reduced.matches && !userPaused && innerWidth > 760) {
      const visible = hero.getBoundingClientRect().bottom > 0;
      if (visible) hero.style.setProperty('--photo-shift', `${Math.min(24, scrollY * 0.055)}px`);
    } else hero?.style.setProperty('--photo-shift', '0px');
  }
  function requestUpdate() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate, { passive: true });
  update();
  // Keep every destination accessible even before its entrance animation.
  document.addEventListener('focusin', event => event.target.closest('.reveal-pending')?.classList.remove('reveal-pending'));
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    section?.classList.remove('reveal-pending');
    section?.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
  }));
})();
