(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('#site-nav');
  function closeMenu() { nav?.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav?.classList.contains('is-open')) { closeMenu(); toggle?.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  const form = document.querySelector('form[data-lead-form]');
  if (!form) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'contact-dialog';
  dialog.setAttribute('aria-labelledby', 'request-title');
  dialog.setAttribute('aria-describedby', 'request-description');
  dialog.innerHTML = '<header class="request-header"><p class="request-kicker">Елена Леонтьева · на связи</p><h2 id="request-title" tabindex="-1">Расскажите о задаче.</h2><p id="request-description">Елена уточнит задачу, состав работы и полную цену до оплаты.</p><button class="request-close" type="button" aria-label="Закрыть окно обращения">×</button></header><div class="request-scroll"></div><div class="request-direct"><span>Или напрямую</span><a class="channel-telegram" href="https://t.me/leontevalena" target="_blank" rel="noopener noreferrer">Telegram ↗</a><a class="channel-email" href="mailto:pr@leontieva-media.ru">Почта ↗</a><a class="channel-phone" href="tel:+79689103319">Телефон ↗</a></div>';
  document.body.append(dialog);
  const scrollArea = dialog.querySelector('.request-scroll');
  const title = dialog.querySelector('#request-title');
  let opener;
  let placeholder;
  let originalScroll = 0;
  let closeTimer;
  const motionOff = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('effects-off');
  function finishClose() {
    clearTimeout(closeTimer);
    dialog.close();
    placeholder?.replaceWith(form);
    placeholder = null;
    document.documentElement.classList.remove('contact-modal-open');
    dialog.classList.remove('is-closing');
    window.scrollTo({ top: originalScroll, behavior: 'instant' });
    opener?.focus({ preventScroll: true });
  }
  function closeDialog() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    if (motionOff()) finishClose();
    else {
      dialog.classList.add('is-closing');
      closeTimer = setTimeout(finishClose, 180);
    }
  }
  document.querySelectorAll('a[href="#contact"]').forEach(link => link.addEventListener('click', event => {
    const format = link.dataset.format;
    if (format) {
      const field = form.querySelector('[name="done"]');
      if (field.value !== format) form.querySelector('.draft-preview')?.remove();
      field.value = format;
    }
    // Native anchors remain the fallback when the browser lacks modal dialogs.
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    if (dialog.open) return;
    closeMenu();
    opener = link;
    originalScroll = window.scrollY;
    title.textContent = format === 'Участие на ТВ' ? 'Обсудим участие на ТВ.' : format === 'Видеоинтервью' ? 'Обсудим интервью.' : 'Расскажите о задаче.';
    placeholder = document.createElement('div');
    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.style.height = form.getBoundingClientRect().height + 'px';
    form.before(placeholder);
    form.classList.remove('reveal-pending');
    scrollArea.append(form);
    document.documentElement.classList.add('contact-modal-open');
    dialog.showModal();
    scrollArea.scrollTop = 0;
    title.focus({ preventScroll: true });
  }));
  dialog.querySelector('.request-close').addEventListener('click', closeDialog);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(); });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]')].filter(el => el.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === title)) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault(); first?.focus();
    }
  });
  let backdropPress = false;
  dialog.addEventListener('pointerdown', event => { backdropPress = event.target === dialog; });
  dialog.addEventListener('click', event => { if (event.target === dialog && backdropPress) closeDialog(); });
})();
