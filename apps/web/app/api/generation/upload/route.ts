import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { validateGeneration } from "@/lib/credit-engine";
import { z } from "zod";

const uploadGenerationSchema = z.object({
  projectId: z.string(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020),
  kwh: z.number().positive(),
  source: z.enum(["SCADA", "SMART_METER", "MANUAL"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin or ops
    const userRole = (session.user as any).role;
    if (userRole !== "ADMIN" && userRole !== "OPS") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { projectId, month, year, kwh, source } = uploadGenerationSchema.parse(body);

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Validate generation (basic outlier detection)
    const expectedMin = project.totalKw * 80; // Minimum 80 kWh per kW per month
    const expectedMax = project.totalKw * 200; // Maximum 200 kWh per kW per month
    const validation = validateGeneration(kwh, { min: expectedMin, max: expectedMax });

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.reason, warning: true },
        { status: 400 }
      );
    }

    // Check if generation already exists
    const existing = await prisma.generation.findUnique({
      where: {
        projectId_month_year: {
          projectId,
          month,
          year,
        },
      },
    });

    if (existing) {
      // Update existing
      const updated = await prisma.generation.update({
        where: { id: existing.id },
        data: {
          kwh,
          source: source || "MANUAL",
          validated: false, // Require re-validation
        },
      });

      return NextResponse.json({
        success: true,
        generation: updated,
        message: "Generation data updated",
      });
    }

    // Create new
    const generation = await prisma.generation.create({
      data: {
        projectId,
        month,
        year,
        kwh,
        source: source || "MANUAL",
        validated: false,
      },
    });

    return NextResponse.json({
      success: true,
      generation,
      message: "Generation data uploaded",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Upload generation error:", error);
    return NextResponse.json({ error: "Failed to upload generation data" }, { status: 500 });
  }
}

