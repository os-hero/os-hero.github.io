# Guild Website Design QA

final result: passed

## Source and comparison

- Selected visual truth: `/Users/chungbok/.codex/generated_images/019e89a6-a4a1-74e1-b718-1970ba5fc805/exec-82afe8f4-b8f8-4dbe-8208-518006af9e33.png` (second displayed concept, Adventurer Guild), 1003 x 1568 pixels.
- Implementation: `review-artifacts/website/home-comparison-final.jpg`, 1003 x 2051 pixels. In-app browser viewport 1018 x 800 CSS px, 15px scrollbar excluded by capture, density 1. No image stretching; content width equals the source's 1003px.
- State: Korean homepage, registry loaded, menu closed, FAQ collapsed, no modal.
- Full-view comparison: `review-artifacts/website/comparison-full-final.jpg`, source and implementation in the same input.
- Focused comparison: `review-artifacts/website/comparison-hero-final.jpg`, both top 720px regions side by side. Actual app screenshots and native item assets inspected separately at their native resolution.
- Additional evidence: `desktop-final.jpg`, `desktop-viewport.jpg`, `mobile-final.jpg`, `archive-320-ko.jpg`, `release-320-ko.jpg`, `inventory-modal-390.jpg`, under the same review directory.

## Findings and iteration history

1. P1: initial focus selector outlined every anchor. Replaced it with explicit `:focus-visible` selectors. Browser reload confirmed only focused controls show the ring.
2. P2: bright mobile sky reduced white-copy readability. Changed mobile background positioning to keep the dark forest behind the copy; character and CTA remain separate. `mobile-final.jpg` confirms the corrected view.
3. P2: wardrobe band was too tall and hero too far right relative to the reference. Reduced band padding, removed unnecessary secondary copy, brought the hero inward, aligned the product screenshot at the top and restored actual guild-frame decoration. The final combined comparisons confirm the revision.
4. The tablet paragraph box intersected the sprite's box even though glyphs did not. Bounded the metadata width and reran all home sizes; no text/control box intersects the hero now.
5. No remaining actionable P0/P1/P2 findings.

## Required fidelity surfaces

- Typography: real app Press Start 2P for the brand only; readable native Korean/English/Chinese sans for content. Hero, section and compact headings have separate scales. No viewport-scaled fonts or negative tracking. No clipped text at checked sizes.
- Layout: full-bleed environment, overlaid editable title, primary download, release band, real exploration screen, wardrobe band. Mobile uses a disclosure navigation and single-column content; archive rows stack without horizontal scrolling.
- Color: deep forest, gold trim, white/green-neutral content and coral CTA match the selected direction. Coral is darker than the image reference for readable white CTA text. Visible keyboard focus retained.
- Imagery: generated environment matches the selected scene; actual native 24px character/items and signed screenshots replace the AI mock's approximated product art. Source images are not stretched into a different aspect ratio. CSS `image-rendering: pixelated` is used for sprites.
- Content: current 1.8.0 registration, fixed identity, seven inventory slots, eight stages, gold/XP/loot and pause policy verified against release notes. No offline reward, Intel/Windows/mobile download or multiplayer claims. Three languages include localized developer names.

## Behavioral QA

- 18 Node tests passed: current/previous/legacy download links, registry errors, sort order, external URL rejection, escaped release copy, translation parity, unknown routes, synchronized deep-link shells.
- 24 homepage combinations: 3 languages x widths 320, 390, 600, 768, 850, 1003, 1440, 1920. No horizontal overflow, missing visible image or hero/text overlap. `responsive-results.json` records the result.
- 36 route combinations: archive, 1.8.0 notes and contact x 3 languages x widths 320, 390, 768, 1440. All pass. `routes-results.json` records the result.
- Mobile menu open/close and hash navigation, archive next/previous, release-detail navigation, inventory modal and Escape, FAQ expansion, language persistence tested in the actual browser.
- Browser console checked: no errors/warnings on the normal paths.
- Public deployment also verified: 15 served files matched local bytes; desktop/mobile homepage and release navigation passed at https://os-hero.github.io/. See `docs/DEPLOY_LOG.md`.

## Intentional differences and limits

- FAQ adds page height beyond the image reference to communicate supported Macs, identity locking, pause behavior and data preservation. It does not displace the selected first-screen composition.
- Product screenshots and sprites use the actual released art, not the AI mock's approximate pixel shapes. The interface in captured product images is Korean, while surrounding website copy is localized.
- No physical iPhone/Android or separate Safari/Firefox device test was performed. Responsive checks are browser viewport tests, not a claim of all-device certification.
- No CSS idle imitation was added: the web artwork is static and does not alter or misrepresent the app's native breathing rig.

## Implementation checklist

- [x] Match selected visual direction with actual product assets.
- [x] Confirm current release and immutable download URL.
- [x] Preserve installed-app feed and historical installers.
- [x] Check three languages and mobile/desktop layouts.
- [x] Compare full page and hero region after fixes.
- [x] Keep keyboard navigation, responsive dialog and reduced-motion support.
