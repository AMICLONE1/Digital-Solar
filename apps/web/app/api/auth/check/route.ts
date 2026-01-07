import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    return NextResponse.json({
      isAuthenticated: !!(session && user),
      hasSession: !!session,
      hasUser: !!user,
      user: user ? {
        id: user.id,
        email: user.email,
        email_confirmed: !!user.email_confirmed_at,
      } : null,
      error: sessionError?.message || userError?.message || null,
    });
  } catch (error: any) {
    return NextResponse.json({
      isAuthenticated: false,
      hasSession: false,
      hasUser: false,
      user: null,
      error: error.message || "Unknown error",
    });
  }
}

