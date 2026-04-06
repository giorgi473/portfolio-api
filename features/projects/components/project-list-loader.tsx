import { Loader2 } from "lucide-react";

export function ProjectListLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary/40" />
        <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/10 opacity-75" />
      </div>
    </div>
  );
}
