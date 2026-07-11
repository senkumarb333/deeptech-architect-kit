// Streaming client for the AI copilot edge function. Parses OpenAI-format SSE.
const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-copilot`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export type CopilotMessage = { role: "user" | "assistant"; content: string };

export interface StreamOpts {
  messages: CopilotMessage[];
  context?: string;
  signal?: AbortSignal;
  onDelta: (chunk: string) => void;
}

export async function streamCopilot({ messages, context, signal, onDelta }: StreamOpts): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ANON}`,
      apikey: ANON,
    },
    body: JSON.stringify({ messages, context, stream: true }),
  });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try { const j = await res.json(); msg = j.error ?? msg; } catch { /* ignore */ }
    throw new Error(msg);
  }
  if (!res.body) throw new Error("No response stream");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      const line = part.split("\n").find((l) => l.startsWith("data:"));
      if (!line) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const j = JSON.parse(data);
        const delta = j?.choices?.[0]?.delta?.content ?? j?.choices?.[0]?.message?.content ?? "";
        if (delta) onDelta(delta);
      } catch { /* skip malformed chunk */ }
    }
  }
}

// -- Prompt history (localStorage) --------------------------------------------
const HISTORY_KEY = "eaos.copilot.history";
const MAX_HISTORY = 20;

export function loadPromptHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((s) => typeof s === "string") : [];
  } catch { return []; }
}

export function pushPromptHistory(prompt: string): void {
  const trimmed = prompt.trim();
  if (!trimmed) return;
  const current = loadPromptHistory().filter((p) => p !== trimmed);
  const next = [trimmed, ...current].slice(0, MAX_HISTORY);
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); } catch { /* ignore */ }
}

export function clearPromptHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// -- Saved prompt templates ---------------------------------------------------
export const PROMPT_TEMPLATES: { label: string; prompt: string }[] = [
  { label: "Architecture review", prompt: "Review the current architecture posture of my workspace. Highlight strengths, weaknesses, and 3 concrete improvements." },
  { label: "Detect risks", prompt: "Scan for architectural, security and operational risks I should be aware of and rank them by severity." },
  { label: "Cost optimization", prompt: "Suggest 5 cost-optimization opportunities across applications and services in my portfolio." },
  { label: "Security review", prompt: "Perform a lightweight security review of my application landscape and recommend controls." },
  { label: "Next best actions", prompt: "What are the 3 next best actions I should take this week as the enterprise architect?" },
];
