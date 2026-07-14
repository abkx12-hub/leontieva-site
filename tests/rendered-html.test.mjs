import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

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

test("server-renders the LEONTIEVA landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>LEONTIEVA — продюсерский центр Елены Леонтьевой<\/title>/i);
  assert.match(html, /Выводим бизнес и основателей/);
  assert.match(html, /Медиадиагностика/);
  assert.match(html, /pr@leontieva-media\.ru/);
  assert.doesNotMatch(html, /hello@leontieva\.media/);
  assert.doesNotMatch(html, /Черновая версия|Your site is taking shape|codex-preview/i);
});

test("includes the required brand assets", async () => {
  await Promise.all([
    access(new URL("../public/lm-icon.jpg", import.meta.url)),
    access(new URL("../public/lm-brand-panel.png", import.meta.url)),
    access(new URL("../public/process-example.png", import.meta.url)),
  ]);
});

test("serves the active www domain without redirecting it", async () => {
  const response = await render("https://www.leontieva.media/");
  assert.equal(response.status, 200);
});

test("redirects reserve domains to www.leontieva.media", async () => {
  const response = await render("https://leontievamedia.ru/");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "https://www.leontieva.media/");
});
