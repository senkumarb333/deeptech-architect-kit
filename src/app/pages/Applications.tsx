import { useState } from "react";
import { Link } from "react-router-dom";
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
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, AppWindow } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/app/components/EmptyState";
import { TableRowsSkeleton } from "@/app/components/Skeletons";
import { ApiError } from "@/app/components/ErrorBoundary";

const LIFECYCLE = ["proposed", "planned", "active", "deprecated", "retired"] as const;
const CRIT = ["low", "medium", "high", "critical"] as const;

export default function Applications() {
  const { tenant } = useCurrentTenant();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", vendor: "", category: "", description: "",
    lifecycle: "active", criticality: "medium",
  });

  const { data = [], isLoading, error, refetch } = useQuery({
    enabled: !!tenant,
    queryKey: ["applications", tenant?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("applications")
        .select("id,name,vendor,category,lifecycle,criticality,updated_at")
        .eq("tenant_id", tenant!.id).order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from("applications").insert({
        ...form, tenant_id: tenant!.id, created_by: u.user!.id, updated_by: u.user!.id,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Application created");
      setOpen(false);
      setForm({ name: "", vendor: "", category: "", description: "", lifecycle: "active", criticality: "medium" });
      qc.invalidateQueries({ queryKey: ["applications", tenant?.id] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const filtered = data.filter((r: any) => !q || r.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <EntityHeader
        title="Applications"
        description="Application portfolio for your enterprise"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />New Application</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Application</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Vendor</Label><Input value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} /></div>
                  <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Lifecycle</Label>
                    <Select value={form.lifecycle} onValueChange={(v) => setForm({ ...form, lifecycle: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{LIFECYCLE.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Criticality</Label>
                    <Select value={form.criticality} onValueChange={(v) => setForm({ ...form, criticality: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{CRIT.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
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
        <div className="flex items-center gap-2 border-b p-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Filter applications…" className="h-8 border-none shadow-none focus-visible:ring-0"
            value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Lifecycle</TableHead>
              <TableHead>Criticality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRowsSkeleton rows={5} cols={5} />}
            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={5}>
                  <ApiError error={error} onRetry={() => refetch()} />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState
                    icon={AppWindow}
                    title={q ? "No applications match your filter" : "No applications yet"}
                    description={q ? "Try a different search term or clear the filter." : "Track vendors, lifecycle, and criticality across your portfolio."}
                    action={!q ? { label: "New Application", onClick: () => setOpen(true) } : undefined}
                    secondaryAction={q ? { label: "Clear filter", onClick: () => setQ("") } : undefined}
                  />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && filtered.map((a: any) => (
              <TableRow key={a.id} className="cursor-pointer">
                <TableCell><Link to={`/app/applications/${a.id}`} className="font-medium hover:underline">{a.name}</Link></TableCell>
                <TableCell>{a.vendor ?? "—"}</TableCell>
                <TableCell>{a.category ?? "—"}</TableCell>
                <TableCell><LifecycleBadge status={a.lifecycle} /></TableCell>
                <TableCell><CriticalityBadge level={a.criticality} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
