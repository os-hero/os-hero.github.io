const test = require("node:test");
const assert = require("node:assert/strict");
const { createAnalytics, CONSENT_KEY } = require("../analytics.js");

const ID = "G-TEST123456";
const HOST = "os-hero.github.io";
const CURRENT = { title: "OS Hero", language: "ko" };
const INSTALLER = "https://github.com/os-hero/os-hero/releases/download/v1.8.0/OS-Hero-1.8.0-arm64.dmg";

function setup(options = {}) {
  const handlers = {}, windowHandlers = {}, scripts = [], cookieWrites = [];
  const storage = new Map();
  if (options.saved !== undefined) storage.set(CONSENT_KEY, options.saved);
  const notice = { hidden: true }, settings = { hidden: true };
  const dialog = { open: false, showModal() { this.open = true; }, close() { this.open = false; } };
  const states = ["unset", "granted", "denied"].map(value => ({ dataset: { consentState: value }, hidden: true }));
  const doc = {
    referrer: options.referrer || "https://example.com/private?email=private@example.com",
    head: { appendChild: script => scripts.push(script) },
    createElement: () => ({}),
    addEventListener: (name, fn) => { handlers[name] = fn; },
    getElementById: id => id === "analytics-notice" ? notice : dialog,
    querySelectorAll: selector => selector === "[data-consent-state]" ? states : [settings]
  };
  Object.defineProperty(doc, "cookie", { get: () => options.cookies || "", set: value => cookieWrites.push(value) });
  let reloads = 0;
  const win = {
    document: doc,
    location: { hostname: options.host || HOST, protocol: options.protocol || "https:", pathname: options.path || "/", href: `https://${HOST}/?email=private@example.com#secret`, reload() { reloads++; } },
    localStorage: {
      getItem(key) { if (options.blockStorage) throw Error("Blocked"); return storage.get(key) || null; },
      setItem(key, value) { if (options.blockStorage) throw Error("Blocked"); storage.set(key, value); }
    },
    addEventListener: (name, fn) => { windowHandlers[name] = fn; }
  };
  const analytics = createAnalytics(win, { hostname: HOST, measurementId: options.id === undefined ? ID : options.id });
  const click = (target, extras = {}) => handlers.click({ target, button: 0, defaultPrevented: false, ...extras });
  const choice = value => click({ closest: () => ({ dataset: { analyticsChoice: value }, hasAttribute: () => false }) });
  const link = (href = INSTALLER, location = "home_hero") => ({ href, dataset: { downloadLocation: location } });
  const download = (anchor = link(), extras = {}) => click({ closest: selector => selector === "a[data-download-location]" ? anchor : null }, extras);
  const commands = () => (win.dataLayer || []).map(value => Array.from(value));
  const events = name => commands().filter(value => value[0] === "event" && (!name || value[1] === name));
  return { analytics, win, scripts, notice, settings, states, storage, cookieWrites, choice, download, link, handlers, windowHandlers, commands, events, reloads: () => reloads };
}
const consent = value => JSON.stringify({ value, at: Date.now() });

