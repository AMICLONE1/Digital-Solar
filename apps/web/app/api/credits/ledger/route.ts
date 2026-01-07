import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserLedgerEntries } from "@/lib/ledger";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const month = searchParams.get("month") ? parseInt(searchParams.get("month")!) : undefined;
    const year = searchParams.get("year") ? parseInt(searchParams.get("year")!) : undefined;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 100;

    const entries = await getUserLedgerEntries(userId, {
      type: type as any,
      month,
      year,
      limit,
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Get ledger error:", error);
    return NextResponse.json({ error: "Failed to fetch ledger" }, { status: 500 });
  }
}

