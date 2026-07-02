
-- =========================================================
-- EAOS Phase 1 Foundation Schema
-- =========================================================

-- ---------- ENUMS ----------
CREATE TYPE public.app_role AS ENUM (
  'super_admin','enterprise_admin','architect','reviewer','developer','analyst','viewer'
);

CREATE TYPE public.lifecycle_status AS ENUM (
  'proposed','planned','active','deprecated','retired'
);

CREATE TYPE public.criticality AS ENUM ('low','medium','high','critical');

CREATE TYPE public.risk_status AS ENUM ('open','mitigating','accepted','closed');

CREATE TYPE public.adr_status AS ENUM ('draft','proposed','accepted','rejected','superseded');

-- ---------- HELPER: updated_at ----------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ---------- TENANTS ----------
CREATE TABLE public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tenants TO authenticated;
GRANT ALL ON public.tenants TO service_role;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- PROFILES ----------
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- MEMBERSHIPS ----------
CREATE TABLE public.tenant_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tenant_members TO authenticated;
GRANT ALL ON public.tenant_members TO service_role;
ALTER TABLE public.tenant_members ENABLE ROW LEVEL SECURITY;

-- ---------- USER ROLES ----------
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, tenant_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ---------- SECURITY DEFINER HELPERS ----------
CREATE OR REPLACE FUNCTION public.is_tenant_member(_user uuid, _tenant uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.tenant_members
    WHERE user_id = _user AND tenant_id = _tenant);
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user uuid, _tenant uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles
    WHERE user_id = _user AND tenant_id = _tenant AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.can_write_tenant(_user uuid, _tenant uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles
    WHERE user_id = _user AND tenant_id = _tenant
      AND role IN ('super_admin','enterprise_admin','architect'));
$$;

-- ---------- RLS: tenants ----------
CREATE POLICY "members read tenants" ON public.tenants FOR SELECT TO authenticated
  USING (public.is_tenant_member(auth.uid(), id));
CREATE POLICY "any auth create tenant" ON public.tenants FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);
CREATE POLICY "admins update tenant" ON public.tenants FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), id, 'enterprise_admin') OR public.has_role(auth.uid(), id, 'super_admin'));

-- ---------- RLS: profiles ----------
CREATE POLICY "profiles self read" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles self insert" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles self update" ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- ---------- RLS: tenant_members ----------
CREATE POLICY "members read own memberships" ON public.tenant_members FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_tenant_member(auth.uid(), tenant_id));
CREATE POLICY "admins manage memberships" ON public.tenant_members FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), tenant_id, 'enterprise_admin') OR user_id = auth.uid())
  WITH CHECK (public.has_role(auth.uid(), tenant_id, 'enterprise_admin') OR user_id = auth.uid());

-- ---------- RLS: user_roles ----------
CREATE POLICY "members read tenant roles" ON public.user_roles FOR SELECT TO authenticated
  USING (public.is_tenant_member(auth.uid(), tenant_id));

