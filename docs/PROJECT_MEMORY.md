# Current Website

As of 2026-11-17, the official site uses the user-selected Adventurer Guild design. The app remains 1.8.0; this is a website-only change, without changing installers, update metadata, app code or user data.

The homepage explains named Hero registration, seven inventory categories and idle RPG growth. The wardrobe opens an actual Inventory screenshot in a native dialog. FAQs document fixed identity, supported Macs, pause conditions and update data preservation. Existing install, contact and version routes use the same shell in three languages.

`releases.json` is the only source of version/download truth. Error handling must never revert to the former hard-coded 1.2.0 installer. Use the live GitHub latest release page when registry loading fails. Keep external download URLs restricted to the app's official GitHub release assets.

Static HTML/CSS/JS, local assets/fonts, no new runtime package. Native product art comes from the released 1.8.0 renderer and QA fixtures. Use `scripts/sync-pages.cjs` after changing the common HTML shell. See `design-qa.md` and `assets/README.md`.

2026-11-18: GA4 property `OS Hero Website` / measurement ID `G-N63FQESCEM` is live. Actual official-site page views and a download click were verified in GA Realtime, including version/location parameters and the download key event. `docs/ANALYTICS.md` describes setup, privacy choices and metric limitations. Stream Enhanced Measurement is off to prevent duplicate page views. Five custom dimensions and a session-counted download key event are configured. Only opted-in visitors are measured; download clicks are not completed downloads or installations. App telemetry/update feeds are untouched. QA traffic is included on the activation date.
