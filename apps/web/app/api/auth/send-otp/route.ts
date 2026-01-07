import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateOTP, storeOTP } from "@/lib/auth";

const sendOTPSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = sendOTPSchema.parse(body);

    // Generate and store OTP
    const otp = generateOTP();
    storeOTP(phone, otp);

    // In production, send OTP via SMS service (Twilio, AWS SNS, etc.)
    console.log(`OTP for ${phone}: ${otp}`); // Remove in production

    // TODO: Integrate with SMS service
    // await sendSMS(phone, `Your PowerNetPro OTP is ${otp}`);

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

