# OS Hero Website

This repository hosts the public OS Hero website and the electron-updater generic feed.

- App source repository: https://github.com/os-hero/os-hero
- Website: https://os-hero.github.io/
- Update feed: https://os-hero.github.io/updates/

The root website is a buildless, multilingual Apple Silicon macOS download site. The November 2026 Guild design uses a full-bleed pixel forest, native Pocket Buddy art, actual 1.8.0 app captures, a wardrobe preview, and product-policy FAQs. Korean, English and Simplified Chinese share the same responsive layout.

`releases.json` is the only release registry. Download buttons, archive entries and release notes use its validated, semantically sorted records. If it cannot load, the site links to GitHub's live latest-release page instead of recommending a bundled obsolete installer. Existing update feeds and installer bytes are not part of website design deployments.

## Development

- Preview: `python3 -m http.server 4174 --bind 127.0.0.1`
- Syntax: `node --check app.js` and `node --check content.js`
- Tests: `node --test tests/*.test.cjs`
- After editing `index.html`: `node scripts/sync-pages.cjs` to update existing deep-link shells and 404.
- No package installation or production runtime dependency is required.
- `content.js`: product copy in three languages. `app.js`: registry, routes and interactions. `styles.css`: responsive visual system.
- Native art refresh: `node scripts/export-product-art.cjs /path/to/released/app/source` using the released app's installed development dependencies. Never export from an experimental renderer or user save.
- Asset provenance and licenses: `assets/README.md`. Browser QA evidence is kept in ignored `review-artifacts/website/`; the review outcome is tracked in `design-qa.md`.

Starting with 1.3.0, installers, blockmaps and checksums are immutable GitHub Release assets in the app repository. `updates/latest-mac.yml` retains the original URL used by installed apps and points to those assets. Older installers remain under `updates/` for existing archive links.

The app repository's `scripts/deploy-updates.js` validates version/hash/size and macOS signing/notarization, uploads assets before advancing this compatibility feed, and updates the release registry and version page together. Do not replace published release bytes or move the feed backward; publish a higher corrective version. GitHub Pages deploys from this repository's main branch.
