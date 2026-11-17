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

## GA4 Analytics

- Configure the real property and disable Enhanced Measurement before activation; verify no duplicate gtag/GTM snippets.
- No Google network requests before consent or after a declined fresh load; local/preview/HTTP/unconfigured builds remain disabled.
- Opt-in emits one view for the current route, not a replay of previous browsing. Reload, SPA navigation and browser back/forward behave correctly. Registry/language/pagination/hash changes must not inflate views.
- Home, archive latest/rows and version detail emit `download_click` with correct version and placement; fallback GitHub release links do not count.
- Analytics failure/blocking must not delay or prevent download navigation.
- Settings, Allow, Decline and withdrawal are translated, keyboard-accessible and fit 320px and desktop screens. Both choices remain equally visible.
- Withdrawal removes only analytics cookies, reloads, and propagates across tabs. Blocked storage must not crash the site.
- Confirm live receipt in GA Realtime/DebugView separately from mocked unit tests. Record activation date and QA traffic; never claim completed downloads/installations from click events.
