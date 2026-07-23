# Handoff: Wedding Invitation Collage Hero (Section 1)

## Overview
This is a wedding invitation single-page web app. The handoff focuses on **Section 1 — the title hero**: a full-viewport photo collage that animates into place on scroll, with a center main photo flanked by 22 supporting cards in a varied CSS Grid. After the collage assembles, a "dynamic island" navigation appears.

The rest of the page (sections 2–4: gallery, location, account info, calendar registration) is included unchanged for context but the design work in this handoff was scoped to Section 1.

## About the Design Files
The files in this bundle are a **working HTML/CSS/JS prototype** that doubles as a design reference. They're hand-written, framework-free, and use GSAP + ScrollTrigger for animation. They render correctly in any modern browser as-is.

When porting into a target codebase, the goal is to **recreate the visual layout, animation choreography, and interaction behavior** using that codebase's existing patterns (React/Vue/Svelte/etc.) and component conventions — not to copy the HTML/CSS verbatim. The grid math, animation timing, and tile placement decisions are the design intent; the specific selectors and global CSS rules are implementation details.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, grid placements, and animation timings are all dialed in. The developer should match pixel-level grid positions, gap sizing, and the per-card start positions for the assembly animation.

## Screens / Views

### Section 1 — Title Collage Hero

- **Purpose**: Opening hero of the wedding invitation. Photos fly in from off-screen, assemble into a full-viewport collage centered on the couple's main photo, and the title fades in. After the user scrolls past the assembled state, a dynamic-island nav appears.

- **Layout**: Full viewport (`100vw × 100vh`), pinned during scroll via GSAP ScrollTrigger.
  - Container: `.s1-gallery-container` is a CSS Grid: `grid-template-columns: repeat(10, minmax(0, 1fr))`, `grid-template-rows: repeat(6, minmax(0, 1fr))`, `gap: var(--s1-gap)`, `padding: var(--s1-gap)`.
  - The grid `gap` and the container `padding` use the same token so spacing between cards equals spacing from cards to viewport edge.
  - `grid-auto-flow: dense` lets variable-span tiles pack tightly.

- **Components**:
  - **Main photo wrapper** (`.s1-main-wrapper`): grid area `column 4 / span 4`, `row 2 / span 4` (4×4 cells in the center). Holds the main photo (`.s1-main`, `object-fit: cover`) and the title overlay (`.s1-title`, "Byunghoon & Hyeonji"). `border-radius: var(--radius-card)` (16px), `overflow: hidden`.
  - **22 supporting photos** (`.collage-photo`), each placed by class:

    | Class | Grid column | Grid row | Span shape |
    |---|---|---|---|
    | photo-l1 | 1 / span 2 | 1 | 2×1 (wide) |
    | photo-l2 | 3 | 1 / span 2 | 1×2 (tall) |
    | photo-l3 | 4 / span 2 | 1 | 2×1 |
    | photo-l4 | 6 / span 2 | 1 | 2×1 |
    | photo-l5 | 8 | 1 / span 2 | 1×2 |
    | photo-l6 | 9 / span 2 | 1 | 2×1 |
    | photo-l7 | 1 / span 2 | 2 | 2×1 |
    | photo-r1 | 9 / span 2 | 2 | 2×1 |
    | photo-r2 | 1 | 3 / span 2 | 1×2 |
    | photo-r3 | 2 / span 2 | 3 | 2×1 |
    | photo-r4 | 8 | 3 / span 2 | 1×2 |
    | photo-r5 | 9 / span 2 | 3 | 2×1 |
    | photo-r6 | 2 / span 2 | 4 | 2×1 |
    | photo-r7 | 9 / span 2 | 4 | 2×1 |
    | photo-t1 | 1 / span 2 | 5 | 2×1 |
    | photo-t2 | 3 | 5 | 1×1 |
    | photo-t3 | 8 | 5 | 1×1 |
    | photo-t4 | 9 / span 2 | 5 | 2×1 |
    | photo-b1 | 1 / span 2 | 6 | 2×1 |
    | photo-b2 | 3 / span 2 | 6 | 2×1 |
    | photo-b3 | 5 / span 3 | 6 | 3×1 (under main) |
    | photo-b4 | 8 / span 3 | 6 | 3×1 |

    Each photo: `width: 100%; height: 100%; min-width: 0; min-height: 0; object-fit: cover; border-radius: var(--radius-card)`.

  - **Dynamic Island nav** (`.dynamic-island`): floating pill nav, slides in from the top after the collage completes (`is-ready` class on `#section-1`). Holds 4 buttons: "우리의 이야기", "오시는 길", "마음 전하실 곳", "일정 등록".

  - **Tweaks panel** (`#tweaks-panel`): floating bottom-right panel, hidden by default, toggled by host edit-mode protocol. Sliders for: card count (6–22), gap (0–3vh), main image scale (0.6–1.3×), animation speed (0.3–2×).

- **Typography**:
  - Title (`.s1-title`): `font-family: var(--font-serif)` (Anthropic Serif → Georgia fallback), positioned absolutely bottom-left of the main wrapper, 8cqw inset.
  - Body/UI: `var(--font-sans)` (Inter → system).

- **Colors**: Parchment `#f5f4ed` background, Near-black `#141413` text, Olive gray `#5e5d59` secondary, Terracotta `#c96442` brand accent, Border cream `#f0eee6`.

## Interactions & Behavior

### Assembly animation (GSAP timeline pinned to `.s1-visual`)
Triggered by ScrollTrigger; scrub-driven. Duration of the timeline: ~5–6 units; `pin: true`, `scrub: 1`.

