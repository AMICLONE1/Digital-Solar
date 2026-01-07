import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";
import { z } from "zod";

const kycSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
  panNumber: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "Invalid PAN format"),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const body = await req.json();
    const { name, aadhaarNumber, panNumber } = kycSchema.parse(body);

    // TODO: Integrate with actual KYC verification API (e.g., Digio, Signzy, etc.)
    // For now, we'll just store the data and mark as verified
    // In production, you would:
    // 1. Call KYC provider API
    // 2. Verify Aadhaar/PAN
    // 3. Update user status based on response

    // Check if Aadhaar or PAN already exists for another user
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .or(`aadhaar_number.eq.${aadhaarNumber},pan_number.eq.${panNumber}`)
      .neq("id", user.id)
      .limit(1)
      .single();

    if (existingUser) {
      return errorResponse("Aadhaar or PAN already registered", "DUPLICATE_KYC", 400);
    }

    // Update user with KYC information
    const { error: updateError } = await supabase
      .from("users")
      .update({
        name: name.trim(),
        aadhaar_number: aadhaarNumber,
        pan_number: panNumber,
        kyc_status: "VERIFIED", // In production, set based on API response
      })
      .eq("id", user.id);

    if (updateError) {
      return errorResponse("Failed to update KYC", "KYC_UPDATE_ERROR", 500);
    }

    return successResponse({ success: true, message: "KYC verified" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return errorResponse("Validation error", "VALIDATION_ERROR", 400, error.errors);
    }
    console.error("KYC verification error:", error);
    return errorResponse("KYC verification failed", "KYC_VERIFY_ERROR", 500);
  }
}
