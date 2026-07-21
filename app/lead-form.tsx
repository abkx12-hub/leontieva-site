"use client";

import { FormEvent } from "react";

type LeadFormProps = {
  source?: string;
  title?: string;
};

export default function LeadForm({ source = "site", title = "Коротко о задаче" }: LeadFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const labels = ["source", "utm_source", "utm_medium", "utm_campaign"]
      .map((key) => params.get(key))
      .filter(Boolean);
    const detectedSource = labels.length ? labels.join(" · ") : source;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const task = String(form.get("task") ?? "").trim();
    const deadline = String(form.get("deadline") ?? "").trim();
    const done = String(form.get("done") ?? "").trim();
    const contact = String(form.get("contact") ?? "").trim();
    const subject = `Запрос с сайта LEONTIEVA — ${company || name}`;
    const body = [
      `Имя: ${name}`,
      `Компания / роль: ${company || "не указано"}`,
      `Задача: ${task}`,
      `Срок: ${deadline || "не указан"}`,
      `Что уже сделано: ${done || "не указано"}`,
      `Контакт: ${contact}`,
      `Источник: ${detectedSource}`,
    ].join("\n\n");

    window.dispatchEvent(new CustomEvent("leontieva:conversion", { detail: { type: "lead_form", source: detectedSource } }));
    window.location.href = `mailto:pr@leontieva-media.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} data-conversion="lead_form">
      <div className="lead-form-heading">
        <p className="contact-label">{title}</p>
        <p>Обычно достаточно 3–5 предложений. После отправки откроется готовое письмо в вашей почте.</p>
      </div>
      <div className="lead-form-grid">
        <label><span>Имя *</span><input name="name" autoComplete="name" required /></label>
        <label><span>Компания или роль</span><input name="company" autoComplete="organization" /></label>
        <label className="lead-form-wide"><span>Что должно измениться *</span><textarea name="task" rows={3} required /></label>
        <label><span>К какому сроку</span><input name="deadline" placeholder="Дата или период" /></label>
        <label><span>Как с вами связаться *</span><input name="contact" placeholder="Email, телефон или мессенджер" required /></label>
        <label className="lead-form-wide"><span>Что уже сделано</span><textarea name="done" rows={2} /></label>
      </div>
      <input type="hidden" name="source" value={source} />
      <div className="lead-form-footer">
        <button className="button button-gold" type="submit">Подготовить письмо</button>
        <p>Форма ничего не сохраняет на сайте: вы проверяете письмо и отправляете его из своей почты.</p>
      </div>
    </form>
  );
}
