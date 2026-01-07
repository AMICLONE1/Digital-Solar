import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { z } from "zod";

const utilitySchema = z.object({
  utilityConsumerNumber: z.string().min(1, "Consumer number is required"),
  state: z.string().min(1, "State is required"),
  discom: z.string().min(1, "DISCOM is required"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { utilityConsumerNumber, state, discom } = utilitySchema.parse(body);

    const userId = (session.user as any).id;

    await prisma.user.update({
      where: { id: userId },
      data: {
        utilityConsumerNumber,
        state,
        discom,
      },
    });

    return NextResponse.json({ success: true, message: "Utility information updated" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Update utility error:", error);
    return NextResponse.json({ error: "Failed to update utility information" }, { status: 500 });
  }
}

