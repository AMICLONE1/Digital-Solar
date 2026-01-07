import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export async function POST(req: NextRequest) {
  try {
    // Sign out using NextAuth
    // In a server route, we can't directly call signOut from next-auth/react
    // Instead, we return a response that the client can handle
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}

