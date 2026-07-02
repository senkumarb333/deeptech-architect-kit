# Enterprise Architecture Operating System (EAOS) — Build Plan

This is a multi-month platform, not a single build. I'll deliver it in phases, preserving the existing marketing site (iYarKai) and mounting the EAOS product under `/app/*`. Each phase ships production-quality code (no mocks).

## Guiding decisions

- **Marketing site** (current `/`, `/products`, `/solutions`, …) stays as-is.
- **Product app** mounts under `/app/*` with its own shell (left nav, workspace switcher, command palette, AI panel).
- **Backend**: Lovable Cloud (Supabase) — Postgres + pgvector + RLS + Edge Functions + Realtime.
- **AI**: Lovable AI Gateway (Gemini default, OpenAI/Anthropic on request). MCP + RAG + multi-agent orchestration server-side.
- **Multi-tenancy**: `tenant_id` on every row, RLS via `has_role()` + `is_member(tenant)` security-definer functions. Roles in a separate `user_roles` table.
- **Auth**: Email+password + Google SSO by default (Cloud-native). GitHub/Azure AD/MFA in Phase 2.
- **Frontend**: existing React/Vite/Tailwind/shadcn stack + TanStack Query + React Hook Form + Zod + React Flow.
- **Observability**: audit_log table + Edge Function event emitter; Sentry/OTel wiring documented, enabled when user provides DSN.

## Phase 1 — Foundation (this build)

Goal: land the platform skeleton end-to-end so every later phase plugs in.

1. Enable Lovable Cloud, enable Auth (email + Google).
2. Schema (migration) — core tables with RLS + GRANTs:
   `tenants, organizations, workspaces, memberships, user_roles (app_role enum), audit_log, capabilities, applications, services, apis, events_catalog, databases_catalog, infrastructure, security_controls, ai_assets, agents, prompts, workflows, documents (pgvector), architecture_decisions, risks, controls, compliance_items, notifications`.
   Security-definer helpers: `has_role`, `current_tenant`, `is_tenant_member`.
3. App shell at `/app`:
   - `AppLayout` with collapsible left nav (shadcn Sidebar), workspace switcher, breadcrumbs, global command palette (⌘K), AI assistant slide-over, activity feed drawer.
   - Route tree for all top-level modules (Executive Dashboard, Business/Application/Data/Integration/Technology/Security/AI Architecture, Repository, Knowledge Graph, Agent Studio, Reviews, Governance, Portfolio, Search, Admin).
4. Reusable primitives: `EntityCard, EntityTable, EntityDrawer, RelationshipList, LifecycleBadge, OwnerAvatar, TagList, AuditTimeline, MetricsCard, RiskBadge`.
5. Repository CRUD for **Applications** and **Capabilities** as the reference vertical slice (list, detail, create, edit, relate, audit, RLS-scoped) — proves the pattern the other 15 entity types will reuse.
6. Executive Dashboard v1: real counts + health/risk/cost placeholders wired to live queries (not mock JSON).
7. RBAC gate on `/app/*` (redirects unauth → `/app/login`); role-aware nav.
8. Audit logging trigger on all core tables.

## Phase 2 — Repository breadth + Knowledge Graph

- CRUD + relationships for Services, APIs, Events, Databases, Infrastructure, Security Controls, AI Assets, Documents, ADRs, Risks, Controls, Standards.
- Relationship engine (`entity_links` polymorphic) + impact/dependency analysis queries.
- React Flow-based **Knowledge Graph Explorer** and **Capability Map**, **Application Landscape**.
- Enterprise search (Postgres FTS + pgvector hybrid) with global command palette results.

## Phase 3 — AI Agent Studio + Reviews + Governance

- Agent registry (Chief/Enterprise/Solution/Security/Cloud/Data/AI/DevOps/Governance/Review architects) with prompt, tools, memory, knowledge attachments.
- Multi-agent orchestrator Edge Function (AI SDK, `stepCountIs(50)`, tool calling, RAG over `documents` via pgvector).
- Architecture Review workflow state machine (Draft→Submit→Review→Approve→Publish→Retire) with approvers, comments, findings, notifications, audit.
- Governance modules: Standards, Policies, Controls, Compliance, Risks, Exceptions, Tech Debt, Principles.

## Phase 4 — Portfolio, Analytics, Observability, DevSecOps

- Portfolio dashboards, roadmaps, investments, cost/risk/value scoring.
- Metrics dashboards (Recharts) fed by materialized views.
- OTel/Sentry hooks, cost tracking table for AI calls, per-tenant usage limits.
- CI/CD, IaC, container/K8s reference docs shipped as `/docs` inside the app.

## Phase 5 — Enterprise hardening

- MFA, GitHub + Azure AD SSO (requires external Supabase project — flagged for user).
- SCIM, per-tenant data residency notes, export/import, backup/restore runbooks.
- Full audit export, evidence packs for SOC2/ISO.

## Technical notes / details

- **URL layout**: marketing untouched; product under `/app`. Login at `/app/login`. Tenant-scoped routes: `/app/:workspaceSlug/...`.
- **State**: TanStack Query for server state; Zustand only for shell UI (sidebar, command palette, AI panel).
- **Forms**: React Hook Form + Zod schemas colocated with entity modules.
- **Folder structure** (new):
  ```text
  src/
    app/                     # EAOS product
      layout/                # AppShell, Sidebar, CommandPalette, AIPanel
      modules/
        dashboard/
        business/{capabilities,value-streams,processes}
        applications/
        data/
        integration/
        technology/
        security/
        ai/{agents,prompts,knowledge,evals}
        repository/
        graph/
        reviews/
        governance/
        portfolio/
        search/
        admin/
      lib/{rbac,tenant,audit,search,graph}/
      components/            # EntityCard, EntityTable, ...
    integrations/supabase/   # existing
  supabase/
    migrations/              # phased SQL
    functions/
      agent-run/             # multi-agent orchestrator
      search/                # hybrid FTS+vector
      audit-emit/
  ```
- **RLS pattern** (every table):
  `USING (tenant_id = current_tenant() AND is_tenant_member(tenant_id))` plus role checks via `has_role()`.
- **Audit**: trigger writes `audit_log(tenant_id, actor, entity, entity_id, action, diff jsonb, at)`.
- **AI cost tracking**: `ai_events(tenant_id, agent_id, model, tokens_in, tokens_out, cost_usd, latency_ms, at)`.
- **Non-goals for Phase 1**: full graph viz interactions, all 16 entity CRUDs, workflow engine, agent studio UI — those are Phases 2–3. Phase 1 delivers the platform they slot into.

## What I need from you before I start Phase 1

1. **Confirm Phase 1 scope** as written (foundation + Applications/Capabilities vertical slice). Reply "go" to proceed.
2. **Product name** to use in the app shell (default: "iYarKai EAOS").
3. **SSO in Phase 1**: Email + Google (default) OK, or add GitHub now?
4. **Tenant model at launch**: single default tenant auto-created per signup, or invite-only tenants?

Once you answer, I'll enable Cloud + Auth, ship the migration, and build the `/app` shell + Applications/Capabilities slice in one pass.