import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Square, RotateCcw, Copy, Trash2, History, Wand2, Check } from "lucide-react";
import { streamCopilot, type CopilotMessage, loadPromptHistory, pushPromptHistory, clearPromptHistory, PROMPT_TEMPLATES } from "@/app/lib/copilot";
import { toast } from "@/hooks/use-toast";

interface Props { context?: string; triggerLabel?: string; }

export function AiCopilot({ context, triggerLabel = "AI Copilot" }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { if (open) setHistory(loadPromptHistory()); }, [open]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, streaming]);

  async function run(seedMessages: CopilotMessage[]) {
    setStreaming(true);
    setMessages([...seedMessages, { role: "assistant", content: "" }]);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamCopilot({
        messages: seedMessages,
        context,
        signal: ctrl.signal,
        onDelta: (chunk) => {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant") next[next.length - 1] = { ...last, content: last.content + chunk };
            return next;
          });
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (msg !== "The user aborted a request.") toast({ title: "Copilot error", description: msg, variant: "destructive" });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || streaming) return;
    pushPromptHistory(text);
    setHistory(loadPromptHistory());
    setInput("");
    await run([...messages.filter((m) => m.content), { role: "user", content: text }]);
  }

  function handleStop() { abortRef.current?.abort(); }

  async function handleRegenerate() {
    let lastUserIdx = -1;
    for (let i = messages.length - 1; i >= 0; i--) if (messages[i].role === "user") { lastUserIdx = i; break; }
    if (lastUserIdx === -1) return;
    await run(messages.slice(0, lastUserIdx + 1));
  }

  function handleCopy(text: string, idx: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    });
  }

  function handleClear() {
    setMessages([]);
    setInput("");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-40 h-14 rounded-full shadow-lg gap-2 pl-4 pr-5 bg-gradient-to-r from-primary to-primary/80 hover:opacity-95"
          aria-label={triggerLabel}
        >
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          <span className="hidden md:inline font-medium">{triggerLabel}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-lg">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" /> AI Copilot
            <Badge variant="secondary" className="ml-1 text-[10px]">Beta</Badge>
          </SheetTitle>
          <SheetDescription>Ask about your architecture, risks, cost or next actions.</SheetDescription>
        </SheetHeader>

        {messages.length === 0 ? (
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Wand2 className="h-3.5 w-3.5" aria-hidden="true" /> Prompt templates
              </div>
              <div className="grid gap-2">
                {PROMPT_TEMPLATES.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setInput(t.prompt)}
                    className="rounded-lg border border-border bg-card px-3 py-2 text-left text-sm transition hover:border-primary/50 hover:bg-accent"
                  >
                    <div className="font-medium">{t.label}</div>
                    <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{t.prompt}</div>
                  </button>
                ))}
              </div>
            </div>
            {history.length > 0 && (
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <span className="flex items-center gap-1.5"><History className="h-3.5 w-3.5" aria-hidden="true" /> Recent prompts</span>
                  <button onClick={() => { clearPromptHistory(); setHistory([]); }} className="text-[10px] font-normal normal-case text-muted-foreground hover:text-foreground">Clear</button>
                </div>
                <div className="space-y-1">
                  {history.slice(0, 6).map((h, i) => (
                    <button key={i} onClick={() => setInput(h)} className="block w-full truncate rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground">
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div ref={scrollRef} className="px-5 py-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  <div className={m.role === "user" ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground" : "group max-w-full text-sm"}>
                    {m.role === "assistant" ? (
                      <>
                        <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" /> Copilot
                        </div>
                        <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                          {m.content || (streaming && i === messages.length - 1 ? <span className="inline-block h-3 w-1 animate-pulse bg-primary align-middle" /> : null)}
                        </div>
                        {m.content && !streaming && (
                          <div className="mt-2 flex gap-2 opacity-0 transition group-hover:opacity-100">
                            <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={() => handleCopy(m.content, i)}>
                              {copiedIdx === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              {copiedIdx === i ? "Copied" : "Copy"}
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="border-t bg-background/60 px-4 py-3 backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex gap-1">
              {streaming ? (
                <Button size="sm" variant="outline" className="h-7 gap-1 px-2 text-xs" onClick={handleStop}>
                  <Square className="h-3 w-3" /> Stop
                </Button>
              ) : messages.length > 0 ? (
                <>
                  <Button size="sm" variant="outline" className="h-7 gap-1 px-2 text-xs" onClick={handleRegenerate}>
                    <RotateCcw className="h-3 w-3" /> Regenerate
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={handleClear}>
                    <Trash2 className="h-3 w-3" /> Clear
                  </Button>
                </>
              ) : null}
            </div>
            <span className="text-[10px] text-muted-foreground">Enter to send · Shift+Enter for new line</span>
          </div>
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the copilot…"
              rows={2}
              className="min-h-[52px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
              }}
              disabled={streaming}
            />
            <Button size="icon" onClick={handleSend} disabled={!input.trim() || streaming} aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
