import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("projects").withIndex("by_featured");
    const projects = args.limit 
      ? await q.order("desc").take(args.limit) 
      : await q.order("desc").collect();

    return await Promise.all(
      projects.map(async (project) => {
        if (!project.images) return { ...project, images: [] };

        const imageUrls = await Promise.all(
          project.images.map(async (img) => {
            if (img.startsWith("http")) return img;
            try {
              return await ctx.storage.getUrl(img);
            } catch (e) {
              return null;
            }
          })
        );

        return {
          ...project,
          images: imageUrls.filter((url): url is string => url !== null),
        };
      })
    );
  },
});

export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) return null;

    if (!project.images) return { ...project, images: [] };

    const imageUrls = await Promise.all(
      project.images.map(async (img) => {
        if (img.startsWith("http")) return img;
        try {
          return await ctx.storage.getUrl(img);
        } catch (e) {
          return null;
        }
      })
    );

    return {
      ...project,
      images: imageUrls.filter((url): url is string => url !== null),
    };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    badge: v.string(),
    liveUrl: v.optional(v.string()),
    codeUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    rating: v.optional(v.number()),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    badge: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    codeUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    rating: v.optional(v.number()),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

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
