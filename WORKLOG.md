# Work Log — Sovereign Media Website

> Reverse chronological. Most recent session first. Claude reads this at session start for context continuity.

---

## 2026-02-19 — ProjectTimeline Major Fixes & PortalCard Expand Button Fix

### Changes
- **Framer Motion transform override fix**: Discovered that Framer Motion wipes CSS `transform` (e.g., `translateX(-50%)`) on animated `motion.div` elements after animation completes, resetting to `transform: none`. Fix: use plain `<div>` wrappers for positioning transforms, nest `<motion.div>` inside for animations only.
- **SVG diagonal connector lines**: Replaced fixed-height div connectors with SVG `<line>` elements. Supports diagonal lines when cards are offset from dots due to overlap resolution. Future-proof for adding more milestones.
- **Overlap resolution algorithm**: Added `resolveOverlaps()` function that groups same-side milestones, converts % positions to px, pushes overlapping cards apart left-to-right, then clamps right edge. Fixes April/May below-card overlap.
- **Full year range (JAN–DEC 2026)**: Extended `TIMELINE_RANGE` from Feb–Oct to Jan–Dec. 12 month labels evenly spaced.
- **Month tick marks**: Added 14px tall, 1.5px wide tick marks at each month position on the track line.
- **Track line extends full width**: Track line runs from left edge to right edge (JAN to DEC), no gradient fade.
- **IPO dot color changed to green**: IPO milestone uses `var(--color-success)` (#00CC66) instead of white.
- **Sequential chronological animation**: All timeline elements now load in order — track line draws first, ticks appear left-to-right, milestones appear chronologically, NOW indicator appears last. Uses `getChronoOrder()` for sorted delay indices.
- **Connector visibility fix**: Increased stroke from 1px blue at 0.2 opacity → 1.5px white at 0.35 opacity (0.6 on hover). Connectors are now clearly visible.
- **PortalCard expand/collapse button fix**: The `animate={{ rotate: 180 }}` was on the entire button container including the "Collapse" text, causing it to appear upside down. Moved rotation to only wrap the `<ChevronDown>` icon.

### Files Modified
- `src/components/widgets/ProjectTimeline.tsx` — Major rewrite: SVG connectors, overlap resolution, sequential animation, full year range, tick marks, green IPO, visible connectors
- `src/components/portal/PortalCard.tsx` — Fixed expand/collapse button rotation (only rotate chevron icon, not text)

### Decisions
- Used plain `<div>` wrappers for CSS transforms with nested `<motion.div>` for animations — this pattern avoids the Framer Motion transform override bug
- SVG lines chosen over div-based connectors to support diagonal angles when cards are offset from dots
- White connector lines instead of blue — more visible against dark background, matches design system's "white is the voice" principle
- Container uses `ResizeObserver` for accurate width measurement instead of hardcoded 960px

---

## 2026-02-19 — ProjectTimeline Widget & Integration

### Changes
- **ProjectTimeline widget**: Built horizontal milestone timeline with animated track draw-in, status-based dot styling (completed=green, in-progress=pulse, upcoming=ring, company=white), alternating above/below labels, NOW diamond indicator with blue pulse
- **Responsive design**: HorizontalTimeline for desktop (md+), VerticalTimeline for mobile with chronological stacking
- **TIMELINE_MILESTONES data**: 5 milestones — Engagement Initiated (Feb 2026), Dashboards (Apr 2026), 3D Animation (May 2026), Marketing Videos (May 2026), IPO (Sep 2026). All data in editable array at top of file.
- **ClientPortal template extended**: Added `afterHeroSections` prop/slot between Hero and Overview sections
- **Showcase registry**: Registered ProjectTimeline component with lazy import

### Files Modified
- `src/components/widgets/ProjectTimeline.tsx` — New: full timeline component (~350 lines)
- `src/components/portal/ClientPortal.tsx` — Added afterHeroSections slot
- `src/app/frontieras-work/page.tsx` — Added ProjectTimelineSection wrapper, passed via afterHeroSections prop
- `src/components/showcase/registry.ts` — Registered ProjectTimeline

### Decisions
- Timeline positioned AFTER hero and BEFORE Overview/Scope of Work for maximum visibility
- Used separate horizontal/vertical components rather than CSS-only responsive to keep logic clean
- NOW indicator uses date comparison to position between milestones dynamically

---

## 2026-02-19 — Reg A+ Financial Calculator Widget

### Changes
- **RegACalculator widget**: Built full interactive two-tab financial calculator with premium custom-styled sliders, animated metric cards, comparison bar chart, and IPO scenario modeling
- **Tab 1 — Reg A+ Performance**: ROAS slider (5-12x), SM investment ($100K-$500K), performance fee (5-30%). Calculates baseline vs optimized ad spend, shares preserved, equity value, net savings, ROI multiplier. Animated horizontal bar chart comparison.
- **Tab 2 — IPO Impact**: Share price impact slider ($0-$10/share), 3 scenario cards (Conservative/Base Case/Aggressive), market cap impact calculations, value creation ratio callout, Reg A+ connection blockquote.
- **Pill-shaped tab toggle**: Uses Framer Motion `layoutId` for smooth active indicator animation between tabs.
- **Custom slider CSS**: Added to globals.css — white 16px thumb with blue glow on hover/active, transparent track, cross-browser support (webkit + moz).
- **ClientPortal template extended**: Added `afterPricingSections` prop/slot between Pricing and Timeline sections.
- **FINANCIAL_CONSTANTS**: All financial assumptions defined in a single object at top of component file for easy editing.

### Files Modified
- `src/components/widgets/RegACalculator.tsx` — New: full calculator component (~500 lines)
- `src/components/widgets/_meta.ts` — New: showcase registry metadata
- `src/components/portal/ClientPortal.tsx` — Added `afterPricingSections` prop and slot
- `src/app/frontieras-work/page.tsx` — Imports calculator, renders via afterPricingSections
- `src/styles/globals.css` — Added `.slider-input` custom range input styles

### Decisions
- Calculator is a standalone widget in `src/components/widgets/` (not showcase) since it's tightly coupled to Frontieras financial data
- Used pure CSS/HTML for bar chart instead of a charting library — keeps bundle small and matches design system
- Financial constants in a single object for easy client-specific adjustment
- Added `afterPricingSections` slot to template rather than rearranging section order, keeping the template composable

---

## 2026-02-19 — UI Polish, DNS Setup, Auth Flow Overhaul

### Changes
- **StatusBadge animated glow**: Active statuses (In Development, Completed, Under Review, Ongoing) now pulse with color-matched border + boxShadow animation via Framer Motion. Fixed white border bug by moving to fully inline styles.
- **Deliverables & Outcomes row redesign**: Larger text, more padding, expand/collapse button moved to right side with "Expand"/"Collapse" label, count badge with border.
- **Work Log collapsible date groups**: Each month is now its own collapsible section with blue date headers, entry count badges, and nested expand/collapse. First group opens by default.
- **Work Log timeline styling**: Connector line changed from gray to subtle blue (`rgba(0,102,255,0.15)`), dots have blue glow, task bullets use blue-tinted dots.
- **Timeline dot clipping fix**: Added `pl-1` and `ml-1` to prevent dots from being cut off by `overflow-hidden` on AnimatePresence container.
- **Text contrast improvements**: Upgraded collapsible row labels and badges from `text-tertiary` to `text-secondary`, dividers from `border-subtle` to `border-default`.
- **Removed duplicate divider**: ProgressBar had a bottom divider that doubled up with Deliverables section divider.
- **Investment & Pricing label**: Added section label above price, reduced price font from `text-2xl/3xl` to `text-lg/xl`.
- **Access Granted animation overhaul**: Removed full-screen green flash. Now shows inline "Access Granted" text below password input with green dot, subtle glow, then smooth 1.2s fade to homepage.
- **DNS configuration**: Added A record (`@ → 76.76.21.21`) and CNAME record (`www → cname.vercel-dns.com`) on Squarespace DNS for sovereignmedia.io pointing to Vercel.
- **Dashboards progress**: Updated from 20% to 35%.

### Files Modified
- `src/components/portal/StatusBadge.tsx` — Full rewrite: inline animated styles
- `src/components/portal/PortalCard.tsx` — Deliverables row, pricing label, expand button
- `src/components/portal/WorkLog.tsx` — Collapsible date groups, blue timeline
- `src/components/portal/ProgressBar.tsx` — Removed duplicate divider
- `src/app/page.tsx` — Inline Access Granted, removed granted stage
- `src/data/portals/frontieras.ts` — Progress 20→35%

### Decisions
- Password gate is active and separate from client portal auth (different cookies)
- Domain sovereignmedia.io now points to Vercel via Squarespace DNS
- Auto-deploy on every change (build → commit → push → Vercel auto-deploys)

---

## 2026-02-18 — Portal Card Restructure, Spacing, Date Grouping

### Changes
- **Card structure redesign**: Header changed from clickable expand to static. Added labeled "Deliverables & Outcomes" collapsible section following WorkLog pattern.
- **Section spacing tightened**: PageSection padding reduced (`py-20 md:py-28` → `py-12 md:py-16`), hero padding reduced.
- **"Scope of Work" renamed to "Projects"** in ClientPortal.tsx.
- **WorkLog date grouping**: Entries grouped by date using `useMemo`, date header shown once per group.
- **Per-deliverable pricing**: Added `pricing` field to Deliverable type and frontieras dashboards data.

### Files Modified
- `src/components/portal/PortalCard.tsx` — Major restructure
- `src/components/portal/ClientPortal.tsx` — Spacing, label rename
- `src/components/portal/WorkLog.tsx` — Date grouping
- `src/data/portals/frontieras.ts` — Pricing data
- `src/types/portal.ts` — Added pricing to Deliverable interface

---

## Pre-2026-02-18 — Foundation

### Summary
- Component system extraction (portal components)
- Access Granted animation (original green flash version)
- Frosted glass card design
- Password gateway implementation (splash → password → granted → main)
- Client portal template system (PortalConfig → ClientPortal)
- Frontieras portal data and page
