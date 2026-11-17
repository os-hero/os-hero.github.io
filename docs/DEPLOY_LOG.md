# Website Deployment Log

## 2026-11-18 (Asia/Seoul): Consent-based GA4 activation

- Site: https://os-hero.github.io/
- Implementation commit: `b9ceba457304aeb72b34e38509154dbe260bb8d3`.
- GitHub Pages deployment: https://github.com/os-hero/os-hero.github.io/actions/runs/44122970885 (successful).
- GA property `OS Hero Website` (`564792353`), web stream `16360794535`, measurement ID `G-N63FQESCEM`. Five custom dimensions, session-counted `download_click` key event, 2-month user/event retention, advertising/Enhanced Measurement disabled.
- QA: 47 tests, 12 responsive consent language/viewport combinations, four download placements and manual route-view checks passed. Public root/config/tracker/app/translations/CSS returned HTTP 200 and matched the implementation bytes.
- Live Realtime verification: home, installation archive and 1.8.0 detail views; one `download_click` and one download key event. Download parameters confirmed `app_version=1.8.0`, `download_location=home_hero`. Captured four page views include QA navigation/reload traffic, not organic visits.
- Public consent checks passed: no tag before consent/after refusal; correct G-ID after acceptance; withdrawal reload removes the tag. No browser console errors/warnings. Standard reports and stream status may lag behind Realtime.
- Evidence (ignored): `review-artifacts/analytics/ga4-live-receipt.jpg`, `live-verification.json`, `responsive.json`, `consent-mobile.jpg`.
- Temporary server on 4175 stopped, QA tabs closed, viewport reset, browser runtime released, and the single test-downloaded DMG removed. No packages/services installed. GA report retained for the owner.
- Website-only: app version remains 1.8.0; `releases.json`, update feed, installers, app runtime and user data unchanged. Disable new collection by clearing the measurement ID and redeploying; see `docs/ANALYTICS.md` for rollback limitations.

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
