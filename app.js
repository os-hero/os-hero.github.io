const LATEST_RELEASE_URL = "https://github.com/os-hero/os-hero/releases/latest";
const DOWNLOAD_PREFIX = "https://github.com/os-hero/os-hero/releases/download/";
const PAGE_SIZE = 6;
let releases = [];
let registryStatus = "loading";
let page = 1;
let language = getInitialLanguage();

function normalizeLanguage(value) {
  const lower = String(value || "").toLowerCase();
  if (lower.startsWith("ko")) return "ko";
  if (lower.startsWith("zh")) return "zh";
  if (lower.startsWith("en")) return "en";
  return null;
}
function getInitialLanguage() {
  try {
    const saved = window.localStorage.getItem("osHeroLanguage");
    if (Object.hasOwn(messages, saved)) return saved;
  } catch { /* Privacy modes may disable local storage. */ }
  for (const candidate of navigator.languages || [navigator.language]) {
    const locale = normalizeLanguage(candidate);
    if (locale) return locale;
  }
  return "en";
}
function t(key, replacements = {}) {
  let value = messages[language][key] || messages.en[key] || key;
  for (const [name, replacement] of Object.entries(replacements)) value = value.replace(`{${name}}`, replacement);
  return value;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function getReleaseCopy(release) { return release.copy[language] || release.copy.en; }
function validDownload(file) {
  return typeof file === "string" && (/^OS[ -]Hero-\d+\.\d+\.\d+-arm64\.dmg$/.test(file) ||
    /^https:\/\/github\.com\/os-hero\/os-hero\/releases\/download\/v\d+\.\d+\.\d+\/OS-Hero-\d+\.\d+\.\d+-arm64\.dmg$/.test(file));
}
function validRegistry(records) {
  return Array.isArray(records) && records.length > 0 && new Set(records.map(r => r?.version)).size === records.length && records.every(record =>
    /^\d+\.\d+\.\d+$/.test(record?.version) && Number.isFinite(Date.parse(record.releasedAt)) && validDownload(record.downloads?.mac) &&
    ["ko", "en", "zh"].every(locale => typeof record.copy?.[locale]?.summary === "string" &&
      Array.isArray(record.copy[locale].notes) && record.copy[locale].notes.every(note => typeof note === "string")));
}
function compareVersions(a, b) {
  const aa = a.version.split(".").map(Number), bb = b.version.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (aa[i] !== bb[i]) return bb[i] - aa[i];
  return 0;
}
function fileUrl(file) { return file.startsWith(DOWNLOAD_PREFIX) ? file : `/updates/${encodeURIComponent(file)}`; }
function formatDate(value) {
  return new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : language === "zh" ? "zh-CN" : "en-US", {
    year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Seoul"
  }).format(new Date(value));
}
function icon(name, extra = "") { return `<img class="icon ${extra}" src="/assets/icons/${name}.svg" width="22" height="22" alt="">`; }
function downloadButton(release, location = "version_detail") {
  return `<a class="button" href="${release ? fileUrl(release.downloads.mac) : LATEST_RELEASE_URL}" ${release ? `download data-download-location="${location}"` : ""}>${icon("download")}${t(release ? "download" : "download.latest")}</a>`;
}
function latestNotesUrl() { return releases[0] ? `/versions/${releases[0].version}` : LATEST_RELEASE_URL; }
function requirements(release) { return `${release ? `v${release.version} · ` : ""}${t("download.requirements")}`; }
function registryMessage() {
  return `<div class="registry-notice" role="status"><p>${t(registryStatus === "error" ? "error.registry" : "error.loading")}</p>${registryStatus === "error" ? `<button class="text-link" data-retry>${t("error.retry")}</button>` : ""}</div>`;
}
function renderLayout(content, title) {
  document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  document.title = title ? `${title} | OS Hero` : t("meta.title");
  document.querySelector('meta[name="description"]').content = t("meta.description");
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = t("meta.description");
  document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
  document.getElementById("languageSelect").value = language;
  document.getElementById("languageSelect").setAttribute("aria-label", t("nav.language"));
  document.querySelector(".menu-toggle").setAttribute("aria-label", t("nav.menu"));
  document.querySelector(".dialog-close").setAttribute("aria-label", t("close"));
  document.querySelector("[data-analytics-close]")?.setAttribute("aria-label", t("close"));
  document.getElementById("app").innerHTML = content;
  document.getElementById("footer").innerHTML = `<div class="inner footer-inner"><a class="brand" href="/"><img class="pixel" src="/assets/product/hero.png" width="32" height="32" alt=""><span class="brand-text">OS Hero</span></a><nav aria-label="Footer"><a href="${latestNotesUrl()}">${t("footer.notes")}${releases[0] ? ` (v${releases[0].version})` : ""}</a><a href="/install">${t("footer.archive")}</a><a href="/contact">${t("footer.contact")}</a><button class="footer-link" type="button" data-analytics-settings hidden>${t("analytics.settings")}</button></nav><small>© ${new Date().getFullYear()} ${t("footer.copyright")}</small></div>`;
  document.querySelectorAll("[data-retry]").forEach(button => button.addEventListener("click", loadReleases));
  window.osHeroAnalytics?.updatePage({ title: document.title, language });
}
function renderHome() {
  const latest = releases[0];
  renderLayout(`
    <section class="hero" aria-labelledby="hero-title">
      <img class="hero-background" src="/assets/guild-forest.webp" width="1536" height="1024" fetchpriority="high" alt="">
      <div class="inner hero-inner"><div class="hero-copy">
        <h1 id="hero-title">OS Hero</h1><p class="hero-headline">${t("hero.headline")}</p><p class="hero-lead">${t("hero.lead")}</p>
        ${downloadButton(latest, "home_hero")}<p class="download-context">${requirements(latest)}</p>
      </div><img class="hero-character pixel" src="/assets/product/hero.png" width="240" height="240" alt="${t("hero.image")}">
      <div class="menu-demo"><img class="pixel" src="/assets/product/menu-hero.png" width="39" height="26" alt=""><span>OS Hero</span>${icon("wifi")}${icon("battery")}<span class="sr-only">${t("hero.menubar")}</span></div></div>
    </section>
    <a class="release-band" href="${latestNotesUrl()}"><div class="inner"><strong>${latest ? t("release.label", { version: latest.version }) : t("nav.updates")}</strong><span>${latest?.version === "1.8.0" || !latest ? t("release.features") : escapeHtml(getReleaseCopy(latest).summary)}</span>${icon("arrow-right")}</div></a>
    <section class="section game-section" id="game"><div class="inner">
      <h2>${t("game.title")}</h2><div class="game-layout"><figure class="game-figure"><img class="app-capture" src="/assets/product/exploration.png" width="760" height="600" loading="lazy" alt="${t("game.screenshot")}"></figure>
      <div class="game-features">${[["register", "hero.png"], ["wardrobe", "moon_coat.png"], ["adventure", "slime.png"]].map(([key, image]) => `<article class="game-feature"><img class="pixel" src="/assets/product/${image}" width="54" height="54" loading="lazy" alt=""><div><h3>${t(`game.${key}.title`)}</h3><p>${t(`game.${key}.body`)}</p></div></article>`).join("")}
      <p class="play-policy">${t("game.policy")}</p></div></div>
    </div></section>
    <section class="section wardrobe-section" id="wardrobe"><div class="inner">
      <h2>${t("wardrobe.title")}</h2>
      <div class="wardrobe-line"><div class="gear-line">${["meadow_crown", "moon_coat", "leaf_cape", "firefly_lantern"].map(id => `<img class="pixel" src="/assets/product/${id}.png" width="64" height="64" loading="lazy" alt="${t(`item.${id}`)}" title="${t(`item.${id}`)}">`).join("")}</div>
      <div class="outfit-pair"><img class="pixel" src="/assets/product/hero.png" width="104" height="104" loading="lazy" alt="${t("hero.image")}"><img class="pixel" src="/assets/product/hero-equipped.png" width="104" height="104" loading="lazy" alt="${t("wardrobe.image")}"></div>
      <button class="text-link wardrobe-open" type="button">${t("wardrobe.preview")}${icon("arrow-right")}</button></div>
    </div></section>
    <section class="section faq-section"><div class="inner faq-layout"><h2>${t("faq.title")}</h2><div>${["install", "identity", "progress", "update"].map(key => `<details><summary>${t(`faq.${key}.q`)}</summary><p>${t(`faq.${key}.a`)}</p></details>`).join("")}</div></div></section>
  `);
  document.querySelector(".wardrobe-open").addEventListener("click", () => document.getElementById("inventory-dialog").showModal());
}
function renderInstall() {
  const count = Math.max(1, Math.ceil(releases.length / PAGE_SIZE));
  page = Math.max(1, Math.min(page, count));
  renderLayout(`<section class="section document-section"><div class="inner"><div class="page-head"><div><p class="eyebrow">OS Hero</p><h1>${t("install.title")}</h1><p class="lead">${t("install.description")}</p></div><div>${downloadButton(releases[0], "install_latest")}<p class="requirements">${requirements(releases[0])}</p></div></div>
    ${!releases.length ? registryMessage() : `<div class="release-list">${releases.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(release => `<article class="release-row"><div class="release-version"><a href="/versions/${release.version}"><h2>v${release.version}</h2></a><time datetime="${escapeHtml(release.releasedAt)}">${formatDate(release.releasedAt)}</time></div><p>${escapeHtml(getReleaseCopy(release).summary)}</p><div class="release-actions"><a class="text-link" href="/versions/${release.version}">${t("install.notes")}${icon("arrow-right")}</a><a class="small-link" href="${fileUrl(release.downloads.mac)}" download data-download-location="release_list">${icon("download")}macOS</a></div></article>`).join("")}</div><nav class="pagination" aria-label="${t("nav.updates")}"><button id="prevPage" ${page === 1 ? "disabled" : ""}>${t("install.previous")}</button><span>${t("install.page", { page, total: count })}</span><button id="nextPage" ${page === count ? "disabled" : ""}>${t("install.next")}</button></nav>`}
    </div></section>`, t("install.title"));
  document.getElementById("prevPage")?.addEventListener("click", () => { page--; renderInstall(); document.getElementById("app").focus({ preventScroll: true }); });
  document.getElementById("nextPage")?.addEventListener("click", () => { page++; renderInstall(); document.getElementById("app").focus({ preventScroll: true }); });
}
function renderVersion(version) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) { renderNotFound(); return; }
  if (!releases.length) { renderLayout(`<section class="section"><div class="inner">${registryMessage()}${downloadButton()}</div></section>`, t("detail.title", { version })); return; }
  const release = releases.find(item => item.version === version);
  if (!release) { renderNotFound(); return; }
  const copy = getReleaseCopy(release);
  renderLayout(`<section class="section document-section"><div class="inner"><a class="text-link back-link" href="/install">${t("detail.back")}</a><div class="detail-layout"><article><h1>${t("detail.title", { version })}</h1><p class="release-date">${t("detail.updated", { date: formatDate(release.releasedAt) })}</p><p class="lead">${escapeHtml(copy.summary)}</p><h2 class="notes-heading">${t("detail.notes")}</h2><ul class="release-notes">${copy.notes.map(note => `<li>${escapeHtml(note)}</li>`).join("")}</ul></article><aside class="download-panel"><h2>${t("detail.downloads")}</h2>${downloadButton(release)}<p class="requirements">${requirements(release)}</p></aside></div></div></section>`, t("detail.title", { version }));
}
function renderContact() {
  renderLayout(`<section class="section document-section"><div class="inner"><p class="eyebrow">OS Hero</p><h1>${t("contact.title")}</h1><p class="lead">${t("contact.description")}</p><dl class="contact-list"><div><dt>${t("contact.developer")}</dt><dd>${t("developer")}</dd></div><div><dt>${t("contact.email")}</dt><dd><a href="mailto:themercenary@duck.com">themercenary@duck.com</a></dd></div><div><dt>${t("contact.copyright")}</dt><dd>© ${new Date().getFullYear()} The Mercenary. All rights reserved.</dd></div></dl></div></section>`, t("contact.title"));
}
function renderNotFound() { renderLayout(`<section class="section document-section"><div class="inner"><h1>${t("notFound.title")}</h1><a class="button" href="/">${t("notFound.home")}</a></div></section>`, t("notFound.title")); }
function renderRoute() {
  const parts = window.location.pathname.replace(/\/index\.html$/, "/").split("/").filter(Boolean);
  if (!parts.length) renderHome();
  else if (parts.length === 1 && parts[0] === "install") renderInstall();
  else if (parts.length === 1 && parts[0] === "contact") renderContact();
  else if (parts.length === 2 && parts[0] === "versions") renderVersion(parts[1]);
  else renderNotFound();
}
function closeMenu() {
  document.querySelector(".site-header").classList.remove("menu-open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
}
function scrollToRoute() {
  const id = window.location.hash.slice(1);
  const target = id && document.getElementById(id);
  if (target) target.scrollIntoView({ block: "start" });
  else window.scrollTo({ top: 0 });
}
function navigate(url) {
  const samePage = window.location.pathname === url.pathname;
  window.history.pushState({}, "", `${url.pathname}${url.hash}`);
  if (!samePage) renderRoute();
  closeMenu();
  scrollToRoute();
  if (!url.hash) document.getElementById("app").focus({ preventScroll: true });
}
document.getElementById("languageSelect").addEventListener("change", event => {
  language = event.target.value;
  try { window.localStorage.setItem("osHeroLanguage", language); } catch { /* Keep language for this page session. */ }
  renderRoute();
});
document.querySelector(".menu-toggle").addEventListener("click", () => {
  const open = document.querySelector(".site-header").classList.toggle("menu-open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", String(open));
});
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
document.querySelector(".dialog-close").addEventListener("click", () => document.getElementById("inventory-dialog").close());
document.getElementById("inventory-dialog").addEventListener("click", event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
document.addEventListener("click", event => {
  const link = event.target.closest("a[href]");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute("download") || link.target === "_blank") return;
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin || !/^https?:$/.test(url.protocol) || url.pathname.startsWith("/updates/")) return;
  if (link.classList.contains("skip-link")) return;
  event.preventDefault();
  navigate(url);
});
window.addEventListener("popstate", () => { renderRoute(); closeMenu(); scrollToRoute(); });
async function loadReleases() {
  if (registryStatus === "fetching") return;
  registryStatus = "fetching";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch("/releases.json", { cache: "no-cache", signal: controller.signal });
    if (!response.ok) throw new Error("Release registry unavailable");
    const records = await response.json();
    if (!validRegistry(records)) throw new Error("Invalid release registry");
    releases = records.slice().sort(compareVersions);
    registryStatus = "ready";
  } catch (error) {
    registryStatus = "error";
    console.warn("Release registry:", error.message);
  } finally { clearTimeout(timer); }
  renderRoute();
  if (window.location.hash) scrollToRoute();
}
renderRoute();
loadReleases();
