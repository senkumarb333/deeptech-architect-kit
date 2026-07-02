import { Badge } from "@/components/ui/badge";

const map: Record<string, string> = {
  proposed: "bg-muted text-muted-foreground",
  planned: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  active: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  deprecated: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  retired: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
};

export function LifecycleBadge({ status }: { status: string }) {
  return <Badge variant="outline" className={map[status] ?? ""}>{status}</Badge>;
}

const critMap: Record<string, string> = {
  low: "text-muted-foreground",
  medium: "text-blue-600",
  high: "text-amber-600",
  critical: "text-red-600",
};
export function CriticalityBadge({ level }: { level: string }) {
  return <Badge variant="outline" className={critMap[level] ?? ""}>{level}</Badge>;
}
