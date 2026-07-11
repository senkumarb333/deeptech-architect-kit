import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";
import { streamCopilot } from "@/app/lib/copilot";
import { toast } from "@/hooks/use-toast";

interface Props {
  title?: string;
  prompt: string;
  context?: string;
  autoRun?: boolean;
}

/** Compact AI insight card: one-shot streamed summary + copy/regenerate. */
export function AiInsights({ title = "AI Summary", prompt, context, autoRun = false }: Props) {
  const [text, setText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [started, setStarted] = useState(autoRun);
  const [copied, setCopied] = useState(false);

  async function run() {
    setStarted(true);
    setStreaming(true);
    setText("");
    try {
      await streamCopilot({
        messages: [{ role: "user", content: prompt }],
        context,
        onDelta: (chunk) => setText((prev) => prev + chunk),
      });
    } catch (err) {
      toast({ title: "AI error", description: err instanceof Error ? err.message : String(err), variant: "destructive" });
    } finally {
      setStreaming(false);
    }
  }

  if (autoRun && !streaming && !text && started) { void run(); }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" /> {title}
        </CardTitle>
        <div className="flex gap-1">
          {text && !streaming && (
            <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs"
              onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          )}
          <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={run} disabled={streaming}>
            <RefreshCw className={`h-3 w-3 ${streaming ? "animate-spin" : ""}`} />
            {streaming ? "Analyzing…" : started ? "Regenerate" : "Generate"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!started ? (
          <p className="text-sm text-muted-foreground">Click <span className="font-medium text-foreground">Generate</span> to get an AI-generated summary, risks and next actions.</p>
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {text || <span className="text-muted-foreground">Analyzing…</span>}
            {streaming && <span className="inline-block h-3 w-1 animate-pulse bg-primary align-middle ml-0.5" />}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
