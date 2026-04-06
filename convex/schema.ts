import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    badge: v.string(),
    liveUrl: v.optional(v.string()),
    codeUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    images: v.optional(v.array(v.string())),
  })
    .index("by_title", ["title"])
    .index("by_featured", ["featured"]),
});
