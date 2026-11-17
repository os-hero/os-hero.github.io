// Isolated browser QA: real site/analytics code, a fake window and no Google traffic.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".ttf": "font/ttf" };
const harness = `
(() => {
  const module = { exports: {} };
  ${fs.readFileSync(path.join(root, "analytics.js"), "utf8")}
  const output = document.createElement('pre');
  output.id = 'analytics-qa-log';
  output.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere;padding:20px;font:12px monospace;';
  document.body.appendChild(output);
  const reset = document.createElement('button');
  reset.textContent = 'Reset QA consent';
  reset.addEventListener('click', () => { localStorage.removeItem('osHeroAnalyticsConsentV1'); location.reload(); });
  document.body.appendChild(reset);
  const commands = [], scripts = [];
  function refresh() { output.textContent = JSON.stringify({ scripts, commands }, null, 2); }
  commands.push = function (...items) { const n = Array.prototype.push.apply(this, items.map(item => Array.from(item))); refresh(); return n; };
  const fakeDocument = new Proxy(document, { get(target, key) {
    if (key === 'head') return { appendChild(script) { scripts.push(script.src); refresh(); } };
    const value = target[key];
    return typeof value === 'function' ? value.bind(target) : value;
  }});
  const fakeWindow = {
    document: fakeDocument,
    localStorage: window.localStorage,
    addEventListener: window.addEventListener.bind(window),
    dataLayer: commands,
    location: {
      hostname: 'os-hero.github.io', protocol: 'https:',
      get pathname() { return window.location.pathname; },
      get href() { return 'https://os-hero.github.io' + window.location.pathname; },
      reload() { window.location.reload(); }
    }
  };
  window.osHeroAnalytics = module.exports.createAnalytics(fakeWindow, { hostname: 'os-hero.github.io', measurementId: 'G-TEST123456' });
  document.addEventListener('click', event => { if (event.target.closest('a[data-download-location]')) event.preventDefault(); });
  refresh();
})();`;

http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://127.0.0.1").pathname;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  if (pathname === "/analytics.js") {
    res.setHeader("Content-Type", "text/javascript; charset=utf-8");
    res.end(harness);
    return;
  }
  let filename;
  try { filename = path.resolve(root, `.${decodeURIComponent(pathname)}`); } catch { res.writeHead(400).end(); return; }
  if (!filename.startsWith(root + path.sep) && filename !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename = path.join(filename, "index.html");
  if (!fs.existsSync(filename)) filename = path.join(root, "404.html");
  res.setHeader("Content-Type", (types[path.extname(filename)] || "application/octet-stream") + "; charset=utf-8");
  fs.createReadStream(filename).pipe(res);
}).listen(4175, "127.0.0.1", () => console.log("Analytics QA (Google requests blocked): http://127.0.0.1:4175"));
