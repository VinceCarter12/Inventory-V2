# Oracle Inventory System — Project Plan v1
> **Project Name:** Oracle Inventory System
> **Based on:** PROJECT_PLAN2.md (feature-complete reference)
> **Date:** May 5, 2026
> **Status:** Planning Phase
> **Stack Decision:** Simplified — Single Next.js App (no monorepo)

---

## 1. What Is This Project?

A web application for a small-to-medium company (50–100+ employees) to **track, assign, and reconcile IT equipment**. Admins (IT + HR) manage assets and assignments. Employees can view their own assigned equipment.

### Core Goals

| Goal | Description |
|------|-------------|
| **Equipment Tracking** | Know every IT asset: who has it, where, and what condition |
| **Assignment Management** | Assign equipment to users, departments, or sites |
| **Turnover Handling** | Process resignations and transfers cleanly |
| **Reconciliation** | Compare physical counts vs. system records |
| **Personal Property** | Separate company-owned vs. employee-owned items |

---

## 2. User Roles

| Role | Who | Access |
|------|-----|--------|
| `admin` | IT Admin & HR | Full access — manage assets, users, assignments, turnover |
| `employee` | Regular staff | View only — see their own assigned equipment |

> Note: HR and IT Admin share the `admin` role for simplicity. Can be split into separate roles later.

---

## 3. Tech Stack (All Free, No Paid Services)

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Next.js 15** (App Router) | Frontend + Backend API routes | One app, no separate server needed |
| **TypeScript** | Type safety | Catches bugs before they happen |
| **Tailwind CSS** | Styling | Fast, utility-first |
| **shadcn/ui** | UI components | Free, copy-paste components |
| **Prisma ORM** | Database access | Easy schema + migrations |
| **PostgreSQL** | Database | Free, reliable, open-source |
| **NextAuth.js v5** | Authentication | Free, built for Next.js |
| **React Hook Form** | Forms | Lightweight form handling |
| **Zod** | Validation | Schema validation for forms + API |

### What Was Removed (vs. old plan) and Why

| Removed | Reason |
|---------|--------|
| Turborepo (monorepo) | Overkill for a single app |
| Express.js (separate backend) | Next.js API routes handle this |
| Redis | Not needed at 50–100 users |
| Docker | Simplifies setup; use local PostgreSQL or Neon free tier |
| Zustand | Not needed; React state + server components are enough |
| TanStack Query | Simplify; use Next.js server actions + fetch |
| JWT (manual) | Replaced by NextAuth.js |

---

## 4. Project Folder Structure

```
oracle-inventory/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── assets/
│   │   │   ├── page.tsx          ← Asset list
│   │   │   └── [id]/page.tsx     ← Asset detail + history
│   │   ├── assignments/
│   │   │   ├── page.tsx          ← All assignments
│   │   │   └── new/page.tsx      ← Create assignment
│   │   ├── sites/
│   │   │   └── page.tsx          ← Manage sites & departments
│   │   ├── turnover/
│   │   │   ├── page.tsx          ← Turnover overview
│   │   │   └── resignation/[userId]/page.tsx
│   │   ├── reports/
│   │   │   ├── reconciliation/
│   │   │   ├── by-site/
│   │   │   └── by-condition/
│   │   └── users/
│   └── api/
│       ├── auth/                 ← NextAuth routes
│       ├── assets/
│       ├── assignments/
│       ├── sites/
│       ├── departments/
│       ├── users/
│       ├── turnover/
│       ├── movements/
│       └── reports/
├── components/
│   ├── ui/                       ← shadcn/ui components
│   ├── forms/                    ← Form components
│   ├── tables/                   ← Data table components
│   └── layout/                   ← Sidebar, header, nav
├── lib/
│   ├── prisma.ts                 ← Prisma client singleton
│   ├── auth.ts                   ← NextAuth config
│   └── validations/              ← Zod schemas
└── prisma/
    ├── schema.prisma             ← Database schema
    └── seed.ts                   ← Seed data
```

---

## 5. Database Models

> Taken directly from PROJECT_PLAN2.md — no changes to data structure.

