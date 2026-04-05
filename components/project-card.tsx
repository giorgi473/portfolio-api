"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, BadgeCheck } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  badge: string;
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="h-full">
      <Card className="flex flex-col h-full group transition-all duration-500 border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:bg-card">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2 group-hover:text-primary transition-colors">
                {project.title}
              {project.featured && (
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">
                  <BadgeCheck className="h-3 w-3 fill-current" />
                  Featured
                </div>
              )}
              </CardTitle>
              <Badge 
                variant={project.badge === "Live Demo" ? "default" : "secondary"}
                className="rounded-md font-medium px-2.5 py-0.5"
              >
                {project.badge}
              </Badge>
            </div>
          </div>
          <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/80">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-3 pt-6 mt-auto border-t border-border/40 bg-muted/30 group-hover:bg-muted/50 transition-colors rounded-b-xl">
          {project.liveUrl && (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 font-semibold transition-all" 
              onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Preview
            </Button>
          )}
          {project.codeUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-background/50 hover:bg-background font-semibold transition-all" 
              onClick={() => window.open(project.codeUrl, "_blank", "noopener,noreferrer")}
            >
              <Code2 className="h-4 w-4 mr-2" />
              Source Code
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <Card className="flex flex-col h-[300px] animate-pulse">
      <CardHeader className="space-y-4">
        <div className="h-6 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/4 bg-muted rounded" />
        <div className="h-20 w-full bg-muted rounded" />
      </CardHeader>
      <CardFooter className="flex gap-3 pt-4 border-t">
        <div className="h-9 flex-1 bg-muted rounded" />
        <div className="h-9 flex-1 bg-muted rounded" />
      </CardFooter>
    </Card>
  );
}
