import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { CommandPalette } from "./CommandPalette";
import { useSession, signOut } from "@/app/lib/auth";
import { useCurrentTenant } from "@/app/lib/tenant";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Command, LogOut, User as UserIcon } from "lucide-react";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { AiCopilot } from "@/app/components/AiCopilot";

export default function AppShell() {
  const { session, loading } = useSession();
  const location = useLocation();
  const { tenant, tenants, setCurrent } = useCurrentTenant();

  if (loading) {
    return <div role="status" aria-live="polite" className="flex h-dvh items-center justify-center text-muted-foreground">Loading workspace…</div>;
  }
  if (!session) {
    return <Navigate to="/app/login" state={{ from: location.pathname }} replace />;
  }

  const initials = (session.user.email ?? "?").slice(0, 2).toUpperCase();

  return (
    <SidebarProvider>
      <a
        href="#eaos-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow-md focus:outline focus:outline-2 focus:outline-primary"
      >
        Skip to main content
      </a>
      <div className="flex min-h-dvh w-full bg-muted/30">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8" aria-label="Switch workspace">
                    {tenant?.name ?? "Select workspace"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-56">
                  <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                  {tenants.map((t) => (
                    <DropdownMenuItem key={t.id} onSelect={() => setCurrent(t.id)}>
                      {t.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden gap-2 text-muted-foreground md:inline-flex"
                aria-label="Open command palette"
                onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}>
                <Command className="h-3.5 w-3.5" aria-hidden="true" /> Search <kbd className="ml-1 rounded bg-muted px-1 text-[10px]">⌘K</kbd>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Account menu">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><UserIcon className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main id="eaos-main" className="flex-1 p-6" tabIndex={-1}>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
        <CommandPalette />
        <AiCopilot context={`Current workspace: ${tenant?.name ?? "unknown"}. User: ${session.user.email}.`} />
      </div>
    </SidebarProvider>
  );
}
