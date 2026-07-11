// AI Copilot streaming endpoint — pipes Lovable AI Gateway SSE to the client.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are the DeepTech Architect Copilot — an AI assistant embedded inside an Enterprise Architecture platform (EAOS).
You help enterprise architects with:
- Reviewing architecture decisions, risks, capabilities, applications and services
- Detecting risks, cost-optimization opportunities and security gaps
- Explaining diagrams and dependencies
- Suggesting the next best action

Be concise, structured, and executive-friendly. Use short paragraphs, bullet lists and bold headers. When asked to summarize an entity, produce: **Summary**, **Risks**, **Recommended Next Actions**.`;

interface Body {
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  context?: string;
  model?: string;
  stream?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return json({ error: "LOVABLE_API_KEY missing" }, 500);

  let body: Body;
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  if (!Array.isArray(body.messages) || body.messages.length === 0) return json({ error: "messages required" }, 400);

  const system = body.context
    ? `${SYSTEM_PROMPT}\n\n---\nContext for this conversation:\n${body.context.slice(0, 6000)}`
    : SYSTEM_PROMPT;
  const messages = [{ role: "system", content: system }, ...body.messages.slice(-20)];
  const stream = body.stream !== false;

  const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({
      model: body.model ?? "openai/gpt-5.5",
      messages,
      stream,
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    if (upstream.status === 429) return json({ error: "Rate limit exceeded. Please try again shortly." }, 429);
    if (upstream.status === 402) return json({ error: "AI credits exhausted. Please add credits in workspace billing." }, 402);
    return json({ error: text || `Gateway error ${upstream.status}` }, upstream.status);
  }

  if (!stream) {
    const data = await upstream.json();
    return json({ text: data?.choices?.[0]?.message?.content ?? "" });
  }

  return new Response(upstream.body, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
