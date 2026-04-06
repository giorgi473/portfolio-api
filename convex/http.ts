import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

const jsonResponse = (data: any, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

http.route({
  pathPrefix: "/",
  method: "OPTIONS",
  handler: httpAction(async (ctx, request) => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

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

http.route({
  path: "/projects",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      
      if (body.action === "seed") {
        const result = await ctx.runMutation(api.projects.seedProjects);
        return jsonResponse(result, 201);
      }
      const id = await ctx.runMutation(api.projects.create, body);
      return jsonResponse({ id }, 201);
    } catch (error) {
      return jsonResponse({ error: "Invalid request body or server error" }, 400);
    }
  }),
});

http.route({
  pathPrefix: "/projects/",
  method: "PATCH",
  handler: httpAction(async (ctx, request) => {
    try {
      const id = request.url.split("/").pop();
      if (!id) return jsonResponse({ error: "ID required" }, 400);
      
      const body = await request.json();
      await ctx.runMutation(api.projects.update, { 
        id: id as any,
        ...body 
      });
      return jsonResponse({ success: true });
    } catch (error) {
      return jsonResponse({ error: "Failed to update project" }, 500);
    }
  }),
});

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

http.route({
  pathPrefix: "/projects/",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const id = request.url.split("/").pop();
      if (!id || id === "projects") return jsonResponse({ error: "ID required" }, 400);
      
      const project = await ctx.runQuery(api.projects.getById, { id: id as any });
      if (!project) return jsonResponse({ error: "Project not found" }, 404);
      
      return jsonResponse(project);
    } catch (error) {
      return jsonResponse({ error: "Failed to fetch project" }, 500);
    }
  }),
});

export default http;
