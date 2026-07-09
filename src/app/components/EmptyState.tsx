import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void; href?: string };
  secondaryAction?: { label: string; onClick?: () => void; href?: string };
  children?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondaryAction,
  children,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-3 px-6 py-14 text-center ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && (
          <p className="mx-auto max-w-md text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {(action || secondaryAction) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {action &&
            (action.href ? (
              <Button asChild size="sm"><a href={action.href}>{action.label}</a></Button>
            ) : (
              <Button size="sm" onClick={action.onClick}>{action.label}</Button>
            ))}
          {secondaryAction &&
            (secondaryAction.href ? (
              <Button asChild size="sm" variant="outline"><a href={secondaryAction.href}>{secondaryAction.label}</a></Button>
            ) : (
              <Button size="sm" variant="outline" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>
            ))}
        </div>
      )}
      {children}
    </div>
  );
}
