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
      const name = String(data.get("name") || "").trim();
      const company = String(data.get("company") || "").trim();
      const subject = `Запрос с сайта LEONTIEVA — ${company || name}`;
      const body = [
        `Имя: ${name}`,
        `Компания / роль: ${company || "не указано"}`,
        `Задача: ${String(data.get("task") || "").trim()}`,
        `Срок: ${String(data.get("deadline") || "").trim() || "не указан"}`,
        `Что уже сделано: ${String(data.get("done") || "").trim() || "не указано"}`,
        `Контакт: ${String(data.get("contact") || "").trim()}`,
        `Источник: ${source}`,
      ].join("\n\n");
      window.dispatchEvent(new CustomEvent("leontieva:conversion", { detail: { type: "lead_form", source } }));
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  document.querySelectorAll('[data-conversion="email"]').forEach((link) => link.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("leontieva:conversion", { detail: { type: "email_click", source: campaign.join(" · ") || "site" } }));
  }));
})();
