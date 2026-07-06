import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listApplications from "./tools/list-applications";
import listCapabilities from "./tools/list-capabilities";
import createApplication from "./tools/create-application";
import listAuditLog from "./tools/list-audit-log";

// The OAuth issuer MUST be the direct Supabase host derived from the project ref.
// Vite inlines VITE_SUPABASE_PROJECT_ID as a string literal at build time, so this
// stays import-safe (no runtime env read at module top level).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "iyarkai-eaos-mcp",
  title: "iYarKai EAOS",
  version: "0.1.0",
  instructions:
    "Enterprise Architecture Operating System. Query and create architecture artifacts (applications, capabilities) and read audit history for the signed-in user's workspaces.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listApplications, listCapabilities, createApplication, listAuditLog],
});
