import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";
import { getBBPSClient } from "@/lib/bbps/client";

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;

    // Get user's utility information
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("utility_consumer_number, discom")
      .eq("id", user.id)
      .single();

    if (userError || !userData) {
      return errorResponse("User not found", "USER_NOT_FOUND", 404);
    }

    if (!userData.utility_consumer_number || !userData.discom) {
      return errorResponse(
        "Utility information not set. Please complete onboarding.",
        "UTILITY_NOT_SET",
        400
      );
    }

    // Fetch bill from BBPS
    const bbpsClient = getBBPSClient();
    const bill = await bbpsClient.fetchBill(userData.utility_consumer_number, userData.discom);

    // Check if bill already exists
    const { data: existingBill } = await supabase
      .from("bills")
      .select("*")
      .eq("bbps_bill_id", bill.billNumber)
      .single();

    if (existingBill) {
      return successResponse(existingBill);
    }

    // Create bill record
    const { data: newBill, error: createError } = await supabase
      .from("bills")
      .insert({
        user_id: user.id,
        discom: userData.discom,
        bill_number: bill.billNumber,
        amount: bill.amount,
        due_date: new Date(bill.dueDate).toISOString(),
        bbps_bill_id: bill.billNumber,
        fetched_at: new Date().toISOString(),
        status: "PENDING",
      })
      .select()
      .single();

    if (createError) {
      return errorResponse("Failed to create bill record", "BILL_CREATE_ERROR", 500);
    }

    return successResponse(newBill);
  } catch (error: any) {
    console.error("Fetch bill error:", error);
    return errorResponse(
      error.message || "Failed to fetch bill",
      "BILL_FETCH_ERROR",
      500
    );
  }
}
