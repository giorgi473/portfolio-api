"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, BadgeCheck, ImageIcon, Trash2, Loader2, Edit3 } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { memo } from "react";
import { getOptimizedImageUrl } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Project {
  _id: string;
  title: string;
  description: string;
  badge: string;
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
  images?: string[];
}

export const ProjectCard = memo(({ project }: { project: Project }) => {
  const mainImage = project.images?.[0];
  const isValidUrl = mainImage?.startsWith("http");
  const optimizedImage = mainImage ? getOptimizedImageUrl(mainImage, 800) : null;
  const removeProject = useMutation(api.projects.remove);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await removeProject({ id: project._id as any });
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-full relative group/card">
      <Card className="flex flex-col h-full group rounded-sm py-0 transition-all duration-500 border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:bg-card overflow-hidden">
        {optimizedImage && isValidUrl ? (
          <div className="relative aspect-video w-full overflow-hidden border-b border-border/40 bg-muted/20">
            <Image
              src={optimizedImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={project.featured}
            />
            {project.images && project.images.length > 1 && (
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-[10px] font-bold border border-border/40 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                +{project.images.length - 1}
              </div>
            )}

            {/* Action Buttons Overlay */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
              <Link
                href={`/edit-project/${project._id}`}
                className="p-2 bg-background/80 backdrop-blur-sm text-foreground rounded-full hover:bg-background transition-colors border border-border/40"
              >
                <Edit3 className="h-4 w-4" />
              </Link>
              
              <AlertDialog>
                <AlertDialogTrigger
                  disabled={isDeleting}
                  className="p-2 bg-destructive/80 text-destructive-foreground rounded-full hover:bg-destructive disabled:opacity-50 transition-colors"
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the
                      project "{project.title}" from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete Project
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <div className="relative aspect-video w-full bg-muted/50 flex items-center justify-center border-b border-border/40">
            <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
            
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
              <Link
                href={`/edit-project/${project._id}`}
                className="p-2 bg-background/80 backdrop-blur-sm text-foreground rounded-full hover:bg-background transition-colors border border-border/40"
              >
                <Edit3 className="h-4 w-4" />
              </Link>

              <AlertDialog>
                <AlertDialogTrigger
                  disabled={isDeleting}
                  className="p-2 bg-destructive/80 text-destructive-foreground rounded-full hover:bg-destructive disabled:opacity-50 transition-colors"
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the
                      project "{project.title}" from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete Project
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
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
});
