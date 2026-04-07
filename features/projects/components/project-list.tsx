import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { ProjectCard } from "./project-card";
import { EmptyProjects } from "./empty-projects";

interface ProjectListProps {
  limit?: number;
}

export async function ProjectList({ limit }: ProjectListProps) {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  try {
    const projects = await convex.query(api.projects.list, { limit });

    if (projects.length === 0) {
      return <EmptyProjects />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-20 bg-destructive/10 rounded-lg border border-destructive text-destructive">
        <p className="font-semibold mb-2">Error loading projects</p>
        <p className="text-sm opacity-80">Make sure Convex is running and URL is set correctly.</p>
      </div>
    );
  }
}
