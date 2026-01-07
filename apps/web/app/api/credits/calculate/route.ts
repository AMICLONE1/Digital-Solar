import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { calculateCredits } from "@/lib/credit-engine";
import { createLedgerEntry, confirmLedgerEntry } from "@/lib/ledger";
import { z } from "zod";

const calculateSchema = z.object({
  projectId: z.string(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const userRole = (session.user as any).role;
    if (userRole !== "ADMIN" && userRole !== "OPS") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { projectId, month, year } = calculateSchema.parse(body);

    // Get project and generation data
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        generations: {
          where: {
            month,
            year,
            validated: true,
          },
        },
        capacityBlocks: {
          where: {
            status: "ALLOCATED",
          },
          include: {
            allocation: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const generation = project.generations[0];
    if (!generation) {
      return NextResponse.json(
        { error: "No validated generation data for this period" },
        { status: 400 }
      );
    }

    // Calculate credits for each user
    const results = [];

    for (const block of project.capacityBlocks) {
      if (!block.allocation) continue;

      const userId = block.allocation.userId;
      const userKw = block.kw;

      const creditResult = calculateCredits({
        userKw,
        totalProjectKw: project.totalKw,
        actualGenerationKwh: generation.kwh,
        fixedCreditRate: project.ratePerKwh,
        month,
        year,
      });

      // Create ledger entry
      const ledgerId = await createLedgerEntry({
        userId,
        amount: creditResult.creditAmount,
        type: "EARNED",
        month,
        year,
        refId: generation.id,
        refType: "GENERATION",
        description: `Monthly credits for ${project.name}`,
      });

      // Confirm immediately (in production, might want to add validation step)
      await confirmLedgerEntry(ledgerId);

      results.push({
        userId,
        userKw,
        creditAmount: creditResult.creditAmount,
        ledgerId,
      });
    }

    return NextResponse.json({
      success: true,
      month,
      year,
      projectId,
      totalCredits: results.reduce((sum, r) => sum + r.creditAmount, 0),
      userCredits: results,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Calculate credits error:", error);
    return NextResponse.json({ error: "Failed to calculate credits" }, { status: 500 });
  }
}

