"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectForm } from "@/features/projects/components/form/project-form";
import { buttonVariants } from "@/components/ui/button-variants";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const project = useQuery(api.projects.getById, { id: id as any });

  if (project === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500">Editing Project</span>
          </div>
        </div>
        <ProjectForm initialData={project as any} isEdit={true} />
      </div>
    </div>
  );
}
