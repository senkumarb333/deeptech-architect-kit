import { EntityHeader } from "@/app/components/EntityHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Placeholder({ title, phase = "Phase 2" }: { title: string; phase?: string }) {
  return (
    <div>
      <EntityHeader title={title} description={`Module scheduled for ${phase} of the EAOS roadmap`} />
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">{title} — coming next</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            The Phase 1 foundation (schema, RLS, auth, audit, app shell, executive dashboard, applications and capabilities)
            is live. This module unlocks in the next release together with the Knowledge Graph, AI Agent Studio,
            Reviews workflow, and full governance surface.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
