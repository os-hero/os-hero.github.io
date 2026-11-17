# Website Deployment Log

## 2026-11-17 (Asia/Seoul): Adventurer Guild redesign

- Site: https://os-hero.github.io/
- Website implementation commit: `a98a108a89bace4def70933d51cf16a1d313efa4`.
- GitHub Pages deployment: https://github.com/os-hero/os-hero.github.io/actions/runs/44077745661 (successful).
- Public macOS release remains **1.8.0**, Apple Silicon, macOS 12+. The immutable DMG URL returned HTTP 200.
- Website-only deployment: no changes to `releases.json`, `updates/latest-mac.yml`, existing installers, app runtime or saved user data.
- QA: both JavaScript syntax checks, 18 unit tests, 60 multilingual responsive route/viewport combinations passed. Visual comparison against selected second concept passed after mobile contrast and spacing fixes.
- Post-deploy: 15 public files returned HTTP 200 and matched local bytes, including root/installation/contact/release shells, JS/CSS, registry/feed and primary images. Evidence: ignored `review-artifacts/website/public-verification.json`.
- Actual public browser checks: Korean desktop and mobile render, mobile navigation, release detail and current download link passed. No console errors/warnings. Screenshots: `published-desktop.jpg`, `published-mobile.jpg`, combined `published-preview.jpg` in the same review directory.
- Temporary localhost server stopped, test tab closed, viewport override reset and computer-use runtime released. No packages/services were installed.
- Rollback: revert the website implementation commit and redeploy Pages. Do not move the app update feed backwards or replace published release bytes.
