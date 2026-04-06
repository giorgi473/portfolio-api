import Link from "next/link"
import { ProjectForm } from "@/features/projects/components/form/project-form";
import { buttonVariants } from "@/components/ui/button-variants"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AddProjectPage() {
  return (
    <div className="min-h-screen bg-background py-16 pb-32 px-4 selection:bg-primary/20">
      <div className="container mx-auto max-w-4xl relative">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "-ml-4 text-muted-foreground hover:text-foreground font-bold uppercase tracking-widest text-xs group transition-all"
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">New Submission</span>
          </div>
        </div>
        <ProjectForm />
      </div>
    </div>
  );
}
