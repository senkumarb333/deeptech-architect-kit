import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function sb(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "create_application",
  title: "Create application",
  description:
    "Create a new application in a workspace the signed-in user can write to. tenant_id must be a workspace the user belongs to.",
  inputSchema: {
    tenant_id: z.string().uuid().describe("Tenant/workspace id the application belongs to."),
    name: z.string().trim().min(1).max(200).describe("Application display name."),
    description: z.string().trim().max(4000).optional().describe("Short description."),
    lifecycle: z
      .enum(["proposed", "planned", "active", "deprecated", "retired"])
      .default("active")
      .describe("Lifecycle stage."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ tenant_id, name, description, lifecycle }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await sb(ctx)
      .from("applications")
      .insert({ tenant_id, name, description, lifecycle, created_by: ctx.getUserId() })
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { application: data },
    };
  },
});
