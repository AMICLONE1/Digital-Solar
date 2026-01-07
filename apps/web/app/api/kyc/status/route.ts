import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;

    const { data: userData, error } = await supabase
      .from("users")
      .select("kyc_status, utility_consumer_number")
      .eq("id", user.id)
      .single();

    if (error) {
      return errorResponse("Failed to fetch user data", "USER_FETCH_ERROR", 500);
    }

    if (!userData) {
      return errorResponse("User not found", "USER_NOT_FOUND", 404);
    }

    return successResponse({
      kycStatus: userData.kyc_status || "PENDING",
      hasUtility: !!userData.utility_consumer_number,
    });
  } catch (error: any) {
    console.error("Get KYC status error:", error);
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
