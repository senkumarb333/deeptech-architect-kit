import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function TableRowsSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <TableRow key={r} aria-hidden="true">
          {Array.from({ length: cols }).map((__, c) => (
            <TableCell key={c}>
              <Skeleton className="h-4 w-[80%]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function StatCardSkeleton() {
  return (
    <Card aria-hidden="true">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-14" />
      </CardContent>
    </Card>
  );
}

export function CardBlockSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}
