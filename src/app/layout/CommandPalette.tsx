import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import { APP_NAV } from "@/app/lib/nav";
import { useRecent } from "@/app/lib/useRecent";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentTenant } from "@/app/lib/tenant";
import { AppWindow, Building2, Clock, ArrowRight } from "lucide-react";

type Hit = { id: string; label: string; sub?: string; to: string };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { tenant } = useCurrentTenant();
  const recent = useRecent("command");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim();

  const { data: apps = [] } = useQuery<Hit[]>({
    enabled: open && !!tenant && q.length > 1,
    queryKey: ["cmdk", "apps", tenant?.id, q],
    queryFn: async () => {
      const { data, error } = await supabase.from("applications")
        .select("id,name,vendor").eq("tenant_id", tenant!.id)
        .ilike("name", `%${q}%`).limit(6);
      if (error) throw error;
      return (data ?? []).map((a: any) => ({
        id: a.id, label: a.name, sub: a.vendor ?? undefined, to: `/app/applications/${a.id}`,
      }));
    },
  });

  const { data: caps = [] } = useQuery<Hit[]>({
    enabled: open && !!tenant && q.length > 1,
    queryKey: ["cmdk", "caps", tenant?.id, q],
    queryFn: async () => {
      const { data, error } = await supabase.from("capabilities")
        .select("id,name,code").eq("tenant_id", tenant!.id)
        .ilike("name", `%${q}%`).limit(6);
      if (error) throw error;
      return (data ?? []).map((c: any) => ({
        id: c.id, label: c.name, sub: c.code ?? undefined, to: `/app/capabilities`,
      }));
    },
  });

  const go = (to: string, label?: string) => {
    if (label) recent.push(label);
    navigate(to);
    setOpen(false);
    setQuery("");
  };

  const navItems = useMemo(() => APP_NAV.flatMap((g) => g.items.map((i) => ({ ...i, group: g.label }))), []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search modules, applications, capabilities…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        {q.length < 2 && recent.items.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recent.items.map((r) => (
                <CommandItem key={r} value={`recent:${r}`} onSelect={() => setQuery(r)}>
                  <Clock className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>{r}</span>
                  <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground" aria-hidden="true" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {apps.length > 0 && (
          <CommandGroup heading="Applications">
            {apps.map((a) => (
              <CommandItem key={`app-${a.id}`} value={`app:${a.label}`} onSelect={() => go(a.to, a.label)}>
                <AppWindow className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{a.label}</span>
                {a.sub && <span className="ml-2 text-xs text-muted-foreground">{a.sub}</span>}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {caps.length > 0 && (
          <CommandGroup heading="Capabilities">
            {caps.map((c) => (
              <CommandItem key={`cap-${c.id}`} value={`cap:${c.label}`} onSelect={() => go(c.to, c.label)}>
                <Building2 className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{c.label}</span>
                {c.sub && <span className="ml-2 text-xs text-muted-foreground">{c.sub}</span>}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {APP_NAV.map((group) => (
          <CommandGroup key={group.label} heading={group.label}>
            {group.items.map((item) => (
              <CommandItem
                key={item.to}
                value={`nav:${item.title}`}
                onSelect={() => go(item.to, item.title)}
              >
                <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        {navItems.length === 0 && null}
      </CommandList>
    </CommandDialog>
  );
}
