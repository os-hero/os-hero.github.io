# Website assets

- `guild-forest.webp`: standalone background produced with built-in ImageGen for the user-selected Adventurer Guild concept, 2026-11-17. 1536 x 1024, WebP quality 88. It is promotional scenery, not a gameplay screenshot.
- Generation prompt: match the selected website's lush pixel forest clearing, sunlit cyan sky and mossy stone arch on the right, lantern and foreground path; keep the left half naturally dark and quiet for white HTML copy. Crisp pixel clusters, no blur, no gradient overlay, no text, UI, character or creature. Reference: selected second concept from the November 17 design review. The generated PNG is retained in the local Codex image library; this WebP is the deployed asset.
- `product/hero.png`, `hero-equipped.png`, `menu-hero.png`, item thumbnails: exported through the OS Hero 1.8.0 native renderer at app source commit `1483f1291fb782d88e83ecbccd190b5623376f30`. Source character: default body, princess hair and trail sword; equipped variant adds meadow crown, moon coat, leaf cape and firefly lantern. Both share one identity. Original 24px canvas and transparency are retained.
- `product/exploration.png`, `product/inventory.png`: signed 1.8.0 QA fixture screenshots, not a real user's private profile. They show the actual released app.
- `product/slime.png`, `guild-frame.webp`: existing OS Hero production assets, reused without redrawing.
- `social-preview.jpg`: browser-rendered English website preview, not a fictional app screen.
- `fonts/PressStart2P-Regular.ttf`: existing app font, SIL Open Font License, included as `fonts/OFL.txt`.
- `icons/*.svg`: Lucide official source (`https://github.com/lucide-icons/lucide/tree/main/icons`), downloaded 2026-11-17 and served locally. ISC license included as `icons/LICENSE`. No JavaScript icon runtime or new production dependency.
- Legacy `app-icon.png` remains for old external links but is no longer used as the homepage character.
