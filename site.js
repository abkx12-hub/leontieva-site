(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('#site-nav');
  function closeMenu() { nav?.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); toggle?.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  document.querySelectorAll('[data-format]').forEach(link => link.addEventListener('click', () => {
    const field = document.querySelector('[name="done"]'); if (field) field.value = link.dataset.format;
  }));
})();
