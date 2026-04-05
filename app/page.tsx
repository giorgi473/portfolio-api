import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { ProjectCard, ProjectSkeleton } from "@/components/project-card";
import { Suspense } from "react";
import { Code2, Server, Database, Globe, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

async function ProjectList() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  let projects = [];

  try {
    projects = await convex.query(api.projects.list, {});
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return (
      <div className="text-center py-20 bg-destructive/10 rounded-lg border border-destructive text-destructive">
        <p className="font-semibold mb-2">Error loading projects</p>
        <p className="text-sm opacity-80">Make sure Convex is running and URL is set correctly.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-24 bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20">
        <div className="max-w-md mx-auto space-y-4">
          <Database className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="text-xl font-semibold">No Projects Found</h3>
          <p className="text-muted-foreground text-sm">
            The Convex database is currently empty. You can seed it using the REST API or the Convex dashboard.
          </p>
          <form action={async () => {
            "use server";
            const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
            await convex.mutation(api.projects.seedProjects);
          }}>
            <Button size="lg" className="rounded-full px-8">
              Initialize Database
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project: any) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-position-[bottom_left_-20px] mask-[linear-gradient(to_bottom,white,transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <div>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                Full-Stack Developer Portfolio
              </Badge>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Crafting Digital <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-500 to-purple-600">
                Experiences
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Explore my latest work, powered by a robust RESTful API built with
              Next.js, TypeScript, and Convex backend.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 border border-border/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <Globe className="h-3.5 w-3.5 text-primary" /> Next.js
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 border border-border/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <Server className="h-3.5 w-3.5 text-primary" /> Convex
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 border border-border/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <Code2 className="h-3.5 w-3.5 text-primary" /> TypeScript
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 container mx-auto px-4 max-w-6xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.05),rgba(255,255,255,0))] pointer-events-none" />

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

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        }>
          <ProjectList />
        </Suspense>
      </section>
    </main>
  );
}
