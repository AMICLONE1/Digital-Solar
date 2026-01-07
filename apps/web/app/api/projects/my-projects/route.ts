import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get user's allocations with project details
    const allocations = await prisma.allocation.findMany({
      where: { userId },
      include: {
        capacityBlock: {
          include: {
            project: {
              include: {
                generations: {
                  where: {
                    validated: true,
                  },
                  orderBy: {
                    year: "desc",
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    const projects = allocations.map((allocation) => {
      const project = allocation.capacityBlock.project;
      const capacity = allocation.capacityBlock.kw;
      const latestGen = project.generations[0];

      // Calculate generation percentage (simplified)
      const expectedMonthly = capacity * 120; // 120 kWh per kW per month average
      const actualMonthly = latestGen
        ? (capacity / project.totalKw) * (latestGen.kwh / 12) // Approximate monthly from annual
        : 0;
      const generationPercent = expectedMonthly > 0 ? (actualMonthly / expectedMonthly) * 100 : 0;

      let status: "active" | "warning" | "inactive" = "active";
      if (generationPercent < 50) status = "warning";
      if (generationPercent < 20) status = "inactive";

      return {
        id: project.id,
        name: project.name,
        status,
        capacity,
        generation: Math.round(generationPercent),
      };
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Get my projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

