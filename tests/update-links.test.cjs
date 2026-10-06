const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../app.js"), "utf8");
const legacy = JSON.parse(fs.readFileSync(path.join(__dirname, "../releases.json"), "utf8"));
const latest = legacy[0];

async function render(route, language, records) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { innerHTML: "", value: "", addEventListener() {}, focus() {} });
    return elements.get(id);
  };
  const context = {
    document: { documentElement: {}, querySelectorAll: () => [], getElementById: element, addEventListener() {} },
    window: { location: { pathname: route }, localStorage: { getItem: () => language }, addEventListener() {} },
    navigator: { language, platform: "MacIntel" },
    fetch: async () => ({ ok: true, json: async () => records }),
    AbortController, setTimeout, clearTimeout, console: { warn() {} }
  };
  vm.runInNewContext(source, context);
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
  const html = await render("/versions/1.2.0", "ko", [latest, ...legacy]);
  assert.ok(html.includes("/updates/OS%20Hero-1.2.0-arm64.dmg"));
});
test("malformed registry falls back to bundled release information", async () => {
  const html = await render("/", "ko", [{ version: "broken" }]);
  assert.ok(html.includes("1.2.0"));
});
