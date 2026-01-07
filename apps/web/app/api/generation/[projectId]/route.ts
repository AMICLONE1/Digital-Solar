import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/database";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year") ? parseInt(searchParams.get("year")!) : undefined;

    const generations = await prisma.generation.findMany({
      where: {
        projectId: params.projectId,
        year,
        validated: true,
      },
      orderBy: [
        { year: "desc" },
        { month: "desc" },
      ],
    });

    return NextResponse.json(generations);
  } catch (error) {
    console.error("Get generation history error:", error);
    return NextResponse.json({ error: "Failed to fetch generation history" }, { status: 500 });
  }
}

