const fs = require("node:fs");
const path = require("node:path");
const source = path.resolve(process.argv[2] || "../oshero");
const output = path.resolve(__dirname, "../assets/product");
const { defaultCharacter, equipItem } = require(path.join(source, "src/shared/catalog"));
const { renderCharacterBuffer, renderTrayCharacterBuffer, renderItemDataUrl } = require(path.join(source, "src/main/pixelRenderer"));
fs.mkdirSync(output, { recursive: true });
let hero = equipItem(equipItem(defaultCharacter(), "princess_hair"), "trail_sword");
fs.writeFileSync(path.join(output, "hero.png"), renderCharacterBuffer(hero, 0, 1));
fs.writeFileSync(path.join(output, "menu-hero.png"), renderTrayCharacterBuffer(hero, 0, { platform: "darwin", scaleFactor: 2 }));
for (const id of ["meadow_crown", "moon_coat", "leaf_cape", "firefly_lantern"]) {
  fs.writeFileSync(path.join(output, `${id}.png`), Buffer.from(renderItemDataUrl(id).split(",")[1], "base64"));
  hero = equipItem(hero, id);
}
fs.writeFileSync(path.join(output, "hero-equipped.png"), renderCharacterBuffer(hero, 0, 1));
fs.copyFileSync(path.join(source, "public/assets/grass-slime.png"), path.join(output, "slime.png"));
fs.mkdirSync(path.resolve(__dirname, "../assets/fonts"), { recursive: true });
for (const file of ["PressStart2P-Regular.ttf", "OFL.txt"]) {
  fs.copyFileSync(path.join(source, "public/assets/fonts/press-start-2p", file), path.resolve(__dirname, "../assets/fonts", file));
}
console.log("Exported native product sprites and licensed brand font.");
