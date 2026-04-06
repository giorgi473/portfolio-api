import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export function ProjectsHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16 relative">
      <div className="space-y-3 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Featured Projects</h2>
        <p className="text-muted-foreground text-lg font-medium">Showcasing the intersection of design and functionality.</p>
      </div>
      <div>
        <Link
          href="/add-project"
          className={cn(
            buttonVariants(),
            "rounded-full h-14 px-8 font-bold uppercase tracking-widest text-xs group transition-all duration-300 hover:scale-105 active:scale-95"
          )}
        >
          <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          Add New Project
        </Link>
      </div>
    </div>
  );
}
