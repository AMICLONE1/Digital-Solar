import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";
import { z } from "zod";

const utilitySchema = z.object({
  utilityConsumerNumber: z.string().min(1, "Consumer number is required"),
  state: z.string().min(1, "State is required"),
  discom: z.string().min(1, "DISCOM is required"),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const body = await req.json();
    const { utilityConsumerNumber, state, discom } = utilitySchema.parse(body);

    const { error: updateError } = await supabase
      .from("users")
      .update({
        utility_consumer_number: utilityConsumerNumber.trim(),
        state,
        discom,
      })
      .eq("id", user.id);

    if (updateError) {
      return errorResponse("Failed to update utility information", "UTILITY_UPDATE_ERROR", 500);
    }

    return successResponse({ success: true, message: "Utility information updated" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return errorResponse("Validation error", "VALIDATION_ERROR", 400, error.errors);
    }
    console.error("Update utility error:", error);
    return errorResponse("Failed to update utility information", "UTILITY_UPDATE_ERROR", 500);
  }
}
