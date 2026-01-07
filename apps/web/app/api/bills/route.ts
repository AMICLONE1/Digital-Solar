import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;

    // Fetch bills from Supabase
    const { data: bills, error } = await supabase
      .from("bills")
      .select("*")
      .eq("user_id", user.id)
      .order("due_date", { ascending: false })
      .limit(20);

    if (error) {
      return errorResponse("Failed to fetch bills", "BILLS_FETCH_ERROR", 500);
    }

    return successResponse(bills || []);
  } catch (error: any) {
    console.error("Get bills error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