1. **Initial state**: each `.collage-photo` is offset off-screen via `gsap.set(photo, { x, y })`. Each card's start position is **chosen to match its final grid position direction** so it never crosses over the main image:
   - Top-row cards (l1, l3, l4, l6) start above viewport: `y: -130vh ~ -150vh`, small `x` offset.
   - Bottom-row cards (b1–b4) start below: `y: +130vh ~ +160vh`.
   - Left-side cards (l2, l7, r2, r3, r6, t1, t2) start left of viewport: `x: -125vw ~ -160vw`, with `y` offset matching their row.
   - Right-side cards (l5, r1, r4, r5, r7, t3, t4) start right of viewport: `x: +125vw ~ +160vw`.

   Exact array is in `script.js` `startPositions`.

2. **Assemble**: each photo animates `{ x: 0, y: 0, duration: 5, ease: 'power2.inOut' }` starting at timeline t=0.5.

3. **Title fade**: `tl.to(titleEl, { opacity: 0, duration: 1.5 }, 3.5)` — title fades after assembly.

4. **Lift**: at t=4.0, the whole gallery container lifts: `tl.to(galleryContainer, { y: "-=10vh", duration: 3.5 })`.

5. After timeline completes, `#section-1` gets class `is-ready` → main wrapper becomes clickable; dynamic island slides in.

### Click interactions
- **Main photo click** (when `is-ready`): opens fullscreen lightbox (`.s1-lightbox`) with the main photo.
- **Supporting card click**: opens lightbox with that card's photo.
- **Lightbox close**: `#s1-lb-close` button or click on backdrop dim layer.

### Hover
- When hovering any `.collage-photo`, the other cards dim (lower opacity / desaturate). Logic in `script.js` near the collage hover handler.

### Tweaks panel (host edit-mode protocol)
- Page posts `{ type: '__edit_mode_available' }` to parent on init.
- On `{ type: '__activate_edit_mode' }` from parent, panel becomes visible.
- On slider change, applies value live AND posts `{ type: '__edit_mode_set_keys', edits: { key: val } }` so host can persist.
- Defaults are wrapped in `/*EDITMODE-BEGIN*/{ ... }/*EDITMODE-END*/` markers in `script.js`.

## State Management
- `is-ready` class on `#section-1`: set by ScrollTrigger when assembly animation completes. Gates: main click handler, dynamic-island visibility.
- Lightbox open/close state: managed via class toggles on `.s1-lightbox` and `.s1-lb-dim`.
- Tweaks state: `tweakState` object in `script.js`, hydrated from `TWEAK_DEFAULTS` JSON block.

## Design Tokens

```css
--color-bg: #f5f4ed;            /* Parchment */
--color-text-primary: #141413;  /* Near black */
--color-text-secondary: #5e5d59;/* Olive gray */
--color-text-muted: #87867f;    /* Stone gray */
--color-brand: #c96442;         /* Terracotta */
--color-border: #f0eee6;        /* Border cream */

--font-serif: 'Anthropic Serif', 'Georgia', serif;
--font-sans: 'Inter', -apple-system, system-ui, sans-serif;

--radius-card: 16px;
--radius-pill: 9999px;
--radius-button: 8px;
--radius-large: 24px;

--shadow-warm: 0 0 0 1px #d1cfc5;
--shadow-whisper: rgba(0,0,0,0.05) 0 4px 24px;

/* Section 1 collage tokens (desktop ≥600px) */
--s1-gap: 1.0vh;
--s1-main-scale: 1.0;
/* mobile fallbacks adjust ch/cw — see :root in style.css */
```

## Assets
- Photos: `photos/Section 1/01.jpeg ~ 08.jpeg` — main photo is `01.jpeg`, supporting cards reuse `02–08.jpeg` (each appears multiple times across the 22 supporting slots; in production replace with 22 distinct photos).
- Section 3 photos referenced by gallery section: `photos/Section 3/01.webp ~ 07.jpeg`.
- Fonts: Anthropic Serif (system fallback to Georgia), Inter (system fallback).
- GSAP + ScrollTrigger loaded via CDN from `<head>` of `index.html`.

## Files in this handoff

- `index.html` — page markup (all 4 sections, but Section 1 is the focus)
- `style.css` — all styles. Section 1 grid rules live around the comment block "확장된 콜라쥬 그리드 (Apple info 스타일)".
- `script.js` — GSAP timeline, ScrollTrigger setup, `startPositions` array, lightbox handlers, tweaks panel logic.

## Implementation notes for the developer

1. **Grid math**: 10 cols × 6 rows = 60 cells. Main photo = 16 cells (4×4). The remaining 44 cells are filled by 22 tiles with varied spans (1×1, 2×1, 1×2, 3×1). Every cell is occupied — no holes. Use `minmax(0, 1fr)` on both column and row tracks; without `minmax(0, …)` the intrinsic size of `<img>` children blows out the grid.

2. **Per-card start positions for assembly**: critical for the design intent. Each card flies in **from the side of the viewport its grid cell sits on**, never crossing the main image. The full mapping is in `script.js` `startPositions` array — preserve ordering by class name (l1…l7, r1…r7, t1…t4, b1…b4).

3. **Pin behavior**: Section 1 occupies more scroll height than its visual height (via ScrollTrigger pin) so the assembly animation has scroll runway. When porting to React, use `@gsap/react` or refactor to a Framer Motion equivalent — the choreography (which card animates when, with which ease) is what matters.

4. **Responsive**: the CSS variables flip at the 600px breakpoint. Below 600px, the main image becomes proportionally larger and the surrounding tiles may clip — the design is desktop-first.

5. **Tweaks panel** is a development affordance, not a production feature. Strip it (and the `__edit_mode_*` postMessage handlers) when shipping.
