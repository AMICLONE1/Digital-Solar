import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;

    // Get user's allocations with project details
    const { data: allocations, error: allocError } = await supabase
      .from("allocations")
      .select(`
        id,
        capacity_kw,
        projects (
          id,
          name,
          total_capacity_kw,
          status
        )
      `)
      .eq("user_id", user.id);

    if (allocError) {
      return errorResponse("Failed to fetch allocations", "ALLOCATIONS_FETCH_ERROR", 500);
    }

    // Transform data to match expected format
    const projects = (allocations || []).map((allocation: any) => {
      const project = allocation.projects;
      const capacity = allocation.capacity_kw;

      return {
        id: project?.id || allocation.id,
        name: project?.name || "Unknown Project",
        status: project?.status || "active",
        capacity: capacity || 0,
        generation: 85, // Placeholder - would calculate from actual generation data
      };
    });

    return successResponse(projects);
  } catch (error: any) {
    console.error("Get my projects error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
