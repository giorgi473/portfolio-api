"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectCard } from "./project-card";
import { EmptyProjects } from "./empty-projects";
import { ProjectListLoader } from "./project-list-loader";

interface ProjectListProps {
  limit?: number;
}

export function ProjectList({ limit }: ProjectListProps) {
  const projects = useQuery(api.projects.list, { limit });

  if (projects === undefined) {
    return <ProjectListLoader />;
  }

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
}
