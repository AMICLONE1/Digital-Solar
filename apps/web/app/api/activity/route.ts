import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const body = await req.json();
    const { action, category, metadata } = body;

    if (!action) {
      return errorResponse("Action is required", "VALIDATION_ERROR", 400);
    }

    // Get IP and user agent from request
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null;
    const userAgent = req.headers.get("user-agent") || null;

    const { data: activity, error } = await supabase
      .from("activity_logs")
      .insert({
        user_id: user.id,
        action,
        category: category || null,
        metadata: metadata || {},
        ip_address: ip,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (error) {
      return errorResponse("Failed to log activity", "ACTIVITY_LOG_ERROR", 500);
    }

    return successResponse(activity);
  } catch (error) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const category = searchParams.get("category");

    let query = supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq("category", category);
    }

    const { data: activities, error } = await query;

    if (error) {
      return errorResponse("Failed to fetch activities", "ACTIVITIES_FETCH_ERROR", 500);
    }

    return successResponse(activities || []);
  } catch (error) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}


