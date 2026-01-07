import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { z } from "zod";

const validateSchema = z.object({
  generationId: z.string(),
  validated: z.boolean(),
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
    const { generationId, validated } = validateSchema.parse(body);

    const generation = await prisma.generation.update({
      where: { id: generationId },
      data: {
        validated,
        validatedBy: (session.user as any).id,
        validatedAt: validated ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      generation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Validate generation error:", error);
    return NextResponse.json({ error: "Failed to validate generation" }, { status: 500 });
  }
}

