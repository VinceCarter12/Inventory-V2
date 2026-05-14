---
name: Oracle Inventory System
description: IT asset tracking and reconciliation tool for Oracle Petroleum.
colors:
  signal-green: "#C6FF00"
  data-violet: "#7B5CF5"
  alert-coral: "#FF5A4E"
  void-slate: "#16181A"
  instrument-black: "#1E2124"
  elevated-surface: "#252829"
  interface-ash: "#E8E8E8"
  subdued-text: "#6B7280"
  ghost-border: "#FFFFFF12"
typography:
  headline:
    fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
  mono:
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  pill: "9999px"
  card: "16px"
  input: "10px"
  item: "10px"
spacing:
  page: "24px"
  card: "24px"
  tight: "12px"
  gap: "8px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "#0F1112"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "34px"
  button-primary-hover:
    backgroundColor: "#B8EF00"
    textColor: "#0F1112"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "34px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.subdued-text}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "34px"
  button-ghost-hover:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "{colors.interface-ash}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "34px"
  input-field:
    backgroundColor: "{colors.elevated-surface}"
    textColor: "{colors.interface-ash}"
    rounded: "{rounded.input}"
    padding: "0 14px"
    height: "42px"
  badge-usable:
    backgroundColor: "rgba(198,255,0,0.12)"
    textColor: "{colors.signal-green}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  badge-repair:
    backgroundColor: "rgba(255,193,7,0.10)"
    textColor: "#FFC107"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  badge-disposal:
    backgroundColor: "rgba(255,90,78,0.12)"
    textColor: "{colors.alert-coral}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
---

# Design System: Oracle Inventory System

## 1. Overview

**Creative North Star: "The Operator's Workbench"**

Oracle Inventory is a daily-use tool for IT and HR admins at Oracle Petroleum who track physical assets — laptops, peripherals, site equipment — across multiple locations. The visual system reflects the reality of that work: methodical, precise, heads-down. Every interaction should feel like reaching for the right tool on a well-organized workbench: fast, deliberate, never surprising.

The system is dark by design, not by trend. An IT admin running a monthly reconciliation at a desk under fluorescent lights needs contrast without glare, density without chaos. The darkness is functional. The Signal Green accent marks exactly one thing at a time: the primary action to take. Everything else steps back. There are no decorative flourishes, no hero elements, no attention-seeking surfaces — only the data and the next task.

This system explicitly rejects the bloated information architecture of enterprise ERP dashboards (SAP, Oracle Fusion), the overwrought visual decoration of SaaS marketing UIs, and glassmorphism-heavy admin templates that substitute blur effects for actual structural clarity.

