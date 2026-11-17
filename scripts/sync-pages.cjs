const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const targets = ["404.html", "install/index.html", "contact/index.html", ...fs.readdirSync(path.join(root, "versions")).map(version => `versions/${version}/index.html`)];
for (const file of targets) fs.writeFileSync(path.join(root, file), html);
console.log(`Synchronized ${targets.length} existing route shells.`);
