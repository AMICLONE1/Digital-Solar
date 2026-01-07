import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { getBBPSClient } from "@/lib/bbps/client";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get user's utility information
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        utilityConsumerNumber: true,
        discom: true,
      },
    });

    if (!user?.utilityConsumerNumber || !user?.discom) {
      return NextResponse.json(
        { error: "Utility information not set. Please complete onboarding." },
        { status: 400 }
      );
    }

    // Fetch bill from BBPS
    const bbpsClient = getBBPSClient();
    const bill = await bbpsClient.fetchBill(user.utilityConsumerNumber, user.discom);

    // Check if bill already exists
    const existingBill = await prisma.bill.findUnique({
      where: { bbpsBillId: bill.billNumber },
    });

    if (existingBill) {
      return NextResponse.json(existingBill);
    }

    // Create bill record
    const newBill = await prisma.bill.create({
      data: {
        userId,
        discom: user.discom,
        billNumber: bill.billNumber,
        amount: bill.amount,
        dueDate: new Date(bill.dueDate),
        bbpsBillId: bill.billNumber,
        fetchedAt: new Date(),
        status: "PENDING",
      },
    });

    return NextResponse.json(newBill);
  } catch (error) {
    console.error("Fetch bill error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch bill" },
      { status: 500 }
    );
  }
}

