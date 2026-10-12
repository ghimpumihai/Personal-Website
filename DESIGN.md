---
name: Ștefan Ghimpu — Engineering Portfolio & Technical Blog
description: Architectural field guide and engineering specification folio on warm cotton drafting paper with oxidized copper ink and 1px hairline grids.
colors:
  paper: "#F6F2EA"
  paper-elevated: "#EFE9DD"
  paper-card: "#FAF7F1"
  ink: "#1E1B18"
  ink-muted: "#4A443E"
  copper: "#9A3E20"
  copper-soft: "rgba(154, 62, 32, 0.10)"
  hairline: "#D8D0C1"
  hairline-strong: "#B8AE9C"
  grid-line: "rgba(30, 27, 24, 0.042)"
  dark-paper: "#161412"
  dark-paper-elevated: "#1F1C19"
  dark-paper-card: "#24201D"
  dark-ink: "#EAE3D5"
  dark-ink-muted: "#B8AEA0"
  dark-copper: "#E07A56"
  dark-copper-soft: "rgba(224, 122, 86, 0.14)"
  dark-hairline: "#2E2925"
  dark-hairline-strong: "#463E38"
typography:
  display:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Azeret Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: "0.05em"
    fontFeature: "tnum"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.paper-card}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.copper}"
  button-tertiary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  chip-spec:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  chip-filter-active:
    backgroundColor: "{colors.copper-soft}"
    textColor: "{colors.copper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  card-plate:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Ștefan Ghimpu — Engineering Portfolio & Technical Blog

## Overview

**Creative North Star: "The Architectural Field Guide & Plan"**

This system frames Ștefan Ghimpu’s engineering portfolio and technical blog as an open architectural specification manual drafted on warm cotton paper. Rather than relying on decorative gradients, floating cards, or dark-neon developer clichés, the interface organizes production history, system topologies, and long-form engineering essays into a continuous hairline-ruled sheet. Every section reads like a verified plate in a single technical folio—calm, low-glare, and structured for rapid inspection by engineers and hiring managers.

Typography and geometry do the structural work. Editorial serif headings (`Spectral`) establish intellectual weight and human authorship, neutral neo-grotesque body copy (`Public Sans`) sustains effortless reading across architectural case studies, and tabular monospace labels (`Azeret Mono`) anchor revision stamps, plate coordinates, and technology tags. Surfaces sit flush against shared 1px rules on a subtle 56px drafting grid, transitioning smoothly between Warm Cream paper by default and a low-glare Soft Espresso dark mode.

**Key Characteristics:**
- Continuous `1360px` architectural sheet bounded by 1px structural hairlines over a `56px × 56px` drafting grid canvas
- Zero-radius (`0px`), zero-shadow geometry where hierarchy comes from tonal paper shifts and shared cell borders
- Tri-voice typography pairing editorial `Spectral` headings, `Public Sans` prose, and tabular `Azeret Mono` specification stamps
- Single-accent Oxidized Copper ink (`#9A3E20` light / `#E07A56` dark) reserved for active nodes, primary actions, schematic connectors, and plate indices
- Built-in schematic diagrams and specification plates that present backend, IoT, and distributed systems architecture directly in the DOM

## Colors

The palette pairs three warm, low-glare drafting-paper tones with deep espresso inks and a single oxidized copper drafting accent, mirrored in a warm charcoal dark mode.

### Primary
- **Oxidized Copper Ink** (`#9A3E20`): Primary accent ink (`--accent-copper`) used for primary CTA fills, active navigation indicators, schematic flow arrows, plate/log codes (`PLT-01`, `LOG 01`, `FIG 1.0`), list markers, and focus outlines.
- **Soft Copper Wash** (`rgba(154, 62, 32, 0.10)`): Translucent wash (`--accent-copper-soft`) applied as the background fill for active navigation cells, selected theme filters, monogram stamps (`ȘG`), and active system nodes.
- **Warm Terracotta Ink (Dark Mode)** (`#E07A56`): Lifted copper accent (`--accent-copper` under `html.dark`) calibrated for legibility against dark espresso surfaces.
- **Dark Copper Wash (Dark Mode)** (`rgba(224, 122, 86, 0.14)`): Translucent active-state wash (`--accent-copper-soft` under `html.dark`) for selected cells and badges in dark mode.

