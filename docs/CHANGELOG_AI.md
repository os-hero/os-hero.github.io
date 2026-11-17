# Website Changes

## 2026-11-18 (GA4 Integration)

- Prepared opt-in GA4 page views and version/placement-specific `download_click` events, with Korean/English/Chinese privacy controls.
- Added production-host gating, duplicate route-view prevention, sanitized URLs and consent withdrawal with cookie cleanup.
- Configured a dedicated OS Hero GA4 property/stream, five custom dimensions and session-counted download key event. Preserved other account properties and app update feeds.
- Fixed initial analytics titles on direct version-page entry and sanitized invalid version paths.
- 47 automated tests passed; consent UI passed 12 language/viewport combinations and browser flows. Production deployment/live receipt verification is the remaining activation step.

## 2026-11-17

- Replaced the old split-card homepage with the selected forest/guild game-site design and actual Pocket Buddy product assets.
- Updated Korean, English and Simplified Chinese product copy to the current registration, seven-slot wardrobe and idle-loot system.
- Added responsive navigation, inventory screenshot dialog, policy FAQ and mobile-friendly release archive.
- Removed obsolete 1.2.0 error fallback, validated/sorted release records and escaped registry text before rendering.
- Kept official download/update feeds and historical release assets unchanged; no app build or user-data migration.
