import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";
import { getAvailableCredits, applyCreditsToBill } from "@/lib/ledger";
import { z } from "zod";

const payBillSchema = z.object({
  billId: z.string(),
  applyCredits: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const body = await req.json();
    const { billId, applyCredits } = payBillSchema.parse(body);

    // Get bill
    const { data: bill, error: billError } = await supabase
      .from("bills")
      .select("*")
      .eq("id", billId)
      .eq("user_id", user.id)
      .single();

    if (billError || !bill) {
      return errorResponse("Bill not found", "BILL_NOT_FOUND", 404);
    }

    if (bill.status === "PAID") {
      return errorResponse("Bill already paid", "BILL_ALREADY_PAID", 400);
    }

    let creditsToApply = 0;
    let remainingAmount = bill.amount;

    // Apply credits if requested
    if (applyCredits) {
      const available = await getAvailableCredits(user.id, supabase);
      creditsToApply = Math.min(available, bill.amount);
      remainingAmount = bill.amount - creditsToApply;

      if (creditsToApply > 0) {
        await applyCreditsToBill(user.id, billId, creditsToApply, supabase);
      }
    }

    // If there's remaining amount, create payment record
    let paymentId: string | null = null;
    if (remainingAmount > 0) {
      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .insert({
          user_id: user.id,
          bill_id: billId,
          amount: remainingAmount,
          type: "BILL_PAYMENT",
          status: "PENDING",
        })
        .select("id")
        .single();

      if (paymentError || !payment) {
        return errorResponse("Failed to create payment", "PAYMENT_CREATE_ERROR", 500);
      }

      paymentId = payment.id;

      // TODO: Integrate with payment gateway (Razorpay)
      // For now, mark as completed (in production, wait for webhook)
      await supabase
        .from("payments")
        .update({ status: "COMPLETED" })
        .eq("id", payment.id);
    }

    // Update bill
    const { data: updatedBill, error: updateError } = await supabase
      .from("bills")
      .update({
        credits_applied: creditsToApply,
        status: remainingAmount === 0 ? "PAID" : "PENDING",
        paid_at: remainingAmount === 0 ? new Date().toISOString() : null,
      })
      .eq("id", billId)
      .select()
      .single();

    if (updateError) {
      return errorResponse("Failed to update bill", "BILL_UPDATE_ERROR", 500);
    }

    return successResponse({
      success: true,
      bill: updatedBill,
      creditsApplied: creditsToApply,
      remainingAmount,
      paymentId,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return errorResponse("Validation error", "VALIDATION_ERROR", 400, error.errors);
    }
    console.error("Pay bill error:", error);
    return errorResponse("Failed to process payment", "PAYMENT_ERROR", 500);
  }
}