### Neutral
- **Warm Cotton Paper** (`#F6F2EA`): Primary page ground (`--bg-paper`) and recessed tag/input surface, eliminating harsh white glare.
- **Elevated Drafting Stone** (`#EFE9DD`): Secondary structural ground (`--bg-elevated`) used for section header bands, specification sidebars, schematic wells, and footer frames.
- **Specification Plate Cream** (`#FAF7F1`): Brightest sheet surface (`--bg-card`) used for sticky navigation bars, project/experience cells, and article reading plates.
- **Deep Espresso Ink** (`#1E1B18`): Primary text color (`--ink-primary`) for headings, article body copy, and primary specification values.
- **Muted Walnut Ink** (`#4A443E`): Secondary text color (`--ink-muted`) for summaries, subtitles, inactive navigation links, and metadata captions.
- **Subtle Architectural Hairline** (`#D8D0C1`): Standard 1px internal cell divider (`--line-subtle`) separating grid items, header/footer rows, and tag borders.
- **Strong Structural Hairline** (`#B8AE9C`): Outer frame and major section divider (`--line-strong`) bounding the `1360px` sheet and primary specification plates.
- **Drafting Grid Line** (`rgba(30, 27, 24, 0.042)`): Ultra-faint 1px rule (`--grid-line`) forming the `56px × 56px` background drafting grid on `body`.
- **Soft Espresso Ground, Elevated & Card (Dark Mode)** (`#161412` / `#1F1C19` / `#24201D`): Three-tier dark mode paper hierarchy (`--bg-paper`, `--bg-elevated`, `--bg-card`) with `#EAE3D5` parchment primary ink, `#B8AEA0` muted ink, and `#2E2925` / `#463E38` dark hairlines.

### Named Rules
**The Single Copper Trace Rule.** Oxidized Copper (`#9A3E20` / `#E07A56`) is the sole chromatic accent in the entire system. Never introduce secondary status hues, syntax-highlighting rainbows, or decorative gradients; all emphasis, state changes, and schematic vectors run through copper ink and its translucent wash.

**The Low-Glare Paper Rule.** Pure white (`#FFFFFF`) and pure black (`#000000`) are never used for surfaces or text. Every light and dark surface must resolve to the warm cotton/stone or espresso/charcoal token triad so long-form reading remains effortless.

## Typography

**Display Font:** Spectral (with Georgia, serif fallback)
**Body Font:** Public Sans (with system-ui, sans-serif fallback)
**Label/Mono Font:** Azeret Mono (with monospace fallback)

**Character:** Editorial authority meets precision engineering telemetry. `Spectral` brings literary warmth to titles and section headers, `Public Sans` delivers clean geometric legibility in dense technical descriptions, and `Azeret Mono` supplies crisp, tabular blueprint indexing.

### Hierarchy
- **Display** (`400` regular with `600` copper emphasis span, `clamp(2.25rem, 4vw, 3.4rem)` / `text-4xl sm:text-5xl lg:text-[3.4rem]`, line-height `1.12`, tracking `-0.025em`): Hero thesis statement (`h1` on `/`) and primary page headers (`text-4xl sm:text-5xl`).
- **Headline** (`400` regular, `2.25rem` / `text-3xl sm:text-4xl`, line-height `1.2`, tracking `-0.025em`): Section header banners (`Experience & Education`, `Technical Toolkit`, `Featured Projects`).
- **Title** (`600` semibold, `1.5rem` / `text-2xl`, line-height `1.33`): Specification cell titles, project plate titles, experience role titles, and sidebar headings; `1.25rem` (`text-xl`) for footer column titles.
- **Body** (`400` regular, `1rem` / `16px` base expanding to `1.125rem` / `18px` in hero leads and long-form articles, line-height `1.625` / `leading-relaxed` on summaries and `2rem` / `leading-8` on article prose): Constrained to `64ch–70ch` max measure for optimal reading rhythm.
- **Label** (`500` medium / `600` semibold, `0.75rem` / `12px`, line-height `1.33`, letter-spacing `0.05em` / `tracking-wider`, `font-variant-numeric: tabular-nums`): Navigation links, section coordinates (`SEC 01 // 4 MILESTONES`), plate codes (`PLT-01`), log stamps, and technology tags.

