import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";

// Constants for calculations
const CO2_PER_KWH = 0.82; // kg CO2 per kWh (India grid average)
const TREES_PER_KG_CO2 = 0.05; // Approximate trees equivalent per kg CO2

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get user's total allocated capacity
    const allocations = await prisma.allocation.findMany({
      where: { userId },
      include: {
        capacityBlock: {
          include: {
            project: true,
          },
        },
      },
    });

    let totalEnergyGenerated = 0;

    // Calculate energy generated based on allocations and project generations
    for (const allocation of allocations) {
      const project = allocation.capacityBlock.project;
      const userKw = allocation.capacityBlock.kw;
      const projectTotalKw = project.totalKw;

      // Get all generations for this project
      const generations = await prisma.generation.findMany({
        where: {
          projectId: project.id,
          validated: true,
        },
      });

      // Calculate user's share of generation
      for (const gen of generations) {
        const userShare = (userKw / projectTotalKw) * gen.kwh;
        totalEnergyGenerated += userShare;
      }
    }

    // Calculate environmental impact
    const co2Saved = totalEnergyGenerated * CO2_PER_KWH;
    const treesEquivalent = co2Saved * TREES_PER_KG_CO2;

    return NextResponse.json({
      co2Saved,
      treesEquivalent,
      energyGenerated: totalEnergyGenerated,
    });
  } catch (error) {
    console.error("Get environmental impact error:", error);
    return NextResponse.json({ error: "Failed to fetch environmental impact" }, { status: 500 });
  }
}

