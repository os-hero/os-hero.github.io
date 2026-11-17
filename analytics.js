(function (root) {
  "use strict";
  const CONSENT_KEY = "osHeroAnalyticsConsentV1";
  const CONSENT_DAYS = 180;
  const LOCATIONS = new Set(["home_hero", "install_latest", "release_list", "version_detail"]);

  function createAnalytics(win, config = {}) {
    const doc = win.document;
    const id = config.measurementId || "";
    const configured = /^G-[A-Z0-9]{6,20}$/.test(id) && win.location.hostname === config.hostname && win.location.protocol === "https:";
    let choice = readConsent();
    let started = false;
    let current = null;
    let lastPath = null;
    let previousLocation = "";
    let initialReferrer = "";
    try { initialReferrer = new URL(doc.referrer).origin; } catch { /* Direct visit. */ }

    function readConsent() {
      try {
        const record = JSON.parse(win.localStorage.getItem(CONSENT_KEY));
        const age = Date.now() - record?.at;
        if (["granted", "denied"].includes(record?.value) && Number.isFinite(age) && age >= 0 && age < CONSENT_DAYS * 86400000) return record.value;
      } catch { /* No consent when storage is unavailable or malformed. */ }
      return null;
    }
    function canonicalPath(pathname) {
      const path = pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
      return /^(\/|\/install|\/contact|\/versions\/\d+\.\d+\.\d+)$/.test(path) ? path : "/404";
    }
    function command() { win.dataLayer.push(arguments); }
    function enabled() { return configured && choice === "granted"; }
    function start() {
      if (started || !enabled()) return;
      started = true;
      win[`ga-disable-${id}`] = false;
      win.dataLayer = win.dataLayer || [];
      command("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      command("consent", "update", { analytics_storage: "granted" });
      command("js", new Date());
      command("config", id, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_domain: config.hostname,
        cookie_expires: CONSENT_DAYS * 86400,
        cookie_update: false,
        cookie_flags: "SameSite=Lax;Secure",
        page_location: `https://${config.hostname}${current?.path || canonicalPath(win.location.pathname)}`,
        page_referrer: initialReferrer
      });
      const script = doc.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.referrerPolicy = "strict-origin";
      doc.head.appendChild(script);
    }
    function event(name, params) {
      if (!enabled()) return;
      start();
      command("event", name, { ...params, send_to: id });
    }
    function viewCurrentPage() {
      if (!enabled() || !current || current.path === lastPath) return;
      const location = `https://${config.hostname}${current.path}`;
      event("page_view", {
        page_location: location,
        page_title: current.title,
        page_referrer: previousLocation || initialReferrer,
        site_language: current.language
      });
      lastPath = current.path;
      previousLocation = location;
    }
    function refreshControls() {
      const notice = doc.getElementById("analytics-notice");
      if (notice) notice.hidden = !configured || choice !== null;
      doc.querySelectorAll("[data-analytics-settings]").forEach(button => { button.hidden = !configured; });
      doc.querySelectorAll("[data-consent-state]").forEach(node => { node.hidden = node.dataset.consentState !== (choice || "unset"); });
    }
    function clearAnalyticsCookies() {
      for (const cookie of doc.cookie.split(";")) {
        const name = cookie.trim().split("=")[0];
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ["", `; Domain=${config.hostname}`, `; Domain=.${config.hostname}`]) {
          doc.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
        }
      }
    }
    function applyChoice(next, persist = true) {
      if (!configured || !["granted", "denied"].includes(next)) return;
      const wasStarted = started;
      choice = next;
      if (persist) {
        try { win.localStorage.setItem(CONSENT_KEY, JSON.stringify({ value: next, at: Date.now() })); } catch { /* Session-only choice. */ }
      }
      if (next === "denied") {
        win[`ga-disable-${id}`] = true;
        clearAnalyticsCookies();
      } else {
        viewCurrentPage();
      }
      refreshControls();
      // A reload fully removes an already-loaded Google tag after withdrawal.
      if (next === "denied" && wasStarted) win.location.reload();
    }
    function trackDownload(link) {
      if (!enabled() || !current || !link || !LOCATIONS.has(link.dataset.downloadLocation)) return;
      let url;
      try { url = new URL(link.href, win.location.href); } catch { return; }
      let match;
      if (url.origin === "https://github.com") {
        match = url.pathname.match(/^\/os-hero\/os-hero\/releases\/download\/v(\d+\.\d+\.\d+)\/OS-Hero-\1-arm64\.dmg$/);
      } else if (url.origin === `https://${config.hostname}`) {
        try { match = decodeURIComponent(url.pathname).match(/^\/updates\/OS[ -]Hero-(\d+\.\d+\.\d+)-arm64\.dmg$/); } catch { return; }
      }
      if (!match || url.search || url.hash) return;
      event("download_click", {
        app_version: match[1],
        platform: "macos",
        architecture: "arm64",
        download_location: link.dataset.downloadLocation,
        file_name: decodeURIComponent(url.pathname.split("/").pop()),
        file_extension: "dmg",
        link_url: url.href,
        page_location: `https://${config.hostname}${current.path}`,
        site_language: current.language
      });
    }
    doc.addEventListener("click", evt => {
      const button = evt.target.closest("[data-analytics-choice], [data-analytics-settings], [data-analytics-close]");
      if (button) {
        const dialog = doc.getElementById("analytics-dialog");
        if (button.hasAttribute("data-analytics-settings")) dialog.showModal();
        else {
          if (button.dataset.analyticsChoice) applyChoice(button.dataset.analyticsChoice);
          if (dialog.open) dialog.close();
        }
        return;
      }
      if (!evt.defaultPrevented && evt.button === 0) trackDownload(evt.target.closest("a[data-download-location]"));
    });
    doc.addEventListener("auxclick", evt => {
      if (!evt.defaultPrevented && evt.button === 1) trackDownload(evt.target.closest("a[data-download-location]"));
    });
    win.addEventListener("storage", evt => {
      if (evt.key !== CONSENT_KEY && evt.key !== null) return;
      const next = readConsent();
      if (next !== choice) {
        if (next) applyChoice(next, false);
        else {
          choice = null;
          win[`ga-disable-${id}`] = true;
          clearAnalyticsCookies();
          refreshControls();
          if (started) win.location.reload();
        }
      }
    });
    return {
      updatePage({ title, language }) {
        current = { path: canonicalPath(win.location.pathname), title, language };
        refreshControls();
        viewCurrentPage();
      }
    };
  }
  if (typeof module === "object" && module.exports) module.exports = { createAnalytics, CONSENT_KEY };
  else root.osHeroAnalytics = createAnalytics(root, root.OS_HERO_ANALYTICS_CONFIG);
})(typeof window === "undefined" ? undefined : window);
