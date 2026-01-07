import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rateLimit, errorResponse, successResponse } from "@/lib/api/middleware";
import { captureError } from "@/lib/monitoring";
import type { Project } from "@/lib/api/types";

export async function GET(req: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = rateLimit(req);
    if (rateLimitResponse) return rateLimitResponse;

    const supabase = await createClient();

    // Get active projects
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "ACTIVE")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (projectsError) {
      captureError(new Error(projectsError.message), {
        context: "GET /api/projects",
        error: projectsError,
      });
      return errorResponse("Failed to fetch projects", "PROJECTS_FETCH_ERROR", 500);
    }

    // Get available capacity blocks for each project
    const projectsWithAvailability = await Promise.all(
      (projects || []).map(async (project) => {
        const { data: blocks } = await supabase
          .from("capacity_blocks")
          .select("kw")
          .eq("project_id", project.id)
          .eq("status", "AVAILABLE");

        const availableKw = blocks?.reduce((sum, block) => sum + Number(block.kw || 0), 0) || 0;

        return {
          id: project.id,
          name: project.name,
          location: project.location,
          state: project.state,
          totalKw: Number(project.total_kw),
          ratePerKwh: Number(project.rate_per_kwh),
          availableKw,
          description: project.description,
          status: project.status,
        } as Project;
      })
    );

    return successResponse(projectsWithAvailability);
  } catch (error) {
    captureError(error instanceof Error ? error : new Error("Unknown error"), {
      context: "GET /api/projects",
    });
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

