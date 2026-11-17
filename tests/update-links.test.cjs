const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../app.js"), "utf8");
const content = fs.readFileSync(path.join(__dirname, "../content.js"), "utf8");
const legacy = JSON.parse(fs.readFileSync(path.join(__dirname, "../releases.json"), "utf8"));
const latest = legacy[0];

async function render(route, language, records) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { innerHTML: "", value: "", addEventListener() {}, focus() {}, setAttribute() {}, classList: { remove() {} } });
    return elements.get(id);
  };
  const context = {
    document: { documentElement: {}, querySelectorAll: () => [], querySelector: element, getElementById: element, addEventListener() {} },
    window: { location: { pathname: route, hash: "" }, localStorage: { getItem: () => language }, addEventListener() {} },
    navigator: { language, platform: "MacIntel" },
    fetch: async () => ({ ok: true, json: async () => records }),
    AbortController, setTimeout, clearTimeout, console: { warn() {} }
  };
  vm.runInNewContext(`${content}\n${source}`, context);
  await new Promise(resolve => setImmediate(resolve));
  return element("app").innerHTML;
}

for (const language of ["ko", "en", "zh"]) {
  for (const route of ["/", "/install", `/versions/${latest.version}`]) {
    test(`${language} ${route} links to the immutable latest GitHub installer`, async () => {
      const html = await render(route, language, legacy);
      assert.ok(html.includes(latest.downloads.mac));
      assert.ok(html.includes(latest.version));
    });
  }
}
test("previous signed version retains its own immutable installer", async () => {
  const previous = legacy.find(record => record.version !== latest.version && record.downloads?.mac?.startsWith("https://github.com/"));
  assert.ok(previous);
  const html = await render(`/versions/${previous.version}`, "ko", legacy);
  assert.ok(html.includes(previous.downloads.mac));
});
test("legacy version download keeps its original Pages URL", async () => {
  const html = await render("/versions/1.2.0", "ko", legacy);
  assert.ok(html.includes("/updates/OS%20Hero-1.2.0-arm64.dmg"));
});
test("malformed registry directs to live GitHub latest, never a bundled old installer", async () => {
  const html = await render("/", "ko", [{ version: "broken" }]);
  assert.ok(html.includes("https://github.com/os-hero/os-hero/releases/latest"));
  assert.ok(!html.includes("1.2.0"));
});
test("unsorted registry still chooses highest semantic version", async () => {
  const html = await render("/", "en", [...legacy].reverse());
  assert.ok(html.includes(latest.downloads.mac));
});
test("registry refuses external installer URLs", async () => {
  const poisoned = structuredClone(legacy);
  poisoned[0].downloads.mac = "https://example.com/malware.dmg";
  const html = await render("/install", "en", poisoned);
  assert.ok(!html.includes("malware"));
  assert.ok(html.includes("data-retry"));
});
test("release copy is escaped before insertion", async () => {
  const records = structuredClone(legacy);
  records[0].copy.en.notes.push('<img src=x onerror="alert(1)">');
  const html = await render(`/versions/${latest.version}`, "en", records);
  assert.ok(html.includes("&lt;img"));
  assert.ok(!html.includes('<img src=x'));
});
test("all translations provide the same keys", () => {
  const context = {};
  vm.runInNewContext(`${content};globalThis.copy=messages;`, context);
  const keys = Object.keys(context.copy.en).sort();
  for (const locale of ["ko", "zh"]) assert.deepEqual(Object.keys(context.copy[locale]).sort(), keys);
});
test("unknown route does not silently become an existing page", async () => {
  const html = await render("/install/wrong", "en", legacy);
  assert.ok(html.includes("Page not found"));
});
test("every entry point uses current shared shell", () => {
  const root = path.join(__dirname, "..");
  const shell = fs.readFileSync(path.join(root, "index.html"), "utf8");
  for (const target of ["404.html", "install/index.html", "contact/index.html", ...legacy.map(r => `versions/${r.version}/index.html`)]) {
    assert.equal(fs.readFileSync(path.join(root, target), "utf8"), shell, target);
  }
});
