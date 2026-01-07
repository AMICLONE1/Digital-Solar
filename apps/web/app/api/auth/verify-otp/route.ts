import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyOTP } from "@/lib/auth";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const verifyOTPSchema = z.object({
  phone: z.string(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, otp } = verifyOTPSchema.parse(body);

    // Verify OTP
    if (!verifyOTP(phone, otp)) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
    }

    // OTP verified - user will be authenticated via NextAuth
    // In a real flow, you'd create a session here
    return NextResponse.json({ success: true, message: "OTP verified" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}

