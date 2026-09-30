(() => {
  const email = "pr@leontieva-media.ru";
  const params = new URLSearchParams(window.location.search);
  const campaign = ["source", "utm_source", "utm_medium", "utm_campaign"].map((key) => params.get(key)).filter(Boolean);

  document.querySelectorAll("form[data-lead-form]").forEach((form) => {
    const source = campaign.length ? campaign.join(" · ") : form.dataset.source || "site";
    const sourceField = form.querySelector('input[name="source"]');
    if (sourceField) sourceField.value = source;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      for (const field of form.querySelectorAll('[required]')) {
        field.setCustomValidity(field.value.trim() ? '' : 'Заполните это поле.');
        field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
      }
      if (!form.reportValidity()) return;
      const name = String(data.get("name") || "").trim();
      const company = String(data.get("company") || "").trim();
      const subject = `Запрос с сайта LEONTIEVA — ${company || name}`;
      const body = [
        `Имя: ${name}`,
        `Сфера / деятельность: ${company || "не указано"}`,
        `Тема / запрос: ${String(data.get("task") || "").trim()}`,
        `Срок: ${String(data.get("deadline") || "").trim() || "не указан"}`,
        `Формат / бюджет: ${String(data.get("done") || "").trim() || "не указано"}`,
        `Контакт: ${String(data.get("contact") || "").trim()}`,
        `Источник: ${source}`,
      ].join("\n\n");
      let preview = form.querySelector('.draft-preview');
      if (!preview) {
        preview = document.createElement('div');
        preview.className = 'draft-preview';
        preview.setAttribute('role', 'region');
        preview.setAttribute('aria-label', 'Предварительный просмотр письма');
        preview.setAttribute('aria-live', 'polite');
        preview.innerHTML = '<h3>Письмо готово к проверке</h3><p>Откройте его в своей почтовой программе и отправьте самостоятельно. Если почта не настроена, скопируйте текст.</p><pre></pre><a class="button button-gold" data-open-draft>Открыть письмо в почте ↗</a><button class="copy-draft" type="button">Скопировать текст письма</button><p class="copy-status" role="status"></p>';
        form.append(preview);
        preview.querySelector('[data-open-draft]').addEventListener('click', () => {
          window.dispatchEvent(new CustomEvent('leontieva:contact-intent', { detail: { type: 'email_draft', source, received: false } }));
        });
        preview.querySelector('.copy-draft').addEventListener('click', async () => {
          const status = preview.querySelector('.copy-status');
          try {
            await navigator.clipboard.writeText(preview.querySelector('pre').textContent);
            status.textContent = 'Текст скопирован. Получатель: ' + email;
          } catch {
            status.textContent = 'Выделите текст письма выше и скопируйте его вручную. Получатель: ' + email;
          }
        });
      }
      preview.querySelector('pre').textContent = `Кому: ${email}\nТема: ${subject}\n\n${body}`;
      preview.querySelector('[data-open-draft]').href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      preview.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    });
  });

  document.querySelectorAll('[data-contact-action="email"]').forEach((link) => link.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("leontieva:contact-intent", { detail: { type: "email_link", received: false, source: campaign.join(" · ") || "site" } }));
  }));
})();
