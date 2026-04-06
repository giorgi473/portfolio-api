import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seedProjectsAction } from "../actions";

export function EmptyProjects() {
  return (
    <div className="text-center py-24 bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20">
      <div className="max-w-md mx-auto space-y-4">
        <Database className="h-12 w-12 mx-auto text-muted-foreground/50" />
        <h3 className="text-xl font-semibold">No Projects Found</h3>
        <p className="text-muted-foreground text-sm">
          The Convex database is currently empty. You can seed it using the button below.
        </p>
        <form action={seedProjectsAction}>
          <Button size="lg" className="rounded-full px-8">
            Initialize Database
          </Button>
        </form>
      </div>
    </div>
  );
}
