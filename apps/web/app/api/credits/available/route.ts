import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";
import { getAvailableCredits } from "@/lib/ledger";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const available = await getAvailableCredits(user.id, supabase);

    return successResponse({ available });
  } catch (error: any) {
    console.error("Get available credits error:", error);
    return errorResponse("Failed to fetch available credits", "CREDITS_FETCH_ERROR", 500);
  }
}