### Named Rules
**The Tabular Coordinate Rule.** Every code stamp, date, count, coordinate, and navigation item uses `Azeret Mono` at `12px` (`text-xs`) with `font-variant-numeric: tabular-nums` so numbers and indices align vertically across rows and specification plates.

**The Unstacked Heading Rule.** Section headings (`h1`, `h2`) never carry a small uppercase eyebrow stacked directly above them; section index metadata (`SEC 01 // ...`) sits at the opposite end of the header bar aligned to the baseline (`sm:flex-row sm:items-baseline justify-between`).

## Layout

The layout operates as a single bounded architectural sheet centered in the viewport over a `56px × 56px` drafting grid (`background-size: 56px 56px`).

- **Sheet Frame:** `main`, header inner wrapper, and footer inner wrapper share `mx-auto w-full max-w-[1360px] border-x border-hairline-strong`. Long-form article reading views (`Blog/[slug]`) nest a centered `max-w-4xl` (`896px`) container inside the sheet with `px-6 py-10 sm:px-10 md:py-14`.
- **Asymmetric Split Ratios:**
  - **Hero Split (`/`):** `lg:grid-cols-[1.25fr_0.95fr]` — left column holds the thesis, CTAs, and 6-node interactive selector (`p-6 sm:p-10 md:p-14`); right column holds `FIG 1.0 — ENGINEER SPECIFICATION` on `--bg-elevated` (`p-6 sm:p-10 md:p-12`).
  - **Project Detail Split (`/projects/[slug]`):** `lg:grid-cols-[1.35fr_0.65fr]` — left column holds title, media/topology plate, and architectural prose; right rail holds tech stack, repository links, and the plate switcher.
  - **Blog Archive Split (`/blog`):** `lg:grid-cols-[1fr_320px]` — left column holds chronological article plates (`divide-y divide-hairline`); right rail holds the sticky (`lg:sticky lg:top-24`) theme filter panel.
- **Flush Cell Grids:** Experience (`md:grid-cols-2`), Skills (`lg:grid-cols-3`), and Featured Projects (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) use zero grid gap (`gap-0`). Cells sit flush against one another and are divided by 1px `border-b` and conditional `border-r` hairlines (`border-hairline`).
- **Section Header Band:** Every major section opens with a full-width elevated bar (`border-b border-hairline-strong bg-paper-elevated px-6 py-7 sm:px-10 md:px-14`) pairing the `Spectral` heading and subtitle on the left with the `Azeret Mono` section coordinate on the right.
- **Responsive Breakpoints:** Collapses cleanly to a single-column vertical sheet below `768px` (`md`) and `1024px` (`lg`). At mobile (`390px`), the header exposes a 5-column quick-jump strip (`grid-cols-5`) plus a collapsible slide-down blueprint index drawer.

## Elevation & Depth

This system is strictly flat (`box-shadow: none`) and forbids drop shadows, blurs, or glassmorphism. Depth and hierarchy are communicated exclusively through **three-step tonal paper layering** and **two-weight 1px hairlines**:

1. **Recessed Canvas (`--bg-paper`):** Base page ground, code/tag chips inside cards, and schematic row cells.
2. **Structural Tray (`--bg-elevated`):** Section header strips, right-hand specification sidebars, diagram canvases, and the site footer.
3. **Foreground Plate (`--bg-card`):** Primary content cards, sticky header bar, engineer specification plate, and article containers.

### Named Rules
**The Zero-Shadow Drafting Rule.** Never apply `box-shadow`, `drop-shadow`, or `backdrop-filter: blur()` to any element. Elevation is achieved by nesting `--bg-card` plates inside `--bg-elevated` trays with a `1px solid var(--line-strong)` border, or recessing `--bg-paper` tags inside `--bg-card` containers.