### Enums
- `AssetCondition`: `usable` | `for_repair` | `for_disposal`
- `OwnershipType`: `company` | `personal`
- `MovementType`: `assignment` | `transfer` | `site_transfer` | `resignation` | `new_hire` | `repair_send` | `repair_return` | `disposal`
- `AssignmentStatus`: `active` | `returned` | `transferred`
- `UserRole`: `admin` | `employee`

### Models
- **User** — employee accounts with site + department
- **Site** — physical locations (e.g., Main Office, Branch A)
- **Department** — within a site (e.g., IT, HR, Finance)
- **Asset** — IT equipment with brand, model, serial number, condition, ownership
- **Category** — equipment type (laptop, monitor, peripheral, etc.)
- **AssetAssignment** — who currently has what equipment
- **MovementLog** — full history of equipment handoffs
- **AuditLog** — system-level activity tracking

---

## 6. Pages & Features

### Admin Side (IT Admin + HR)

| Page | Feature |
|------|---------|
| `/dashboard` | Stats: total assets, by condition, by site, recent movements |
| `/assets` | List all assets, filter by site/dept/condition/ownership |
| `/assets/[id]` | Asset detail, assignment history, movement log |
| `/assignments` | View all current assignments |
| `/assignments/new` | Assign equipment to a user |
| `/sites` | Manage sites and departments |
| `/turnover` | Resignation and transfer overview |
| `/turnover/resignation/[userId]` | Process resignation — collect company equipment |
| `/reports/reconciliation` | Physical count vs. database comparison |
| `/reports/by-site` | Equipment breakdown by site |
| `/reports/by-condition` | Equipment breakdown by condition |
| `/users` | Manage employee accounts |

### Employee Side

| Page | Feature |
|------|---------|
| `/dashboard` | View own assigned equipment |
| `/assets/[id]` | View details of their own assigned item |

---

## 7. API Routes (Next.js Route Handlers)

### Auth
| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth login/logout/session |

### Assets
| Route | Method | Description |
|-------|--------|-------------|
| `/api/assets` | GET | List assets (with filters) |
| `/api/assets` | POST | Register new asset |
| `/api/assets/[id]` | GET | Asset detail |
| `/api/assets/[id]` | PUT | Update asset |
| `/api/assets/[id]/condition` | PATCH | Update condition |
| `/api/assets/[id]/ownership` | PATCH | Update ownership |
| `/api/assets/[id]/history` | GET | Movement history |

### Assignments
| Route | Method | Description |
|-------|--------|-------------|
| `/api/assignments` | GET | List all assignments |
| `/api/assignments` | POST | Create assignment |
| `/api/assignments/user/[userId]` | GET | User's assigned equipment |
| `/api/assignments/[id]/transfer` | PATCH | Transfer to another user |
| `/api/assignments/[id]/collect` | PATCH | Collect equipment |

### Sites & Departments
| Route | Method | Description |
|-------|--------|-------------|
| `/api/sites` | GET/POST | List / create sites |
| `/api/sites/[id]` | PUT | Update site |
| `/api/sites/[id]/departments` | GET | List departments in site |
| `/api/departments` | POST | Create department |
| `/api/departments/[id]` | PUT | Update department |

### Turnover
| Route | Method | Description |
|-------|--------|-------------|
| `/api/turnover/resignation/[userId]` | GET | Equipment to collect |
| `/api/turnover/resignation/[userId]` | POST | Process resignation |
| `/api/turnover/transfer` | POST | Bulk transfer between users |
| `/api/movements` | GET | Movement history log |

### Reports
| Route | Method | Description |
|-------|--------|-------------|
| `/api/reports/dashboard` | GET | Dashboard stats |
| `/api/reports/by-site` | GET | By site breakdown |
| `/api/reports/by-department` | GET | By department breakdown |
| `/api/reports/by-condition` | GET | By condition breakdown |
| `/api/reports/by-user/[userId]` | GET | By user |
| `/api/reports/personal-property` | GET | All personal items |
| `/api/reports/reconciliation` | GET | Discrepancy report |

