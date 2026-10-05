# OS Hero Website

This repository hosts the public OS Hero website and the electron-updater generic feed.

- App source repository: https://github.com/os-hero/os-hero
- Website: https://os-hero.github.io/
- Update feed: https://os-hero.github.io/updates/

The root website is a static multilingual Apple Silicon macOS download site. `releases.json` is the release registry; the embedded older records are an offline/error fallback.

Starting with 1.3.0, installers, blockmaps and checksums are immutable GitHub Release assets in the app repository. `updates/latest-mac.yml` retains the original URL used by installed apps and points to those assets. Older installers remain under `updates/` for existing archive links.

The app repository's `scripts/deploy-updates.js` validates version/hash/size and macOS signing/notarization, uploads assets before advancing this compatibility feed, and updates the release registry and version page together. Do not replace published release bytes or move the feed backward; publish a higher corrective version. GitHub Pages deploys from this repository's main branch.
