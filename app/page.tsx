import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section";
import { ProjectsHeader } from "@/features/projects/components/projects-header";
import { ProjectList } from "@/features/projects/components/project-list";
import { ProjectListLoader } from "@/features/projects/components/project-list-loader";
import MeteorsDemo from "@/components/ui/meteors";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <HeroSection />
      <div className="relative">
        <MeteorsDemo />
        <section className="py-24 container mx-auto px-4 max-w-6xl">
          <ProjectsHeader />
          <Suspense fallback={<ProjectListLoader />}>
            <ProjectList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