---

## 8. Key User Flows

### Flow 1: Register New Equipment
1. Admin → Assets → Add New
2. Fill in: brand, model, serial number, category, quantity, location
3. Select site and department (optional)
4. Ownership defaults to "Company", condition to "Usable"
5. System auto-generates asset tag (e.g., `AST-2026-0001`)

### Flow 2: Assign Equipment to Employee
1. Admin → Assignments → New Assignment
2. Search for employee
3. Select available equipment
4. Add notes → Save
5. Equipment now shows as assigned to that user

### Flow 3: Employee Resignation
1. Admin → Turnover → Resignation → Select employee
2. System lists all company equipment assigned to them
3. Admin marks each item as collected
4. Personal property flagged — NOT collected
5. Movement logs recorded for all items

### Flow 4: Mark Personal Property
1. Admin registers item with ownership = "Personal"
2. Links to employee as owner
3. Item tracked but excluded from company inventory count
4. On resignation: system shows "Personal — do not collect"

### Flow 5: Update Equipment Condition
1. Admin finds asset → Edit
2. Change condition: Usable → For Repair
3. Add notes
4. Movement log recorded

### Flow 6: Inventory Reconciliation
1. Admin → Reports → Reconciliation
2. Enter physical counts per category/site
3. System compares against database
4. Shows discrepancies (e.g., "System: 50 laptops, Counted: 48")

---

## 9. Build Phases

### Phase 1 — Project Setup
- [ ] Create Next.js 15 app with TypeScript
- [ ] Install and configure Tailwind + shadcn/ui
- [ ] Set up PostgreSQL (local or Neon free tier)
- [ ] Set up Prisma with full schema
- [ ] Configure NextAuth.js (admin + employee roles)
- [ ] Seed database with sample data

### Phase 2 — Core Layout & Auth
- [ ] Login page
- [ ] Dashboard layout (sidebar, header)
- [ ] Role-based route protection (middleware)
- [ ] Admin vs. employee view separation

### Phase 3 — Asset Management
- [ ] Asset list page with filters
- [ ] Add new asset form
- [ ] Asset detail page with history
- [ ] Update condition / ownership

### Phase 4 — Assignments
- [ ] Assignments list
- [ ] New assignment form
- [ ] Transfer equipment
- [ ] Collect equipment

### Phase 5 — Sites & Departments
- [ ] Sites management page
- [ ] Departments within sites

### Phase 6 — Turnover
- [ ] Turnover overview
- [ ] Resignation workflow
- [ ] Bulk transfer

### Phase 7 — Reports
- [ ] Dashboard stats
- [ ] By-site, by-condition, by-department
- [ ] Reconciliation report

### Phase 8 — Polish & Testing
- [ ] Fix UI issues
- [ ] Test all user flows
- [ ] Test role permissions
- [ ] Final cleanup

---

## 10. Database Setup Options (Free)

| Option | Best For | Cost |
|--------|----------|------|
| **Local PostgreSQL** | Development / offline use | Free |
| **Neon** (neon.tech) | Hosted, free tier, easy setup | Free |
| **Supabase** | Hosted, free tier, has extra features | Free |

> Recommendation: Start with **local PostgreSQL** for dev, deploy on **Neon** for production.

---

## 11. Default Credentials (Seed Data)

| Role | Email | Password |
|------|-------|----------|
| Admin (IT) | admin@oracle.com | Admin@123 |
| Admin (HR) | hr@oracle.com | Admin@123 |
| Employee | employee@oracle.com | Employee@123 |

---

## 12. Summary

| Old Stack (Overkill) | New Stack (Right-Sized) |
|----------------------|------------------------|
| Turborepo monorepo | Single Next.js app |
| Express.js + Next.js | Next.js only (API routes) |
| Redis caching | No cache needed at this scale |
| Docker | Local PostgreSQL / Neon |
| Manual JWT | NextAuth.js v5 |
| Zustand + TanStack Query | Server components + fetch |

**Same features. Less complexity. Faster to build.**

---

> **Next Step:** Phase 1 — Project Setup (when ready to start coding)