test("no Google tag or events before a choice", () => {
  const ctx = setup();
  ctx.analytics.updatePage(CURRENT);
  ctx.download();
  assert.equal(ctx.notice.hidden, false);
  assert.equal(ctx.settings.hidden, false);
  assert.equal(ctx.scripts.length, 0);
  assert.equal(ctx.commands().length, 0);
});
test("consent grants exactly one initial page view and keeps ads disabled", () => {
  const ctx = setup();
  ctx.analytics.updatePage(CURRENT);
  ctx.choice("granted");
  ctx.choice("granted");
  assert.equal(ctx.scripts.length, 1);
  assert.equal(ctx.events("page_view").length, 1);
  assert.equal(ctx.notice.hidden, true);
  assert.equal(ctx.commands()[0][2].ad_storage, "denied");
  const config = ctx.commands().find(command => command[0] === "config")[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
});
test("page query/hash and external referrer path cannot reach GA commands", () => {
  const ctx = setup({ saved: consent("granted") });
  ctx.analytics.updatePage(CURRENT);
  assert.equal(ctx.events("page_view")[0][2].page_location, `https://${HOST}/`);
  assert.equal(ctx.events("page_view")[0][2].page_referrer, "https://example.com");
  assert.ok(!JSON.stringify(ctx.commands()).includes("private"));
});
test("route changes count once; language, registry refresh and hashes do not add views", () => {
  const ctx = setup({ saved: consent("granted") });
  ctx.analytics.updatePage(CURRENT);
  ctx.analytics.updatePage(CURRENT);
  ctx.analytics.updatePage({ ...CURRENT, language: "en" });
  ctx.win.location.pathname = "/install/";
  ctx.analytics.updatePage({ ...CURRENT, title: "Downloads" });
  ctx.win.location.pathname = "/install/index.html";
  ctx.analytics.updatePage(CURRENT);
  ctx.win.location.pathname = "/";
  ctx.analytics.updatePage(CURRENT);
  assert.equal(ctx.events("page_view").length, 3);
  assert.equal(ctx.events("page_view")[1][2].page_referrer, `https://${HOST}/`);
  assert.equal(ctx.events("page_view")[2][2].page_referrer, `https://${HOST}/install`);
});
test("only the current page is measured on late consent, not prior browsing or downloads", () => {
  const ctx = setup();
  ctx.analytics.updatePage(CURRENT);
  ctx.download();
  ctx.win.location.pathname = "/contact";
  ctx.analytics.updatePage(CURRENT);
  ctx.choice("granted");
  assert.equal(ctx.events().length, 1);
  assert.equal(ctx.events()[0][2].page_location, `https://${HOST}/contact`);
});
for (const location of ["home_hero", "install_latest", "release_list", "version_detail"]) {
  test(`download click identifies version and placement: ${location}`, () => {
    const ctx = setup({ saved: consent("granted") });
    ctx.analytics.updatePage(CURRENT);
    ctx.download(ctx.link(INSTALLER, location));
    const event = ctx.events("download_click")[0];
    assert.equal(event[2].app_version, "1.8.0");
    assert.equal(event[2].download_location, location);
    assert.equal(event[2].platform, "macos");
    assert.equal(event[2].architecture, "arm64");
    assert.equal(event[2].file_extension, "dmg");
    assert.equal(event[2].site_language, "ko");
    assert.equal(event[2].send_to, ID);
  });
}
test("legacy local installers remain measurable", () => {
  const ctx = setup({ saved: consent("granted") });
  ctx.analytics.updatePage(CURRENT);
  ctx.download(ctx.link(`https://${HOST}/updates/OS%20Hero-1.2.0-arm64.dmg`, "release_list"));
  assert.equal(ctx.events("download_click")[0][2].app_version, "1.2.0");
});
test("fallback release pages, third-party files, unexpected metadata and cancelled clicks do not count", () => {
  const ctx = setup({ saved: consent("granted") });
  ctx.analytics.updatePage(CURRENT);
  for (const href of ["https://github.com/os-hero/os-hero/releases/latest", "https://example.com/file.dmg", INSTALLER + "?email=private@example.com", INSTALLER.replace("v1.8.0", "v1.7.0"), `https://${HOST}/updates/%ZZ.dmg`]) ctx.download(ctx.link(href));
  ctx.download(ctx.link(INSTALLER, "unexpected-private-value"));
  ctx.download(ctx.link(), { defaultPrevented: true });
  assert.equal(ctx.events("download_click").length, 0);
});
test("middle click counts once; right click does not count", () => {
  const ctx = setup({ saved: consent("granted") });
  ctx.analytics.updatePage(CURRENT);
  const target = { closest: () => ctx.link() };
  ctx.handlers.auxclick({ target, button: 1 });
  ctx.handlers.auxclick({ target, button: 2 });
  assert.equal(ctx.events("download_click").length, 1);
});
test("declining prevents collection and remembers preference", () => {
  const ctx = setup();
  ctx.analytics.updatePage(CURRENT);
  ctx.choice("denied");
  ctx.download();
  assert.equal(ctx.commands().length, 0);
  assert.equal(ctx.scripts.length, 0);
  assert.equal(ctx.notice.hidden, true);
  assert.equal(JSON.parse(ctx.storage.get(CONSENT_KEY)).value, "denied");
});
test("withdrawal blocks events, clears only analytics cookies and reloads", () => {
  const ctx = setup({ saved: consent("granted"), cookies: "_ga=abc; _ga_TEST123456=def; unrelated=keep" });
  ctx.analytics.updatePage(CURRENT);
  ctx.choice("denied");
  ctx.download();
  assert.equal(ctx.win[`ga-disable-${ID}`], true);
  assert.equal(ctx.events("download_click").length, 0);
  assert.equal(ctx.cookieWrites.length, 6);
  assert.ok(ctx.cookieWrites.every(value => !value.includes("unrelated")));
  assert.equal(ctx.reloads(), 1);
});
test("withdrawal in another tab stops this tab too", () => {
  const ctx = setup({ saved: consent("granted") });
  ctx.analytics.updatePage(CURRENT);
  ctx.storage.set(CONSENT_KEY, consent("denied"));
  ctx.windowHandlers.storage({ key: CONSENT_KEY });
  ctx.download();
  assert.equal(ctx.events("download_click").length, 0);
  assert.equal(ctx.reloads(), 1);
});
test("clearing browser preference in another tab fails closed", () => {
  const ctx = setup({ saved: consent("granted") });
  ctx.analytics.updatePage(CURRENT);
  ctx.storage.clear();
  ctx.windowHandlers.storage({ key: null });
  ctx.download();
  assert.equal(ctx.notice.hidden, false);
  assert.equal(ctx.events("download_click").length, 0);
  assert.equal(ctx.reloads(), 1);
});
for (const saved of ["invalid-json", consent("invalid"), JSON.stringify({ value: "granted", at: Date.now() - 181 * 86400000 }), JSON.stringify({ value: "granted", at: Date.now() + 86400000 })]) {
  test(`invalid or expired preference fails closed: ${saved}`, () => {
    const ctx = setup({ saved });
    ctx.analytics.updatePage(CURRENT);
    assert.equal(ctx.scripts.length, 0);
    assert.equal(ctx.notice.hidden, false);
  });
}
for (const options of [{ id: "" }, { id: "UA-12345" }, { host: "localhost" }, { host: "preview.example.com" }, { protocol: "http:" }]) {
  test(`unconfigured, local and insecure sites never send analytics: ${JSON.stringify(options)}`, () => {
    const ctx = setup({ ...options, saved: consent("granted") });
    ctx.analytics.updatePage(CURRENT);
    ctx.choice("granted");
    ctx.download();
    assert.equal(ctx.scripts.length, 0);
    assert.equal(ctx.notice.hidden, true);
    assert.equal(ctx.settings.hidden, true);
  });
}
test("blocked storage does not break rendering or downloads; consent is session-only", () => {
  const ctx = setup({ blockStorage: true });
  ctx.analytics.updatePage(CURRENT);
  ctx.choice("granted");
  ctx.download();
  assert.equal(ctx.events("download_click").length, 1);
});
test("unknown paths are normalized instead of leaking arbitrary path data", () => {
  const ctx = setup({ path: "/personal/private@example.com", saved: consent("granted") });
  ctx.analytics.updatePage(CURRENT);
  assert.equal(ctx.events("page_view")[0][2].page_location, `https://${HOST}/404`);
});
