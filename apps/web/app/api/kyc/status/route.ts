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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        kycStatus: true,
        utilityConsumerNumber: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      kycStatus: user.kycStatus,
      hasUtility: !!user.utilityConsumerNumber,
    });
  } catch (error) {
    console.error("Get KYC status error:", error);
    return NextResponse.json({ error: "Failed to get KYC status" }, { status: 500 });
  }
}

