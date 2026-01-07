import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import { z } from "zod";

const kycSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
  panNumber: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "Invalid PAN format"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, aadhaarNumber, panNumber } = kycSchema.parse(body);

    // TODO: Integrate with actual KYC verification API (e.g., Digio, Signzy, etc.)
    // For now, we'll just store the data and mark as verified
    // In production, you would:
    // 1. Call KYC provider API
    // 2. Verify Aadhaar/PAN
    // 3. Update user status based on response

    const userId = (session.user as any).id;

    // Check if Aadhaar or PAN already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ aadhaarNumber }, { panNumber }],
        NOT: { id: userId },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Aadhaar or PAN already registered" },
        { status: 400 }
      );
    }

    // Update user with KYC information
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        aadhaarNumber,
        panNumber,
        kycStatus: "VERIFIED", // In production, set based on API response
      },
    });

    return NextResponse.json({ success: true, message: "KYC verified" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("KYC verification error:", error);
    return NextResponse.json({ error: "KYC verification failed" }, { status: 500 });
  }
}

