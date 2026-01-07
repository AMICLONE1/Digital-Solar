import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { getAvailableCredits, applyCreditsToBill } from "@/lib/ledger";
import { z } from "zod";

const payBillSchema = z.object({
  billId: z.string(),
  applyCredits: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { billId, applyCredits } = payBillSchema.parse(body);

    // Get bill
    const bill = await prisma.bill.findUnique({
      where: { id: billId },
    });

    if (!bill || bill.userId !== userId) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    if (bill.status === "PAID") {
      return NextResponse.json({ error: "Bill already paid" }, { status: 400 });
    }

    let creditsToApply = 0;
    let remainingAmount = bill.amount;

    // Apply credits if requested
    if (applyCredits) {
      const available = await getAvailableCredits(userId);
      creditsToApply = Math.min(available, bill.amount);
      remainingAmount = bill.amount - creditsToApply;

      if (creditsToApply > 0) {
        await applyCreditsToBill(userId, billId, creditsToApply);
      }
    }

    // If there's remaining amount, create payment record
    let paymentId: string | null = null;
    if (remainingAmount > 0) {
      const payment = await prisma.payment.create({
        data: {
          userId,
          billId,
          amount: remainingAmount,
          type: "BILL_PAYMENT",
          status: "PENDING",
        },
      });
      paymentId = payment.id;

      // TODO: Integrate with payment gateway
      // For now, mark as completed (in production, wait for webhook)
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "COMPLETED" },
      });
    }

    // Update bill
    const updatedBill = await prisma.bill.update({
      where: { id: billId },
      data: {
        creditsApplied: creditsToApply,
        status: remainingAmount === 0 ? "PAID" : "PENDING",
        paidAt: remainingAmount === 0 ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      bill: updatedBill,
      creditsApplied: creditsToApply,
      remainingAmount,
      paymentId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Pay bill error:", error);
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 });
  }
}

