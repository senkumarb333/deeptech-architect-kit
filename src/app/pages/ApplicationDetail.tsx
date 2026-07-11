import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EntityHeader } from "@/app/components/EntityHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LifecycleBadge, CriticalityBadge } from "@/app/components/LifecycleBadge";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiInsights } from "@/app/components/AiInsights";

export default function ApplicationDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    enabled: !!id,
    queryKey: ["application", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("applications").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="text-muted-foreground">Loading…</div>;
  if (!data) return <div>Not found</div>;

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-2"><Link to="/app/applications"><ChevronLeft className="mr-1 h-4 w-4" />Back to Applications</Link></Button>
      <EntityHeader title={data.name} description={data.description ?? undefined} actions={
        <div className="flex gap-2"><LifecycleBadge status={data.lifecycle} /><CriticalityBadge level={data.criticality} /></div>
      } />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            <div><div className="text-xs text-muted-foreground">Vendor</div><div>{data.vendor ?? "—"}</div></div>
            <div><div className="text-xs text-muted-foreground">Category</div><div>{data.category ?? "—"}</div></div>
            <div><div className="text-xs text-muted-foreground">Cost / yr</div><div>{data.cost_annual ?? "—"}</div></div>
            <div><div className="text-xs text-muted-foreground">Users</div><div>{data.users_count ?? "—"}</div></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Relationships</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Services, APIs, dependencies and capability mapping will appear in the Knowledge Graph (Phase 2).
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <AiInsights
          title="AI Summary & Next Actions"
          prompt={`Analyze this application and produce three sections: **Summary**, **Risks**, **Recommended Next Actions**.`}
          context={`Application: ${data.name}\nDescription: ${data.description ?? "n/a"}\nVendor: ${data.vendor ?? "n/a"}\nCategory: ${data.category ?? "n/a"}\nLifecycle: ${data.lifecycle ?? "n/a"}\nCriticality: ${data.criticality ?? "n/a"}\nAnnual cost: ${data.cost_annual ?? "n/a"}\nUsers: ${data.users_count ?? "n/a"}`}
        />
      </div>
    </div>
  );
}
