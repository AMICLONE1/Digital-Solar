import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { z } from "zod";

const reserveSchema = z.object({
  projectId: z.string(),
  capacity: z.number().positive().max(20),
});

const PRICE_PER_KW = 50000; // ₹50,000 per kW

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, capacity } = reserveSchema.parse(body);

    const userId = (session.user as any).id;

    // Verify project exists and is active
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        capacityBlocks: {
          where: {
            status: "AVAILABLE",
          },
          orderBy: {
            kw: "asc",
          },
        },
      },
    });

    if (!project || project.status !== "ACTIVE") {
      return NextResponse.json({ error: "Project not available" }, { status: 400 });
    }

    // Check availability
    const availableKw = project.capacityBlocks.reduce((sum, block) => sum + block.kw, 0);
    if (availableKw < capacity) {
      return NextResponse.json(
        { error: `Only ${availableKw.toFixed(1)} kW available` },
        { status: 400 }
      );
    }

    // Allocate capacity blocks (simplified - in production, use proper allocation algorithm)
    let remainingCapacity = capacity;
    const blocksToAllocate: string[] = [];

    for (const block of project.capacityBlocks) {
      if (remainingCapacity <= 0) break;
      if (block.kw <= remainingCapacity) {
        blocksToAllocate.push(block.id);
        remainingCapacity -= block.kw;
      }
    }

    if (remainingCapacity > 0.1) {
      // Allow small rounding differences
      return NextResponse.json(
        { error: "Could not allocate exact capacity" },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = capacity * PRICE_PER_KW;

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: totalAmount,
        type: "RESERVATION",
        status: "PENDING",
      },
    });

    // Create allocations and update blocks
    await prisma.$transaction(
      blocksToAllocate.map((blockId) =>
        prisma.allocation.create({
          data: {
            userId,
            capacityBlockId: blockId,
            paymentId: payment.id,
          },
        }).then(() =>
          prisma.capacityBlock.update({
            where: { id: blockId },
            data: {
              status: "ALLOCATED",
              allocatedAt: new Date(),
            },
          })
        )
      )
    );

    // TODO: Integrate with payment gateway (Razorpay/Stripe)
    // For now, return payment URL placeholder
    const paymentUrl = `/payment?paymentId=${payment.id}`;

    return NextResponse.json({
      success: true,
      allocationId: payment.id, // Temporary
      paymentId: payment.id,
      paymentUrl,
      amount: totalAmount,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Reserve error:", error);
    return NextResponse.json({ error: "Reservation failed" }, { status: 500 });
  }
}

