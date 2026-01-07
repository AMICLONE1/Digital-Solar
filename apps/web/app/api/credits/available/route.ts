import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAvailableCredits } from "@/lib/ledger";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const available = await getAvailableCredits(userId);

    return NextResponse.json({ available });
  } catch (error) {
    console.error("Get available credits error:", error);
    return NextResponse.json({ error: "Failed to fetch available credits" }, { status: 500 });
  }
}

