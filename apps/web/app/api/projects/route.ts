import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Get active projects
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "ACTIVE")
      .is("deleted_at", null);

    if (projectsError) {
      console.error("Projects fetch error:", projectsError);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }

    // Get available capacity blocks for each project
    const projectsWithAvailability = await Promise.all(
      (projects || []).map(async (project) => {
        const { data: blocks } = await supabase
          .from("capacity_blocks")
          .select("kw")
          .eq("project_id", project.id)
          .eq("status", "AVAILABLE");

        const availableKw = blocks?.reduce((sum, block) => sum + (block.kw || 0), 0) || 0;

        return {
          id: project.id,
          name: project.name,
          location: project.location,
          totalKw: project.total_kw,
          ratePerKwh: project.rate_per_kwh,
          availableKw,
          description: project.description,
        };
      })
    );

    return NextResponse.json(projectsWithAvailability);
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

