# Website Analytics

## Status

2026-11-18: GA4 configured and pre-deployment QA passed. Production deployment/live receipt verification is the remaining activation step.

- Account: The Mercenary (existing account; other properties unchanged).
- Property: `OS Hero Website` (`564792353`), Korea reporting time zone, KRW.
- Web stream: `OS Hero Official Website` (`16360794535`), `https://os-hero.github.io`.
- Measurement ID: `G-N63FQESCEM`.
- Enhanced Measurement off; Google Signals and user-provided data collection left off. No Ads link or API secret created.
- Five event-scoped custom dimensions registered. `download_click` is a key event, once per session, with no monetary default value.
- Event/user data retention set to 2 months; reset on new activity off (GA applies retention setting changes after 24 hours; standard aggregate reports are not subject to this retention control).
- QA: 47 unit tests passed. Isolated browser QA confirmed consent, withdrawal/reload, all four download placements and SPA views. Notice and dialog passed 12 language/viewport combinations (ko/en/zh, 320/390/768/1440), with no horizontal overflow or console errors.

## Activation Checklist

1. Create a dedicated GA4 property, `OS Hero Website`, in the owner's account. Use Asia/Seoul reporting time zone and KRW currency. No Google Ads linking, advertising features or unnecessary data-sharing options.
2. Create a Web stream for `https://os-hero.github.io`, named `OS Hero Official Website`.
3. Turn OFF Enhanced Measurement for this stream. The site explicitly emits page views and download clicks; automatic history-based page views would duplicate the manual events. Keep Google Signals and user-provided data collection off.
4. Set its public `G-...` measurement ID in `analytics-config.js`. No API secret, service-account key, OAuth token or Measurement Protocol endpoint is needed in this repository.
5. Create event-scoped custom dimensions: `app_version`, `platform`, `architecture`, `download_location`, `site_language`. Mark `download_click` as a key event; use once per session for the key-event conversion rate. The ordinary event count still counts every click.
6. Review retention (recommend 2 months for user/event-level exploration data) and property data-sharing settings with the owner. Do not silently enable advertising or additional tracking.
7. Run tests and responsive consent checks. Deploy, verify an opted-in visit and a real installer-link click in GA Realtime/DebugView. Verify a declined fresh session makes no Google tag request. Document any QA traffic and the activation date.

## Metric Definitions

| Need | GA4 metric/event | Meaning |
| --- | --- | --- |
| Visitors | Total users | GA-observed browser/device identities, not verified unique people |
| Visits | Sessions | Visits as defined by GA4 sessionization; use property time zone Asia/Seoul |
| Page views | `page_view` event count | Initial page and actual route changes, once each |
| Download clicks | `download_click` event count | Installer-link activations on this website, including repeat clicks |
| Download conversion | Sessions with `download_click` / measured sessions | Session-level click conversion, not installations |

All metrics cover consenting visitors whose browsers allow the tag. Refusal, blockers and network failures can reduce counts. Do not present GA counts as total downloads or installed users. Historical traffic before activation is unavailable.

GitHub Release asset download counts are a separate aggregate source. They include direct links and potentially updater/repeated requests; they cannot be added to GA click counts or treated as unique installations. No app telemetry is added by this change.

## Event Contract

`page_view`: `page_location`, `page_title`, `page_referrer`, `site_language`. Paths normalize trailing slash and `index.html`. Language changes, registry re-renders, archive pagination and hash/section navigation do not create extra page views. Back/forward between different paths does. Unknown paths become `/404`.

`download_click`: `app_version`, `platform=macos`, `architecture=arm64`, `download_location`, `file_name`, `file_extension=dmg`, `link_url`, `page_location`, `site_language`.

Allowed placements: `home_hero`, `install_latest`, `release_list`, `version_detail`. Only validated official GitHub DMGs and legacy same-site `/updates/` DMGs count. The GitHub latest-release fallback page is NOT a download event. Normal, modifier and middle clicks are supported; right-clicking a context menu is not a download.

## Consent and Data Minimization

- Basic opt-in: no Google script, event or pre-consent browsing replay before acceptance; declining never blocks a download.
- A non-modal notice uses equally prominent Allow/Decline controls in all three languages. Settings remain available in the footer. Escape closes the settings dialog without changing the choice.
- Choice is stored locally for 180 days. Missing/expired/malformed storage means no consent. If storage is blocked, a choice lasts only for the current document.
- Withdrawal disables collection, removes this site's `_ga` cookies and reloads to unload the Google library. Other tabs respond to preference changes.
- Advertising storage, ad personalization and ad user data remain denied. Google Signals is disabled. GA cookie lifetime is 180 days without automatic extension.
- No Hero state, name, email, user ID or form values are sent. URL query/hash values are omitted and external referrers are reduced to origins. This intentionally excludes UTM/click-ID attribution rather than risking arbitrary query data.
- Google still receives standard technical/browser data and network requests after consent. The visible notice links to Google's privacy policy; do not describe cookie analytics as fully anonymous.
- Collection is restricted to HTTPS on `os-hero.github.io`; local, preview, unconfigured or insecure pages never load the tag. API secrets must never be added to the static site.

## Maintenance / Rollback

Run `node --test tests/*.test.cjs`, syntax checks for `analytics.js`, `analytics-config.js`, `app.js`, `content.js`, and `node scripts/sync-pages.cjs` after HTML edits. Never add a second gtag/GTM snippet. Keep stream Enhanced Measurement disabled while this manual routing implementation is in use.

`node tests/analytics-preview.cjs` serves an isolated QA harness at `http://127.0.0.1:4175`: actual site code, a fake production-location facade, intercepted Google-script insertion and a blocking CSP. Its visible event log is test evidence, NOT proof of Google receipt. The reset control clears only the harness-origin consent. Stop this temporary server after QA. Ordinary local previews keep analytics disabled. The app's release deployment copies the current root HTML shell into new version pages, preserving this integration.

To stop collection on subsequent page loads, clear the measurement ID and redeploy. It does not retroactively delete data already held in GA or stop a previously loaded tab until it reloads. App installers, release registry and automatic-update feed are independent and must remain unchanged.

## Official References

- [Manual page views](https://developers.google.com/analytics/devguides/collection/ga4/views?technology=websites)
- [Single-page applications](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
- [Enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en)
- [Basic consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic)
