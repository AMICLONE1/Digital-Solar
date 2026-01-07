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

    // Get last 12 months of credits
    const now = new Date();
    const months: { month: number; year: number }[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ month: date.getMonth() + 1, year: date.getFullYear() });
    }

    const creditsData = await Promise.all(
      months.map(async ({ month, year }) => {
        const credits = await prisma.creditLedger.aggregate({
          where: {
            userId,
            type: "EARNED",
            status: "CONFIRMED",
            month,
            year,
          },
          _sum: {
            amount: true,
          },
        });

        return {
          month: new Date(year, month - 1).toLocaleDateString("en-US", { month: "short" }),
          credits: credits._sum.amount || 0,
        };
      })
    );

    return NextResponse.json(creditsData);
  } catch (error) {
    console.error("Get credits history error:", error);
    return NextResponse.json({ error: "Failed to fetch credits history" }, { status: 500 });
  }
}

