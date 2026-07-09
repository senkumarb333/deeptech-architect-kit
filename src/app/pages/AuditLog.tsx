import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentTenant } from "@/app/lib/tenant";
import { EntityHeader } from "@/app/components/EntityHeader";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/app/components/EmptyState";
import { TableRowsSkeleton } from "@/app/components/Skeletons";
import { ApiError } from "@/app/components/ErrorBoundary";
import { ScrollText } from "lucide-react";

export default function AuditLog() {
  const { tenant } = useCurrentTenant();
  const { data = [], isLoading, error, refetch } = useQuery({
    enabled: !!tenant,
    queryKey: ["audit", tenant?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("audit_log")
        .select("id,entity,entity_id,action,actor,at")
        .eq("tenant_id", tenant!.id).order("at", { ascending: false }).limit(200);
      if (error) throw error; return data;
    },
  });
  return (
    <div>
      <EntityHeader title="Audit Log" description="Every change to core entities in this workspace" />
      <Card>
        <Table>
          <TableHeader><TableRow><TableHead>When</TableHead><TableHead>Entity</TableHead><TableHead>Action</TableHead><TableHead>Actor</TableHead></TableRow></TableHeader>
          <TableBody>
            {isLoading && <TableRowsSkeleton rows={6} cols={4} />}
            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={4}>
                  <ApiError error={error} onRetry={() => refetch()} />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <EmptyState
                    icon={ScrollText}
                    title="No activity yet"
                    description="As users create, edit, or delete entities across this workspace, an immutable audit trail will appear here."
                  />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && data.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell className="text-xs text-muted-foreground">{new Date(r.at).toLocaleString()}</TableCell>
                <TableCell><span className="font-mono text-xs">{r.entity}</span></TableCell>
                <TableCell><Badge variant="outline">{r.action}</Badge></TableCell>
                <TableCell className="font-mono text-xs">{r.actor?.slice(0, 8) ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
