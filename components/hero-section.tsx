import { Badge } from "@/components/ui/badge";
import { Globe, Server, Code2 } from "lucide-react";
import BackgroundCirclesDemo from "@/components/ui/circles";

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden border-b border-border/40">
      <BackgroundCirclesDemo />
      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="flex flex-col items-center text-center space-y-8">
          <div>
            <Badge
              variant="outline"
              className="px-4 py-1.5 border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest"
            >
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
  );
}
