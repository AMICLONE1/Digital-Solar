import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/database";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        capacityBlocks: {
          where: {
            status: "AVAILABLE",
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const availableKw = project.capacityBlocks.reduce((sum, block) => sum + block.kw, 0);

    return NextResponse.json({
      id: project.id,
      name: project.name,
      location: project.location,
      totalKw: project.totalKw,
      ratePerKwh: project.ratePerKwh,
      availableKw,
      description: project.description,
    });
  } catch (error) {
    console.error("Get project error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

