"use server";

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { revalidatePath } from "next/cache";

export async function seedProjectsAction() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  await convex.mutation(api.projects.seedProjects, {});
  revalidatePath("/");
}
