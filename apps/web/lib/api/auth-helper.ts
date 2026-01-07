/**
 * Authentication Helper for API Routes
 * Centralized auth checking for API routes using Supabase
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export interface AuthResult {
  user: any;
  supabase: any;
  error?: NextResponse;
}

/**
 * Require authentication for API routes
 * Returns user and supabase client, or error response
 */
export async function requireAuth(req: NextRequest): Promise<AuthResult | { error: NextResponse }> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        error: NextResponse.json(
          { error: "Unauthorized", message: "Authentication required" },
          { status: 401 }
        ),
      };
    }

    return { user, supabase };
  } catch (error: any) {
    return {
      error: NextResponse.json(
        { error: "Authentication failed", message: error.message },
        { status: 500 }
      ),
    };
  }
}

