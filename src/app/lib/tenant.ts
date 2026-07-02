import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "./auth";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
}

const KEY = "eaos:tenant";

export function useTenants() {
  const { user } = useSession();
  return useQuery({
    enabled: !!user,
    queryKey: ["tenants", user?.id],
    queryFn: async (): Promise<Tenant[]> => {
      const { data, error } = await supabase
        .from("tenants")
        .select("id,name,slug")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCurrentTenant() {
  const { data: tenants, isLoading } = useTenants();
  const stored = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
  const current =
    tenants?.find((t) => t.id === stored) ?? tenants?.[0] ?? null;
  const setCurrent = (id: string) => {
    localStorage.setItem(KEY, id);
    window.dispatchEvent(new Event("eaos:tenant-changed"));
  };
  return { tenant: current, tenants: tenants ?? [], setCurrent, isLoading };
}

export function useRoles(tenantId?: string) {
  const { user } = useSession();
  return useQuery({
    enabled: !!user && !!tenantId,
    queryKey: ["roles", user?.id, tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("tenant_id", tenantId!)
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.role);
    },
  });
}
