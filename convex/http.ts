import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

/**
 * JSON პასუხის დამხმარე ფუნქცია CORS-ით
 */
const jsonResponse = (data: any, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

// OPTIONS მოთხოვნების დამუშავება CORS-ისთვის
http.route({
  pathPrefix: "/",
  method: "OPTIONS",
  handler: httpAction(async (ctx, request) => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

// GET /projects - პროექტების სია
http.route({
  path: "/projects",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const limit = url.searchParams.get("limit");
      
      const projects = await ctx.runQuery(api.projects.list, { 
        limit: limit ? parseInt(limit) : undefined 
      });
      return jsonResponse(projects);
    } catch (error) {
      return jsonResponse({ error: "Failed to fetch projects" }, 500);
    }
  }),
});

// POST /projects - ახალი პროექტის შექმნა ან Seeding
http.route({
  path: "/projects",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      
      // თუ მოთხოვნა არის Seeding-ისთვის
      if (body.action === "seed") {
        const result = await ctx.runMutation(api.projects.seedProjects);
        return jsonResponse(result, 201);
      }

      // ახალი პროექტის შექმნა
      const id = await ctx.runMutation(api.projects.create, body);
      return jsonResponse({ id }, 201);
    } catch (error) {
      return jsonResponse({ error: "Invalid request body or server error" }, 400);
    }
  }),
});

// DELETE /projects/:id - პროექტის წაშლა
http.route({
  pathPrefix: "/projects/",
  method: "DELETE",
  handler: httpAction(async (ctx, request) => {
    try {
      const id = request.url.split("/").pop();
      if (!id) return jsonResponse({ error: "ID required" }, 400);
      
      await ctx.runMutation(api.projects.remove, { id: id as any });
      return jsonResponse({ success: true });
    } catch (error) {
      return jsonResponse({ error: "Failed to delete project" }, 500);
    }
  }),
});

export default http;
