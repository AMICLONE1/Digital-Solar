import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/database";
import { z } from "zod";

const loginSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  email: z.string().email().optional(),
});

const otpSchema = z.object({
  phone: z.string(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// In production, use a proper OTP service (Twilio, AWS SNS, etc.)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(phone: string, otp: string): void {
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpStore.set(phone, { otp, expiresAt });
}

export function verifyOTP(phone: string, otp: string): boolean {
  const stored = otpStore.get(phone);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phone);
    return false;
  }
  if (stored.otp !== otp) return false;
  otpStore.delete(phone);
  return true;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone/Email",
      credentials: {
        phone: { label: "Phone", type: "text" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.phone) return null;

        try {
          const { phone, email } = loginSchema.parse(credentials);

          // Find or create user
          let user = await prisma.user.findUnique({
            where: { phone },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                phone,
                email: email || null,
              },
            });
          } else if (email && user.email !== email) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { email },
            });
          }

          return {
            id: user.id,
            email: user.email || undefined,
            phone: user.phone,
            name: user.name || undefined,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = (user as any).phone;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).phone = token.phone;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

