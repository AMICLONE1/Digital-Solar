import { NextRequest, NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/payments/razorpay";
import { prisma } from "@repo/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, payload } = body;

    // Verify webhook signature (if configured)
    // const signature = req.headers.get("x-razorpay-signature");
    // if (!verifyWebhookSignature(body, signature)) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    if (event === "payment.captured") {
      const payment = payload.payment.entity;
      const orderId = payment.order_id;

      // Find payment by order ID
      const dbPayment = await prisma.payment.findFirst({
        where: { gatewayOrderId: orderId },
      });

      if (dbPayment) {
        // Update payment status
        await prisma.payment.update({
          where: { id: dbPayment.id },
          data: {
            status: "COMPLETED",
            gatewayPaymentId: payment.id,
            transactionId: payment.id,
            metadata: payment,
          },
        });

        // If this is a reservation payment, confirm the allocation
        if (dbPayment.type === "RESERVATION") {
          const allocation = await prisma.allocation.findFirst({
            where: { paymentId: dbPayment.id },
          });

          if (allocation) {
            // Allocation is already created, just mark payment as complete
            // The allocation was created when reservation was initiated
          }
        }

        // If this is a bill payment, update bill status
        if (dbPayment.billId) {
          const bill = await prisma.bill.findUnique({
            where: { id: dbPayment.billId },
          });

          if (bill) {
            const totalPaid = bill.creditsApplied + dbPayment.amount;
            await prisma.bill.update({
              where: { id: bill.id },
              data: {
                status: totalPaid >= bill.amount ? "PAID" : "PENDING",
                paidAt: totalPaid >= bill.amount ? new Date() : null,
              },
            });
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

