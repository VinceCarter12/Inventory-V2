# Oracle Inventory System — PRODUCT.md

## Product Purpose

An internal IT equipment tracking and reconciliation tool for Oracle Petroleum, a small-to-medium company (50–100+ employees). Admins (IT + HR) assign, transfer, and audit company assets. Employees view their own equipment. The product exists to eliminate lost assets, streamline turnover handling, and give IT a clean source of truth.

## Users

**Primary — IT Admin / HR Admin**
- Role: manages all assets, employees, assignments, reconciliation
- Context: office desktop, regular working hours, medium ambient light
- Frequency: daily active use; reconciliation events monthly
- Mental state: task-focused, methodical, low tolerance for friction — they manage dozens of items per session

**Secondary — Employee**
- Role: views assigned equipment only
- Frequency: occasional (onboarding, offboarding, questions)
- Mental state: passive, just needs confirmation

## Brand

- **Name:** Oracle Inventory System
- **Client:** Oracle Petroleum (Sir Jay)
- **Tone:** Professional, precise, no-nonsense. Not corporate-generic. Feels like a well-built internal tool by people who care.
- **Anti-references:** Bloated ERP dashboards (SAP, Oracle Fusion). Overwrought SaaS marketing UIs. Glassmorphism-heavy admin templates.

## Register

product

## Design Principles

1. **Density without noise** — Admins work with tables and lists. Pack information tightly but never chaotically.
2. **Action-first** — CTAs and primary actions must never be buried. One click to the most common action.
3. **Dark by default** — IT admins, dim server rooms, late-night inventory runs. The scene is low ambient light.
4. **Accent economy** — Lime (`#C6FF00`) signals active/positive state. Purple (`#7B5CF5`) signals secondary data. Coral (`#FF5A4E`) signals problems. Each color has one job.
5. **Sidebar stays narrow** — Icon-only collapsed nav is the right density for a tool used all day.

## Current Color System

- Background: `#16181A`
- Card: `#1E2124`
- Card alt: `#252829`
- Lime accent: `#C6FF00`
- Purple accent: `#7B5CF5`
- Coral / alert: `#FF5A4E`
- Muted text: `#6B7280`
- Body text: `#E8E8E8`
- Border: `rgba(255,255,255,0.07)`

## Typography

- Font: Inter (400/500/600/700/800/900)
- Body: 13px
- Labels: 11px uppercase tracking
- Headings: 22px 800 weight

## Navigation (Sidebar)

Icon-only, narrow sidebar. Items: Dashboard, Reports, Assignments, Employees, Sites, Settings. Avatar at bottom. Active state: lime tint background + lime icon color.

## Pages In Scope

- `/dashboard` — Asset overview with KPI cards, charts, movements
- `/assignments` — Assignment management table
- `/employees` — Employee list with asset count
- `/sites` — Site-level breakdown
- `/reports` — Reconciliation and audit reports
- `/settings` — System settings
