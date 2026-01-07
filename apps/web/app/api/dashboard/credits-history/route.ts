import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;

    // Get last 12 months of credits
    const now = new Date();
    const months: { month: number; year: number }[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ month: date.getMonth() + 1, year: date.getFullYear() });
    }

    // Fetch credits for each month
    const creditsData = await Promise.all(
      months.map(async ({ month, year }) => {
        const { data } = await supabase
          .from("credit_ledgers")
          .select("amount")
          .eq("user_id", user.id)
          .eq("type", "EARNED")
          .eq("status", "CONFIRMED")
          .eq("month", month)
          .eq("year", year);

        const credits = data?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

        return {
          month: new Date(year, month - 1).toLocaleDateString("en-US", { month: "short" }),
          credits,
        };
      })
    );

    return successResponse(creditsData);
  } catch (error: any) {
    console.error("Get credits history error:", error);
    return errorResponse("Failed to fetch credits history", "CREDITS_HISTORY_ERROR", 500);
  }
}
