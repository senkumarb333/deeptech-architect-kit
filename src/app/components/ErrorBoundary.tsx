import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props { children: ReactNode; fallback?: (err: Error, reset: () => void) => ReactNode }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold">Something went wrong</h3>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              An unexpected error occurred while rendering this view. You can retry, or refresh the page.
            </p>
            <p className="mt-2 max-w-md truncate font-mono text-xs text-muted-foreground/70">
              {error.message}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={this.reset}>
              <RefreshCcw className="mr-2 h-4 w-4" aria-hidden="true" /> Retry
            </Button>
            <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

interface ApiErrorProps {
  error: unknown;
  onRetry?: () => void;
  title?: string;
}
export function ApiError({ error, onRetry, title = "Couldn't load this view" }: ApiErrorProps) {
  const message = error instanceof Error ? error.message : "Unknown error";
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="max-w-md text-xs text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          <RefreshCcw className="mr-2 h-4 w-4" aria-hidden="true" /> Try again
        </Button>
      )}
    </div>
  );
}
