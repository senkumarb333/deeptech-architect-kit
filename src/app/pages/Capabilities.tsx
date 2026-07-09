import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentTenant } from "@/app/lib/tenant";
import { EntityHeader } from "@/app/components/EntityHeader";
import { LifecycleBadge, CriticalityBadge } from "@/app/components/LifecycleBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Building2 } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/app/components/EmptyState";
import { TableRowsSkeleton } from "@/app/components/Skeletons";
import { ApiError } from "@/app/components/ErrorBoundary";

export default function Capabilities() {
  const { tenant } = useCurrentTenant();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", description: "", level: 1, criticality: "medium", lifecycle: "active" });

  const { data = [], isLoading, error, refetch } = useQuery({
    enabled: !!tenant,
    queryKey: ["capabilities", tenant?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("capabilities")
        .select("id,name,code,level,lifecycle,criticality")
        .eq("tenant_id", tenant!.id).order("level").order("name");
      if (error) throw error; return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from("capabilities").insert({
        ...form, tenant_id: tenant!.id, created_by: u.user!.id, updated_by: u.user!.id,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Capability created"); setOpen(false);
      setForm({ name: "", code: "", description: "", level: 1, criticality: "medium", lifecycle: "active" });
      qc.invalidateQueries({ queryKey: ["capabilities", tenant?.id] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div>
      <EntityHeader
        title="Business Capabilities"
        description="Hierarchical capability map of your enterprise"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />New Capability</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Capability</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Code</Label><Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></div>
                  <div><Label>Level</Label><Input type="number" min={1} max={5} value={form.level} onChange={(e) => setForm({ ...form, level: parseInt(e.target.value) || 1 })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Lifecycle</Label>
                    <Select value={form.lifecycle} onValueChange={(v) => setForm({ ...form, lifecycle: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["proposed","planned","active","deprecated","retired"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Criticality</Label>
                    <Select value={form.criticality} onValueChange={(v) => setForm({ ...form, criticality: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["low","medium","high","critical"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => create.mutate()} disabled={!form.name || create.isPending}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <Card>
        <Table>
          <TableHeader><TableRow>
            <TableHead>Name</TableHead><TableHead>Code</TableHead><TableHead>Level</TableHead>
            <TableHead>Lifecycle</TableHead><TableHead>Criticality</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {isLoading && <TableRowsSkeleton rows={5} cols={5} />}
            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={5}>
                  <ApiError error={error} onRetry={() => refetch()} />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState
                    icon={Building2}
                    title="No capabilities yet"
                    description="Model your business capability map to align applications, services, and outcomes."
                    action={{ label: "New Capability", onClick: () => setOpen(true) }}
                  />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && data.map((c: any) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>{c.code ?? "—"}</TableCell>
                <TableCell>L{c.level}</TableCell>
                <TableCell><LifecycleBadge status={c.lifecycle} /></TableCell>
                <TableCell><CriticalityBadge level={c.criticality} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
