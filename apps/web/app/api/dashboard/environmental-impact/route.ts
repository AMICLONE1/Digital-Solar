import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";

// Constants for calculations
const CO2_PER_KWH = 0.82; // kg CO2 per kWh (India grid average)
const TREES_PER_KG_CO2 = 0.05; // Approximate trees equivalent per kg CO2

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;

    // Get user's allocations
    const { data: allocations, error: allocError } = await supabase
      .from("allocations")
      .select(`
        id,
        capacity_kw,
        project_id,
        projects (
          id,
          total_capacity_kw
        )
      `)
      .eq("user_id", user.id);

    if (allocError) {
      return errorResponse("Failed to fetch allocations", "ALLOCATIONS_FETCH_ERROR", 500);
    }

    let totalEnergyGenerated = 0;

    // Calculate energy generated based on allocations
    for (const allocation of allocations || []) {
      const userKw = allocation.capacity_kw || 0;
      const projectTotalKw = (allocation.projects as any)?.total_capacity_kw || 1;

      // Get generations for this project
      const { data: generations } = await supabase
        .from("generations")
        .select("kwh")
        .eq("project_id", allocation.project_id)
        .eq("validated", true);

      // Calculate user's share of generation
      for (const gen of generations || []) {
        const userShare = (userKw / projectTotalKw) * (gen.kwh || 0);
        totalEnergyGenerated += userShare;
      }
    }

    // Calculate environmental impact
    const co2Saved = totalEnergyGenerated * CO2_PER_KWH;
    const treesEquivalent = co2Saved * TREES_PER_KG_CO2;

    return successResponse({
      co2Saved: Math.round(co2Saved * 100) / 100,
      treesEquivalent: Math.round(treesEquivalent * 100) / 100,
      energyGenerated: Math.round(totalEnergyGenerated * 100) / 100,
    });
  } catch (error: any) {
    console.error("Get environmental impact error:", error);
    return errorResponse("Failed to fetch environmental impact", "ENVIRONMENTAL_IMPACT_ERROR", 500);
  }
}
