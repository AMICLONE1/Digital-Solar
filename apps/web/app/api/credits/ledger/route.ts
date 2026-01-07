import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";
import { getUserLedgerEntries } from "@/lib/ledger";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const month = searchParams.get("month") ? parseInt(searchParams.get("month")!) : undefined;
    const year = searchParams.get("year") ? parseInt(searchParams.get("year")!) : undefined;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 100;

    const entries = await getUserLedgerEntries(
      user.id,
      {
        type: type as any,
        month,
        year,
        limit,
      },
      supabase
    );

    return successResponse(entries);
  } catch (error: any) {
    console.error("Get ledger error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
