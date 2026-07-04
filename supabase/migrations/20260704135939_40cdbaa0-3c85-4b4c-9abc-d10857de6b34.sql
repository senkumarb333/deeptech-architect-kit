
-- 1. Restrict profiles SELECT to self
DROP POLICY IF EXISTS "profiles self read" ON public.profiles;
CREATE POLICY "profiles self read"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- 2. Restrict user_roles SELECT to the owning user only
DROP POLICY IF EXISTS "members read tenant roles" ON public.user_roles;
CREATE POLICY "users read own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 3. Revoke EXECUTE on SECURITY DEFINER functions that are only used
--    by triggers (never by client PostgREST calls).
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.audit_row() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- 4. For RLS helper functions, anon has no legitimate need to call them
--    (all callers are authenticated policies). Keep authenticated so RLS
--    policies that inline them continue to work.
REVOKE EXECUTE ON FUNCTION public.is_tenant_member(uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_write_tenant(uuid, uuid) FROM PUBLIC, anon;