**Key Characteristics:**
- Dark, functional, no-glare surface (#16181A base)
- Tonal depth through exactly three surface levels — no shadows, ever
- One accent color (Signal Green, #C6FF00) on no more than one interactive element per screen
- IBM Plex Sans for all UI text; IBM Plex Mono for all structured data identifiers
- Pill-shaped CTAs; gently curved containers; compact 13px body text for density

## 2. Colors

Restrained strategy: near-black tinted neutrals, one active signal, one data accent, one alert. Total named color vocabulary: six values.

### Primary
- **Signal Green** (#C6FF00): The only warm, saturated color in the system. Used exclusively on primary CTA buttons, the sidebar active state, and progress bar fills. Never on backgrounds, borders, or text in any other context. Its rarity is the point — when Signal Green appears, it means "this is what you do next."

### Secondary
- **Data Violet** (#7B5CF5): Chart fills, data visualizations, and form input focus rings. Never used as a CTA or active-navigation indicator — that role belongs to Signal Green exclusively.

### Tertiary
- **Alert Coral** (#FF5A4E): Destructive actions (delete buttons, error toasts), and condition badges for assets marked "For Disposal." Used at low opacity (12%) for badge tint backgrounds.

### Neutral
- **Void Slate** (#16181A): The page background. The floor every surface sits on.
- **Instrument Black** (#1E2124): Primary card, dialog, and sidebar surface. First elevation above the floor.
- **Elevated Surface** (#252829): Dialog footers, card secondary zones, muted sections, table row hover. Second elevation.
- **Interface Ash** (#E8E8E8): All primary body text and interactive element labels.
- **Subdued Text** (#6B7280): Column headers, field labels, captions, placeholder text, and inactive navigation icons. The muted layer.
- **Ghost Border** (rgba(255,255,255,0.07) / #FFFFFF12): Hairline borders on cards, inputs, and the sidebar container. Barely visible — provides structural containment without visual noise.

### Named Rules

**The Signal Green Economy.** Signal Green (#C6FF00) is prohibited on more than one interactive element per screen. If a primary button is visible, no badge may use lime. If the sidebar active state shows lime, nothing else on screen does. Scarcity is the mechanism.

**The No-Warmth Rule.** Signal Green is the only warm value in the palette. Every neutral is cool. Never introduce warm grays, warm whites, amber tones, or tan into any neutral role.

## 3. Typography

**Body/UI Font:** IBM Plex Sans (400, 500, 600, 700), fallback: ui-sans-serif, system-ui
**Data/Identifier Font:** IBM Plex Mono (400, 500, 600, 700), fallback: ui-monospace

**Character:** IBM Plex Sans has a slightly mechanical stroke contrast and distinctive glyph construction (the double-story `a`, the straight-legged `G`, the wide `R`) that reads as "precision instrument" rather than "generic tool." IBM Plex Mono on serial numbers and asset IDs creates immediate semantic separation — `SN-LP-001` and `EMP-0042` visually announce themselves as structured data, not prose labels.

### Hierarchy

- **Headline** (700, 22px, lh 1.2, ls -0.02em): Page titles in the TopBar. The highest-weight element on any screen.
- **Title** (700, 18px, lh 1.3, ls -0.01em): Secondary section headings, card section titles, dialog headings.
- **Body** (400-600, 13px, lh 1.5): Primary content text throughout. 13px is a deliberate density choice for a desk-use admin tool — not mobile, not marketing.
- **Label** (600, 11px, lh 1.4, ls 0.05em, ALL CAPS): Table column headers, form field labels, and section dividers. All caps with tracked-out spacing provides rhythm in dense data layouts.
- **Mono** (400, 12px, lh 1.5): All structured identifiers — serial numbers, asset IDs, employee IDs. IBM Plex Mono exclusively.

### Named Rules

**The Mono Data Rule.** Any field that represents a structured identifier uses IBM Plex Mono. Body text, names, descriptions, and labels use IBM Plex Sans. The font change is the signal that the viewer is reading data, not prose. Never use Mono for paragraph text or navigation labels.

## 4. Elevation

This system is entirely shadowless. Depth is conveyed through three tonal surface levels only:

1. **Floor** (Void Slate, #16181A): The page background.
2. **Surface** (Instrument Black, #1E2124): Cards, dialogs, the sidebar, the TopBar — one step above the floor.
3. **Raised** (Elevated Surface, #252829): Dialog footers, muted zones, table row hover states — one step above Surface.

The lightness gap between levels is intentionally narrow (~4-6%). Cards are defined by Ghost Border (1px rgba(255,255,255,0.07)) and a subtle foreground ring, not by shadow depth.

### Named Rules

**The Flat-By-Default Rule.** No `box-shadow` exists in this system. Prohibited. If depth is needed, move to the next tonal level. If a shadow impulse arises, it is a signal that tonal layering was done incorrectly upstream.

**The Three-Layer Limit.** The system has exactly three surface levels. A fourth elevation level (a card inside a card, a panel on a panel) is a design error. If nesting appears, flatten it.

## 5. Components

### Buttons

Precise and restrained: full pill radius at all sizes, minimal padding, strong weight contrast between the primary action and secondary controls.

- **Shape:** Full pill (border-radius: 9999px) on all variants
- **Primary (lime):** Signal Green (#C6FF00) fill, #0F1112 text, 700 weight, 12px, 34px height, 16px horizontal padding. Hover: #B8EF00.
- **Ghost:** Transparent background, Subdued Text. Hover: rgba(255,255,255,0.06) fill, Interface Ash text.
- **Outline:** Ghost + 1px Ghost Border. Used for non-primary filter actions and secondary navigation.
- **Destructive:** Alert Coral (#FF5A4E) fill. Reserved for delete and irreversible actions only.
- **Icon:** 36x36px circle, ghost treatment. TopBar actions (notifications, chat) only.

### Badges

Status indicators for asset condition and assignment state. Pill shape, low-opacity tinted fill with full-saturation text.

- **Usable:** rgba(198,255,0,0.12) fill + Signal Green text
- **For Repair:** rgba(255,193,7,0.10) fill + #FFC107 amber text
- **For Disposal:** rgba(255,90,78,0.12) fill + Alert Coral text
- **Returned / Neutral:** rgba(255,255,255,0.07) fill + Subdued Text
- **Never** use a solid background at full opacity for a badge. The low-opacity tint convention is invariant.

### Cards / Containers

- **Corner Style:** Gently curved (16px radius). Never sharp; never pill.
- **Background:** Instrument Black (#1E2124)
- **Shadow Strategy:** None. Defined by Ghost Border + ring-1 ring-foreground/10.
- **Border:** 1px rgba(255,255,255,0.07)
- **Internal Padding:** 24px standard; 20px compact.

### Inputs / Fields

- **Style:** Elevated Surface (#252829) fill, Ghost Border, 10px radius, 42px height.
- **Focus:** Border transitions to Signal Green (#C6FF00). No glow, no shadow — border color change only.
- **Label:** 11px, 600 weight, uppercase, tracked, Subdued Text. Always displayed above the field.
- **Select:** Identical styling to inputs via `.field-select` class. Native browser dropdown arrow retained.
- **Error:** Alert Coral border + toast notification for the message.

### Navigation (Sidebar)

- **Width:** 58px fixed. Icon-only; no visible labels at rest.
- **Items:** 40x40px rounded square (10px radius). Tooltip appears on hover, right-side, 8px offset.
- **Default state:** Subdued Text icon color on transparent background.
- **Hover state:** rgba(255,255,255,0.06) fill, Interface Ash icon.
- **Active state:** rgba(198,255,0,0.1) fill, Signal Green icon. Current page only.
- **Logo:** Top, 32x32px Oracle logo mark on transparent background.
- **User avatar:** Bottom, 32px circle, Elevated Surface fill, muted initials. Never lime.

### Tables

- **Column headers:** 11px, 600 weight, uppercase, Subdued Text. Consistent with Label hierarchy.
- **Row text:** 13px body, Interface Ash.
- **Row hover:** Elevated Surface at 50% opacity — barely perceptible, provides location feedback.
- **Row borders:** 1px rgba(255,255,255,0.04) — lighter than cards, rhythm without weight.
- **Identifier cells:** IBM Plex Mono, 12px, Subdued Text.

### Progress Bars

GPU-composited animation: `transform: scaleX(var(--fill, 0))` on a full-width fill element, driven by a CSS custom property set via JavaScript. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo), 1.2s duration. Track: rgba(255,255,255,0.07). Fill: Signal Green. `prefers-reduced-motion` override collapses to instant.

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Green (#C6FF00) only on primary CTAs, sidebar active state, and progress fills — one role, full stop.
- **Do** use IBM Plex Mono for every serial number, asset ID, and employee ID throughout the system.
- **Do** maintain exactly three tonal layers (Void Slate → Instrument Black → Elevated Surface). Use tonal shift for all depth cues.
- **Do** use 11px uppercase tracked labels for every field label and table column header.
- **Do** show lime border on focus for both `.field-input` and `.field-select` elements.
- **Do** use `font-variant-numeric: tabular-nums` on columns displaying numbers that should vertically align.
- **Do** animate only `transform` and `opacity`. Never animate width, height, padding, or any layout property.
- **Do** use full pill shape (9999px) on all action buttons and all status badges.

### Don't:
- **Don't** add shadows. This system is flat. Tonal layering handles all depth. `box-shadow` is prohibited.
- **Don't** use glassmorphism. No `backdrop-filter: blur()` for decoration. The dialog overlay scrim uses `backdrop-blur-sm` solely to support modal focus — that is the one permitted exception.
- **Don't** build bloated ERP-style interfaces in the style of SAP or Oracle Fusion: heavy borders, toolbar overload, zebra striping, dense header rows.
- **Don't** use SaaS marketing UI conventions: gradient cards, oversized illustrated empty states, gradient text, hero metric cards with big numbers and sparklines.
- **Don't** use gradient text (`background-clip: text`). Single solid color; emphasis via weight or size only.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on any card, list item, or alert.
- **Don't** place more than one Signal Green element on screen simultaneously.
- **Don't** use IBM Plex Mono for navigation labels, descriptions, or headings. Mono is exclusively for structured data identifiers.
- **Don't** use warm grays, amber neutrals, or tan tones in any surface or border role. Amber (#FFC107) appears only in "For Repair" badge text.
- **Don't** nest cards. A card inside a card is always a design error; flatten the hierarchy.