-- ---------- AUDIT LOG ----------
CREATE TABLE public.audit_log (
  id bigserial PRIMARY KEY,
  tenant_id uuid,
  actor uuid,
  entity text NOT NULL,
  entity_id uuid,
  action text NOT NULL,
  diff jsonb,
  at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read tenant audit" ON public.audit_log FOR SELECT TO authenticated
  USING (tenant_id IS NULL OR public.is_tenant_member(auth.uid(), tenant_id));

CREATE OR REPLACE FUNCTION public.audit_row()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _tid uuid;
BEGIN
  BEGIN _tid := COALESCE((NEW).tenant_id, (OLD).tenant_id); EXCEPTION WHEN OTHERS THEN _tid := NULL; END;
  INSERT INTO public.audit_log(tenant_id, actor, entity, entity_id, action, diff)
  VALUES (_tid, auth.uid(), TG_TABLE_NAME,
    COALESCE((NEW).id, (OLD).id), TG_OP,
    jsonb_build_object('new', to_jsonb(NEW), 'old', to_jsonb(OLD)));
  RETURN COALESCE(NEW, OLD);
END; $$;

-- ---------- GENERIC EA ENTITY BUILDER (as raw SQL for clarity) ----------

-- CAPABILITIES
CREATE TABLE public.capabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.capabilities(id) ON DELETE SET NULL,
  name text NOT NULL,
  code text,
  description text,
  level int NOT NULL DEFAULT 1,
  owner uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  criticality public.criticality NOT NULL DEFAULT 'medium',
  lifecycle public.lifecycle_status NOT NULL DEFAULT 'active',
  tags text[] DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.capabilities TO authenticated;
GRANT ALL ON public.capabilities TO service_role;
ALTER TABLE public.capabilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cap read" ON public.capabilities FOR SELECT TO authenticated
  USING (public.is_tenant_member(auth.uid(), tenant_id));
CREATE POLICY "cap write" ON public.capabilities FOR INSERT TO authenticated
  WITH CHECK (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "cap update" ON public.capabilities FOR UPDATE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "cap delete" ON public.capabilities FOR DELETE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE TRIGGER trg_cap_upd BEFORE UPDATE ON public.capabilities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_cap_audit AFTER INSERT OR UPDATE OR DELETE ON public.capabilities
  FOR EACH ROW EXECUTE FUNCTION public.audit_row();

-- APPLICATIONS
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  code text,
  description text,
  vendor text,
  category text,
  technology text[] DEFAULT '{}',
  business_owner uuid REFERENCES auth.users(id),
  technical_owner uuid REFERENCES auth.users(id),
  capability_id uuid REFERENCES public.capabilities(id) ON DELETE SET NULL,
  lifecycle public.lifecycle_status NOT NULL DEFAULT 'active',
  criticality public.criticality NOT NULL DEFAULT 'medium',
  cost_annual numeric,
  users_count int,
  tags text[] DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "app read" ON public.applications FOR SELECT TO authenticated
  USING (public.is_tenant_member(auth.uid(), tenant_id));
CREATE POLICY "app write" ON public.applications FOR INSERT TO authenticated
  WITH CHECK (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "app update" ON public.applications FOR UPDATE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "app delete" ON public.applications FOR DELETE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE TRIGGER trg_app_upd BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_app_audit AFTER INSERT OR UPDATE OR DELETE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.audit_row();

-- SERVICES
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  application_id uuid REFERENCES public.applications(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  kind text,
  lifecycle public.lifecycle_status NOT NULL DEFAULT 'active',
  criticality public.criticality NOT NULL DEFAULT 'medium',
  tags text[] DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "svc read" ON public.services FOR SELECT TO authenticated
  USING (public.is_tenant_member(auth.uid(), tenant_id));
CREATE POLICY "svc write" ON public.services FOR INSERT TO authenticated
  WITH CHECK (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "svc update" ON public.services FOR UPDATE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "svc delete" ON public.services FOR DELETE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE TRIGGER trg_svc_upd BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_svc_audit AFTER INSERT OR UPDATE OR DELETE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.audit_row();

-- ARCHITECTURE DECISIONS (ADRs)
CREATE TABLE public.architecture_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  context text,
  decision text,
  consequences text,
  status public.adr_status NOT NULL DEFAULT 'draft',
  supersedes uuid REFERENCES public.architecture_decisions(id) ON DELETE SET NULL,
  tags text[] DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.architecture_decisions TO authenticated;
GRANT ALL ON public.architecture_decisions TO service_role;
ALTER TABLE public.architecture_decisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "adr read" ON public.architecture_decisions FOR SELECT TO authenticated
  USING (public.is_tenant_member(auth.uid(), tenant_id));
CREATE POLICY "adr write" ON public.architecture_decisions FOR INSERT TO authenticated
  WITH CHECK (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "adr update" ON public.architecture_decisions FOR UPDATE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "adr delete" ON public.architecture_decisions FOR DELETE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE TRIGGER trg_adr_upd BEFORE UPDATE ON public.architecture_decisions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_adr_audit AFTER INSERT OR UPDATE OR DELETE ON public.architecture_decisions
  FOR EACH ROW EXECUTE FUNCTION public.audit_row();

-- RISKS
CREATE TABLE public.risks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  likelihood int NOT NULL DEFAULT 3 CHECK (likelihood BETWEEN 1 AND 5),
  impact int NOT NULL DEFAULT 3 CHECK (impact BETWEEN 1 AND 5),
  status public.risk_status NOT NULL DEFAULT 'open',
  owner uuid REFERENCES auth.users(id),
  application_id uuid REFERENCES public.applications(id) ON DELETE SET NULL,
  mitigation text,
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.risks TO authenticated;
GRANT ALL ON public.risks TO service_role;
ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "risk read" ON public.risks FOR SELECT TO authenticated
  USING (public.is_tenant_member(auth.uid(), tenant_id));
CREATE POLICY "risk write" ON public.risks FOR INSERT TO authenticated
  WITH CHECK (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "risk update" ON public.risks FOR UPDATE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "risk delete" ON public.risks FOR DELETE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE TRIGGER trg_risk_upd BEFORE UPDATE ON public.risks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_risk_audit AFTER INSERT OR UPDATE OR DELETE ON public.risks
  FOR EACH ROW EXECUTE FUNCTION public.audit_row();

-- DOCUMENTS
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  url text,
  kind text,
  tags text[] DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "doc read" ON public.documents FOR SELECT TO authenticated
  USING (public.is_tenant_member(auth.uid(), tenant_id));
CREATE POLICY "doc write" ON public.documents FOR INSERT TO authenticated
  WITH CHECK (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "doc update" ON public.documents FOR UPDATE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE POLICY "doc delete" ON public.documents FOR DELETE TO authenticated
  USING (public.can_write_tenant(auth.uid(), tenant_id));
CREATE TRIGGER trg_doc_upd BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_doc_audit AFTER INSERT OR UPDATE OR DELETE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.audit_row();

-- ---------- NEW USER BOOTSTRAP ----------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _tenant_id uuid;
  _slug text;
  _base text;
BEGIN
  INSERT INTO public.profiles(id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)),
    NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;

  _base := lower(regexp_replace(COALESCE(split_part(NEW.email,'@',1),'org'), '[^a-z0-9]+','-','g'));
  _slug := _base || '-' || substr(replace(NEW.id::text,'-',''),1,6);

  INSERT INTO public.tenants(name, slug, created_by)
  VALUES (initcap(replace(_base,'-',' ')) || ' Workspace', _slug, NEW.id)
  RETURNING id INTO _tenant_id;

  INSERT INTO public.tenant_members(tenant_id, user_id) VALUES (_tenant_id, NEW.id);
  INSERT INTO public.user_roles(user_id, tenant_id, role) VALUES (NEW.id, _tenant_id, 'enterprise_admin');
  INSERT INTO public.user_roles(user_id, tenant_id, role) VALUES (NEW.id, _tenant_id, 'architect');

  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
