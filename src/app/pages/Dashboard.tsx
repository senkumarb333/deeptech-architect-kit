import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentTenant } from "@/app/lib/tenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppWindow, Building2, ShieldAlert, ScrollText, Bot, Boxes } from "lucide-react";
import { StatCardSkeleton } from "@/app/components/Skeletons";

function useCount(table: string, tenantId?: string) {
  return useQuery({
    enabled: !!tenantId,
    queryKey: [table, "count", tenantId],
    queryFn: async () => {
      const { count, error } = await supabase
        .from(table as any)
        .select("*", { count: "exact", head: true })
        .eq("tenant_id", tenantId!);
      if (error) throw error;
      return count ?? 0;
    },
  });
}

export default function Dashboard() {
  const { tenant } = useCurrentTenant();
  const apps = useCount("applications", tenant?.id);
  const caps = useCount("capabilities", tenant?.id);
  const svcs = useCount("services", tenant?.id);
  const risks = useCount("risks", tenant?.id);
  const adrs = useCount("architecture_decisions", tenant?.id);
  const docs = useCount("documents", tenant?.id);

  const stats = [
    { label: "Applications", q: apps, icon: AppWindow },
    { label: "Capabilities", q: caps, icon: Building2 },
    { label: "Services", q: svcs, icon: Boxes },
    { label: "Open Risks", q: risks, icon: ShieldAlert },
    { label: "Decisions", q: adrs, icon: ScrollText },
    { label: "Knowledge Docs", q: docs, icon: Bot },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground">{tenant?.name ?? "No workspace"} · Real-time enterprise architecture posture</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) =>
          s.q.isLoading ? (
            <StatCardSkeleton key={s.label} />
          ) : (
            <Card key={s.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">{s.label}</CardTitle>
                <s.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold" aria-live="polite">
                  {s.q.error ? "—" : s.q.data ?? 0}
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>


      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Architecture Health</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lifecycle, criticality and dependency scoring will appear here once your portfolio has data.
              Start by importing or creating <a className="underline" href="/app/applications">Applications</a> and{" "}
              <a className="underline" href="/app/capabilities">Capabilities</a>.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The Chief Architect Agent will surface findings from your repository. Configure it in{" "}
              <a className="underline" href="/app/agents">Agent Studio</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
