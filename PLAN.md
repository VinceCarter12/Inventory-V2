# Oracle Inventory System — Master Plan

> **Version**: 1.0 (reconstructed)
> **Project**: Oracle Inventory
> **Repository**: [github.com/VinceCarter12/Oracle-Inventory](https://github.com/VinceCarter12/Oracle-Inventory)
> **Live Domain**: `oracleinventory.lubesmastery.com` (Hostinger FTP)

---

## 1. Product Vision

Oracle Inventory is a **web-based asset tracking system** for organizations that manage physical equipment (laptops, monitors, peripherals) across multiple sites and employees. It provides:

- A single source of truth for **who has what, where, and in what condition**
- Full **movement audit trail** — every assignment, transfer, repair, and disposal is logged
- Multi-site, multi-department **organizational hierarchy**
- A clean, **Vercel-inspired minimal UI** built on a strict design system

### Target User

**Sir Jay** (admin / IT manager) who oversees equipment distribution across the company's offices (Manila HQ, Cebu Office, Davao Hub). Single-user admin system initially — no multi-tenant, no role-based access control yet.

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     Inventory v1 (monorepo)               │
│                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────┐  │
│  │  oracle-sv   │    │  oracle-api  │    │  oracle-inv  │  │
│  │  (SvelteKit) │───▶│  (Express)   │───▶│  (legacy/    │  │
│  │  Frontend    │    │  REST API    │    │   Next.js?)  │  │
│  │  Port 5173   │    │  Port 3001   │    │   empty      │  │
│  └─────────────┘    └──────┬───────┘    └──────────────┘  │
│                            │                              │
│                     ┌──────▼───────┐                      │
│                     │  PostgreSQL   │                      │
│                     │  (Neon/Supa)  │                      │
│                     │  via Prisma   │                      │
│                     └──────────────┘                      │
└──────────────────────────────────────────────────────────┘
```

| Layer | Package | Tech |
|-------|---------|------|
| **Frontend** | `oracle-sv` | SvelteKit 5 + Svelte 5 (runes), Tailwind CSS v4, Vite 6, TypeScript |
| **API** | `oracle-api` | Express 4, Prisma 7 (PostgreSQL adapter), JWT auth, bcrypt, TypeScript |
| **Database** | — | PostgreSQL (cloud — Neon or Supabase), managed via Prisma schema |
| **Deploy** | `deploy.js` | FTP to Hostinger `public_html/` (legacy Next.js export); SvelteKit deployment TBD |

### Key Decisions

- **Svelte 5 runes** (`$state`, `$derived`, `$props`) — no legacy stores
- **Tailwind v4** via `@tailwindcss/vite` plugin — `@theme` block registers design tokens
- **No component library** — all components are handwritten using the design system from `DESIGN.md`
- **Inline SVG icons** from HugeIcons paths (not imported as components) — keeps bundle zero-dep for icons
- **JWT-based auth** — login via `/api/auth/login`, redirect to `/dashboard`

---

## 3. Data Model

Defined in `oracle-api/prisma/schema.prisma`:

```
SystemUser ─── auth (email/password/JWT)
     │
Site ──┬── Department ──── Employee ──┬── AssetAssignment
       │                              │         │
       └── Asset ─────────────────────┘    MovementLog
              │
           Category
```

### Enums

| Enum | Values |
|------|--------|
| `AssetCondition` | `usable`, `for_repair`, `for_disposal` |
| `OwnershipType` | `company`, `personal` |
| `MovementType` | `assignment`, `transfer`, `site_transfer`, `resignation`, `new_hire`, `repair_send`, `repair_return`, `disposal` |
| `AssignmentStatus` | `active`, `returned`, `transferred` |

### Models

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `SystemUser` | Admin login | email (unique), password (bcrypt hash) |
| `Site` | Physical location | name, address, lat/lng, archivedAt |
| `Department` | Org unit under a site | name, siteId |
| `Category` | Asset type (Laptop, Monitor…) | name |
| `Employee` | Person who holds assets | name, email, employeeId, siteId, departmentId, isActive |
| `Asset` | Physical equipment | name, serialNumber (unique), condition, ownership, warrantyExpiry, nextMaintenanceDate |
| `AssetAssignment` | Who currently holds an asset | assetId, employeeId, status, assignedAt, returnedAt |
| `MovementLog` | Audit trail entry | assetId, employeeId, type, notes, createdAt |

### Seed Data

- 1 SystemUser (Sir Jay — `jay@oracle.com` / `Jay@Oracle2026`)
- 3 Sites (Manila, Cebu, Davao)
- 3 Departments (IT, Finance, Operations)
- 3 Categories (Laptop, Monitor, Peripherals)
- 5 Employees
- 5 Assets
- 3 Active Assignments
- 4 Movement Logs

---

## 4. Design System

Fully documented in `DESIGN.md` — a Vercel-inspired analysis applied to an inventory context.

### Design Tokens (from `src/app.css`)

| Category | Tokens |
|----------|--------|
| **Surfaces** | `--canvas` (white), `--canvas-soft` (#fafafa), `--canvas-soft-2` (#f5f5f5) |
| **Text** | `--ink` (near-black), `--body` (gray), `--mute` (light gray), `--on-primary` (white) |
| **Borders** | `--hairline`, `--hairline-strong` |
| **Semantic** | `--link`, `--link-deep`, `--link-bg-soft`, `--error`, `--error-soft` |
| **Charts** | `--chart-usable` (green), `--chart-repair` (amber), `--chart-disposal` (red) |
| **Radius** | `--r-xs` 4px → `--r-full` 9999px |
| **Spacing** | `--sp-xxs` 4px → `--sp-5xl` 96px |
| **Shadows** | `--shadow-l1` → `--shadow-l5` (stacked, subtle) |
| **Fonts** | Inter (sans), JetBrains Mono (mono) |

### Design Principles

1. **Stark black-and-white** — ink primary, near-white canvas, no color noise
2. **Negative letter-spacing** — all display type uses aggressive negative tracking
3. **Stacked subtle shadows** — never single heavy drop-shadows
4. **Mono for technical labels** — section headers, table heads, badge captions
5. **Pill shapes for CTAs** — 100px radius marketing-scale buttons
6. **Card elevation via hairline + shadow combos** — Level 1–5 system

---

## 5. Route Map

### Implemented

| Route | Layout Group | Status | Description |
|-------|-------------|--------|-------------|
| `/` | — | ✅ Done | Redirects 307 → `/login` |
| `/login` | `(auth)` | ✅ Done | Split-panel login: left form + right brand glow panel |
| `/dashboard` | `(dashboard)` | ✅ Done | KPI cards, condition donut, activity bar chart, movement table |

### Planned

| Route | Layout Group | Status | Description |
|-------|-------------|--------|-------------|
| `/assets` | `(dashboard)` | ⬜ Not started | Asset table with filters (condition, category, site, ownership) |
| `/assets/detail?id=…` | `(dashboard)` | ⬜ Not started | Single asset detail: history, assignments, condition badge |
| `/employees` | `(dashboard)` | ⬜ Not started | Employee list with department/site grouping |
| `/employees/detail?id=…` | `(dashboard)` | ⬜ Not started | Employee profile: assigned assets, movement history |
| `/assignments` | `(dashboard)` | ⬜ Not started | Active assignments table with assign/return actions |
| `/sites` | `(dashboard)` | ⬜ Not started | Site management: list, department tree, asset count per site |
| `/reports` | `(dashboard)` | ⬜ Not started | Exportable summaries — asset condition over time, movement frequency |
| `/settings` | `(dashboard)` | ⬜ Not started | Categories, user profile, system preferences |

---

## 6. Component Inventory

### Sidebar (`src/lib/components/sidebar/`)

| Component | Status | Description |
|-----------|--------|-------------|
| `Sidebar.svelte` | ✅ | Collapsible rail ↔ panel, animated width transition |
| `NavIcon.svelte` | ✅ | Inline SVG icon renderer (home, package, users, clipboard, building, analytics, settings, folder) |
| `NavItem.svelte` | ✅ | Nav row with active state (black pill expanded, white circle collapsed) |
| `SidebarPanel.svelte` | ✅ | Expanded panel wrapper |
| `SidebarRail.svelte` | ✅ | Collapsed rail wrapper |
| `SidebarUser.svelte` | ✅ | User avatar + name + email at sidebar bottom |

### Dashboard (`src/lib/components/dashboard/`)

| Component | Status | Description |
|-----------|--------|-------------|
| `KpiCard.svelte` | ✅ | Metric card with label, count, icon, optional delta badge |
| `ConditionChart.svelte` | ✅ | SVG donut chart: usable/repair/disposal with legend |
| `ActivityChart.svelte` | ✅ | SVG bar chart: last 7 days of movements with hover tooltip |
| `ActivityTable.svelte` | ✅ | Recent movement log table with typed color badges |

### Planned Components

| Component | Page | Description |
|-----------|------|-------------|
| `DataTable.svelte` | Assets, Employees | Sortable, filterable table following `ex-data-table-cell` spec |
| `FilterBar.svelte` | Assets | Dropdown filters for condition, category, site, ownership |
| `AssetForm.svelte` | Assets (modal) | Create/edit asset form using `form-input` tokens |
| `AssignmentForm.svelte` | Assignments | Assign/transfer/return workflow form |
| `EmployeeCard.svelte` | Employees | Employee profile card with asset count |
| `SiteCard.svelte` | Sites | Site summary with department tree |
| `EmptyState.svelte` | Shared | Reusable empty state with icon + message |
| `Modal.svelte` | Shared | `ex-modal-card` spec dialog overlay |
| `Toast.svelte` | Shared | `ex-toast` spec notification |
| `Badge.svelte` | Shared | Typed colored pill (blue/green/amber/red/neutral) |

---

## 7. API Endpoints (Planned)

The `oracle-api` Express server needs these REST endpoints:

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Email + password → JWT |
| `POST` | `/api/auth/logout` | Invalidate token |
| `GET` | `/api/auth/me` | Current user profile |

### Assets
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/assets` | List all (with filters: condition, category, site, ownership) |
| `GET` | `/api/assets/:id` | Single asset detail |
| `POST` | `/api/assets` | Create asset |
| `PUT` | `/api/assets/:id` | Update asset |
| `DELETE` | `/api/assets/:id` | Soft-delete / dispose asset |

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/employees` | List all (filter by site, department, active) |
| `GET` | `/api/employees/:id` | Employee detail with assignments |
| `POST` | `/api/employees` | Create employee |
| `PUT` | `/api/employees/:id` | Update employee |

### Assignments
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/assignments` | List active assignments |
| `POST` | `/api/assignments` | Assign asset to employee (creates MovementLog) |
| `PUT` | `/api/assignments/:id/return` | Return asset (creates MovementLog) |
| `PUT` | `/api/assignments/:id/transfer` | Transfer to another employee (creates MovementLog) |

### Movement Logs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/movements` | Paginated log (filter by type, date range) |

### Dashboard Aggregates
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/kpis` | Total assets, employees, assignments, sites + deltas |
| `GET` | `/api/dashboard/condition` | Condition breakdown counts |
| `GET` | `/api/dashboard/activity` | Last 7 days movement counts |
| `GET` | `/api/dashboard/recent` | 8 most recent movement logs |

### Sites & Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/sites` | List sites with department counts |
| `GET` | `/api/categories` | List categories with asset counts |

---

## 8. Build Phases

### Phase 0 — Foundation ✅ COMPLETE
- [x] Monorepo structure (`oracle-sv`, `oracle-api`)
- [x] Prisma schema with all models and enums
- [x] Seed data script
- [x] Design system analysis (`DESIGN.md`)
- [x] Global CSS tokens (`app.css`)
- [x] Git repo initialized

### Phase 1 — Auth + Shell ✅ COMPLETE
- [x] Login page (split-panel, branded, form validation, JWT flow)
- [x] Dashboard layout with sidebar (collapsible rail ↔ panel)
- [x] Sidebar navigation (all icons, sub-items, active states)
- [x] Root redirect `/` → `/login`

### Phase 2 — Dashboard ✅ COMPLETE
- [x] KPI cards (4): Total Assets, Employees, Assignments, Sites
- [x] Condition donut chart (usable/repair/disposal)
- [x] Activity bar chart (7-day movement histogram)
- [x] Activity table (8 recent logs, typed badges, relative dates)
- [x] Chart color tokens added to `app.css`
- [x] Empty states for all dashboard sections
- [ ] Wire mock data to real API

### Phase 3 — API Layer 🔲 NEXT
- [ ] Express server setup (`src/index.ts`)
- [ ] JWT auth middleware
- [ ] Auth routes (login, me)
- [ ] Dashboard aggregate endpoints
- [ ] Asset CRUD endpoints
- [ ] Employee CRUD endpoints
- [ ] Assignment endpoints (assign, return, transfer)
- [ ] Movement log endpoint (paginated)
- [ ] Connect SvelteKit to API (fetch in `+page.server.ts` or client-side)

### Phase 4 — Asset Management 🔲
- [ ] Assets page: data table, filters, search
- [ ] Asset detail page: history timeline, edit modal
- [ ] Create/edit asset form (with category, site, condition)
- [ ] Asset actions: mark for repair, mark for disposal

### Phase 5 — People & Assignments 🔲
- [ ] Employees page: list, department grouping
- [ ] Employee detail: assigned assets, movement history
- [ ] Assignments page: active assignments table
- [ ] Assign/transfer/return workflow with modal forms

### Phase 6 — Sites & Organization 🔲
- [ ] Sites page: site cards with department trees
- [ ] Site detail: assets at site, employees at site
- [ ] Department management

### Phase 7 — Reports & Polish 🔲
- [ ] Reports page: condition trends, movement frequency
- [ ] CSV/PDF export
- [ ] Settings page: categories, user profile
- [ ] Mobile responsive refinements
- [ ] Loading skeletons, error boundaries
- [ ] Production deployment pipeline

---

## 9. Current State Summary

| Area | Status |
|------|--------|
| **Data model** | ✅ Complete — 7 models, 4 enums, seed data |
| **Design system** | ✅ Complete — 737-line DESIGN.md, CSS tokens, Tailwind v4 theme |
| **Login** | ✅ Complete — branded split-panel, form validation, JWT flow stub |
| **Sidebar** | ✅ Complete — animated collapse, nav items, sub-items, user row |
| **Dashboard UI** | ✅ Complete — 4 KPIs, 2 charts, activity table (mock data) |
| **API server** | ⬜ Shell only — package.json + Prisma, no routes yet |
| **Real data flow** | ⬜ Not connected — dashboard uses hardcoded mock data |
| **Asset/Employee pages** | ⬜ Not started |
| **Deployment** | ⬜ Legacy FTP script for old Next.js app; SvelteKit deploy TBD |

---

## 10. Environment Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database (Neon / Supabase recommended)
- npm

### oracle-sv (Frontend)
```bash
cd oracle-sv
npm install
npm run dev          # http://localhost:5173
```

### oracle-api (Backend)
```bash
cd oracle-api
cp .env.example .env # Fill DATABASE_URL, JWT_SECRET
npm install
npx prisma db push   # Create tables
npm run db:seed       # Seed demo data
npm run dev           # http://localhost:3001
```

### Environment Variables (`oracle-api/.env`)
```
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=change_this_to_a_random_32_char_string
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

---

## 11. Open Decisions

| # | Question | Recommendation |
|---|----------|---------------|
| 1 | Delta calculation for "Total Assets" KPI | Omit until API provides prior-period count |
| 2 | "View all" in Activity Table | Link to `/assets` for now; add `/logs` route later |
| 3 | Ownership breakdown chart on dashboard | Defer to Assets sub-page |
| 4 | SvelteKit adapter for production | `adapter-node` for self-hosted, or `adapter-vercel` for Vercel |
| 5 | API calls from SvelteKit | Use `+page.server.ts` load functions (SSR) for initial load, client-side fetch for mutations |
| 6 | Toast/notification system | Build lightweight `Toast.svelte` using `ex-toast` spec |
| 7 | Search | Global command-palette search (deferred to Phase 7) |
