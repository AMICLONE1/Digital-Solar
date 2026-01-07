import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRazorpayClient } from "@/lib/payments/razorpay";
import { prisma } from "@repo/database";
import { z } from "zod";

const createOrderSchema = z.object({
  paymentId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { paymentId } = createOrderSchema.parse(body);

    const userId = (session.user as any).id;

    // Get payment record
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.userId !== userId) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (payment.status !== "PENDING") {
      return NextResponse.json({ error: "Payment already processed" }, { status: 400 });
    }

    // Create Razorpay order
    const razorpay = getRazorpayClient();
    const order = await razorpay.createOrder({
      amount: Math.round(payment.amount * 100), // Convert to paise
      currency: "INR",
      receipt: payment.id,
      notes: {
        paymentId: payment.id,
        userId,
        type: payment.type,
      },
    });

    // Update payment with order ID
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        gateway: "RAZORPAY",
        gatewayOrderId: order.id,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

