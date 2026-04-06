"use client";

import Link from "next/link";
import { Database, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { seedProjectsAction } from "../actions";

export function EmptyProjects() {
  return (
    <div className="relative flex flex-col items-center select-none justify-center min-h-[420px] w-full p-12 rounded-[2rem] overflow-hidden group">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-px bg-linear-to-r from-transparent via-primary/10 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-px bg-linear-to-r from-transparent via-primary/10 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.02),transparent_100%)]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "linear" }}
        className="relative z-10 flex flex-col items-center max-w-[320px] text-center"
      >
        <div className="relative mb-10">
          <div className="relative z-10 w-20 h-20 rounded-3xl bg-background border border-border/80 flex items-center justify-center">
            <Database className="w-10 h-10 text-primary/40 group-hover:text-primary/60 transition-colors" />
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-primary flex items-center justify-center border-4 border-background z-20">
            <Plus className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-foreground/90">
            Empty Canvas
          </h3>
          <p className="text-[15px] leading-relaxed text-muted-foreground/70 font-medium">
            Your project showcase is currently empty. Initialize your local database with starter data.
          </p>
        </div>
        <div className="pt-10 w-full">
          <form action={seedProjectsAction}>
            <Link href={"/add-project"}>
              <Button
                size="lg"
                className="w-full h-12 rounded-full cursor-pointer font-bold transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary text-primary-foreground"
              >
                Initialize Database
              </Button>
            </Link>
          </form>
        </div>
        <div className="mt-8 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground/30">
            Ready for setup
          </span>
        </div>
      </motion.div>
    </div>
  );
}
