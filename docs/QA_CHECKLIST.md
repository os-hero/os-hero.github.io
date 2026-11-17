# Website Release Checks

- Run both JS syntax checks and `node --test tests/*.test.cjs`.
- Verify latest GitHub public release equals the first semantically sorted registry release; test the immutable DMG URL.
- Test registry unavailable/malformed behavior: link to GitHub latest, never an older bundled installer.
- Test Korean, English and Simplified Chinese home/archive/version/contact at 320, 390, 768 and 1440px; add 600, 850, 1003 and 1920px for homepage.
- Verify no document overflow, missing images, clipped CTA or hero overlap. Check mobile menu, language persistence, archive pagination, hash navigation, FAQ, dialog keyboard dismissal and focus.
- Inspect screenshot and native asset identity against the actual released app, plus browser console.
- Confirm all existing HTML entry points use the shared shell and old release links are intact.
- Verify `updates/latest-mac.yml`, `releases.json` and installer bytes are unchanged for website-only deployments.
- After push, wait for successful Pages deployment; inspect public desktop/mobile and compare public asset bytes with the committed files.
