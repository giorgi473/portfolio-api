import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * პროექტების სიის წამოღება
 */
export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("projects").order("desc");
    if (args.limit) {
      return await q.take(args.limit);
    }
    return await q.collect();
  },
});

/**
 * კონკრეტული პროექტის წამოღება ID-ით
 */
export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * ახალი პროექტის დამატება
 */
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    badge: v.string(),
    liveUrl: v.optional(v.string()),
    codeUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});

/**
 * პროექტის წაშლა
 */
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

/**
 * საწყისი მონაცემების დამატება (Seeding)
 */
export const seedProjects = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").collect();
    if (existing.length > 0) {
      return { status: "already_exists", count: existing.length };
    }

    const initialProjects = [
      {
        title: "Large-Scale Project",
        description: "Working on a large-scale project with a team for 1 year.",
        badge: "Coming Soon",
        featured: true,
      },
      {
        title: "RedSeam Clothing",
        description: "Modern e‑commerce experience for clothing.",
        badge: "Live Demo",
        liveUrl: "https://example.com/redseam",
        codeUrl: "https://github.com/you/redseam",
      },
      {
        title: "Yc-directory",
        description: "Discover and explore startups, connect with founders.",
        badge: "Live Demo",
        liveUrl: "https://example.com/yc-directory",
        codeUrl: "https://github.com/you/yc-directory",
      },
    ];

    for (const project of initialProjects) {
      await ctx.db.insert("projects", project);
    }

    return { status: "success", count: initialProjects.length };
  },
});