**The Sheet Reveal Motion Rule.** Page transitions use a single restrained entrance animation (`.sheet-enter`: `opacity: 0.01; transform: translateY(10px)` to `opacity: 1; transform: translateY(0)` over `0.45s cubic-bezier(0.22, 1, 0.36, 1)`), disabled automatically under `prefers-reduced-motion: reduce`.

## Shapes

Every component in the system uses **sharp `0px` corners (`rounded-none`)** to preserve the precision of cut drafting plates and ruled specification tables.

- **Outer & Section Borders:** `1px solid var(--line-strong)` (`#B8AE9C` light / `#463E38` dark) bounds the main `1360px` sheet, sticky header, section header bars, and framed specification plates.
- **Internal Cell Rules:** `1px solid var(--line-subtle)` (`#D8D0C1` light / `#2E2925` dark) divides adjacent grid cells, navigation items, and card header/footer strips.
- **Dashed Ledger Dividers:** `1px dashed var(--line-strong)` or `var(--line-subtle)` separates primary narrative content from bottom tag strips or schematic rows (`border-t border-dashed`).
- **Square Bullet & Portrait Frames:** List items use a `6px × 6px` (`h-1.5 w-1.5`) solid copper square (`bg-copper`) instead of round disc bullets. Profile portraits sit inside a `96px × 96px` square frame with a `1px solid var(--accent-copper)` border and `4px` (`p-1`) paper mat.
- **Focus & Scrollbar Geometry:** Focus rings use a sharp `2px solid var(--accent-copper)` outline with `3px` offset (`outline-offset: 3px`). Scrollbars are `10px` wide with a `--line-strong` thumb framed by a `2px solid var(--bg-paper)` border.

## Components

### Buttons
Architectural action stamps built with `0px` radius, `1px` solid borders, and uppercase `Azeret Mono` (`12px`, `tracking-wider`) labels.
- **Shape:** Sharp rectangular stamp (`0px` radius, `border-width: 1px`).
- **Primary:** Solid copper fill (`bg-copper`), copper border (`border-copper`), cream text (`#FAF7F1` in light mode, `#161412` in dark mode), `12px 20px` padding (`px-5 py-3`), inline `14px` SVG vector arrow where directional.
- **Secondary:** Card cream fill (`bg-paper-card`), strong hairline border (`border-hairline-strong`), primary ink text (`text-ink`), `12px 20px` padding (`px-5 py-3`).
- **Tertiary:** Base paper fill (`bg-paper`), subtle hairline border (`border-hairline`), muted ink text (`text-ink-muted`), `12px 16px` padding (`px-4 py-3`).
- **Hover / Focus:** Primary buttons transition opacity (`hover:opacity-90`); Secondary buttons shift border and text to copper (`hover:border-copper hover:text-copper`); Tertiary buttons shift border to strong hairline and text to primary ink (`hover:border-hairline-strong hover:text-ink`).

### Chips
Compact monospace specification tokens used for technology stacks, log badges, and interactive blog theme filters.
- **Style:** `0px` radius, `1px` solid border, `Azeret Mono` `12px` (`text-xs`). Read-only stack tags use `border-hairline bg-paper px-2.5 py-1 text-ink`; toolkit chips use `border-hairline-strong bg-paper-card px-3 py-2 text-ink hover:border-copper`.
- **State:** Stamp badges (`LOG 01 · WORK`, `ȘG`) and active filter chips use `border-copper bg-copper-soft font-semibold text-copper`. Unselected filter chips use `border-hairline bg-paper text-ink-muted hover:border-copper hover:text-ink`.

### Cards / Containers
Flush architectural cells and framed specification plates.
- **Corner Style:** `0px` radius across all containers and media frames.
- **Background:** `--bg-card` (`#FAF7F1` / `#24201D`), transitioning to `--bg-elevated` on interactive project/article card hover (`hover:bg-paper-elevated`).
- **Shadow Strategy:** None (`box-shadow: none`). Separated by shared `1px` hairline borders.
- **Border:** `1px solid var(--line-subtle)` for grid cells; `1px solid var(--line-strong)` for standalone specification plates (e.g., Hero Engineer Plate, Project Sidebar Plates, Blog Article Header/Body plates).
- **Internal Padding:** `24px` (`p-6`) on mobile, scaling to `32px–40px` (`sm:p-8` or `sm:p-10`) on tablet/desktop. Every plate opens with a bottom-bordered metadata header strip (`border-b border-hairline pb-3 font-mono text-xs`).

