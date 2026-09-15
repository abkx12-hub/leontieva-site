import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function render(url = "http://localhost/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(url, {
      headers: { accept: "text/html", host: new URL(url).host },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("preserves the legacy vinext landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>LEONTIEVA — продюсерский центр управляемой публичной траектории<\/title>/i);
  assert.match(html, /Публичная траектория/);
  assert.match(html, /GR и общественные проекты/);
  assert.match(html, /Ключевые решения — лично у Елены/);
  assert.match(html, /Мы не выдаём список советов\. Мы ведём по маршруту/);
  assert.match(html, /Одна цель — один контур работы/);
  assert.match(html, /Три понятных/);
  assert.match(html, /Стратегическое решение для собственника/);
  assert.match(html, /Мы подходим друг другу, если/);
  assert.match(html, /Подготовить письмо/);
  assert.match(html, /elena-hero-v4\.jpg/);
  assert.match(html, /elena-production-v4\.jpg/);
  assert.match(html, /pr@leontieva-media\.ru/);
  assert.doesNotMatch(html, /Павел|STULER|Борисыч/i);
  assert.doesNotMatch(html, /hello@leontieva\.media/);
  assert.doesNotMatch(html, /Черновая версия|Your site is taking shape|codex-preview/i);
});

test("includes the required brand assets", async () => {
  await Promise.all([
    access(new URL("../public/lm-icon.jpg", import.meta.url)),
    access(new URL("../public/lm-brand-panel.png", import.meta.url)),
    access(new URL("../public/process-example.png", import.meta.url)),
    access(new URL("../public/process-flow-client-v2.png", import.meta.url)),
    access(new URL("../public/elena-hero-v4.jpg", import.meta.url)),
    access(new URL("../public/elena-production-v4.jpg", import.meta.url)),
    access(new URL("../public/elena-about-v3.jpg", import.meta.url)),
    access(new URL("../public/elena-editorial-v3.jpg", import.meta.url)),
    access(new URL("../public/leontieva-og-v1.png", import.meta.url)),
  ]);
});

test("ships the ready TV and published interview offers in the GitHub Pages shell", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /elena-hero-v4\.jpg/);
  assert.match(html, /elena-about-v3\.jpg/);
  assert.doesNotMatch(html, /elena-hero-v3\.jpg/);
  assert.match(html, /Попасть на ТВ/);
  assert.match(html, /Видеоинтервью для эксперта/);
  assert.match(html, /опубликованное интервью и ссылка/);
  assert.match(html, /по запросу: после выбора площадки/);
  assert.match(html, /необходимой подготовкой и координацией/);
  assert.match(html, /\/assets\/leontieva-media-formats\.pdf/);
  assert.match(html, /\/assets\/leontieva-media-services\.pdf/);
  assert.match(html, /data-lead-form/);
  assert.doesNotMatch(html, /preview-note|noindex|20 минут|Публичная траектория/);
  await Promise.all([
    access(new URL("../elena-hero-v4.jpg", import.meta.url)),
    access(new URL("../elena-production-v4.jpg", import.meta.url)),
  ]);
});

test("ships matching service pages without mandatory diagnosis or invented prices", async () => {
  const [strategy, interview, support] = await Promise.all([
    readFile(new URL("../strategy/index.html", import.meta.url), "utf8"),
    readFile(new URL("../interview/index.html", import.meta.url), "utf8"),
    readFile(new URL("../support/index.html", import.meta.url), "utf8"),
  ]);

  assert.match(strategy, /Стратегия по запросу/);
  assert.match(interview, /Попасть на ТВ/);
  assert.match(interview, /опубликованное интервью и ссылка/);
  assert.match(interview, /elena-production-v4\.jpg/);
  assert.match(support, /Необходимая подготовка и координация входят/);
  for (const html of [strategy, interview, support]) {
    assert.match(html, /data-lead-form/);
    assert.match(html, /Открыть письмо/);
    assert.match(html, /Сайт сам сообщение не отправляет/);
    assert.match(html, /mailto:pr@leontieva-media\.ru/);
    assert.doesNotMatch(html, /20 минут|квалификаци|noindex|preview-note|30\s?000|за неделю/);
    assert.doesNotMatch(html, /Алёна Оленева|Буланова|закупочн/i);
  }
});

test("prepares a mailto draft with the chosen format and does not mark a lead as received", async () => {
  const script = await readFile(new URL("../lead-form.js", import.meta.url), "utf8");
  const fields = { name: "Анна", company: "Архитектура", task: "О ремонте", done: "Видеоинтервью, бюджет обсудим", deadline: "", contact: "anna@example.com" };
  const handlers = {};
  const sourceField = { value: "" };
  const form = {
    dataset: { source: "landing-interview" },
    querySelector: () => sourceField,
    addEventListener: (type, fn) => { handlers[type] = fn; },
  };
  const events = [];
  const location = { search: "?source=avito", href: "" };
  const sandbox = {
    URLSearchParams,
    FormData: class { get(key) { return fields[key] ?? ""; } },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    document: { querySelectorAll: (selector) => selector.startsWith("form") ? [form] : [] },
    window: { location, dispatchEvent: (event) => events.push(event) },
  };
  vm.runInNewContext(script, sandbox);
  let prevented = false;
  handlers.submit({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(sourceField.value, "avito");
  const draft = new URL(location.href);
  assert.equal(draft.protocol, "mailto:");
  assert.equal(draft.pathname, "pr@leontieva-media.ru");
  assert.match(draft.searchParams.get("body"), /Формат \/ бюджет: Видеоинтервью, бюджет обсудим/);
  assert.match(draft.searchParams.get("body"), /Тема \/ запрос: О ремонте/);
  assert.doesNotMatch(draft.searchParams.get("body"), /Что уже сделано/);
  assert.equal(events.length, 1);
  assert.equal(events[0].type, "leontieva:contact-intent");
  assert.equal(events[0].detail.type, "email_draft");
  assert.equal(events[0].detail.received, false);
});

test("serves the active apex domain without redirecting it", async () => {
  const response = await render("https://leontieva.media/");
  assert.equal(response.status, 200);
});

test("redirects www and reserve domains to leontieva.media", async () => {
  const wwwResponse = await render("https://www.leontieva.media/");
  assert.equal(wwwResponse.status, 307);
  assert.equal(wwwResponse.headers.get("location"), "https://leontieva.media/");

  const response = await render("https://leontievamedia.ru/");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "https://leontieva.media/");
});
