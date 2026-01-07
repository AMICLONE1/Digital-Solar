import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/database";
import { z } from "zod";

const availabilitySchema = z.object({
  capacity: z.number().positive().max(20),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const capacity = parseFloat(searchParams.get("capacity") || "0");

    if (!capacity || capacity <= 0) {
      return NextResponse.json({ error: "Invalid capacity" }, { status: 400 });
    }

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
    const isAvailable = availableKw >= capacity;

    return NextResponse.json({
      available: isAvailable,
      availableKw,
      requestedKw: capacity,
    });
  } catch (error) {
    console.error("Check availability error:", error);
    return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
  }
}