### Navigation
Full-width sticky architectural title block (`sticky top-0 z-50 border-b border-hairline-strong bg-paper-card`).
- **Desktop Layout:** Left brand cell (`ȘG` copper monogram stamp + `Spectral` `18px–20px` name) separated by `border-r border-hairline`; center horizontal list of `Azeret Mono` `12px` uppercase route cells (`px-5 border-r border-hairline`); right coordinate stamp (`CLUJ-NAPOCA · SCALE 1:1`) and theme toggle button (`CREAM` / `DARK` with inline moon/sun SVG).
- **States:** Active route cell receives `bg-copper-soft font-semibold text-copper`; inactive route cells use `text-ink-muted hover:bg-paper-elevated hover:text-ink`.
- **Mobile Treatment (`<768px`):** Displays a persistent 5-column quick-jump bar (`grid-cols-5 border-t border-hairline bg-paper-elevated`) so all five primary routes are immediately tappable at `390px`, paired with a `MENU / CLOSE` toggle that expands a bordered 2-column project plate index drawer.

### Interactive System Node Selector & Architecture Topology Plates
Signature schematic components that replace generic marketing illustrations with inspectable engineering diagrams.
- **6-Node Career & System Selector (`Hero.svelte`):** A `2×3` (`grid-cols-2 sm:grid-cols-3`) matrix of selectable `Azeret Mono` cells (`01 · BOSCH` through `06 · .NET 8`) wired to a live specification readout bar below (`border-hairline bg-paper-card p-4`) with a direct `Inspect` link. Active node cell uses `border-copper bg-copper-soft text-ink`.
- **DOM Architecture Topology Plates (`Projects.svelte`, `projects/[slug]/+page.svelte`):** For backend/architecture projects without raster screenshots (`KickCollect`, `Quotation Service`), the `16:9` (`aspect-video`) media frame renders a 3-node schematic diagram (`grid-cols-[1fr_20px_1fr_20px_1fr]`) connected by inline SVG copper vector arrows (`stroke-width="1.25"`), flanked by top and bottom specification ledger bars.

## Do's and Don'ts

### Do:
- **Do** bound all top-level page content inside the `max-w-[1360px] border-x border-hairline-strong` architectural sheet so header, main sections, and footer align along continuous vertical rules.
- **Do** pair every section and card header with a `12px` `Azeret Mono` tabular coordinate (`SEC 01 // ...`, `PLT-01 // ...`, `NOTE 01 // ...`) separated by a `1px` hairline rule.
- **Do** use sharp `0px` corners, `1px` solid or dashed hairlines, and `6px × 6px` square copper list markers (`h-1.5 w-1.5 bg-copper`) across all lists and plates.
- **Do** use inline SVG vector strokes (`stroke="currentColor"`, `stroke-width="1.25"` to `1.75"`) for directional arrows, schematic connectors, and controls.
- **Do** maintain full parity between Warm Cream light mode and Soft Espresso dark mode by referencing CSS custom properties (`--bg-paper`, `--bg-elevated`, `--bg-card`, `--ink-primary`, `--ink-muted`, `--accent-copper`, `--line-subtle`, `--line-strong`).

### Don't:
- **Don't** apply border-radius (`rounded-md`, `rounded-lg`, `rounded-full`), drop shadows (`shadow-sm`, `shadow-lg`), or backdrop blur to cards, buttons, portraits, or badges.
- **Don't** stack small uppercase kicker or eyebrow labels directly above `h1` or `h2` headings; keep section coordinates in the right-hand slot of the section header bar or inside a bordered metadata ledger strip.
- **Don't** introduce secondary accent colors (blue, green, purple, amber) or neon dark-mode highlights; Oxidized Copper (`#9A3E20` / `#E07A56`) is the single chromatic signal.
- **Don't** leave project media frames blank when a system lacks a screenshot; render a structured 3-node DOM architecture topology plate inside the `aspect-video` frame.
